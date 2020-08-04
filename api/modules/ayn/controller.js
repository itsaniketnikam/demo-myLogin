const service = require('../../../services/userService')
const httpStatusCodes = require('http-status-codes')
const userModel = require('../../../models/userModel')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { isEmpty } = require('lodash')
const jwt = require('jsonwebtoken')
const config = require('../../../config/keys')
const upload = require('../../../middleware/upload')
const { log } = require('util')
const logger = require('../../../config/logger')


class User {


    static async registerUser(req, res) {
        let response = {}

        try {
            const { firstName, lastName, email, password } = req.body

            const payload = { firstName, lastName, email, password }

            const existingUser = await userModel.get(email)

            if (existingUser) {
                response.success = false
                response.message = 'User already exists with this email'
                response.result = _.pick(existingUser, ['_id', 'firstName', 'lastName', 'email'])
                res.status(409).send(response)
            }
            else {
                const salt = await bcrypt.genSalt(10)
                payload.password = await bcrypt.hash(payload.password, salt)
                const result = await service.registration(payload)

                if (result) {
                    response.success = true
                    response.message = 'User has been registered successfully'
                    response.result = _.pick(result, ['_id', 'firstName', 'lastName', 'email'])
                    res.status(200).send(response)
                }
            }
        }
        catch (e) {
            response.success = false;
            response.message = 'Error while registering a user';
            response.result = e;

            res.send(response)
        }
    }


    static async login(req, res) {
        let response = {}
        try {

            const { email, password } = req.body
            const ip = req.ip

            const registeredUser = await userModel.get(email)
            if (isEmpty(registeredUser)) {
                response.success = false
                response.message = 'User not found with this email'
                response.result = {}

                res.status(404).send(response)
            }

            else {
                const validPassword = await bcrypt.compare(password, registeredUser.password)

                if (!validPassword) {
                    response.success = false
                    response.message = 'Password incorrect'
                    response.result = {}
                    return res.status(400).send(response)

                }
                else {

                    const token = jwt.sign({ _id: registeredUser._id }, config.jwtSecret)
                    response.success = true
                    response.message = 'Successfully logged in'
                    response.result = registeredUser

                    // looging user details 
                    logger.log('info', `Login user informaion , userIp:${ip},userEmail:${registeredUser.email}`);

                    return res.header('x-auth-token', token).status(200).send(response)
                }
            }
        }
        catch (e) {
            console.log(e);

        }

    }

    static async fileUpload(req, res) {

        const files = req.files
        if (!files) {
            const error = new Error('Please choose files')
            error.httpStatusCode = 400
            res.status(400).send(error)
        }

        res.status(200).send(files)


    };


}

module.exports = User
