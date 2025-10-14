import { FaGraduationCap, FaHeart, FaUsers, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Helmet } from "react-helmet";

export default function AboutPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="font-sans text-gray-800 mt-20">
      <Helmet>
        <title>About Maryanne Academy | Excellence in Holistic Education</title>
        <meta
          name="description"
          content="Maryanne Academy in Meru, Kenya — a nurturing school delivering holistic education from early years through primary with strong academic and co-curricular programs."
        />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="Maryanne Academy" />
        <link rel="canonical" href="https://www.academymaryanne.com/about" />

        {/* Open Graph */}
        <meta property="og:title" content="About Maryanne Academy" />
        <meta
          property="og:description"
          content="Maryanne Academy empowers young learners with quality education, character building, and co-curricular opportunities in Meru, Kenya."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.academymaryanne.com/about"
        />
        <meta
          property="og:image"
          content="https://www.academymaryanne.com/images/maryanne-logo.png"
        />
        <meta property="og:image:alt" content="Maryanne Academy logo" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_KE" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Maryanne Academy | Nurturing Excellence"
        />
        <meta
          name="twitter:description"
          content="A caring school in Meru offering academic excellence, creativity, and moral formation for young learners."
        />
        <meta
          name="twitter:image"
          content="https://www.academymaryanne.com/images/maryanne-logo.png"
        />
        <meta name="twitter:image:alt" content="Maryanne Academy logo" />
        <meta name="twitter:site" content="@maryanneacademy" />
        <meta name="twitter:creator" content="@maryanneacademy" />

        {/* Structured Data (Organization + School) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "Maryanne Academy",
                url: "https://www.academymaryanne.com",
                logo: "https://www.academymaryanne.com/images/maryanne-logo.png",
                sameAs: [
                  "https://www.facebook.com/maryanneacademy",
                  "https://www.instagram.com/maryanneacademy",
                ],
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: "+254709018805",
                    contactType: "customer service",
                    areaServed: "KE",
                    availableLanguage: "en",
                  },
                ],
              },
              {
                "@type": "School",
                name: "Maryanne Academy",
                url: "https://www.academymaryanne.com",
                logo: "https://www.academymaryanne.com/images/maryanne-logo.png",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Meru",
                  addressCountry: "KE",
                },
                description:
                  "Maryanne Academy is a private school in Meru offering quality CBC education from Pre-Primary to Grade 6 with holistic child development.",
              },
            ],
          })}
        </script>
      </Helmet>
      <section
        className="relative py-24 bg-fixed bg-bottom bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/school-bg1.jpg')", // replace with your preferred background
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center text-white">
          <div className="space-x-20">
            <h1 className="text-4xl font-bold text-[#41a539] mb-4 drop-shadow-lg">
              About Maryanne Academy
            </h1>
            <p className="text-lg mb-6 leading-relaxed">
              Maryanne Academy is a nurturing center of excellence dedicated to
              empowering young minds with knowledge, creativity, and strong
              moral values. Founded to inspire a love for learning, we believe
              every child can shine given the right guidance and environment.
            </p>
            <button className="px-6 py-3 bg-[#e32225] text-white rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2">
              Learn More
            </button>
          </div>

          <div className="relative">
            <img
              src="/maryanne-logo.png"
              alt="Maryanne Academy logo"
              className="rounded-2xl shadow-lg w-72 h-72 md:w-96 md:h-96 object-cover border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* 2. Mission, Vision & Values */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#e32225] mb-10">
            Our Core Pillars
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition">
              <FaGraduationCap className="text-5xl text-[#41a539] mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Our Mission</h3>
              <p>
                To pro-actively and diligently engage in individual child
                development through education, counseling and advocacy of
                children
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition">
              <FaHeart className="text-5xl text-[#e32225] mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Our Vision</h3>
              <p>
                Maryanne Academy exists as a model institution of learning to
                offer education programs that ensure Holistic child development.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition">
              <FaUsers className="text-5xl text-[#41a539] mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Our Values</h3>
              <p>Diligence, Honesty, Excellence and Discipline.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Academics & Co-Curricular Activities */}
      <section className="py-20 bg-[#f0f9f1] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#41a539] mb-4"
          >
            Academics & Co-Curricular Life
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-gray-700 mb-12 text-lg"
          >
            At Maryanne Academy, we believe that excellence extends beyond the
            classroom. Our academic programs are complemented by vibrant
            co-curricular activities that nurture creativity, teamwork, and
            leadership.
          </motion.p>

          {/* Academics Section */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h3 className="text-2xl font-semibold text-[#e32225] mb-4">
                Academic Excellence
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our curriculum is structured to encourage curiosity, critical
                thinking, and innovation. From Early Years to Upper Primary, we
                integrate modern teaching techniques with individualized
                attention to help each learner thrive.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>✅ Competency-Based Curriculum (CBC) implementation</li>
                <li>✅ Regular assessments and remedial programs</li>
                <li>✅ ICT integration and digital literacy training</li>
                <li>✅ Reading and literacy enhancement programs</li>
              </ul>
            </motion.div>

            {/* Image with parallax zoom */}
            <motion.div
              initial={{ scale: 1 }}
              whileInView={{ scale: 1.05 }}
              transition={{ duration: 3, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.6 }}
              className="rounded-2xl shadow-lg overflow-hidden"
            >
              <motion.img
                src="/academics3.jpg"
                alt="Academic learning at Maryanne Academy"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Co-curricular Section */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image with parallax zoom */}
            <motion.div
              initial={{ scale: 1 }}
              whileInView={{ scale: 1.05 }}
              transition={{ duration: 3, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.6 }}
              className="rounded-2xl shadow-lg overflow-hidden order-2 md:order-1"
            >
              <motion.img
                src="/activities.jpg"
                alt="Students in co-curricular activities"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-left order-1 md:order-2"
            >
              <h3 className="text-2xl font-semibold text-[#e32225] mb-4">
                Beyond the Classroom
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We encourage every learner to discover and nurture their unique
                talents through a variety of clubs, sports, and cultural
                activities. Participation builds teamwork, discipline, and
                confidence.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>🎨 Art, Drama, and Music clubs</li>
                <li>⚽ Football, Athletics, and Indoor Games</li>
                <li>🌿 Environmental and Science clubs</li>
                <li>🗣️ Debating, Public Speaking, and Leadership forums</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. What Makes Us Different */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#e32225] mb-8 text-center"
          >
            What Makes Us Different?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            className="text-gray-700 text-lg mb-6 text-center max-w-3xl mx-auto"
          >
            Maryanne Academy stays ahead by integrating technology and
            creativity into learning. We offer engaging, personalized education
            that builds confidence, skill, and innovation.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12 mt-10">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.3}
              className="space-y-5 leading-relaxed text-gray-700"
            >
              <p>
                Our foundation lies in providing learning resources that empower
                students and staff to live, learn, and excel in a fast-changing,
                information-rich world.
              </p>
              <p>
                Our programs are designed to nurture critical thinking, digital
                literacy, and collaboration. From early years to upper grades,
                we promote curiosity, innovation, and character building.
              </p>
              <p>
                Each learner benefits from a holistic curriculum that blends
                classroom learning with hands-on experiences — ensuring
                well-rounded development and lifelong success.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.4}
              className="flex flex-col gap-4"
            >
              {[
                {
                  number: "5",
                  text: "Co-curricular activities designed to engage every student’s interests.",
                  bg: "#f0f9fc",
                  color: "#41a539",
                },
                {
                  number: "8",
                  text: "Computer classes for kids to boost creativity and problem-solving skills.",
                  bg: "#eaf7ec",
                  color: "#41a539",
                },
                {
                  number: "14.6%",
                  text: "Students actively involved in leadership and cultural programs.",
                  bg: "#f8f3fc",
                  color: "#e32225",
                },
                {
                  number: "180",
                  text: "Dedicated teaching and support staff fostering excellence.",
                  bg: "#fff7f7",
                  color: "#e32225",
                },
                {
                  number: "6:1",
                  text: "Student-to-teacher ratio for personalized learning attention.",
                  bg: "#f2faf2",
                  color: "#41a539",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.5 + index * 0.1}
                  className="flex items-center justify-between rounded-lg px-6 py-4 shadow-sm"
                  style={{ backgroundColor: item.bg }}
                >
                  <span
                    className="text-3xl font-bold"
                    style={{ color: item.color }}
                  >
                    {item.number}
                  </span>
                  <p className="text-sm text-gray-700">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Parallax Call-to-Action Section */}
      <section
        className="relative bg-fixed bg-center bg-cover py-32 text-white text-center"
        style={{
          backgroundImage: "url('/school-bg1.jpg')", // use consistent/valid image path
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Looking for a school where success is guaranteed?
          </h2>
          <p className="text-lg mb-8">
            Maryanne Academy will make your dreams come true.
          </p>
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#e32225] hover:bg-[#c81e21] rounded-lg font-semibold transition"
          >
            <FaUserPlus className="text-white text-lg" />
            New Admission
          </Link>
        </div>
      </section>
    </div>
  );
}
