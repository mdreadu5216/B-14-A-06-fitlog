import Link from "next/link";
import Image from "next/image";
import { FiCheck, FiX } from "react-icons/fi";
import { PlanItem } from "@/types/workout";
import StatRow from "./StatRow";

interface Props {
  workout: PlanItem;
  showDone: boolean;
  onDone: () => void;
  onRemove: () => void;
}

export default function PlanCard({ workout: w, showDone, onDone, onRemove }: Props) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-center ${
        w.done ? "opacity-60" : ""
      }`}
    >
      <div className="flex flex-1 items-center gap-4">
        <div className="relative h-[68px] w-32 shrink-0 overflow-hidden rounded-lg">
          <Image src={w.image} alt={w.name} fill sizes="128px" className="object-cover" />
        </div>
        <div className="space-y-1">
          <h3 className="font-display text-lg uppercase">{w.name}</h3>
          <p className="text-xs font-medium text-muted">{w.equipment}</p>
          <StatRow w={w} accent />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href={`/workout/${w.id}`} className="rounded-full border border-white/25 px-4 py-2 text-xs hover:bg-white/5">
          View Details
        </Link>
        {showDone && (
          <button
            onClick={onDone}
            disabled={w.done}
            className="flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-bold text-black disabled:opacity-50"
          >
            <FiCheck /> {w.done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button onClick={onRemove} aria-label={`Remove ${w.name}`} className="p-1 text-muted hover:text-white">
          <FiX size={18} />
        </button>
      </div>
    </div>
  );
}