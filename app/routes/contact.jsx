import { useEffect, useRef, useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaWhatsapp,
  FaChevronDown,
} from "react-icons/fa";
import { Form, redirect, useNavigation } from "react-router";
import {
  validateText,
  validateEmail,
  validatePhone,
} from "../.server/validation";
import { addMessage } from "../models/messages";
import {
  commitSession,
  getSession,
  setSuccessMessage,
} from "../.server/session";

export async function action({ request }) {
  let session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");

  //vaidate inputs

  let fieldErrors = {
    name: validateText(name),
    email: validateEmail(email),
    phone: validatePhone(phone),
    message: validateText(message),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return { fieldErrors };
  }

  let newMessage = { name, email, phone, message };

  console.log({ newMessage });

  let results = await addMessage(newMessage);

  console.log({ results });

  if (results.acknowledged) {
    setSuccessMessage(session, "Message sent successfully!");
  } else {
    setSuccessMessage(session, "Failed to send message. Please try again.");
  }

  return redirect("/contact", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Contact() {
  const [activeIndex, setActiveIndex] = useState(null);
  let navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";

  let formRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
    }
  }, [isSubmitting]);

  const faqs = [
    {
      question: "How can I enroll my child?",
      answer:
        "You can enroll your child by filling out our online admission form or visiting our school office.",
    },
    {
      question: "What are the school fees?",
      answer:
        "School fees vary by class. Please contact our office or check the admission form section for detailed fees.",
    },
    {
      question: "Do you offer transportation services?",
      answer:
        "Yes, we have school buses covering major routes in Nairobi. Contact us for more information on routes and schedules.",
    },
    {
      question: "Can I schedule a visit to the school?",
      answer:
        "Absolutely! Please call or WhatsApp us to arrange a convenient time for a school tour.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 mt-20">
      {/* ===== HEADER ===== */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-[#41a539] mb-4">Contact Us</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Have questions or need more information? Reach out to us and we’ll get
          back to you promptly.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 mb-16">
        {/* ===== CONTACT DETAILS CARDS ===== */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#e32225] mb-4">
            Our Contact Information
          </h2>

          <div className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition transform hover:scale-105">
            <FaMapMarkerAlt className="text-[#e32225] text-2xl mr-4" />
            <div>
              <h3 className="font-semibold text-gray-700">Address</h3>
              <p className="text-gray-600">Maryanne Academy Rd, Meru, Kenya</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition transform hover:scale-105">
            <FaPhoneAlt className="text-[#e32225] text-2xl mr-4" />
            <div>
              <h3 className="font-semibold text-gray-700">Phone</h3>
              <p className="text-gray-600">0721395631/ 0726043156</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition transform hover:scale-105">
            <FaEnvelope className="text-[#e32225] text-2xl mr-4" />
            <div>
              <h3 className="font-semibold text-gray-700">Email</h3>
              <p className="text-gray-600">maryaneschool@yahoo.com</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition transform hover:scale-105">
            <FaClock className="text-[#e32225] text-2xl mr-4" />
            <div>
              <h3 className="font-semibold text-gray-700">Office Hours</h3>
              <p className="text-gray-600">Mon – Fri, 8:00 AM – 5:00 PM</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 cursor-pointer">
            <FaWhatsapp className="text-green-500 text-2xl mr-4" />
            <div>
              <h3 className="font-semibold text-gray-700">WhatsApp</h3>
              <a
                href="https://wa.me/25721395631"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-500"
              >
                Chat with us
              </a>
            </div>
          </div>
        </div>

        {/* ===== CONTACT FORM ===== */}
        <Form
          method="post"
          className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
          ref={formRef}
        >
          <h2 className="text-2xl font-semibold text-[#e32225] mb-4">
            Send Us a Message
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41a539] focus:border-[#41a539]"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41a539] focus:border-[#41a539]"
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41a539] focus:border-[#41a539]"
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#41a539] focus:border-[#41a539]"
          />

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#41a539] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#358a30] transition"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </Form>
      </div>

      {/* ===== MAP SECTION ===== */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-semibold text-[#e32225] mb-4">
          Find Us Here
        </h2>
        <div className="w-full h-100 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8159920402913!2d37.65393167501209!3d0.061898599937490424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17882308858641d1%3A0x39937b9aa7317516!2sMARYANNE%20ACADEMY%20MERU!5e0!3m2!1sen!2ske!4v1759832934142!5m2!1sen!2ske
            "
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>

      {/* ===== FAQ SECTION ===== */}
      <div className="max-w-6xl mx-auto px-6 pb-5">
        <h2 className="text-2xl font-semibold text-[#e32225] mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none hover:bg-gray-100 transition"
              >
                <span className="font-semibold text-gray-700">
                  {faq.question}
                </span>
                <FaChevronDown
                  className={`text-gray-600 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeIndex === index && (
                <div className="p-4 border-t border-gray-200 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
