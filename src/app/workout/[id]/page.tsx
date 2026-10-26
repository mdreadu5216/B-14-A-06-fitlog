import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkout } from "@/lib/api";
import ActionButtons from "@/components/ActionButtons";

export default async function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const w = await getWorkout(id);
  if (!w) notFound();

  const specs: [string, string | number][] = [
    ["Equipment", w.equipment],
    ["Difficulty", w.difficulty],
    ["Sets", w.sets],
    ["Reps", w.reps],
    ["Duration", `${w.duration} min`],
    ["Calories", `${w.caloriesBurned} kcal`],
    ["Rating", w.rating],
  ];

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl md:aspect-[4/5]">
        <Image src={w.image} alt={w.name} fill priority sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
      </div>

      <div>
        <h1 className="font-display text-4xl font-bold uppercase md:text-5xl">{w.name}</h1>
        <p className="mt-2 max-w-md text-sm text-muted">{w.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {w.muscleGroups.map((g) => (
            <span key={g} className="rounded-full bg-brand px-3 py-0.5 text-xs font-bold text-black">
              {g}
            </span>
          ))}
        </div>

        <dl className="mt-6 divide-y divide-line rounded-2xl border border-line bg-surface">
          {specs.map(([label, value]) => (
            <div key={label} className="flex justify-between px-5 py-3.5 text-sm">
              <dt className="text-xs uppercase tracking-widest text-muted">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-8 text-sm font-bold uppercase tracking-wide">Instructions</h2>
        <ol className="mt-3 space-y-2 text-sm text-gray-300">
          {w.instructions.map((step, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-muted">{i + 1}.</span> {step}
            </li>
          ))}
        </ol>

        <ActionButtons workout={w} />
      </div>
    </div>
  );
}