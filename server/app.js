const express = require("express");
const app = express();
const port = 3000; 
const router = require("./Routers/index");
const errorHandler = require("./middleware/errorHandlers");

// body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json())

// routing
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

module.exports = app;