import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.commenter.deleteMany();
  await prisma.aimer.deleteMany();
  await prisma.snippetTag.deleteMany();
  await prisma.snippet.deleteMany();
  await prisma.utilisateur.deleteMany();

  const utilisateur = await prisma.utilisateur.create({
    data: {
      email: "test@exemple.com",
      motdepasse_hash: "fakehash123",
      snippets: {
        create: [
          {
            titre: "Hello World en JS",
            code: 'console.log("Hello World");',
            langage: "JavaScript",
            visibilite: "public",
          },
          {
            titre: "Snippet Python",
            code: 'print("Bonjour le monde")',
            langage: "Python",
            visibilite: "public",
          },
        ],
      },
    },
  });

  console.log("✅ Données de test insérées :", utilisateur);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
