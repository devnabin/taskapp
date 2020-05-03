const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mysite", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Cat = mongoose.model("user", {
  name: String,
});

const kitty = new Cat({
  name: "Nabin ",
});
kitty.save().then(() => console.log("File save successfully"));
