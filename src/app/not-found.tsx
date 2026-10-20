import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 text-center">
      <div>
        <p className="text-gradient font-heading text-7xl font-bold">404</p>
        <h1 className="mt-4 font-heading text-3xl font-bold text-white">Page not found</h1>
        <p className="mt-3 text-white/55">The page you are looking for does not exist.</p>
        <Link href="/" className="bg-accent-gradient mt-7 inline-flex rounded-full px-5 py-3 text-sm font-semibold text-white">
          Back home
        </Link>
      </div>
    </main>
  );
}
