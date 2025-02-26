import { Activity, Brain,Bot, Dumbbell, Spline as Spine, FileWarning as Running, Baby, Armchair as Wheelchair, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";





export default function ServicesPage() {
  const services = [
    {
      icon: <Spine className="h-12 w-12" />,
      title: "Orthopedic Physiotherapy",
      description: "Expert treatment for musculoskeletal conditions, joint pain, and post-surgical rehabilitation.",
      features: [
        "Joint and muscle pain treatment",
        "Post-surgery rehabilitation",
        "Sports injury recovery",
        "Spine care programs"
      ]
    },
    {
      icon: <Brain className="h-12 w-12" />,
      title: "Neurological Rehabilitation",
      description: "Specialized care for neurological conditions and movement disorders.",
      features: [
        "Stroke rehabilitation",
        "Balance disorder treatment",
        "Movement therapy",
        "Cognitive rehabilitation"
      ]
    },
    {
      icon: <Running className="h-12 w-12" />,
      title: "Sports Physiotherapy",
      description: "Comprehensive care for athletes and sports enthusiasts.",
      features: [
        "Sports injury treatment",
        "Performance enhancement",
        "Injury prevention",
        "Return to sport programs"
      ]
    },
    {
      icon: <Baby className="h-12 w-12" />,
      title: "Pediatric Physiotherapy",
      description: "Specialized physical therapy for children and adolescents.",
      features: [
        "Developmental assessment",
        "Motor skills development",
        "Posture correction",
        "Pediatric rehabilitation"
      ]
    },
    {
      icon: <Wheelchair className="h-12 w-12" />,
      title: "Geriatric Physiotherapy",
      description: "Tailored care for elderly patients focusing on mobility and independence.",
      features: [
        "Balance training",
        "Fall prevention",
        "Mobility enhancement",
        "Pain management"
      ]
    },
    {
      icon: <Dumbbell className="h-12 w-12" />,
      title: "Exercise Therapy",
      description: "Customized exercise programs for various conditions and fitness goals.",
      features: [
        "Therapeutic exercises",
        "Strength training",
        "Flexibility programs",
        "Core stabilization"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <Image 
                src="/images/icon.png" 
                alt="Logo" 
                height={40} 
                width={40} 
                
              />
            </div>
            <Link href="/about" className="text-sky-600 border-b-2 border-sky-500"></Link>
            <span className="text-2xl font-bold text-gray-900">Wellzone Lanka</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-gray-600">
            <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
            <Link href="/services" className="text-sky-600 border-b-2 border-sky-500">Services</Link>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive physiotherapy and wellness services tailored to your needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-primary mb-6">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <Activity className="h-4 w-4 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/book-appointment" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
                  Book Service
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Treatment Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Initial Assessment",
                description: "Comprehensive evaluation of your condition and medical history"
              },
              {
                number: "02",
                title: "Treatment Plan",
                description: "Customized therapy program tailored to your specific needs"
              },
              {
                number: "03",
                title: "Regular Sessions",
                description: "Structured therapy sessions with continuous progress monitoring"
              },
              {
                number: "04",
                title: "Recovery & Prevention",
                description: "Long-term recovery plan with preventive measures"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Chatbot Icon */}
      <div className="fixed right-4 bottom-10 transform -translate-y-1/2 z-50 bg-blue-300 p-2 rounded-full shadow-lg flex items-center justify-center animate-bounce">
        <Link href="/chat">
          <Bot className="h-12 w-12 cursor-pointer hover:scale-110 transition-transform duration-200" />
        </Link>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-primary text-primary-foreground rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Recovery Journey?</h2>
            <p className="mb-8">
              Book an appointment with our expert physiotherapists and take the first step towards better health.
            </p>
            <Link href="/book-appointment">
              <button className="bg-background text-foreground px-8 py-3 rounded-lg font-medium hover:bg-background/90 transition-colors">
                Book an Appointment
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}