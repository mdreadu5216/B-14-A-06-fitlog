import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types/workout";
import StatRow from "./StatRow";

export default function WorkoutCard({ workout: w }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${w.id}`}
      className="overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:border-brand/40"
    >
      <div className="w-full">
        <Image
          src={w.image}
          alt={w.name}
          width={800}
          height={400}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="h-auto w-full"
        />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {w.muscleGroups.map((g) => (
            <span
              key={g}
              className="rounded-full bg-brand px-3 py-0.5 text-xs font-bold uppercase text-black"
            >
              {g}
            </span>
          ))}
        </div>
        <h3 className="mt-4 font-display text-xl uppercase tracking-wide">
          {w.name}
        </h3>
        <p className="text-sm text-muted">{w.equipment}</p>
        <div className="mt-4 border-t border-line pt-4">
          <StatRow w={w} />
        </div>
      </div>
    </Link>
  );
}
