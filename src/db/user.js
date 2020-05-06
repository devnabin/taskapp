const mongoose = require('mongoose')
const validator = require('validator')
//model for user
const usermodel = mongoose.model('user',{
    name:{
        type:String,
        required: true,
    },
    address:{
     type : String,
     validate(value){
         if(value<=0){
             throw new Error('You must provide the valid age')
         }
     }
    },
    email :{
        type : String,
        lowercase : true,
        trim : true , 
        required : true,
        validate(value){
            if(!validator.isEmail(value)
            ){
                throw new Error('Email is invalid or not available')
            }
        }
    },
    password :{
        type : String , 
        required : true,
        trim: true,
        minlength: 6, 
        validate(value){
            if(value.includes("password")){
                throw new Error('password contain that word password')
            }
        }

    }
})



module.exports = usermodel;