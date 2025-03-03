"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Calendar, Video, Star, Bot, Play } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
        <Navbar/>
        
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Your Journey to
              <span className="block text-sky-500">Physical Wellness</span>
              Starts Here
            </h1>
            <p className="text-gray-600 text-lg max-w-xl">
              Connect with Sri Lanka's leading physiotherapists and wellness experts for personalized care and treatment that transforms lives.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/register">
                <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 text-lg">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="text-gray-700 hover:text-sky-600 px-8 py-6 text-lg border-2">
                <Play className="mr-2 h-5 w-5" />
                How it works
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[600px] w-full " >
              <Image
                src="./images/aboutpage.png"
                alt="Telemedicine Physical Therapy"
                fill
                className="object-cover rounded-2xl shadow-2xl bg-gradient-to-b from-white"
                priority
              />
            </div>
            <div className="absolute -z-10 top-1/2 right-0 transform -translate-y-1/2">
              <div className="h-80 w-80 bg-sky-200/50 rounded-full blur-3xl"></div>
            </div>
            <div className="absolute -z-10 bottom-0 left-0">
              <div className="h-60 w-60 bg-blue-100/50 rounded-full blur-3xl"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12 text-gray-900"
          >
            Why Choose Wellzone Lanka
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Heart className="h-10 w-10" />}
              title="Specialized Care"
              description="Access to qualified physiotherapists and wellness experts"
              delay={0.2}
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10" />}
              title="Easy Scheduling"
              description="Book appointments with your preferred healthcare provider"
              delay={0.3}
            />
            <FeatureCard
              icon={<Video className="h-10 w-10" />}
              title="Virtual Sessions"
              description="Connect with doctors through video consultations"
              delay={0.4}
            />
          </div>
        </div>
        <div className="absolute -z-10 top-1/2 left-1/4 transform -translate-y-1/2">
          <div className="h-96 w-96 bg-sky-100/80 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative overflow-hidden bg-white">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12 text-gray-900"
          >
            What Our Patients Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
              name="Esala Gamage"
              text="The physiotherapy services at Wellzone Lanka have been transformative. I've seen significant improvement in my recovery."
              delay={0.1}
            />
            <TestimonialCard
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
              name="Anjana Rusiru"
              text="Professional staff and excellent facilities. The personalized care plan made all the difference in my rehabilitation."
              delay={0.2}
            />
            <TestimonialCard
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
              name="Nohim Dhanawardhana"
              text="The virtual sessions are so convenient, and the quality of care is just as good as in-person visits."
              delay={0.3}
            />
          </div>
        </div>
        <div className="absolute -z-10 top-1/2 right-1/4 transform -translate-y-1/2">
          <div className="h-96 w-96 bg-blue-50 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-white to-sky-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Start Your Wellness Journey?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who have transformed their lives with our expert care and support.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 text-lg">
              Book Your First Session <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
        <div className="absolute -z-10 inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-[400px] w-[400px] bg-sky-100/80 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Chatbot Icon */}
      <div className="fixed right-4 bottom-10 transform -translate-y-1/2 z-50 bg-sky-500 p-4 rounded-full shadow-lg hover:bg-sky-600 transition-colors justify-center animate-bounce">
        <Link href="/chat">
          <Bot className="h-8 w-8 text-white" />
        </Link>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10">
        <div className="h-2 w-2 bg-sky-400 rounded-full animate-ping"></div>
      </div>
      <div className="absolute bottom-20 right-10">
        <div className="h-3 w-3 bg-blue-300 rounded-full animate-ping"></div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-xl border border-sky-100 bg-white hover:shadow-xl hover:border-sky-200 transition-all duration-300"
    >
      <div className="text-sky-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function TestimonialCard({ image, name, text, delay }: { image: string; name: string; text: string; delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-xl border border-sky-100 bg-white hover:shadow-xl hover:border-sky-200 transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <Image
          src={image}
          alt={name}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="ml-4">
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <div className="flex text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic">&quot;{text}&quot;</p>
    </motion.div>
  );
}