"use client";
import { useEffect, useState } from 'react';
import { getJobs } from '@/services/jobServices';
import { JobRequest } from '@/types';
import Link from 'next/link';

export default function HomePage() {
  const [jobs, setJobs] = useState<JobRequest[]>([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    getJobs(category).then(setJobs);
  }, [category]);

  const getBadgeClass = (status: string) => {
    if (status === 'Open') return 'bg-emerald-50 text-emerald-800 border border-emerald-200';
    if (status === 'In Progress') return 'bg-blue-50 text-blue-800 border border-blue-200';
    return 'bg-gray-100 text-gray-600 border border-gray-200';
  };

  return (
    <div className="min-h-screen bg-[#f8fffe]">
      <div className="p-6 max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            <span className="text-[#0F6E56]">Service </span>
            <span className="text-[#0C447C]">Request Board</span>
          </h1>
          <Link
            href="/new"
            className="bg-[#0C447C] hover:bg-[#185FA5] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
          >
            + Post a New Job
          </Link>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-sm text-gray-500">Filter by category:</span>
          <select
            className="border-2 border-[#9FE1CB] bg-white text-[#0F6E56] px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#1D9E75] min-w-[180px]"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting</option>
            <option value="Joinery">Joinery</option>
          </select>
        </div>

        {/* Job Cards */}
        <div className="flex flex-col gap-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border border-gray-200 border-l-4 border-l-[#1D9E75] hover:border-l-[#185FA5] rounded-xl px-5 py-4 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-1">
                <h2 className="text-base font-medium text-gray-900">{job.title}</h2>
                <span className="text-xs font-medium bg-[#E1F5EE] text-[#0F6E56] px-2 py-1 rounded ml-3 shrink-0">
                  {job.category}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                📍 {job.location} · {job.category}
              </p>

              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeClass(job.status)}`}>
                  {job.status}
                </span>
                <Link
                  href={`/jobs/${job._id}`}
                  className="text-sm font-medium text-[#185FA5] hover:text-[#0C447C] hover:underline flex items-center gap-1"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}

          {jobs.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">
              No jobs found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}