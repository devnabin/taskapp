const express = require("express");

//router
const userRouter = require('./router/userroute')
const taskRouter = require('./router/taskroute')



const app = express();

require("./db/mongo");
//to parse post json
app.use(express.json());


const Port = process.env.PORT || 3000;



//Register router
app.use(userRouter)
app.use(taskRouter)




app.listen(Port, () => console.log("app is listern on port " + Port));
