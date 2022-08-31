const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

//Models
const User = require("./models/User");

//Routes
const userRoutes = require("./routes/userRoutes");

//Synchronize any newly added models to our database
(async () => {
  await User.sync({});
})();

//Request logger
app.use(morgan("tiny"));

//cors
app.use(cors());

//Cookie parser
app.use(cookieParser());

//Body parsers for requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Add routes
app.use("/user", userRoutes);

app.listen(3001);
