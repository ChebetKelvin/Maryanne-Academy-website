import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      className="relative h-[90vh] bg-fixed bg-center bg-cover flex items-center justify-center text-center"
      style={{
        backgroundImage: "url('/scout.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 max-w-3xl text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Maryanne Academy, Meru — Nurturing Excellence from Early Years to
          Primary
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-8">
          A nurturing environment for academic excellence, discipline, and
          holistic growth. Secure your child’s future with us today.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.a
            href="/admissions"
            aria-label="Apply for admission at Maryanne Academy"
            className="bg-[#e32225] hover:bg-[#41a539] text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-transform duration-300 hover:scale-105"
            whileHover={{ scale: 1.1 }}
          >
            Apply Now
          </motion.a>
          <motion.a
            href="/contact"
            className="bg-[#41a539] hover:bg-[#e32225] text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-transform duration-300 hover:scale-105"
            whileHover={{ scale: 1.1 }}
          >
            Contact Us
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
