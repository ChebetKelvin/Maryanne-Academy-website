import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaCheckCircle, FaBookOpen, FaHeart, FaUsers } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="font-sans text-gray-800">
      {/* HERO SECTION */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between py-16 px-6 md:px-12 lg:px-20 bg-gray-50">
        {/* TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#e32225]">
            Welcome to <span className="text-[#41a539]">Maryanne Academy</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            We nurture confident, disciplined, and creative learners through
            quality education, care, and a strong value-based foundation.
          </p>
          <Link
            to="/about"
            className="inline-block bg-[#41a539] hover:bg-[#368c30] text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Learn More
          </Link>
        </motion.div>

        {/* HERO IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 mb-10 md:mb-0 flex justify-center"
        >
          <img
            src="/maryanne.jpg"
            alt="Maryanne Academy Students"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </motion.div>
      </section>

      {/* WHY PARENTS CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#41a539] mb-12">
            Why Parents Choose Us
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: (
                  <FaBookOpen className="text-4xl text-[#e32225] mx-auto" />
                ),
                title: "CBC & Holistic Learning",
                desc: "We integrate CBC with creativity, teamwork, and discipline for well-rounded learners.",
              },
              {
                icon: <FaHeart className="text-4xl text-[#e32225] mx-auto" />,
                title: "Caring Environment",
                desc: "A safe and nurturing environment that helps every child feel valued and supported.",
              },
              {
                icon: <FaUsers className="text-4xl text-[#e32225] mx-auto" />,
                title: "Qualified Staff",
                desc: "Our teachers are passionate and professional mentors guiding learners to success.",
              },
              {
                icon: (
                  <FaCheckCircle className="text-4xl text-[#e32225] mx-auto" />
                ),
                title: "Strong Values",
                desc: "We instill integrity, confidence, and respect in all our learners.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 rounded-2xl shadow-md p-6"
              >
                {item.icon}
                <h3 className="text-xl font-semibold text-[#41a539] mt-4 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
