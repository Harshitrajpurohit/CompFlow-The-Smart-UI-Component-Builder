import { signInUser, signUpUser } from "../controllers/Auth.controller.js";
import express from "express"

const router = express.Router()

router.post("/signup", signUpUser);
router.post("/signin", signInUser);

export default router;