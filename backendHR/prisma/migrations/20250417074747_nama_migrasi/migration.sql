/*
  Warnings:

  - The `status` column on the `Employees` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'ONLEAVE', 'RESIGN');

-- AlterTable
ALTER TABLE "Employees" ADD COLUMN     "leaveDate" DATE,
ADD COLUMN     "resignDate" DATE,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "salary" SET DATA TYPE BIGINT;
