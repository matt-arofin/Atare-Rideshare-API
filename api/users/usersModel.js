import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    address: String
  }
)

const userModel = mongoose.model("User", userSchema)

export default userModel;