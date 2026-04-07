import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { FloatingParticles } from "@/components/FloatingParticles";

interface PlaceholderProps {
  title: string;
  message?: string;
}

export const Placeholder = ({ title, message }: PlaceholderProps) => {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background with particles */}
      <FloatingParticles />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 w-full pt-[70px] pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          {/* Back Link */}
          <div className="mt-12 mb-12">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors fade-in-up"
            >
              <span>← العودة</span>
            </Link>
          </div>

          {/* Placeholder Content */}
          <div className="glass backdrop-blur-lg rounded-lg px-8 py-12 text-center fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-right">
              {title}
            </h1>
            <p className="text-white/70 text-lg mb-8 text-right">
              {message || "هذه الصفحة قيد الإنشاء. يرجى المتابعة لملء المحتوى."}
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 glass backdrop-blur-lg rounded-lg text-white hover:bg-white/20 transition-colors font-semibold"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
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
