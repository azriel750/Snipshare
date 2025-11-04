import express from "express";
import { authenticate } from "../middleware/auth";
import { SnippetController } from "../controllers/Snippet";
import { CommentController } from "../controllers/comment";

const router = express.Router();
router.get("/user/:userId", authenticate, (req, res) => {
  const requestedId = Number(req.params.userId);
  const authId = (req as any).userId;

  if (requestedId !== authId) {
    return res.status(403).json({ error: "Accès refusé" });
  }

  return new SnippetController(req, res).getByUser(requestedId);
});
router.get("/tag/:tagId", (req, res) =>
  new SnippetController(req, res).getByTag(Number(req.params.tagId))
);

router.post("/", authenticate, (req, res) =>
  new SnippetController(req, res).create()
);

router.get("/user/me", authenticate, (req, res) =>
  new SnippetController(req, res).getByUser((req as any).userId)
);
router.get("/snippet/:id", (req, res) =>
  new CommentController(req, res).getBySnippetId(Number(req.params.id))
);

router.get("/", (req, res) =>
  new SnippetController(req, res).getAll()
);
router.get("/:id", (req, res) =>
  new SnippetController(req, res).getById(Number(req.params.id))
);
router.put("/:id", authenticate, (req, res) =>
  new SnippetController(req, res).update(Number(req.params.id))
);
router.delete("/:id", authenticate, (req, res) =>
  new SnippetController(req, res).delete(Number(req.params.id))
);



export default router;
