# Atare Consulting Services Take Home Assignment

## Task:
Create a functional rest API for a ride-sharing app (eg bolt, uber)  using node js and express js. The API should be able to fetch data from a functional MySQL or MongoDB database and populate the database with dummy data.

## Possible Endpoints:
- /rides
- /users
- /drivers

## Plan
1. Create project file and initialise npm
2. Install dependencies and configure initial settings/structure
3. Set up Express.js in root
4. Install database driver and configure database connection
5. Define database schema and models
6. Implement API endpoints
7. Test API
8. Handle error cases


## Instructions:
* After installing dependencies and starting the server by using the command `npm run dev`, use localhost:1337 to dispatch requests to the various endpoints of this API.
* Copy the included .env file into the root of this directory in order to establish a connection to the MongoDB collection.
* Ensure payloads attached to any post/put requests are correctly formatted JSON objects
* The MongoDB collections for users, drivers and rides come with 100 mock data entries 
* Documentation on each of the following endpoints, their functions and expected payloads and parameters can be accessed via http://localhost:1337/api-docs:
### Endpoints
RIDES - http://localhost:1337/api/rides
USERS - http://localhost:1337/api/users
DRIVERS - http://localhost:1337/api/drivers
Documentation - https://localhost:1337/api-docs

