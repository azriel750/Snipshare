import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// 🧾 INSCRIPTION
router.post("/register", async (req, res) => {
  const { email, motdepasse } = req.body;

  if (!email || !motdepasse)
    return res.status(400).json({ message: "Email et mot de passe requis" });

  try {
    const existingUser = await prisma.utilisateur.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

    const hash = await bcrypt.hash(motdepasse, 10);
    const user = await prisma.utilisateur.create({
      data: { email, motdepasse_hash: hash },
    });

    const token = jwt.sign({ id: user.identifiant_utilisateur }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, utilisateur: { id: user.identifiant_utilisateur, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🔐 CONNEXION
router.post("/login", async (req, res) => {
  const { email, motdepasse } = req.body;

  if (!email || !motdepasse)
    return res.status(400).json({ message: "Email et mot de passe requis" });

  try {
    const user = await prisma.utilisateur.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

    const valid = await bcrypt.compare(motdepasse, user.motdepasse_hash);
    if (!valid) return res.status(400).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user.identifiant_utilisateur }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, utilisateur: { id: user.identifiant_utilisateur, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
