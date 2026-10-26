import { Workout } from "@/types/workout";

const BASE =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL ||
  "https://api.abcz.workers.dev/api/fitlog";

export const getWorkouts = async (): Promise<Workout[]> => {
  const res = await fetch(BASE, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return res.json();
};

export const getWorkout = async (id: string): Promise<Workout | null> => {
  const res = await fetch(`${BASE}/${id}`, { cache: "no-store" });

  if (!res.ok) {
    return null;
  }

  const json = await res.json();
  const data = json?.data ?? json;

  return data && data.id ? (data as Workout) : null;
};