const logger = require('../utils/Logger')
const {success, fail, error} = require('../utils/Reply')
const db = require('../db/Postgresql')
const generate = require('ethjs-account').generate
const crypto = require('crypto')

const GET_KEYS = 'SELECT * FROM wallet'
const SAVE_KEYS = 'INSERT INTO wallet(password, keys) VALUES($1, $2)'

let keys = null

function init() {
  return db.query(GET_KEYS).then(result => {
    if (result.rows.length === 0) {
      let password = crypto.randomBytes(32).toString('hex')
      keys = generate(password)
      logger.info('[Wallet.init] llaves generadas')
      return db.query(SAVE_KEYS, [password, JSON.stringify(keys)])
    } else {
      keys = result.rows[0].keys
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

  success(res, {
    txHash: 'dummy'
  })
}

module.exports = {
  refund, init
}
