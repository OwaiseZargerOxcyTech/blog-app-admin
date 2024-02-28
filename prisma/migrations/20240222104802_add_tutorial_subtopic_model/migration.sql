-- CreateTable
CREATE TABLE "TutorialSubtopic" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "metadata" TEXT,
    "content" TEXT NOT NULL,

    CONSTRAINT "TutorialSubtopic_pkey" PRIMARY KEY ("id")
);
