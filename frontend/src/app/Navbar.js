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
                        <Image src="/assets/lgo.png" alt="Logo" width={60} height={60} className="hover:scale-105 transition-transform duration-300" />
                        <span className="ml-2 text-xl font-bold text-black">WellZone Lanka</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 hover:scale-105">Home</Link>
                        <Link href="/about" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 hover:scale-105">About us</Link>
                        
                        {/* Services dropdown */}
                        <div className="relative">
                            <Link 
                                href="/services"
                                className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 group flex items-center"
                                onMouseEnter={() => setServicesOpen(true)}
                                onMouseLeave={() => setServicesOpen(false)}
                            >
                                Services
                                <svg 
                                    className={`ml-1 h-4 w-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''} group-hover:text-cyan-600`} 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            
                            {/* Dropdown menu */}
                            {servicesOpen && (
                                <div 
                                    className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 border border-cyan-100 transform transition-all duration-300 ease-in-out"
                                    onMouseEnter={() => setServicesOpen(true)}
                                    onMouseLeave={() => setServicesOpen(false)}
                                >
                                    <Link 
                                        href="/services/fitness" 
                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-600 transition-colors rounded-lg mx-1 flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                        </svg>
                                        Fitness Services
                                    </Link>
                                    <Link 
                                        href="/services/medical" 
                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-600 transition-colors rounded-lg mx-1 flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        Medical Services
                                    </Link>
                                </div>
                            )}
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