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

describe('Drivers API', () => {
  describe('GET /api/drivers', () => {
    it('should return all drivers', async () => {
      const response = await request(app).get('/api/drivers');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /api/drivers/:id', () => {
    it('should return a single driver', async () => {
      const driverId = '647c6d6d2218f2b5d7166f19'; 
      const response = await request(app).get(`/api/drivers/${driverId}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });

    it('should return 404 if driver is not found', async () => {
      const driverId = '123456789';
      const response = await request(app).get(`/api/drivers/${driverId}`);
      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/drivers', () => {
    it('should create a new driver', async () => {
      const newDriver = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: '123 Main St',
        phoneNumber: '+1234567890',
        car: {
          vehicle: 'Toyota Camry',
          color: 'blue',
          vrm: 'ABC123'
        }
      };

      const response = await request(app).post('/api/drivers').send(newDriver);
      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('PUT /api/drivers/:id', () => {
    it('should update a driver', async () => {
      const driverId = '647c6d6d2218f2b5d7166f19';

      const updatedDriver = {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        address: '456 Elm St',
        phoneNumber: '+9876543210',
        car: {
          vehicle: 'Honda Civic',
          color: 'red',
          vrm: 'XYZ987'
        }
      };

      const response = await request(app).put(`/api/drivers/${driverId}`).send(updatedDriver);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('DELETE /api/drivers/:id', () => {
    it('should delete a driver', async () => {
      const driverId = '647c6d6d2218f2b5d7166f19';
      const response = await request(app).delete(`/api/drivers/${driverId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Driver deleted successfully' });
    });

    it('should return 404 if driver is not found', async () => {
      const driverId = '123456789';
      const response = await request(app).delete(`/api/drivers/${driverId}`);
      expect(response.status).toBe(404);
    });
  });
});