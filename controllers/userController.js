const bcrypt = require('bcrypt');
const axios = require('axios');
const User = require('../models/userModels');
const sequelize = require('../config/database');
require('dotenv').config();

const registerUser = async (req, res) => {
  const t = await sequelize.transaction(); 

  try {
    const { firstName, lastName, email, password, phone } = req.body;

    if (!firstName || !lastName || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ where: { email }, transaction: t });
    if (existingUser) {
      await t.rollback();
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    }, { transaction: t });

    const response = await axios.post('http://34.232.173.120:3001/roles/assign-role', {
      userId: newUser.id,
      roleName: 'Contributor'
    });

    await t.commit();
    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });

  } catch (error) {
    await t.rollback(); 
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error. Could not complete registration.' });
  }
};

module.exports = { registerUser };
