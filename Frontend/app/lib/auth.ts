"use server"

import { cookies } from "next/headers"
import { connectToDatabase } from "@/app/lib/api/mongodb"
import { ObjectId } from "mongodb"

interface LoginData {
  email: string
  password: string
}

interface User {
  id: string
  name: string
  email: string
  role: "doctor" | "patient" | "trainer"
}

export async function login(data: LoginData) {
  try {
    const { db } = await connectToDatabase()

    // Find user by email
    const user = await db.collection("users").findOne({
      email: data.email,
    })

    // After finding the user
    console.log("User found:", user)

    if (!user) {
      return { success: false, message: "User not found" }
    }

    // In a real app, you would compare hashed passwords
    // For demo purposes, we're doing a simple comparison
    if (user.password !== data.password) {
      return { success: false, message: "Invalid password" }
    }

    // Create session
    const session = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    }

    // After creating the session
    console.log("Session created:", session)

    // Before setting the cookie
    console.log("Setting session cookie")

    // Store session in cookie
    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    // After setting the cookie
    console.log("Session cookie set")

    return {
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "An error occurred during login" }
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  // Remove the redirect here to handle it client-side
  return { success: true }
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  console.log("Getting session, cookie exists:", !!sessionCookie)

  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    console.log("Parsed session:", session)

    // Check if session is expired
    if (new Date(session.expires) < new Date()) {
      console.log("Session expired")
      const cookieStore = await cookies();
      cookieStore.delete("session");
      return null
    }

    return {
      id: session.userId,
      name: session.name,
      email: session.email,
      role: session.role,
    }
  } catch (error) {
    console.error("Error parsing session:", error)
    return null
  }
}

// async function ensureCollections() {
//   // Placeholder for ensuring collections.  Implementation depends on your database setup.
//   // For example, you might check if collections exist and create them if not.
//   // This is just a stub to be filled in with actual logic.
// }

export async function register(data: any) {
  try {
    const { db } = await connectToDatabase()

    // Ensure collections exist
    // await ensureCollections()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({
      email: data.email,
    })

    if (existingUser) {
      return { success: false, message: "User with this email already exists" }
    }

    // Create user document
    const userDoc = {
      name: data.name,
      email: data.email,
      password: data.password, // In a real app, hash this password
      role: data.role || "patient", // Default to patient if no role specified
      createdAt: new Date(),
    }

    // Insert into MongoDB
    const result = await db.collection("users").insertOne(userDoc)

    return {
      success: true,
      userId: result.insertedId.toString(),
      message: "User registered successfully",
    }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, message: "An error occurred during registration" }
  }
}

export async function getProfile(userId: string) {
  try {
    const { db } = await connectToDatabase()

    const user = await db.collection("users").findOne({
      _id: new ObjectId(userId),
    })

    if (!user) {
      return { success: false, message: "User not found" }
    }

    return {
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }
  } catch (error) {
    console.error("Get profile error:", error)
    return { success: false, message: "An error occurred while getting profile" }
  }
}