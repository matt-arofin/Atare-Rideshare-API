import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    address: String
  }
)

const User = mongoose.model("User", userSchema)

export default User;