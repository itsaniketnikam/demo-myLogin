const express = require('express')
const controller = require('./controller')
const validation = require('./validation')
const auth = require('../../../middleware/auth')
const upload = require('../../../middleware/upload')

const router = express.Router();

router.post('/api/users/register', validation.registerSchema, controller.registerUser)

router.post('/api/users/login',validation.loginSchema,controller.login)

router.post('/api/files/upload',auth,upload.array('myFiles',12),controller.fileUpload)
    

module.exports = router;