import jwt from "jsonwebtoken";
import User from "../models/user.js";
import parseAndSend from "../util/responseWraper.js";

export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return parseAndSend(res, false, 403, "email incorrect");
    }
    if (user.authenticate(req.body.password)) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      const { _id, email } = user;

      return parseAndSend(res, true, 200, "user Authorized", {
        token,
        user: { id: user._id, email: user.email, name: user.name },
      });
    } else {
      return parseAndSend(res, false, 403, "Invalid Password");
    }
  } catch (error) {
    console.log(error);
    parseAndSend(res, false, 500, "somthing went wrong at our end");
  }
};
export const signUp = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return parseAndSend(res, false, 403, "email already exist");
    }
    const { name, email, password } = req.body;
    const _user = await new User({ email, name, password }).save();
    if (!_user) {
      parseAndSend(res, false, 400, "somthing went wrong with our DB");
    }
    const token = jwt.sign({ email: _user.email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return parseAndSend(res, true, 200, "user Created", {
      token,
      user: { id: _user._id, email: _user.email, name: _user.name },
    });
  } catch (error) {
    console.log(error);
    parseAndSend(res, false, 500, "somthing went wrong at our end");
  }
};
