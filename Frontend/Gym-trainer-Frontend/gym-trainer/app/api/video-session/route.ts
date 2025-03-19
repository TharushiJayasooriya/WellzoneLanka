import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase, convertDocToJSON } from "@/lib/api/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.appointmentId || !data.hostEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Check if appointment exists
    const appointment = await db.collection("appointments").findOne({
      _id: new ObjectId(data.appointmentId),
    })

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }

    // Create video session document
    const sessionDoc = {
      appointmentId: data.appointmentId,
      hostEmail: data.hostEmail,
      participants: data.participants || [data.hostEmail, appointment.email],
      status: "active",
      startTime: new Date(),
      createdAt: new Date(),
    }

    // Insert into MongoDB
    const result = await db.collection("videoSessions").insertOne(sessionDoc)

    // In a real app, this would integrate with a video service API
    // For demo purposes, generate a session token
    const sessionToken = Buffer.from(`${result.insertedId}:${Date.now()}`).toString("base64")

    return NextResponse.json({
      success: true,
      sessionId: result.insertedId.toString(),
      joinUrl: `/gym-trainer/video-session?session=${result.insertedId}`,
      token: sessionToken,
    })
  } catch (error) {
    console.error("Error creating video session:", error)
    return NextResponse.json({ error: "Failed to create video session" }, { status: 500 })
  }
}