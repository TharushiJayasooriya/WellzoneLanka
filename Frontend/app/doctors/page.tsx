"use client";

import { Activity, Star, Clock, Video, Bot, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/doc-navbar";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChatDialog } from "@/components/chatbot/ChatDialog";
import { ChatButton } from "@/components/chatbot/ChatButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Appointment from "./appoinment";

// Define Doctor Interface
interface Doctor {
  id: number;
  name: string;
  specialization: string;
  category: string;
  experience: string;
  rating: number;
  image: string;
  expertise: string[];
}

export default function DoctorsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const allDoctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Sarah Perera",
      specialization: "Senior Physiotherapist",
      category: "general",
      experience: "15+ years",
      rating: 4.9,
      image: "/images/female-doctor.png",
      expertise: ["Sports Injuries", "Rehabilitation", "Joint Pain"],
    },
    {
      id: 2,
      name: "Dr. Anil Fernando",
      specialization: "Orthopedic Physiotherapist",
      category: "orthopedic",
      experience: "12+ years",
      rating: 4.8,
      image: "/images/doctor-male.png",
      expertise: ["Back Pain", "Neck Pain", "Post-Surgery Rehabilitation"],
    },
    {
      id: 3,
      name: "Dr. Maya Silva",
      specialization: "Neurological Physiotherapist",
      category: "neurological",
      experience: "10+ years",
      rating: 4.7,
      image: "/images/female-doctor.png",
      expertise: ["Stroke Rehabilitation", "Balance Disorders", "Nerve Pain"],
    },
    {
      id: 9,
      name: "Dr. Kavinda Perera",
      specialization: "Chiropractic Physiotherapist",
      category: "chiropractic",
      experience: "9+ years",
      rating: 4.6,
      image: "/images/doctor-male.png",
      expertise: [
        "Spinal Adjustments",
        "Posture Correction",
        "Chronic Back Pain",
      ],
    },
  ];

  const categories = [
    { value: "all", label: "All Specialists" },
    { value: "general", label: "General Physiotherapy" },
    { value: "orthopedic", label: "Orthopedic" },
    { value: "neurological", label: "Neurological" },
    {
      value: "Chiropractic Physiotherapist",
      label: "Chiropractic Physiotherapist",
    },
  ];

  const filteredDoctors =
    selectedCategory === "all"
      ? allDoctors
      : allDoctors.filter((doctor) => doctor.category === selectedCategory);

  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.div
        className="max-w-7xl mx-auto pt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-4 pt-12">
            Our Specialist Doctors
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with Sri Lanka&apos;s leading physiotherapists and wellness
            experts for personalized care and treatment
          </p>
        </motion.div>

        <motion.div
          className="mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center gap-3 bg-card p-4 rounded-lg shadow-md">
            <Filter className="h-5 w-5 text-primary" />
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full border-none shadow-none focus:ring-0 bg-white">
                <SelectValue placeholder="Filter by specialization" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
        >
          {filteredDoctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              className="bg-card rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative h-64">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  height={100}
                  width={100}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {doctor.specialization}
                </p>
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
                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredDoctors.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-muted-foreground">
              No doctors found in this category. Please try another category.
            </p>
          </motion.div>
        )}
      </motion.div>

      {selectedDoctor && (
        <Appointment
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}

      {/* Chatbot Icon */}
      <ChatButton onClick={() => setChatOpen(true)} />
      <ChatDialog open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}
