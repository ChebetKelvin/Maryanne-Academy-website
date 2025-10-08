import { useState } from "react";
import { getSession, setErrorMessage, commitSession } from "../.server/session";

import { getUserByEmail } from "../models/user";
import bcrypt from "bcrypt";
import { redirect, Form, Link } from "react-router";
import logo from "/maryanne-logo.png";

export async function action({ request }) {
  let session = await getSession(request.headers.get("Cookie"));
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  let user = await getUserByEmail(email);

  console.log({ user });

  if (!user) {
    setErrorMessage(session, "Wrong credentials! Try again..");
    return redirect("/login", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  let validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    setErrorMessage(session, "Wrong credentials! Try again..");
    return redirect("/login", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  session.set("user", {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  if (user.role === "admin") {
    return redirect("/admin", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  setSuccessMessage(session, `Welcome back, ${user.name}!`);

  return redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-100 mt-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        {/* Logo and Header */}
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="Maryanne Academy Logo"
            className="w-16 h-16 mx-auto mb-3 drop-shadow-md"
          />
          <h1 className="text-3xl font-bold text-[#e32225]">
            Maryanne Academy
          </h1>
          <h2 className="text-lg font-semibold text-gray-700 mt-1">
            Admin Login
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Please sign in to access your dashboard
          </p>
        </div>

        {/* Login Form */}
        <Form method="post" className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@maryanneacademy.ac.ke"
              className="w-full p-3 border border-gray-300 rounded-xl text-gray-800 font-medium focus:ring-2 focus:ring-[#41a539] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-xl text-gray-800 font-medium focus:ring-2 focus:ring-[#41a539] focus:outline-none"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#41a539]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#e32225] text-white p-3 rounded-xl font-semibold hover:bg-[#c91e20] transition duration-200 shadow-md hover:shadow-lg"
          >
            Log In
          </button>
        </Form>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <Link
            to="/forgot-password"
            className="text-[#41a539] font-medium hover:underline"
          >
            Forgot Password?
          </Link>

          <p className="text-gray-600 text-sm mt-3">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#e32225] font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>

          <p className="text-gray-600 text-sm mt-3">
            Back to{" "}
            <Link to="/" className="text-[#41a539] font-medium hover:underline">
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
