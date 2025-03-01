"use client";

import { Activity, Users, Clock, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import { useEffect } from "react";

export default function Home() {
  // Function to handle scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-in, .animate-slide-in-right, .animate-slide-in-left, .animate-scale-in');
    
    animatedElements.forEach(el => {
      observer.observe(el);
    });

    return () => {
      if (observer) {
        animatedElements.forEach(el => {
          observer.unobserve(el);
        });
      }
    };
  }, []);

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
            <h1 className="text-7xl font-bold leading-tight mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
              Health And Fitness Coach
            </h1>
            <p className="text-2xl text-gray-100 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
              Welcome to WellZone Lanka, Unlock a Healthier You with AI Precision
            </p>
            <div className="flex space-x-4 animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
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
      <div className="bg-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-up opacity-0">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Professional Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose between our specialized services designed to provide comprehensive care for your well-being
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* GYM SECTION CARD */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl animate-slide-in-left opacity-0" style={{ animationDelay: '0.2s' }}>
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
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl animate-slide-in-right opacity-0" style={{ animationDelay: '0.4s' }}>
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
      <div className="bg-gray-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12 animate-slide-in-left opacity-0">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">AI-Powered Health Optimization</h2>
              <p className="text-xl mb-8 text-gray-600">
                Our advanced AI technology analyzes your health data to provide personalized recommendations and track your progress in real-time.
              </p>
              <div className="space-y-6">
                <div className="flex animate-fade-up opacity-0" style={{ animationDelay: '0.3s' }}>
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

                <div className="flex animate-fade-up opacity-0" style={{ animationDelay: '0.5s' }}>
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

                <div className="flex animate-fade-up opacity-0" style={{ animationDelay: '0.7s' }}>
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
            <div className="md:w-1/2 animate-slide-in-right opacity-0">
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

      {/* Health Journey Roadmap - Replacement for Proven Results section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-up opacity-0">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Your Health Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A clear path to achieving your health and fitness goals with our comprehensive support system
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline connector */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-cyan-200 transform -translate-x-1/2"></div>
            
            {/* Timeline steps */}
            <div className="space-y-16">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 pr-8 md:text-right mb-8 md:mb-0 animate-slide-in-left opacity-0">
                  <div className="bg-gray-50 p-6 rounded-xl shadow-lg inline-block">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Initial Assessment</h3>
                    <p className="text-gray-600">
                      Our experts conduct a comprehensive evaluation of your current health, fitness level, and goals to create your personalized plan.
                    </p>
                  </div>
                </div>
                <div className="z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500 text-white font-bold border-4 border-white shadow-xl">
                  1
                </div>
                <div className="md:w-1/2 pl-8 hidden md:block"></div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 pr-8 hidden md:block"></div>
                <div className="z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500 text-white font-bold border-4 border-white shadow-xl">
                  2
                </div>
                <div className="md:w-1/2 pl-8 md:text-left mb-8 md:mb-0 animate-slide-in-right opacity-0">
                  <div className="bg-gray-50 p-6 rounded-xl shadow-lg inline-block">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">2. Customized Program Development</h3>
                    <p className="text-gray-600">
                      Our AI technology creates a tailored program that combines fitness training and health monitoring for optimal results.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 pr-8 md:text-right mb-8 md:mb-0 animate-slide-in-left opacity-0">
                  <div className="bg-gray-50 p-6 rounded-xl shadow-lg inline-block">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Guided Implementation</h3>
                    <p className="text-gray-600">
                      Work with our fitness coaches and health professionals who guide you through every step of your program with hands-on support.
                    </p>
                  </div>
                </div>
                <div className="z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500 text-white font-bold border-4 border-white shadow-xl">
                  3
                </div>
                <div className="md:w-1/2 pl-8 hidden md:block"></div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 pr-8 hidden md:block"></div>
                <div className="z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500 text-white font-bold border-4 border-white shadow-xl">
                  4
                </div>
                <div className="md:w-1/2 pl-8 md:text-left mb-8 md:mb-0 animate-slide-in-right opacity-0">
                  <div className="bg-gray-50 p-6 rounded-xl shadow-lg inline-block">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">4. Real-time Monitoring & Adjustment</h3>
                    <p className="text-gray-600">
                      Our AI continuously tracks your progress and automatically adjusts your program based on your performance and feedback.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 pr-8 md:text-right mb-8 md:mb-0 animate-slide-in-left opacity-0">
                  <div className="bg-gray-50 p-6 rounded-xl shadow-lg inline-block">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">5. Sustainable Results</h3>
                    <p className="text-gray-600">
                      Achieve your goals and maintain your results with ongoing support and lifestyle integration strategies for long-term success.
                    </p>
                  </div>
                </div>
                <div className="z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500 text-white font-bold border-4 border-white shadow-xl">
                  5
                </div>
                <div className="md:w-1/2 pl-8 hidden md:block"></div>
              </div>
            </div>
            
            {/* Call to action button at the end of timeline */}
            <div className="text-center mt-16 animate-fade-up opacity-0">
              <button className="rounded-full bg-cyan-500 text-white px-8 py-4 text-lg font-semibold hover:bg-cyan-600 transition-colors shadow-lg">
                Start Your Journey Today
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-cyan-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-up opacity-0">Start Your Transformation Today</h2>
          <p className="text-xl text-cyan-100 mb-10 max-w-3xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: '0.2s' }}>
            Join WellZone Lanka for a comprehensive approach to your health and fitness. Our professional team and AI technology are ready to guide you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-up opacity-0" style={{ animationDelay: '0.4s' }}>
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

      {/* Add CSS for animations */}
      <style jsx global>{`
        /* Base animation styles */
        .animate-fade-up, .animate-fade-in, .animate-slide-in-right, .animate-slide-in-left, .animate-scale-in {
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
        }
        
        /* Animation classes when elements come into view */
        .animate-fade-up.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animate-fade-in.animate-in {
          opacity: 1;
        }
        
        .animate-slide-in-right.animate-in {
          opacity: 1;
          transform: translateX(0);
        }
        
        .animate-slide-in-left.animate-in {
          opacity: 1;
          transform: translateX(0);
        }
        
        .animate-scale-in.animate-in {
          opacity: 1;
          transform: scale(1);
        }
        
        /* Initial states */
        .animate-fade-up {
          transform: translateY(40px);
        }
        
        .animate-slide-in-right {
          transform: translateX(80px);
        }
        
        .animate-slide-in-left {
          transform: translateX(-80px);
        }
        
        .animate-scale-in {
          transform: scale(0.9);
        }
      `}</style>
    </div>
  );
}