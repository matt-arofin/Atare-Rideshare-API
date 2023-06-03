import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  driver: {
    type: {
      name: String,
      phoneNumber: String
    },
    required: true,
  },
  passengers: {
    type: [{
      name: String,
      phoneNumber: String,
    }],
    default: [],
  },
  locations: {
    pickup: {
      type: {
        latitude: String,
        longitude: String,
      },
      required: true,
    },
    dropoff: {
      type: {
        latitude: String,
        longitude: String,
      },
      required: true,
    },
  },
});

const rideModel = mongoose.model("Ride", rideSchema);

export default rideModel;