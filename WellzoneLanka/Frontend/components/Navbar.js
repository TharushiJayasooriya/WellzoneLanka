"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut } from "lucide-react";

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <nav className="shadow-sm fixed w-full z-30 py-3 px-1 bg-opacity-25 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-[3rem] shadow-lg">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image 
              src="/assets/lgo.png" 
              alt="Logo" 
              width={60} 
              height={60} 
              className="hover:scale-105 transition-transform duration-300" 
            />
            <span className="ml-2 text-xl font-bold text-black">WellZone Lanka</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 hover:scale-105">
              Home
            </Link>
            
            <Link href="/about-2" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 hover:scale-105">
              About us
            </Link>
            
            <Link href="/contact" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 hover:scale-105">
              Contact us
            </Link>

            {status === "authenticated" ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 text-gray-700 hover:text-cyan-600 transition-colors duration-300"
                  onClick={() => setProfileOpen(!profileOpen)}
                  onMouseEnter={() => setProfileOpen(true)}
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">
                    {session.user?.name?.charAt(0) || <User size={16} />}
                  </div>
                  <span className="font-medium">
                    {session.user?.name?.split(' ')[0] || "Profile"}
                  </span>
                </button>

                {profileOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                    onMouseEnter={() => setProfileOpen(true)}
                    onMouseLeave={() => setProfileOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 hover:scale-105">
                  Log in
                </Link>
                <Link 
                  href="/register" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2.5 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 rounded-full font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Start now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}