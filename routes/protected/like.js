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
  // We check first if the like doesn't exist
  const existingLike = await Models.Like.findOne({
    where: {
      postId: postId,
      userId: req.user.id,
    },
  });

  if (!existingLike) {
    const post = await Models.Post.findOne({ id: postId });
    if (post) {
      const like = await Models.Like.create({
        userId: req.user.id,
        postId: postId,
      });

      await Models.Post.update(
        { likeCount: post.likeCount + 1 },
        { where: { id: postId } }
      );

      return res.json(like);
    }
    return res.status(404).send(`Post ${postId} not found.`);
  }
  res.status(400).send("Already liked");
});

// Delete like
likeRouter.delete("/:postId", async (req, res) => {
  const { postId } = req.params;

  const like = await Models.Like.findOne({ where: { postId: postId } });
  if (like) {
    if (like.userId === req.user.id) {
      await Models.Like.destroy({
        where: {
          postId: postId,
          userId: req.user.id,
        },
      });
      // decrease count
      const post = await Models.Post.findOne({ id: postId });
      await Models.Post.update(
        { likeCount: post.likeCount - 1 },
        { where: { id: postId } }
      );
      return res.status(200).send("Success.");
    }
    return res.status(400).send("Bad request.");
  }
  res.status(404).send(`Like not found on post ${postId}.`);
});

export default likeRouter;
