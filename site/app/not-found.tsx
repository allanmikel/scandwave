import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="mono-label text-cyan">404</p>
        <h1 className="display mt-6 text-4xl text-ivory md:text-5xl">
          Signal lost.
        </h1>
        <p className="mt-6 text-ivory-dim">
          The page you requested could not be located.
        </p>
        <Link
          href="/sv"
          className="mt-10 inline-flex items-center gap-3 border border-ivory/15 px-5 py-3 text-sm transition-colors hover:border-cyan hover:text-cyan"
        >
          Return
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
