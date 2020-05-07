const express = require("express");
const router = new express.Router();
const usermodel = require("../db/user");

//Post
//Create User
router.post("/user", async ({ body }, res) => {
  try {
    const adduser = await new usermodel(body);
    await adduser.save();
    res.send(adduser);
  } catch (error) {
    res.status(400).send(error);
  }
});


//Read all the User
router.get("/user", async (req, res) => {
  try {
    const user = await usermodel.find({});
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});



//REad user by id 
router.get("/user/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await usermodel.findById(_id);
    if (!user) return res.status(500).send();
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});




//patch update User by id 
router.patch("/user/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  console.log(updates);
  const allowUpdate = ["name", "email", "password"];
  const isAllUpdate = updates.every((upvalue) => allowUpdate.includes(upvalue));
  console.log(isAllUpdate);
  if (!isAllUpdate) {
    return res.status(404).send({ error: "Invalid updates" });
  }
  try {
    const user = await usermodel.findById(req.params.id)
    updates.forEach(arg => user[arg] = req.body[updates])
    await user.save()
    console.log(user)
  /*   const user = await usermodel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); */
    //new means new update with another copy in const user and run validator means run that validator agian when update
    if (!user) return res.status(401).send();
    res.status(201).send(user);
  } catch (error) {
    res.status(401).send(error);
  }
});



//Delete User by id 
router.delete("/user/:id", async (req, res) => {
  try {
    const user = await usermodel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send();
  }
});


//Exporting user
module.exports = router;
