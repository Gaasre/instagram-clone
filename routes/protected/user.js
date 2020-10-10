import { Models } from "../../models";
import express from "express";

const userRouter = express.Router();

// Get all
userRouter.get("/all", async (req, res) => {
  const users = await Models.User.findAll({
    include: { all: true, nested: true },
    attributes: {
      exclude: ["password"],
    },
  });
  res.json(users);
});

// Get one
userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await Models.User.findByPk(id, {
    include: { all: true, nested: true },
    attributes: {
      exclude: ["password"],
    },
  });
  if (!user) {
    return res.status(404).send("User not found.");
  }
  res.json(user);
});

export default userRouter;
