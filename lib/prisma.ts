import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient;

if (!globalForPrisma.prisma) {
  // 1. Initialize the native PostgreSQL connection pool using the environment variable
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  // 2. Wrap it inside the Prisma 7 adapter layer
  const adapter = new PrismaPg(pool);

  // 3. Inject the adapter directly into the options constructor to fulfill Prisma 7 requirements
  prismaInstance = new PrismaClient({ adapter });
  
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaInstance;
  }
} else {
  prismaInstance = globalForPrisma.prisma;
}

export const prisma = prismaInstance;