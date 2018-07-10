const db = require('../db/Postgresql')
const logger = require('../utils/Logger')
const {success, fail, error} = require('../utils/Reply')

const SAVE_KS = 'INSERT INTO keystore(identifier, data) VALUES ($1, $2)'
const GET_KS = "SELECT data FROM keystore WHERE identifier = $1"

/**
* retorna el keystore en base al rut y contraseña valida
**/
function get(req, res) {
  let id = req.params.identifier
  logger.info('[Keystore.get] Buscando keystore para ' + id)

  if (!id || id.length === 0) {
    return fail(res, 'identifier is required')
  }

  if (!req.token) {
    return fail(res, 'authorization token is required', 403)
  }
  let token = req.token
  logger.debug("[Keystore.get] token: " + token)

  db.query(GET_KS, [id.toUpperCase()]).then(result => {
    logger.debug('[Keystore.get] get_ks length ' + result.rows.length)
    if (result.rows.length === 0) {
      return fail(res, 'Keystore no encontrado', 404)
    }
    let data = result.rows[0].data
    if(data.token != token){
      logger.error("[Keystore.get] bad token");
      return fail(res, 'Parametros incorrectos')
    }
    logger.info('[Keystore.get] Completado')
    success(res, data.keystore)
  }).catch(err => {
    logger.error('[Keystore.get] ' + err.code + '::' + err.detail)
    error(res, 'Error al leer del keyserver')
  })
}

/**
* Almacena el keystore junto con el rut y la clave encriptada
**/
function save(req, res) {
  let id = req.params.identifier
  logger.info('[Keystore.save] Guardanto keystore para ' + id)

  let {keystore, token} = req.body

  if (!id || id.length === 0) {
    return fail(res, 'identifier is required')
  }
  if (!keystore) {
    return fail(res, 'keystore es requerido')
  }
  if (!token || token.length === 0) {
    return fail(res, 'token is required')
  }

  var data = {
    keystore,
    token
  }

  db.query(SAVE_KS, [id.toUpperCase(), JSON.stringify(data)]).then(result => {
    logger.info('[Keystore.save] Guardado')
    success(res, 'created')
  }).catch(err => {
    logger.error('[Keystore.save] ' + err.code + '::' + err.detail)
    if (err.code === '23505') {
      return fail(res, 'El rut ingresado ya existe')
    }
    error(res, 'Error al guardar en el keyserver')
  })
}

module.exports = {
  get, save
}
