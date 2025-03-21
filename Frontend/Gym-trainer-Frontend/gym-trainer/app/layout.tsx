import type { ReactNode } from "react"; // Correct import for ReactNode
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/app/components/theme-provider"; // Ensure correct path
import { Navbar } from "./components/navbar"; // Ensure correct path

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wellzone Lanka - AI-Powered Health and Fitness Tracker",
  description:
    "Connect with doctors, track your health, and get personalized fitness training",
};

// Define the props interface
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`} // Applying the Inter font family globally
        style={{
          backgroundColor: "#f5f5f5", // Light gray background
          color: "#333", // Dark gray text color
          fontFamily: "Arial, sans-serif",
          margin: "0",
          padding: "0",
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main
            style={{
              paddingTop: "64px", // Adjusted padding to match Navbar height
              minHeight: "100vh", // Ensures full viewport height
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
