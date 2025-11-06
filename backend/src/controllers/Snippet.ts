import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { Controller } from "../libs/controller";
import prisma from "../prismaclient";

interface SnippetBody {
  titre: string;
  code: string;
  langage: string;
  visibilite: "public" | "private" | "non-repertorie";
  tags?: string[];
}

export class SnippetController extends Controller {

  constructor(request: Request, response: Response) {
    super(request, response);
  }

  async create() {
    const { titre, code, langage, visibilite, tags } = this.request.body as SnippetBody;
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
        include: {
          snippetTag: { include: { tag: true } }
        }
      });

      if (Array.isArray(tags) && tags.length > 0) {
        const normalized = tags.slice(0, 5).map(t => t.trim()).filter(Boolean);

        for (const name of normalized) {
          const tag = await prisma.tag.upsert({
            where: { name },
            update: {},
            create: { name }
          });

          await prisma.snippetTag.create({
            data: { snippetId: snippet.identifiant_snippet, tagId: tag.identifiant_tag }
          });
        }
      }

      const snippetWithTags = await prisma.snippet.findUnique({
        where: { identifiant_snippet: snippet.identifiant_snippet },
        include: { snippetTag: { include: { tag: true } } }
      });

      const response = {
        ...snippetWithTags,
        tags: snippetWithTags?.snippetTag?.map(st => st.tag.name) ?? []
      };

      return this.json(response, 201);

    } catch (err) {
      console.error(err);
      return this.error("Erreur lors de la création du snippet");
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
                { titre: { contains: String(q), mode: "insensitive" } },
                { code: { contains: String(q), mode: "insensitive" } }
              ]
            } : {},

            langage ? {
              langage: { contains: String(langage), mode: "insensitive" }
            } : {},

            tag ? {
              snippetTag: {
                some: {
                  tag: { name: { equals: String(tag), mode: "insensitive" } }
                }
              }
            } : {}
          ]
        },
        include: {
          snippetTag: { include: { tag: true } }
        },
        orderBy: { creer_le: "desc" }
      });

      const response = snippets.map(s => ({
        ...s,
        tags: s.snippetTag.map(st => st.tag.name)
      }));

      return this.json(response);

    } catch (err) {
      console.error(err);
      return this.error("Erreur lors de la récupération filtrée.");
    }
  }
  async getById(id: number) {
    try {
      const snippet = await prisma.snippet.findUnique({
        where: { identifiant_snippet: id },
        include: { snippetTag: { include: { tag: true } } }
      });

      if (!snippet) return this.error("Snippet introuvable", 404);

      return this.json({
        ...snippet,
        tags: snippet.snippetTag.map(st => st.tag.name)
      });

    } catch (err) {
      console.error(err);
      return this.error("Erreur lors de la récupération du snippet");
    }
  }

  async delete(id: number) {
    try {
      await prisma.snippetTag.deleteMany({ where: { snippetId: id } });

      const snippet = await prisma.snippet.delete({
        where: { identifiant_snippet: id }
      });

      return this.json(snippet);

    } catch (err) {
      console.error(err);
      return this.error("Erreur lors de la suppression du snippet");
    }
  }

  async update(id: number) {
    const { titre, code, langage, visibilite, tags } = this.request.body as SnippetBody;

    try {
      await prisma.snippet.update({
        where: { identifiant_snippet: id },
        data: { titre, code, langage, visibilite }
      });

      await prisma.snippetTag.deleteMany({ where: { snippetId: id } });

      if (Array.isArray(tags) && tags.length > 0) {
        const normalized = tags.slice(0, 5).map(t => t.trim()).filter(Boolean);

        for (const name of normalized) {
          const tag = await prisma.tag.upsert({
            where: { name },
            update: {},
            create: { name }
          });

          await prisma.snippetTag.create({
            data: { snippetId: id, tagId: tag.identifiant_tag }
          });
        }
      }
      const snippetWithTags = await prisma.snippet.findUnique({
        where: { identifiant_snippet: id },
        include: { snippetTag: { include: { tag: true } } }
      });

      return this.json({
        ...snippetWithTags,
        tags: snippetWithTags?.snippetTag?.map(st => st.tag.name) ?? []
      });

    } catch (err) {
      console.error(err);
      return this.error("Erreur lors de la mise à jour du snippet");
    }
  }
  async getByUser(userId: number) {
    try {
      const snippets = await prisma.snippet.findMany({
        where: { identifiant_utilisateur: userId },
        include: { snippetTag: { include: { tag: true } } },
        orderBy: { creer_le: "desc" }
      });

      const response = snippets.map(s => ({
        ...s,
        tags: s.snippetTag.map(st => st.tag.name)
      }));

      return this.json(response);

    } catch (err) {
      console.error(err);
      return this.error("Erreur lors de la récupération des snippets utilisateur");
    }
  }
  async getByTag(tagId: number) {
    try {
      const snippets = await prisma.snippet.findMany({
        where: {
          snippetTag: { some: { tagId } }
        },
        include: { snippetTag: { include: { tag: true } } },
        orderBy: { creer_le: "desc" }
      });

      const response = snippets.map(s => ({
        ...s,
        tags: s.snippetTag.map(st => st.tag.name)
      }));

      return this.json(response);

    } catch (err) {
      console.error(err);
      return this.error("Erreur lors de la récupération des snippets par tag");
    }
  }
}
