import { NextResponse } from "next/server";
import User from "../../../models/user";
import connectToDatabase from "../../../lib/db";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

export const POST = async (request: any) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return new NextResponse(
          JSON.stringify({ message: "Email is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
      );
  }
  await connectToDatabase();

        const user = await User.findOne({ email });
        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: "Email not found" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    console.log("Reset URL:", resetUrl);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

    const msg = {
      to: email,
      from: "chathuni.20230146@iit.ac.lk",
      subject: "Wellzone Lanka - Reset Password",
      text: `Reset your password by clicking this link: ${resetUrl}`,
    };

    try {
      await sgMail.send(msg);
      
      // Save only if email is sent successfully
      await user.save();
      
      return NextResponse.json({ message: "Reset password email has been sent." }, { status: 200 });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return NextResponse.json({ message: "Failed to send email. Try again." }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Internal server error:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
};
