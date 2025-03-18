"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { TriangleAlert } from "lucide-react";

const ResetPasswordPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const token = params?.token as string;
  const [error, setError] = useState<string>("");
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError("No token found in URL.");
        return;
      }

      try {
        const res = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) {
          setError("Invalid token or it has expired.");
        } else {
          const data = await res.json();
          setEmail(data.email); // Store the email for reset
          setVerified(true);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    };

    // Avoid multiple token checks
    if (!verified) {
      verifyToken();
    }
  }, [token, verified]); // `verified` ensures we don't repeat the check

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/sidebar");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (!email) {
      setError("Email not found. Please request a new reset link.");
      return;
    }

    setPending(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, email }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        setError(message || "Failed to reset password.");
      } else {
        toast.success("Password reset successfully!");
        router.replace("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Reset Password</h1>
            <p className="text-gray-600 mt-2">Enter a new password for your account.</p>
          </div>

          {error && (
            <div className="bg-red-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-500">
              <TriangleAlert className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                disabled={pending}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm your new password"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                disabled={pending}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-md font-medium shadow-sm hover:shadow-md transition-all"
              disabled={pending || error.length > 0}
            >
              {pending ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
