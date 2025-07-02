// src/pages/index.tsx (or pages/index.tsx if no src/)
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Welcome to B2B Tender Platform</h1>
      <p className="mb-6 text-lg text-center max-w-xl">
        Register your company, publish tenders, and apply to business opportunities with ease.
      </p>

      <div className="flex space-x-4">
        <Link href="/login">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Login</button>
        </Link>

        <Link href="/register">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Register</button>
        </Link>

        <Link href="/tenders">
          <button className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800">Browse Tenders</button>
        </Link>
      </div>
    </div>
  );
}
