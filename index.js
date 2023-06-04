import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./swagger.js";
import usersRouter from "./api/users/usersRouter.js";
import driversRouter from "./api/drivers/driversRouter.js";
import ridesRouter from "./api/rides/ridesRouter.js"
import userModel from "./api/users/usersModel.js";
import mockUsers from "./data/usersData.js";
import driverModel from "./api/drivers/driversModel.js";
import mockDrivers from "./data/driversData.js";
import rideModel from "./api/rides/ridesModel.js";
import mockRides from "./data/ridesData.js";


// CONFIGURATIONS
dotenv.config();
const server = express();

server.use(express.json());
server.use(helmet());
server.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
server.use(cors());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES
server.use('/api/drivers', driversRouter);
server.use('/api/rides', ridesRouter);
server.use('/api/users', usersRouter);

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

// MONGODB/MONGOOSE SETUP
mongoose
.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  // The code below is used to monitor, seed and destroy the MongoDB databases
    const db = mongoose.connection;
    
    // The block of code below resets and populates the database with new random tables when the server starts. The number of entries can be adjusted to simulate larger table queries. Otherwise, existing dummy data may be used for testing and demonstration purposes.
    
    // await db.dropDatabase(); // This will destroy existing databases
    // userModel.insertMany(mockUsers); // This will add 100 mock users to the Users table
    // driverModel.insertMany(mockDrivers); // This will add 100 mock drivers to the Drivers table
    // rideModel.insertMany(mockRides); // This will add 100 mock rides to the Rides table **Should only be done after drivers and users have been populated

    // This is used to monitor the status of the MongoDB connection
    // await db.on('connected', () => {
    //   console.log('Connected to MongoDB')
    // });

    // await db.on('error', (err) => {
    //   console.log('MongoDB connection error', err)
    // });

    // await db.on('disconnected', () => {
    //   console.log('Disconnected from MongoDB')
    // });
  })
  .catch((error) => console.error(`${error}. Did not connect`))

export default server;