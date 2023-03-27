/*
  Warnings:

  - You are about to drop the `Form` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Form";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "form" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "postedById" INTEGER,
    CONSTRAINT "form_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "img" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionText" TEXT NOT NULL,
    "questionImg" TEXT NOT NULL DEFAULT '',
    "containedById" INTEGER,
    "required" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "question_containedById_fkey" FOREIGN KEY ("containedById") REFERENCES "form" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "option" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "optionText" TEXT NOT NULL,
    "optionImg" TEXT NOT NULL DEFAULT '',
    "containedByquestionId" INTEGER,
    CONSTRAINT "option_containedByquestionId_fkey" FOREIGN KEY ("containedByquestionId") REFERENCES "question" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
