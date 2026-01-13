// Import express
const express = require("express");
const app = express();

//Connect to database:
const mysql = require('mysql');
//Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'booksdata'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
  } else {
    console.log('Connected to database!');
  }
});

// Serve static files from the public directory
app.use(express.static("pages"));

// Start the server
app.listen(3000, () => {
    console.log("Server started of port 3000")
});