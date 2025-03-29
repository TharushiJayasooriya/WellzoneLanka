"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { bookDoctorAppointment } from "@/app/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

export default function BookDoctorAppointmentPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submittedData, setSubmittedData] = useState({
    name: "",
    email: "",
    date: "",
    timeSlot: "",
    doctor: "",
    symptoms: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    timeSlot: "",
    doctor: "",
    symptoms: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using the same action for now, but ideally would have a separate action for doctor appointments
      await bookDoctorAppointment(formData);

      // Save the submitted data before resetting the form
      setSubmittedData({ ...formData });

      // Show toast notification
      toast({
        title: "Appointment Requested",
        description:
          "Your doctor appointment request has been submitted successfully.",
      });

      // Show success dialog
      setShowSuccessDialog(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        date: "",
        timeSlot: "",
        doctor: "",
        symptoms: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your appointment request.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center mb-8">
        <Link href="/doctor-dash" className="mr-4">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            Back
          </button>
        </Link>
        <h1 className="text-3xl font-bold">Book a Doctor Appointment</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Schedule a Doctor Consultation</h2>
          <p className="text-gray-600">
            Fill out the form below to request an appointment with one of our
            healthcare professionals.
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Patient Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Preferred Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="timeSlot"
                  className="block text-sm font-medium text-gray-700"
                >
                  Preferred Time
                </label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={(e) =>
                    handleSelectChange("timeSlot", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Select a time slot</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="doctor"
                className="block text-sm font-medium text-gray-700"
              >
                Doctor
              </label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={(e) => handleSelectChange("doctor", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">Select a doctor</option>
                <option value="dr-smith">Dr. Smith (General Physician)</option>
                <option value="dr-patel">Dr. Patel (Cardiologist)</option>
                <option value="dr-johnson">Dr. Johnson (Pediatrician)</option>
                <option value="dr-williams">
                  Dr. Williams (Dermatologist)
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="symptoms"
                className="block text-sm font-medium text-gray-700"
              >
                Symptoms or Reason for Visit
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                placeholder="Please describe your symptoms or reason for the appointment"
                value={formData.symptoms}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <p className="text-sm text-gray-500">
                This information helps the doctor prepare for your consultation.
              </p>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-sky-500 text-white rounded-3xl hover:bg-sky-700 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Request Appointment"}
            </button>
          </form>
        </div>
        <div className="p-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>
            Your appointment request will be reviewed by the doctor, and
            you&apos;ll receive a confirmation email once approved.
          </p>
        </div>
      </div>

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-bold">
                Doctor Appointment Booked Successfully
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Your appointment request has been submitted and is pending
              approval from the doctor.
            </p>
            <div className="grid gap-4 mb-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium col-span-1">Patient:</p>
                <p className="col-span-3">
                  {submittedData.name || "Not provided"}
                </p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium col-span-1">Date:</p>
                <p className="col-span-3">
                  {submittedData.date || "Not provided"}
                </p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium col-span-1">Time:</p>
                <p className="col-span-3">
                  {submittedData.timeSlot || "Not provided"}
                </p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium col-span-1">Doctor:</p>
                <p className="col-span-3">
                  {submittedData.doctor
                    ? submittedData.doctor
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")
                    : "Not provided"}
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-700 transition-colors"
                onClick={() => setShowSuccessDialog(false)}
              >
                View My Appointments
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
