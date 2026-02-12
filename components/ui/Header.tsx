'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  // Check if user is on a logged-in page (not login or landing page)
  const isLoggedIn = pathname !== '/login' && pathname !== '/';
  const homeLink = isLoggedIn ? '/profile' : '/';

  return (
    <div className="fixed top-4 left-4 sm:top-6 sm:left-6 z-40">
      <Link 
        href={homeLink} 
        className="inline-flex items-center space-x-1 group"
      >
        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-200">
          Edu
        </span>
        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-200">
          Gap
        </span>
      </Link>
    </div>
  );
}
