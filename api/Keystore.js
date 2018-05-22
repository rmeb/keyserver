const db = require('../db/Postgresql')

const SAVE_KS = 'INSERT INTO keystore(rut, data) VALUES ($1, $2)'
const GET_KS = "SELECT data FROM keystore WHERE rut = $1"

function get_keystore(req, res) {
  console.log('get keystore', req.body)
  let rut = req.body.rut
  let password = req.body.password

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

//TODO encrypt password
function save_keystore(req, res) {
  console.log('save keystore', req.body)
  var rut = req.body.rut
  var password = req.body.password
  var addresses = req.body.addresses
  var keystore = req.body.keystore

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

function success(res, data) {
  var response = {
    status: 'success',
    data: data
  }
  res.status(200).json(response)
}

function fail(res, msg) {
  var response = {
    status: 'fail',
    data: msg
  }
  res.status(400).json(response)
}

function error(res, msg) {
  var response = {
    status: 'error',
    data: msg
  }
  res.status(500).json(response)
}

module.exports = {
  get_keystore, save_keystore
}
