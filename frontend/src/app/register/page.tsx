"use client";

import { useState } from "react";
import { Dumbbell, Eye, EyeOff, Facebook, Instagram, Triangle, TriangleAlert, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../Navbar";
import { toast } from "sonner";
import {useRouter} from "next/navigation"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const[form,setForm]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  })
  const[pending,setPending]=useState(false);
  const[error,setError]=useState(null);
  const router=useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    // Validate password match
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setPending(false);
      return;
    }
  
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
  
      const data = await res.json(); // Parse the response JSON
  
      if (res.ok) {
        setPending(false);
        toast.success(data.message); // Show success message
        router.push("../register"); // Redirect to sign-in page
      } else if (res.status === 400) {
        setError(data.message); // Set error message for 400 status
        setPending(false);
      } else if (res.status === 500) {
        setError(data.message); // Set error message for 500 status
        setPending(false);
      } else {
        setError("An unexpected error occurred."); // Handle other errors
        setPending(false);
      }
    } catch (error) {
      setPending(false);
      setError("An error occurred while submitting the form."); // Handle fetch errors
      console.error("Fetch error:", error);
    }
  };

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
              <h2 className="text-white text-3xl font-bold mb-2">Start Your Fitness Journey</h2>
              <p className="text-white/90 text-lg mb-4">Join our community and reach your fitness goals</p>
              <div className="flex items-center space-x-1">
                <div className="h-1 w-8 bg-cyan-500 rounded"></div>
                <div className="h-1 w-2 bg-cyan-500 rounded opacity-70"></div>
                <div className="h-1 w-2 bg-cyan-500 rounded opacity-40"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Professional Sign Up Form (7 columns) */}
          <div className="md:col-span-7">
            <div className="max-w-lg mx-auto bg-white p-10 rounded-lg border border-gray-200 shadow-lg">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Create an account</h1>
                  <h2 className="text-xl font-medium text-gray-600">Join <span className="text-cyan-600 font-semibold">WellZone Lanka</span> today</h2>
                </div>

                {/* Social Signup Buttons - Professional Design */}
                
                <div className="w-full">
                  <button className="w-full bg-white border border-gray-200 px-4 py-2.5 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
                    <span className="font-medium text-gray-600">Sign up with Google</span>
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or sign up with email</span>
                  </div>
                </div>
               
                {/* Professional Form Fields */}
                <div className="space-y-5">
                {!!error && (
                    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6 bg-red-500 justify-center">
                      <TriangleAlert />
                      <p>{error}</p>
                    </div>
                  )}
                <form onSubmit={handleSubmit} className="px-2 sm:px-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      
                        <label  className="text-sm font-medium text-gray-700 mb-1 block">First Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            disabled={pending}
                            placeholder="First name"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            value={form.firstName}
                            onChange={(e)=>setForm({...form,firstName:e.target.value})}
                            required
                          />
                        </div>
                        
                    </div>
                    
                    <div>
                    
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Last Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Last name"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          disabled={pending}
                          value={form.lastName}
                          onChange={(e)=>setForm({...form,lastName:e.target.value})}
                        />
                      </div>
                    
                    </div>
                  </div>

                  <div>
                  
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        disabled={pending}
                        value={form.email}
                        onChange={(e)=>setForm({...form,email:e.target.value})}
                      />
                    </div>
                  
                  </div>

                  <div>
                  

                    <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        disabled={pending}
                        value={form.password}
                        onChange={(e)=>setForm({...form,password:e.target.value})}
                        required
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
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
                  
                  </div>

                  <div>
                  

                    <label className="text-sm font-medium text-gray-700 mb-1 block">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        disabled={pending}
                        value={form.confirmPassword}
                        onChange={(e)=>setForm({...form,confirmPassword:e.target.value})}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 bg-gray-50 border-gray-300 rounded text-cyan-600 focus:ring-cyan-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-700">
                        I agree to the <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium">Terms of Service</a> and <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium">Privacy Policy</a>
                      </label>
                    </div>
                  </div>

                  <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-md font-medium shadow-sm hover:shadow-md transition-all"
                    disabled={pending}
                  >
                    
                    Create account
                  </button>

                  <div className="text-center">
                    <p className="text-gray-600 text-sm">
                      Already have an account? {" "}
                      <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium">
                        Sign in
                      </a>
                    </p>
                  </div>
                  
                  {/* Social Media Links */}
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-600 mb-4">Follow us on social media</p>
                    <div className="flex justify-center space-x-6">
                      <Link href="#" className="text-gray-500 hover:text-pink-600 transition-colors">
                        <Instagram className="h-6 w-6" />
                      </Link>
                      <Link href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                        <Youtube className="h-6 w-6" />
                      </Link>
                    </div>
                  </div>
                  
                </form>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}