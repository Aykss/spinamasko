/*
  Warnings:

  - You are about to drop the column `email` on the `Godparents` table. All the data in the column will be lost.
  - Added the required column `pronouns` to the `Godparents` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Godparents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "unique_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "pronouns" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Godparents" ("created_at", "id", "name", "password", "unique_id", "updated_at") SELECT "created_at", "id", "name", "password", "unique_id", "updated_at" FROM "Godparents";
DROP TABLE "Godparents";
ALTER TABLE "new_Godparents" RENAME TO "Godparents";
CREATE UNIQUE INDEX "Godparents_unique_id_key" ON "Godparents"("unique_id");
CREATE UNIQUE INDEX "Godparents_name_key" ON "Godparents"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
