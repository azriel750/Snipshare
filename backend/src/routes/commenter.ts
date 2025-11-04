import express from "express";
import { CommentController } from "../controllers/comment";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/", authenticate, (req, res) => {
  const controller = new CommentController(req, res);
  return controller.addComment();
});
router.get("/snippet/:id", (req, res) => {
  const controller = new CommentController(req, res);
  return controller.getCommentsBySnippet();
});
export default router;
