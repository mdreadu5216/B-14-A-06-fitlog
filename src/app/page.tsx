import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import { getWorkouts } from "@/lib/api";
import React from "react";

const Home = async () => {
  const workouts = await getWorkouts();
  return (
    <>
    <Hero />
      <section id="library" className="mx-auto max-w-7xl scroll-mt-6 px-4 pt-16 sm:px-6">
        <h2 className="font-display text-4xl font-bold uppercase">The Library</h2>
        <p className="mt-1 text-sm text-muted">Twelve lifts covering every major muscle group.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
