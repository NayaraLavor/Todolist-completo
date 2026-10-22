// Cenário "cabana ao anoitecer", desenhado em SVG para lembrar o mockup.
// Para usar uma foto/ilustração própria: coloque em /public e defina VITE_BG_IMAGE.

const pines = (seed, base, minH, maxH, step) =>
  Array.from({ length: Math.ceil(1700 / step) }, (_, i) => {
    const x = i * step - 20;
    const h = minH + ((Math.sin(i * seed) + 1) / 2) * (maxH - minH);
    const w = h * 0.42;
    return `${x},${base} ${x + w / 2},${base - h} ${x + w},${base}`;
  });

export default function Scene() {
  const bg = import.meta.env.VITE_BG_IMAGE;

  if (bg) {
    return (
      <div
        className="scene scene--image"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="scene" aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b2b34" />
            <stop offset="0.55" stopColor="#3d5b66" />
            <stop offset="1" stopColor="#8a9c9a" />
          </linearGradient>
          <radialGradient id="lamp" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffb089" />
            <stop offset="1" stopColor="#ff7a59" />
          </radialGradient>
          <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ff8a5c" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ff8a5c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="fire" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd37a" />
            <stop offset="1" stopColor="#ff5a2e" />
          </linearGradient>
        </defs>

        <rect width="1600" height="900" fill="url(#sky)" />

        {/* montanhas */}
        <polygon fill="#5b7a82" opacity="0.75" points="0,560 180,380 330,500 520,330 760,520 980,400 1200,540 1400,360 1600,520 1600,640 0,640" />
        <polygon fill="#344f5a" points="0,620 240,470 420,580 640,450 900,590 1120,480 1380,600 1600,500 1600,700 0,700" />

        {/* pinheiros */}
        <g fill="#1f3640">
          {pines(2.3, 700, 70, 150, 48).map((p) => <polygon key={p} points={p} />)}
        </g>
        <g fill="#15252d">
          {pines(1.7, 740, 110, 230, 62).map((p) => <polygon key={p} points={p} />)}
        </g>

        {/* chão / deck */}
        <rect y="680" width="1600" height="220" fill="#1c2327" />
        <rect y="680" width="1600" height="10" fill="#2b2f2d" />
        <g stroke="#262c2e" strokeWidth="2">
          {[760, 820, 880].map((y) => <line key={y} x1="0" x2="1600" y1={y} y2={y} />)}
        </g>

        {/* telhado e colunas */}
        <rect width="1600" height="64" fill="#1a1b1f" />
        <rect x="150" width="26" height="700" fill="#17181c" />
        <rect x="1280" width="30" height="700" fill="#17181c" />
        <rect x="150" y="64" width="26" height="12" fill="#2a2c33" />

        {/* luminárias */}
        <g stroke="#2c2a2e" strokeWidth="3">
          <line x1="360" y1="64" x2="360" y2="110" />
          <line x1="520" y1="64" x2="520" y2="90" />
        </g>
        <circle cx="360" cy="140" r="120" fill="url(#glow)" />
        <circle cx="520" cy="130" r="100" fill="url(#glow)" />
        <circle cx="360" cy="140" r="34" fill="url(#lamp)" />
        <circle cx="520" cy="128" r="30" fill="url(#lamp)" />

        {/* planta */}
        <g fill="#d2503f">
          <ellipse cx="1170" cy="500" rx="30" ry="78" transform="rotate(-24 1170 500)" />
          <ellipse cx="1230" cy="470" rx="28" ry="86" transform="rotate(14 1230 470)" />
          <ellipse cx="1120" cy="560" rx="24" ry="62" transform="rotate(-48 1120 560)" />
          <ellipse cx="1260" cy="540" rx="24" ry="66" transform="rotate(40 1260 540)" />
        </g>
        <rect x="1160" y="560" width="64" height="130" rx="6" fill="#101519" />

        {/* fogão a lenha */}
        <circle cx="1450" cy="560" r="150" fill="url(#glow)" />
        <rect x="1395" y="440" width="120" height="230" rx="24" fill="#12161a" />
        <rect x="1420" y="520" width="70" height="90" rx="12" fill="url(#fire)" />
        <rect x="1448" y="400" width="14" height="60" fill="#12161a" />

        {/* teclado / mesa */}
        <rect x="1000" y="700" width="420" height="70" rx="8" fill="#0f1317" />
        <g stroke="#ff8a5c" strokeWidth="2" opacity="0.8">
          {Array.from({ length: 22 }, (_, i) => (
            <line key={i} x1={1016 + i * 18} x2={1016 + i * 18} y1="712" y2="740" />
          ))}
        </g>

        {/* manta laranja */}
        <rect x="190" y="640" width="260" height="40" rx="10" fill="#e07a3c" opacity="0.85" />
      </svg>
      <div className="scene__vignette" />
    </div>
  );
}
