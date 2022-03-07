const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');

// Requires
const routes = require('./routes');

// Constants
const express = require('express');
const Handlebars = require("handlebars");
const template = Handlebars.compile("Name: {{name}}");

const port = 8080;
const app = express();

// Set and configure view engine mustache
app.set('view engine', 'mustache')
app.set('view cache', false)
app.set('views', path.join(__dirname, '/views')); // Sets the path where the templates are found
app.engine('mustache', mustacheExpress(path.join(__dirname, '/views/partials'), '.mustache')); // Sets the path for partials

// Serve views via routes
app.use ('/', routes);
app.use(express.static('src'))

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
