const generate = require('ethjs-account').generate
const crypto = require('crypto')
const BN = require('bn.js')
const SignerProvider = require('ethjs-provider-signer');
const sign = require('ethjs-signer').sign;
const Eth = require('ethjs-query');

let keys = null

const provider = new SignerProvider('https://rinkeby.infura.io', {
  signTransaction: (rawTx, cb) => cb(null, sign(rawTx, keys.privateKey))
});
const eth = new Eth(provider);

function generateKeys(_keys) {
  if (_keys) {
    keys = _keys
    return
  }
  let password = crypto.randomBytes(32).toString('hex')
  keys = generate(password)
  return {password, keys}
}

function sendTransaction(address) {
  console.log('send tx', address, keys)
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

module.exports = {
  generateKeys, sendTransaction
}
