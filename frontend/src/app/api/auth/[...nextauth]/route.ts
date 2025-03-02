import NextAuth from "next-auth";
import User from "../../../../models/user";
import connectToDatabase from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();

          // Find the user by email
          const user = await User.findOne({ email: credentials?.email }).exec();
          if (!user) {
            throw new Error("User not found");
          }

          // Compare the provided password with the hashed password in the database
          const isValidPassword = await bcrypt.compare(
            credentials?.password ?? "",
            user.password as string
          );
          if (!isValidPassword) {
            throw new Error("Invalid password");
            
          }
          

         
        } catch  {
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
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email,
          name: token.name,
          image: token.picture,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "../../../register", // Redirect to this page for sign-in
  },
  secret: process.env.NEXTAUTH_SECRET, 
});

export { handler as GET, handler as POST };