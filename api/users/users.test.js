import request from "supertest";
import app from "../../index.js";
import mongoose from "mongoose";

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

describe('Users Endpoints', () => {
  let userId;

  describe('GET /users', () => {
    it('should return all users', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      // Add assertions for the response body
    });
  });

  describe('GET /users/:id', () => {
    it('should return a specific user', async () => {
      const response = await request(app).get(`/users/${userId}`);
      expect(response.status).toBe(200);
      // Add assertions for the response body
    });

    it('should return 404 if the user is not found', async () => {
      const invalidId = 'invalid_id';
      const response = await request(app).get(`/users/${invalidId}`);
      expect(response.status).toBe(404);
      // Add assertions for the response body
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        address: '123 Main St',
      };

      const response = await request(app).post('/users').send(userData);
      expect(response.status).toBe(201);
      // Add assertions for the response body
      userId = response.body._id; // Save the created user's ID for future tests
    });
  });

  describe('PUT /users/:id', () => {
    it('should update an existing user', async () => {
      const updatedUserData = {
        name: 'Updated User',
        email: 'updated.user@example.com',
        phoneNumber: '5555555555',
        address: '456 Elm St',
      };

      const response = await request(app).put(`/users/${userId}`).send(updatedUserData);
      expect(response.status).toBe(200);
      // Add assertions for the response body
    });

    it('should return 404 if the user is not found', async () => {
      const invalidId = 'invalid_id';
      const response = await request(app).put(`/users/${invalidId}`);
      expect(response.status).toBe(404);
      // Add assertions for the response body
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete an existing user', async () => {
      const response = await request(app).delete(`/users/${userId}`);
      expect(response.status).toBe(200);
      // Add assertions for the response body
    });

    it('should return 404 if the user is not found', async () => {
      const invalidId = 'invalid_id';
      const response = await request(app).delete(`/users/${invalidId}`);
      expect(response.status).toBe(404);
      // Add assertions for the response body
    });
  });
});