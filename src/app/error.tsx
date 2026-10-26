"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div>
        <h2 className="font-display text-3xl uppercase">Something went wrong</h2>
        <p className="mt-2 text-muted">We couldn&apos;t load the workouts.</p>
        <button onClick={reset} className="mt-6 rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-black">
          Try again
        </button>
      </div>
    </div>
  );
}