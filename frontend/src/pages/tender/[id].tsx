// pages/tenders/[id].tsx
import { useRouter } from 'next/router';
import { useState } from 'react';
import ApplyModal from '@/components/ApplyModel';
export default function TenderDetails() {
  const router = useRouter();
  const { id } = router.query;

  // TODO: Fetch tender details using the `id` (e.g., from API)
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Tender Details</h1>
        <p className="text-gray-700 mb-2">
          <strong>Tender ID:</strong> {id}
        </p>

        {/* Replace with real fetched data below */}
        <div className="bg-white rounded shadow p-6 mt-4">
          <h2 className="text-xl font-semibold text-gray-900">Example Tender Title</h2>
          <p className="text-gray-600 mt-2">
            This is where the full description of the tender will be displayed.
          </p>
          <p className="mt-2 text-gray-600">
            <strong>Deadline:</strong> 2025-09-15
          </p>
          <p className="mt-1 text-gray-600">
            <strong>Budget:</strong> $8,000
          </p>
           <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Submit Proposal
          </button>
        </div>
               <ApplyModal
        tenderId={id as string}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      </div>
  );
}
