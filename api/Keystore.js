var temp = []

function get_keystore(req, res) {
  console.log('get keystore', req.body)
  let rut = req.body.rut
  let password = req.body.password

  console.log(temp)
  let ks = temp.find(ks => ks.rut === rut)
  if (!ks || ks.password !== password) return fail(res, 'Parametros incorrectos')

  success(res, ks)
}

function create_keystore(req, res) {
  console.log('create keystore', req.body)
  var rut = req.body.rut
  var password = req.body.password
  var addresses = req.body.addresses
  var keystore = req.body.keystore

  temp.push({
    rut, password, addresses, keystore
  })
  success(res, 'created')
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
  get_keystore, create_keystore
}
