const Post = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });
};

export default Post;


