/*
  Warnings:

  - Added the required column `aggregateId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "aggregateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'INITIAL',
    "retries" INTEGER NOT NULL DEFAULT 0,
    "data" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" DATETIME NOT NULL
);
INSERT INTO "new_Event" ("data", "dateCreated", "id", "lastUpdated", "name", "retries", "status") SELECT "data", "dateCreated", "id", "lastUpdated", "name", "retries", "status" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
