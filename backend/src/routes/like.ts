import express from "express";
import { LikeController } from "../controllers/like";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/", authenticate, (req, res) => {
  const controller = new LikeController(req, res);
  return controller.toggleLike();
  
});
router.get("/snippet/:id", (req, res) => {
  const controller = new LikeController(req, res);
  return controller.getLikesBySnippet(Number(req.params.id));
});
router.get("/count/:id", (req, res) => {
  const controller = new LikeController(req, res);
  return controller.countLikes();
});
router.get("/user/:userId", (req, res) => {
  const controller = new LikeController(req, res);
  return controller.getLikedByUser(Number(req.params.userId));
});

export default router;
