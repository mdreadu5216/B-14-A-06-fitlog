"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { toast } from "react-toastify";
import { Workout, PlanItem } from "@/types/workout";

export const MAX_PLAN = 5;

interface PlanCtx {
  plan: PlanItem[];
  saved: Workout[];
  loaded: boolean;
  addToPlan: (w: Workout) => void;
  saveForLater: (w: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
}

const PlanContext = createContext<PlanCtx | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Read localStorage once, on the client only (avoids hydration errors)
  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem("fitlog-plan") ?? "[]"));
      setSaved(JSON.parse(localStorage.getItem("fitlog-saved") ?? "[]"));
    } catch {}
    setLoaded(true);
  }, []);

  // Write back on every change, but only after the first load
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [plan, saved, loaded]);

  const addToPlan = (w: Workout) => {
    if (plan.some((p) => p.id === w.id))
      return void toast.info("Already in today's plan");
    if (plan.length >= MAX_PLAN)
      return void toast.warn("Plan is full (5 lifts max)");
    setPlan([...plan, w]);
    toast.success("Added to today's plan");
  };

  const saveForLater = (w: Workout) => {
    if (saved.some((s) => s.id === w.id))
      return void toast.info("Already saved");
    setSaved([...saved, w]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id: number) => {
    setPlan(plan.filter((p) => p.id !== id));
    toast.error("Removed from today's plan");
  };

  const removeFromSaved = (id: number) => {
    setSaved(saved.filter((s) => s.id !== id));
    toast.error("Removed from saved");
  };

  const markDone = (id: number) => {
    setPlan(plan.map((p) => (p.id === id ? { ...p, done: true } : p)));
    toast.success("Workout marked as done");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        loaded,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}
