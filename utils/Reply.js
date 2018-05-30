module.exports = {
  success: function(res, data) {
    var response = {
      status: 'success',
      data: data
    }
    res.status(200).json(response)
  },
  fail: function(res, msg, code = 400) {
    var response = {
      status: 'fail',
      data: msg
    }
    res.status(code).json(response)
  },
  error: function(res, msg) {
    var response = {
      status: 'error',
      data: msg
    }
    res.status(500).json(response)
  }
}
