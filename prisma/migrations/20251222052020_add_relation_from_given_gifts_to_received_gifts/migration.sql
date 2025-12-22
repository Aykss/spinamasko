/*
  Warnings:

  - Added the required column `given_gifts_id` to the `Received_Gifts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Received_Gifts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taken_chance" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "godparents_id" INTEGER NOT NULL,
    "godchildren_id" INTEGER NOT NULL,
    "given_gifts_id" INTEGER NOT NULL,
    CONSTRAINT "Received_Gifts_godparents_id_fkey" FOREIGN KEY ("godparents_id") REFERENCES "Godparents" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Received_Gifts_godchildren_id_fkey" FOREIGN KEY ("godchildren_id") REFERENCES "Godchildren" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Received_Gifts_given_gifts_id_fkey" FOREIGN KEY ("given_gifts_id") REFERENCES "Given_Gifts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Received_Gifts" ("created_at", "godchildren_id", "godparents_id", "id", "taken_chance", "updated_at") SELECT "created_at", "godchildren_id", "godparents_id", "id", "taken_chance", "updated_at" FROM "Received_Gifts";
DROP TABLE "Received_Gifts";
ALTER TABLE "new_Received_Gifts" RENAME TO "Received_Gifts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
