import express from "express";
import driversModel from "./driversModel.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Drivers
 *  description: Driver management
 */

/**
 * @swagger
 * /api/drivers:
 *  get:
 *    summary: Get all drivers
 *    description: Returns a list of all drivers
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 */

router.get("/", async (req, res) => {
  console.log("Here is a list of all drivers");
  try {
    const drivers = await driversModel.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: `Error fetching drivers: ${error}`});
  }
});

/**
 * @swagger
 * /api/drivers/{id}:
 *  get:
 *    summary: Get a driver by ID
 *    description: Returns a driver object by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the driver
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching driver with ID: ${id}`);
  try {
    const driver = await driversModel.findById(id);
    if(!driver) {
      return res.status(404).json({ error: `Driver not found` });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: `Error fetching driver: ${error}`})
  }
});


router.post("/", async (req, res) => {
  console.log("Creating a new driver");
  const { name, email, address, phoneNumber, car } = req.params;
  try {
    const newDriver = await driversModel.create({ name, email, address, phoneNumber });
    res.status(201).json({newDriver});
  } catch (error) {
    res.status(500).json({ error: `Error creating new driver: ${error}`})
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`Updating driver with ID: ${id}`);
  const { name, email, address, phoneNumber, car } = req.body;
  try {
    const updatedDriver = await driversModel.findByIdAndUpdate(
      id,
      { name, email, address, phoneNumber },
      { new: true}
    );
    if (!updatedUser) {
      return res.status(404).json({ error: `Driver not found`});
    }
  } catch (error) {
    res.status(500).json({ error: `Error updating driver: ${error}`})
  }
});


router.delete("/:id", async (req,res) => {
  const { id } = req.params;
  console.log(`Deleting driver with ID: ${id}`);
  try {
    const deletedDriver = await driversModel.findbyIdandDelete(id);
    if (!deletedDriver) {
      return res.status(404).json({ error: `Driver not found`})
    }
    res.status(200).json({ message: "Driver deleted successfully" }); 
  } catch (error) {
    res.status(500).json({ error: `Error deleting driver: ${error} `});
  }
});

export default router;