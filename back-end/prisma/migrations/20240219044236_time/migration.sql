/*
  Warnings:

  - Changed the type of `time` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "time",
ADD COLUMN     "time" TIME(4) NOT NULL;
