import { Models } from "../../models";
import express from "express";

const likeRouter = express.Router();

// Get likes by postid
likeRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const post = await Models.Post.findByPk(id);
  if (post) {
    return res.json(post.likes);
  }
  res.status(404).send(`Post ${id} not found.`);
});

// New like
likeRouter.post("/", async (req, res) => {
  const { postId } = req.body;
  console.log(postId);
  // We check first if the like doesn't exist
  const existingLike = await Models.Like.findOne({
    where: {
      postId: postId,
      userId: req.user.id,
    },
  });

  if (!existingLike) {
    const post = await Models.Post.findByPk(postId);
    if (post) {
      const like = await Models.Like.create({
        userId: req.user.id,
        postId: postId,
      });

      post.likeCount += 1;
      const saved = await post.save();

      return res.json(like);
    }
    return res.status(404).send(`Post ${postId} not found.`);
  }
  res.status(400).send("Already liked");
});

// Delete like
likeRouter.delete("/:postId", async (req, res) => {
  const { postId } = req.params;

  const like = await Models.Like.findOne({
    where: { postId: postId, userId: req.user.id },
  });
  if (like) {
    await Models.Like.destroy({
      where: {
        postId: postId,
        userId: req.user.id,
      },
    });
    // decrease count
    const post = await Models.Post.findByPk(postId);
    post.likeCount = post.likeCount - 1;
    const saved = await post.save();
    return res.status(200).send("Success.");
  }
  res.status(404).send(`Like not found on post ${postId}.`);
});

export default likeRouter;
