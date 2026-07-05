/* Hand-drawn SVG sushi — self-contained art direction, no external assets. */

type ArtProps = { className?: string };

function RiceBase({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`rice-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6efe0" />
          <stop offset="100%" stopColor="#d8cdb4" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="128" rx="72" ry="34" fill={`url(#rice-${id})`} />
      {/* grains */}
      {[
        [52, 118], [70, 132], [92, 122], [116, 134], [138, 120],
        [64, 144], [104, 146], [130, 142], [84, 110], [120, 112],
      ].map(([x, y], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="6"
          ry="2.6"
          fill="#fffaf0"
          opacity="0.7"
          transform={`rotate(${(i * 37) % 60 - 30} ${x} ${y})`}
        />
      ))}
    </>
  );
}

export function NigiriSalmon({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 200 180" className={className} aria-hidden>
      <defs>
        <linearGradient id="salmon-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff9d7e" />
          <stop offset="55%" stopColor="#f0724f" />
          <stop offset="100%" stopColor="#d95a3c" />
        </linearGradient>
      </defs>
      <RiceBase id="salmon" />
      <path
        d="M22 108 Q 30 84 62 80 L 150 74 Q 180 74 178 96 Q 176 112 148 114 L 56 122 Q 28 122 22 108 Z"
        fill="url(#salmon-g)"
      />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${46 + i * 32} ${84 - i * 1.5} q 10 14 4 30`}
          stroke="#ffd9c4"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />
      ))}
      <path
        d="M26 104 Q 60 96 176 88"
        stroke="#ffffff"
        strokeWidth="2"
        fill="none"
        opacity="0.25"
      />
    </svg>
  );
}

export function NigiriTuna({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 200 180" className={className} aria-hidden>
      <defs>
        <linearGradient id="tuna-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e05a6d" />
          <stop offset="60%" stopColor="#b23648" />
          <stop offset="100%" stopColor="#8e2436" />
        </linearGradient>
      </defs>
      <RiceBase id="tuna" />
      <path
        d="M24 106 Q 34 82 66 79 L 148 74 Q 178 75 177 97 Q 175 112 146 114 L 56 121 Q 30 120 24 106 Z"
        fill="url(#tuna-g)"
      />
      <path
        d="M30 100 Q 90 88 172 86"
        stroke="#f2a3ad"
        strokeWidth="2.4"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M40 110 Q 100 100 168 96"
        stroke="#f2a3ad"
        strokeWidth="1.6"
        fill="none"
        opacity="0.35"
      />
    </svg>
  );
}

export function MakiRoll({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 200 180" className={className} aria-hidden>
      <defs>
        <radialGradient id="maki-rice" cx="0.5" cy="0.42" r="0.65">
          <stop offset="0%" stopColor="#fbf6ea" />
          <stop offset="100%" stopColor="#ddd2ba" />
        </radialGradient>
        <radialGradient id="maki-core" cx="0.45" cy="0.4" r="0.7">
          <stop offset="0%" stopColor="#ff9d7e" />
          <stop offset="100%" stopColor="#e0603f" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="92" r="70" fill="#171a14" />
      <circle cx="100" cy="92" r="66" fill="#242a1c" />
      <circle cx="100" cy="92" r="56" fill="url(#maki-rice)" />
      {[...Array(10)].map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const x = 100 + Math.cos(a) * 40;
        const y = 92 + Math.sin(a) * 40;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="6.5"
            ry="2.8"
            fill="#fffaf0"
            opacity="0.8"
            transform={`rotate(${(a * 180) / Math.PI + 90} ${x} ${y})`}
          />
        );
      })}
      <circle cx="100" cy="92" r="20" fill="url(#maki-core)" />
      <circle cx="94" cy="86" r="6" fill="#ffc9b2" opacity="0.7" />
    </svg>
  );
}

export function Tamago({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 200 180" className={className} aria-hidden>
      <defs>
        <linearGradient id="tamago-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd98a" />
          <stop offset="100%" stopColor="#e8a94e" />
        </linearGradient>
      </defs>
      <RiceBase id="tamago" />
      <rect x="30" y="72" width="140" height="44" rx="14" fill="url(#tamago-g)" />
      <rect x="30" y="72" width="140" height="10" rx="5" fill="#fff0c9" opacity="0.6" />
      <path d="M86 60 L 86 130 M114 60 L 114 130" stroke="#1c2117" strokeWidth="0" />
      <rect x="92" y="52" width="16" height="86" rx="4" fill="#20261a" opacity="0.92" />
    </svg>
  );
}

export function Gunkan({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 200 180" className={className} aria-hidden>
      <defs>
        <radialGradient id="uni-g" cx="0.5" cy="0.35" r="0.8">
          <stop offset="0%" stopColor="#f2b04e" />
          <stop offset="100%" stopColor="#c97a26" />
        </radialGradient>
      </defs>
      <path
        d="M40 92 Q 100 74 160 92 L 154 132 Q 100 148 46 132 Z"
        fill="#20261a"
      />
      <path
        d="M40 92 Q 100 74 160 92 L 158 104 Q 100 88 42 104 Z"
        fill="#2c3423"
      />
      {[...Array(7)].map((_, i) => (
        <ellipse
          key={i}
          cx={62 + i * 13}
          cy={84 - Math.sin(i / 6 * Math.PI) * 8}
          rx="9"
          ry="7"
          fill="url(#uni-g)"
          opacity={0.9}
        />
      ))}
    </svg>
  );
}

export function Sashimi({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 200 180" className={className} aria-hidden>
      <defs>
        <linearGradient id="sashimi-g" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="#ff9d7e" />
          <stop offset="100%" stopColor="#e0603f" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${i * 26} ${i * -14})`}>
          <path
            d="M30 130 Q 34 108 62 104 L 118 100 Q 140 100 138 116 Q 136 128 114 130 L 56 136 Q 34 136 30 130 Z"
            fill="url(#sashimi-g)"
            opacity={1 - i * 0.12}
          />
          {[0, 1, 2].map((j) => (
            <path
              key={j}
              d={`M${52 + j * 26} ${108 - j} q 8 10 3 22`}
              stroke="#ffd9c4"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
          ))}
        </g>
      ))}
      <ellipse cx="150" cy="150" rx="22" ry="7" fill="#9aa86e" opacity="0.85" />
    </svg>
  );
}

export function EnsoCircle({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <path
        d="M154 55 A 72 72 0 1 0 168 118"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}
