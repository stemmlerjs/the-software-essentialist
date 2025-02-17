/*
  Warnings:

  - A unique constraint covering the columns `[memberId,commentId]` on the table `CommentVote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memberId,postId]` on the table `PostVote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CommentVote_memberId_commentId_key" ON "CommentVote"("memberId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "PostVote_memberId_postId_key" ON "PostVote"("memberId", "postId");
