import { Models } from "../../models";
import express from "express";

const postRouter = express.Router();

// Get posts by username
postRouter.get("/", async (req, res) => {
  const { user } = req.query;
  if (user) {
    const userFound = await Models.User.findOne({
      include: { all: true, nested: true },
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
postRouter.post("/", async (req, res) => {
  const { description, longitude, latitude } = req.body;

  const post = await Models.Post.create({
    userId: req.user.id,
    description,
    longitude,
    latitude,
  });
  res.json(post);
});

export default postRouter;
