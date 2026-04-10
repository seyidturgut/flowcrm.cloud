-- AlterTable
ALTER TABLE `leads` ADD COLUMN `utm_campaign` VARCHAR(191) NULL,
    ADD COLUMN `utm_content` VARCHAR(191) NULL,
    ADD COLUMN `utm_medium` VARCHAR(191) NULL,
    ADD COLUMN `utm_source` VARCHAR(191) NULL,
    ADD COLUMN `utm_term` VARCHAR(191) NULL;
