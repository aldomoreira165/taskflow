const dotenv = require("dotenv");
dotenv.config({ path: "./../.env" });
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAMEDB,
  process.env.PASSWORDDB,
  {
    host: process.env.SERVERDB,
    port: process.env.PORTDB,
    dialect: process.env.DIALECTDB,
    dialectOptions: {
      requestTimeout: 300000,
      options: {
        useUTC: true,
        dateFirst: 1,
        enableArithAbort: false,
        requestTimeout: 300000,
      }
    },
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    },
    logging: (process.env.DISABLE_DB_LOGS != "true"),
    timezone: '-06:00',
  }
);

module.exports = sequelize;