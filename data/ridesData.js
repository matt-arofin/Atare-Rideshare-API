import { faker } from "@faker-js/faker";
import userModel from "../api/users/usersModel.js";
import driverModel from "../api/drivers/driversModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const generateRandomLocation = () => {
  return {
    latitude: parseFloat(faker.location.latitude()),
    longitude: parseFloat(faker.location.longitude()),
  };
};

const generateMockRides = async (count) => {
  // console.log("Generating mock ride data")
  const connection = await mongoose.createConnection(process.env.MONGO_URL);


  try {
    // Get all users/riders
    const Driver = connection.model("Driver", driverModel.schema)
    const User = connection.model("User", userModel.schema)

    const drivers = await Driver.find().lean();
    const users = await User.find().lean();

    const rides = [];

    for (let i = 0; i < count; i++) {
      // Match random user to driver
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];

      //Generate random pickup and dropoff locations
      const pickup = generateRandomLocation();
      const dropoff = generateRandomLocation();

      const ride = {
        passengers: [{
          name: randomUser.name,
          phoneNumber: randomUser.phoneNumber
        }],
        driver: {
          name: randomDriver.name,
          phoneNumber: randomDriver.phoneNumber
        },
        locations: {
          pickup,
          dropoff
        },
      };
      rides.push(ride)
    }
    return rides;
  } catch (error) {
    console.error(`Error generating mock rides:`, error);
  } finally {
    connection.close();
  }
};

const mockRides = await generateMockRides(10);

export default mockRides;