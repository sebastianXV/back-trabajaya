require('dotenv').config(); // 👈 Esto carga el .env

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos MySQL de Railway");
});

module.exports = connection;
