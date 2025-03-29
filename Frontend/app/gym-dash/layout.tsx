<<<<<<< HEAD


import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/app/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function GymTrainerLayout({
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
        const session = await getSession();

        if (!session) {
          // Redirect to auth page if not logged in
          router.push("/gym-dash");
          return;
        }

        // Check if user is a trainer
        if (session.role !== "trainer") {
          toast({
            title: "Access Denied",
            description: "You need a trainer account to access this section.",
            variant: "destructive",
          });
          router.push("/");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/gym-dash");
      }
    };

    checkAuth();
  }, [router, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
=======
"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/app/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function GymTrainerLayout({
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
        const session = await getSession();

        if (!session) {
          // Redirect to auth page if not logged in
          router.push("/gym-dash");
          return;
        }

        // Check if user is a trainer
        if (session.role !== "trainer") {
          toast({
            title: "Access Denied",
            description: "You need a trainer account to access this section.",
            variant: "destructive",
          });
          router.push("/");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/gym-dash");
      }
    };

    checkAuth();
  }, [router, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
>>>>>>> ca742aae (Merge branch 'refact' of https://github.com/wellzone-Lanka/WellzoneLanka into refact)
