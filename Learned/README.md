const mongoose = require('mongoose')
const validator = require('validator')

//connection to our database 
// mongodb://localhost:27017/mysite  here mongodb://url / database 
//here mysite is database
mongoose.connect('mongodb://localhost:27017/mysite' , {
    useNewUrlParser:true,
    useUnifiedTopology: true
})


//model for user
const model = mongoose.model('user',{
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
const taskmodel = mongoose.model('task' , {
    description :{
        type : String , 
        trim : true ,
        required : true ,
    },
    completed :{
        type : Boolean ,
        default : false,
    }
})


//For user
/* const person1 = new model({
    name:'Nabin Bhandari', 
  email : 'nabincoc@asdf.com', 
  password : 'na13'
})
person1.save().then(res=> console.log('File save' , res)).catch(error => console.log('error' , error)) 
*/


//For task
const  persontask = new taskmodel({
    description : 'Open book      '
})
persontask.save().then(res => console.log('Files saved successfully' , res)).catch(error => console.log('something error' , error))