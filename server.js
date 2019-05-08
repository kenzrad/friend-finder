var express = require('express');

// Initialize the app and create a port
var app = express();
var PORT = process.env.PORT || 3000;

// Set up body parsing and static middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Start the server on the port
app.listen(PORT, function() {
  console.log('Listening on PORT: ' + PORT);
});
