-- CreateTable
CREATE TABLE "Godparents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "unique_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Given_Gifts" (
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

-- CreateTable
CREATE TABLE "Godchildren" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "total_chances" INTEGER NOT NULL,
    "used_chances" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "godparents_id" INTEGER NOT NULL,
    CONSTRAINT "Godchildren_godparents_id_fkey" FOREIGN KEY ("godparents_id") REFERENCES "Godparents" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Received_Gifts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taken_chance" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "godparents_id" INTEGER NOT NULL,
    "godchildren_id" INTEGER NOT NULL,
    CONSTRAINT "Received_Gifts_godparents_id_fkey" FOREIGN KEY ("godparents_id") REFERENCES "Godparents" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Received_Gifts_godchildren_id_fkey" FOREIGN KEY ("godchildren_id") REFERENCES "Godchildren" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Godparents_unique_id_key" ON "Godparents"("unique_id");
