const request = require('supertest');
const app = require('../server'); 
const User=require('../Models/User')
const { generateToken } = require('../utils/jwtUtils');
const { AppError } = require('../utils/AppError');

jest.mock('../models/User'); 
jest.mock('../utils/jwtUtils'); 

describe('POST /api/auth/login', () => {
  it('should login a user with valid credentials', async () => {
    // Mock data for the test
    const mockUser = {
      _id: '12345',
      username: 'testuser',
      password: 'password123',
      correctPassword: jest.fn().mockResolvedValue(true),
    };

    // Mock User.findOne to return the mock user
    User.findOne.mockResolvedValue(mockUser);

    // Mock generateToken to return a fake token
    generateToken.mockReturnValue('fake-jwt-token');

    // Make the request
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password123' });

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.token).toBe('fake-jwt-token');
  });

  it('should return an error for invalid credentials', async () => {
    // Mock User.findOne to return null (user not found)
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'wrongpassword' });

    // Assert the response
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });
});
