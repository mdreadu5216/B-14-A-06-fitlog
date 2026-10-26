import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 font-display text-white">
          <Image src={logo} alt="FitLog" width={24} height={24} className="-rotate-45 text-brand"/>
          FITLOG
        </div>

        <p>
          © {currentYear} FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}