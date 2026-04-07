import { useEffect, useState } from "react";

export const Header = () => {
  const [hijriDate, setHijriDate] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");

  useEffect(() => {
    const today = new Date();

    // Date grégorienne en arabe
    const gregorianFormatter = new Intl.DateTimeFormat("ar-SA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    setGregorianDate(gregorianFormatter.format(today));

    // Date Hijri en arabe
    const hijriFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    setHijriDate(hijriFormatter.format(today) + " هـ");
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] glass backdrop-blur-lg z-50 border-b border-cyan-500/30 rtl">
      <div className="h-full flex items-center justify-between px-4 sm:px-6 md:px-12">
        {/* Date grégorienne - gauche (cachée sur mobile) */}
        <div className="hidden sm:block text-white/80 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">
          {gregorianDate}
        </div>

        {/* Titre du cours - centre */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center px-4">
          <h1 className="text-white text-base sm:text-lg md:text-2xl font-bold tracking-wide break-words">
            الإيمان وعمارة الأرض
          </h1>
        </div>

        {/* Date Hijri - droite (cachée sur mobile) */}
        <div className="hidden sm:block text-white/80 text-xs sm:text-sm md:text-base font-medium text-right whitespace-nowrap">
          {hijriDate}
        </div>

        {/* Indicateur date mobile */}
        <div className="sm:hidden text-white/80 text-xs">
          {new Date().getDate()}
        </div>
      </div>
    </header>
  );
};
