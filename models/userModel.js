const mongoose = require('mongoose')
const { isEmpty } = require('lodash')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique:true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
},
    {
        timestamps: true
    }
)
const User = mongoose.model('User', userSchema)

class UserModel {
    static async registerUser(demoData) {
        try {
            const saveObj = new User(demoData)
            const result = await saveObj.save()
            return result
        } catch (e) {
            console.log('error in creating user', e);
            throw e;

        }
    }


    /**
     * 
     * Common API for getting user details from email while registering a new one as well as while 
     * doing login 
     */
    static async get(searchQuery) {
        try {
            const result = await User.findOne({ "email": searchQuery })
            if (result) {

                return result
            }
            return null
        }
        catch (e) {
            console.log('error in getting user details', e);

            throw e
        }
    }

    
}
module.exports= UserModel