import Icon, { type IconName } from "@/components/Icon";

export interface ProgramCardData {
  id: string;
  title: string;
  day: string;
  time: string;
  icon: string;
}

const accents = [
  "bg-blue-50 text-blue-700 ring-blue-100",
  "bg-amber-50 text-amber-700 ring-amber-100",
  "bg-emerald-50 text-emerald-700 ring-emerald-100",
];

export default function ProgramSection({ programs }: { programs: ProgramCardData[] }) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-slate-900 py-16 sm:py-20 border-t border-slate-700">
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src="/InShot_20260829_131944163.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/85 via-[#09152e]/80 to-slate-950/75" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-center">
        <div className="max-w-2xl lg:order-2 lg:justify-self-end">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-fellowship-gold mb-3">
            ዕብራውያን 10:
25 በአንዳንዶችም ዘንድ ልማድ እንደ ሆነው፥ መሰብሰባችንን አንተው እርስ በርሳችን እንመካከር እንጂ፤ ይልቁንም ቀኑ ሲቀርብ እያያችሁ አብልጣችሁ ይህን አድርጉ
          </p>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-9 bg-fellowship-gold rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              ሳምንታዊ ፕሮግራሞቻችን ፦
            </h2>
          </div>
          <p className="text-slate-200 text-sm sm:text-base mt-3 leading-relaxed">
            Make room in your week for fellowship, studying Scripture, and prayer.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 lg:order-1 lg:mr-auto lg:max-w-2xl">
          {programs.length ? programs.map((program, index) => (
            <article
              key={program.id}
              className="group relative flex items-center gap-4 sm:gap-5 overflow-hidden bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg hover:translate-x-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 shrink-0 rounded-2xl ring-1 flex items-center justify-center ${accents[index % accents.length]}`}>
                <Icon name={program.icon as IconName} size={23} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  {program.day}
                </p>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {program.title}
                </h3>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600">
                <Icon name="clock" size={16} className="text-fellowship-gold" />
                <span>{program.time}</span>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-fellowship-gold group-hover:w-full transition-all duration-300" />
            </article>
          )) : (
            <p className="rounded-2xl border border-white/20 bg-white/10 p-5 text-sm text-white/80">
              Program schedule will be announced soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
