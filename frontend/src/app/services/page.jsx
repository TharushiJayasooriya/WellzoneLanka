"use client";
import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from "../Footer";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('fitness');
  const [isVisible, setIsVisible] = useState({});

  // Setup intersection observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Modified services object - removed Group Fitness Classes and Physiotherapy
  const services = {
    fitness: [
      {
        id: 1,
        name: "Personal Training",
        description: "One-on-one fitness coaching tailored to your specific goals and needs.",
        image: "/api/placeholder/600/400",
        features: ["Custom workout plans", "Nutritional guidance", "Progress tracking", "Flexibility training"]
      }
    ],
    medical: [
      {
        id: 3,
        name: "Health Checkups",
        description: "Comprehensive medical examinations to assess your overall health status.",
        image: "/api/placeholder/600/400",
        features: ["Full body assessment", "Blood work", "Cardiac evaluation", "Health risk assessment"]
      }
    ]
  };

  // Function to handle service selection
  const handleServiceSelection = () => {
    // Scroll to services section and set the activeTab
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-cyan-50 overflow-x-hidden">
      <style jsx global>{`
        /* Animation keyframes */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulse {
          0% { transform: translateY(0); }
          50% { transform: translateY(10px); }
          100% { transform: translateY(0); }
        }
        
        /* Animation classes */
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .slide-up {
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-visible {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-visible.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .stagger-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        
        .stagger-container.visible .stagger-item:nth-child(1) {
          transition-delay: 0s;
        }
        
        .stagger-container.visible .stagger-item:nth-child(2) {
          transition-delay: 0.1s;
        }
        
        .stagger-container.visible .stagger-item:nth-child(3) {
          transition-delay: 0.2s;
        }
        
        .stagger-container.visible .stagger-item:nth-child(4) {
          transition-delay: 0.3s;
        }
        
        .stagger-container.visible .stagger-item {
          opacity: 1;
          transform: translateY(0);
        }
        
        .pulse-animation {
          animation: pulse 2s infinite ease-in-out;
        }
        
        .hover-scale {
          transition: transform 0.3s ease-out;
        }
        
        .hover-scale:hover {
          transform: scale(1.03);
        }
        
        .service-card {
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        }
        
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .service-image {
          transition: transform 0.5s ease-out;
        }
        
        .service-card:hover .service-image {
          transform: scale(1.05);
        }
      `}</style>
      
      <Navbar />
      
      {/* Hero Section with Background Video */}
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black/40 z-10"></div>
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/videos/wellness-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto slide-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Your Journey to Wellness Starts Here
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md max-w-3xl mx-auto">
              WellZone Lanka offers comprehensive wellness solutions to help you achieve optimal health and fitness.
            </p>
            <a href="#services" 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full font-medium text-lg inline-block hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover-scale"
            >
              Explore Our Services
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center">
          <a href="#services" className="text-white pulse-animation">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </div>
      </div>
      
      {/* Services Section */}
      <div id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div 
          id="services-heading" 
          className="text-center mb-16 animate-on-scroll animate-visible"
          style={{ opacity: isVisible['services-heading'] ? 1 : 0, transform: isVisible['services-heading'] ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our range of premium services designed to enhance your wellbeing.
          </p>
        </div>

{/* Services Showcase Image */}
<div 
  id="services-showcase" 
  className="mt-10 mb-16 animate-on-scroll animate-visible rounded-2xl overflow-hidden shadow-xl"
  style={{ opacity: isVisible['services-showcase'] ? 1 : 0, transform: isVisible['services-showcase'] ? 'translateY(0)' : 'translateY(20px)' }}
>
  <div className="relative w-full h-96">
    <Image
      src="/api/placeholder/1200/800"
      alt="WellZone Services Showcase"
      fill
      className="object-cover hover-scale"
      style={{ transition: 'transform 0.6s ease-out' }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
      <div className="p-8 text-white">
        <h3 className="text-3xl font-bold mb-2">Transform Your Life</h3>
        <p className="text-xl">Expert guidance for your wellness journey</p>
      </div>
    </div>
  </div>
</div>


        
      {/* FAQ Section */}
<div className="mt-20">
  <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Frequently Asked Questions</h2>
  <div className="max-w-3xl mx-auto">
    {[
      {
        question: "How do I know which service is right for me?",
        answer: "Our team offers free consultations to assess your needs and goals. We'll recommend the most suitable services based on your individual requirements."
      },
      {
        question: "Can I combine fitness and medical services?",
        answer: "Absolutely! In fact, we encourage a holistic approach to wellness. Many of our members benefit from both our fitness programs and medical services."
      },
      {
        question: "What qualifications do your trainers and medical staff have?",
        answer: "All our fitness trainers are certified professionals with extensive experience. Our medical staff includes licensed physicians, physiotherapists, and health counselors."
      },
      {
        question: "Do you offer any packages or membership options?",
        answer: "Yes, we offer various membership tiers and packages that provide access to multiple services at discounted rates. Contact us for more details."
      }
    ].map((faq, index) => (
      <div key={index} className="mb-6 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{faq.question}</h3>
        <p className="text-gray-600">{faq.answer}</p>
      </div>
    ))}
  </div>
</div>

                  {/* Call to Action - Changed text and link */}
                  <div 
          id="cta-section"
          className="mt-24 text-center animate-on-scroll animate-visible"
          style={{ opacity: isVisible['cta-section'] ? 1 : 0, transform: isVisible['cta-section'] ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Transform Your Wellness Journey?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Join WellZone Lanka today and take the first step towards a healthier, more balanced life.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => {
                setActiveTab('fitness');
                handleServiceSelection();
              }}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-10 py-4 rounded-full font-medium text-lg inline-block hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover-scale"
            >
              Start Your Fitness Journey
            </button>
            <button 
              onClick={() => {
                setActiveTab('medical');
                handleServiceSelection();
              }}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-10 py-4 rounded-full font-medium text-lg inline-block hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover-scale"
            >
              Explore Health Checkups
            </button>
          </div>
        </div>
     
      </div>
      <Footer />
    </div>
  );
}