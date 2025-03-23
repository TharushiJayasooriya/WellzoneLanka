"use client";

export default function Start() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Start Your Fitness Journey</h1>
          <p className="text-xl text-gray-600">Choose a plan that works best for you</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Basic",
              price: "Free",
              features: [
                "AI-generated workout plans",
                "Basic progress tracking",
                "Community access",
                "Limited AI assistance"
              ]
            },
            {
              name: "Pro",
              price: "$9.99/month",
              features: [
                "Everything in Basic",
                "Personalized nutrition plans",
                "Advanced progress analytics",
                "24/7 AI coaching",
                "Priority support"
              ]
            },
            {
              name: "Elite",
              price: "$19.99/month",
              features: [
                "Everything in Pro",
                "1-on-1 expert consultations",
                "Custom meal plans",
                "Premium content access",
                "Personal training sessions"
              ]
            }
          ].map((plan, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="h-5 w-5 text-cyan-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-cyan-500 text-white px-6 py-3 rounded-md hover:bg-cyan-600 transition-colors">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}