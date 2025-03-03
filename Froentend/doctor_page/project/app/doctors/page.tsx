import { Activity, Star, Clock, Video,Bot } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/navbar';





export default function DoctorsPage() {
  
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Perera",
      specialization: "Senior Physiotherapist",
      experience: "15+ years",
      rating: 4.9,
      image: "/images/female-doctor.png",
      expertise: ["Sports Injuries", "Rehabilitation", "Joint Pain"]
    },
    {
      id: 2,
      name: "Dr. Anil Fernando",
      specialization: "Orthopedic Physiotherapist",
      experience: "12+ years",
      rating: 4.8,
      image: "/images/doctor-male.png",
      expertise: ["Back Pain", "Neck Pain", "Post-Surgery Rehabilitation"]
    },
    {
      id: 3,
      name: "Dr. Maya Silva",
      specialization: "Neurological Physiotherapist",
      experience: "10+ years",
      rating: 4.7,
      image: "/images/female-doctor.png",
      expertise: ["Stroke Rehabilitation", "Balance Disorders", "Nerve Pain"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
        <Navbar/>
      <div className="max-w-7xl mx-auto pt-12">
        <div className="text-center mb-12 ">
          <h1 className="text-4xl font-bold text-foreground mb-4 pt-12">Our Specialist Doctors</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with Sri Lanka&apos;s leading physiotherapists and wellness experts for personalized care and treatment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-card rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="aspect-w-1 aspect-h-1">
              <Image
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
                width={100}  // Specify width
                height={100} // Specify height
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                <p className="text-muted-foreground mb-4">{doctor.specialization}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    <span>{doctor.rating} rating</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Activity className="h-4 w-4 mr-2 text-primary" />
                    <span>{doctor.expertise.join(", ")}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-primary text-primary-foreground rounded-md py-2 px-4 text-sm font-medium hover:bg-primary/90 transition-colors">
                    Book Appointment
                  </button>
                  <button className="flex items-center justify-center bg-secondary text-secondary-foreground rounded-md py-2 px-4 text-sm font-medium hover:bg-secondary/80 transition-colors">
                    <Video className="h-4 w-4 mr-2" />
                    Video Call
                  </button>
                </div>
              </div>
              

            </div>
            
          ))}
        </div>
      </div>
      {/* Chatbot Icon */}
      <div className="fixed right-4 bottom-10 transform -translate-y-1/2 z-50 bg-sky-500 p-4 rounded-full shadow-lg hover:bg-sky-600 transition-colors justify-center animate-bounce">
              <Link href="/chat">
                <Bot className="h-8 w-8 text-white" />
              </Link>
            </div>
    </div>
  );
}