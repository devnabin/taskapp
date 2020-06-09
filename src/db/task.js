const mongoose = require("mongoose");
const validator = require("validator");

//For task
//Here task is the collection
const taskmodel = mongoose.model("task", {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  Owner : {
    type: mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'user'  //ref i.e refrence to the user collection
  }
});

module.exports = taskmodel;
