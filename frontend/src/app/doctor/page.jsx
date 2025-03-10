"use client";

import { useState, useEffect } from "react";
import { Clipboard, Eye, EyeOff, TriangleAlert, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../Navbar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    licenseNumber: "",
    experience: "",
    hospital: "",
    bio: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = ["/assets/doctor1.png", "/assets/doctor2.png", "/assets/doctor3.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setPending(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/doctor-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setPending(false);
        toast.success(data.message);
        router.push("../verification-pending");
      } else {
        setError(data.message || "An unexpected error occurred.");
        setPending(false);
      }
    } catch (error) {
      setPending(false);
      setError("An error occurred while submitting the form.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-64 -left-64 w-96 h-96 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-cyan-500 opacity-5 rounded-full blur-3xl"></div>
      </div>

      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6" style={{ paddingTop: "120px" }}>
          <div className="md:col-span-5 rounded-lg overflow-hidden shadow-xl relative">
            <div className="relative w-full" style={{ height: "680px" }}>
              {images.map((src, index) => (
                <div
                  key={index}
                  className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                  style={{
                    opacity: currentImageIndex === index ? 1 : 0,
                    zIndex: currentImageIndex === index ? 10 : 0,
                  }}
                >
                  <Image
                    src={src}
                    alt={`Doctor Image ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transform hover:scale-105 transition-transform duration-700"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              ))}

              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <h2 className="text-white text-4xl font-bold mb-3">Join Our Medical Network</h2>
                <p className="text-white/90 text-xl mb-4">Connect with patients and improve healthcare access</p>

                <div className="flex items-center space-x-2 mt-6">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentImageIndex === index ? "w-10 bg-blue-500" : "w-3 bg-white/70"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="bg-white p-10 rounded-lg border border-gray-200 shadow-lg">
              <h1 className="text-3xl font-bold text-gray-800">Doctor Registration</h1>
              <h2 className="text-xl font-medium text-gray-600">
                Join the <span className="text-blue-600 font-semibold">WellZone Lanka</span> healthcare network
              </h2>

              {error && (
                <div className="bg-red-500 p-3 rounded-md flex items-center gap-x-2 text-sm text-white mb-6 justify-center">
                  <TriangleAlert />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  placeholder="First Name"
                  className="input-field"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input-field"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <select
                  className="input-field"
                  value={form.specialization}
                  onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                  required
                >
                  <option value="">Select specialization</option>
                  <option value="General Practitioner">General Practitioner</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                </select>
                <input
                  type="text"
                  placeholder="License Number"
                  className="input-field"
                  value={form.licenseNumber}
                  onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Years of Experience"
                  className="input-field"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Hospital/Clinic"
                  className="input-field"
                  value={form.hospital}
                  onChange={(e) => setForm({ ...form, hospital: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Bio"
                  className="input-field"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  maxLength={300}
                  required
                />
                <button type="submit" className="btn-primary" disabled={pending}>
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
