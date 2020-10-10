const Userfollow = (sequelize, DataTypes) => {
  return sequelize.define("userfollow", {
    user1Id: DataTypes.INTEGER,
    user2Id: DataTypes.INTEGER
  });
};

export default Userfollow;

