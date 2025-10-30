-- CreateTable
CREATE TABLE "Utilisateur" (
    "identifiant_utilisateur" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "motdepasse_hash" TEXT NOT NULL,
    "creer_le" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("identifiant_utilisateur")
);

-- CreateTable
CREATE TABLE "Snippet" (
    "identifiant_snippet" SERIAL NOT NULL,
    "titre" TEXT,
    "code" TEXT,
    "langage" TEXT,
    "visibilite" TEXT,
    "creer_le" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "identifiant_utilisateur" INTEGER NOT NULL,

    CONSTRAINT "Snippet_pkey" PRIMARY KEY ("identifiant_snippet")
);

-- CreateTable
CREATE TABLE "Tag" (
    "identifiant_tag" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("identifiant_tag")
);

-- CreateTable
CREATE TABLE "aimer" (
    "identifiant_utilisateur" INTEGER NOT NULL,
    "identifiant_snippet" INTEGER NOT NULL,

    CONSTRAINT "aimer_pkey" PRIMARY KEY ("identifiant_utilisateur","identifiant_snippet")
);

-- CreateTable
CREATE TABLE "commenter" (
    "identifiant_utilisateur" INTEGER NOT NULL,
    "identifiant_snippet" INTEGER NOT NULL,
    "date_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "texte" TEXT,

    CONSTRAINT "commenter_pkey" PRIMARY KEY ("identifiant_utilisateur","identifiant_snippet")
);

-- CreateTable
CREATE TABLE "snippetTag" (
    "snippetId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "snippetTag_pkey" PRIMARY KEY ("snippetId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "Snippet" ADD CONSTRAINT "Snippet_identifiant_utilisateur_fkey" FOREIGN KEY ("identifiant_utilisateur") REFERENCES "Utilisateur"("identifiant_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aimer" ADD CONSTRAINT "aimer_identifiant_utilisateur_fkey" FOREIGN KEY ("identifiant_utilisateur") REFERENCES "Utilisateur"("identifiant_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aimer" ADD CONSTRAINT "aimer_identifiant_snippet_fkey" FOREIGN KEY ("identifiant_snippet") REFERENCES "Snippet"("identifiant_snippet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commenter" ADD CONSTRAINT "commenter_identifiant_utilisateur_fkey" FOREIGN KEY ("identifiant_utilisateur") REFERENCES "Utilisateur"("identifiant_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commenter" ADD CONSTRAINT "commenter_identifiant_snippet_fkey" FOREIGN KEY ("identifiant_snippet") REFERENCES "Snippet"("identifiant_snippet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "snippetTag" ADD CONSTRAINT "snippetTag_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "Snippet"("identifiant_snippet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "snippetTag" ADD CONSTRAINT "snippetTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("identifiant_tag") ON DELETE RESTRICT ON UPDATE CASCADE;
