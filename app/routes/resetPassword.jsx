import { Form, redirect, useNavigation, useSearchParams } from "react-router";
import { useRef, useEffect } from "react";
import { findToken, deleteToken } from "../models/passwordreset";
import { getUserByEmail } from "../models/user";
import { client } from "../.server/mongo";
import { hash } from "bcryptjs";
import {
  getSession,
  commitSession,
  setSuccessMessage,
} from "../.server/session";

export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const token = formData.get("token");
  const password = formData.get("password");

  if (!token) {
    setSuccessMessage(session, "Invalid or missing reset token.");
    return redirect("/forgot-password", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  // basic password validation
  if (!password || password.length < 8) {
    setSuccessMessage(session, "Password must be at least 8 characters.");
    return redirect(`/reset-password?token=${encodeURIComponent(token)}`, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  const tokenRecord = await findToken(token);
  if (!tokenRecord) {
    setSuccessMessage(session, "Invalid or expired reset link.");
    return redirect("/forgot-password", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  const user = await getUserByEmail(tokenRecord.email);
  if (!user) {
    setSuccessMessage(session, "User not found.");
    return redirect("/forgot-password", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  try {
    // Hash new password and update
    const hashed = await hash(password, 10);
    const db = client.db("Maryanne");
    await db
      .collection("user")
      .updateOne({ email: tokenRecord.email }, { $set: { password: hashed } });

    await deleteToken(token);
  } catch (err) {
    console.error("Failed to reset password:", err);
    setSuccessMessage(session, "Unable to reset password. Try again later.");
    return redirect(`/reset-password?token=${encodeURIComponent(token)}`, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  setSuccessMessage(session, "Password reset successful! You can now log in.");
  return redirect("/login", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const formRef = useRef();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) formRef.current?.reset();
  }, [isSubmitting]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 mt-20">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#e32225] mb-4 text-center">
          Reset Password
        </h2>
        <Form method="post" ref={formRef} className="space-y-4">
          <input type="hidden" name="token" value={token} />
          <input
            type="password"
            name="password"
            placeholder="Enter New Password"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#41a539]"
          />
          <button
            type="submit"
            className="w-full bg-[#41a539] text-white py-3 rounded-lg font-semibold hover:bg-[#358a30] transition"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </Form>
      </div>
    </section>
  );
}
