const Usermodel = require('../db/user')
const jwt = require('jsonwebtoken')

const auth = async(req, res , next)=>{
   try {
       const token  = req.header('Authorization').replace('Bearer ' , '');
       const decode  = jwt.verify(token, "NOkiaNabin")
       const user = await Usermodel.findOne({_id : decode._id  , "tokens.token" : token })
       if(!user) throw new error()
       req.user = user;
       req.token = token;
       next();
 
   } catch (error) {
       res.status(404).send({error : 'Please auth'})
   }
}

module.exports = auth;