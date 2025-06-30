const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  // password and username is by default created by  passport fo that why it is not mentioned in the schema
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);