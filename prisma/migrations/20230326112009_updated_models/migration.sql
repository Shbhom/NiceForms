/*
  Warnings:

  - You are about to drop the column `questionImg` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `optionImg` on the `option` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionText" TEXT NOT NULL,
    "containedById" INTEGER,
    "required" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "question_containedById_fkey" FOREIGN KEY ("containedById") REFERENCES "form" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_question" ("containedById", "id", "questionText", "required") SELECT "containedById", "id", "questionText", "required" FROM "question";
DROP TABLE "question";
ALTER TABLE "new_question" RENAME TO "question";
CREATE TABLE "new_option" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "optionText" TEXT NOT NULL,
    "containedByquestionId" INTEGER,
    CONSTRAINT "option_containedByquestionId_fkey" FOREIGN KEY ("containedByquestionId") REFERENCES "question" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_option" ("containedByquestionId", "id", "optionText") SELECT "containedByquestionId", "id", "optionText" FROM "option";
DROP TABLE "option";
ALTER TABLE "new_option" RENAME TO "option";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
