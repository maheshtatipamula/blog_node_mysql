const mysql = require("mysql");
const dotenv = require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.MY_SQL_HOST,
  user: process.env.MY_SQL_USER,
  password: process.env.MY_SQL_PASSWORD,
  database: process.env.MY_SQL_DATABASE,
});

module.exports = db;
