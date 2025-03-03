"use client";

import { Activity, Star, Clock, Video, Bot, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/navbar';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DoctorsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const allDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Perera",
      specialization: "Senior Physiotherapist",
      category: "general",
      experience: "15+ years",
      rating: 4.9,
      image: "/images/female-doctor.png",
      expertise: ["Sports Injuries", "Rehabilitation", "Joint Pain"]
    },
    {
      id: 2,
      name: "Dr. Anil Fernando",
      specialization: "Orthopedic Physiotherapist",
      category: "orthopedic",
      experience: "12+ years",
      rating: 4.8,
      image: "/images/doctor-male.png",
      expertise: ["Back Pain", "Neck Pain", "Post-Surgery Rehabilitation"]
    },
    {
      id: 3,
      name: "Dr. Maya Silva",
      specialization: "Neurological Physiotherapist",
      category: "neurological",
      experience: "10+ years",
      rating: 4.7,
      image: "/images/female-doctor.png",
      expertise: ["Stroke Rehabilitation", "Balance Disorders", "Nerve Pain"]
    },
    {
      id: 4,
      name: "Dr. Rajiv Mendis",
      specialization: "Sports Physiotherapist",
      category: "sports",
      experience: "8+ years",
      rating: 4.6,
      image: "/images/doctor-male.png",
      expertise: ["Sports Injuries", "Performance Enhancement", "Injury Prevention"]
    },
    {
      id: 5,
      name: "Dr. Lakshmi Jayawardena",
      specialization: "Pediatric Physiotherapist",
      category: "pediatric",
      experience: "14+ years",
      rating: 4.9,
      image: "/images/female-doctor.png",
      expertise: ["Developmental Disorders", "Motor Skills", "Pediatric Rehabilitation"]
    },
    {
      id: 6,
      name: "Dr. Dinesh Kumar",
      specialization: "Geriatric Physiotherapist",
      category: "geriatric",
      experience: "16+ years",
      rating: 4.8,
      image: "/images/doctor-male.png",
      expertise: ["Balance Training", "Fall Prevention", "Mobility Enhancement"]
    }
  ];

  const categories = [
    { value: "all", label: "All Specialists" },
    { value: "general", label: "General Physiotherapy" },
    { value: "orthopedic", label: "Orthopedic" },
    { value: "neurological", label: "Neurological" },
    { value: "sports", label: "Sports" },
    { value: "pediatric", label: "Pediatric" },
    { value: "geriatric", label: "Geriatric" }
  ];

  const filteredDoctors = selectedCategory === "all" 
    ? allDoctors 
    : allDoctors.filter(doctor => doctor.category === selectedCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar/>
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
          <h1 className="text-4xl font-bold text-foreground mb-4 pt-12">Our Specialist Doctors</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with Sri Lanka&apos;s leading physiotherapists and wellness experts for personalized care and treatment
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
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full border-none shadow-none focus:ring-0 ">
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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          layout
        >
          {filteredDoctors.map((doctor) => (
            <motion.div 
              key={doctor.id} 
              className="bg-card rounded-lg shadow-lg overflow-hidden  h-50 w-50"
              variants={cardVariants}
              whileHover="hover"
              layout
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div 
                className="aspect-w-1 aspect-h-1 relative h-64"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  height={100}
                  width={100}
                  className="object-cover"
                />
              </motion.div>
              <motion.div 
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h3 
                  className="text-xl font-semibold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {doctor.name}
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {doctor.specialization}
                </motion.p>
                
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div 
                    className="flex items-center text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>{doctor.experience} experience</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    <span>{doctor.rating} rating</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Activity className="h-4 w-4 mr-2 text-primary" />
                    <span>{doctor.expertise.join(", ")}</span>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="mt-6 flex gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <motion.button 
                    className="flex-1 bg-primary text-primary-foreground rounded-md py-2 px-4 text-sm font-medium hover:bg-primary/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Appointment
                  </motion.button>
                  <motion.button 
                    className="flex items-center justify-center bg-secondary text-secondary-foreground rounded-md py-2 px-4 text-sm font-medium hover:bg-secondary/80 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Video Call
                  </motion.button>
                </motion.div>
              </motion.div>
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
            <p className="text-lg text-muted-foreground">No doctors found in this category. Please try another category.</p>
          </motion.div>
        )}
      </motion.div>

      {/* Chatbot Icon */}
      <div className="fixed right-4 bottom-10 transform -translate-y-1/2 z-50 bg-sky-500 p-4 rounded-full shadow-lg hover:bg-sky-600 transition-colors justify-center animate-bounce">
        <Link href="/chat">
          <Bot className="h-8 w-8 text-white" />
        </Link>
      </div>
    </div>
  );
}