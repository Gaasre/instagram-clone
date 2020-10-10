import jwt from 'jsonwebtoken';
import { Models } from '../models';

// Token verification
const verifyToken = async (req, res, next) => {
  const token = req.headers["access-token"];
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token, process.env.KEY, async (err, decoded) => {
      if (err) {
        res.status("404").send("Invalid token");
      } else {
        // if everything is good, save to request for use in other routes
        req.user = await Models.User.findByPk(decoded.id);
        next();
      }
    });
  } else {
    // if there is no token
    res.status("404").send("No token provided");
  }
};

export default verifyToken;
