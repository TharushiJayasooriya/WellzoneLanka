"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Activity, 
  MessageCircle, 
  Settings, 
  HelpCircle, 
  User, 
  LogOut,
  Search
} from "lucide-react";
import { IoIosFitness, IoIosHeart } from 'react-icons/io';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [recentPages, setRecentPages] = useState([
    "Create Exercise Plan",
    "Book Trainer",
    "Health Progress",
    "Nutrition"
  ]);

  // Handle mouse position to open sidebar when cursor is in the corner
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Check if mouse is in the top-left corner (within 50px)
      if (e.clientX <= 50 && e.clientY <= 50) {
        setIsOpen(true);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("wellzone-sidebar");
      if (isOpen && sidebar && !sidebar.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Main content blur overlay */}
      <div 
        className={`fixed inset-0 bg-white/50 backdrop-blur-sm z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div 
        id="wellzone-sidebar"
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 z-40 transform transition-transform duration-300 ease-in-out shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Welcome Banner */}
        <div className="p-4 bg-gradient-to-r from-cyan-600 to-blue-700">
          <div className="text-xl font-bold">Hi, Welcome to WellZone!</div>
          <div className="text-sm opacity-80">Your personal wellness companion</div>
        </div>

        {/* Logo */}
        <div className="p-4 flex items-center">
          <div className="text-xl font-bold text-cyan-400">WellZone Lanka</div>
        </div>

        {/* New Chat Button */}
        <div className="px-4 mb-4">
          <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white rounded-md py-2 px-4 flex items-center justify-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            <span>Start new chat</span>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-800 text-white rounded-md py-2 px-4 pl-10"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Recent Pages */}
        <div className="px-4 mb-4">
          <h3 className="text-gray-400 font-medium mb-2">Your Activities</h3>
          <div className="space-y-1">
            {recentPages.map((page, index) => (
              <Link href="#" key={index}>
                <div className="py-2 px-2 hover:bg-gray-800 rounded cursor-pointer">
                  {page}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 my-4"></div>

        {/* Main Menu Items - Simplified */}
        <div className="px-4">
          <NavItem icon={<Activity className="h-5 w-5" />} text="Exercise" />
          <NavItem icon={<IoIosFitness className="h-5 w-5" />} text="Workouts" />
          <NavItem icon={<IoIosHeart className="h-5 w-5" />} text="Health" />
          <NavItem icon={<Settings className="h-5 w-5" />} text="Settings" />
          <NavItem icon={<HelpCircle className="h-5 w-5" />} text="Help" />
          <NavItem icon={<LogOut className="h-5 w-5" />} text="Sign Out" />
        </div>

        {/* User Profile */}
        <div className="border-t border-gray-700 mt-4 pt-4 px-4 pb-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-cyan-600 flex items-center justify-center mr-3">
              <User className="h-6 w-6" />
            </div>
            <div>
              <div className="font-medium">WellZone User</div>
              <div className="text-sm text-gray-400">Premium</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Corner trigger indicator with hamburger icon */}
<div className="fixed top-5 left-0 w-12 h-12 flex items-center justify-center z-20 cursor-pointer" onClick={() => setIsOpen(true)}>
  <div className="flex flex-col space-y-1">
    <div className="w-6 h-0.5 bg-white rounded-full shadow-sm"></div>
    <div className="w-6 h-0.5 bg-white rounded-full shadow-sm"></div>
    <div className="w-6 h-0.5 bg-white rounded-full shadow-sm"></div>
  </div>
</div>
    </>
  );
};

// Navigation Item Component - Simplified
const NavItem = ({ icon, text, onClick }) => {
  return (
    <div 
      className="flex items-center py-2 px-2 rounded-md hover:bg-gray-800 cursor-pointer"
      onClick={onClick}
    >
      <div className="mr-3 text-gray-400">{icon}</div>
      <span>{text}</span>
    </div>
  );
};

export default Sidebar;