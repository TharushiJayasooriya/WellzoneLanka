import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Calendar, 
  MessageSquare, 
  ArrowRight, 
  Users, 
  Search
} from "lucide-react";

export default function Trainers() {
  // Mock data for trainers
  const trainers = [
    {
      id: "trainer-1",
      name: "",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      specialties: ["Weight Training", "Rehabilitation", "Nutrition"],
      experience: "8 years",
      rating: 4.9,
      reviews: 124,
      price: "Rs. 2,500/hour",
      availability: "Mon-Fri, 6AM-8PM"
    },
    {
      id: "trainer-2",
      name: "Priya Mendis",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      specialties: ["Yoga", "Pilates", "Flexibility"],
      experience: "6 years",
      rating: 4.8,
      reviews: 98,
      price: "Rs. 2,200/hour",
      availability: "Tue-Sat, 7AM-7PM"
    },
    {
      id: "trainer-3",
      name: "Dinesh Fernando",
      image: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      specialties: ["HIIT", "Functional Training", "Weight Loss"],
      experience: "10 years",
      rating: 4.7,
      reviews: 156,
      price: "Rs. 2,800/hour",
      availability: "Mon-Sat, 5AM-9PM"
    },
    {
      id: "trainer-4",
      name: "Lakshmi Rajapaksa",
      image: "https://images.unsplash.com/photo-1609899537878-88d5ba429bdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      specialties: ["Senior Fitness", "Rehabilitation", "Low Impact"],
      experience: "12 years",
      rating: 4.9,
      reviews: 210,
      price: "Rs. 3,000/hour",
      availability: "Mon-Fri, 8AM-6PM"
    },
    {
      id: "trainer-5",
      name: "Roshan Silva",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      specialties: ["Bodybuilding", "Strength Training", "Nutrition"],
      experience: "9 years",
      rating: 4.6,
      reviews: 132,
      price: "Rs. 2,700/hour",
      availability: "Wed-Sun, 6AM-8PM"
    },
    {
      id: "trainer-6",
      name: "Nisha Jayawardena",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      specialties: ["Prenatal Fitness", "Postnatal Recovery", "Women's Health"],
      experience: "7 years",
      rating: 4.8,
      reviews: 89,
      price: "Rs. 2,400/hour",
      availability: "Mon-Fri, 9AM-5PM"
    },
    {
      id: "trainer-7",
      name: "Malik Gunaratne",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      specialties: ["Sports Performance", "Athletic Training", "Injury Prevention"],
      experience: "11 years",
      rating: 4.7,
      reviews: 145,
      price: "Rs. 2,900/hour",
      availability: "Tue-Sun, 7AM-9PM"
    },
    {
      id: "trainer-8",
      name: "Tharushi De Silva",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      specialties: ["Dance Fitness", "Aerobics", "Zumba"],
      experience: "5 years",
      rating: 4.8,
      reviews: 76,
      price: "Rs. 2,100/hour",
      availability: "Mon-Sat, 10AM-8PM"
    }
  ];

  
      </section>
    </div>
  );
}