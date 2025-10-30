import express from "express";
import { LikeController } from "../controllers/like";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/", authenticate, (req, res) => {
  const controller = new LikeController(req, res);
  return controller.toggleLike();
});

export default router;
