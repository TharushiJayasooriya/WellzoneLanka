import { NextResponse } from "next/server";
import User from "../../../../models/user";
import connectToDatabase from "../../../../lib/mongodb";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

export const POST = async (request: any) => {
  try {
    const { email } = await request.json();

    await connectToDatabase();
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ message: "Email does not exist." }, { status: 400 });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour

    // Store in DB (not saving yet)
    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = passwordResetExpires;

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
      await existingUser.save();
      
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
