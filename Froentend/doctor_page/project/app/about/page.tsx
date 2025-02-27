import { Heart, Users, Award, Activity, CheckCircle,Bot } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function AboutPage() {
  return (
    
    <div className="min-h-screen bg-background">
        <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
          <Link href="/about" >
              <Image 
                src="/images/icon.png" 
                alt="Logo" 
                height={40} 
                width={40} 
                
              />
              </Link>
            <Link href="/about" ><span className="text-2xl font-bold text-gray-900">Wellzone Lanka</span></Link>
          </div>
          <div className="hidden md:flex items-center gap-8 text-gray-600">
            <Link href="/" className="text-sky-600 border-b-2 border-sky-500">Home</Link>
            <Link href="/services" className="hover:text-sky-600 transition-colors">Services</Link>
            <Link href="/doctors" className="hover:text-sky-600 transition-colors">Doctors</Link>
            <Link href="/contact" className="hover:text-sky-600 transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-gray-700 hover:text-sky-600">Sign In</Button>
            <Button className="bg-sky-500 hover:bg-sky-600 text-white">Register</Button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Wellzone Lanka</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sri Lanka&apos;s premier platform for physical health and wellness, connecting patients with expert physiotherapists and wellness professionals.
          </p>
        </div>
      </section>
      

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At Wellzone Lanka, we&apos;re dedicated to revolutionizing physical healthcare accessibility in Sri Lanka. Our platform bridges the gap between patients and qualified healthcare professionals, ensuring everyone has access to quality physiotherapy and wellness services.
              </p>
              <div className="space-y-4">
                {[
                  "Expert physiotherapy care at your fingertips",
                  "Comprehensive physical health assessments",
                  "Personalized treatment plans",
                  "Advanced telehealth solutions"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
                <Image
                    src="/images/about_image.jpg"  // Path relative to the /public folder
                    alt="Medical professional"
                    className="rounded-lg shadow-xl"
                    width={2000}  // Provide width
                    height={1333} // Provide height
                />
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard
              icon={<Users className="h-8 w-8" />}
              number="5000+"
              label="Satisfied Patients"
            />
            <StatCard
              icon={<Activity className="h-8 w-8" />}
              number="50+"
              label="Expert Doctors"
            />
            <StatCard
              icon={<Award className="h-8 w-8" />}
              number="15+"
              label="Years Experience"
            />
            <StatCard
              icon={<Heart className="h-8 w-8" />}
              number="98%"
              label="Success Rate"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              title="Patient-Centered Care"
              description="We prioritize your unique needs and ensure personalized treatment plans that work best for you."
            />
            <ValueCard
              title="Professional Excellence"
              description="Our network consists of highly qualified and experienced healthcare professionals."
            />
            <ValueCard
              title="Innovation in Healthcare"
              description="We leverage technology to make quality healthcare accessible to everyone in Sri Lanka."
            />
          </div>
        </div>
      </section>
       {/* Chatbot Icon */}
      <div className="fixed right-4 bottom-10 transform -translate-y-1/2 z-50 bg-sky-500 p-4 rounded-full shadow-lg hover:bg-sky-600 transition-colors justify-center animate-bounce">
        <Link href="/chat">
          <Bot className="h-8 w-8 text-white" />
        </Link>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Wellness Journey Today</h2>
          <p className="mb-8">
            Join thousands of satisfied patients who have transformed their lives through Wellzone Lanka&apos;s comprehensive care approach.
          </p>
          <button className="bg-background text-foreground px-8 py-3 rounded-lg font-medium hover:bg-background/90 transition-colors">
            Book an Appointment
          </button>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, number, label }: { icon: React.ReactNode; number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4 text-primary">
        {icon}
      </div>
      <div className="text-3xl font-bold mb-2">{number}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}

function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}