const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user_service_db', 'admin', 'PoolG10.11', {
  host: 'mysql.cwizczqy6pft.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
