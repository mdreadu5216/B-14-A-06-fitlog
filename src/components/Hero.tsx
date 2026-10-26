import Image from "next/image";
import banner from "@/assets/banner.png";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <div className="grid items-center gap-8 rounded-2xl border border-line bg-surface p-8 md:grid-cols-2 md:p-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Workout Library
          </p>
          <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] md:text-7xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-6 max-w-md text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-bold uppercase text-black"
          >
            Browse Workouts
          </a>
        </div>
        <Image
          src={banner}
          alt="Anatomical figure on a curl machine"
          width={10000}
          height={10000}
          priority
          className="mx-auto h-auto w-auto object-contain"
        />
      </div>
    </section>
  );
}
