const model = require('../models/userModel')
const { isEmpty } = require('lodash')

class UserService {

static async registration(payload){

    try{

        const result = await model.registerUser(payload)
        if(!isEmpty(result)){
            return result
           
        }
    }
    catch(e){
    throw e
    }   
}


}

module.exports = UserService