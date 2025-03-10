-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "reputationScore" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Member" ("id", "userId", "username") SELECT "id", "userId", "username" FROM "Member";
DROP TABLE "Member";
ALTER TABLE "new_Member" RENAME TO "Member";
CREATE UNIQUE INDEX "Member_userId_key" ON "Member"("userId");
CREATE UNIQUE INDEX "Member_username_key" ON "Member"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
