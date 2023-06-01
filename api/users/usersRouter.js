import express from "express";
import User from "./usersModel.js";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Get all users
 *    description: Returns a list of all users
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 */
// get request to base url <- returns all users or a single user?
router.get('/', async (req, res) => {
  console.log('Here is a list of all users')
  try {
    const users = await User.find();
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: `Error fetching users: ${error}`})
  }
})

router.post('/', async (req, res) => {
  console.log('a new user has been added')
})

export default router;