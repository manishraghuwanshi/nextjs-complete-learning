// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>

      <Link
        href="/"
        className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        Go back home
      </Link>
    </div>
  );
}
