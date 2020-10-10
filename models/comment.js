const Comment = (sequelize, DataTypes) => {
  return sequelize.define("comment", {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  });
};

export default Comment;