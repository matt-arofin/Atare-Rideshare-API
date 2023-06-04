import request from "supertest";
import app from "../../index.js";
import mongoose from "mongoose";
import userModel from "./usersModel.js";
import mockUsers from "../../data/usersData.js";
import dotenv from "dotenv";

dotenv.config();

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

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a specific user', async () => {
      const response = await request(app).get(`/api/users/${userId}`);
      expect(response.status).toBe(200);
    });

    it('should return 404 if the user is not found', async () => {
      const invalidId = '123456789';
      const response = await request(app).get(`/api/users/${invalidId}`);
      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        address: '123 Main St',
      };

      const response = await request(app).post('/api/users').send(userData);
      expect(response.status).toBe(201);
      userId = response.body._id; // Save the created user's ID for future tests
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update an existing user', async () => {
      const updatedUserData = {
        name: 'Updated User',
        email: 'updated.user@example.com',
        phoneNumber: '5555555555',
        address: '456 Elm St',
      };

      const response = await request(app).put(`/api/users/${userId}`).send(updatedUserData);
      expect(response.status).toBe(200);
    });

    it('should return 404 if the user is not found', async () => {
      const invalidId = '123456789';
      const response = await request(app).put(`/api/users/${invalidId}`);
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete an existing user', async () => {
      const response = await request(app).delete(`/api/users/${userId}`);
      expect(response.status).toBe(200);
    });

    it('should return 404 if the user is not found', async () => {
      const invalidId = '123456789';
      const response = await request(app).delete(`/api/users/${invalidId}`);
      expect(response.status).toBe(404);
    });
  });
});