const PhotoPost = (sequelize, DataTypes) => {
    return sequelize.define("photopost", {
      photoId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER
    });
  };
  
  export default PhotoPost;