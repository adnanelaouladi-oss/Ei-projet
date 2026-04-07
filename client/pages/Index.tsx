import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Flower3D } from "@/components/Flower3D";

const petalRoutes = [
  "/situation",
  "/analysis",
  "/concepts",
  "/values",
];

export default function Index() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePetalClick = (petalIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(petalRoutes[petalIndex]);
    }, 450);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden rtl">
      {/* Background with particles */}
      <FloatingParticles />

      {/* Header */}
      <Header />

      {/* Main Content - Flower centered */}
      <main className="relative z-10 w-full h-full pt-[70px] flex items-center justify-center">
        <div className="w-full h-[calc(100%-70px)] flex items-center justify-center px-4">
          {/* 3D Flower Container */}
          <div
            className={`w-full h-full max-w-3xl md:max-w-4xl transition-all duration-500 ${
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <Flower3D onPetalClick={handlePetalClick} />
          </div>
        </div>

        {/* Center text above flower */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-4">
          <div className="text-center max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2 break-words">
              الإيمان وعمارة الأرض
            </h2>
            <p className="text-white/60 text-xs sm:text-sm md:text-base">
              استكشف الموضوع من خلال تفاعل الزهرة
            </p>
          </div>
        </div>
      </main>

      {/* Subtle vignette effect */}
      <div className="fixed inset-0 pointer-events-none z-30" style={{
        boxShadow: "inset 0 0 120px rgba(0, 0, 0, 0.5)"
      }} />
    </div>
  );
}
