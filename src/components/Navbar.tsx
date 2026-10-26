"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";
import logo from "@/assets/logo.png";


export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`rounded-full px-4 py-1.5 text-sm transition ${
        pathname === href ? "bg-brand/15 font-medium text-brand" : "text-muted hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="border-b border-line">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 px-4 py-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:px-6">
        <Link href="/" className="flex items-center gap-2 justify-self-start font-display text-xl tracking-wide">
          <Image src={logo} alt="FitLog" width={32} height={32} />FITLOG
        </Link>

        <div className="order-3 flex w-full justify-center gap-2 sm:order-none sm:w-auto">
          {navLink("/", "Workouts")}
          {navLink("/my-plan", "My Plan")}
        </div>

        <div className="flex items-center gap-4 justify-self-end text-sm">
          <Link href="/my-plan" className="flex items-center gap-2">
            Plan
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-xs font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2 text-muted">
            Saved
            <span className="grid h-5 min-w-5 place-items-center rounded-full border border-white/30 px-1 text-xs text-white">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}