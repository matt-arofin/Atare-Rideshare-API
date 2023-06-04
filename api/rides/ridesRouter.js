import express from "express";
import rideModel from "./ridesModel.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Rides
 *  description: Ride management
 */

/**
 * @swagger
 * /api/rides:
 *   get:
 *     summary: Get all rides
 *     description: Get a list of all rides
 *     tags:
 *       - Rides
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the ride
 *                   driver:
 *                     type: string
 *                     description: The ID of the driver for the ride
 *                   passengers:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: An array of passenger names and phone numbers for the ride
 *                   locations:
 *                     pickup:
 *                       type: string
 *                       description: The pickup location for the ride
 *                     dropoff:
 *                       type: string
 *                       description: The dropoff location for the ride
 *               example:
 *                 {
 *                   "_id": {
 *                     "$oid": "647bb64042366c9c56c9e0de"
 *                   },
 *                   "driver": {
 *                     "name": "Arnold Brown",
 *                     "phoneNumber": "+234 692 015 9972",
 *                     "_id": {
 *                       "$oid": "647bb64042366c9c56c9e0df"
 *                     }
 *                   },
 *                   "passengers": [
 *                     {
 *                       "name": "Christine Klein",
 *                       "phoneNumber": "+234 727 628 6959",
 *                       "_id": {
 *                         "$oid": "647bb64042366c9c56c9e0e0"
 *                       }
 *                     }
 *                   ],
 *                   "locations": {
 *                     "pickup": {
 *                       "latitude": "57.7575",
 *                       "longitude": "-18.9329",
 *                       "_id": {
 *                         "$oid": "647bb64042366c9c56c9e0e1"
 *                       }
 *                     },
 *                     "dropoff": {
 *                       "latitude": "-1.2597",
 *                       "longitude": "10.5322",
 *                       "_id": {
 *                         "$oid": "647bb64042366c9c56c9e0e2"
 *                       }
 *                     }
 *                   },
 *                   "__v": 0
 *                 }   
 *       500:
 *         description: Internal Server Error
 */
router.get("/", async (req, res) => {
  try {
    const rides = await rideModel.find();
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ error: `Error fetching rides: ${error}`})
  }
});


/**
 * @swagger
 * /api/rides/{id}:
 *   get:
 *     summary: Get a ride by ID
 *     description: Get a ride by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the ride
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the ride
 *                 driver:
 *                   type: string
 *                   description: The ID of the driver for the ride
 *                 passengers:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: An array of passenger IDs for the ride
 *                 pickupLocation:
 *                   type: string
 *                   description: The pickup location for the ride
 *                 dropoffLocation:
 *                   type: string
 *                   description: The dropoff location for the ride
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ride = await rideModel.findById(id);
    if (!ride) {
      return res.status(404).json({ error: `Ride not found`});
    }
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ error: `Error fetching ride: ${error}`});
  }
});

/**
 * @swagger
 * /api/rides/{id}:
 *   post:
 *     summary: Update a ride by ID
 *     description: Update a ride with new details
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the ride
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driver:
 *                 type: string
 *                 description: The ID of the driver for the ride
 *               passengers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of passenger IDs for the ride
 *               pickupLocation:
 *                 type: string
 *                 description: The pickup location for the ride
 *               dropoffLocation:
 *                 type: string
 *                 description: The dropoff location for the ride
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the updated ride
 *                 driver:
 *                   type: string
 *                   description: The ID of the driver for the ride
 *                 passengers:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: An array of passenger IDs for the ride
 *                 pickupLocation:
 *                   type: string
 *                   description: The pickup location for the ride
 *                 dropoffLocation:
 *                   type: string
 *                   description: The dropoff location for the ride
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
// Shape = {driver, user, locations: {pickup, dropoff}}
router.post("/", async (req, res) => {
  try {
    const { driver, passengers,locations } =  req.body;
    const newRide = await rideModel.create({
      driver,
      passengers,
      locations
    });
    res.status(201).json(newRide);
  } catch (error) {
    res.status(500).json({ error: `Error creating new ride: ${error}`});
  }
});

/**
 * @swagger
 * /api/rides/{id}:
 *   put:
 *     summary: Update a ride by ID
 *     description: Update a ride with new details
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the ride
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driver:
 *                 type: string
 *                 description: The ID of the driver for the ride
 *               passengers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of passenger IDs for the ride
 *               pickupLocation:
 *                 type: string
 *                 description: The pickup location for the ride
 *               dropoffLocation:
 *                 type: string
 *                 description: The dropoff location for the ride
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the updated ride
 *                 driver:
 *                   type: string
 *                   description: The ID of the driver for the ride
 *                 passengers:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: An array of passenger IDs for the ride
 *                 pickupLocation:
 *                   type: string
 *                   description: The pickup location for the ride
 *                 dropoffLocation:
 *                   type: string
 *                   description: The dropoff location for the ride
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { driver, passengers, locations } = req.body;
    const updatedRide = await rideModel.findByIdAndUpdate(
      id,
      {
        driver,
        passengers,
        locations
      },
      { new: true }
    );
    if (!updatedRide) {
      return res.status(404).json({ error: `Ride not found` });
    }
    res.status(200).json(updatedRide);
  } catch (error) {
    res.status(500).json({ error: `Error updating ride: ${error}`})
  }
});

/**
 * @swagger
 * /api/rides/{id}:
 *   put:
 *     summary: Update a ride by ID
 *     description: Update a ride with new details
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the ride
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driver:
 *                 type: string
 *                 description: The ID of the driver for the ride
 *               passengers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of passenger IDs for the ride
 *               pickupLocation:
 *                 type: string
 *                 description: The pickup location for the ride
 *               dropoffLocation:
 *                 type: string
 *                 description: The dropoff location for the ride
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the updated ride
 *                 driver:
 *                   type: string
 *                   description: The ID of the driver for the ride
 *                 passengers:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: An array of passenger IDs for the ride
 *                 pickupLocation:
 *                   type: string
 *                   description: The pickup location for the ride
 *                 dropoffLocation:
 *                   type: string
 *                   description: The dropoff location for the ride
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRide = await rideModel.findByIdAndDelete(id);
    if(!deletedRide) {
      return res.status(404).json({ error: `Ride not found` })
    }
    res.status(200).json({ message: `Ride deleted successfully`})
  } catch (error) {
    res.status(500).json({ error: `Error deleting ride: ${error}`})
  }
});

export default router;