import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors);

// ROUTES
// app.use('/rides', rides);
// app.use('/drivers', drivers);
// app.use('/users', users);

// MONGODB/MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose
  .connect()
  .then()
  .catch()