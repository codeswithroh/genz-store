const express = require("express");
const app = express();

const errorHandlerMiddleware = require("./middleware/error");

app.use(express.json());

// route imports
const product = require("./routes/productRoutes");

app.use("/api/v1", product);

// middleware for errors
app.use(errorHandlerMiddleware);

module.exports = app;
