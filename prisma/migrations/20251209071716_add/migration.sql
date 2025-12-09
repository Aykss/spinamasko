/*
  Warnings:

  - Added the required column `quantity` to the `Given_Gifts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Given_Gifts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" INTEGER NOT NULL,
    "amount" DECIMAL NOT NULL,
    "name" TEXT,
    "quantity" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "godparents_id" INTEGER NOT NULL,
    CONSTRAINT "Given_Gifts_godparents_id_fkey" FOREIGN KEY ("godparents_id") REFERENCES "Godparents" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Given_Gifts" ("amount", "created_at", "godparents_id", "id", "name", "type", "updated_at") SELECT "amount", "created_at", "godparents_id", "id", "name", "type", "updated_at" FROM "Given_Gifts";
DROP TABLE "Given_Gifts";
ALTER TABLE "new_Given_Gifts" RENAME TO "Given_Gifts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
