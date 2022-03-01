const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  mobile: Number,
});

module.exports = mongoose.model("users", userSchema);