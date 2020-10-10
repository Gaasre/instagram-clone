import { Models } from "../../models";
import express from "express";
import rankFeed from "../../helpers/ranking";

const feedRouter = express.Router();

// Get feed by token
feedRouter.get("/", async (req, res) => {
  const { id } = req.user;

  // get the users which our user(token) follow
  let users = await Models.Userfollow.findAll({
    include: { all: true, nested: true },
    where: { user1Id: id },
    limit: 20,
    order: [["createdAt", "DESC"]],
  });
  if (!users) {
    return res.status(404).send(`User ${username} not found.`);
  }

  const posts = [];
  // fetch top 20 posts from each of the following
  await Promise.all(
    users.map(async (f) => {
      const _posts = await Models.Post.findAll({
        include: [
          {
            model: Models.User,
            as: "user",
            attributes: ["id", "username"],
          },
          {
            model: Models.Comment,
            as: "comments",
            limit: 5,
            order: [["createdAt", "DESC"]],
            attributes: ["id", "content", "createdAt"],
            include: {
              model: Models.User,
              as: "user",
              attributes: ["id", "username"],
            },
          },
          {
            model: Models.Like,
            as: "likes",
            limit: 5,
            attributes: ["id", "createdAt"],
            include: {
              model: Models.User,
              as: "user",
              attributes: ["id", "username"],
            },
          },
        ],
        where: {
          userId: f.user2Id,
        },
        order: [["createdAt", "DESC"]],
        limit: 20
      });
      posts.push(..._posts);
    })
  );

  // submit the posts to the ranking algorithm
  const rankedFeed = rankFeed(posts);
  res.json(rankedFeed);
});

export default feedRouter;
