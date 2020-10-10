const Post = (sequelize, DataTypes) => {
  return sequelize.define("post", {
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    longitude: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER,
    commentCount: { type: DataTypes.INTEGER },
    likeCount: { type: DataTypes.INTEGER }
  });
};

export default Post;

