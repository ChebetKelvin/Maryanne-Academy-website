import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendResetEmail(to, name, resetUrl) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Maryanne Academy" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Password Reset Instructions",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2 style="color:#e32225;">Password Reset Request</h2>
        <p>Hi ${name || "there"},</p>
        <p>Click below to reset your password:</p>
        <a href="${resetUrl}" 
          style="display:inline-block;padding:10px 16px;background:#41a539;color:white;
          text-decoration:none;border-radius:6px;font-weight:bold;">
          Reset Password
        </a>
      </div>
    `,
  });
}
