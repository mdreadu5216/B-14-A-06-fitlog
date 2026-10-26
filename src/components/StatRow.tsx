import { FiClock, FiStar } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { Workout } from "@/types/workout";

export default function StatRow({ w, accent = false }: { w: Workout; accent?: boolean }) {
  const icon = accent ? "text-brand" : "";
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
      <span className="flex items-center gap-1.5"><FiClock className={icon} /> {w.duration} min</span>
      <span className="flex items-center gap-1.5"><FaFire className={icon} /> {w.caloriesBurned} kcal</span>
      <span className="flex items-center gap-1.5"><FiStar className={icon} /> {w.rating}</span>
    </div>
  );
}