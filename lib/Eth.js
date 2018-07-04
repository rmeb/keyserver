const logger = require('../utils/Logger')
const BN = require('bn.js')
const {generate, privateToAccount, sha3} = require('ethjs-account')
const SignerProvider = require('ethjs-provider-signer');
const {sign} = require('ethjs-signer');
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

/**
* Envia una transaccion a la red ethereum
**/
function sendTransaction(address, value) {
  logger.info('send tx ' + address)
  return new Promise((resolve, reject) => {
    eth.sendTransaction({
      from: keys.address,
      to: address,
      value: new BN(value),
      gas: 300000,
      data: '0x0',
    }, function(e, txHash) {
      if (e) reject(e)
      resolve({txHash})
    });
  })
}

function getBalance() {
  return eth.getBalance(keys.address)
}

function getAddress() {
  if (keys) return keys.address
  return ''
}

module.exports = {
  sendTransaction, getAddress, getBalance
}
