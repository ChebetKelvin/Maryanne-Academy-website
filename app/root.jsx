import {
  Link,
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import { getSession, commitSession } from "./.server/session";
import { useEffect, useState } from "react";
import "./app.css";
import Footer from "./components/Footer";
import { Toaster, toast } from "react-hot-toast";
import {
  FaBars,
  FaTimes,
  FaPhoneAlt,
  FaEnvelope,
  FaUserCircle,
} from "react-icons/fa";
import logo from "/maryanne-logo.png";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }) {
  let session = await getSession(request.headers.get("Cookie"));
  let toastMessage = session.get("toastMessage");
  let user = session.get("user");

  return data(
    { toastMessage, user },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  let { toastMessage, user } = useLoaderData();

  useEffect(() => {
    if (!toastMessage) {
      return;
    }
    let { message, type } = toastMessage;

    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        throw new Error(`${type} is not handled`);
    }
  }, [toastMessage]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header className="w-full fixed top-0 left-0 z-50 font-sans">
          {/* 🔹 Top Contact Strip */}
          <div className="bg-[#41a539] text-white text-sm">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-2 space-y-1 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-xs" />
                <span>+254 712 345 678</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-xs" />
                <span>info@maryanneacademy.ac.ke</span>
              </div>
            </div>
          </div>

          {/* 🔸 Main Navbar */}
          <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                  <img
                    src={logo}
                    alt="Maryanne Academy"
                    className="h-10 w-auto"
                  />
                  <span className="text-xl font-bold text-[#e32225] tracking-wide">
                    Maryanne Academy
                  </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
                  <Link to="/" className="hover:text-[#e32225] transition">
                    Home
                  </Link>
                  <Link to="/about" className="hover:text-[#e32225] transition">
                    About
                  </Link>
                  <Link
                    to="/academics"
                    className="hover:text-[#e32225] transition"
                  >
                    Academics
                  </Link>
                  <Link
                    to="/admissions"
                    className="hover:text-[#e32225] transition"
                  >
                    Admission
                  </Link>
                  <Link
                    to="/contact"
                    className="hover:text-[#e32225] transition"
                  >
                    Contact
                  </Link>

                  {/* Buttons */}
                  <div className="flex items-center space-x-3">
                    <Link
                      to="/admissions"
                      className="bg-[#41a539] text-white px-4 py-2 rounded-lg shadow hover:bg-[#368e30] transition"
                    >
                      Apply Now
                    </Link>

                    {user ? (
                      <Link
                        to="/admin "
                        className="flex items-center space-x-2 text-[#e32225] hover:text-[#41a539] transition"
                      >
                        <FaUserCircle className="text-2xl" />
                        <span className="hidden lg:inline">Admin</span>
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        className="bg-[#e32225] text-white px-4 py-2 rounded-lg shadow hover:bg-[#c91e20] transition"
                      >
                        Admin Login
                      </Link>
                    )}
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden text-2xl text-[#e32225]"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
              <div className="md:hidden bg-white border-t border-gray-200 shadow-inner">
                <div className="flex flex-col px-6 py-4 space-y-3 text-gray-700 font-medium">
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-[#e32225] transition"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-[#e32225] transition"
                  >
                    About
                  </Link>
                  <Link
                    to="/academics"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-[#e32225] transition"
                  >
                    Academics
                  </Link>
                  <Link
                    to="/admissions"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-[#e32225] transition"
                  >
                    Admission
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-[#e32225] transition"
                  >
                    Contact
                  </Link>

                  {/* Buttons */}
                  <Link
                    to="/admissions"
                    onClick={() => setMenuOpen(false)}
                    className="mt-3 bg-[#41a539] text-white text-center px-4 py-2 rounded-lg shadow hover:bg-[#368e30] transition"
                  >
                    Apply Now
                  </Link>

                  {user ? (
                    <Link
                      to="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center space-x-2 text-[#e32225] hover:text-[#41a539] transition"
                    >
                      <FaUserCircle className="text-2xl" />
                      <span>Admin</span>
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="bg-[#e32225] text-white text-center px-4 py-2 rounded-lg shadow hover:bg-[#c91e20] transition"
                    >
                      Admin Login
                    </Link>
                  )}
                </div>
              </div>
            )}
          </nav>
        </header>
        {children}
        <Toaster />
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
