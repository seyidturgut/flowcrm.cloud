/*
  Warnings:

  - Added the required column `sales_rep_id` to the `assignment_rules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assignment_rules` ADD COLUMN `sales_rep_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `assignment_rules` ADD CONSTRAINT `assignment_rules_sales_rep_id_fkey` FOREIGN KEY (`sales_rep_id`) REFERENCES `sales_reps`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
