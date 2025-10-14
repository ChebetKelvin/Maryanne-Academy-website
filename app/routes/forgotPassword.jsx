import { getUserByEmail } from "../models/user";
import { createPasswordResetToken } from "../models/passwordreset";
import { sendResetEmail } from "../.server/email"; // ✅ Use your existing email utility
import {
  getSession,
  commitSession,
  setSuccessMessage,
} from "../.server/session";
import { redirect } from "react-router";
import { Form, useNavigation } from "react-router";
import { useRef, useEffect } from "react";

export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const email = formData.get("email");

  // Step 1: Check if user exists
  const user = await getUserByEmail(email);
  if (!user) {
    setSuccessMessage(session, "No user found with that email.");
    return redirect("/forgot-password", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  // Step 2: Create secure token
  const token = await createPasswordResetToken(email);
  const resetUrl = `${
    process.env.SITE_URL || "https://academymaryanne.com"
  }/reset-password?token=${token}`;

  // Step 3: Send email
  try {
    await sendResetEmail(email, user.name, resetUrl);
    setSuccessMessage(session, "Reset link sent! Check your email inbox.");
  } catch (err) {
    console.error(" Failed to send reset email:", err);
    setSuccessMessage(session, "Unable to send reset email at this time.");
  }

  return redirect("/forgot-password", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function ForgotPassword() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formRef = useRef();

  useEffect(() => {
    if (!isSubmitting) formRef.current?.reset();
  }, [isSubmitting]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 mt-20">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#e32225] mb-4 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your registered email address and we’ll send you a reset link.
        </p>

        <Form method="post" ref={formRef} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#41a539]"
          />

          <button
            type="submit"
            className="w-full bg-[#41a539] text-white py-3 rounded-lg font-semibold hover:bg-[#358a30] transition"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </Form>
      </div>
    </section>
  );
}
