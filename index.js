import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./swagger.js";
import usersRouter from "./api/users/usersRouter.js";
// import userModel from "./api/users/usersModel.js";
// import mockUsers from "./data/usersData.js";


// CONFIGURATIONS
dotenv.config();
const server = express();

server.use(express.json());
server.use(helmet());
server.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
server.use(cors());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES
// server.use('/api/drivers', drivers);
// server.use('/api/rides', rides);
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
    const db = mongoose.connection;
    
    // This code resets the database and populates it with new randomly generated information when the server is started
    // await db.dropDatabase();
    // userModel.insertMany(mockUsers);
    // driverModel.insertMany(mockDrivers);
    // rideModel.insertMany(mockRides);

    await db.on('connected', () => {
      console.log('Connected to MongoDB')
    });

    await db.on('error', (err) => {
      console.log('MongoDB connection error', err)
    });

    await db.on('disconnected', () => {
      console.log('Disconnected from MongoDB')
    });
  })
  .catch((error) => console.error(`${error}. Did not connect`))