import Link from 'next/link';


const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo/Brand Name */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          GlobalTNA Board
        </Link>

        {/* Links */}
        <div className="flex space-x-6 items-center">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Home
          </Link>
          <Link 
            href="/new" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm font-medium"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;