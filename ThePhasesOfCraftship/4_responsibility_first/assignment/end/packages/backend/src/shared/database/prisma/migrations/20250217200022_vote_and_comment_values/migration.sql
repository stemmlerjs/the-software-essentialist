/*
  Warnings:

  - You are about to drop the column `voteType` on the `CommentVote` table. All the data in the column will be lost.
  - You are about to drop the column `voteType` on the `PostVote` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CommentVote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "commentId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" DATETIME NOT NULL,
    CONSTRAINT "CommentVote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommentVote_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CommentVote" ("commentId", "dateCreated", "id", "lastUpdated", "memberId") SELECT "commentId", "dateCreated", "id", "lastUpdated", "memberId" FROM "CommentVote";
DROP TABLE "CommentVote";
ALTER TABLE "new_CommentVote" RENAME TO "CommentVote";
CREATE TABLE "new_PostVote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" DATETIME NOT NULL,
    CONSTRAINT "PostVote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PostVote_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PostVote" ("dateCreated", "id", "lastUpdated", "memberId", "postId") SELECT "dateCreated", "id", "lastUpdated", "memberId", "postId" FROM "PostVote";
DROP TABLE "PostVote";
ALTER TABLE "new_PostVote" RENAME TO "PostVote";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
