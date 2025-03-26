import { NextResponse } from "next/server";
import User from "../../../../models/user";
import connectToDatabase from "../../../../lib/db";

export const POST = async (request: any) => {
    try {
        const { token } = await request.json();

        console.log("Received token:", token); // Log the incoming token

        if (!token) {
            return new NextResponse(
                JSON.stringify({ message: "Token is missing" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        await connectToDatabase();

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }, // Token should not be expired
        });

        console.log("User found:", user);

        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid or expired token" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        return new NextResponse(
            JSON.stringify({ email: user.email }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error verifying token:", error);
        return new NextResponse(
            JSON.stringify({ message: "Server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
