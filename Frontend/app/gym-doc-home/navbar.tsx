"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { getSession, logout } from "@/app/lib/auth";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        setUser(session);
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during logout.",
        variant: "destructive",
      });
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="fixed w-[95%] left-1/2 transform -translate-x-1/2 z-50 rounded-full mt-2 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="WellZone Lanka Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-2xl font-bold">WellZone Lanka</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#services"
              className="hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="#about"
              className="hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link href="#team" className="hover:text-primary transition-colors">
              Team
            </Link>
            <Link
              href="#contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>

            {!isLoading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-2 px-3"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="/placeholder.svg?height=32&width=32"
                            alt={user.name}
                          />
                          <AvatarFallback>
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start text-sm">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {user.email}
                          </span>
                        </div>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      {user.role === "doctor" && (
                        <DropdownMenuItem asChild>
                          <Link href="/doctor" className="cursor-pointer">
                            <span>Doctor Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {user.role === "trainer" && (
                        <DropdownMenuItem asChild>
                          <Link href="/gym-trainer" className="cursor-pointer">
                            <span>Trainer Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {user.role === "patient" && (
                        <DropdownMenuItem asChild>
                          <Link href="/patient" className="cursor-pointer">
                            <span>Patient Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer text-red-600"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href="/login"
                    className="bg-sky-500 text-white px-4 py-2 rounded-2xl hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            {!isLoading && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-1">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/80 backdrop-blur-md rounded-xl mt-2">
            <Link
              href="#services"
              className="block px-3 py-2 hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="#about"
              className="block px-3 py-2 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="#team"
              className="block px-3 py-2 hover:text-primary transition-colors"
            >
              Team
            </Link>
            <Link
              href="#contact"
              className="block px-3 py-2 hover:text-primary transition-colors"
            >
              Contact
            </Link>
            {!isLoading && !user && (
              <Link
                href="/login"
                className="block px-3 py-2 bg-sky-500 text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
