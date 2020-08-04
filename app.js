const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/keys')
const indexRoutes = require('./api/modules/ayn/routes')
const { errors, isCelebrate } = require('celebrate')
const app = express()
const httpStatusCodes = require('http-status-codes')
const logger = require('./config/logger')
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

 app.use("/", indexRoutes)

app.use('/status', (req, res) => {
    res.status(200).json({ status: 'Okay' });
});

mongoose.Promise = global.Promise;

 const db = config.url

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log("MongoDB not connected"))

const PORT = config.PORT || 7777

app.listen(PORT, logger.log('info',`$$$Server started listening on port ${PORT}$$$`));

//handling joi errors

app.use(errors())

app.use((err, req, res, next) => {
    if (isCelebrate(err)) {
        return res.send( err.message, httpStatusCodes.UNPROCESSABLE_ENTITY,  {
            errors: err.details
        })
    }

})


module.exports = app


