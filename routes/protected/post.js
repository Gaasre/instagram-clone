import { Models } from "../../models";
import express from "express";
import uploadFile from "../../middlewares/upload";

const postRouter = express.Router();

// Get posts by username
postRouter.get("/", async (req, res) => {
  const { user } = req.query;
  if (user) {
    const userFound = await Models.User.findOne({
      include: { all: true, nested: true },
      attributes: {
        exclude: ["password"],
      },
      where: {
        username: user,
      },
    });
    if (userFound) {
      return res.json(userFound.posts);
    }
    res.status(404).status(`User ${user} not found.`);
  }
  res.status(404).send("User is not specified");
});

// Get one
postRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const post = await Models.Post.findByPk(id, {
    include: { all: true, nested: true },
  });
  if (!post) {
    return res.status(404).send("Post not found.");
  }
  res.json(post);
});

// New post
postRouter.post("/", uploadFile, async (req, res) => {
  const { description, longitude, latitude } = req.body;
  // Create the post first to get its id
  const post = await Models.Post.create({
    userId: req.user.id,
    description,
    longitude,
    latitude,
  });
  // Check for files in the request
  const files = req.files;
  await Promise.all(
    files.map(async (file) => {
      // store in photo table
      const folder = file.destination.split("/")[2];
      const photo = await Models.Photo.create({
        path: `${folder}/${file.filename}`,
      });
      // store in photopost table
      const photopost = await Models.PhotoPost.create({
        photoId: photo.id,
        postId: post.id,
      });
    })
  );
  res.json(post);
});

export default postRouter;
