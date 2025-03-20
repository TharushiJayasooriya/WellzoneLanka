"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, TriangleAlert } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("../../sidebar.jsx");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError("");
    setSuccess("");

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setPending(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (res.ok) {
          setSuccess(data.message || "Password reset link sent to your email address.");
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Unexpected error. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to connect to the server. Try again later.");
    }

    setPending(false);
  };

  if (sessionStatus === "loading") {
    return <h4>Loading...</h4>;
  }

  if (sessionStatus === "authenticated") {
    return null;
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        background: "url('/assets/fgpw.png') center center no-repeat",
        backgroundSize: "cover",
        backgroundColor: "#e6f2f7"
      }}
    >
      <div className="max-w-md w-full bg-white/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden p-8">
        <div className="text-center mb-8">
          {/* WellZone Lanka Logo with Black Line */}
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center mb-2">
              <Image src="/assets/lgo.png" alt="Logo" width={60} height={60} className="hover:scale-105 transition-transform duration-300" />
              <span className="ml-2 text-xl font-bold text-black">WellZone Lanka</span>
            </div>
            <div className="h-px bg-black w-52 mt-1"></div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mt-6">Forgot <span className="text-cyan-500">password</span></h1>
          <p className="text-gray-600 mt-2">Enter your email address to reset your password</p>
        </div>

        {error && (
          <div className="bg-red-50/70 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-600 mb-6 border border-red-100">
            <TriangleAlert className="h-4 w-4 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50/70 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-600 mb-6 border border-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p>{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full pl-4 pr-10 py-3 bg-gray-50/70 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                disabled={pending}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="absolute top-1/2 right-3 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
            disabled={pending}
          >
            {pending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : "Send Reset Link"}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link href="/login" className="text-cyan-600 hover:text-cyan-800 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}