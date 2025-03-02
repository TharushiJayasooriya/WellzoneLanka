import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dumbbell, 
  Clock, 
  ArrowRight, 
  Search, 
  Filter
} from "lucide-react";

export default function Exercises() {
  // Mock data for exercises
  const exercises = [
    {
      id: "ex-1",
      name: "Push-ups",
      category: "Strength",
      target: ["Chest", "Shoulders", "Triceps"],
      difficulty: "Beginner",
      duration: "5-10 minutes",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "A classic bodyweight exercise that targets the chest, shoulders, and triceps."
    },
    {
      id: "ex-2",
      name: "Squats",
      category: "Strength",
      target: ["Quadriceps", "Hamstrings", "Glutes"],
      difficulty: "Beginner",
      duration: "5-10 minutes",
      image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      description: "A fundamental lower body exercise that strengthens the legs and glutes."
    },
    {
      id: "ex-3",
      name: "Plank",
      category: "Core",
      target: ["Abs", "Lower Back", "Shoulders"],
      difficulty: "Beginner",
      duration: "1-3 minutes",
      image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "An isometric core exercise that improves stability and posture."
    },
    {
      id: "ex-4",
      name: "Lunges",
      category: "Strength",
      target: ["Quadriceps", "Hamstrings", "Glutes"],
      difficulty: "Beginner",
      duration: "5-10 minutes",
      image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "A unilateral exercise that targets the legs and improves balance."
    },
    {
      id: "ex-5",
      name: "Mountain Climbers",
      category: "Cardio",
      target: ["Core", "Shoulders", "Cardiovascular System"],
      difficulty: "Intermediate",
      duration: "1-3 minutes",
      image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "A dynamic exercise that combines cardio and core strengthening."
    },
    {
      id: "ex-6",
      name: "Burpees",
      category: "Cardio",
      target: ["Full Body", "Cardiovascular System"],
      difficulty: "Advanced",
      duration: "5-10 minutes",
      image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      description: "A high-intensity exercise that works the entire body and boosts cardio fitness."
    },
    {
      id: "ex-7",
      name: "Bicycle Crunches",
      category: "Core",
      target: ["Abs", "Obliques"],
      difficulty: "Intermediate",
      duration: "3-5 minutes",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "A dynamic core exercise that targets the abdominals and obliques."
    },
    {
      id: "ex-8",
      name: "Glute Bridges",
      category: "Strength",
      target: ["Glutes", "Lower Back", "Hamstrings"],
      difficulty: "Beginner",
      duration: "5-8 minutes",
      image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      description: "An exercise that strengthens the glutes and improves hip mobility."
    },
    {
      id: "ex-9",
      name: "Jumping Jacks",
      category: "Cardio",
      target: ["Cardiovascular System", "Full Body"],
      difficulty: "Beginner",
      duration: "3-5 minutes",
      image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      description: "A classic cardio exercise that increases heart rate and improves coordination."
    },
    {
      id: "ex-10",
      name: "Russian Twists",
      category: "Core",
      target: ["Obliques", "Abs"],
      difficulty: "Intermediate",
      duration: "3-5 minutes",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "A rotational exercise that targets the obliques and improves core stability."
    },
    {
      id: "ex-11",
      name: "Tricep Dips",
      category: "Strength",
      target: ["Triceps", "Shoulders"],
      difficulty: "Beginner",
      duration: "5-8 minutes",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "An upper body exercise that targets the triceps using body weight."
    },
    {
      id: "ex-12",
      name: "High Knees",
      category: "Cardio",
      target: ["Cardiovascular System", "Core", "Legs"],
      difficulty: "Beginner",
      duration: "1-3 minutes",
      image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      description: "A dynamic cardio exercise that elevates heart rate and engages the core."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Exercise <span className="text-primary">Library</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our comprehensive collection of exercises with detailed instructions and video demonstrations.
              Find the perfect exercises for your fitness level and goals.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
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
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">All</Button>
              <Button variant="outline" size="sm">Strength</Button>
              <Button variant="outline" size="sm">Cardio</Button>
              <Button variant="outline" size="sm">Core</Button>
              <Button variant="outline" size="sm">Flexibility</Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" /> More Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Exercises Grid */}
      <section className="wellzone-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exercises.map((exercise) => (
            <Card key={exercise.id} className="wellzone-card overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={exercise.image} 
                  alt={exercise.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                  <span className="text-sm font-medium">{exercise.category}</span>
                </div>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">{exercise.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                
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
                    <span className="text-muted-foreground">{exercise.duration}</span>
                  </div>
                  <span className="px-2 py-1 bg-muted rounded-full text-xs">
                    {exercise.difficulty}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/exercises/${exercise.id}`}>
                    View Exercise <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Workout Plans Section */}
      <section className="wellzone-section bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Workout Plans</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Follow our structured workout plans designed by fitness professionals to achieve specific goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Beginner Full Body",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                description: "Perfect for beginners looking to build a foundation of strength and fitness.",
                duration: "4 weeks",
                sessions: "3 sessions/week",
                level: "Beginner"
              },
              {
                title: "Weight Loss Challenge",
                image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
                description: "High-intensity workouts designed to maximize calorie burn and fat loss.",
                duration: "6 weeks",
                sessions: "4-5 sessions/week",
                level: "Intermediate"
              },
              {
                title: "Core Strength Builder",
                image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                description: "Focus on building a strong core for better posture and performance.",
                duration: "4 weeks",
                sessions: "3 sessions/week",
                level: "All levels"
              }
            ].map((plan, index) => (
              <Card key={index} className="wellzone-card overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={plan.image} 
                    alt={plan.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{plan.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span>{plan.sessions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <span>{plan.level}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/workout-plans/${index + 1}`}>
                      View Plan <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}