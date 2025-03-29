"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/app/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking doctor authentication...");
        const session = await getSession();
        console.log("Session data:", session);

        if (!session) {
          console.log("No session found, redirecting to auth page");
          // Redirect to auth page if not logged in
          router.push("/doctor-dash");
          return;
        }

        // Check if user is a doctor
        if (session.role !== "doctor") {
          console.log("User is not a doctor, redirecting to home");
          toast({
            title: "Access Denied",
            description: "You need a doctor account to access this section.",
            variant: "destructive",
          });
          router.push("/");
          return;
        }

        console.log("Authentication successful, user is a doctor");
        setIsLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/doctor-auth");
      }
    };

    checkAuth();
  }, [router, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
