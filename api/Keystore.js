const db = require('../db/Postgresql')
const {success, fail, error} = require('../utils/Reply')

const SAVE_KS = 'INSERT INTO keystore(rut, data) VALUES ($1, $2)'
const GET_KS = "SELECT data FROM keystore WHERE rut = $1"

/**
* retorna el keystore en base al rut y contraseña valida
**/
function get(req, res) {
  console.log('get keystore', req.body)
  let {rut, password} = req.body

  if (!rut || rut.length === 0) {
    return fail(res, 'Rut es requerido')
  }

  if (!password || password.length === 0) {
    return fail(res, 'Password es requerido')
  }

  db.query(GET_KS, [rut]).then(result => {
    console.log(result)
    if (result.rows.length === 0) {
      return fail(res, 'Parametros incorrectos')
    }
    let data = result.rows[0].data
    if (data.password !== password) {
      return fail(res, 'Parametros incorrectos')
    }
    success(res, data)
  })
}

/**
* Almacena el keystore junto con el rut y la clave encriptada
**/
//TODO encrypt password
function save(req, res) {
  console.log('save keystore', req.body)
  var {rut, password, addresses, keystore} = req.body
  
  if (!rut || rut.length === 0) {
    return fail(res, 'Rut es requerido')
  }

  if (!password || password.length === 0) {
    return fail(res, 'Password es requerido')
  }

  if (!addresses || addresses.length === 0) {
    return fail(res, 'Addresses es requerido')
  }

  if (!keystore) {
    return fail(res, 'keystore es requerido')
  }

  var data = {
    password, addresses, keystore
  }

  db.query(SAVE_KS, [rut, JSON.stringify(data)]).then(result => {
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
