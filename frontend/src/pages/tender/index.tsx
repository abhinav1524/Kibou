// pages/tenders/index.tsx
import Link from 'next/link';
const tenders = [
  {
    id: 1,
    title: 'Website Redesign',
    description: 'Looking for a frontend team to redesign our marketing website.',
    deadline: '2025-08-30',
    budget: '$5,000',
  },
  {
    id: 2,
    title: 'Inventory System API',
    description: 'Develop a RESTful API for our warehouse management system.',
    deadline: '2025-09-15',
    budget: '$8,000',
  },
];

export default function TendersPage() {
  return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Available Tenders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tenders.map((tender) => (
            <div
              key={tender.id}
              className="border rounded-lg p-6 shadow hover:shadow-md transition duration-200 bg-white"
            >
              <h2 className="text-xl text-gray-900 font-semibold mb-2">{tender.title}</h2>
              <p className="text-gray-700 mb-3">{tender.description}</p>
              <div className="text-sm text-gray-500 mb-1">
                <strong>Deadline:</strong> {tender.deadline}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                <strong>Budget:</strong> {tender.budget}
              </div>
              <Link href={`/tender/${tender.id}`}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
                View Details
              </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
  );
}
