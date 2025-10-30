import { Controller } from "../libs/controller";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/auth";
import prisma from "../prismaclient";

const JWT_SECRET = process.env.BACKEND_JWT_SECRET || "secret";

interface UserBody {
  email: string;
  motdepasse: string;
}

export class UserController extends Controller {

 
  async register() {
    const { email, motdepasse } = this.request.body as UserBody;
    try {
      const hash = await argon2.hash(motdepasse);

      const user = await prisma.utilisateur.create({
        data: {
          email,
          motdepasse_hash: hash,
        },
      });

      return this.json({ id: user.identifiant_utilisateur, email: user.email }, 201);
    } catch (err: any) {
      console.error(err);
      return this.error("Erreur lors de l'inscription");
    }
  }

  async login() {
    const { email, motdepasse } = this.request.body as UserBody;

    try {
      const user = await prisma.utilisateur.findUnique({
        where: { email },
      });

      if (!user) return this.error("Utilisateur introuvable", 404);

      const valid = await argon2.verify(user.motdepasse_hash, motdepasse);
      if (!valid) return this.error("Mot de passe incorrect", 401);

      const token = jwt.sign({ userId: user.identifiant_utilisateur }, JWT_SECRET, {
        expiresIn: "2h",
      });

      return this.json({ token });
    } catch (err: any) {
      console.error(err);
      return this.error("Erreur lors de la connexion");
    }
  }
async getById(userId: number) {
  try {
    const user = await prisma.utilisateur.findUnique({
      where: { identifiant_utilisateur: userId },
      select: { identifiant_utilisateur: true, email: true },
    });
    if (!user) return this.error("Utilisateur introuvable", 404);
    return this.json(user);
  } catch (err: any) {
    console.error(err);
    return this.error(err.message, 500);
  }
}

  async profile() {
    const req = this.request as AuthRequest;
    const userId = req.userId!;
    try {
      const user = await prisma.utilisateur.findUnique({
        where: { identifiant_utilisateur: userId },
        select: { identifiant_utilisateur: true, email: true },
      });

      if (!user) return this.error("Utilisateur introuvable", 404);
      return this.json(user);
    } catch (err: any) {
      console.error(err);
      return this.error("Erreur lors de la récupération du profil");
    }
  }
}
