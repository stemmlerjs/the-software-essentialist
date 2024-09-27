/*
  Warnings:

  - You are about to drop the column `grade` on the `StudentAssignment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `StudentAssignment` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "AssignmentGrade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assignmentSubmissionId" TEXT NOT NULL,
    "grade" TEXT,
    CONSTRAINT "AssignmentGrade_assignmentSubmissionId_fkey" FOREIGN KEY ("assignmentSubmissionId") REFERENCES "AssignmentSubmission" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StudentAssignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    CONSTRAINT "StudentAssignment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StudentAssignment_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StudentAssignment" ("assignmentId", "id", "studentId") SELECT "assignmentId", "id", "studentId" FROM "StudentAssignment";
DROP TABLE "StudentAssignment";
ALTER TABLE "new_StudentAssignment" RENAME TO "StudentAssignment";
CREATE UNIQUE INDEX "StudentAssignment_studentId_assignmentId_key" ON "StudentAssignment"("studentId", "assignmentId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
