import express from "express"
import { generateCode } from "../controllers/generateCode.controller.js";

const router = express.Router();

router.post("/:sessionId", generateCode)

export default router;
