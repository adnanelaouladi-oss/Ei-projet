import { useState } from "react";
import { Header } from "./Header";
import { FloatingParticles } from "./FloatingParticles";
import { Link } from "react-router-dom";
import { ChevronDown, Home } from "lucide-react";

interface AccordionBlock {
  id: string;
  title: string;
  content: string;
  isOpen?: boolean;
}

interface AccordionPageProps {
  title: string;
  arabicTitle: string;
  blocks: AccordionBlock[];
  onBack?: () => void;
}

export const AccordionPage = ({
  title,
  arabicTitle,
  blocks,
  onBack
}: AccordionPageProps) => {
  const [openBlock, setOpenBlock] = useState<string>(blocks[0]?.id || null);

  const toggleBlock = (blockId: string) => {
    setOpenBlock(openBlock === blockId ? null : blockId);
  };

  const openIndex = Math.max(0, blocks.findIndex(b => b.id === openBlock));

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden rtl">
      {/* Background with particles */}
      <FloatingParticles />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 w-full pt-[70px] pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl">
          {/* Title Section */}
          <div className="mt-8 md:mt-12 mb-12 fade-in-up">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors"
            >
              <span>← العودة للرئيسية</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 break-words">
              {arabicTitle}
            </h1>
            <p className="text-white/60 text-base sm:text-lg">
              {title}
            </p>
          </div>

          {/* Accordion Blocks */}
          <div className="space-y-4">
            {blocks.map((block, index) => (
              <div
                key={block.id}
                className="group fade-in-up"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleBlock(block.id)}
                  className={`w-full glass backdrop-blur-lg px-4 sm:px-6 py-4 sm:py-6 transition-all duration-300 flex items-center justify-between gap-3 sm:gap-4 ${
                    openBlock === block.id
                      ? "bg-cyan-500/20 border-cyan-500/50"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  } border rounded-lg group`}
                >
                  <span className="text-lg sm:text-xl font-semibold text-white flex-1 break-words">
                    {block.title}
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-cyan-400 transition-transform duration-300 ${
                      openBlock === block.id ? "rotate-180" : ""
                    }`}
                    size={24}
                  />
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    openBlock === block.id
                      ? "max-h-[1500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="glass backdrop-blur-lg bg-white/5 border border-t-0 border-white/10 px-4 sm:px-6 py-6 sm:py-8 text-right">
                    <div className="text-white/90 leading-relaxed whitespace-pre-wrap text-base sm:text-lg font-light">
                      {block.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation and Progress Bar */}
          <div className="mt-12 sm:mt-16">
            {/* Progress Bar */}
            <div className="mb-8 flex justify-center">
              <div className="inline-flex gap-2">
                {blocks.map((block, idx) => (
                  <button
                    key={block.id}
                    onClick={() => setOpenBlock(block.id)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === openIndex
                        ? "w-8 bg-cyan-400"
                        : "w-2 bg-cyan-400/30 hover:bg-cyan-400/50"
                    }`}
                    aria-label={`Go to block ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-between items-center gap-4 flex-wrap">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 glass backdrop-blur-lg rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <Home size={20} />
                <span className="hidden sm:inline">الرئيسية</span>
              </Link>
              <div className="text-white/40 text-xs sm:text-sm font-medium">
                {openIndex + 1} / {blocks.length}
              </div>
              <div className="hidden" />
            </div>
          </div>
        </div>
      </main>

      {/* Subtle vignette effect */}
      <div className="fixed inset-0 pointer-events-none z-20" style={{
        boxShadow: "inset 0 0 120px rgba(0, 0, 0, 0.5)"
      }} />
    </div>
  );
};
