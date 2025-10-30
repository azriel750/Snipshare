import express from "express";
import { TagController } from "../controllers/tag";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/", authenticate, (req, res) => {
  const controller = new TagController(req, res);
  return controller.addTags();
});
router.get("/", (req, res) => {
  const controller = new TagController(req, res);
  return controller.getAll();
});
export default router;
