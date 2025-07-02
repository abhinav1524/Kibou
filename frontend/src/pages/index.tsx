// pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
      <div className="text-center max-w-2xl mx-auto my-20">
        <h2 className="text-4xl font-bold mb-4">Welcome to the B2B Tender Platform</h2>
        <p className="mb-6 text-lg">
          Connect with businesses, post tenders, and find opportunities.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/tender">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Browse Tenders
            </button>
          </Link>
          <Link href="/Register">
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Register Your Company
            </button>
          </Link>
        </div>
      </div>
  );
}
