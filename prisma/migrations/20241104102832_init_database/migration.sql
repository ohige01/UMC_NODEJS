/*
  Warnings:

  - Added the required column `category_id` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store` ADD COLUMN `category_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `category_id` ON `store`(`category_id`);

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `food_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
