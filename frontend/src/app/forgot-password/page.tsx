"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Mail, TriangleAlert } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ForgotPassword(){
  const [email, setEmail] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("../../sidebar.jsx");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");


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
          setMessage(data.message);
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

    setLoading(false);
  };

  if (sessionStatus === "loading") {
    return <h4>Loading...</h4>;
  }

  if (sessionStatus === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Forgot Password</h1>
            <p className="text-gray-600 mt-2">
              Enter your email address to reset your password.
            </p>
          </div>

          {!!error && (
            <div className="bg-red-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-500">
              <TriangleAlert className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          {!!success && (
            <div className="bg-green-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-500">
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
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  disabled={pending}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-md font-medium shadow-sm hover:shadow-md transition-all"
              disabled={pending}
            >
              {pending ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link href="/login" className="text-cyan-600 hover:underline">
                Login here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

