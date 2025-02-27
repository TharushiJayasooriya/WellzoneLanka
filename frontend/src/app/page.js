"use client";

import { Activity, Users, Clock, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import { Footer } from "./Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar - Kept exactly as original */}
      <Navbar/>

      {/* Improved Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
        <video 
  src="/assets/hh.mp4" 
  autoPlay 
  loop 
  muted 
  playsInline 
  className="object-cover w-full h-full absolute"
/>

          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-7xl font-bold leading-tight mb-6">
              Health And Fitness Coach
            </h1>
            <p className="text-2xl text-gray-100 mb-8">
              Welcome to WellZone Lanka, Unlock a Healthier You with AI Precision
            </p>
            <div className="flex space-x-4">
              <button className="rounded-full bg-cyan-500 text-white px-8 py-4 text-lg font-semibold hover:bg-cyan-600 transition-colors">
                Get Started
              </button>
              <button className="rounded-full bg-transparent border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-black transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Selection Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Professional Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose between our specialized services designed to provide comprehensive care for your well-being
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* GYM SECTION CARD */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl">
              <div className="h-80 relative">
                <Image
                  src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                  alt="Gym Services"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-3xl font-bold text-white mb-2">Fitness Services</h3>
                  <p className="text-gray-200">Professional training and workout plans</p>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <Activity className="h-6 w-6 text-cyan-500 mr-2" />
                    <h4 className="text-xl font-semibold text-gray-900">Personalized Training</h4>
                  </div>
                  <p className="text-gray-600 ml-8">
                    Get custom workout plans tailored to your specific fitness goals and body type
                  </p>
                </div>
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-cyan-500 mr-2" />
                    <h4 className="text-xl font-semibold text-gray-900">Group Classes</h4>
                  </div>
                  <p className="text-gray-600 ml-8">
                    Join motivating group sessions led by experienced fitness instructors
                  </p>
                </div>
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <Clock className="h-6 w-6 text-cyan-500 mr-2" />
                    <h4 className="text-xl font-semibold text-gray-900">24/7 Support</h4>
                  </div>
                  <p className="text-gray-600 ml-8">
                    Access to fitness professionals around the clock for guidance and motivation
                  </p>
                </div>
                <Link 
                  href="/gym-services" 
                  className="block w-full bg-cyan-500 text-white text-center py-4 rounded-md font-semibold hover:bg-cyan-600 transition-colors mt-6"
                >
                  Explore Fitness Services
                </Link>
              </div>
            </div>
            
            {/* DOCTOR SECTION CARD */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl">
              <div className="h-80 relative">
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
                  alt="Medical Services"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-3xl font-bold text-white mb-2">Medical Services</h3>
                  <p className="text-gray-200">Professional healthcare and wellness monitoring</p>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-xl font-semibold text-gray-900">Health Assessment</h4>
                  </div>
                  <p className="text-gray-600 ml-8">
                    Comprehensive evaluation of your current health status and risk factors
                  </p>
                </div>
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h4 className="text-xl font-semibold text-gray-900">Specialist Consultation</h4>
                  </div>
                  <p className="text-gray-600 ml-8">
                    Direct access to medical specialists for targeted healthcare needs
                  </p>
                </div>
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h4 className="text-xl font-semibold text-gray-900">Wellness Plans</h4>
                  </div>
                  <p className="text-gray-600 ml-8">
                    Personalized health maintenance programs based on your medical profile
                  </p>
                </div>
                <Link 
                  href="/medical-services" 
                  className="block w-full bg-cyan-500 text-white text-center py-4 rounded-md font-semibold hover:bg-cyan-600 transition-colors mt-6"
                >
                  Explore Medical Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Technology Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">AI-Powered Health Optimization</h2>
              <p className="text-xl mb-8 text-gray-600">
                Our advanced AI technology analyzes your health data to provide personalized recommendations and track your progress in real-time.
              </p>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-500 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Data-Driven Progress</h3>
                    <p className="mt-2 text-gray-600">Track your health metrics with precision and see real-time improvements</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-500 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Adaptive Scheduling</h3>
                    <p className="mt-2 text-gray-600">Intelligent timing of workouts and medical check-ins based on your body's response</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-500 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Personalized Optimization</h3>
                    <p className="mt-2 text-gray-600">Recommendations that evolve as your fitness level and health status improve</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a2aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="AI Technology"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Proven Results</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our clients have achieved remarkable transformations with our integrated approach to health and fitness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
              <div className="h-64 relative">
                <Image
                  src="https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80"
                  alt="Weight Loss Transformation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-5 w-5 text-cyan-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Weight Management</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  "I lost 20kg in just 3 months following their personalized program. The combination of medical oversight and fitness coaching was game-changing."
                </p>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-800 font-bold">
                      SJ
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Client since 2023</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
              <div className="h-64 relative">
                <Image
                  src="https://images.unsplash.com/photo-1579126038374-6064e9370f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Strength Training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-5 w-5 text-cyan-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Strength Building</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  "The AI coaching helped me increase my strength by 40% while ensuring I didn't aggravate my old injuries. The medical team was always available for consultation."
                </p>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-800 font-bold">
                      RP
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Raj Patel</p>
                    <p className="text-sm text-gray-500">Client since 2024</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
              <div className="h-64 relative">
                <Image
                  src="https://images.unsplash.com/photo-1493689485253-f07fcbfc731b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                  alt="Wellness Improvement"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-5 w-5 text-cyan-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Health Improvement</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  "My cholesterol and blood pressure are now at healthy levels for the first time in 10 years. The medical monitoring and fitness program worked together perfectly."
                </p>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-800 font-bold">
                      LT
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Lisa Thompson</p>
                    <p className="text-sm text-gray-500">Client since 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-cyan-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Start Your Transformation Today</h2>
          <p className="text-xl text-cyan-100 mb-10 max-w-3xl mx-auto">
            Join WellZone Lanka for a comprehensive approach to your health and fitness. Our professional team and AI technology are ready to guide you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="rounded-full bg-white text-cyan-600 px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-colors shadow-md">
            Get Started
          </button>
          <button className="rounded-full bg-transparent border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-cyan-600 transition-colors shadow-md">
            Schedule a Consultation
          </button>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}