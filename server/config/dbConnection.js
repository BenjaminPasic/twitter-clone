require("dotenv").config();
const { Sequelize } = require("sequelize");

const dbConnection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

(async () => {
  try {
    dbConnection.authenticate();
  } catch (error) {
    console.log(error);
  }
})();

module.exports = dbConnection;
