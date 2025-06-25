
jest.setTimeout(10000); 

const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const User = require('../models/userModels');
jest.mock('axios');
const axios = require('axios');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000)); 
  await sequelize.close();
});

describe('POST /user/register', () => {
  it('debería registrar un nuevo usuario correctamente', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Role assigned' } });

    const response = await request(app)
      .post('/user/register')
      .send({
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@example.com',
        password: '123456',
        phone: '0999999999'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully');
    expect(response.body).toHaveProperty('userId');
  });

});

