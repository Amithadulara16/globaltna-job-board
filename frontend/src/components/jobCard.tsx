import Link from 'next/link';
import { JobRequest } from '@/types';
import { MapPin, ChevronRight } from 'lucide-react'; 

interface JobCardProps {
  job: JobRequest;
}

// JobCard component to display individual job request details in a card format
const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        {/* Job title and category */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
          <p className="text-sm text-blue-600 font-medium">{job.category}</p>
        </div>
        {/* Status badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          job.status === 'Open' ? 'bg-green-100 text-green-700' : 
          job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 
          'bg-gray-100 text-gray-700'
        }`}>
          {job.status}
        </span>
      </div>

      {/*At the place of job */}
      <div className="flex items-center text-gray-500 text-sm mb-4">
        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
        {job.location}
      </div>

      {/* More details  */}
      <div className="flex justify-end">
        <Link 
          href={`/jobs/${job._id}`} 
          className="text-blue-600 font-medium hover:text-blue-800 flex items-center transition"
        >
          View Details
          {/* Lucide ChevronRight component*/}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;