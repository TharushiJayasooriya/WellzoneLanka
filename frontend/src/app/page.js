"use client";

import { Activity, Users, Clock, Award, ChevronRight, Heart, Brain, Zap, Star, CheckCircle, ArrowRight, Dumbbell, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import { useEffect } from "react";
import { IoIosFlash, IoIosFitness, IoIosChatbubbles, IoIosHeart } from 'react-icons/io';



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
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-in, .animate-slide-in-right, .animate-slide-in-left, .animate-scale-in, .animate-pop-in');
    
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
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-slate-900/5 shadow-lg rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-cyan-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Features Section with Staggered Pop Animation */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-base text-cyan-600 font-semibold tracking-wide uppercase animate-fade-up opacity-0"></h2>
            <p className="mt-2 text-5xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-6xl animate-fade-up opacity-0" style={{ animationDelay: '0.2s' }}>
              Why Choose WellZone Lanka
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto animate-fade-up opacity-0" style={{ animationDelay: '0.4s' }}>
              Our comprehensive approach combines cutting-edge AI technology with expert human coaching
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* Feature 1 */}
            <div className="relative p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-pop-in opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -top-4 -right-4 bg-cyan-500 rounded-full p-4">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-8">Exercise Tracking</h3>
              <p className="mt-4 text-gray-600">
              Keep track of your fitness progress with real-time updates, detailed workout logs, and performance analysis. Track your daily activities, set fitness goals, and stay motivated with personalized tips.
              </p>
              <div className="mt-6 flex items-center text-cyan-600">
               
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-pop-in opacity-0" style={{ animationDelay: '0.6s' }}>
              <div className="absolute -top-4 -right-4 bg-cyan-500 rounded-full p-4">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-8">AI Powered Exercises</h3>
              <p className="mt-4 text-gray-600">
              Experience customized workouts powered by AI that adapt to your progress and goals. Get real-time form correction, workout suggestions based on your performance data, and intelligent exercise progressions tailored to your fitness level.
              </p>
              <div className="mt-6 flex items-center text-cyan-600">
                
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-pop-in opacity-0" style={{ animationDelay: '1s' }}>
              <div className="absolute -top-4 -right-4 bg-cyan-500 rounded-full p-4">
                <IoIosChatbubbles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-8">Chat Bot</h3>
              <p className="mt-4 text-gray-600">
              Get fitness and health support anytime with our AI-powered chatbot. Get quick answers to workout questions, exercise suggestions, nutrition tips, and general wellness advice—all available 24/7 for your convenience.
              </p>
              <div className="mt-6 flex items-center text-cyan-600">
                
              </div>
            </div>

            {/* Feature 4 */}
            <div className="relative p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-pop-in opacity-0" style={{ animationDelay: '1.4s' }}>
              <div className="absolute -top-4 -right-4 bg-cyan-500 rounded-full p-4">
                <IoIosFitness className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-8">Gym Trainer Consultation</h3>
              <p className="mt-4 text-gray-600">
              Get professional fitness coaching from experienced trainers who create personalized workout plans, offer expert advice, and help keep you motivated. Whether you're just starting or you're an experienced athlete, you'll get the support you need to reach your fitness goals.
              </p>
              <div className="mt-6 flex items-center text-cyan-600">
                
              </div>
            </div>

            {/* Feature 5 */}
            <div className="relative p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-pop-in opacity-0" style={{ animationDelay: '1.8s' }}>
              <div className="absolute -top-4 -right-4 bg-cyan-500 rounded-full p-4">
                <IoIosHeart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-8">Physiotherapist Consultation</h3>
              <p className="mt-4 text-gray-600">
              Get expert advice from certified physiotherapists to prevent injuries, recover properly, and improve movement. Book online consultations and receive personalized therapy plans to support your health.
              </p>
              <div className="mt-6 flex items-center text-cyan-600">

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-cyan-600 font-semibold tracking-wide uppercase animate-fade-up opacity-0"></h2>
            <p className="mt-2 text-5xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-6xl animate-fade-up opacity-0" style={{ animationDelay: '0.2s' }}>
              Success Stories
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto animate-fade-up opacity-0" style={{ animationDelay: '0.4s' }}>
              Hear from our clients who have transformed their lives with WellZone Lanka
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-left opacity-0">
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                  <Image src="/assets/AI 1.png" alt="Client" width={64} height={64} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Bihandu Methsilu</h3>
                  <p className="text-gray-600">Lost 25kg in 6 months</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic">
              "WellZone Lanka changed how I do fitness. The AI gave great advice, and my coach kept me motivated."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-up opacity-0" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                  <Image src="/assets/AI 2.png" alt="Client" width={64} height={64} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Dineth Jayasuriya</h3>
                  <p className="text-gray-600">Gained 10kg muscle mass</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic">
              "I had a hard time gaining weight, but the custom nutrition plan changed everything. The coaches knew my goals and helped me succeed."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-right opacity-0">
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                  <Image src="/assets/AI 3.png" alt="Client" width={64} height={64} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Lushy Jay</h3>
                  <p className="text-gray-600">Improved overall wellness</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic">
              "WellZone Lanka not only improved my fitness but also helped me sleep better and feel less stressed. Their complete approach really improved my well-being."
              </p>
            </div>
          </div>
        </div>
      </div>

      

      {/* How It Works Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-cyan-600 font-semibold tracking-wide uppercase animate-fade-up opacity-0">Process</h2>
            <p className="mt-2 text-5xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-6xl animate-fade-up opacity-0" style={{ animationDelay: '0.2s' }}>
              How It Works
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto animate-fade-up opacity-0" style={{ animationDelay: '0.4s' }}>
              Our simple 4-step process to transform your health and fitness
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-cyan-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-16">
              {/* Step 1 */}
              <div className="relative">
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 animate-slide-in-left opacity-0">
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                      <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 mb-4">
                        <span className="text-xl font-bold">1</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Initial Assessment</h3>
                      <p className="text-gray-600">
                        Complete our comprehensive assessment that analyzes your current fitness level, health history, goals, and preferences. Our AI system processes this data to create your baseline.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="h-12 w-12 rounded-full bg-cyan-500 border-4 border-white shadow-lg flex items-center justify-center">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <Image 
                      src="/assets/hm1.png" 
                      alt="Initial Assessment" 
                      width={400} 
                      height={100} 
                      className="rounded-xl shadow-lg animate-slide-in-right opacity-0"
                    />
                  </div>
                </div>
              </div>

             {/* Step 2 */}
<div className="relative">
  <div className="md:flex items-center">
    <div className="md:w-1/2 md:pl-12">
      <Image 
        src="/assets/hm2.png" 
        alt="Personalized Plan Creation" 
        width={600} 
        height={400} 
        className="rounded-xl shadow-lg animate-slide-in-left opacity-0"
      />
    </div>
    <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 animate-slide-in-right opacity-0">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 mb-4">
          <span className="text-xl font-bold">2</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Plan Creation</h3>
        <p className="text-gray-600">
          Our AI technology and expert coaches collaborate to design your custom fitness and nutrition plan. Every aspect is tailored to your unique needs and goals.
        </p>
      </div>
    </div>
    <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="h-12 w-12 rounded-full bg-cyan-500 border-4 border-white shadow-lg flex items-center justify-center">
        <Brain className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
</div>


              {/* Step 3 */}
              <div className="relative">
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 animate-slide-in-left opacity-0">
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                      <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 mb-4">
                        <span className="text-xl font-bold">3</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Implementation & Coaching</h3>
                      <p className="text-gray-600">
                        Begin your program with ongoing support from your dedicated coach. Track your progress through our app while receiving real-time feedback and adjustments.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="h-12 w-12 rounded-full bg-cyan-500 border-4 border-white shadow-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <Image 
                      src="/assets/hm3.png" 
                      alt="Implementation & Coaching" 
                      width={600} 
                      height={400} 
                      className="rounded-xl shadow-lg animate-slide-in-right opacity-0"
                    />
                  </div>
                </div>
              </div>

              
              {/* Step 4 */}
<div className="relative">
  <div className="md:flex items-center">
    <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 md:order-last animate-slide-in-right opacity-0">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 mb-4">
          <span className="text-xl font-bold">4</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Continuous Optimization</h3>
        <p className="text-gray-600">
          As you progress, our AI system continuously analyzes your results and adapts your plan for optimal results. Regular check-ins with your coach ensure you stay on track.
        </p>
      </div>
    </div>
    <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="h-12 w-12 rounded-full bg-cyan-500 border-4 border-white shadow-lg flex items-center justify-center">
        <Zap className="h-6 w-6 text-white" />
      </div>
    </div>
    <div className="md:w-1/2 md:pl-8 md:ml-0"> {/* Reduced padding and margin */}
      <Image 
        src="/assets/hm4.png"
        alt="Continuous Optimization" 
        width={600} 
        height={400} 
        className="rounded-xl shadow-lg animate-slide-in-left opacity-0"
      />
    </div>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>

    
           

      {/* Call to Action - Enhanced with pulse and staggered animations */}
      <div className="bg-cyan-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-up opacity-0">
            <span className="relative inline-block">
              Start Your Transformation Today
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-white rounded animate-pulse-width"></span>
            </span>
          </h2>
          <p className="text-xl text-cyan-100 mb-10 max-w-3xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: '0.2s' }}>
            Join WellZone Lanka for a comprehensive approach to your health and fitness. Our professional team and AI technology are ready to guide you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="rounded-full bg-white text-cyan-600 px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-colors shadow-md animate-pop-in opacity-0" style={{ animationDelay: '0.4s' }}>
              <span className="flex items-center justify-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 animate-slide-right" />
              </span>
           </button>
           <button 
  className="rounded-full bg-transparent border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-cyan-600 transition-colors shadow-md animate-pop-in opacity-0" 
  style={{ animationDelay: '0.7s' }}
  onClick={() => window.location.href = '/services'}
>
  <span className="flex items-center justify-center">
    Schedule a Consultation
    <Calendar className="ml-2 h-5 w-5 animate-slide-right" />
  </span>
</button>
          </div>
        </div>
      </div>

      <Footer/>

      {/* Add CSS for animations */}
      <style jsx global>{`
        /* Base animation styles */
        .animate-fade-up, .animate-fade-in, .animate-slide-in-right, .animate-slide-in-left, .animate-scale-in, .animate-pop-in {
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
        
        /* Pop-in animation for features */
        .animate-pop-in {
          transform: scale(0.6);
        }
        
        .animate-pop-in.animate-in {
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
        
        /* Pulse animation for CTA heading underline */
        @keyframes pulseWidth {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .animate-pulse-width {
          animation: pulseWidth 1.5s ease-in-out forwards;
        }
        
        /* Slide animation for button icons */
        @keyframes slideRight {
          0% { transform: translateX(-10px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        .animate-slide-right {
          animation: slideRight 0.5s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}