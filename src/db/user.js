const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//model for user
//Here user is the Collection

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    validate(value) {
      if (value <= 0) {
        throw new Error("You must provide the valid age");
      }
    },
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid or not available");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("password contain that word password");
      }
    },
  },
   tokens: [
    {
      token: {
        type: String,
        required: true
      },
    },
  ], 
});

//auto run fun for hiding data 
/*
// Old method
userSchema.methods.hidedata = function(){
  const user = this
  //getting raw data
  const userObject = user.toObject();
  //deleting other fields
  delete userObject.tokens
  delete userObject.password
  return userObject;
}
*/
//New Method to hideing private data
userSchema.methods.toJSON = function(){  //.tojson method will be call automatically call 
  const user = this
  const userObject = user.toObject();  //to object is a way to copy raw data
  delete userObject.tokens
  delete userObject.password
  return userObject;
}


//gettoken
userSchema.methods.tokenAuth = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "NOkiaNabin");
  user.tokens =user.tokens.concat({token})
  await user.save()
  return token;
};

//Finding login user
userSchema.statics.findbyCredentials = async (email, password) => {
  const user = await usermodel.findOne({ email });
  if (!user) throw new error("Unable to login");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new error("unable to login");
  return user;
};

//pre --> hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(this.password, 8);
  }
  next();
});


const usermodel = mongoose.model("user", userSchema);


module.exports = usermodel;
