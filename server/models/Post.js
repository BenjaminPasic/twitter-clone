const { Sequelize, DataTypes } = require("sequelize");
const dbConnection = require("../config/dbConnection");

const Post = dbConnection.define("post", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  post: {
    type: Sequelize.STRING(180),
    allowNull: false,
  },
});

module.exports = Post;
