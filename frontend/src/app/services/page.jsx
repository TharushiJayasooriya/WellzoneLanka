// pages/services/index.js
"use client";
import React, { useState } from 'react';
import Navbar from "../Navbar";
import Image from 'next/image';
import Link from 'next/link';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('fitness');

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
        id: 2,
        name: "Health Checkups",
        description: "Comprehensive medical examinations to assess your overall health status.",
        image: "/api/placeholder/600/400",
        features: ["Full body assessment", "Blood work", "Cardiac evaluation", "Health risk assessment"]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-cyan-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            WellZone Lanka offers comprehensive wellness solutions to help you achieve optimal health and fitness.
          </p>
        </div>

         {/* Services Display */}
         <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Choose Your Service Category</h2>
          <p className="text-lg text-gray-600">Select between fitness or medical services to explore our offerings.</p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-gray-100 rounded-full shadow-sm">
            <button
              onClick={() => setActiveTab('fitness')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'fitness' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Fitness Session
            </button>
            <button
              onClick={() => setActiveTab('medical')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'medical' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Medical Session
            </button>
          </div>
        </div>

       

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full place-items-center ml-auto">
          {services[activeTab].map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-2xl"
            >
              <div className="h-56 relative">
                <Image 
                  src={service.image} 
                  alt={service.name} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                  <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link 
                  href={`/services/${activeTab}/${service.id}`}
                  className="block w-full text-center bg-gradient-to-r px-6 from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 text-center">Find answers to common questions about our services.</p>
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

    </div>
  );
}
