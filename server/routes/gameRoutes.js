import express from "express";
import {
  getRandomDestination,
  checkAnswer,
} from "../controllers/gameController.js";

const router = express.Router();

router.get("/destination/random", getRandomDestination);
router.post("/answer", checkAnswer);

export default router;
