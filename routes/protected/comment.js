import { Models } from "../../models";
import express from "express";

const commentRouter = express.Router();

// Get comments by postid
commentRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  let { page } = req.query;

  if (!page) {
    page = 0;
  }

  const post = await Models.Post.findByPk(id, {
    include: [
      {
        model: Models.Comment,
        as: "comments",
        limit: 20,
        offset: page * 20,
        attributes: ["id", "content", "createdAt"],
        include: {
          model: Models.User,
          as: "user",
          attributes: ["id", "username"],
        },
      },
    ],
  });

  if (post) {
    const countComments = await Models.Comment.count({ where: { postId: id } });

    let comments = {
      per_page: 20,
      page: page,
      total_pages: Math.ceil(countComments / 20),
      data: post.comments,
    };

    return res.json(comments);
  }
  res.status(404).send(`Post ${id} not found.`);
});

// New comment
commentRouter.post("/", async (req, res) => {
  const { postId, content } = req.body;

  const comment = await Models.Comment.create({
    userId: req.user.id,
    postId: postId,
    content: content,
  });
  const post = await Models.Post.findByPk(postId);

  post.commentCount += 1;
  const saved = await post.save();

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
      post.likeCount = post.commentCount - 1;
      const saved = await post.save();
      return res.status(200).send("Success.");
    }
    return res.status(400).send("Bad request.");
  }
  res.status(404).send(`Comment ${id} not found.`);
});

export default commentRouter;
