const express = require("express");
const app = express();

const errorHandlerMiddleware = require("./middleware/error");

app.use(express.json());

// route imports
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);

// middleware for errors
app.use(errorHandlerMiddleware);

module.exports = app;
