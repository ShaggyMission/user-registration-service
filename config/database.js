const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user_service_db', 'admin', 'Lis.12345', {
  host: 'shaggymission-db-server.cd5kwh1iyrrb.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
