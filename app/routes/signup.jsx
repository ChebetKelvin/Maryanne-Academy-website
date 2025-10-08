import { useState } from "react";
import { Form, Link, redirect } from "react-router";
import {
  commitSession,
  getSession,
  setErrorMessage,
  setSuccessMessage,
} from "../.server/session.js";
import {
  validateText,
  validatePassword,
  validateEmail,
} from "../.server/validation";
import { addUser } from "../models/user";
import bcrypt from "bcrypt";
import logo from "/maryanne-logo.png";

export async function action({ request }) {
  let session = await getSession(request.headers.get("Cookie"));
  let formData = await request.formData();
  let name = formData.get("name");
  let email = formData.get("email");
  let password = formData.get("password");

  let hashedPassword = await bcrypt.hash(password, 10);

  //validation

  let fieldErrors = {
    name: validateText(name),
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return { fieldErrors };
  }

  let user = {
    name,
    email,
    password: hashedPassword,
    role: "user",
  };

  let result = await addUser(user);

  if (result.acknowledged) {
    setSuccessMessage(session, "User registration succesful!");
  } else {
    setErrorMessage(session, "Something went wrong, Try again!");
  }

  return redirect("/login", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function signUp({ actionData }) {
  let [showPassword, setShowPassword] = useState(false);
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-100 mt-20"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        {/* Logo & Header */}
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
            Admin Registration
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Create an account to access the admin dashboard
          </p>
        </div>

        {/* Signup Form */}
        <Form method="post" className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-xl text-gray-800 font-medium focus:ring-2 focus:ring-[#41a539] focus:outline-none"
              required
            />
            {actionData?.fieldErrors?.name && (
              <span className="text-red-500 text-sm">
                {actionData.fieldErrors.name}
              </span>
            )}
          </div>

          {/* Email */}
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
            {actionData?.fieldErrors?.email && (
              <span className="text-red-500 text-sm">
                {actionData.fieldErrors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
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
            {actionData?.fieldErrors?.password && (
              <span className="text-red-500 text-sm">
                {actionData.fieldErrors.password}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#41a539] text-white p-3 rounded-xl font-semibold hover:bg-[#368e30] transition duration-200 shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
        </Form>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#e32225] font-semibold hover:underline"
            >
              Log In
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
