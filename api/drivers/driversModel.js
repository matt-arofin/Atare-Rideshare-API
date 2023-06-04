import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  car: {
    type: Object,
    required: true,
    vehicle: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    vrm: {
      type: String,
      required: true,
    }
  }
});

const driverModel = mongoose.model("Driver", driverSchema);

export default driverModel;

