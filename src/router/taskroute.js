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
router.get("/task", async (req, res) => {
  try {
    const task = await taskmodel.find({});
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

//Search task by id
router.get("/task/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await taskmodel.findById(_id);
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(404).send();
  }
});

//Update the task  by id
router.patch("/task/:id", async (req, res) => {
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
    const task = await taskmodel.findById(req.params.id);
    updates.forEach((arg) => (task[arg] = req.body[arg]));
    await task.save();
    if (!task) return res.status(401).send();
    res.status(200).send(task);
  } catch (error) {
    res.status(401).send(error);
  }
});

//Delete task by id
router.delete("/task/:id", async (req, res) => {
  try {
    const task = await taskmodel.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send();
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send();
  }
});

//exporting task
module.exports = router;
