-- CreateTable
CREATE TABLE "Session" (
    "session_id" TEXT NOT NULL,
    "account_id" VARCHAR(64) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("session_id")
);
