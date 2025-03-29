"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/gym-navbar";
import axios from "axios"; // Import Axios
import { useState } from "react";
import { Footer } from "@/app/exercise/Footer";

import {
  Dumbbell,
  Clock,
  ArrowRight,
  Search,
  Filter,
  Camera,
} from "lucide-react";

export default function Exercises() {
  const [showCamera, setShowCamera] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

  // Mock data for exercises
  const exercises = [
    {
      id: "ex-1",
      name: "Push-ups",
      category: "Strength",
      target: ["Chest", "Shoulders", "Triceps"],
      difficulty: "Beginner",
      duration: "5-10 minutes",
      image: "https://well-zone-assets.netlify.app/Push-up.png",
      description:
        "A classic bodyweight exercise that targets the chest, shoulders, and triceps.",
      url: "https://www.youtube.com/embed/IODxDxX7oi4?si=TgTQg0AdXA_Uy-Wd",
      apiEndpoint: "http://127.0.0.1:5000",
    },
    {
      id: "ex-2",
      name: "Squats",
      category: "Strength",
      target: ["Quadriceps", "Hamstrings", "Glutes"],
      difficulty: "Beginner",
      duration: "5-10 minutes",
      image: "https://well-zone-assets.netlify.app/Squats.png",
      description:
        "A fundamental lower body exercise that strengthens the legs and glutes.",
      url: "https://youtu.be/gsNoPYwWXeM",
      apiEndpoint: "http://127.0.0.1:5001",
    },
    {
      id: "ex-3",
      name: "Plank",
      category: "Core",
      target: ["Abs", "Lower Back", "Shoulders"],
      difficulty: "Beginner",
      duration: "1-3 minutes",
      image: "https://well-zone-assets.netlify.app/Plank.png",
      description:
        "An isometric core exercise that improves stability and posture.",
      url: "https://youtu.be/kL_NJAkCQBg?si=6uSJy3ZbuVxeYZLe",
      apiEndpoint: "http://127.0.0.1:5002",
    },
    {
      id: "ex-4",
      name: "Lunges",
      category: "Strength",
      target: ["Quadriceps", "Hamstrings", "Glutes"],
      difficulty: "Beginner",
      duration: "5-10 minutes",
      image: "https://well-zone-assets.netlify.app/Lunges.png",
      description:
        "A unilateral exercise that targets the legs and improves balance.",
      url: "https://youtube.com/shorts/nvRONn4vV6E?si=YaPYIcIXVG3eV-ld",
      apiEndpoint: "http://127.0.0.1:5003",
    },
  ];

  // Function to handle API call for each exercise with retry logic
  const handleExerciseClick = async (
    apiEndpoint: string,
    retries = 3,
    delay = 1000
  ) => {
    try {
      const response = await axios.get(apiEndpoint, {
        timeout: 5000, // Set a timeout of 5 seconds
      });
      console.log("API Response:", response.data);
      setErrorMessage(""); // Clear any previous error messages
      // Handle the response (e.g., display video feed or other data)
    } catch (error) {
      if (retries > 0) {
        console.log(`Retrying... Attempts left: ${retries}`);
        setTimeout(() => {
          handleExerciseClick(apiEndpoint, retries - 1, delay * 2); // Exponential backoff
        }, delay);
      } else {
        // Handle the error
        if (axios.isAxiosError(error) && error.response) {
          // The server responded with a status code outside the 2xx range
          console.error("Error response:", error.response);
          setErrorMessage(`Server error: ${error.response.status}`);
        } else if (axios.isAxiosError(error) && error.request) {
          // The request was made but no response was received
          console.error("Error request:", error.request);
          setErrorMessage("Network error: No response from server.");
        } else {
          // Something happened in setting up the request
          if (error instanceof Error) {
            console.error("Error message:", error.message);
          } else {
            console.error("Unexpected error:", error);
          }
          if (error instanceof Error) {
            setErrorMessage(`Request error: ${error.message}`);
          } else {
            setErrorMessage("An unexpected error occurred.");
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar />
      <br />
      <br />
      <section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"
        id="header"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-black">
              Exercise <span className="text-primary">Library</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our comprehensive collection of exercises with detailed
              instructions and video demonstrations. Find the perfect exercises
              for your fitness level and goals.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search exercises..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2 text-white">
              <Button variant="outline" size="sm">
                All
              </Button>
              <Button variant="outline" size="sm">
                Strength
              </Button>
              <Button variant="outline" size="sm">
                Cardio
              </Button>
              <Button variant="outline" size="sm">
                Core
              </Button>
              <Button variant="outline" size="sm">
                Flexibility
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" /> More Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="wellzone-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exercises.map((exercise) => (
            <Card key={exercise.id} className="wellzone-card overflow-hidden">
              <div className="relative h-48" style={{ height: "300px" }}>
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                  <span className="text-sm font-medium">
                    {exercise.category}
                  </span>
                </div>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">{exercise.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {exercise.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {exercise.target.map((target, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {target}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {exercise.duration}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-muted rounded-full text-xs">
                    {exercise.difficulty}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={exercise.url} target="_blank">
                    View Exercise <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant={showCamera ? "default" : "outline"}
                  onClick={() => {
                    setShowCamera(true);
                    handleExerciseClick(exercise.apiEndpoint); // Call the API
                  }}
                  className="shadow-sm hover:shadow transition-shadow text-white bg-sky-500"
                >
                  <Camera className="mr-2 h-4 w-4" /> Track My Form
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      <Footer />

      {/* Display error message if any */}
      {errorMessage && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
