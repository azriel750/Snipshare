import { Request, Response } from "express";
import prisma from "../prismaclient";
import { Controller } from "../libs/controller";

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

}
