import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#f8f8f8] text-gray-700 font-sans">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Logo & About */}
        <div>
          <img
            src="/maryanne-logo.png"
            alt="Maryanne Academy Logo"
            className="h-16 mb-4"
          />
          <p className="text-sm leading-relaxed">
            <span className="font-semibold text-[#41a539]">
              Maryanne Academy
            </span>{" "}
            is dedicated to nurturing confident, disciplined, and creative
            learners through quality education and a caring environment.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#e32225] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#41a539] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#41a539] transition">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/admissions"
                className="hover:text-[#41a539] transition"
              >
                Admissions
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#41a539] transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-[#e32225] mb-4">
            Contact Info
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#41a539]" />
              <span>Meru, Kenya</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#41a539]" />
              <a
                href="tel:+254701011805"
                className="hover:text-[#e32225] transition"
              >
                0701011805
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#41a539]" />
              <a
                href="mailto:maryaneschool@yahoo.com"
                className="hover:text-[#e32225] transition"
              >
                academymaryanne@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#e32225] mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <a
              href="https://web.facebook.com/p/Maryanne-Academy-and-Junior-High-61553720676210/?_rdc=1&_rdr#"
              className="bg-[#41a539] text-white p-2 rounded-full hover:bg-[#368c30] transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/maryanneacademy?igsh=MTB3eWkxa2g1Yzh5Yg=="
              className="bg-[#41a539] text-white p-2 rounded-full hover:bg-[#368c30] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:academymaryanne@gmail.com"
              className="bg-[#41a539] text-white p-2 rounded-full hover:bg-[#368c30] transition"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#e32225] text-white text-center py-4 text-sm">
        © {new Date().getFullYear()} Maryanne Academy. All Rights Reserved.
      </div>
    </footer>
  );
}
