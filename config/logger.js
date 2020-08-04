const { createLogger, transports, format, info } = require('winston');
const config = require('./keys')
require('winston-mongodb')
const logger = createLogger({
    transports: [
        new transports.File({
            filename:'loggerInfo.log',
            level:`info`,
            format: format.combine(format.timestamp(),format.json())
        }),
        new transports.MongoDB({
            db: config.url,
            level:'info',
            collection: 'logInfo',
            format: format.combine(format.timestamp(),format.json()),
            options:{useUnifiedTopology: true }

        })
    ]
})

module.exports = logger