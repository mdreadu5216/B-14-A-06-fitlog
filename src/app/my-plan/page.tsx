"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { usePlan } from "@/context/PlanContext";
import PlanCard from "@/components/PlanCard";

type Tab = "plan" | "saved";
type SortKey = "duration" | "caloriesBurned" | "rating";

export default function MyPlanPage() {
  const { plan, saved, loaded, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  // Stats always describe Today's Plan (even while the Saved tab is open)
  const minutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const calories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const list = useMemo(() => {
    const base = tab === "plan" ? plan : saved;
    return [...base].sort((a, b) => (sortBy === "rating" ? b.rating - a.rating : a[sortBy] - b[sortBy]));
  }, [tab, plan, saved, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl font-bold uppercase">My Plan</h1>
      <p className="mt-1 text-sm text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface">
        <Metric label="Exercises" value={plan.length} accent />
        <Metric label="Minutes" value={minutes} />
        <Metric label="Calories" value={calories} />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-xl border border-line bg-surface p-1">
          {(["plan", "saved"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 text-sm ${tab === t ? "bg-white/10 font-semibold text-white" : "text-muted"}`}
            >
              {t === "plan" ? "Today's Plan" : "Saved"}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 text-sm text-muted">
          Sort By
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="appearance-none rounded-lg border border-line bg-surface py-2 pl-3 pr-9 text-sm text-white outline-none focus:border-brand"
            >
              <option value="duration" className="bg-page">Duration</option>
              <option value="caloriesBurned" className="bg-page">Calories</option>
              <option value="rating" className="bg-page">Rating</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
          </div>
        </label>
      </div>

      <div className="mt-6 space-y-4">
        {!loaded ? (
          <p className="py-16 text-center text-muted">Loading workouts…</p>
        ) : list.length === 0 ? (
          <div className="grid place-items-center gap-3 py-20 text-center">
            <h2 className="font-display text-2xl font-bold uppercase">Nothing here yet</h2>
            <p className="text-sm text-muted">Browse the library and add a lift to get today moving.</p>
            <Link
              href="/"
              className="mt-2 rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-black shadow-[0_0_24px_rgba(200,245,0,0.35)]"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          list.map((w) => (
            <PlanCard
              key={w.id}
              workout={w}
              showDone={tab === "plan"}
              onDone={() => markDone(w.id)}
              onRemove={() => (tab === "plan" ? removeFromPlan(w.id) : removeFromSaved(w.id))}
            />
          ))
        )}
      </div>
    </div>
  );
}

function Metric({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="p-5 sm:p-8">
      <p className="text-xs text-muted sm:text-sm">{label}</p>
      <p className={`mt-2 font-display text-3xl font-bold sm:text-5xl ${accent ? "text-brand" : ""}`}>{value}</p>
    </div>
  );
}