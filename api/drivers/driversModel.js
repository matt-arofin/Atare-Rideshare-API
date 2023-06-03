import mongoose from "mongoose";

const Schema = mongoose.Schema

const driverSchema = new Schema({
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
    manufacturer: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    vin: {
      type: String,
      required: true,
    }
  }
});

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;

