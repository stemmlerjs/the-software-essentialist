/*
  Warnings:

  - The `reputationLevel` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MemberReputationLevel" AS ENUM ('Level 1', 'Level 2', 'Level 3');

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "reputationLevel",
ADD COLUMN     "reputationLevel" "MemberReputationLevel" NOT NULL DEFAULT 'Level 1';
