/*
  Warnings:

  - You are about to drop the `AssignmentGrade` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AssignmentGrade";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GradedAssignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assignmentSubmissionId" TEXT NOT NULL,
    "grade" TEXT,
    CONSTRAINT "GradedAssignment_assignmentSubmissionId_fkey" FOREIGN KEY ("assignmentSubmissionId") REFERENCES "AssignmentSubmission" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "GradedAssignment_assignmentSubmissionId_key" ON "GradedAssignment"("assignmentSubmissionId");
