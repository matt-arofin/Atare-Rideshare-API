import faker from "@faker-js/faker";
import userModel from "../api/users/usersModel.js";
import driverModel from "../api/driver/driversModel.js"

const generateRandomLocation = () => {
  return {
    latitude: parseFloat(faker.address.latitude()),
    longitude: parseFloat(faker.address.longitude()),
  };
};

const generateMockRides = async (count) => {
  try {
    // Get all users/riders
    const users = await userModel.find().lean();
    const drivers = await driverModel.find().lean();

    const rides = [];

    for (let i = 0; i < count; i++) {
      // Match random user to driver
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomDriver = drivers[Math.floor(Math.random() * users.length)];
      //Generate random pickup and dropoff locations
      const pickup = generateRandomLocation();
      const dropoff = generateRandomLocation();

      const ride = {
        user: randomUser.name,
        driver: randomDriver.name,
        locations: {
          pickup,
          dropoff
        },
      };
      rides.push(ride)
    }
  } catch (error) {
    console.error(`Error generating mock rides:`, error);
  }
};

const mockRides = generateMockRides(10);

export default mockRides;