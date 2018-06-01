const logger = require('../utils/Logger')
const {success, fail, error} = require('../utils/Reply')
const db = require('../db/Postgresql')
const eth = require('../lib/Eth')

const GET_KEYS = 'SELECT * FROM wallet'
const SAVE_KEYS = 'INSERT INTO wallet(password, keys) VALUES($1, $2)'

function init() {
  return db.query(GET_KEYS).then(result => {
    if (result.rows.length === 0) {
      let ks = eth.generateKeys()
      logger.info('[Wallet.init] llaves generadas')
      return db.query(SAVE_KEYS, [ks.password, JSON.stringify(ks.keys)])
    } else {
      let keys = result.rows[0].keys
      eth.generateKeys(keys)
      return Promise.resolve()
    }
  })
}

function refund(req, res) {
  let address = req.params.address
  logger.info('[Wallet.refund] refund ' + address)

  if (!address || address.length === 0) {
    return fail('address is required')
  }

  eth.sendTransaction(address).then(hash => {
    success(res, hash)
  }).catch(e => {
    console.log(e)
    error(res, 'Problemas enviando eth')
  })
}

module.exports = {
  refund, init
}
