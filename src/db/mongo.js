const mongoose = require('mongoose')

//connection to our database 
// mongodb://localhost:27017/mysite  here mongodb://url / database 
//here mysite is database 
mongoose.connect('mongodb://localhost:27017/mysite' , {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})




/* person1.save().then(res=> console.log('File save' , res)).catch(error => console.log('error' , error)) 



//For task
const  persontask = new taskmodel({
    description : 'Open book      '
})
persontask.save().then(res => console.log('Files saved successfully' , res)).catch(error => console.log('something error' , error)) */