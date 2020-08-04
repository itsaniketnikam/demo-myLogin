const { celebrate, Joi } = require('celebrate');

module.exports = {
    registerSchema: celebrate({
        body: {
            firstName: Joi.string().min(4).max(50).trim().required(),
            lastName: Joi.string().min(4).max(50).trim().required(),
            email: Joi.string().email().max(50).required(),
            password: Joi.string().min(3).max(50).required()
        },
    }, { abortEarly: false, allowUnknown: true },
    ),
    loginSchema:celebrate({
        body:{
            email:Joi.string().email().min(5).max(50).required(),
            password:Joi.string().min(3).max(50).required()
        },
    },{ abortEarly: false, allowUnknown: true },
    )
   
}