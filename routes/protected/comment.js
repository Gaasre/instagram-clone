import { Models } from "../../models";
import express from "express";

const commentRouter = express.Router();

// New comment
commentRouter.post("/", async (req, res) => {
  const { postId, content } = req.body;

  const comment = await Models.Comment.create({
    userId: req.user.id,
    postId: postId,
    content: content,
  });
  const post = await Models.Post.findByPk(postId);
  await Models.Post.update(
    { commentCount: post.commentCount + 1 },
    { where: { id: postId } }
  );

  res.json(comment);
});

// Edit comment
commentRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  // Check if own comment
  const found = await Models.Comment.findByPk(id);
  if (found) {
    if (found.userId === req.user.id) {
      const comment = await Models.Comment.update(
        { content: content },
        { where: { id: id } }
      );
      return res.json(comment);
    }
    return res.status(400).send("Bad request.");
  }
  res.status(404).send(`Comment ${id} not found.`);
});

// Delete comment
commentRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const comment = await Models.Comment.findByPk(id);
  if (comment) {
    if (comment.userId === req.user.id) {
      await Models.Comment.destroy({
        where: {
          id: id,
        },
      });
      // decrease count
      const post = await Models.Post.findByPk(comment.postId);
      await Models.Post.update(
        { commentCount: post.commentCount - 1 },
        { where: { id: comment.postId } }
      );
      return res.status(200).send("Success.");
    }
    return res.status(400).send("Bad request.");
  }
  res.status(404).send(`Comment ${id} not found.`);
});

export default commentRouter;
