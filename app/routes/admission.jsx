import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import { Form, useNavigation, redirect } from "react-router";
import { validatePhone, validateText } from "../.server/validation";
import { addStudent } from "../models/newStudents";
import {
  commitSession,
  getSession,
  setErrorMessage,
  setSuccessMessage,
} from "../.server/session";
import { useRef, useEffect } from "react";

export async function action({ request }) {
  let session = await getSession(request.headers.get("Cookie"));
  let formData = await request.formData();
  let name = formData.get("name");
  let dob = formData.get("dob");
  let parentName = formData.get("parentName");
  let phone = formData.get("phone");
  let altPhone = formData.get("altPhone");
  let email = formData.get("email");
  let residence = formData.get("residence");
  let classApplying = formData.get("class");
  let previousSchool = formData.get("previousSchool");

  //validation can be added here
  let fieldErrors = {
    name: validateText(name),
    parentName: validateText(parentName),
    email: validateText(email),
    classApplying: validateText(classApplying),
    dob: validateText(dob),
    phone: validatePhone(phone),
    altPhone: validatePhone(altPhone),
    residence: validateText(residence),
    previousSchool: validateText(previousSchool),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return { fieldErrors };
  }
  // Here, you would typically save the application to a database

  let newApplication = {
    name,
    dob,
    parentName,
    phone,
    altPhone,
    email,
    residence,
    classApplying,
    previousSchool,
    status: "pending",
    appliedAt: new Date(),
  };

  let result = await addStudent({ newApplication });

  if (result.acknowledged) {
    setSuccessMessage(session, "Application submitted successfully!");
  } else {
    setErrorMessage(session, "Something went wrong, Try again!");
  }

  return redirect("/admissions", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function AdmissionPage({ actionData }) {
  let fieldErrors = actionData?.fieldErrors || {};
  let navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";
  let formRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
    }
  }, [isSubmitting]);
  return (
    <div className="font-sans text-gray-800 mt-20">
      {/* 1. HERO SECTION */}
      <section
        className="relative bg-fixed bg-center bg-cover min-h-[70vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/science1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-6 max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Join the Maryanne Academy Family
          </h1>
          <p className="text-lg mb-6">
            “At Maryanne Academy, we believe in shaping tomorrow’s leaders
            through quality education and holistic development.”
          </p>
        </motion.div>
      </section>

      {/* 2. ADMISSION PROCESS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:grid grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#e32225] mb-6">
              Admission Process
            </h2>
            <p className="mb-6 text-lg leading-relaxed">
              We enroll based on spaces available. Our commitment to quality
              teaching ensures every child makes exceptional progress, no matter
              their starting point.
            </p>

            <ul className="space-y-2 text-gray-700">
              <li>1️⃣ Copy of the child’s birth certificate</li>
              <li>2️⃣ Recent school report</li>
              <li>3️⃣ NEMIS number (if applicable)</li>
            </ul>

            <button className="mt-8 px-6 py-3 bg-[#41a539] text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700 transition">
              <FaArrowDown /> Apply Online
            </button>
          </div>

          <div className="grid gap-8 text-lg text-gray-800">
            <div>
              <h3 className="text-[#41a539] font-bold text-2xl mb-2">
                1. Registration
              </h3>
              <p>Apply online or send your completed form to our office.</p>
            </div>
            <div>
              <h3 className="text-[#e32225] font-bold text-2xl mb-2">
                2. Interview
              </h3>
              <p>
                Eligible candidates will be contacted for an interview with
                necessary documents.
              </p>
            </div>
            <div>
              <h3 className="text-[#41a539] font-bold text-2xl mb-2">
                3. Submission
              </h3>
              <p>
                Successful applicants must submit all documents and fee payment
                confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. APPLICATION FORM */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#e32225] mb-10">
            Application Form
          </h2>

          <Form
            method="POST"
            className="grid gap-8 bg-white p-8 rounded-2xl shadow-lg"
            ref={formRef}
          >
            {/* === Personal Information === */}
            <div>
              <h3 className="text-xl font-semibold text-[#41a539] mb-4">
                Student Information
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#41a539]"
                    placeholder="Enter your full name"
                    required
                  />
                  {fieldErrors.name && (
                    <span className="text-red-500 text-sm">
                      {fieldErrors.name}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#41a539]"
                    required
                  />
                  {fieldErrors.dob && (
                    <span className="text-red-500 text-sm">
                      {fieldErrors.dob}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* === Contact Details === */}
            <div>
              <h3 className="text-xl font-semibold text-[#41a539] mb-4">
                Parent/Guardian Contact Details
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Parent/Guardian Name
                  </label>
                  <input
                    type="tel"
                    name="parentName"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#41a539]"
                    placeholder="Enter your name"
                    required
                  />
                  {fieldErrors.parentName && (
                    <span className="text-red-500 text-sm">
                      {fieldErrors.parentName}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#41a539]"
                    placeholder="Enter your phone number"
                    required
                  />
                  {fieldErrors.phone && (
                    <span className="text-red-500 text-sm">
                      {fieldErrors.phone}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Alternative Number
                  </label>
                  <input
                    type="tel"
                    name="altPhone"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#41a539]"
                    placeholder="Enter an alternative number"
                  />
                  {fieldErrors.altPhone && (
                    <span className="text-red-500 text-sm">
                      {fieldErrors.altPhone}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#41a539]"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Residence
                  </label>
                  <input
                    type="text"
                    name="residence"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#41a539]"
                    placeholder="Enter your place of residence"
                  />
                </div>
              </div>
            </div>

            {/* === Academic Information === */}
            <div>
              <h3 className="text-xl font-semibold text-[#41a539] mb-4">
                Academic Information
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Class Applying For
                  </label>
                  <select
                    name="class"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#41a539]"
                    required
                  >
                    <option value="">Select class</option>
                    <optgroup label="Pre-Primary">
                      <option>Creche 2</option>
                      <option>KG 1</option>
                      <option>KG 2</option>
                    </optgroup>
                    <optgroup label="Primary">
                      <option>Grade 1</option>
                      <option>Grade 2</option>
                      <option>Grade 3</option>
                      <option>Grade 4</option>
                      <option>Grade 5</option>
                      <option>Grade 6</option>
                      <option>Grade 7</option>
                      <option>Grade 8</option>
                    </optgroup>
                  </select>
                  {fieldErrors.classApplying && (
                    <span className="text-red-500 text-sm">
                      {fieldErrors.classApplying}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Previous School (if applicable)
                  </label>
                  <input
                    type="text"
                    name="previousSchool"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#41a539]"
                    placeholder="Enter previous school name"
                  />
                  {fieldErrors.previousSchool && (
                    <span className="text-red-500 text-sm">
                      {fieldErrors.previousSchool}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* === Submit === */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#41a539] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#358a30] transition"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </Form>
        </div>
      </section>
    </div>
  );
}
