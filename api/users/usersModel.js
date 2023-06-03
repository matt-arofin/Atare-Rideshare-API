import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true,
    }
  }
)

const userModel = mongoose.model("User", userSchema)

export default userModel;