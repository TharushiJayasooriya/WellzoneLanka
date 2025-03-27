import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "../../../../models/user";
import connectToDatabase from "../../../../lib/db";
import dotenv from "dotenv";

dotenv.config();

// Ensure required environment variables are set
const mongoUri = process.env.MONGODB_URI;
const authSecret = process.env.NEXTAUTH_SECRET;

if (!mongoUri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}
if (!authSecret) {
  throw new Error("Please define the NEXTAUTH_SECRET environment variable");
}

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing email or password");
          }

          console.log("🔍 Checking credentials for:", credentials.email.trim());

          // Connect to database
          await connectToDatabase();

          // Find user by email (Trim email to avoid leading/trailing spaces)
          const user = await User.findOne({ email: credentials.email.trim() }).exec() as { _id: string; email: string; password: string; firstName?: string; lastName?: string };
          
          if (!user) {
            console.error("🚫 User not found:", credentials.email);
            throw new Error("User not found");
          }

          console.log("✅ User found in DB:", user.email);

          // Debugging: Log stored password format
          console.log("🔑 Stored password (hashed):", user.password);

          // Compare provided password with hashed password
          const isValidPassword = await bcrypt.compare(credentials.password.trim(), user.password);

          console.log("🛠 Password match:", isValidPassword);

          if (!isValidPassword) {
            console.error("❌ Invalid password for user:", credentials.email);
            throw new Error("Invalid password");
          }

          // Handle cases where firstName and lastName might be missing
          const fullName = user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.email;

          return {
            id: user._id.toString(),
            email: user.email,
            name: fullName,
          };
        } catch (error) {
          if (error instanceof Error) {
            console.error("⚠️ Authorization error:", error.message);
          } else {
            console.error("⚠️ Authorization error:", error);
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email ?? undefined,
        name: token.name ?? undefined,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: authSecret,
});

export { handler as GET, handler as POST };
