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
        <h2 className="apple-headline-6 text-white">
          Brands I've supported
        </h2>
        <span className="apple-caption text-muted-foreground">
          {BRANDS.length}+
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06]">
        {BRANDS.map((b) => (
          <div
            key={b}
            className="bg-background h-20 md:h-24 flex items-center justify-center px-3 transition-colors duration-300 hover:bg-white/[0.02]"
          >
            <span className="apple-body text-white/55 hover:text-white transition-colors text-center">
              {b}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
