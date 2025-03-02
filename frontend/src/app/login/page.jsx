"use client";

import { useState } from "react";
import { Dumbbell, Eye, EyeOff, Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../Navbar";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-64 -left-64 w-96 h-96 bg-teal-500 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>
      </div>

      <Navbar/>

      {/* Main Content - Professional Layout */}
      <div className="relative z-10 max-w-7xl mx-auto pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6" style={{paddingTop: "120px"}}>
          {/* Left Side - Professional Image Section (5 columns) */}
          <div className="md:col-span-5 rounded-lg overflow-hidden shadow-xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <Image 
              src="https://lafayettefamilyymca.org/wp-content/uploads/2023/02/190936627_m.jpg" 
              alt="Professional Fitness Experience" 
              width={1000} 
              height={1000}
              className="object-cover t"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="text-white text-3xl font-bold mb-2">Elevate Your Fitness</h2>
              <p className="text-white/90 text-lg mb-4">Professional training programs tailored to your goals</p>
              <div className="flex items-center space-x-1">
                <div className="h-1 w-8 bg-cyan-500 rounded"></div>
                <div className="h-1 w-2 bg-cyan-500 rounded opacity-70"></div>
                <div className="h-1 w-2 bg-cyan-500 rounded opacity-40"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Professional Sign In Form (7 columns) */}
          <div className="md:col-span-7">
            <div className="max-w-lg mx-auto bg-white p-10 rounded-lg border border-gray-200 shadow-lg">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Welcome back</h1>
                  <h2 className="text-xl font-medium text-gray-600">Sign in to <span className="text-cyan-600 font-semibold">WellZone Lanka</span></h2>
                </div>

                {/* Social Login Buttons - Professional Design */}
                <div className="w-full">
                  <button className="w-full bg-white border border-gray-200 px-4 py-2.5 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
                    <span className="font-medium text-gray-600">Google</span>
                  </button>
                  
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or continue with email</span>
                  </div>
                </div>

                {/* Professional Form Fields */}
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Email or Username</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your email or username"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 bg-gray-50 border-gray-300 rounded text-cyan-600 focus:ring-cyan-500"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
                      Forgot Password?
                    </a>
                  </div>

                  <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-md font-medium shadow-sm hover:shadow-md transition-all">
                    Sign in to account
                  </button>

                  <div className="text-center">
                    <p className="text-gray-600 text-sm">
                      No Account? {" "}
                      <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium">
                        Create an account
                      </a>
                    </p>
                  </div>
                  
                {/* Added Social Media Links */}
<div className="pt-6 border-t border-gray-200">
  <p className="text-center text-sm text-gray-600 mb-4">Follow us on social media</p>
  <div className="flex justify-center space-x-6">
    
    {/* Instagram Logo */}
    <Link href="https://www.instagram.com" target="_blank">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
        alt="Instagram"
        className="h-8 w-8 transition-transform transform hover:scale-110"
      />
    </Link>

    {/* YouTube Logo */}
    <Link href="https://www.youtube.com" target="_blank">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
        alt="YouTube"
        className="h-8 w-auto transition-transform transform hover:scale-110"
      />
    </Link>
    
  </div>
</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}