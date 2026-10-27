import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 text-center">
      <div>
        <p className="font-heading text-7xl text-accent">404</p>
        <h1 className="mt-4 font-heading text-3xl text-ink">Page not found</h1>
        <p className="mt-3 text-ink-soft">The page you are looking for does not exist.</p>
        <Link href="/" className="button-editorial mt-7 inline-flex bg-accent px-5 py-3 font-mono text-xs uppercase text-accent-ink">
          Back home
        </Link>
      </div>
    </main>
  );
}
