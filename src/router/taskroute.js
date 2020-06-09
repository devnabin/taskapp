const express = require("express");
const router = new express.Router();
const taskmodel = require("../db/task");
const auth = require("../middleware/auth");

//Create Task
router.post("/task", auth, async (req, res) => {
  try {
    // const mytask = await new taskmodel(body);
    const mytask = new taskmodel({
      ...req.body,
      Owner: req.user._id,
    });
    await mytask.save();
    res.status(300).send(mytask);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Task Page for end point
//Searching all the task
router.get("/task", auth ,  async (req, res) => {
  try {
    // const task = await taskmodel.find({Owner : req.user._id});
    //or
    await req.user.populate('tasks').execPopulate()
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }
});

//Search task by id
router.get("/task/:id", auth , async (req, res) => {
  const _id = req.params.id;
  try {
    // const task = await taskmodel.findById(_id);
    const task = await taskmodel.findOne({ _id , Owner : req.user._id })
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(404).send();
  }
});

//Update the task  by id
router.patch("/task/:id", auth , async (req, res) => {
  const updates = Object.keys(req.body);
  const Proname = ["completed", "description"];
  const isValue = updates.every((update) => Proname.includes(update));
  if (!isValue) {
    return res.status(401).send({ error: "Invalid request" });
  }
  try {
    /*   const task = await taskmodel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); */

    //or 

    // const task = await taskmodel.findById(req.params.id);

    //or

    const task = await taskmodel.findOne({_id : req.params.id , Owner : req.user._id })

    if (!task) return res.status(401).send();

    updates.forEach((arg) => (task[arg] = req.body[arg]));
    await task.save();

    res.status(200).send(task);
  } catch (error) {
    res.status(401).send(error);
  }
});

//Delete task by id
router.delete("/task/:id", auth ,  async (req, res) => {
  try {
    // const task = await taskmodel.findByIdAndDelete(req.params.id);
    // or 
    const task = await taskmodel.findOneAndDelete({ _id : req.params.id , Owner : req.user._id});
    if (!task) return res.status(404).send();
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send();
  }
});

//exporting task
module.exports = router;
