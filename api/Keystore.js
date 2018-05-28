const db = require('../db/Postgresql')
const {success, fail, error} = require('../utils/Reply')

const SAVE_KS = 'INSERT INTO keystore(identifier, data) VALUES ($1, $2)'
const GET_KS = "SELECT data FROM keystore WHERE identifier = $1"

/**
* retorna el keystore en base al rut y contraseña valida
**/
function get(req, res) {
  console.log('get keystore', req.params)
  let id = req.params.identifier

  if (!id || id.length === 0) {
    return fail(res, 'identifier is required')
  }

  if (!req.token) {
    return fail(res, 'authorization token is required')
  }
  let token = req.token
  console.log("token: "+ token)

  db.query(GET_KS, [id]).then(result => {
    console.log(result)
    if (result.rows.length === 0) {
      return fail(res, 'Parametros incorrectos')
    }
    let data = result.rows[0].data
    if(data.token != token){
      console.log("bad token");
      return fail(res, 'Parametros incorrectos')
    }
    success(res, data)
  }).catch(err => {
    console.error('GET_KS', err)
    error(res, 'Error al leer del keyserver')
  })
}

/**
* Almacena el keystore junto con el rut y la clave encriptada
**/
//TODO encrypt password
function save(req, res) {
  console.log('save keystore', req.body)
  let id = req.params.identifier

  let {keystore, token} = req.body
  
  if (!id || id.length === 0) {
    return fail(res, 'identifier is required')
  }
  if (!keystore) {
    return fail(res, 'keystore es requerido')
  }
  if (!token || token.length === 0) {
    return fail(res, 'identifier is required')
  }

  var data = {
    keystore,
    token
  }

  db.query(SAVE_KS, [id, JSON.stringify(data)]).then(result => {
    console.log('ks saved.')
    success(res, 'created')
  }).catch(err => {
    console.error('SAVE_KS', err)
    error(res, 'Error al guardar en el keyserver')
  })
}

module.exports = {
  get, save
}
