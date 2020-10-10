import User from "./user";
import Userfollow from "./userfollow";
import Photo from "./photo";
import Post from "./post";
import Like from "./like";
import Comment from "./comment";
import Sequelize from "sequelize";

import dotenv from 'dotenv';
// initialize configuration
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {};
const Models = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

Models.User = User(sequelize, Sequelize.DataTypes);
Models.Comment = Comment(sequelize, Sequelize.DataTypes);
Models.Like = Like(sequelize, Sequelize.DataTypes);
Models.Photo = Photo(sequelize, Sequelize.DataTypes);
Models.Post = Post(sequelize, Sequelize.DataTypes);
Models.Userfollow = Userfollow(sequelize, Sequelize.DataTypes);

Models.User.hasMany(Models.Post, { as: "posts" });
Models.User.hasMany(Models.Userfollow, {
  foreignKey: "user1Id",
  as: "followings",
});
Models.User.hasMany(Models.Userfollow, {
  foreignKey: "user2Id",
  as: "followers",
});
Models.User.hasOne(Models.Photo, { as: "photo" });

Models.Comment.belongsTo(Models.User, { foreignKey: "userId", as: "user" });
Models.Comment.belongsTo(Models.Post, { foreignKey: "postId", as: "post" });

Models.Like.belongsTo(Models.User, { foreignKey: "userId", as: "user" });
Models.Like.belongsTo(Models.Post, { foreignKey: "postId", as: "post" });

Models.Post.belongsTo(Models.User, { foreignKey: "userId", as: "user" });
Models.Post.hasMany(Models.Comment, { as: "comments" });
Models.Post.hasMany(Models.Like, { as: "likes" });

export default db;

export { Models };
