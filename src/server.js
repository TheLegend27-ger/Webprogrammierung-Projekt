const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const pagesRoutes = require('./routes/pagesRoute')
const app = express();


app.use("/api/pages", pagesRoutes)


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);