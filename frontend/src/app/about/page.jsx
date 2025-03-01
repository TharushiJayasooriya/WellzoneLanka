"use client";

import { ArrowRight, Heart, Brain, Activity, Users, Star } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "./Footer";


export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-96 bg-[url('/api/placeholder/1600/800')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold text-white mb-6">About WellZone Lanka</h1>
            <p className="text-xl text-white">Sri Lanka's premier AI-powered health and fitness platform</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction Section */}
        <div className="mb-16 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Redefining Wellness in Sri Lanka</h2>
            <p className="text-lg text-gray-700 mb-6">
              WellZone Lanka combines AI technology with expert guidance to provide personalized wellness solutions, making fitness accessible and affordable for everyone.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="h-64 w-64 bg-blue-100 rounded-full flex items-center justify-center">
              <Heart size={80} className="text-blue-500" />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[{ icon: <Star />, title: "Our Mission", text: "Empowering individuals with AI-driven fitness and expert guidance for a healthier Sri Lanka." },
            { icon: <Brain />, title: "Our Vision", text: "Revolutionizing fitness by making professional coaching accessible to all." }].map((item, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4 text-blue-600">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
              </div>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>

        {/* What Makes Us Different */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ icon: <Activity />, title: "AI-Powered Precision", text: "Adaptive fitness plans that evolve with you." },
              { icon: <Users />, title: "Expert Human Guidance", text: "Top fitness trainers and physiotherapists support you." },
              { icon: <Heart />, title: "Holistic Wellness Approach", text: "Complete wellness solutions tailored to Sri Lankan lifestyles." }].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-blue-600">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-50 p-10 mb-16 text-center rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Your Wellness Journey with WellZone</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["AI Assessment", "Expert Matching", "Personalized Plan", "Ongoing Support"].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-blue-600">{`0${index + 1}`}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step}</h3>
              </div>
            ))}
          </div>
        </div>

        

        {/* CTA Section */}
        <div className="bg-white p-10 text-center shadow-sm border border-gray-200 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Wellness Journey Today</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            AI-powered precision meets expert coaching. Let’s achieve your fitness goals together.
          </p>
          <div className="flex justify-center space-x-4">
         
           
          </div>
        </div>
      </div>
      <Footer />
    </div> 
  );
}
