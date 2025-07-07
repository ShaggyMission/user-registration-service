
const { Sequelize, DataTypes } = require('sequelize');
const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const axios = require('axios');

jest.mock('axios');

const sequelize = new Sequelize('sqlite::memory:', { logging: false });

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  phone: DataTypes.STRING,
});

const app = express();
app.use(express.json());

app.post('/user/register', async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const user = await User.create({
      id: 'test-id',
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });
    
    await axios.post.mockResolvedValue({ data: { message: 'Role assigned' } });
    
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('POST /user/register', () => {
  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@example.com',
        password: '123456',
        phone: '0999999999',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully');
    expect(response.body).toHaveProperty('userId');
  });
});
