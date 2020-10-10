import { Models } from "../../models";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signupRouter = express.Router();

signupRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  // hash password
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
        return res.status(500).send(err.message);
    }
    // Store user
    const user = await Models.User.create({
      username: username,
      password: hash
    });
    if (!user) {
        return res.status(500).send('Error while saving');
    }
    const accessToken = jwt.sign(
        { id: user.id },
        process.env.KEY
    );

    res.json({
        accessToken,
    });
  });
});

export default signupRouter;
