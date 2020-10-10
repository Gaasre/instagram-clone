const Post = (sequelize, DataTypes) => {
  return sequelize.define("post", {
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    longitude: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER,
    commentCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    likeCount: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};

export default Post;

