const Photo = (sequelize, DataTypes) => {
  return sequelize.define("photo", {
    path: DataTypes.STRING
  });
};

export default Photo;
