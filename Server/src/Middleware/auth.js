import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismytoken");
    // console.log(decoded._id);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
    // console.log(token);
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default auth;
