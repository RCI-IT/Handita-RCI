/*
  Warnings:

  - You are about to alter the column `salary` on the `Employees` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Employees" ALTER COLUMN "salary" SET DATA TYPE INTEGER;
