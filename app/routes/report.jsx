import { useLoaderData, Link } from "react-router";
import { FileText, Users, CheckCircle, Clock, ArrowLeft } from "lucide-react";
import { getStudent } from "../models/newStudents";
import { getMessages } from "../models/messages";
import { getSession } from "../.server/session";

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");

  if (!user || user.role !== "admin") {
    throw redirect("/login");
  }

  const [students, messages] = await Promise.all([getStudent(), getMessages()]);

  const totalApplications = students.length;
  const pending = students.filter(
    (s) => s.newApplication?.status === "pending"
  ).length;
  const reviewed = students.filter(
    (s) => s.newApplication?.status === "reviewed"
  ).length;

  return {
    totalApplications,
    pending,
    reviewed,
    totalMessages: messages.length,
  };
}

export default function AdminReport() {
  const { totalApplications, pending, reviewed, totalMessages } =
    useLoaderData();

  return (
    <section className="p-6 md:p-8 mt-25 min-h-screen bg-gray-50 text-gray-800">
      {/* 🔙 Back Button */}
      <Link
        to="/admin"
        className="inline-flex items-center text-[#41a539] hover:text-[#e32225] transition-colors mb-6 font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </Link>

      {/* 📊 Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#e32225] flex items-center gap-2">
          <FileText className="w-7 h-7 text-[#41a539]" />
          School Report Summary
        </h1>
        <p className="text-gray-600 mt-1">
          Overview of applications and inquiries received.
        </p>
      </div>

      {/* 🧮 Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportCard
          title="Total Applications"
          value={totalApplications}
          icon={<Users className="w-6 h-6 text-[#e32225]" />}
          bg="bg-white"
        />
        <ReportCard
          title="Pending Applications"
          value={pending}
          icon={<Clock className="w-6 h-6 text-yellow-500" />}
          bg="bg-yellow-50"
        />
        <ReportCard
          title="Reviewed Applications"
          value={reviewed}
          icon={<CheckCircle className="w-6 h-6 text-[#41a539]" />}
          bg="bg-green-50"
        />
        <ReportCard
          title="Total Messages"
          value={totalMessages}
          icon={<FileText className="w-6 h-6 text-blue-500" />}
          bg="bg-blue-50"
        />
      </div>

      {/* 🧾 Footer */}
      <div className="mt-10 text-sm text-gray-600 text-center">
        © {new Date().getFullYear()} Maryanne Academy Admin Panel
      </div>
    </section>
  );
}

/* 🧩 Reusable Report Card Component */
function ReportCard({ title, value, icon, bg }) {
  return (
    <div
      className={`${bg} rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center justify-center hover:shadow-lg transition`}
    >
      <div className="mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-[#e32225] mt-2">{value}</p>
    </div>
  );
}
