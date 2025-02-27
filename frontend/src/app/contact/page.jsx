"use client";

import { useState } from "react";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../Navbar";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      {/* Navigation Bar - Kept exactly as original */}
            <Navbar/>

      {/* Hero Section */}
      <div className="pt-20 bg-gradient-to-b from-cyan-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">Contact Us</h1>
            <p className="mt-6 max-w-xl mx-auto text-lg text-gray-600">
              We're here to answer your questions and provide the support you need on your wellness journey.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-100 text-cyan-600">
                      <Phone className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1 text-base font-medium text-gray-900">+94 77 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-100 text-cyan-600">
                      <Mail className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-base font-medium text-gray-900">info@wellzonelanka.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-100 text-cyan-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Address</h3>
                    <p className="mt-1 text-base font-medium text-gray-900">123 Fitness Avenue, Colombo, Sri Lanka</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-cyan-600 transition-colors">
                    <span className="sr-only">Instagram</span>
                    <div className="p-2 bg-gray-100 rounded-full hover:bg-cyan-50 transition-colors">
                      <Instagram className="h-6 w-6" />
                    </div>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-cyan-600 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <div className="p-2 bg-gray-100 rounded-full hover:bg-cyan-50 transition-colors">
                      <Facebook className="h-6 w-6" />
                    </div>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-cyan-600 transition-colors">
                    <span className="sr-only">YouTube</span>
                    <div className="p-2 bg-gray-100 rounded-full hover:bg-cyan-50 transition-colors">
                      <Youtube className="h-6 w-6" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl shadow-md overflow-hidden p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              <dl className="space-y-3 text-cyan-50">
                <div className="flex justify-between">
                  <dt className="font-medium">Monday - Friday</dt>
                  <dd>9:00 AM - 6:00 PM</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Saturday</dt>
                  <dd>10:00 AM - 4:00 PM</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Sunday</dt>
                  <dd>Closed</dd>
                </div>
              </dl>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="Your first name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="+94 7X XXX XXXX"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="What is your inquiry about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="Please describe how we can help you..."
                  />
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      required
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                      I agree to the <a href="#" className="text-cyan-600 hover:text-cyan-700 underline">Privacy Policy</a> and <a href="#" className="text-cyan-600 hover:text-cyan-700 underline">Terms of Service</a>
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-cyan-600 border border-transparent rounded-lg shadow-sm py-3 px-6 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
                >
                  <div className="flex items-center justify-center">
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-gray-600 mb-6">
              Visit our wellness center in the heart of Colombo for a personalized consultation.
            </p>
          </div>
          <div className="h-64 bg-gray-300 w-full">
            {/* Replace with actual map component */}
            <div className="h-full w-full flex items-center justify-center bg-cyan-50">
              <p className="text-gray-500">Interactive map would be displayed here</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Ready to Transform Your Health?
            </h2>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
              Join WellZone Lanka today and begin your journey to optimal wellness with our expert team.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link 
                href="/start" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-cyan-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Get Started
              </Link>
              <Link 
                href="/services" 
                className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-500 transition-colors"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center">
                <Image src="/assets/lgo.png" alt="WellZone Lanka Logo" width={40} height={40} />
                <span className="ml-2 text-lg font-bold text-white">WellZone Lanka</span>
              </div>
              <p className="mt-4 text-gray-400 text-sm">
                Your partner in holistic health and wellness solutions in Sri Lanka.
              </p>
            </div>
            
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Our Team</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Blog</a></li>
              </ul>
            </div>
            
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Services</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Personal Training</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Nutrition Plans</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Wellness Programs</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Corporate Wellness</a></li>
              </ul>
            </div>
            
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-400">
              &copy; {new Date().getFullYear()} WellZone Lanka. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}