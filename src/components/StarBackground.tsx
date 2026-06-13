function seededRatio(seed: number) {
  const value = Math.sin(seed) * 43758.5453;
  return value - Math.floor(value);
}

const STARS = Array.from({ length: 28 }, (_, i) => {
  const isSpark = i % 6 === 0;

  return {
    top: `${seededRatio(i * 12.9898) * 100}%`,
    left: `${seededRatio(i * 78.233) * 100}%`,
    size: isSpark ? 10 + (i % 3) * 4 : 2 + (i % 3),
    delay: (i % 10) * 0.4,
    duration: 4 + (i % 5),
    isSpark,
  };
});

export function StarBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {STARS.map((star, i) =>
        star.isSpark ? (
          <span
            key={i}
            className="animate-twinkle absolute text-gold/70"
            style={{
              top: star.top,
              left: star.left,
              fontSize: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          >
            ✦
          </span>
        ) : (
          <span
            key={i}
            className="animate-twinkle absolute rounded-full bg-cream/80"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ),
      )}
    </div>
  );
}
