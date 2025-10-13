import { motion } from "framer-motion";
import { FaBookOpen, FaChild, FaChalkboardTeacher } from "react-icons/fa";

export default function AcademicsPage() {
  return (
    <div className="font-sans text-gray-800">
      {/* ===== HERO SECTION ===== */}
      <section
        className="relative bg-fixed bg-center bg-cover min-h-[80vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1583168976314-51a437e22f06?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGNvbG9yZnVsJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D')",
        }} // new background image
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
          {/* === Text Content === */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#41a539]">
              Academic Excellence at Maryanne Academy
            </h1>
            <p className="text-lg leading-relaxed mb-6 text-gray-100">
              “At Maryanne Academy, we strive to build a strong foundation for
              every learner — nurturing not only their academic abilities but
              also their character and creativity.”
            </p>
            <p className="italic text-sm text-gray-300">
              – Principal, Maryanne Academy
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white text-center px-6">
        <h2 className="text-3xl font-bold text-[#41a539] mb-6">
          Our Academic Philosophy
        </h2>
        <p className="max-w-3xl text-2xl mx-auto text-gray-700 italic font-semibold leading-relaxed">
          At Maryanne Academy, we believe that every learner is unique. Our
          academic approach blends modern teaching strategies, hands-on
          learning, and moral guidance to help students excel both in and beyond
          the classroom.
        </p>
      </section>

      {/* ===== ACADEMIC CALENDAR ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#41a539] mb-8 text-center">
            Academic Calendar – 2026 Highlights
          </h2>

          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-[#e32225] text-white">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold">TERM</th>
                  <th className="text-left px-6 py-3 font-semibold">
                    HIGHLIGHT
                  </th>
                  <th className="text-left px-6 py-3 font-semibold">EVENT</th>
                  <th className="text-left px-6 py-3 font-semibold">DATE</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    term: "First Term",
                    highlight: "Cultural Events",
                    event: "Annual Sports Day",
                    date: "Saturday 13th July 2026",
                  },
                  {
                    term: "Second Term",
                    highlight: "Sports Day",
                    event:
                      "Various cultural and creative school activities (to be scheduled)",
                    date: "Throughout Second Term 2026",
                  },
                  {
                    term: "Third Term",
                    highlight: "Graduation Ceremony and Prayer Day",
                    event: "End-of-year Graduation Ceremony",
                    date: "End of Third Term 2026",
                  },
                ].map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-3 font-medium text-[#e32225]">
                      {item.term}
                    </td>
                    <td className="px-6 py-3">{item.highlight}</td>
                    <td className="px-6 py-3">{item.event}</td>
                    <td className="px-6 py-3">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== CLASSES OFFERED ===== */}
      <section className="py-20 bg-[#f0f9f1]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#41a539] mb-10">
            Classes Offered at Maryanne Academy
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Pre-Primary */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <FaChild className="text-4xl text-[#e32225] mx-auto mb-3" />
              <h3 className="font-semibold text-xl mb-2">Pre-Primary</h3>
              <p className="text-gray-700">
                We provide a nurturing and fun environment for early learners,
                focusing on language, creativity, and social growth.
              </p>
            </motion.div>

            {/* Lower Primary */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <FaBookOpen className="text-4xl text-[#41a539] mx-auto mb-3" />
              <h3 className="font-semibold text-xl mb-2">Lower Primary</h3>
              <p className="text-gray-700">
                Learners build literacy and numeracy foundations while exploring
                science, art, and life skills through hands-on activities.
              </p>
            </motion.div>

            {/* Upper Primary */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <FaChalkboardTeacher className="text-4xl text-[#e32225] mx-auto mb-3" />
              <h3 className="font-semibold text-xl mb-2">Upper Primary</h3>
              <p className="text-gray-700">
                Advanced CBC learning focusing on analytical thinking, digital
                literacy, and preparation for junior secondary transition.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f0f9f1]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#e32225] mb-8">
            Beyond the Classroom
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 mb-10">
            We believe in nurturing talents and creativity. Our co-curricular
            programs help students explore new interests and develop confidence
            through sports, arts, and teamwork.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Sports & Athletics", icon: "🏃‍♀️" },
              { title: "Music & Drama", icon: "🎭" },
              { title: "Clubs & Competitions", icon: "🤝" },
              { title: "Community Service", icon: "🌱" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
