import { prisma } from "@/lib/prisma";
import WelcomeSection from "@/components/WelcomeSection";
import BelongSection from "@/components/BelongSection";

export const revalidate = 0;

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-between">
      
      {/* 100% Full-width interactive intro zone */}
      <WelcomeSection />

      {/* Main Container Core Feed content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        <h2 className="text-2xl font-bold text-fellowship-blue mb-6 tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-6 bg-fellowship-gold rounded-full inline-block"></span>
          Latest Announcements & Fellowship Updates
        </h2>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed border-slate-300 rounded-xl shadow-sm">
            <p className="text-slate-500 font-medium">No updates posted yet.</p>
            <p className="text-xs text-slate-400 mt-1">When an admin publishes an announcement, it will show up here instantly!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {post.mediaUrl && (
                  <div className="relative h-48 w-full bg-slate-100">
                    <img 
                      src={post.mediaUrl} 
                      alt={post.title || "Fellowship update"} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {post.title && (
                      <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                        {post.title}
                      </h3>
                    )}
                    <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
                    Posted on {new Date(post.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Infinite Photo Stream Banner mounted right beneath the Feed */}
      <BelongSection />

    </div>
  );
}