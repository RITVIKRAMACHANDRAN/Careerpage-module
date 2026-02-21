-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "jobInfo" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "postedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidates" (
    "id" SERIAL NOT NULL,
    "positionId" INTEGER NOT NULL,
    "applicantId" TEXT NOT NULL,
    "mailId" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Applied',
    "appliedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Candidates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Candidates" ADD CONSTRAINT "Candidates_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
