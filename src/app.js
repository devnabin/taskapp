const express = require("express");
require("./db/mongo");
const usermodel = require("./db/user");
const taskmodel = require("./db/task");

const app = express();
const Port = process.env.PORT || 3000;
//to parse post json
app.use(express.json());

app.get("/user", async (req, res) => {
  try {
    const user = await usermodel.find({})
    res.send(user);

  } catch (error) {
    res.status(500).send();
  }
});

app.get("/user/:id", async (req, res) => {
  const _id = req.params.id;
try {
  const user = await usermodel.findById(_id)
  if (!user) return res.status(500).send();
  res.send(user)
} catch (error) {
  res.status(500).send();
}
});


//task
app.get("/task",async (req, res) => {
  try {
 const task = await  taskmodel.find({})
 res.send(task);
    
  } catch (error) {
    res.status(500).send();
    
  }
});

app.get("/task/:id",async (req, res) => {
  try {
  const _id = req.params.id;
  const task = await taskmodel.findById(_id)
  if (!task) return res.status(404).send();
  res.send(task)

  } catch (error) {
    res.status(404).send();
  }
});


//Post
app.post("/user", async ({ body }, res) => {
  try {
  const adduser =await new usermodel(body);
  await adduser.save()
  res.send(adduser)
  } catch (error) {
    res.status(400).send(error)
  }
});

app.post("/task", async ({ body }, res) => {
  try {
  const mytask =await new taskmodel(body);
  await mytask.save()
  res.status(300).send(mytask)
  } catch (error) {
    res.status(400).send(error)
  }
});


//patch update 
app.patch("/user/:id" , async(req, res)=>{
  const updates = Object.keys(req.body)
  const allowUpdate = ['name' , 'email' , 'password']
  const isAllUpdate = updates.every((upvalue)=> allowUpdate.includes(upvalue));
  console.log(isAllUpdate)
  if(!isAllUpdate){
    return res.status(404).send({error:'Invalid updates'})    
  }
  try {
    console.log(req.params.id)
    console.log(req.body)

 const user = await usermodel.findByIdAndUpdate(req.params.id , req.body , {new: true , runValidators: true});
 //new means new update with another copy in const user and run validator means run that validator agian when update
 if(!user) return res.status(401).send()    
 res.status(201).send(user)    
  } catch (error) {
 res.status(401).send(error)    
    
  }
})


app.patch('/task/:id' , async (req, res)=>{
  const updates  = Object.keys(req.body)
  const Proname = ['completed' , 'description']
  const isValue = updates.every((update)=> Proname.includes(update))
  if(!isValue){
    return res.status(401).send({error : 'Invalid request'})    
  }
  try {
    const task = await taskmodel.findByIdAndUpdate(req.params.id , req.body , { new : true , runValidators: true})
    if(!task)  return res.status(401).send()    
   res.status(200).send(task)
  } catch (error) {
 res.status(401).send(error)    
  } 
})



//Delete
app.delete('/user/:id' , async (req,res)=>{
  try {
    const user = await usermodel.findByIdAndDelete(req.params.id)
    if(!user) return res.status(404).send() 

    res.status(200).send(user)

  } catch (error) {
    res.status(500).send() 
  }
})

app.delete('/task/:id' , async (req,res)=>{
  try {
    const task = await taskmodel.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).send() 
    res.status(200).send(task)

  } catch (error) {
    res.status(500).send() 
  }
})



app.listen(Port, () => console.log("app is listern on port " + Port));
