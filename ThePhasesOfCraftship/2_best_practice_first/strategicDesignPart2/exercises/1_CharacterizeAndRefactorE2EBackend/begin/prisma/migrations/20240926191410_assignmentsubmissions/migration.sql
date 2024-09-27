/*
  Warnings:

  - The primary key for the `StudentAssignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `StudentAssignment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateTable
CREATE TABLE "AssignmentSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentAssignmentId" TEXT NOT NULL,
    "submissionContent" TEXT,
    CONSTRAINT "AssignmentSubmission_studentAssignmentId_fkey" FOREIGN KEY ("studentAssignmentId") REFERENCES "StudentAssignment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StudentAssignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "grade" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NOT_STARTED',
    CONSTRAINT "StudentAssignment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StudentAssignment_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StudentAssignment" ("assignmentId", "grade", "status", "studentId") SELECT "assignmentId", "grade", "status", "studentId" FROM "StudentAssignment";
DROP TABLE "StudentAssignment";
ALTER TABLE "new_StudentAssignment" RENAME TO "StudentAssignment";
CREATE UNIQUE INDEX "StudentAssignment_studentId_assignmentId_key" ON "StudentAssignment"("studentId", "assignmentId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
