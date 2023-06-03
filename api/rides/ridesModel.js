import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  driver: {
    type: String,
    required: true,
  },
  passengers: {
    type: Array,
    default: [],
  },
  locations: {
    pickup: {
      type: String,
      required: true,
    },
    dropoff: {
      type: String,
      required: true,
    },
  },
});

const rideModel = mongoose.model("Ride", rideSchema);

export default rideModel;