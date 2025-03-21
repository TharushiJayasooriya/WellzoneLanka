"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed w-[95%] left-1/2 transform -translate-x-1/2 z-50 bg-gray-50 backdrop-blur-md rounded-full mt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="WellZone Lanka Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-2xl font-bold">WellZone Lanka</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#services"
              className="hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="#about"
              className="hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link href="#team" className="hover:text-primary transition-colors">
              Team
            </Link>
            <Link
              href="#contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="bg-sky-500 text-white px-4 py-2 rounded-2xl hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden flex items-center ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 "
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link
              href="#services"
              className="block px-3 py-2 hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="#about"
              className="block px-3 py-2 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="#team"
              className="block px-3 py-2 hover:text-primary transition-colors"
            >
              Team
            </Link>
            <Link
              href="#contact"
              className="block px-3 py-2 hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="block px-3 py-2 bg-sky-500 text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
