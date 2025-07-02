// components/ApplyModal.tsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

const schema = z.object({
  proposal: z.string().min(10, 'Proposal must be at least 10 characters'),
});

type ApplyFormData = z.infer<typeof schema>;

interface Props {
  tenderId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplyModal({ tenderId, isOpen, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplyFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ApplyFormData) => {
    try {
      // 🔐 You'd normally send this to your backend API
      console.log('Sending proposal:', { ...data, tenderId });

      // Simulate success
      toast.success('Application submitted!');
      reset();
      onClose();
    } catch (err) {
      toast.error('Submission failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Submit Proposal</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <textarea
            {...register('proposal')}
            className="w-full border px-3 py-2 rounded text-gray-500"
            placeholder="Write your proposal here..."
            rows={5}
          ></textarea>
          {errors.proposal && (
            <p className="text-red-500 text-sm">{errors.proposal.message}</p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
