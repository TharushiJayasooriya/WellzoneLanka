import { Button } from "../components/ui/button";
import Link from "next/link";
import { ArrowRight, Activity, Heart, Calendar, Video } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:py-32 flex flex-col items-center justify-center text-center bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Your Journey to Physical Wellness Starts Here
          </h1>
          <p className="text-lg text-muted-foreground">
            Connect with Sri Lanka's leading physiotherapists and wellness experts for personalized care and treatment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Wellzone Lanka</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Activity className="h-10 w-10" />}
              title="Expert Assessment"
              description="Comprehensive physical evaluation and personalized treatment plans"
            />
            <FeatureCard
              icon={<Heart className="h-10 w-10" />}
              title="Specialized Care"
              description="Access to qualified physiotherapists and wellness experts"
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10" />}
              title="Easy Scheduling"
              description="Book appointments with your preferred healthcare provider"
            />
            <FeatureCard
              icon={<Video className="h-10 w-10" />}
              title="Virtual Sessions"
              description="Connect with doctors through video consultations"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}