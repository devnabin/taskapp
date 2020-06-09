const express = require("express");
require("./db/mongo");

const Port = process.env.PORT || 3000;

//router for user and model
const userRouter = require("./router/userroute");
const taskRouter = require("./router/taskroute");

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
app.use(userRouter);
app.use(taskRouter);

app.get("", (req, res) => {
  res.send("full rest api for user and task");
});

app.listen(Port, () => console.log("app is listern on port " + Port));

/*======================================================================

const task = require("./db/task");
const user = require("./db/user");

const main = async () => {
  //task to user
  const mytask = await task.findById("5edf3beb3cfc13d9b4c44c61"); //task
  await mytask.populate("Owner").execPopulate();
  //   console.log(mytask); //this will show task as well as user filels
  console.log(mytask.Owner); //this will show user fileld

  //USER TO TASK
  const userp = await user.findById("5edf3bd83cfc13d9b4c44c5e");
  await userp.populate("tasks").execPopulate();
  console.log(userp.tasks);
  //   console.log(userp);
};
main();



=========================================================================== */