import { Models } from "../../models";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await Models.User.findOne({
    where: {
      username: username,
    },
  });
  // if user does exist
  if (user) {
    // Verify password does match
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // Generate an access token
      const accessToken = jwt.sign({ id: user.id }, process.env.KEY);

      return res.json({
        accessToken,
      });
    }
  }
  res.status(404).send("Username or password incorrect");
});

export default loginRouter;
