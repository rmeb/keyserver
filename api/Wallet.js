const logger = require('../utils/Logger')
const BN = require('bn.js')
const {success, fail, error} = require('../utils/Reply')
const {sendTransaction, getBalance} = require('../lib/Eth')

//0.01 ETH
const AMOUNT = '10000000000000000'
const MINIMUN = new BN(AMOUNT)

/**
* Envia eth a la direccion especificada
**/
function refund(req, res) {
  let address = req.params.address
  logger.info('[Wallet.refund] refund ' + address)

  if (!address || address.length === 0) {
    return fail('address is required')
  }

  getBalance().then(balance => {
    if (balance.lte(MINIMUN)) {
      return fail(res, 'No hay suficiente ether para recargar.')
    }
    sendTransaction(address, AMOUNT).then(hash => {
      logger.info('[Wallet.refund]', hash)
      success(res, hash)
    })
  }).catch(e => {
    console.log(e)
    error(res, 'Problemas enviando eth')
  })


}

module.exports = {
  refund
}
