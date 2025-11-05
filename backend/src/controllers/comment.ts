import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { Controller } from "../libs/controller";
import prisma from "../prismaclient";

interface CommentBody {
  snippetId: number;
  texte: string;
}

export class CommentController extends Controller {

  constructor(request: Request, response: Response) {
    super(request, response);
  }

  async addComment() {
    const req = this.request as AuthRequest;
    const userId = req.userId!;
    const { snippetId, texte } = req.body as CommentBody;

    if (!texte) return this.error("Commentaire vide", 400);

    try {
      const comment = await prisma.commenter.create({
        data: {
          identifiant_utilisateur: userId,
          identifiant_snippet: snippetId,
          texte,
        },
      });
      return this.json(comment);
    } catch (err: any) {
      console.error(err);
      return this.error(err.message, 500);
    }
  }
  async getBySnippetId(snippetId: number) {
  try {
    const comments = await prisma.commenter.findMany({
      where: { identifiant_snippet: snippetId },
      orderBy: { date_: "asc" },
    });
    return this.json(comments);
  } catch (err: any) {
    console.error(err);
    return this.error(err.message, 500);
  }
}
async getCommentsBySnippet() {
  const id = Number(this.request.params.id);

  const comments = await prisma.commenter.findMany({
    where: { identifiant_snippet: id },
    orderBy: { date_: 'desc' }
  });

  return this.json(comments);
}
}
