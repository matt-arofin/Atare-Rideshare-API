import supertest from "supertest";
import express from "express";
import mongoose from "mongoose";
import app from "./index.js";

test('[0] sanity check', () => {
  expect(true).not.toBe(false)
  expect(process.env.NODE_ENV).toBe('testing')
})
// should connect to mongodb database and return 
test('[1] API connection', async () => {
  const response = await supertest(app).get('/');
  expect(response.status).toBe(200);
  // expect(response.body.message).toBe('API is running');
});
