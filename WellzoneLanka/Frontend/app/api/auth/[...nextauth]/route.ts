import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../../../../models/user";
import connectToDatabase from "../../../../lib/db";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

declare module "next-auth" {
  interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
  }
  interface Session {
    user: {
      id?: string;
      email?: string;
      name?: string;
      firstName?: string;
      lastName?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    firstName?: string;
    lastName?: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
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
          await connectToDatabase();
          
          const user = await User.findOne({ email: credentials?.email });
          if (!user) return null;

          const isValid = await bcrypt.compare(credentials?.password || "", user.password);
          if (!isValid) return null;

          return {
            id: user._id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Handle Google sign-in
      if (account?.provider === "google") {
        try {
          await connectToDatabase();
          
          // Check if user exists in database
          let dbUser = await User.findOne({ email: profile?.email });
          
          if (!dbUser) {
            // Create new user if doesn't exist
            const nameParts = profile?.name?.split(' ') || [];
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';
            
            dbUser = new User({
              email: profile?.email,
              firstName,
              lastName,
              password: '', // Google users won't have password
            });
            await dbUser.save();
          }
          
          token.id = dbUser._id.toString();
          token.email = dbUser.email;
          token.name = `${dbUser.firstName} ${dbUser.lastName}`;
          token.firstName = dbUser.firstName;
          token.lastName = dbUser.lastName;
        } catch (error) {
          console.error("Error handling Google sign-in:", error);
        }
      }
      
      // Handle credentials sign-in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/services",
    signOut: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };