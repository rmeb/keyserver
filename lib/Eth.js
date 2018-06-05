const generate = require('ethjs-account').generate
const logger = require('../utils/Logger')
const BN = require('bn.js')
const SignerProvider = require('ethjs-provider-signer');
const sign = require('ethjs-signer').sign;
const Eth = require('ethjs-query');

/**
* Definir la variable de entorno SEED_WORDS con las 12-words seeds
**/
if (!process.env.SEED_WORDS) {
  throw new Error('Requiere variable de entorno SEED_WORDS')
}

let keys = generate(process.env.SEED_WORDS)
const provider = new SignerProvider('https://rinkeby.infura.io', {
  signTransaction: (rawTx, cb) => cb(null, sign(rawTx, keys.privateKey))
});
const eth = new Eth(provider);

function sendTransaction(address) {
  logger.info('send tx ' + address)
  let data = {
    txHash: 'dummy'
  }
  return new Promise((resolve, reject) => {
    eth.sendTransaction({
      from: keys.address,
      to: address,
      value: new BN('1000000000000000'),
      gas: 300000,
      data: '0x0',
    }, function(e, txHash) {
      if (e) reject(e)
      resolve({txHash})
    });
  })
}

function getAddress() {
  if (keys) return keys.address
  return ''
}

module.exports = {
  sendTransaction, getAddress
}
