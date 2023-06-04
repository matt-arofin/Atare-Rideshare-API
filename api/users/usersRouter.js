import express from "express";
import userModel from "./usersModel.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User management
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Get all users
 *    description: Returns a list of all users
 *    tags:
 *      - Users
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
 *                    "$oid": "64791add9e685f33dbc97b44"
 *                  },
 *                  "name": "Mrs. Vicki Wiza Jr.",
 *                  "email": "Eric_Strosin16@yahoo.com",
 *                  "address": "1010 Emmalee Expressway",
 *                  "__v": 0
 *                },{
 *                  "_id": {
 *                    "$oid": "64791add9e685f33dbc97b45"
 *                  },
 *                  "name": "Rene Abernathy",
 *                  "email": "Leonie_Nienow81@gmail.com",
 *                  "address": "2006 Greenfelder Points",
 *                  "__v": 0
 *                },
 *                ...]
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating indicating the reason for the failure
 *                  example: "Resource not found: User"
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
 *                  example: "Error fetching users: Internal Server Error"
 */
// GET request to base url <- returns all users
router.get("/", async (req, res) => {
	console.log("Here is a list of all users");
	try {
		const users = await userModel.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: `Error fetching users: ${error}` });
	}
});

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: Get a specific user
 *    description: Returns a single user object
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              example:
 *                {
 *                  "_id": {
 *                    "$oid": "64791add9e685f33dbc97b44"
 *                  },
 *                  "name": "Mrs. Vicki Wiza Jr.",
 *                  "email": "Eric_Strosin16@yahoo.com",
 *                  "address": "1010 Emmalee Expressway",
 *                  "__v": 0
 *                }
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating indicating the reason for the failure
 *                  example: "Resource not found: User"
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
 *                  example: "Error fetching users: Internal Server Error"
 */
//GET by id (/:id) <- can be tested using 
router.get("/:id", async (req, res) => {
  const { id } = req.params
	console.log(`Here is the user with ID: ${id}`);
	try {
		const user = await userModel.findById(id);
		if(!user) {res.status(404).json({ error: `Error fetching user: ${error}`})}
    res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: `Error fetching users: ${error}` });
	}
});


/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Create a new user
 *    description: Creates a new user object and adds it to the database
 *    requestBody:
 *      required: true
 *    content:
 *    application/json:
 *      schema:
 *        type: object
 *        properties:
 *          name:
 *            type: string,
 *            description: The name of the user
 *          email:
 *            type: string
 *            description: The email address of the user
 *          address:
 *            type: string
 *            description: The address of the user
 *      201:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string,
 *                  description: The name of the user
 *                email:
 *                  type: string
 *                  description: The email address of the user
 *                address:
 *                  type: string
 *                  description: The address of the user
 *              example: 
 *                {
 *                  "name": "Rene Abernathy",
 *                  "email": "Leonie_Nienow81@gmail.com",
 *                  "address": "2006 Greenfelder Points",
 *                  "phoneNumber": "+234 976 453 5661",
 *                }
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
 *                  example: "Error creating user: Internal Server Error"    
 */
// POST request to base url <- creates new user object and adds onto users array
router.post("/", async (req, res) => {
	console.log("a new user has been added");
  const { name, email, address, phoneNumber } = req.body;
  try {
    const newUser = await userModel.create({ name, email, address, phoneNumber });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: `Error creating new user: ${error}`});
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Updates an existing user's information
 *    description: Returns an updated user object
 *    parameters: {id, user: {name, email, address}}
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating indicating the reason for the failure
 *                  example: "Resource not found: User"
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
 *                  example: "Error updating users: Internal Server Error"  
 */
// Update request to base url <- updates an existing user object and returns to array. Future improvement should only require the parameter that needs changing to be sent with req.body
router.put("/:id", async (req, res) => {
	console.log("an existing user has been updated");
  const { id } = req.params;
  const { name, email, address, phoneNumber  } = req.body;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {name, email, address, phoneNumber },
      { new: true }
    );
    if(!updatedUser) {
      return res.status(404).json({ message: 'User not found'});

    }
    res.status(200).json({updatedUser})
  } catch (error) {
    res.status(500).json({ error: `Error updating user: ${error}`});
  }
});

/**
 * @swagger
 * /api/users{id}:
 *  delete:
 *    summary: Deletes an existing user's information
 *    description: Deletes an existing user's information
 *    parameters:
 *      in: path
 *       name: id
 *       required: true
 *        schema:
 *          type: string
 *         description: The ID of the user to delete
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
// Delete request to base url <- updates an existing user object and returns to array
router.delete('/:id', async (req, res) => {
  console.log('a user is being deleted')
  const { id } = req.params;
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: `User not found`})
    }
    res.status(200).json({ message: 'User deleted successfully'});
  } catch (error) {
    res.status(500).json({ error: `Error deleting user: ${error}`});
  }
});

export default router;
