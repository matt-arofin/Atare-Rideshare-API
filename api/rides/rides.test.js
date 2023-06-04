import request from "supertest";
import app from "../../index.js"; 
import rideModel from "./ridesModel.js";
import mockRides from "../../data/ridesData.js";
import dotenv from "dotenv";

dotenv.config()

// Import the rideModel and any other necessary models

// Mock the MongoDB connection before running the tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clean up the database after running the tests
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Rides Endpoints', () => {
  let rideId;

  describe('GET /api/rides', () => {
    it('should return all rides', async () => {
      const response = await request(app).get('/api/rides');
      expect(response.status).toBe(200);
      // Add assertions for the response body
    });
  });

  describe('GET /api/rides/:id', () => {
    it('should return a specific ride', async () => {
      const response = await request(app).get(`/api/rides/${rideId}`);
      expect(response.status).toBe(200);
      // Add assertions for the response body
    });

    it('should return 404 if the ride is not found', async () => {
      const invalidId = '123456789';
      const response = await request(app).get(`/api/rides/${invalidId}`);
      expect(response.status).toBe(404);
      // Add assertions for the response body
    });
  });

  describe('POST /api/rides', () => {
    it('should create a new ride', async () => {
      const rideData = {
        driver: {
          name: 'John Doe',
          phoneNumber: '1234567890',
        },
        passengers: [
          {
            name: 'Passenger 1',
            phoneNumber: '9876543210',
          },
        ],
        locations: {
          pickup: {
            latitude: '12.345',
            longitude: '67.890',
          },
          dropoff: {
            latitude: '23.456',
            longitude: '78.901',
          },
        },
      };

      const response = await request(app).post('/api/rides').send(rideData);
      expect(response.status).toBe(201);
      // Add assertions for the response body
      rideId = response.body._id; // Save the created ride's ID for future tests
    });
  });

  describe('PUT /api/rides/:id', () => {
    it('should update an existing ride', async () => {
      const updatedRideData = {
        driver: {
          name: 'Updated Driver',
          phoneNumber: '5555555555',
        },
        passengers: [
          {
            name: 'Updated Passenger',
            phoneNumber: '1111111111',
          },
        ],
        locations: {
          pickup: {
            latitude: '11.111',
            longitude: '22.222',
          },
          dropoff: {
            latitude: '33.333',
            longitude: '44.444',
          },
        },
      };

      const response = await request(app).put(`/api/rides/${rideId}`).send(updatedRideData);
      expect(response.status).toBe(200);
      // Add assertions for the response body
    });

    it('should return 404 if the ride is not found', async () => {
      const invalidId = '123456789';
      const response = await request(app).put(`/api/rides/${invalidId}`);
      expect(response.status).toBe(404);
      // Add assertions for the response body
    });
  });

  describe('DELETE /api/rides/:id', () => {
    it('should delete an existing ride', async () => {
      const response = await request(app).delete(`/api/rides/${rideId}`);
      expect(response.status).toBe(200);
      // Add assertions for the response body
    });

    it('should return 404 if the ride is not found', async () => {
      const invalidId = '123456789';
      const response = await request(app).delete(`/api/rides/${invalidId}`);
      expect(response.status).toBe(404);
      // Add assertions for the response body
    });
  });
});