// Constants
const express = require('express');
const Handlebars = require("handlebars");
const template = Handlebars.compile("Name: {{name}}");

const port = 8080;
// const pagesRoutes = require('./routes/pagesRoute')
const app = express();

//app.use("", pagesRoutes)
app.use(express.static('src'))

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
