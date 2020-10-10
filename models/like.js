const Like = (sequelize, DataTypes) => {
  return sequelize.define("like", {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  });
};

export default Like;
