import { prisma } from "@/lib/prisma";
import WelcomeSection from "@/components/WelcomeSection";
import BelongSection from "@/components/BelongSection";
import ProgramSection from "@/components/ProgramSection";
import AnnouncementFeed from "@/components/AnnouncementFeed";

export const revalidate = 0;

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { likes: true, comments: true } } },
  });

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-between">

      {/* 100% Full-width interactive intro zone */}
      <WelcomeSection />

      <AnnouncementFeed posts={posts} />

      <ProgramSection />

      {/* Infinite Photo Stream Banner mounted right beneath the Feed */}
      <BelongSection />

    </div>
  );
}
