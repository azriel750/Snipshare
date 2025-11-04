import { AuthRequest } from "../middleware/auth";
import { Controller } from "../libs/controller";
import prisma from "../prismaclient";

export class LikeController extends Controller {

  async toggleLike() {
    const req = this.request as AuthRequest; 
    const userId = req.userId!;
    const snippetId = Number(req.body.snippetId);

    if (!snippetId) return this.error("Snippet manquant", 400);

    try {
      const like = await prisma.aimer.upsert({
        where: {
          identifiant_utilisateur_identifiant_snippet: {
            identifiant_utilisateur: userId,
            identifiant_snippet: snippetId,
          },
        },
        update: {},
        create: {
          identifiant_utilisateur: userId,
          identifiant_snippet: snippetId,
        },
      });
      return this.json(like);
    } catch (err: any) {
      console.error(err);
      return this.error(err.message, 500);
    }
    
  }
  async getLikesBySnippet(snippetId: number) {
  try {
    const likes = await prisma.aimer.findMany({
      where: { identifiant_snippet: snippetId },
    });
    return this.json({ count: likes.length, likes });
  } catch (err: any) {
    console.error(err);
    return this.error(err.message, 500);
  }
}
async countLikes() {
  const snippetId = Number(this.request.params.id);

  const count = await prisma.aimer.count({
    where: { identifiant_snippet: snippetId }
  });

  return this.json({ count });
}
async getLikedByUser(userId: number) {
  try {
    const likes = await prisma.aimer.findMany({
      where: { identifiant_utilisateur: userId },
      include: { snippet: true },
    });

    return this.json(likes.map(l => l.snippet));
  } catch (err: any) {
    console.error(err);
    return this.error("Erreur lors de la récupération des likes");
  }
}

}
