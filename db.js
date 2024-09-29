const mysql = require('mysql');
require('dotenv').config(); // To use environment variables

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});



// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
    throw err;
  }
  console.log('Connected to MySQL Database');
});

module.exports = db; // Export the connection
