"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Star, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Video, 
  Award, 
  Users, 
  CheckCircle2, 
  ThumbsUp
} from "lucide-react";

// Mock data for trainers
const trainersData = {
  "trainer-1": {
    id: "trainer-1",
    name: "Sanuka Siriwardhana",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    coverImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    specialties: ["Weight Training", "Rehabilitation", "Nutrition", "Calisthenics"],
    experience: "4 years",
    rating: 4.9,
    reviews: 254,
    price: "Rs. 1,500/hour",
    availability: "Mon-Fri, 6AM-8PM",
    bio: "Certified personal trainer with 4 years of experience specializing in weight training, rehabilitation, nutrition and Calisthenics. I help clients achieve their fitness goals through personalized training programs and nutritional guidance. My approach focuses on building sustainable habits for long-term success.",
    certifications: [
      "Certified Personal Trainer (CPT)",
      "Rehabilitation Specialist",
      "Sports Nutrition Certification",
      "First Aid and CPR Certified"
    ],
    education: [
      "Bachelor's Degree in Sports Science, University of Colombo",
      "Diploma in Nutrition, Institute of Health Sciences"
    ],
    languages: ["English", "Sinhala", "Tamil"],
    testimonials: [
      {
        name: "Sanjay Mendis",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        text: "Sanuka helped me recover from a back injury and build strength. His knowledge of rehabilitation exercises was invaluable."
      },
      {
        name: "Priya Fernando",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        text: "I've been training with Sanuka for 6 months and have seen amazing results. His nutrition advice has been a game-changer for me."
      },
      {
        name: "Rohan De Silva",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 4,
        text: "Sanuka is very knowledgeable and creates personalized workout plans. He's always punctual and professional."
      }
    ],
    schedule: [
      { day: "Monday", slots: ["6AM-8AM", "10AM-12PM", "4PM-8PM"] },
      { day: "Tuesday", slots: ["6AM-8AM", "10AM-12PM", "4PM-8PM"] },
      { day: "Wednesday", slots: ["6AM-8AM", "10AM-12PM", "4PM-8PM"] },
      { day: "Thursday", slots: ["6AM-8AM", "10AM-12PM", "4PM-8PM"] },
      { day: "Friday", slots: ["6AM-8AM", "10AM-12PM", "4PM-8PM"] }
    ]
  },
  "trainer-2": {
    id: "trainer-2",
    name: "Priya Mendis",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    coverImage: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    specialties: ["Yoga", "Pilates", "Flexibility"],
    experience: "6 years",
    rating: 4.8,
    reviews: 98,
    price: "Rs. 2,200/hour",
    availability: "Tue-Sat, 7AM-7PM",
    bio: "Certified yoga instructor and Pilates trainer with 6 years of experience. I specialize in helping clients improve flexibility, reduce stress, and build core strength. My holistic approach focuses on mind-body connection and proper alignment for safe and effective practice.",
    certifications: [
      "Registered Yoga Teacher (RYT-200)",
      "Certified Pilates Instructor",
      "Meditation Coach",
      "First Aid Certified"
    ],
    education: [
      "Diploma in Yoga Therapy, Yoga Alliance",
      "Certificate in Pilates Instruction, Body Control Pilates"
    ],
    languages: ["English", "Sinhala"],
    testimonials: [
      {
        name: "Amali Perera",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        rating: 5,
        text: "Priya's yoga classes have transformed my practice. Her attention to alignment has helped me avoid injuries and deepen my poses."
      },
      {
        name: "Dinesh Kumar",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 4,
        text: "I started Pilates with Priya to help with my back pain, and it's made a huge difference. She's patient and explains everything clearly."
      },
      {
        name: "Lakshmi Silva",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        text: "Priya's holistic approach to fitness has helped me reduce stress and improve my overall wellbeing. Highly recommended!"
      }
    ],
    schedule: [
      { day: "Tuesday", slots: ["7AM-9AM", "10AM-12PM", "4PM-7PM"] },
      { day: "Wednesday", slots: ["7AM-9AM", "10AM-12PM", "4PM-7PM"] },
      { day: "Thursday", slots: ["7AM-9AM", "10AM-12PM", "4PM-7PM"] },
      { day: "Friday", slots: ["7AM-9AM", "10AM-12PM", "4PM-7PM"] },
      { day: "Saturday", slots: ["8AM-12PM", "2PM-5PM"] }
    ]
  }
};

export default function TrainerProfile() {
  const params = useParams();
  const trainerId = params.id as string;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Get the trainer data
  const trainer = trainersData[trainerId as keyof typeof trainersData];

  // If the trainer doesn't exist, show a message
  if (!trainer) {
    return (
      <div className="wellzone-section text-center">
        <h1 className="text-3xl font-bold mb-4">Trainer Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The requested trainer could not be found. Please try another trainer.
        </p>
        <Button asChild>
          <Link href="/trainers">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trainers
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <img 
          src={trainer.coverImage} 
          alt={`${trainer.name} cover`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
      </div>

      {/* Profile Section */}
      <section className="wellzone-section -mt-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-1/3">
              <Card className="wellzone-card sticky top-24">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background mb-4">
                      <img 
                        src={trainer.image} 
                        alt={trainer.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="text-2xl font-bold mb-1">{trainer.name}</h1>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{trainer.rating}</span>
                      <span className="text-muted-foreground ml-1">({trainer.reviews} reviews)</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{trainer.experience} experience</p>
                    
                    <div className="flex flex-wrap justify-center gap-1 mb-6">
                      {trainer.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="w-full space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-medium">{trainer.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Availability:</span>
                        <span>{trainer.availability}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Languages:</span>
                        <span>{trainer.languages.join(", ")}</span>
                      </div>
                    </div>
                    
                    <div className="w-full pt-6 space-y-3">
                      <Button className="w-full">
                        <Calendar className="mr-2 h-4 w-4" /> Book a Session
                      </Button>
                      <Button variant="outline" className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Video className="mr-2 h-4 w-4" /> Video Consultation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:w-2/3">
              <Button asChild variant="outline" className="mb-6">
                <Link href="/trainers">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trainers
                </Link>
              </Button>

              <Tabs defaultValue="about">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="classes">Classes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="mt-6">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-semibold mb-4">About {trainer.name}</h2>
                      <p className="text-muted-foreground">{trainer.bio}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Certifications</h3>
                      <ul className="space-y-2">
                        {trainer.certifications.map((cert, index) => (
                          <li key={index} className="flex items-start">
                            <Award className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                            <span>{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Education</h3>
                      <ul className="space-y-2">
                        {trainer.education.map((edu, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                            <span>{edu}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Specialties</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {trainer.specialties.map((specialty, index) => (
                          <Card key={index} className="bg-muted/50">
                            <CardContent className="pt-6">
                              <h4 className="font-semibold mb-2">{specialty}</h4>
                              <p className="text-sm text-muted-foreground">
                                Specialized training and expertise in {specialty.toLowerCase()} techniques and methodologies.
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="schedule" className="mt-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Book a Session</h2>
                    <p className="text-muted-foreground mb-6">
                      Select a day and time slot to book a session with {trainer.name}.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Select a Day</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          {trainer.schedule.map((day) => (
                            <button
                              key={day.day}
                              className={`p-3 rounded-md border text-center transition-colors ${
                                selectedDate === day.day
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-background hover:bg-muted border-border"
                              }`}
                              onClick={() => {
                                setSelectedDate(day.day);
                                setSelectedTime(null);
                              }}
                            >
                              {day.day}
                            </button>
                          ))}
                        </div>
                      </div>

                      {selectedDate && (
                        <div>
                          <h3 className="text-lg font-medium mb-3">Select a Time</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {trainer.schedule
                              .find((day) => day.day === selectedDate)
                              ?.slots.map((slot) => (
                                <button
                                  key={slot}
                                  className={`p-3 rounded-md border text-center transition-colors ${
                                    selectedTime === slot
                                      ? "bg-primary text-primary-foreground border-primary"
                                      : "bg-background hover:bg-muted border-border"
                                  }`}
                                  onClick={() => setSelectedTime(slot)}
                                >
                                  <Clock className="h-4 w-4 inline mr-2" />
                                  {slot}
                                </button>
                              ))}
                          </div>
                        </div>
                      )}

                      {selectedDate && selectedTime && (
                        <div className="mt-8">
                          <Card className="bg-muted/50">
                            <CardContent className="pt-6">
                              <h3 className="text-lg font-medium mb-3">Session Summary</h3>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Trainer:</span>
                                  <span>{trainer.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Date:</span>
                                  <span>{selectedDate}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Time:</span>
                                  <span>{selectedTime}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Duration:</span>
                                  <span>1 hour</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Price:</span>
                                  <span className="font-medium">{trainer.price}</span>
                                </div>
                              </div>
                              <Button className="w-full mt-4">
                                Confirm Booking
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-6">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-semibold">Client Reviews</h2>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 mr-1" />
                        <span className="font-medium text-lg">{trainer.rating}</span>
                        <span className="text-muted-foreground ml-1">({trainer.reviews} reviews)</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {trainer.testimonials.map((testimonial, index) => (
                        <Card key={index} className="wellzone-card">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                <img 
                                  src={testimonial.image} 
                                  alt={testimonial.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold">{testimonial.name}</h4>
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`h-4 w-4 ${
                                          i < testimonial.rating ? "text-yellow-500" : "text-muted"
                                        }`} 
                                      />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-muted-foreground">{testimonial.text}</p>
                                <div className="flex items-center mt-3 text-sm text-muted-foreground">
                                  <button className="flex items-center mr-4 hover:text-foreground">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    Helpful
                                  </button>
                                  <span>2 months ago</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="classes" className="mt-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Group Classes</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Morning Yoga Flow",
                          image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                          description: "Start your day with a rejuvenating yoga flow to energize your body and mind.",
                          schedule: "Tuesdays & Thursdays, 7AM-8AM",
                          price: "Rs. 1,500/session",
                          participants: 8
                        },
                        {
                          title: "Strength Training Basics",
                          image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                          description: "Learn proper form and techniques for fundamental strength training exercises.",
                          schedule: "Mondays & Wednesdays, 6PM-7PM",
                          price: "Rs. 1,800/session",
                          participants: 6
                        },
                        {
                          title: "Rehabilitation Exercises",
                          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                          description: "Gentle exercises designed to help recover from injuries and improve mobility.",
                          schedule: "Fridays, 10AM-11AM",
                          price: "Rs. 2,000/session",
                          participants: 4
                        },
                        {
                          title: "Nutrition Workshop",
                          image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                          description: "Learn about proper nutrition to support your fitness goals and overall health.",
                          schedule: "Saturday, 2PM-4PM",
                          price: "Rs. 3,500/workshop",
                          participants: 12
                        }
                      ].map((classItem, index) => (
                        <Card key={index} className="wellzone-card overflow-hidden">
                          <div className="relative h-48">
                            <img 
                              src={classItem.image} 
                              alt={classItem.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold mb-2">{classItem.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{classItem.description}</p>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Schedule:</span>
                                <span>{classItem.schedule}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Price:</span>
                                <span>{classItem.price}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Participants:</span>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  <span>{classItem.participants} max</span>
                                </div>
                              </div>
                            </div>
                            
                            <Button className="w-full mt-4">
                              Book Class
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}