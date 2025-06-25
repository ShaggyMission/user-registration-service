const app = require('./app'); 
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3010;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`User Registration Service running on port ${PORT}`);
  } catch (err) {
    console.error('DB connection error:', err);
  }
});
