import { signInUser, signUpUser } from "../controllers/auth.controller.js";
import express from "express"

const router = express.Router()

router.post("/signup", signUpUser);
router.post("/signin", signInUser);

export default router;