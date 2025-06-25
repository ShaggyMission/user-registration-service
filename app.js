const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const swaggerRoutes = require('./routes/swaggerRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/user', swaggerRoutes);

module.exports = app;
