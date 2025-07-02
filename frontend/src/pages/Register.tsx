// pages/register.tsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
// ✅ Zod schema
const RegisterSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  industry: z.string().min(2, 'Industry is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

// Type from schema
type RegisterFormData = z.infer<typeof RegisterSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
   try {
      console.log('Login data:', data);
      // TODO: Send to backend
      toast.success('Register successful!');
    } catch (err) {
      toast.error('Register failed. Please try again.');
    }
  };

  return (
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Register Your Company</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Company Name */}
          <div>
            <label className="block font-medium mb-1">Company Name</label>
            <input
              {...register('companyName')}
              className="w-full border px-4 py-2 rounded"
              placeholder="e.g. Kibou Tech"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
            )}
          </div>

          {/* Industry */}
          <div>
            <label className="block font-medium mb-1">Industry</label>
            <input
              {...register('industry')}
              className="w-full border px-4 py-2 rounded"
              placeholder="e.g. IT Services"
            />
            {errors.industry && (
              <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full border px-4 py-2 rounded"
              placeholder="e.g. company@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              {...register('password')}
              type="password"
              className="w-full border px-4 py-2 rounded"
              placeholder="••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Company Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full border px-4 py-2 rounded"
              placeholder="Tell us more about your company..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer"
          >
            Register Company
          </button>
        </form>
      </div>
  );
}
