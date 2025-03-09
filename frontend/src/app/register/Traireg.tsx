"use client";

import { useState, useEffect } from "react";
import { Award, Eye, EyeOff, TriangleAlert, Upload, Dumbbell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../Navbar";
import { toast } from "sonner";
import {useRouter} from "next/navigation";

export default function TrainerRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: [],
    certifications: "",
    experience: "",
    gymAffiliation: "",
    bio: ""
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of trainer-related images for the slideshow
  const images = [
    "/assets/trainer1.png",
    "/assets/trainer2.png",
    "/assets/trainer3.png",
  ];
  
  // Specialization options for trainers
  const specializationOptions = [
    "Weight Training",
    "Cardio Fitness",
    "CrossFit",
    "Yoga",
    "Pilates",
    "Nutrition",
    "Sports Performance",
    "Senior Fitness",
    "Rehabilitation"
  ];

  // Handle specialization checkbox changes
  const handleSpecializationChange = (value) => {
    if (form.specialization.includes(value)) {
      setForm({
        ...form,
        specialization: form.specialization.filter(item => item !== value)
      });
    } else {
      setForm({
        ...form,
        specialization: [...form.specialization, value]
      });
    }
  };
  
  // Set up the slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    
    return () => clearInterval(interval);
  }, []);

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

    // Validate at least one specialization is selected
    if (form.specialization.length === 0) {
      setError("Please select at least one specialization.");
      setPending(false);
      return;
    }
  
    try {
      const res = await fetch("/api/auth/trainer-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setPending(false);
        toast.success(data.message);
        router.push("../verification-pending"); // Redirect to verification pending page
      } else if (res.status === 400) {
        setError(data.message);
        setPending(false);
      } else if (res.status === 500) {
        setError(data.message);
        setPending(false);
      } else {
        setError("An unexpected error occurred.");
        setPending(false);
      }
    } catch (error) {
      setPending(false);
      setError("An error occurred while submitting the form.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-64 -left-64 w-96 h-96 bg-cyan-500 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-green-500 opacity-5 rounded-full blur-3xl"></div>
      </div>

      <Navbar/>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6" style={{paddingTop: "120px"}}>
          {/* Left Side - Image Section */}
          <div className="md:col-span-5 rounded-lg overflow-hidden shadow-xl relative">
            <div className="relative w-full" style={{ height: "680px" }}>
              {images.map((src, index) => (
                <div 
                  key={index}
                  className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                  style={{ 
                    opacity: currentImageIndex === index ? 1 : 0,
                    zIndex: currentImageIndex === index ? 10 : 0
                  }}
                >
                  <Image 
                    src={src} 
                    alt={`Trainer Image ${index + 1}`} 
                    fill
                    style={{ objectFit: "cover" }}
                    className="transform hover:scale-105 transition-transform duration-700"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              ))}
              
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <h2 className="text-white text-4xl font-bold mb-3">Join Our Trainer Team</h2>
                <p className="text-white/90 text-xl mb-4">Help clients achieve their fitness goals</p>
                
                {/* Slideshow indicators */}
                <div className="flex items-center space-x-2 mt-6">
                  {images.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentImageIndex === index ? "w-10 bg-cyan-500" : "w-3 bg-white/70"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="md:col-span-7">
            <div className="bg-white p-10 rounded-lg border border-gray-200 shadow-lg">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Trainer Registration</h1>
                  <h2 className="text-xl font-medium text-gray-600">Join the <span className="text-cyan-600 font-semibold">WellZone Lanka</span> fitness network</h2>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                  {!!error && (
                    <div className="bg-red-500 p-3 rounded-md flex items-center gap-x-2 text-sm text-white mb-6 justify-center">
                      <TriangleAlert />
                      <p>{error}</p>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="px-2 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">First Name</label>
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
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address