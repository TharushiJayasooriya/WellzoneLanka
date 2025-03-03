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
  Play, 
  Info, 
  Camera, 
  Clock, 
  BarChart, 
  CheckCircle2, 
  Dumbbell
} from "lucide-react";

// Mock data for exercises
const exercisesData = {
  "ex-1": {
    id: "ex-1",
    name: "Push-ups",
    category: "Strength",
    target: ["Chest", "Shoulders", "Triceps"],
    difficulty: "Beginner",
    duration: "5-10 minutes",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "A classic bodyweight exercise that targets the chest, shoulders, and triceps.",
    videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4?si=TgTQg0AdXA_Uy-Wd",
    steps: [
      "Start in a plank position with your hands slightly wider than shoulder-width apart.",
      "Keep your body in a straight line from head to heels.",
      "Lower your body until your chest nearly touches the floor.",
      "Pause, then push yourself back up to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    benefits: [
      "Builds upper body strength",
      "Improves core stability",
      "Enhances shoulder stability",
      "Can be done anywhere with no equipment"
    ],
    variations: [
      {
        name: "Knee Push-ups",
        difficulty: "Easier",
        description: "Perform push-ups with your knees on the ground instead of your toes."
      },
      {
        name: "Incline Push-ups",
        difficulty: "Easier",
        description: "Place your hands on an elevated surface like a bench or step."
      },
      {
        name: "Decline Push-ups",
        difficulty: "Harder",
        description: "Place your feet on an elevated surface to increase the challenge."
      },
      {
        name: "Diamond Push-ups",
        difficulty: "Harder",
        description: "Place your hands close together forming a diamond shape to target triceps more."
      }
    ],
    tips: [
      "Keep your core engaged throughout the movement.",
      "Don't let your hips sag or pike up.",
      "Breathe out as you push up, breathe in as you lower down.",
      "For beginners, start with knee push-ups and progress to full push-ups."
    ]
  },
  "ex-2": {
    id: "ex-2",
    name: "Squats",
    category: "Strength",
    target: ["Quadriceps", "Hamstrings", "Glutes"],
    difficulty: "Beginner",
    duration: "5-10 minutes",
    image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    description: "A fundamental lower body exercise that strengthens the legs and glutes.",
    videoUrl: "https://www.youtube.com/embed/YaXPRqUwItQ?si=TgTQg0AdXA_Uy-Wd",
    steps: [
      "Stand with feet shoulder-width apart, toes slightly turned out.",
      "Keep your chest up and core engaged.",
      "Bend your knees and push your hips back as if sitting in a chair.",
      "Lower until your thighs are parallel to the ground, or as low as you can with good form.",
      "Push through your heels to return to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    benefits: [
      "Builds lower body strength",
      "Improves hip mobility",
      "Strengthens core muscles",
      "Enhances functional movement patterns"
    ],
    variations: [
      {
        name: "Wall Squats",
        difficulty: "Easier",
        description: "Perform squats with your back against a wall for support."
      },
      {
        name: "Sumo Squats",
        difficulty: "Moderate",
        description: "Take a wider stance with toes pointed outward to target inner thighs more."
      },
      {
        name: "Jump Squats",
        difficulty: "Harder",
        description: "Add an explosive jump at the top of the movement for plyometric training."
      },
      {
        name: "Pistol Squats",
        difficulty: "Advanced",
        description: "Single-leg squats that require significant strength and balance."
      }
    ],
    tips: [
      "Keep your weight in your heels.",
      "Ensure your knees track over your toes, not caving inward.",
      "Maintain a neutral spine throughout the movement.",
      "For beginners, you can use a chair or bench behind you as a depth guide."
    ]
  }
};

export default function ExerciseDetail() {
  const params = useParams();
  const exerciseId = params.id as string;
  const [showCamera, setShowCamera] = useState(false);

  // Get the exercise data
  const exercise = exercisesData[exerciseId as keyof typeof exercisesData];

  // If the exercise doesn't exist, show a message
  if (!exercise) {
    return (
      <div className="wellzone-section text-center">
        <h1 className="text-3xl font-bold mb-4">Exercise Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The requested exercise could not be found. Please try another exercise.
        </p>
        <Button asChild>
          <Link href="/exercises">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exercises
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
        <div className="max-w-7xl mx-auto">
          <Button asChild variant="outline" className="mb-4">
            <Link href="/exercises">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exercises
            </Link>
          </Button>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {exercise.name}
          </h1>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary">{exercise.category}</Badge>
            {exercise.target.map((target, index) => (
              <Badge key={index} variant="outline">{target}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Exercise Content */}
      <section className="wellzone-section">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative aspect-video mb-6">
                {!showCamera ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={exercise.videoUrl}
                    title={exercise.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                ) : (
                  <div className="bg-black rounded-lg flex items-center justify-center h-full">
                    <p className="text-white">Camera would be activated here</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between mb-6">
                <Button 
                  variant={!showCamera ? "default" : "outline"}
                  onClick={() => setShowCamera(false)}
                >
                  <Play className="mr-2 h-4 w-4" /> Watch Demo
                </Button>
                <Button 
                  variant={showCamera ? "default" : "outline"}
                  onClick={() => setShowCamera(true)}
                >
                  <Camera className="mr-2 h-4 w-4" /> Track My Form
                </Button>
              </div>

              <Tabs defaultValue="instructions">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  <TabsTrigger value="variations">Variations</TabsTrigger>
                  <TabsTrigger value="tips">Tips</TabsTrigger>
                </TabsList>
                <TabsContent value="instructions" className="p-4 border rounded-md mt-2">
                  <h3 className="text-xl font-semibold mb-4">Step-by-Step Instructions</h3>
                  <ol className="space-y-2">
                    {exercise.steps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm mr-3">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </TabsContent>
                <TabsContent value="benefits" className="p-4 border rounded-md mt-2">
                  <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                  <ul className="space-y-2">
                    {exercise.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="variations" className="p-4 border rounded-md mt-2">
                  <h3 className="text-xl font-semibold mb-4">Variations</h3>
                  <div className="space-y-4">
                    {exercise.variations.map((variation, index) => (
                      <div key={index} className="p-3 border rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{variation.name}</h4>
                          <Badge variant={
                            variation.difficulty === "Easier" ? "secondary" :
                            variation.difficulty === "Moderate" ? "outline" :
                            "default"
                          }>
                            {variation.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{variation.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="tips" className="p-4 border rounded-md mt-2">
                  <h3 className="text-xl font-semibold mb-4">Tips & Precautions</h3>
                  <ul className="space-y-2">
                    {exercise.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <Info className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card className="wellzone-card">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Exercise Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <span className="px-2 py-1 bg-muted rounded-full text-xs">
                        {exercise.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {exercise.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Equipment:</span>
                      <span>None required</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{exercise.category}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold mb-2">Track Your Progress</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Completion Rate:</span>
                      <span className="text-sm">0/5 sessions</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full w-0"></div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold mb-4">Related Exercises</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Incline Push-ups", target: "Chest, Shoulders" },
                        { name: "Tricep Dips", target: "Triceps, Shoulders" },
                        { name: "Plank", target: "Core, Shoulders" }
                      ].map((related, index) => (
                        <div key={index} className="flex items-center">
                          <Dumbbell className="h-4 w-4 text-primary mr-2" />
                          <div>
                            <p className="font-medium">{related.name}</p>
                            <p className="text-xs text-muted-foreground">{related.target}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 bg-accent/10 p-4 rounded-lg border border-accent/20">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Important Notice</h4>
                    <p className="text-sm text-muted-foreground">
                      Always consult with a healthcare professional before starting any new exercise program, especially if you have existing health conditions or injuries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}