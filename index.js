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
  database: 'g00474316'
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

// GET request to retrieve items from the database
app.get("/shop", function(req, res) {
  const ID = req.query.rec;
  connection.query("SELECT * FROM books WHERE id = ?", [ID], function (err, rows, fields) {
    if (err) {
      console.error('Error retrieving data from database: ', err);
      res.status(500).send('Error retrieving data from database');
    } else if (rows.length === 0) {
      console.error(`No rows found for ID ${ID}`);
      res.status(404).send(`No product found for ID ${ID}`);
    } else {
      console.log('Data retrieved from database!');
      console.log(rows[0].Title);
      console.log(rows[0].Author);
      console.log(rows[0].Publisher);
      console.log(rows[0].Price);
      console.log(rows[0].Image);
      // Inject data into a HTML
      const bookTitle = rows[0].Title;
      const bookAuthor = rows[0].Author;
      res.render("renderProduct.ejs", {product: bookTitle, author: bookAuthor});
    }
  });
});

// Start the server
app.listen(3000, () => {
    console.log("Server started of port 3000")
});