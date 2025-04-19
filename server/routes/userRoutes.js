import express from "express";
import { registerUser, getScore } from "../controllers/userController.js";

const router = express.Router();

router.post("/register-user", registerUser);
router.get("/score/:username", getScore);

export default router;
