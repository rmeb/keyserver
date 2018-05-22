const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const keystore = require('./api/Keystore')

console.log('Server init.')
app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => res.send('keyserver'))
app.post('/keystore/save', keystore.save)
app.post('/keystore/get', keystore.get)

var port = process.env.PORT || 4000
app.listen(port, () => console.log('Keyserver listening on port ' + port))
