const express = require("express");
const morgan = require("morgan");
const app = express();

//Models
const User = require("./models/User");

//Synchronize any newly added models to our database
(async () => {
  await User.sync();
})();

//Request logger
app.use(morgan("tiny"));

//Body parsers for requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3001);
