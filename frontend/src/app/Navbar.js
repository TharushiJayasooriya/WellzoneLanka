import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="shadow-sm fixed w-full z-50 py-3 px-1 bg-opacity-25 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-[3rem]">
                  <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                      <Image src="/assets/lgo.png" alt="Logo" width={60} height={60} />
                      <span className="ml-2 text-xl font-bold text-black">WellZone Lanka</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                      <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                      <Link href="/about" className="text-gray-700 hover:text-gray-900">About us</Link>
                      <Link href="/services" className="text-gray-700 hover:text-gray-900">Services</Link>
                      <Link href="/contact" className="text-gray-700 hover:text-gray-900">Contact us</Link>
                      <Link href="/login" className="text-gray-700 hover:text-gray-900">Log in</Link>
                      <Link 
                        href="/register" 
                        className="bg-cyan-500 text-white px-4 py-2 hover:bg-cyan-600 transition-colors rounded-full"
                      >
                        Start now
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
    )
}