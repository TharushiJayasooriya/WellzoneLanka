"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  MessageCircle, 
  User, 
  LogOut,
  Calendar,
  Phone,
  ChevronRight,
  UserPlus,
  BarChart,
  FileText,
  ChevronLeft
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const sidebarRef = useRef(null);
  const triggerRef = useRef(null);

  // Auto-hide sidebar when mouse leaves the sidebar area
  useEffect(() => {
    const handleMouseLeave = () => {
      setIsOpen(false);
    };

    if (sidebarRef.current) {
      sidebarRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (sidebarRef.current) {
        sidebarRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [sidebarRef]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target) && 
          !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Add event listener for trigger hover
  useEffect(() => {
    const handleTriggerHover = () => {
      setIsOpen(true);
    };

    if (triggerRef.current) {
      triggerRef.current.addEventListener("mouseenter", handleTriggerHover);
    }

    return () => {
      if (triggerRef.current) {
        triggerRef.current.removeEventListener("mouseenter", handleTriggerHover);
      }
    };
  }, [triggerRef]);

  // Navigate to service page with specific section
  const navigateToTrainer = () => {
    router.push('/services#Trainer');
    setIsOpen(false);
  };

  const navigateToDoctor = () => {
    router.push('/services#doctor');
    setIsOpen(false);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Main content blur overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-lg z-30 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar - moved more inside */}
      <div 
        ref={sidebarRef}
        className={`fixed top-12 left-2 h-[calc(100%-4rem)] bg-gradient-to-b from-gray-900/90 via-gray-800/90 to-gray-900/90 text-white w-64 z-40 transform transition-all duration-500 ease-in-out shadow-xl flex flex-col rounded-2xl backdrop-blur-md ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } border border-white/10`}
        style={{
          boxShadow: isOpen ? "0 10px 20px -10px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 120, 255, 0.15)" : "",
        }}
      >
        {/* Sidebar Header with 3D effect - rounded top */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <div className="absolute inset-0 bg-blue-600 opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-cyan-500/70 rounded-t-2xl"></div>
          <div className="relative p-4 z-10">
            <div className="flex items-center">
              <div className="mr-3">
                <Image 
                  src="/assets/lgo.png" 
                  alt="Logo" 
                  width={40} 
                  height={40} 
                  className="hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="text-lg font-bold tracking-tight">WellZone Lanka</div>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
        </div>

        {/* Main Menu Items - Better spacing and bigger */}
        <div className="px-4 py-4 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <NavItemBetter 
              icon={<Calendar className="h-5 w-5" />} 
              text="Book Trainer" 
              onClick={navigateToTrainer}
            />
            <NavItemBetter 
              icon={<Phone className="h-5 w-5" />} 
              text="Contact Doctor" 
              onClick={navigateToDoctor}
            />
            <NavItemBetter 
              icon={<MessageCircle className="h-5 w-5" />} 
              text="Start a Chat" 
            />
            <NavItemBetter 
              icon={<BarChart className="h-5 w-5" />} 
              text="User Progress" 
            />
            <NavItemBetter 
              icon={<FileText className="h-5 w-5" />} 
              text="User Summary" 
            />
          </div>
        </div>

        {/* User Profile with sophisticated design - rounded bottom */}
        <div className="border-t border-gray-700/30 mt-auto rounded-b-2xl backdrop-blur-sm bg-gray-800/30">          
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mr-3 shadow-lg">
                  <User className="h-5 w-5 text-white/90" />
                </div>
                <div>
                  <div className="font-medium">WellZone User</div>
                  <div className="text-xs text-blue-300">Premium Member</div>
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
                <span className="group-hover:underline text-sm">Switch Account</span>
              </div>
              
              {/* Sign Out button */}
              <div 
                className="flex items-center text-gray-400 hover:text-white cursor-pointer group transition-colors duration-200"
                onClick={() => console.log("Sign out clicked")}
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span className="group-hover:underline text-sm">Sign Out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sidebar indicator tab - Modified to use ref and detect hover */}
      <div 
        ref={triggerRef}
        className={`fixed top-1/2 left-0 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 h-24 w-6 rounded-r-lg cursor-pointer z-30 shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? "opacity-0" : "opacity-90 hover:opacity-100 hover:w-8"
        }`}
        onClick={toggleSidebar}
        style={{
          boxShadow: "0 4px 12px rgba(0, 120, 255, 0.3)",
        }}
      >
        <ChevronRight className="h-5 w-5 text-white animate-pulse" />
      </div>
    </>
  );
};

// Better Navigation Item Component
const NavItemBetter = ({ icon, text, onClick }) => {
  return (
    <div 
      className="group relative"
      onClick={onClick}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-200"></div>
      <div className="relative flex items-center p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700/50 group-hover:border-blue-500/50 cursor-pointer transition-all duration-200 hover:shadow-md">
        <div className="mr-3 text-blue-400 bg-gray-800/80 p-2 rounded-lg shadow-inner">{icon}</div>
        <div className="flex-1">
          <div className="font-medium text-white flex items-center justify-between">
            {text}
            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;