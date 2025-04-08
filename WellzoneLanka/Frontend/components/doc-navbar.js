"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
    const [servicesOpen, setServicesOpen] = useState(false);

    return (
        <nav className="shadow-sm fixed w-full z-50 py-3 px-1 bg-opacity-25 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-[3rem] shadow-lg">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">

                        <Link href="/home">
                        <Image src="/images/icon.png" alt="Logo" width={60} height={60} className="hover:scale-105 transition-transform duration-300" />
                        </Link>
                        <span className="ml-2 text-xl font-bold text-black">WellZone Lanka</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/doctors" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 hover:scale-105">Home</Link>
                        <Link href="/about" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 hover:scale-105">About us</Link>
                        
                        {/* Services dropdown */}
                        <div 
                            className="relative"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                        >
                            <Link 
                                href="/doc-services"
                                className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 flex items-center"
                            >
                                Services
                            </Link>
                            
                        </div>
                        
                        
                        <Link href="/doctors-names" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 hover:scale-105">Doctors</Link>
                        
                    </div>
                </div>
            </div>
        </nav>
    );
}
