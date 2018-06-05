const logger = require('../utils/Logger')
const {success, fail, error} = require('../utils/Reply')
const {sendTransaction} = require('../lib/Eth')

function refund(req, res) {
  let address = req.params.address
  logger.info('[Wallet.refund] refund ' + address)

  if (!address || address.length === 0) {
    return fail('address is required')
  }

  sendTransaction(address).then(hash => {
    logger.info('[Wallet.refund]', hash)
    success(res, hash)
  }).catch(e => {
    console.error(e)
    error(res, 'Problemas enviando eth')
  })
}

module.exports = {
  refund
}
