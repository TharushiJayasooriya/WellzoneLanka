"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Activity, 
  Users, 
  MessageCircle, 
  Award, 
  Settings, 
  HelpCircle, 
  CreditCard, 
  User, 
  LogOut,
  PlusCircle,
  Calendar,
  Heart,
  Search
} from "lucide-react";
import { IoIosFitness, IoIosHeart } from 'react-icons/io';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [searchValue, setSearchValue] = useState("");
  const [recentPages, setRecentPages] = useState([
    "Create Exercise Plan",
    "Book Trainer Consultation",
    "View Health Progress",
    "Nutrition Calculator",
    "Wellness Assessment"
  ]);

  // Close sidebar when clicking outside (for mobile)
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
  }, [isOpen, setIsOpen]);

  return (
    <div className="Z-50">
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        id="wellzone-sidebar"
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center">
          <div className="text-2xl font-bold text-cyan-400">WellZone Lanka</div>
        </div>

        {/* New Chat Button */}
        <div className="px-4 mb-4">
          <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white rounded-md py-2 px-4 flex items-center justify-center transition-colors">
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
                <div className="py-2 px-2 hover:bg-gray-800 rounded cursor-pointer transition-colors">
                  {page}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 my-4"></div>

        {/* Main Menu Items */}
        <div className="px-4">
          <NavItem icon={<Activity className="h-5 w-5" />} text="Exercise Tracking" />
          <NavItem icon={<IoIosFitness className="h-5 w-5" />} text="Workouts" />
          <NavItem icon={<IoIosHeart className="h-5 w-5" />} text="Health Stats" />
          <NavItem icon={<Calendar className="h-5 w-5" />} text="Appointments" />
          <NavItem icon={<Award className="h-5 w-5" />} text="Achievements" />
          <NavItem icon={<Users className="h-5 w-5" />} text="Community" />
        </div>

        <div className="border-t border-gray-700 my-4"></div>

        {/* Bottom Menu */}
        <div className="px-4 mt-auto">
          <NavItem icon={<Settings className="h-5 w-5" />} text="Settings" />
          <NavItem icon={<HelpCircle className="h-5 w-5" />} text="Help Center" /> 
          <NavItem icon={<CreditCard className="h-5 w-5" />} text="My Subscription" />
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
              <div className="text-sm text-gray-400">Premium Plan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ icon, text, onClick }) => {
  return (
    <div 
      className="flex items-center py-2 px-2 rounded-md hover:bg-gray-800 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="mr-3 text-gray-400">{icon}</div>
      <span>{text}</span>
    </div>
  );
};

export default Sidebar;