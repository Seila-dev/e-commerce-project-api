/*
  Warnings:

  - A unique constraint covering the columns `[ean]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ean` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "ean" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_ean_key" ON "products"("ean");
