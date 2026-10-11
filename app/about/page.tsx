import Link from "next/link";
import Icon from "@/components/Icon";

const pillars = [
  {
    title: "ተልዕኮ",
    subtitle: "Mission",
    description:
      "To proclaim Christ, nurture students in the faith, and help them grow as servants who live out the gospel in their campus and community.",
    detail: "ክርስቶስን ማወቅና ማገልገል",
    icon: "target" as const,
    color: "blue",
  },
  {
    title: "ራዕይ",
    subtitle: "Vision",
    description:
      "A campus community where students know Jesus, grow together in faith, and share the hope of the gospel with others.",
    detail: "በእምነት ማደግና ተስፋን ማካፈል",
    icon: "eye" as const,
    color: "amber",
  },
  {
    title: "Core Values",
    subtitle: "እሴቶች",
    description:
      "We value Christ-centered living, the truth of Scripture, prayer, fellowship, service, love, and unity in the body of Christ.",
    detail: "ፍቅር • አንድነት • አገልግሎት",
    icon: "prayer" as const,
    color: "emerald",
  },
];

const ministries = [
  {
    title: "Fellowship",
    amharic: "ኅብረት",
    description: "Grow in faith and friendship through shared fellowship.",
    icon: "users" as const,
    href: "/",
    label: "Explore fellowship",
    color: "blue",
  },
  {
    title: "Leadership",
    amharic: "አመራር",
    description: "Meet the students serving and leading our community.",
    icon: "users" as const,
    href: "/leaders",
    label: "Meet our leaders",
    color: "amber",
  },
  {
    title: "Bible & Resources",
    amharic: "መጽሐፍ ቅዱስና ግብዓቶች",
    description: "Find Scripture and study materials to support your walk.",
    icon: "book" as const,
    href: "/resources",
    label: "Browse resources",
    color: "purple",
  },
  {
    title: "Announcements",
    amharic: "ማስታወቂያዎች",
    description: "Keep up with fellowship news, gatherings, and activities.",
    icon: "megaphone" as const,
    href: "/#announcements",
    label: "See what’s happening",
    color: "cyan",
  },
];

const pillarColorClasses = {
  blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
  amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-500",
  emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600",
} as const;

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">
      <section
        aria-labelledby="fellowship-heading"
        className="mx-auto max-w-5xl px-4 pb-12 pt-14 text-center sm:px-6 lg:px-8"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/80 px-5 py-2 text-sm font-semibold tracking-wide text-blue-800 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          <span>እኛ ግን የተሰቀለውን ክርስቶስን እንሰብካለን!</span>
        </div>
        <h1
          className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          id="fellowship-heading"
        >
          Our Fellowship
        </h1>
        <div className="my-6 flex justify-center">
          <div className="h-1 w-14 rounded-full bg-gradient-to-r from-blue-600 from-50% to-amber-500 to-50%" />
        </div>
        <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
            <Icon name="book" size={16} />
            <span>ታሪካዊ አመሰራረት • Foundation Story</span>
          </div>
          <p className="text-center text-base font-semibold leading-relaxed text-slate-800 sm:text-lg">
            የጅማ ዩኒቨርሲቲ አጋሮ ካምፓስ የክርስቲያን ተማሪዎች ህብረት{" "}
            <span className="font-bold text-blue-900">(JUACECSF)</span> በ2016 ዓ.ም. የጅማ ዩኒቨርሲቲ በአጋሮ ቅርንጫፍ ተማሪዎችን ለመጀመሪያ ጊዜ ተቀብሎ ማስተማር ሲጀምር፣ በወቅቱ አጋሮ ግቢ ገብተው በነበሩ ጥቂት ክርስቲያን ተማሪዎች ተመሰረተ።
          </p>
        </div>
      </section>

      <section
        aria-labelledby="pillars-heading"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        id="foundation-pillars"
      >
        <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500" id="pillars-heading">
              Core Foundation Pillars
            </h2>
            <p className="mt-0.5 text-lg font-bold text-slate-900">የህብረቱ ምሰሶዎች</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-blue-100/70 px-3 py-1 text-xs font-semibold text-blue-700">
            3 Pillars
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-colors group-hover:text-white ${pillarColorClasses[pillar.color]}`}>
                  <Icon name={pillar.icon} size={24} />
                </div>
                <div className="mb-3 flex items-baseline gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{pillar.title}</h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">/ {pillar.subtitle}</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">{pillar.description}</p>
              </div>
              <div className="mt-6 flex items-center border-t border-slate-100 pt-6 text-xs font-semibold text-blue-700">
                <span>{pillar.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="platform-heading"
        className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8"
        id="platform-components"
      >
        <div className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm sm:p-12">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold tracking-wide text-blue-700">
              <span>የህብረቱ አገልግሎቶች</span>
              <span className="text-slate-400">•</span>
              <span className="font-semibold text-blue-900">Our Fellowship</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl" id="platform-heading">
              Explore the Fellowship
            </h2>
            <p className="mt-2.5 text-sm text-slate-600 sm:text-base">
              Find ways to connect, grow in the Word, and serve with the JUAC EvaSUE Fellowship.
            </p>
          </div>
          <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ministries.map((ministry) => (
              <Link
                key={ministry.title}
                href={ministry.href}
                aria-label={ministry.label}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 transition-all duration-200 hover:border-blue-300 hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100/70 text-blue-600">
                    <Icon name={ministry.icon} size={20} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{ministry.title}</h3>
                  <p className="mt-0.5 font-ethiopic text-xs text-slate-500">{ministry.amharic}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{ministry.description}</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-200/60 pt-3 text-xs font-semibold text-blue-700">
                  <span>{ministry.label}</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Link
              href="/resources"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#10223e] px-8 py-3.5 text-sm font-medium tracking-wide text-white shadow-md transition-all duration-200 hover:bg-[#1a345d] hover:shadow-lg sm:text-base"
            >
              <span>የመድረክ መረጃዎችን ይመልከቱ</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
