"use server"

import { revalidatePath } from "next/cache"
import { connectToDatabase } from "./api/mongodb"
import { ObjectId } from "mongodb"

interface AppointmentData {
  name: string
  email: string
  date: string
  timeSlot: string
  doctor: string
  notes: string
}

interface Appointment {
  id: string
  doctor: string
  date: string
  time: string
  status: "pending" | "confirmed" | "cancelled"
  notes?: string
}

export async function bookAppointment(data: AppointmentData) {
  try {
    const { db } = await connectToDatabase()

    // Format the trainer name from the ID
    const doctorName = data.doctor
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    // Format the time
    const time = data.timeSlot.includes(":")
      ? data.timeSlot
      : `${
          Number.parseInt(data.timeSlot) > 12 ? Number.parseInt(data.timeSlot) - 12 : data.timeSlot
        }:00 ${Number.parseInt(data.timeSlot) >= 12 ? "PM" : "AM"}`

    // Create appointment document
    const appointmentDoc = {
      name: data.name,
      email: data.email,
      doctor: doctorName,
      doctorID: data.doctor,
      date: data.date,
      time: time,
      status: "pending",
      notes: data.notes,
      createdAt: new Date(),
    }

    // Insert into MongoDB
    const result = await db.collection("doctorAppointments").insertOne(appointmentDoc)

    revalidatePath("/gym-trainer/my-appointments")
    return { success: true, appointmentId: result.insertedId.toString() }
  } catch (error) {
    console.error("Error booking appointment:", error)
    throw new Error("Failed to book appointment")
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  try {
    const { db } = await connectToDatabase()

    // Fetch appointments from MongoDB
    const appointmentDocs = await db.collection("doctorAppointments").find({}).sort({ createdAt: -1 }).toArray()

    // Convert MongoDB documents to JSON and format for frontend
    const appointments = appointmentDocs.map((doc) => ({
      id: doc._id.toString(),
      doctor: doc.trainer,
      date: doc.date,
      time: doc.time,
      status: doc.status,
      notes: doc.notes,
    }))

    return appointments
  } catch (error) {
    console.error("Error fetching appointments:", error)
    throw new Error("Failed to fetch appointments")
  }
}

export async function cancelAppointment(id: string) {
  try {
    const { db } = await connectToDatabase()

    // Update appointment status in MongoDB
    const result = await db
      .collection("doctorAppointments")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status: "cancelled", updatedAt: new Date() } })

    if (result.modifiedCount === 0) {
      throw new Error("Appointment not found or already cancelled")
    }

    revalidatePath("/gym-trainer/my-appointments")
    return { success: true }
  } catch (error) {
    console.error("Error cancelling appointment:", error)
    throw new Error("Failed to cancel appointment")
  }
}

