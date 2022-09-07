const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

//Models
const User = require("./models/User");
const Post = require("./models/Post");

//Routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

//Synchronize any newly added models to our database
(async () => {
  await User.sync({});
  await Post.sync({});
})();

//Request logger
app.use(morgan("tiny"));

//cors
app.use(cors({ origin: true, credentials: true, exposedHeaders: ["Auth"] }));

//Body parsers for requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Add routes
app.use("/user", userRoutes);
app.use("/post", postRoutes);

app.listen(3001);
