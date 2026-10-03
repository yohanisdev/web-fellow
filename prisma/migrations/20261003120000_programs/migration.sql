CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'users',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

INSERT INTO "Program" ("id", "title", "day", "time", "icon", "sortOrder", "updatedAt") VALUES
    ('default-program-fellowship', 'General Fellowship', 'Friday', '12:00 LT', 'users', 0, CURRENT_TIMESTAMP),
    ('default-program-bible-study', 'Bible Study', 'Wednesday', '12:30 LT', 'book', 1, CURRENT_TIMESTAMP),
    ('default-program-prayer', 'Prayer Time', 'Thursday', '12:30 LT', 'prayer', 2, CURRENT_TIMESTAMP);
