/*
  Warnings:

  - You are about to drop the column `finishedAt` on the `steps` table. All the data in the column will be lost.
  - You are about to drop the column `properties` on the `steps` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `test_runs` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `test_runs` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `test_specs` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `user_flows` table. All the data in the column will be lost.
  - Added the required column `name` to the `test_specs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `user_flows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "steps" DROP COLUMN "finishedAt",
DROP COLUMN "properties",
ADD COLUMN     "props" JSONB,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "stepType" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "test_runs" DROP COLUMN "startedAt",
DROP COLUMN "title",
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "metadata" DROP NOT NULL,
ALTER COLUMN "stepContext" DROP NOT NULL,
ALTER COLUMN "consoleContext" DROP NOT NULL,
ALTER COLUMN "networkContext" DROP NOT NULL,
ALTER COLUMN "finishedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "test_specs" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "metadata" DROP NOT NULL,
ALTER COLUMN "lastRunAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_flows" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "metadata" DROP NOT NULL;
