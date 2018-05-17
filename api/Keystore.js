var get_keystore = function(req, res) {
  console.log('get keystore')
  success(res, 'keystore')
}

var create_keystore = function(req, res) {
  console.log('create keystore')
  success(res, 'created')
}

function success(res, data) {
  var response = {
    status: 'success',
    data: data
  }
  res.status(200).json(response)
}

module.exports = {
  get_keystore, create_keystore
}
