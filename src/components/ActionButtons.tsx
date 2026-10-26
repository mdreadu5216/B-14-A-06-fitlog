"use client";
import { FiCalendar, FiBookmark } from "react-icons/fi";
import { MAX_PLAN, usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

export default function ActionButtons({ workout }: { workout: Workout }) {
  const { plan, addToPlan, saveForLater } = usePlan();
  const full = plan.length >= MAX_PLAN && !plan.some((p) => p.id === workout.id);

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        onClick={() => addToPlan(workout)}
        disabled={full}
        title={full ? "Your plan is full (5 lifts)" : undefined}
        className="flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-bold text-black disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FiCalendar /> Add to today&apos;s plan
      </button>
      <button
        onClick={() => saveForLater(workout)}
        className="flex items-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm hover:bg-white/5"
      >
        <FiBookmark /> Save for later
      </button>
    </div>
  );
}