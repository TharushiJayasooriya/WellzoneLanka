import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
    const [servicesOpen, setServicesOpen] = useState(false);

    return (
        <nav className="shadow-sm fixed w-full z-30 py-3 px-1 bg-opacity-25 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-[3rem] shadow-lg">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Image src="/assets/lgo.png" alt="Logo" width={60} height={60} className="hover:scale-105 transition-transform duration-300" />
                        <span className="ml-2 text-xl font-bold text-black">WellZone Lanka</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 hover:scale-105">Home</Link>
                        <Link href="/about-2" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 hover:scale-105">About us</Link>
                        
                        {/* Services dropdown */}
                        <div className="relative">
                            <Link 
                                href="/services"
                                className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 group flex items-center"
                                onMouseEnter={() => setServicesOpen(true)}
                                onMouseLeave={() => setServicesOpen(false)}
                            >
                                Services
                               
                            </Link>
                            
                           
                            
                        </div>
                        
                        <Link href="/contact" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 hover:scale-105">Contact us</Link>
                        <Link href="/login" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 hover:scale-105">Log in</Link>
                        <Link 
                            href="/register" 
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2.5 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 rounded-full font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Start now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}