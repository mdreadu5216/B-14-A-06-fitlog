import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div>
        <h1 className="font-display text-8xl font-bold text-brand">404</h1>
        <p className="mt-2 text-muted">This page skipped leg day.</p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-black">
          Back to home
        </Link>
      </div>
    </div>
  );
}