const express = require("express");
require("./db/mongo");


//router for user and model 
const userRouter = require('./router/userroute')
const taskRouter = require('./router/taskroute')



const app = express();
/*
//Middle ware for getting method
app.use((req, res, next)=>{
  if(req.method === 'GET'){
      res.send('Site will unabmle to get request')
  }else{
      next()
  }
}) 
*/


//to parse post json
app.use(express.json());
//Register router
app.use(userRouter)
app.use(taskRouter)




const Port = process.env.PORT || 3000;






/* 
const bcrypt = require('bcrypt');

async function fun(){
    const pass = 'Nabin321'
    const token =await bcrypt.hash(pass, 8)
    console.log(pass)
    console.log(token)

    console.log(await bcrypt.compare('Nabin321s', token))
}
fun() */
app.listen(Port, () => console.log("app is listern on port " + Port));

/* const jwt = require('jsonwebtoken')

function myfun(){
const token = jwt.sign({_id : '123abc'}, 'NOkiaNabin',{ expiresIn: 60 * 60 })

console.log(token)
const data = jwt.verify(token, 'NOkiaNabin')
console.log(data)
}

myfun()

 */
