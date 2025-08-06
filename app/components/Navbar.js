'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="Navbar bg-gray-800 text-white p-4 h-auto relative z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-[30px] font-bold">Get-a-Developer</h1>

        {/* Desktop links */}
        <ul className="hidden md:flex space-x-5 items-center transition">
          <li><Link href="/login-page" className="hover:text-yellow-300 hover:bg-gray-600 px-4 py-2 rounded-[5px]">Home</Link></li>
          <li><Link href="/" className="hover:text-yellow-300 hover:bg-gray-600 px-4 py-2 rounded-[5px]">About</Link></li>
          <li><Link href="/profile" className="hover:text-yellow-300 hover:bg-gray-600 px-4 py-2 rounded-[5px]">Profile</Link></li>
          <li><Link href="#developers" className="hover:text-yellow-300 hover:bg-gray-600 px-4 py-2 rounded-[5px]">Developers</Link></li>
          <li><Link href="/reviews" className="hover:text-yellow-300 hover:bg-gray-600 px-4 py-2 rounded-[5px]">Reviews</Link></li>
          <li>
          </li>
          {session?.user && (
            <li className="relative group">
              <Image
                src={session?.user?.image}
                alt="avatar"
                width={36}
                height={36}
                className="rounded-full cursor-pointer"
              />
              <button
                onClick={() => signOut()}
                className="absolute top-10 right-0 bg-red-500 px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Hamburger */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✖️' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <ul className="md:hidden mt-4  space-y-4 w-[130px] mx-auto text-center">
          <li className=" active:text-yellow-300 active:bg-gray-600 px-4 py-2 rounded-[5px]"><Link href="/login-page">Home</Link></li>
          <li><Link href="/" className="hover:text-yellow-300 hover:bg-gray-600 px-4 py-2 rounded-[5px]">About</Link></li>
          <li className=" active:text-yellow-300 active:bg-gray-600 px-4 py-2 rounded-[5px]"><Link href="/profile">Profile</Link></li>
          <li><Link href="#developers" className="hover:text-yellow-300 hover:bg-gray-600 px-4 py-2 rounded-[5px]">Developers</Link></li>
          <li className=" active:text-yellow-300 active:bg-gray-600 px-4 py-2 rounded-[5px]"><Link href="/reviews">Reviews</Link></li>
          <li>
          </li>
          {session?.user && (
            <li className="flex flex-col items-center">
              <Image
                src={session.user.image}
                alt="avatar"
                width={36}
                height={36}
                className="rounded-full"
              />
              <button
                onClick={() => signOut()}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
