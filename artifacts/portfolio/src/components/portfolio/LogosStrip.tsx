const BRANDS = [
  "FishyVisions",
  "Chesslang",
  "Windu",
  "Quely",
  "Afrisplash",
  "Lavasource",
  "Seamless",
  "Bitech",
];

export function LogosStrip() {
  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-[22px] font-semibold text-white tracking-tight">
          Brands I've supported
        </h2>
        <span className="text-[13px] font-semibold text-muted-foreground tracking-tight">
          {BRANDS.length}+
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06]">
        {BRANDS.map((b) => (
          <div
            key={b}
            className="bg-background h-20 md:h-24 flex items-center justify-center px-3 transition-colors duration-300 hover:bg-white/[0.02]"
          >
            <span className="text-[15px] md:text-[16px] font-semibold text-white/55 hover:text-white transition-colors tracking-tight text-center">
              {b}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
