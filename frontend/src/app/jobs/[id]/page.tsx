"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getJobById, updateJobStatus, deleteJob } from '@/services/jobServices';
import { JobRequest } from '@/types';
import Link from 'next/link';
import { MapPin, Trash2, User } from 'lucide-react';


//function of jobdetailsPage
export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<JobRequest | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);


  // Fetch job details on mount
  useEffect(() => {
    if (id) {
      getJobById(id as string)
        .then(setJob)
        .catch(err => console.error("Error fetching job:", err));
    }
  }, [id]);


  // Handle status change
  const handleStatusChange = async (newStatus: string) => {
    setLoadingAction(true);
    try {
      const updated = await updateJobStatus(id as string, newStatus);
      setJob(updated);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoadingAction(false);
    }
  };


  // Handle job deletion
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this request? This action cannot be undone.")) {
      setLoadingAction(true);
      try {
        await deleteJob(id as string);
        router.push('/');
      } catch (error) {
        console.error("Error deleting job:", error);
        setLoadingAction(false);
      }
    }
  };

  
 //function of status bedge
  const getStatusStyle = (status: string) => {
    const base = "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-inner";
    switch (status) {
      case 'Open': return `${base} bg-emerald-100 text-emerald-800 border border-emerald-200`;
      case 'In Progress': return `${base} bg-amber-100 text-amber-800 border border-amber-200`;
      case 'Closed': return `${base} bg-slate-100 text-slate-700 border border-slate-200`;
      default: return `${base} bg-slate-100 text-slate-700`;
    }
  };


  // Show loading state
  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Loading request details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        

        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 mb-8 transition-colors group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Board
        </Link>

        {/* Main Content Card */}
        <div className="bg-white p-8 md:p-10 shadow-xl shadow-slate-100 rounded-3xl border border-slate-100">
          
          {/* Header Area */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8 pb-8 border-b border-slate-100">
            <div>
              <p className="text-sm font-semibold text-indigo-600 mb-1">{job.category}</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tighter">{job.title}</h1>
              <p className="text-slate-500 mt-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                {job.location} • Posted on {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex-shrink-0 mt-2 md:mt-0">
              <span className={getStatusStyle(job.status)}>
                {job.status}
              </span>
            </div>
          </div>

          {/* Details Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Description - 2/3 width on desktop */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Job Description</h2>
              <div className="prose prose-slate max-w-none bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Contact Info - 1/3 width on desktop */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4 self-start">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <User className="h-5 w-5 text-indigo-500" />
                Contact Customer
              </h2>
              <div className="space-y-2 text-sm">
                <p className="text-slate-800 font-semibold">{job.contactName}</p>
                <a href={`mailto:${job.contactEmail}`} className="text-indigo-600 hover:underline block break-all font-medium">
                  {job.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Action Area (Admin/Trader focus) */}
          <div className="mt-12 pt-10 border-t border-slate-100 bg-slate-50/50 -mx-8 -mb-8 p-8 rounded-b-3xl">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Manage Request Status</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Change Status to:</label>
                <select 
                  value={job.status} 
                  onChange={(e) => handleStatusChange(e.target.value)} 
                  disabled={loadingAction}
                  className="w-full sm:w-60 border border-slate-200 p-3 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm text-slate-800 font-medium disabled:opacity-60"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <button 
                onClick={handleDelete} 
                disabled={loadingAction}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors border border-rose-100 active:scale-95 disabled:opacity-60"
              ><Trash2 className="h-4 w-4" />
                Delete Request
              </button>
            </div>
            
            {loadingAction && (
              <p className="text-xs text-indigo-600 mt-4 animate-pulse font-medium">Executing action, please wait...</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}