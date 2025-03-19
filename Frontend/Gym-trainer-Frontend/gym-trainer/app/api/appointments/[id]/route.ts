import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase, convertDocToJSON } from "@/lib/api/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { db } = await connectToDatabase()

    // Fetch appointment from MongoDB
    const appointment = await db.collection("appointments").findOne({
      _id: new ObjectId(id),
    })

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }

    return NextResponse.json({
      appointment: convertDocToJSON(appointment),
    })
  } catch (error) {
    console.error("Error fetching appointment:", error)
    return NextResponse.json({ error: "Failed to fetch appointment" }, { status: 500 })
  }
}
