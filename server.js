// Your `server.js` file should require the basic npm packages we've used in class: `express` and `path`.

var express = require('express');
var path = require('path');

// Initialize the app and create a port
var app = express();
var PORT = process.env.PORT || 3000;

// Set up body parsing and static middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./app/public'));  //anything in the public folder can be viewed immediately

require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// Start the server on the port
app.listen(PORT, function() {
  console.log('Listening on PORT: ' + PORT);
});
