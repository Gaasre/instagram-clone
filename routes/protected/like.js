import { Models } from "../../models";
import express from "express";

const likeRouter = express.Router();

// Get likes by postid
likeRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  let { page } = req.query;

  if (!page) {
    page = 0;
  }

  const post = await Models.Post.findByPk(id, {
    include: [
      {
        model: Models.Like,
        as: "likes",
        limit: 20,
        offset: page * 20,
        attributes: ["id", "createdAt"],
        include: {
          model: Models.User,
          as: "user",
          attributes: ["id", "username"],
        },
      },
    ],
  });

  if (post) {
    const countLikes = await Models.Like.count({ where: { postId: id } });

    let likes = {
      per_page: 20,
      page: page,
      total_pages: Math.ceil(countLikes / 20),
      data: post.likes,
    };

    return res.json(likes);
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
