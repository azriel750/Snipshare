import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { Controller } from "../libs/controller";
import prisma from "../prismaclient";

interface SnippetBody {
  titre: string;
  code: string;
  langage: string;
  visibilite: "public" | "private" | "non-repertorie";
}

export class SnippetController extends Controller {
  
  constructor(request: Request, response: Response) {
    super(request, response);
  }

  async create() {
    const { titre, code, langage, visibilite } = this.request.body as SnippetBody;
    const userId = (this.request as AuthRequest).userId!;

    try {
      const snippet = await prisma.snippet.create({
        data: {
          titre,
          code,
          langage,
          visibilite,
          identifiant_utilisateur: userId,
        },
      });
      return this.json(snippet, 201);
    } catch (err: any) {
      console.error(err);
      return this.error("Erreur lors de la création du snippet");
    }
  }

  async getAll() {
    try {
      const snippets = await prisma.snippet.findMany({
        orderBy: { creer_le: "desc" },
      });
      return this.json(snippets);
    } catch (err: any) {
      console.error(err);
      return this.error("Erreur lors de la récupération des snippets");
    }
  }

  async getById(id: number) {
    try {
      const snippet = await prisma.snippet.findUnique({
        where: { identifiant_snippet: id },
      });
      if (!snippet) return this.error("Snippet introuvable", 404);
      return this.json(snippet);
    } catch (err: any) {
      console.error(err);
      return this.error("Erreur lors de la récupération du snippet");
    }
  }

  async delete(id: number) {
    try {
      const snippet = await prisma.snippet.delete({
        where: { identifiant_snippet: id },
      });
      return this.json(snippet);
    } catch (err: any) {
      console.error(err);
      return this.error("Erreur lors de la suppression du snippet");
    }
  }


  async update(id: number) {
    const { titre, code, langage, visibilite } = this.request.body as SnippetBody;

    try {
      const snippet = await prisma.snippet.update({
        where: { identifiant_snippet: id },
        data: { titre, code, langage, visibilite },
      });
      return this.json(snippet);
    } catch (err: any) {
      console.error(err);
      return this.error("Erreur lors de la mise à jour du snippet");
    }
  }
  async getByUser(userId: number) {
  try {
    const snippets = await prisma.snippet.findMany({
      where: { identifiant_utilisateur: userId },
      orderBy: { creer_le: "desc" },
    });
    return this.json(snippets);
  } catch (err: any) {
    console.error(err);
    return this.error(err.message, 500);
  }
}

async getByTag(tagId: number) {
  try {
    const snippets = await prisma.snippet.findMany({
      where: { tags: { some: { identifiant_tag: tagId } } },
      orderBy: { creer_le: "desc" },
    });
    return this.json(snippets);
  } catch (err: any) {
    console.error(err);
    return this.error(err.message, 500);
  }
}

}
