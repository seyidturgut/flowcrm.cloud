-- AlterTable
ALTER TABLE `leads` ADD COLUMN `ai_label` VARCHAR(191) NULL,
    ADD COLUMN `ai_reasoning` TEXT NULL,
    ADD COLUMN `ai_score` INTEGER NULL,
    ADD COLUMN `ai_tags` VARCHAR(191) NULL;
