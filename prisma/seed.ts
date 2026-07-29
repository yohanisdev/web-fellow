import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seeding process...");

  // 1. Wipe existing data to avoid unique ID collision errors on repeated runs
  await prisma.post.deleteMany({});
  await prisma.resource.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Create a default encrypted Admin User account
  const defaultPassword = "AdminPassword123";
  const passwordHash = await bcrypt.hash(defaultPassword, 10);
  
  await prisma.user.create({
    data: {
      email: "admin@juacevasue.org",
      passwordHash: passwordHash,
    },
  });
  console.log("✅ Created default admin user: admin@juacevasue.org");

  // 3. Inject mock announcements into the Post table
  await prisma.post.createMany({
    data: [
      {
        title: "Welcome to our New Fellowship Year!",
        content: "We are thrilled to welcome all incoming freshers and returning students to the JUAC EvaSUE community. Join us this Friday at 5:30 PM in the main campus hall for our launch prayer and worship service! Come prepared to encounter God.",
        isPublished: true,
        mediaUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60", // High quality placeholder image
      },
      {
        title: "Weekly Bible Study Schedule",
        content: "Our department small groups are officially kicking off. This year, we are journeying through the book of Romans. Reach out to your department coordinators to find your local residential or campus hub times.",
        isPublished: true,
      },
    ],
  });
  console.log("✅ Seeded sample feed announcements.");
  
  console.log("\n🚀 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding encountered an error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });