const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const bearerToken = require('express-bearer-token');
const app = express()
const keystore = require('./api/Keystore')
const wallet = require('./api/Wallet')
const package = require('./package.json')
const logger = require('./utils/Logger')

logger.info('Server init.')
app.use(bodyParser.json())
app.use(cors())
app.use(bearerToken());
app.get('/', (req, res) => res.send({
    "name": package.name,
    "version": package.version
}))
app.post('/keystore/:identifier', keystore.save)
app.get('/keystore/:identifier', keystore.get)

wallet.init().then(result => {
  logger.info('[Wallet.init] success')
  app.get('/refund/:address', wallet.refund)
}).catch(e => logger.error('[Wallet.init] db error ' + e.code))

var port = process.env.PORT || 4000
app.listen(port, () => logger.info('Keyserver listening on port ' + port))

function onWalletSuccess() {

}
