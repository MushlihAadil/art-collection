if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();    
}

const express = require("express");
const app = express();

const router = require("./Routers/index");
const errorHandler = require("./middleware/errorHandlers");

// body parser (Middleware)'
app.use(express.json())
app.use(express.urlencoded({extended: true}));

const cors = require("cors");
app.use(cors());

// Routers
app.use(router);
// Error Handlers
app.use(errorHandler);

//Start Server
module.exports = app;