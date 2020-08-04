const jwt = require('jsonwebtoken')
const privateKey=require('../config/keys')

module.exports=function auth(req,res,next){
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('Access denied. No token provided')
try{
    const decoded=jwt.verify(token,privateKey.jwtSecret)
    
    req.decoded = decoded
    next()
}
catch(e){
    res.status(400).send('Invalid Token')
}

}