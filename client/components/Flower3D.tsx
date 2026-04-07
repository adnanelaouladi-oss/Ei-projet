import { useState } from "react";

interface Petal {
  id: number;
  label: string;
  arabicLabel: string;
  angle: number;
  rotation: number;
}

const petals: Petal[] = [
  {
    id: 1,
    label: "الوضعية",
    arabicLabel: "الوضعية المشكلة",
    angle: -Math.PI / 2, // Top
    rotation: 0,
  },
  {
    id: 2,
    label: "التحليل",
    arabicLabel: "التحليل والنصوص",
    angle: 0, // Right
    rotation: 90,
  },
  {
    id: 3,
    label: "المفاهيم",
    arabicLabel: "المفاهيم",
    angle: Math.PI / 2, // Bottom
    rotation: 180,
  },
  {
    id: 4,
    label: "القيم",
    arabicLabel: "القيم والإسقاط",
    angle: Math.PI, // Left
    rotation: 270,
  },
];

interface FlowerPetalProps {
  petal: Petal;
  isHovered: boolean;
  isTransitioning: boolean;
  onHover: (id: number | null) => void;
  onClick: (id: number) => void;
}

const FlowerPetal = ({
  petal,
  isHovered,
  isTransitioning,
  onHover,
  onClick,
}: FlowerPetalProps) => {
  const distance = 140; // Distance from center
  const x = Math.cos(petal.angle) * distance;
  const y = Math.sin(petal.angle) * distance;

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-300 ease-out`}
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        zIndex: isHovered ? 30 : 20,
      }}
      onMouseEnter={() => onHover(petal.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(petal.id)}
    >
      {/* SVG Petal Shape - Organic curved shape */}
      <svg
        width="120"
        height="140"
        viewBox="0 0 120 140"
        className={`drop-shadow-lg transition-all duration-300 ${
          isHovered ? "scale-110 drop-shadow-2xl" : "scale-100"
        } ${isTransitioning ? "opacity-0" : "opacity-100"}`}
        style={{
          filter: isHovered ? "drop-shadow(0 0 30px rgba(0, 200, 255, 0.8))" : "drop-shadow(0 0 15px rgba(0, 200, 255, 0.5))",
        }}
      >
        {/* Outer glow layer */}
        <defs>
          <radialGradient id={`glow-${petal.id}`} cx="50%" cy="40%">
            <stop offset="0%" stopColor="rgba(0, 200, 255, 0.8)" />
            <stop offset="70%" stopColor="rgba(0, 180, 220, 0.4)" />
            <stop offset="100%" stopColor="rgba(0, 160, 200, 0.1)" />
          </radialGradient>
          <filter id={`blur-${petal.id}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>
        </defs>

        {/* Main petal shape - organic curved form */}
        <path
          d="M 60 10 C 80 25 95 55 95 85 C 95 120 80 135 60 138 C 40 135 25 120 25 85 C 25 55 40 25 60 10 Z"
          fill={`url(#glow-${petal.id})`}
          opacity="0.9"
        />

        {/* Inner highlight for depth */}
        <path
          d="M 60 15 C 75 28 88 55 88 85 C 88 115 75 130 60 133 C 45 130 32 115 32 85 C 32 55 45 28 60 15 Z"
          fill="rgba(255, 255, 255, 0.15)"
          opacity="0.6"
        />
      </svg>

      {/* Text label - positioned on petal */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="text-center">
          <p className="text-white font-bold text-sm md:text-lg drop-shadow-lg tracking-wide">
            {petal.label}
          </p>
        </div>
      </div>
    </div>
  );
};

interface Flower3DProps {
  onPetalClick: (petalIndex: number) => void;
}

export const Flower3D = ({ onPetalClick }: Flower3DProps) => {
  const [hoveredPetal, setHoveredPetal] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePetalClick = (petalId: number) => {
    setIsTransitioning(true);
    const index = petals.findIndex(p => p.id === petalId);
    setTimeout(() => {
      onPetalClick(index);
    }, 450);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Main Flower Container */}
      <div
        className={`relative transition-all duration-500 ${
          isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
        style={{
          width: "420px",
          height: "420px",
          animation: isTransitioning ? "none" : "rotate-360 20s linear infinite",
        }}
      >
        {/* Center Core - Glow circle */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
          style={{
            width: "100px",
            height: "100px",
          }}
        >
          {/* Outer glow layers */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0, 200, 255, 0.6), rgba(0, 200, 255, 0.2))",
              boxShadow: "0 0 60px rgba(0, 200, 255, 0.6), 0 0 100px rgba(0, 200, 255, 0.3)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          />

          {/* Middle glow ring */}
          <div
            className="absolute inset-4 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0, 220, 255, 0.4), transparent)",
              boxShadow: "inset 0 0 30px rgba(0, 200, 255, 0.5)",
            }}
          />

          {/* Core nucleus */}
          <div
            className="absolute inset-6 rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, rgba(100, 220, 255, 0.9), rgba(0, 180, 220, 0.6))",
              boxShadow: "0 0 40px rgba(0, 200, 255, 0.8)",
            }}
          />

          {/* Center text */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}>
            <p className="text-white text-center text-xs md:text-sm font-bold tracking-widest drop-shadow-lg leading-tight px-2">
              الإيمان
            </p>
            <p className="text-white text-center text-xs md:text-sm font-bold tracking-widest drop-shadow-lg leading-tight px-2">
              وعمارة الأرض
            </p>
          </div>
        </div>

        {/* Render all 4 petals */}
        {petals.map((petal) => (
          <FlowerPetal
            key={petal.id}
            petal={petal}
            isHovered={hoveredPetal === petal.id}
            isTransitioning={isTransitioning}
            onHover={setHoveredPetal}
            onClick={handlePetalClick}
          />
        ))}
      </div>

      {/* Subtitle below flower */}
      <div className={`absolute bottom-0 left-0 right-0 text-center pointer-events-none transition-opacity duration-300 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}>
        <p className="text-white/60 text-sm md:text-base tracking-wide">
          استكشف الموضوع من خلال تفاعل الزهرة
        </p>
      </div>

      {/* Custom animation for smooth rotation */}
      <style>{`
        @keyframes rotate-360 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 60px rgba(0, 200, 255, 0.6), 0 0 100px rgba(0, 200, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 80px rgba(0, 200, 255, 0.8), 0 0 130px rgba(0, 200, 255, 0.5);
          }
        }
      `}</style>
    </div>
  );
};
