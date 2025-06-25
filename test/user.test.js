const request = require('supertest');
const app = require('../app');
const axios = require('axios');
const sequelize = require('../config/database');

jest.mock('axios');

describe('POST /user/register', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue({ data: { message: 'Role assigned' } });
  });

  it('should register a user successfully', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: `test${Date.now()}@example.com`,
        password: '12345678',
        phone: '0999999999'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully');
    expect(response.body).toHaveProperty('userId');
  });

  it('should fail when missing fields', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        firstName: 'Test'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('All fields are required.');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
});
