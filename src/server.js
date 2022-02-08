const express = require('express');

// Constants
const PORT = 8080;
const pagesRoutes = require('./routes/pagesRoute')
const app = express();


app.use("", pagesRoutes)


app.listen(PORT);
console.log(`Running on http://:${PORT}`);