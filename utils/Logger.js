const winston = require('winston')

/**
* export LOG_LEVEL para fijar el nivel de logging deseado.
* error, warn, info, verbose, debug, silly
**/
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'keyserver.log' })
  ]
})

module.exports = logger
