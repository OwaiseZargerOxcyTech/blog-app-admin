-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "metaData" TEXT,
    "image" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);
