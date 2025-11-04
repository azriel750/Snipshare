import { Request, Response } from "express";
import prisma from "../prismaclient";
import { Controller } from "../libs/controller";
import { AuthRequest } from "../middleware/auth";

export class TagController extends Controller {
  async addTags() {
    const { name } = this.request.body;
    if (!name) return this.error("Tag manquant", 400);

    try {
      const tag = await prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      });
      return this.json(tag);
    } catch (err: any) {
      console.error(err);
      return this.error(err.message, 500);
    }
  }
  async getAll() {
  try {
    const tags = await prisma.tag.findMany();
    return this.json(tags);
  } catch (err: any) {
    console.error(err);
    return this.error(err.message, 500);
  }
}
async create() {
  const { titre, code, langage, visibilite, tags = [] } = this.request.body;

  if (tags.length > 5)
    return this.error("Maximum 5 tags autorisés", 400);

  const userId = (this.request as AuthRequest).userId!;

  try {
    const snippet = await prisma.snippet.create({
      data: {
        titre,
        code,
        langage,
        visibilite,
        identifiant_utilisateur: userId,
        snippetTag: {
          create: tags.map((name: string) => ({
            tag: {
              connectOrCreate: {
                where: { name },
                create: { name }
              }
            }
          }))
        }
      },
      include: {
        snippetTag: { include: { tag: true } }
      }
    });

    return this.json(snippet, 201);
  } catch (err) {
    console.error(err);
    return this.error("Erreur lors de la création", 500);
  }
}
async update(id: number) {
  const { titre, code, langage, visibilite, tags = [] } = this.request.body;

  try {
    const updated = await prisma.snippet.update({
      where: { identifiant_snippet: id },
      data: {
        titre,
        code,
        langage,
        visibilite,

        snippetTag: {
          deleteMany: {},  
          create: tags.map((name: string) => ({
            tag: {
              connectOrCreate: {
                where: { name },
                create: { name }
              }
            }
          }))
        }
      },
      include: {
        snippetTag: { include: { tag: true } }
      }
    });

    return this.json(updated);
  } catch (err) {
    console.error(err);
    return this.error("Erreur lors de la mise à jour", 500);
  }
}
async getAll() {
  const { q, langage, tag } = this.request.query;

  try {
    const snippets = await prisma.snippet.findMany({
      where: {
        AND: [
          q ? {
            OR: [
              { titre: { contains: String(q), mode: "insensitive" }},
              { code: { contains: String(q), mode: "insensitive" }},
            ]
          } : {},

          langage ? { langage: String(langage) } : {},

          tag ? {
            snippetTag: {
              some: {
                tag: { name: String(tag) }
              }
            }
          } : {}
        ]
      },
      orderBy: { creer_le: "desc" },
      include: {
        snippetTag: { include: { tag: true } }
      }
    });

    return this.json(snippets);
  } catch (err) {
    console.error(err);
    return this.error("Erreur lors de la récupération", 500);
  }
}
async getById(id: number) {
  try {
    const snippet = await prisma.snippet.findUnique({
      where: { identifiant_snippet: id },
      include: {
        snippetTag: { include: { tag: true } }
      }
    });

    if (!snippet) return this.error("Snippet introuvable", 404);

    return this.json(snippet);
  } catch (err) {
    console.error(err);
    return this.error("Erreur lors de la récupération");
  }
}
async getByUser(userId: number) {
  try {
    const snippets = await prisma.snippet.findMany({
      where: { identifiant_utilisateur: userId },
      orderBy: { creer_le: "desc" },
      include: {
        snippetTag: { include: { tag: true } }
      }
    });

    return this.json(snippets);
  } catch (err) {
    console.error(err);
    return this.error("Erreur interne", 500);
  }
}
async getByTag(tagId: number) {
  try {
    const snippets = await prisma.snippet.findMany({
      where: {
        snippetTag: {
          some: {
            tagId: tagId
          }
        }
      },
      include: {
        snippetTag: { include: { tag: true } }
      },
      orderBy: { creer_le: "desc" },
    });

    return this.json(snippets);
  } catch (err) {
    console.error(err);
    return this.error("Erreur interne", 500);
  }
}

}
