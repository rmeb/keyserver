const {generate, privateToAccount, sha3} = require('ethjs-account')
const logger = require('../utils/Logger')
const BN = require('bn.js')
const SignerProvider = require('ethjs-provider-signer');
const sign = require('ethjs-signer').sign;
const Eth = require('ethjs-query');

/**
* Definir la variable de entorno SECRET_KEY
**/
if (!process.env.SECRET_KEY) {
  throw new Error('Requiere variable de entorno SECRET_KEY')
}

let keys = privateToAccount(sha3(process.env.SECRET_KEY))
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
