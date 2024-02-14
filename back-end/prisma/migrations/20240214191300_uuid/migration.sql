/*
  Warnings:

  - The primary key for the `Reservation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Table` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_reservationId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Reservation_id_seq";

-- AlterTable
ALTER TABLE "Table" DROP CONSTRAINT "Table_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "reservationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Table_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Table_id_seq";

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
