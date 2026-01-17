// Import express
const express = require("express");
const app = express();

// Required for the POST request to work
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");

// Import authentication module
const auth = require("./auth.js");

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
    // Error handling
    if (err) {
      res.status(500).send('Error retrieving data from database');
    } else if (rows.length === 0) {
      res.status(404).send(`No product found for ID ${ID}`);
    } else {
      // Inject data into a HTML
      // Assigns data to variables
      const bookTitle = rows[0].Title;
      const bookAuthor = rows[0].Author;
      const image = rows[0].Image;
      const publisher = rows[0].Publisher;
      const price = rows[0].Price;
      const blurb = rows[0].Blurb;
      // Prints the data to the product.ejs page
      res.render("product.ejs", {
        product: bookTitle,
        author: bookAuthor,
        publisher: publisher,
        myImage: image,
        price: price,
        blurb: blurb,
      });
    }
  });
});

// Route to handle login form submisison
app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const authenticated = auth(username, password);
  console.log(authenticated);

  // Check if authentication is successful
  if(authenticated) {
    // Successful - take user to checkout page
    console.log("Authentication was successful!");
    res.render("checkout");
  } else {
    // Unsuccessful - take user back to login page
    console.log("Authentication was NOT successful!");
    res.render("failed");
  }

});

// Start the server
app.listen(3000, () => {
    console.log("Server started of port 3000")
});