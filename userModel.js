import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  mobile: Number,
});

export default mongoose.model("users", userSchema);