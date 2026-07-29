import React from "react";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased">
      {/* Hero Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm">
         እኛ ግን የተሰቀለዉን ክርስቶስን እንሰብካለን!
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-4">
         Our Felloship
        </h1>
        <p className="text-slate-600 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
          የ ጅማ ዩንቨርስት አጋሮ ካምፓስ የክርስትያን ተማርች ህብረት(JUACECSF) በ 2016 ዓም ላይ የ ጅማ ዩንቨርሲት በ አጋሮ ቅርንጫፍ ተማርዎችን ለመጀመርያ ጊዜ ተቀብለው ማስተማር ስጀምር ፤ በወቅቱ አጋሮ ግቢ ገብተው በነበሩ በ ቁጥር አነስተኛ ከሆኑ ክርስትያን ተማርዎች ተመሰረተ።
        </p>
      </div>

      {/* Pillars Section (Mission, Vision, Purpose) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <div className="text-2xl mb-3">🎯</div>
          <h3 className="text-base font-black text-slate-900 tracking-tight">ተልዕኮ</h3>
          <p className="text-slate-500 text-xs mt-2 leading-relaxed">
            To provide precise management infrastructure, optimizing data accuracy and workflow pipelines while offering accessible communication channels.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <div className="text-2xl mb-3">👁️</div>
          <h3 className="text-base font-black text-slate-900 tracking-tight">ራዕይ</h3>
          <p className="text-slate-500 text-xs mt-2 leading-relaxed">
            A technologically unified ecosystem where digital resources, leadership structures, and internal announcements are securely integrated in real time.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <div className="text-2xl mb-3">⚙️</div>
          <h3 className="text-base font-black text-slate-900 tracking-tight">Core Values</h3>
          <p className="text-slate-500 text-xs mt-2 leading-relaxed">
            Strict structural validation, absolute functional clarity, open accessibility, and high-performance execution built on modern web runtimes.
          </p>
        </div>
      </div>

      {/* Interactive CTA Section linking back to active modules */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm text-center">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Explore the Platform Components</h2>
          <p className="text-slate-500 text-xs mt-2 max-w-md mx-auto leading-relaxed">
            See ደሰተ the fully operational modules powered by our dynamic PostgreSQL architecture.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link 
              href="/leaders" 
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              View Roster Directory
            </Link>
            <Link 
              href="/resources" 
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all border border-slate-200"
            >
              Access Resource Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}