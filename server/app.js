const dbConnection = require("./config/dbConnection");
const express = require("express");
const morgan = require("morgan");
const app = express();

dbConnection.authenticate().then(() => {
  console.log("Authenticated, works!");
});

//Request logger
app.use(morgan("tiny"));

//Parsers for requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3001);
