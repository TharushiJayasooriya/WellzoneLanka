"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  MessageCircle, 
  User, 
  LogOut,
  Menu,
  Calendar,
  Phone,
  ChevronRight,
  UserPlus,
  BarChart,
  FileText
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const sidebarRef = useRef(null);

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
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Navigate to service page with specific section
  const navigateToTrainer = () => {
    router.push('/services#trainer');
    setIsOpen(false);
  };

  const navigateToDoctor = () => {
    router.push('/services#doctor');
    setIsOpen(false);
  };

  return (
    <>
      {/* Main content blur overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white w-80 z-40 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header with 3D effect */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600 opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-cyan-500/80"></div>
          <div className="relative p-8 z-10">
            <div className="flex items-center mb-4">
              <div className="mr-3">
                <Image 
                  src="/assets/lgo.png" 
                  alt="Logo" 
                  width={60} 
                  height={60} 
                  className="hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="text-2xl font-bold tracking-tight">WellZone Lanka</div>
            </div>
            
          </div>
          
          {/* Decorative element */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
        </div>

        {/* Main Menu Items - Professional Design */}
        <div className="px-6 pt-6 flex-1 space-y-2">
          <NavItemPro 
            icon={<Calendar className="h-5 w-5" />} 
            text="Book Trainer" 
            description="Schedule a session with an expert"
            onClick={navigateToTrainer}
          />
          <NavItemPro 
            icon={<Phone className="h-5 w-5" />} 
            text="Contact Doctor" 
            description="Get medical advice when needed"
            onClick={navigateToDoctor}
          />
          <NavItemPro 
            icon={<MessageCircle className="h-5 w-5" />} 
            text="Start a Chat" 
            description="Talk to our wellness assistant"
          />
          <NavItemPro 
            icon={<BarChart className="h-5 w-5" />} 
            text="User Progress" 
            description="Track your wellness journey"
          />
          <NavItemPro 
            icon={<FileText className="h-5 w-5" />} 
            text="User Summary" 
            description="View your health metrics and stats"
          />
        </div>

        {/* User Profile with sophisticated design */}
        <div className="border-t border-gray-700/50 mt-auto ">          
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3 shadow-md">
                  <User className="h-5 w-5 text-white/90" />
                </div>
                <div>
                  <div className="font-medium">WellZone User</div>
                  <div className="text-sm text-blue-300">Premium Member</div>
                </div>
              </div>
            </div>
            
            {/* Account options */}
            <div className="mt-3 flex justify-between">
              {/* Switch Account button */}
              <div 
                className="flex items-center text-gray-400 hover:text-white cursor-pointer group transition-colors duration-200"
                onClick={() => console.log("Switch account clicked")}
              >
                <UserPlus className="h-4 w-4 mr-1" />
                <span className="group-hover:underline">Switch Account</span>
              </div>
              
              {/* Sign Out button */}
              <div 
                className="flex items-center text-gray-400 hover:text-white cursor-pointer group transition-colors duration-200"
                onClick={() => console.log("Sign out clicked")}
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span className="group-hover:underline">Sign Out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Corner trigger with circular design */}
      <div 
        className="fixed top-5 left-5 w-12 h-12 flex items-center justify-center z-20 cursor-pointer bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-lg" 
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6 text-white" />
      </div>
    </>
  );
};

// Professional Navigation Item Component
const NavItemPro = ({ icon, text, description, onClick }) => {
  return (
    <div 
      className="group relative"
      onClick={onClick}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-200"></div>
      <div className="relative flex items-start p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700 group-hover:border-blue-500/50 cursor-pointer transition-all duration-200">
        <div className="mr-3 text-blue-400 bg-gray-800/80 p-2 rounded-lg shadow-inner">{icon}</div>
        <div className="flex-1">
          <div className="font-medium text-white flex items-center justify-between">
            {text}
            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
          </div>
          <div className="text-sm text-gray-400 mt-1">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;