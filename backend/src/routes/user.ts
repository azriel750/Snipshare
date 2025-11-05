import express from "express";
import { UserController } from "../controllers/user"
import { authenticate } from "../middleware/auth";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import prisma from "../prismaclient";

const router = express.Router();
const JWT_SECRET = process.env.BACKEND_JWT_SECRET || "secret"; 

router.post("/register", (req, res) => {
  const controller = new UserController(req, res);
  return controller.register();
});
router.post("/login", async (req, res) => {
  const { email, motdepasse } = req.body;

  try {
    const user = await prisma.utilisateur.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Utilisateur non trouvé" });

    const valid = await argon2.verify(user.motdepasse_hash, motdepasse);
    if (!valid) return res.status(401).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign(
      { userId: user.identifiant_utilisateur, email: user.email },
      JWT_SECRET,
      { expiresIn: "12h" } 
    );

    res.json({ token, userId: user.identifiant_utilisateur, email: user.email });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/profile", authenticate, (req, res) => {
  const controller = new UserController(req, res);
  return controller.profile();
});

export default router;
