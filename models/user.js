const Post = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    photoId: DataTypes.INTEGER
  });
};

export default Post;


