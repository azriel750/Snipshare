import express from "express";
import { UserController } from "../controllers/user"
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/register", (req, res) => {
  const controller = new UserController(req, res);
  return controller.register();
});

router.post("/login", (req, res) => {
  const controller = new UserController(req, res);
  return controller.login();
});

router.get("/profile", authenticate, (req, res) => {
  const controller = new UserController(req, res);
  return controller.profile();
});

export default router;
