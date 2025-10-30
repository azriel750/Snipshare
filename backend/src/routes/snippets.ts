import express from "express";
import { authenticate } from "../middleware/auth";
import { SnippetController } from "../controllers/Snippet";
import { CommentController } from "../controllers/comment";

const router = express.Router();

router.post("/", authenticate, (req, res) => {
  const controller = new SnippetController(req, res);
  return controller.create();
});

router.get("/", (req, res) => {
  const controller = new SnippetController(req, res);
  return controller.getAll();
});

router.get("/:id", (req, res) => {
  const controller = new SnippetController(req, res);
  return controller.getById(Number(req.params.id));
});
router.get("/snippet/:id", (req, res) => {
  const controller = new CommentController(req, res);
  return controller.getBySnippetId(Number(req.params.id));
});
router.put("/:id", authenticate, (req, res) => {
  const controller = new SnippetController(req, res);
  return controller.update(Number(req.params.id));
});

router.delete("/:id", authenticate, (req, res) => {
  const controller =  new SnippetController(req, res);
  return controller.delete(Number(req.params.id));
});
router.get("/user/:userId", (req, res) => {
  const controller = new SnippetController(req, res);
  return controller.getByUser(Number(req.params.userId));
});

router.get("/tag/:tagId", (req, res) => {
  const controller = new SnippetController(req, res);
  return controller.getByTag(Number(req.params.tagId));
});
export default router;
