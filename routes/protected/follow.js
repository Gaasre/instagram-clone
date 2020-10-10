import { Models } from "../../models";
import express from "express";

const followRouter = express.Router();

// Get followers by username
followRouter.get("/followers/:username", async (req, res) => {
  const { username } = req.params;

  const user = await Models.User.findOne({
    include: { all: true, nested: true },
    where: {
      username: username
    }
  });
  if (user) {
    return res.json(user.followers);
  }
  res.status(404).send(`User ${username} not found`);
});

// Get followings by username
followRouter.get("/followings/:username", async (req, res) => {
  const { username } = req.params;

  const user = await Models.User.findOne({
    include: { all: true, nested: true },
    where: {
      username: username
    }
  });
  if (user) {
    return res.json(user.followings);
  }
  res.status(404).send(`User ${username} not found`);
});

// New follow
followRouter.post("/", async (req, res) => {
  const { userId } = req.body;

  const follow = await Models.Userfollow.create({
    user1Id: req.user.id,
    user2Id: userId
  });
  res.json(follow);
});

export default followRouter;
