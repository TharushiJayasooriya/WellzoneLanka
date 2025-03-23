"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Play, 
  Info, 
  Camera, 
  Clock, 
  BarChart, 
  CheckCircle2
} from "lucide-react";

// Mock data for pain areas and their exercises
const painAreasData = {
  neck: {
    name: "Neck Pain",
    description: "Exercises to relieve neck pain and improve mobility.",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    exercises: [
      {
        id: "neck-1",
        name: "Neck Stretches",
        description: "Gentle stretches to relieve tension in the neck muscles.",
        difficulty: "Beginner",
        duration: "5 minutes",
        videoUrl: "https://www.youtube.com/embed/X3-gKPNyrTA?si=TgTQg0AdXA_Uy-Wd",
        steps: [
          "Sit or stand with a straight back.",
          "Slowly tilt your head toward your right shoulder until you feel a stretch.",
          "Hold for 15-30 seconds, then return to center.",
          "Repeat on the left side.",
          "Do 3 sets on each side."
        ],
        benefits: [
          "Relieves neck tension",
          "Improves range of motion",
          "Reduces stiffness"
        ]
      },
      {
        id: "neck-2",
        name: "Chin Tucks",
        description: "Strengthens deep neck flexors and improves posture.",
        difficulty: "Beginner",
        duration: "3 minutes",
        videoUrl: "https://www.youtube.com/embed/wQylqaCl8Zo?si=9I-Od1odlQHKvMHB",
        steps: [
          "Sit or stand with a straight back.",
          "Keep your eyes fixed on a point directly in front of you.",
          "Pull your chin straight back, creating a 'double chin'.",
          "Hold for 5 seconds, then relax.",
          "Repeat 10 times."
        ],
        benefits: [
          "Strengthens neck muscles",
          "Improves posture",
          "Reduces forward head posture"
        ]
      },
      {
        id: "neck-3",
        name: "Shoulder Blade Squeezes",
        description: "Strengthens upper back muscles to support the neck.",
        difficulty: "Beginner",
        duration: "4 minutes",
        videoUrl: "https://www.youtube.com/embed/LwW1zWSZYXA?si=aBCDEfGhIjKlMnOp",
        steps: [
          "Sit or stand with a straight back.",
          "Relax your shoulders.",
          "Squeeze your shoulder blades together.",
          "Hold for 5 seconds, then relax.",
          "Repeat 10-15 times."
        ],
        benefits: [
          "Strengthens upper back",
          "Improves posture",
          "Reduces neck strain"
        ]
      }
    ]
  },
  back: {
    name: "Back Pain",
    description: "Exercises to relieve back pain and strengthen core muscles.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1220&q=80",
    exercises: [
      {
        id: "back-1",
        name: "Cat-Cow Stretch",
        description: "Gentle yoga movement to improve spine flexibility.",
        difficulty: "Beginner",
        duration: "5 minutes",
        videoUrl: "https://www.youtube.com/embed/kqnua4rHVVA?si=TgTQg0AdXA_Uy-Wd",
        steps: [
          "Start on your hands and knees in a tabletop position.",
          "For Cat: Exhale and round your spine toward the ceiling.",
          "For Cow: Inhale and arch your back, lifting your head and tailbone.",
          "Move slowly between the two positions.",
          "Repeat 10-15 times."
        ],
        benefits: [
          "Improves spine flexibility",
          "Relieves back tension",
          "Strengthens core muscles"
        ]
      },
      {
        id: "back-2",
        name: "Bird Dog",
        description: "Strengthens core, back, and hip muscles.",
        difficulty: "Intermediate",
        duration: "6 minutes",
        videoUrl: "https://www.youtube.com/embed/wiFNA3sqjCA?si=9I-Od1odlQHKvMHB",
        steps: [
          "Start on your hands and knees in a tabletop position.",
          "Extend your right arm forward and left leg backward.",
          "Keep your spine neutral and core engaged.",
          "Hold for 5 seconds, then return to starting position.",
          "Repeat with left arm and right leg.",
          "Do 10 repetitions on each side."
        ],
        benefits: [
          "Strengthens core muscles",
          "Improves balance",
          "Stabilizes spine"
        ]
      },
      {
        id: "back-3",
        name: "Pelvic Tilts",
        description: "Gentle exercise to strengthen lower back and core.",
        difficulty: "Beginner",
        duration: "4 minutes",
        videoUrl: "https://www.youtube.com/embed/44D6Xc2Fkek?si=aBCDEfGhIjKlMnOp",
        steps: [
          "Lie on your back with knees bent and feet flat on the floor.",
          "Flatten your lower back against the floor by tightening your abdominal muscles.",
          "Hold for 5 seconds, then relax.",
          "Repeat 10-15 times."
        ],
        benefits: [
          "Strengthens core muscles",
          "Relieves lower back pain",
          "Improves pelvic stability"
        ]
      }
    ]
  },
  shoulder: {
    name: "Shoulder Pain",
    description: "Exercises to relieve shoulder pain and improve mobility.",
    image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    exercises: [
      {
        id: "shoulder-1",
        name: "Pendulum Exercise",
        description: "Gentle exercise to improve shoulder mobility.",
        difficulty: "Beginner",
        duration: "3 minutes",
        videoUrl: "https://www.youtube.com/embed/tzjGMdEH0Ek?si=TgTQg0AdXA_Uy-Wd",
        steps: [
          "Lean forward and support yourself with your non-affected arm.",
          "Let your affected arm hang down completely relaxed.",
          "Gently swing your arm in small circles.",
          "Gradually increase the size of the circles.",
          "Do for 1-2 minutes."
        ],
        benefits: [
          "Improves shoulder mobility",
          "Reduces pain and stiffness",
          "Increases blood flow to the shoulder"
        ]
      },
      {
        id: "shoulder-2",
        name: "Wall Slides",
        description: "Strengthens shoulder muscles and improves posture.",
        difficulty: "Intermediate",
        duration: "5 minutes",
        videoUrl: "https://www.youtube.com/embed/M_ooIhKYs7c?si=9I-Od1odlQHKvMHB",
        steps: [
          "Stand with your back against a wall.",
          "Place your arms against the wall in a 'W' position.",
          "Slowly slide your arms up the wall into a 'Y' position.",
          "Slide back down to the 'W' position.",
          "Repeat 10-15 times."
        ],
        benefits: [
          "Strengthens shoulder muscles",
          "Improves posture",
          "Increases shoulder stability"
        ]
      },
      {
        id: "shoulder-3",
        name: "External Rotation",
        description: "Strengthens rotator cuff muscles.",
        difficulty: "Intermediate",
        duration: "4 minutes",
        videoUrl: "https://www.youtube.com/embed/3lbUw5RsAQ8?si=aBCDEfGhIjKlMnOp",
        steps: [
          "Stand with your elbow bent at 90 degrees and tucked against your side.",
          "Hold a light weight or resistance band.",
          "Keeping your elbow against your side, rotate your forearm outward.",
          "Slowly return to the starting position.",
          "Do 10-15 repetitions on each side."
        ],
        benefits: [
          "Strengthens rotator cuff",
          "Improves shoulder stability",
          "Reduces risk of injury"
        ]
      }
    ]
  },
  knee: {
    name: "Knee Pain",
    description: "Exercises to relieve knee pain and strengthen surrounding muscles.",
    image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    exercises: [
      {
        id: "knee-1",
        name: "Straight Leg Raises",
        description: "Strengthens quadriceps without stressing the knee joint.",
        difficulty: "Beginner",
        duration: "5 minutes",
        videoUrl: "https://www.youtube.com/embed/Jf_hjHjVGzk?si=TgTQg0AdXA_Uy-Wd",
        steps: [
          "Lie on your back with one leg straight and the other bent.",
          "Tighten the thigh muscle of your straight leg.",
          "Slowly raise your straight leg to the height of your bent knee.",
          "Hold for 5 seconds, then slowly lower.",
          "Do 10-15 repetitions on each leg."
        ],
        benefits: [
          "Strengthens quadriceps",
          "Stabilizes knee joint",
          "Low impact on knee"
        ]
      },
      {
        id: "knee-2",
        name: "Hamstring Curls",
        description: "Strengthens hamstrings to support the knee.",
        difficulty: "Beginner",
        duration: "4 minutes",
        videoUrl: "https://www.youtube.com/embed/Nx8Rq89XZ_c?si=9I-Od1odlQHKvMHB",
        steps: [
          "Stand facing a wall or chair for support.",
          "Slowly bend your knee, bringing your heel toward your buttocks.",
          "Hold for 5 seconds, then slowly lower.",
          "Do 10-15 repetitions on each leg."
        ],
        benefits: [
          "Strengthens hamstrings",
          "Improves knee stability",
          "Enhances balance"
        ]
      },
      {
        id: "knee-3",
        name: "Wall Squats",
        description: "Strengthens quadriceps, hamstrings, and glutes.",
        difficulty: "Intermediate",
        duration: "6 minutes",
        videoUrl: "https://www.youtube.com/embed/YyvSfVjQeL0?si=aBCDEfGhIjKlMnOp",
        steps: [
          "Stand with your back against a wall, feet shoulder-width apart.",
          "Slowly slide down the wall until your knees are bent at about 45 degrees.",
          "Hold for 5-10 seconds, then slowly slide back up.",
          "Repeat 10 times."
        ],
        benefits: [
          "Strengthens leg muscles",
          "Improves knee stability",
          "Low impact on knee joint"
        ]
      }
    ]
  },
  hip: {
    name: "Hip Pain",
    description: "Exercises to relieve hip pain and improve mobility.",
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
    exercises: [
      {
        id: "hip-1",
        name: "Hip Bridges",
        description: "Strengthens glutes and improves hip stability.",
        difficulty: "Beginner",
        duration: "5 minutes",
        videoUrl: "https://www.youtube.com/embed/wPM8icPu6H8?si=TgTQg0AdXA_Uy-Wd",
        steps: [
          "Lie on your back with knees bent and feet flat on the floor.",
          "Tighten your abdominal and buttock muscles.",
          "Raise your hips to create a straight line from your knees to shoulders.",
          "Hold for 5 seconds, then slowly lower.",
          "Repeat 10-15 times."
        ],
        benefits: [
          "Strengthens glutes",
          "Improves hip stability",
          "Reduces lower back strain"
        ]
      },
      {
        id: "hip-2",
        name: "Clamshells",
        description: "Strengthens hip abductors and improves stability.",
        difficulty: "Beginner",
        duration: "4 minutes",
        videoUrl: "https://www.youtube.com/embed/aUa5ieLHRwQ?si=9I-Od1odlQHKvMHB",
        steps: [
          "Lie on your side with knees bent at 45 degrees.",
          "Keep your feet together and raise your top knee.",
          "Keep your pelvis stable and don't roll backward.",
          "Hold for 2 seconds, then lower.",
          "Do 15 repetitions on each side."
        ],
        benefits: [
          "Strengthens hip abductors",
          "Improves hip stability",
          "Reduces hip pain"
        ]
      },
      {
        id: "hip-3",
        name: "Hip Flexor Stretch",
        description: "Stretches tight hip flexors to reduce pain.",
        difficulty: "Beginner",
        duration: "3 minutes",
        videoUrl: "https://www.youtube.com/embed/YQmpO9VT2X4?si=aBCDEfGhIjKlMnOp",
        steps: [
          "Kneel on one knee with the other foot in front of you.",
          "Keep your back straight and tuck your pelvis under.",
          "Gently push your hips forward until you feel a stretch.",
          "Hold for 30 seconds, then switch sides.",
          "Repeat 3 times on each side."
        ],
        benefits: [
          "Reduces hip flexor tightness",
          "Improves hip mobility",
          "Reduces lower back pain"
        ]
      }
    ]
  },
  wrist: {
    name: "Wrist Pain",
    description: "Exercises to relieve wrist pain and improve flexibility.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
    exercises: [
      {
        id: "wrist-1",
        name: "Wrist Flexor Stretch",
        description: "Stretches the muscles on the inside of the forearm.",
        difficulty: "Beginner",
        duration: "3 minutes",
        videoUrl: "https://www.youtube.com/embed/B9bCWQdOEb4?si=TgTQg0AdXA_Uy-Wd",
        steps: [
          "Extend your arm with palm up.",
          "Use your other hand to gently pull your fingers back toward your body.",
          "Feel the stretch in your forearm.",
          "Hold for 15-30 seconds.",
          "Repeat 3 times on each arm."
        ],
        benefits: [
          "Reduces wrist tension",
          "Improves flexibility",
          "Relieves carpal tunnel symptoms"
        ]
      },
      {
        id: "wrist-2",
        name: "Wrist Extensor Stretch",
        description: "Stretches the muscles on the outside of the forearm.",
        difficulty: "Beginner",
        duration: "3 minutes",
        videoUrl: "https://www.youtube.com/embed/c2pDJ0rXoQk?si=9I-Od1odlQHKvMHB",
        steps: [
          "Extend your arm with palm down.",
          "Use your other hand to gently pull your hand down toward your body.",
          "Feel the stretch on the top of your forearm.",
          "Hold for 15-30 seconds.",
          "Repeat 3 times on each arm."
        ],
        benefits: [
          "Reduces wrist tension",
          "Improves flexibility",
          "Relieves tennis elbow symptoms"
        ]
      },
      {
        id: "wrist-3",
        name: "Wrist Rotations",
        description: "Improves wrist mobility and reduces stiffness.",
        difficulty: "Beginner",
        duration: "2 minutes",
        videoUrl: "https://www.youtube.com/embed/tSHvtB1Mbjg?si=aBCDEfGhIjKlMnOp",
        steps: [
          "Extend your arms in front of you.",
          "Make fists with both hands.",
          "Rotate your wrists in circles, 10 times clockwise.",
          "Rotate your wrists in circles, 10 times counterclockwise.",
          "Repeat 3 times."
        ],
        benefits: [
          "Improves wrist mobility",
          "Reduces stiffness",
          "Increases blood flow"
        ]
      }
    ]
  },
  ankle: {
    name: "Ankle Pain",
    description: "Exercises to relieve ankle pain and improve stability.",
    image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
    exercises: [
      {
        id: "ankle-1",
        name: "Ankle Circles",
        description: "Improves ankle mobility and reduces stiffness.",
        difficulty: "Beginner",
        duration: "3 minutes",
        videoUrl: "https://www.youtube.com/embed/V4P81Y8cL8k?si=TgTQg0AdXA_Uy-Wd",
        steps: [
          "Sit in a chair with your foot raised slightly off the floor.",
          "Rotate your ankle in a circular motion, 10 times clockwise.",
          "Rotate your ankle in a circular motion, 10 times counterclockwise.",
          "Repeat 3 times on each ankle."
        ],
        benefits: [
          "Improves ankle mobility",
          "Reduces stiffness",
          "Increases blood flow"
        ]
      },
      {
        id: "ankle-2",
        name: "Calf Raises",
        description: "Strengthens calf muscles to support the ankle.",
        difficulty: "Beginner",
        duration: "4 minutes",
        videoUrl: "https://www.youtube.com/embed/gwLzBJYoWlI?si=9I-Od1odlQHKvMHB",
        steps: [
          "Stand with feet hip-width apart, holding onto a chair for balance if needed.",
          "Slowly raise your heels off the floor, standing on your toes.",
          "Hold for 2 seconds, then slowly lower.",
          "Repeat 15 times."
        ],
        benefits: [
          "Strengthens calf muscles",
          "Improves ankle stability",
          "Enhances balance"
        ]
      },
      {
        id: "ankle-3",
        name: "Ankle Alphabet",
        description: "Improves ankle mobility and control.",
        difficulty: "Beginner",
        duration: "3 minutes",
        videoUrl: "https://www.youtube.com/embed/3sYdKGdpJR4?si=aBCDEfGhIjKlMnOp",
        steps: [
          "Sit in a chair with your foot raised slightly off the floor.",
          "Use your foot to 'write' the alphabet in the air.",
          "Move only your ankle, not your leg.",
          "Go through the entire alphabet once.",
          "Repeat with the other ankle."
        ],
        benefits: [
          "Improves ankle mobility",
          "Enhances motor control",
          "Reduces stiffness"
        ]
      }
    ]
  },
  elbow: {
    name: "Elbow Pain",
    description: "Exercises to relieve elbow pain and strengthen forearm muscles.",
    image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    exercises: [
      {
        id: "elbow-1",
        name: "Wrist Flexion and Extension",
        description: "Strengthens forearm muscles to support the elbow.",
        difficulty: "Beginner",
        duration: "4 minutes",
        videoUrl: "https://www.youtube.com/embed/clV5bdFJl_g?si=TgTQg0AdXA_Uy-Wd",
        steps: [
          "Sit with your forearm resting on a table, palm up.",
          "Hold a light weight (or a can of food).",
          "Slowly curl your wrist upward, then lower.",
          "Do 15 repetitions, then turn your palm down.",
          "Slowly curl your wrist upward, then lower.",
          "Do 15 repetitions on each arm."
        ],
        benefits: [
          "Strengthens forearm muscles",
          "Reduces elbow strain",
          "Improves grip strength"
        ]
      },
      {
        id: "elbow-2",
        name: "Forearm Pronation and Supination",
        description: "Improves forearm rotation and reduces elbow pain.",
        difficulty: "Beginner",
        duration: "3 minutes",
        videoUrl: "https://www.youtube.com/embed/qV3lKhxjPpw?si=9I-Od1odlQHKvMHB",
        steps: [
          "Sit with your elbow bent at 90 degrees, forearm supported.",
          "Hold a light weight (or a hammer).",
          "Slowly rotate your palm up toward the ceiling.",
          "Then rotate your palm down toward the floor.",
          "Do 15 repetitions on each arm."
        ],
        benefits: [
          "Improves forearm rotation",
          "Reduces elbow pain",
          "Strengthens supporting muscles"
        ]
      },
      {
        id: "elbow-3",
        name: "Triceps Stretch",
        description: "Stretches the triceps muscle to reduce elbow tension.",
        difficulty: "Beginner",
        duration: "3 minutes",
        videoUrl: "https://www.youtube.com/embed/Jf_hjHjVGzk?si=aBCDEfGhIjKlMnOp",
        steps: [
          "Raise your arm overhead.",
          "Bend your elbow so your hand reaches toward the opposite shoulder blade.",
          "Use your other hand to gently pull your elbow back.",
          "Hold for 15-30 seconds.",
          "Repeat 3 times on each arm."
        ],
        benefits: [
          "Reduces elbow tension",
          "Improves flexibility",
          "Relieves tennis elbow symptoms"
        ]
      }
    ]
  }
};

export default function PainAreaPage() {
  const params = useParams();
  const areaId = params.area as string;
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  // Get the pain area data
  const painArea = painAreasData[areaId as keyof typeof painAreasData];

  // If the pain area doesn't exist, show a message
  if (!painArea) {
    return (
      <div className="wellzone-section text-center">
        <h1 className="text-3xl font-bold mb-4">Pain Area Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The requested pain area could not be found. Please try another area.
        </p>
        <Button asChild>
          <Link href="/pain-management">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Pain Management
          </Link>
        </Button>
      </div>
    );
  }

  // Get the selected exercise
  const exercise = selectedExercise 
    ? painArea.exercises.find(ex => ex.id === selectedExercise) 
    : null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Button asChild variant="outline" className="mb-4">
                <Link href="/pain-management">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Pain Areas
                </Link>
              </Button>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {painArea.name} <span className="text-primary">Exercises</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {painArea.description}
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src={painArea.image} 
                alt={painArea.name} 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Exercise Content */}
      <section className="wellzone-section">
        {!selectedExercise ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Recommended Exercises</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Select an exercise to view detailed instructions and start your recovery journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {painArea.exercises.map((exercise) => (
                <Card key={exercise.id} className="wellzone-card overflow-hidden">
                  <div className="relative aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={exercise.videoUrl}
                      title={exercise.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0"
                    ></iframe>
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">{exercise.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{exercise.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{exercise.duration}</span>
                      </div>
                      <div>
                        <span className="px-2 py-1 bg-muted rounded-full text-xs">
                          {exercise.difficulty}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => setSelectedExercise(exercise.id)}
                    >
                      View Exercise <Play className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-5xl mx-auto">
            <Button 
              variant="outline" 
              className="mb-6"
              onClick={() => {
                setSelectedExercise(null);
                setShowCamera(false);
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exercises
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="relative aspect-video mb-6">
                  {!showCamera ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={exercise?.videoUrl}
                      title={exercise?.name}
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
                    <Play className="mr-2 h-4 w-4" /> Watch Video
                  </Button>
                  <Button 
                    variant={showCamera ? "default" : "outline"}
                    onClick={() => setShowCamera(true)}
                  >
                    <Camera className="mr-2 h-4 w-4" /> Track My Form
                  </Button>
                </div>

                <Tabs defaultValue="instructions">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="instructions">Instructions</TabsTrigger>
                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                    <TabsTrigger value="tips">Tips & Precautions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="instructions" className="p-4 border rounded-md mt-2">
                    <h3 className="text-xl font-semibold mb-4">Step-by-Step Instructions</h3>
                    <ol className="space-y-2">
                      {exercise?.steps.map((step, index) => (
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
                      {exercise?.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="tips" className="p-4 border rounded-md mt-2">
                    <h3 className="text-xl font-semibold mb-4">Tips & Precautions</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1" />
                        <p>Start slowly and gradually increase intensity as your comfort level improves.</p>
                      </div>
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1" />
                        <p>Stop immediately if you experience sharp or increased pain.</p>
                      </div>
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1" />
                        <p>Maintain proper form to maximize benefits and prevent injury.</p>
                      </div>
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-1" />
                        <p>Consult with a healthcare professional before starting any new exercise program, especially if you have existing health conditions.</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div>
                <Card className="wellzone-card">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">{exercise?.name}</h3>
                    <p className="text-muted-foreground mb-6">{exercise?.description}</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Difficulty:</span>
                        <span className="px-2 py-1 bg-muted rounded-full text-xs">
                          {exercise?.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {exercise?.duration}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Target Area:</span>
                        <span>{painArea.name}</span>
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
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button className="w-full" onClick={() => setShowCamera(true)}>
                      <Camera className="mr-2 h-4 w-4" /> Start Exercise Tracking
                    </Button>
                    <Button variant="outline" className="w-full">
                      <BarChart className="mr-2 h-4 w-4" /> Log Completion
                    </Button>
                  </CardFooter>
                </Card>

                <div className="mt-6 bg-accent/10 p-4 rounded-lg border border-accent/20">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Important Notice</h4>
                      <p className="text-sm text-muted-foreground">
                        Stop immediately if you experience increased pain or discomfort. Consult a healthcare professional if symptoms persist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}