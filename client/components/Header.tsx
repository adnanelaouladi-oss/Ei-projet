import { useEffect, useState } from "react";

/**
 * Converts Gregorian date to Hijri (Islamic) calendar
 * Based on the Kuwaiti algorithm
 */
function gregorianToHijri(date: Date): { day: number; month: number; year: number } {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  const N = d + Math.floor(30.6001 * (m + 1)) + y + Math.floor(y / 4) + Math.floor(y / 100) - Math.floor(y / 400) - 15;
  const q = Math.floor(N / 10631);
  const r = N % 10631;
  const a = Math.floor((r + 1) / 325.2422);
  const w = Math.floor((r % 325.2422 + 0.5) / 30.4368);
  const j = r % 325.2422;
  const x = Math.floor((j % 30.4368 + 0.5) / 30.4368);

  const hijriYear = 30 * q + 30 * a + Math.floor(w);
  const hijriMonth = w + 1;
  const hijriDay = x + 1;

  return {
    year: hijriYear + 1,
    month: Math.min(hijriMonth, 12),
    day: Math.min(hijriDay, 30),
  };
}

const hijriMonths = [
  "محرّم",
  "صفر",
  "ربيع الأول",
  "ربيع الثاني",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوّال",
  "ذو القعدة",
  "ذو الحجّة",
];

export const Header = () => {
  const [hijriDate, setHijriDate] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");

  useEffect(() => {
    const today = new Date();
    
    // Set Gregorian date
    const formatter = new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    setGregorianDate(formatter.format(today));

    // Convert to Hijri
    const hijri = gregorianToHijri(today);
    const hijriMonthName = hijriMonths[hijri.month - 1];
    setHijriDate(`${hijri.day} ${hijriMonthName} ${hijri.year} هـ`);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] glass backdrop-blur-lg z-50 border-b border-cyan-500/30 rtl">
      <div className="h-full flex items-center justify-between px-4 sm:px-6 md:px-12">
        {/* Gregorian Date - Left (Hidden on mobile) */}
        <div className="hidden sm:block text-white/80 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">
          {gregorianDate}
        </div>

        {/* Course Title - Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center px-4">
          <h1 className="text-white text-base sm:text-lg md:text-2xl font-bold tracking-wide break-words">
            الإيمان وعمارة الأرض
          </h1>
        </div>

        {/* Hijri Date - Right (Hidden on mobile) */}
        <div className="hidden sm:block text-white/80 text-xs sm:text-sm md:text-base font-medium text-right whitespace-nowrap">
          {hijriDate}
        </div>

        {/* Mobile date indicator */}
        <div className="sm:hidden text-white/80 text-xs">
          {new Date().getDate()}
        </div>
      </div>
    </header>
  );
};
