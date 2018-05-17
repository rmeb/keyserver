const express = require('express')
const app = express()
const keystore = require('./api/Keystore')

console.log('Server init.')
app.get('/', (req, res) => res.send('keyserver'))
app.post('/keystore/create', keystore.create_keystore)
app.post('/keystore/get', keystore.get_keystore)

app.listen(3001, () => console.log('Keyserver listening on port 3001!'))
