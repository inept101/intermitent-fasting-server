import jwt from "jsonwebtoken";
import parseAndSend from "../util/responseWraper.js";

export const isAuth = (req, res, next) => {
  if (req?.headers?.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const admin = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = admin;
  } else {
    return parseAndSend(res, false, 400, "Authorization required");
  }
  next();
};
