import express from "express";
import driversModel from "./driversModel.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: /api/drivers
 *  description: Driver management
 */

/**
 * @swagger
 * /api/drivers:
 *  get:
 *    summary: Get all drivers
 *    description: Returns a list of all drivers
 *    tags:
 *      - /api/drivers
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              example:
 *                [{
 *                  "_id": {
 *                    "$oid": "647c961fc96e9ee4b9d34034"
 *                  },
 *                  "name": "Doris Kirlin",
 *                  "email": "Chaim13@gmail.com",
 *                  "address": "15675 Lueilwitz Via",
 *                  "phoneNumber": "+234 267 155 6931",
 *                  "car": {
 *                    "vehicle": "Cadillac V90",
 *                    "color": "orange",
 *                    "vrm": "PT91ARJ"
 *                  },
 *                  "__v": 0
 *                }]
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating the reason for the failure
 *                  example: "Error fetching drivers: Internal Server Error"
 */

router.get("/", async (req, res) => {
	console.log("Here is a list of all drivers");
	try {
		const drivers = await driversModel.find();
		res.status(200).json(drivers);
	} catch (error) {
		res.status(500).json({ error: `Error fetching drivers: ${error}` });
	}
});

/**
 * @swagger
 * /api/drivers/{id}:
 *  get:
 *    summary: Get a driver by ID
 *    description: Returns a driver object by ID
 *    tags:
 *      - /api/drivers
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
 *              type: object
 *              example:
 *                {
 *                  "_id": {
 *                    "$oid": "647c961fc96e9ee4b9d34034"
 *                  },
 *                  "name": "Doris Kirlin",
 *                  "email": "Chaim13@gmail.com",
 *                  "address": "15675 Lueilwitz Via",
 *                  "phoneNumber": "+234 267 155 6931",
 *                  "car": {
 *                    "vehicle": "Cadillac V90",
 *                    "color": "orange",
 *                    "vrm": "PT91ARJ"
 *                  },
 *                  "__v": 0
 *                }
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating the reason for the failure
 *                  example: "Error fetching drivers: Internal Server Error"
 */
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	console.log(`Fetching driver with ID: ${id}`);
	try {
		const driver = await driversModel.findById(id);
		if (!driver) {
			return res.status(404).json({ error: `Driver not found` });
		}
		res.status(200).json(driver);
	} catch (error) {
		res.status(500).json({ error: `Error fetching driver: ${error}` });
	}
});

/**
 * @swagger
 * /api/drivers/:
 *  post:
 *    summary: Create a new driver object
 *    description: Adds a new driver object to the database
 *    tags:
 *      - /api/drivers
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the driver
 *        schema:
 *          type: string
 *    responses:
 *      201:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                {
 *                  "_id": {
 *                    "$oid": "647c961fc96e9ee4b9d34034"
 *                  },
 *                  "name": "Doris Kirlin",
 *                  "email": "Chaim13@gmail.com",
 *                  "address": "15675 Lueilwitz Via",
 *                  "phoneNumber": "+234 267 155 6931",
 *                  "car": {
 *                    "vehicle": "Cadillac V90",
 *                    "color": "orange",
 *                    "vrm": "PT91ARJ"
 *                  },
 *                  "__v": 0
 *                }
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating the reason for the failure
 *                  example: "Error fetching drivers: Driver not found"
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating the reason for the failure
 *                  example: "Error fetching drivers: Internal Server Error"
 */
router.post("/", async (req, res) => {
	console.log("Creating a new driver");
	const { name, email, address, phoneNumber, car } = req.body;

	try {
		const newDriver = await driversModel.create({
			name,
			email,
			address,
			phoneNumber,
			car,
		});
		res.status(201).json({ newDriver });
	} catch (error) {
		res.status(500).json({ error: `Error creating new driver: ${error}` });
	}
});

/**
 * @swagger
 * /api/drivers/{id}:
 *  put:
 *    summary: Updates an existing driver
 *    description: Updates an existing driver object by in the database using ID
 *    tags:
 *      - /api/drivers
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
 *              type: object
 *              example:
 *                {
 *                  "_id": {
 *                    "$oid": "647c961fc96e9ee4b9d34034"
 *                  },
 *                  "name": "Doris Kirlin",
 *                  "email": "Chaim13@gmail.com",
 *                  "address": "15675 Lueilwitz Via",
 *                  "phoneNumber": "+234 267 155 6931",
 *                  "car": {
 *                    "vehicle": "Cadillac V90",
 *                    "color": "orange",
 *                    "vrm": "PT91ARJ"
 *                  },
 *                  "__v": 0
 *                }
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating the reason for the failure
 *                  example: "Error fetching drivers: Driver not found"
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating the reason for the failure
 *                  example: "Error fetching drivers: Internal Server Error"
 */
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	console.log(`Updating driver with ID: ${id}`);
	const { name, email, address, phoneNumber, car } = req.body;
	try {
		const updatedDriver = await driversModel.findByIdAndUpdate(
			id,
			{ name, email, address, phoneNumber, car },
			{ new: true }
		);
		if (!updatedDriver) {
			return res.status(404).json({ error: `Driver not found` });
		}
		res.status(200).json(updatedDriver);
	} catch (error) {
		res.status(500).json({ error: `Error updating driver: ${error}` });
	}
});

/**
 * @swagger
 * /api/drivers/{id}:
 *  delete:
 *    summary: Deletes an existing driver
 *    description: Deletes an existing driver object by in the database using ID
 *    tags:
 *      - /api/drivers
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
 *              type: object
 *              example:
 *                {
 *                  "message": "Driver deleted successfully"
 *                }
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating the reason for the failure
 *                  example: "Error fetching drivers: Driver not found"
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating the reason for the failure
 *                  example: "Error fetching drivers: Internal Server Error"
 */
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	console.log(`Deleting driver with ID: ${id}`);
	try {
		const deletedDriver = await driversModel.findByIdAndDelete(id);
		if (!deletedDriver) {
			return res.status(404).json({ error: `Driver not found` });
		}
		res.status(200).json({ message: "Driver deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: `Error deleting driver: ${error} ` });
	}
});

export default router;
