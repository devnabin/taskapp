const express = require("express");
const router = new express.Router();
const usermodel = require("../db/user");
const auth = require("../middleware/auth");

//Post
//Create User
router.post("/user", async ({ body }, res) => {
  const adduser = await new usermodel(body);
  try {
    await adduser.save();
    const token = await adduser.tokenAuth();
    res.send({ adduser, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//Read user me or profile
router.get("/user/me", auth, async (req, res) => {
  res.send(req.user);
  /*  try {
    const user = await usermodel.find({});
    res.send(user);
  } catch (error) {
    res.status(500).send();
  } */
});

//login
router.post("/user/login", async (req, res) => {
  try {
    const userlog = await usermodel.findbyCredentials(
      req.body.email,
      req.body.password
    );
    const token = await userlog.tokenAuth();
    res.send({ userlog, token });
  } catch (error) {
    res.status(404).send(error);
  }
});

//Logout for a device
router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (args) => args.token !== req.token
    );
    await req.user.save();
    res.status(200).send(req.user)
  } catch (error) {
    res.status(404).send('Unable to log out')
  }
});

//Logout for everone
router.post("/user/logouts", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send("All User logout");
  } catch (error) {}
});

/* //REad user by id
router.get("/user/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await usermodel.findById(_id);
    if (!user) return res.status(500).send();
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
}); */

//patch update User by id
router.patch("/user/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  console.log(updates);
  const allowUpdate = ["name", "email", "password"];
  const isAllUpdate = updates.every((upvalue) => allowUpdate.includes(upvalue));
  console.log(isAllUpdate);
  if (!isAllUpdate) {
    return res.status(404).send({ error: "Invalid updates" });
  }
  try {
    // const user = await usermodel.findById(req.params.id);
    updates.forEach((arg) => (req.user[arg] = req.body[updates]));
    await req.user.save();
    /*   const user = await usermodel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); */
    //new means new update with another copy in const user and run validator means run that validator agian when update
    res.status(201).send(req.user);
  } catch (error) {
    res.status(401).send(error);
  }
});

//Delete User by id
router.delete("/user/me", auth , async (req, res) => {
  try {
    //const user = await usermodel.findByIdAndDelete(req.params.id);
    await req.user.remove();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send();
  }
});

//Exporting user
module.exports = router;
