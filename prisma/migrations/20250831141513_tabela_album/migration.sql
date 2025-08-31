/*
  Warnings:

  - Added the required column `ano` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Album" ADD COLUMN     "ano" TIMESTAMP(3) NOT NULL;
