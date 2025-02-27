"use client";

import { ArrowRight, Heart, Brain, Activity, Users, Star } from "lucide-react";
import Navbar from "../Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>

      {/* Hero Section */}
      <div className="relative w-full h-96">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1600/800')] bg-cover bg-center"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="text-5xl font-bold text-white mb-6">About WellZone Lanka</h1>
            <p className="text-xl text-white">
              Sri Lanka's premier AI-powered health and fitness platform
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Redefining Wellness in Sri Lanka
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                WellZone Lanka is your premier AI-powered health and fitness platform, dedicated to transforming lives through personalized wellness solutions. We combine cutting-edge AI technology with expert human guidance to create a revolutionary approach to fitness.
              </p>
              <p className="text-lg text-gray-700">
                Our team of certified fitness experts and physiotherapists works alongside our advanced AI to create customized plans that evolve with you, making professional-grade fitness coaching accessible and affordable for everyone in Sri Lanka.
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="relative h-64 w-64 mx-auto">
                <div className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart size={80} className="text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Star className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-700">
              To empower individuals on their journey to better health by combining cutting-edge AI technology with expert human guidance. We strive to make professional-grade fitness coaching accessible to everyone in Sri Lanka, regardless of their fitness level or experience.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Brain className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-700">
              To revolutionize the fitness industry in Sri Lanka by making professional-grade fitness coaching accessible to everyone. We envision a healthier nation where personalized fitness guidance is not a luxury but a fundamental right for everyone, regardless of their background.
            </p>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity className="h-8 w-8 text-blue-600" />,
                title: "AI-Powered Precision",
                description: "Our proprietary algorithms adapt to your progress, preferences, and feedback in real-time to deliver truly personalized fitness experiences."
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Expert Human Guidance",
                description: "Access to Sri Lanka's top fitness trainers and physiotherapists who work alongside our AI to provide nuanced coaching and support."
              },
              {
                icon: <Heart className="h-8 w-8 text-blue-600" />,
                title: "Holistic Wellness Approach",
                description: "We focus on complete wellness—physical fitness, nutrition, mental health, and recovery optimization tailored to Sri Lankan lifestyles."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-50 rounded-lg p-10 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Your Wellness Journey with WellZone</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "AI Assessment",
                description: "Our AI analyzes your goals, fitness level, and preferences to create your profile."
              },
              {
                step: "02",
                title: "Expert Matching",
                description: "Connect with fitness trainers or physiotherapists who specialize in your needs."
              },
              {
                step: "03",
                title: "Personalized Plan",
                description: "Receive a custom fitness plan that adapts as you progress toward your goals."
              },
              {
                step: "04",
                title: "Ongoing Support",
                description: "Get continuous guidance from both AI and human experts throughout your journey."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mb-16 bg-blue-50 rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl italic text-gray-700 mb-6">
              "WellZone Lanka completely transformed my approach to fitness. The AI understands my body's responses better than I do, and the human coaches provide the motivation I need exactly when I need it."
            </p>
            <p className="font-semibold text-gray-900">Dinesh J. — Lost 18kg in 6 months</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg p-10 text-center shadow-sm border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Wellness Journey Today</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Experience the perfect blend of AI technology and human expertise tailored to your unique fitness goals.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-black text-white px-8 py-3 rounded-md font-medium flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="bg-white text-black px-8 py-3 rounded-md font-medium border border-black">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}