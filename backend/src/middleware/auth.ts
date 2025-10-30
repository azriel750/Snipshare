import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.BACKEND_JWT_SECRET || "secret";

declare module "express-serve-static-core" {
  interface Request {
    userId?: number;
  }
}
export interface AuthRequest extends Request {
  userId?: number;
}
/**
 * Middleware d'authentification.
 * 
 * Vérifie le JWT envoyé dans le header Authorization (Bearer <token>).
 * Si le token est valide, ajoute userId à la requête.
 * Prévu pour évoluer vers la gestion des refresh tokens.
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token manquant" });

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number };
    (req as AuthRequest).userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ error: "Token invalide" });
  }
};
