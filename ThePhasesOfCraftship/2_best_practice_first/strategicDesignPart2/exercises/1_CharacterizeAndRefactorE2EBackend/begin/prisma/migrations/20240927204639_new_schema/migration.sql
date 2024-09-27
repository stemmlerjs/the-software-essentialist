/*
  Warnings:

  - You are about to drop the `AssignmentSubmission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GradedAssignment` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `StudentAssignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `StudentAssignment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "GradedAssignment_assignmentSubmissionId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AssignmentSubmission";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GradedAssignment";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StudentAssignment" (
    "studentId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "grade" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NOT_STARTED',

    PRIMARY KEY ("studentId", "assignmentId"),
    CONSTRAINT "StudentAssignment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StudentAssignment_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StudentAssignment" ("assignmentId", "studentId") SELECT "assignmentId", "studentId" FROM "StudentAssignment";
DROP TABLE "StudentAssignment";
ALTER TABLE "new_StudentAssignment" RENAME TO "StudentAssignment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
