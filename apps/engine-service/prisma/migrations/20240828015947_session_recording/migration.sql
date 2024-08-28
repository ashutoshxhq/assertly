/*
  Warnings:

  - You are about to drop the column `userFlowId` on the `steps` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "steps" DROP CONSTRAINT "steps_userFlowId_fkey";

-- AlterTable
ALTER TABLE "steps" DROP COLUMN "userFlowId";

-- AlterTable
ALTER TABLE "user_flows" ADD COLUMN     "steps" JSONB;

-- CreateTable
CREATE TABLE "session_recordings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT,
    "steps" JSONB,
    "metadata" JSONB,
    "teamId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_recordings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "session_recordings" ADD CONSTRAINT "session_recordings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
