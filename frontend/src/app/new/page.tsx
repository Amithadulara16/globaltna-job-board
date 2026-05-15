"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createJob } from '@/services/jobServices'; 
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function NewJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '', description: '', category: 'Plumbing',
    location: '', contactName: '', contactEmail: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createJob(form);
      router.push('/');
    } catch (error) {
      console.error("Error creating job:", error);
      setLoading(false);
    }
  };

//text color add input style
  const inputStyle = "w-full border-[1.5px] border-gray-200 bg-white text-slate-900 focus:bg-green-50 focus:border-[#1D9E75] outline-none px-4 py-2.5 rounded-xl text-sm transition-all duration-300 placeholder:text-gray-400";

  return (
    <div className="min-h-screen bg-[#f0f9f7] py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-2xl p-8 shadow-xl shadow-green-900/5">

        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#185FA5] hover:text-[#0C447C] mb-8 transition-colors group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Board
        </Link>

        <h1 className="text-3xl font-bold text-[#0F6E56] mb-2">Post a New Job Request</h1>
        <p className="text-slate-500 mb-8">
          Fill in the details below and we'll match you with available tradespeople.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Section: Job Details */}
          <div className="space-y-4">
            <p className="text-xs font-bold text-[#0C447C] uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#154779]"></span> Job Details
            </p>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Job Title <span className="text-red-500">*</span></label>
              <input
                required
                placeholder="e.g. Leaking kitchen tap needs fixing"
                className={inputStyle}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Description <span className="text-red-500">*</span></label>
              <textarea
                required
                placeholder="Describe the job in detail..."
                className={`${inputStyle} h-32 resize-none`}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <select
                  className={inputStyle}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Painting">Painting</option>
                  <option value="Joinery">Joinery</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Location <span className="text-red-500">*</span></label>
                <input
                  required
                  placeholder="e.g. Glasgow"
                  className={inputStyle}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section: Contact Info */}
          <div className="space-y-4 pt-4">
            <p className="text-xs font-bold text-[#0C447C] uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#B5D4F4]"></span> Contact Info
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Your Name <span className="text-red-500">*</span></label>
                <input
                  required
                  placeholder="Full name"
                  className={inputStyle}
                  onChange={e => setForm({ ...form, contactName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                <input
                  required
                  type="email"
                  placeholder="example@email.com"
                  className={inputStyle}
                  onChange={e => setForm({ ...form, contactEmail: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Submit Button with Gradient & Hover effect */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 relative overflow-hidden group bg-gradient-to-r from-[#0F6E56] to-[#1D9E75] hover:from-[#1D9E75] hover:to-[#0F6E56] text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-green-200 transition-all duration-500 transform active:scale-[0.98] disabled:opacity-70"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
              
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                  Processing...
                </>
              ) : (
                'Submit Request'
              )}
            </span>
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
          </button>

        </form>
      </div>
    </div>
  );
}