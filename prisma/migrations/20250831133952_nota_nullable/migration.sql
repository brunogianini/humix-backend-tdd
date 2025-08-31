-- CreateTable
CREATE TABLE "public"."Album" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "banda" TEXT NOT NULL,
    "capa" TEXT NOT NULL,
    "nota" INTEGER,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);
