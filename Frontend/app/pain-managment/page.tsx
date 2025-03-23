import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { 
  Activity, 
  ArrowRight, 
  Info
} from "lucide-react";

export default function PainManagement() {
  // Pain areas with their descriptions and images
  const painAreas = [
    {
      id: "neck",
      name: "Neck Pain",
      description: "Pain in the neck area, often caused by poor posture, stress, or muscle strain.",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      exercises: 8
    },
    {
      id: "shoulder",
      name: "Shoulder Pain",
      description: "Pain in the shoulder joint or surrounding muscles, often due to overuse or injury.",
      image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      exercises: 12
    },
    {
      id: "back",
      name: "Back Pain",
      description: "Pain in the upper, middle, or lower back, often caused by poor posture or muscle strain.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1220&q=80",
      exercises: 15
    },
    {
      id: "knee",
      name: "Knee Pain",
      description: "Pain in or around the knee joint, often due to injury, overuse, or arthritis.",
      image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      exercises: 10
    },
    {
      id: "hip",
      name: "Hip Pain",
      description: "Pain in the hip joint or surrounding area, often due to arthritis, bursitis, or muscle strain.",
      image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
      exercises: 9
    },
    {
      id: "wrist",
      name: "Wrist Pain",
      description: "Pain in the wrist, often due to repetitive strain, carpal tunnel syndrome, or injury.",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
      exercises: 7
    },
    {
      id: "ankle",
      name: "Ankle Pain",
      description: "Pain in the ankle joint, often due to sprains, strains, or overuse injuries.",
      image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
      exercises: 8
    },
    {
      id: "elbow",
      name: "Elbow Pain",
      description: "Pain in the elbow joint, often due to tennis elbow, golfer's elbow, or overuse.",
      image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      exercises: 6
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Pain Management <span className="text-primary">& Relief</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Identify your pain areas and discover targeted exercises designed to alleviate discomfort,
              improve mobility, and strengthen the affected areas.
            </p>
          </div>
        </div>
      </section>

      {/* Pain Areas Section */}
      <section className="wellzone-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Select Your Pain Area</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Click on the area where you're experiencing pain to see recommended exercises and relief techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {painAreas.map((area) => (
            <Card key={area.id} className="wellzone-card overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={area.image} 
                  alt={area.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">{area.name}</h3>
                <p className="text-sm text-muted-foreground">{area.description}</p>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Activity className="h-4 w-4 mr-1" />
                  <span>{area.exercises} exercises available</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/pain-management/${area.id}`} className="flex items-center justify-center">
                    View Exercises <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Pain Assessment Section */}
      <section className="wellzone-section bg-muted">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Not Sure Where to Start?</h2>
              <p className="text-muted-foreground mb-6">
                Take our comprehensive pain assessment to receive personalized exercise recommendations
                tailored to your specific condition and needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/pain-assessment">Take Pain Assessment</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/chat">Chat with Our AI</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Pain assessment" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="wellzone-section">
        <div className="max-w-4xl mx-auto bg-accent/10 p-6 rounded-lg border border-accent/20">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <Info className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Important Health Notice</h3>
              <p className="text-muted-foreground mb-4">
                While our exercises are designed to help alleviate pain, they are not a substitute for professional medical advice.
                If you're experiencing severe or persistent pain, please consult with a healthcare professional.
              </p>
              <p className="text-sm text-muted-foreground">
                Always start slowly with any new exercise routine and stop immediately if you experience increased pain or discomfort.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}