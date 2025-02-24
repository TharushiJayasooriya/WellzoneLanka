"use client";

import { Button } from "../components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Activity, Heart, Calendar, Video, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:py-32 flex flex-col items-center justify-center text-center bg-gradient-to-b from-primary/10 to-background overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-6 relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Your Journey to Physical Wellness Starts Here
          </h1>
          <p className="text-lg text-muted-foreground">
            Connect with Sri Lanka&apos;s leading physiotherapists and wellness experts for personalized care and treatment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 transition-all duration-300">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="w-full sm:w-auto hover:bg-primary/10 transition-all duration-300">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop"
            alt="Hero background"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Why Choose Wellzone Lanka
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Activity className="h-10 w-10" />}
              title="Expert Assessment"
              description="Comprehensive physical evaluation and personalized treatment plans"
              delay={0.1}
            />
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
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            What Our Patients Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              image="/images/user.png"
              name="Esala Gamage"
              text="The physiotherapy services at Wellzone Lanka have been transformative. I've seen significant improvement in my recovery."
              delay={0.1}
            />
            <TestimonialCard
              image="/images/user.png"
              name="Anjana Rusiru"
              text="Professional staff and excellent facilities. The personalized care plan made all the difference in my rehabilitation."
              delay={0.2}
            />
            <TestimonialCard
              image="/images/user.png"
              name="Nohim Dhanawardhana"
              text="The virtual sessions are so convenient, and the quality of care is just as good as in-person visits."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-primary/5 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Wellness Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who have transformed their lives with our expert care and support.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-primary hover:bg-primary/90 transition-all duration-300">
              Book Your First Session <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1573823882221-1c5b51753b44?q=80&w=2787&auto=format&fit=crop"
            alt="CTA background"
            fill
            className="object-cover opacity-5"
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
    >
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

function TestimonialCard({ image, name, text, delay }: { image: string; name: string; text: string; delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
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
          <h4 className="font-semibold">{name}</h4>
          <div className="flex text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
          </div>
        </div>
      </div>
      <p className="text-muted-foreground italic">&quot;{text}&quot;</p>
    </motion.div>
  );
}