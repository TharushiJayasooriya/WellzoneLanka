import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();
  const { name, email, password, role } = await req.json();

  if (!name || !email || !password || !role) {
    return new Response("Missing fields", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role });

  try {
    await newUser.save();
    return new Response(JSON.stringify({ message: "User registered" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Email already exists" }), { status: 400 });
  }
}
