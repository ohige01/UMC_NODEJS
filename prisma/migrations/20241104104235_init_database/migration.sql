/*
  Warnings:

  - You are about to drop the column `mission_id` on the `review_image` table. All the data in the column will be lost.
  - Added the required column `review_id` to the `review_image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `review_image` DROP FOREIGN KEY `review_image_mission_id_fkey`;

-- AlterTable
ALTER TABLE `review_image` DROP COLUMN `mission_id`,
    ADD COLUMN `review_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `review_id` ON `review_image`(`review_id`);

-- AddForeignKey
ALTER TABLE `review_image` ADD CONSTRAINT `review_image_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
