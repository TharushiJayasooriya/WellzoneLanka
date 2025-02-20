"use client";

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Personalized Workout Plans",
              description: "AI-generated workout routines tailored to your fitness level, goals, and preferences."
            },
            {
              title: "Nutrition Guidance",
              description: "Custom meal plans and nutritional advice based on your dietary requirements and fitness objectives."
            },
            {
              title: "Progress Tracking",
              description: "Advanced analytics and progress monitoring to keep you motivated and on track."
            },
            {
              title: "Expert Consultation",
              description: "One-on-one sessions with certified fitness trainers and nutritionists."
            },
            {
              title: "Community Support",
              description: "Join a community of like-minded individuals on their fitness journey."
            },
            {
              title: "24/7 AI Assistant",
              description: "Round-the-clock support and guidance from our AI coaching system."
            }
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}