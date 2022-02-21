import express from "express";

const router = express.Router();

import { signIn, signUp } from "../controller/users.js";

router.post("/signin", signIn);

router.post("/signup", signUp);

export default router;
