const logger = require('../utils/Logger')
const {success, fail, error} = require('../utils/Reply')

function refund(req, res) {
  let address = req.params.address
  logger.info('[Wallet.refund] refund ' + address)

  if (!address || address.length === 0) {
    return fail('address is required')
  }

  success(res, {
    txHash: 'dummy'
  })
}

module.exports = {
  refund
}
