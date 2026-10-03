import { prisma } from "@/lib/prisma";
import WelcomeSection from "@/components/WelcomeSection";
import BelongSection from "@/components/BelongSection";
import ProgramSection from "@/components/ProgramSection";
import AnnouncementFeed from "@/components/AnnouncementFeed";
import type { ProgramCardData } from "@/components/ProgramSection";

export const revalidate = 0;

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { likes: true, comments: true } } },
  });

  let programs: ProgramCardData[] = [];
  try {
    programs = await prisma.program.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      select: { id: true, title: true, day: true, time: true, icon: true },
    });
  } catch (error) {
    // Keep the rest of the home page available until the programs migration is applied.
    console.error("Program schedule retrieval failed:", error);
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-between">

      {/* 100% Full-width interactive intro zone */}
      <WelcomeSection />

      <AnnouncementFeed posts={posts} />

      <ProgramSection programs={programs} />

      {/* Infinite Photo Stream Banner mounted right beneath the Feed */}
      <BelongSection />

    </div>
  );
}
