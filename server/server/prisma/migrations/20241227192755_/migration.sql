/*
  Warnings:

  - A unique constraint covering the columns `[serial]` on the table `Equipment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Equipment_serial_key" ON "Equipment"("serial");
