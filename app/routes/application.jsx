import { useLoaderData, useNavigate, redirect } from "react-router";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { getStudent } from "../models/newStudents";
import { getSession } from "../sessions"; // <--- added

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie")); // <--- added
  const user = session.get("user");

  if (!user || user.role !== "admin") {
    throw redirect("/login");
  }

  const results = await getStudent();
  const applications = results.map((item) => ({
    _id: item._id.toString(),
    ...item.newApplication,
  }));

  return { applications };
}

export default function ApplicationsPage() {
  const { applications } = useLoaderData();
  const navigate = useNavigate();
  const [openCard, setOpenCard] = useState(null);

  return (
    <section className="p-6 md:p-10 mt-20 text-gray-800 font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="flex items-center gap-2">
          <FileText className="w-7 h-7 text-[#41a539]" />
          <h1 className="text-3xl font-bold text-[#e32225] tracking-tight">
            Applications
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-gray-600 text-sm bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
            <span className="font-semibold text-[#41a539]">
              {applications.length}
            </span>{" "}
            total application{applications.length !== 1 && "s"}
          </p>

          <button
            onClick={() => navigate("/admin")}
            className="px-5 py-2 text-white bg-[#e32225] hover:bg-[#41a539] rounded-lg font-semibold shadow-md transform hover:scale-105 transition duration-200 ease-in-out"
          >
            Back
          </button>
        </div>
      </div>

      {/* Empty State */}
      {applications.length === 0 ? (
        <div className="p-8 text-center text-gray-500 bg-white rounded-2xl shadow-md">
          No applications have been submitted yet.
        </div>
      ) : (
        <>
          {/* 💻 Desktop Table View */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#41a539]/10 text-[#e32225]">
                  <tr className="border-b border-gray-200">
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Class</th>
                    <th className="p-4 font-semibold">Parent Name</th>
                    <th className="p-4 font-semibold">Phone</th>
                    <th className="p-4 font-semibold">Applied On</th>
                    <th className="p-4 font-semibold">Message</th>
                    <th className="p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => {
                    const appliedDate = app.appliedAt
                      ? new Date(app.appliedAt).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A";

                    const shortMessage =
                      app.message?.length > 40
                        ? app.message.slice(0, 40) + "..."
                        : app.message || "—";

                    return (
                      <tr
                        key={app._id}
                        onClick={() =>
                          navigate(`/admin/applications/${app._id}`)
                        }
                        className="border-b border-gray-100 hover:bg-[#41a539]/10 cursor-pointer transition duration-200 ease-in-out"
                      >
                        <td className="p-4 font-semibold text-[#41a539]">
                          {app.name}
                        </td>
                        <td className="p-4">{app.classApplying || "—"}</td>
                        <td className="p-4">{app.parentName || "—"}</td>
                        <td className="p-4">{app.phone || "—"}</td>
                        <td className="p-4 text-gray-600">{appliedDate}</td>
                        <td className="p-4 text-gray-700">{shortMessage}</td>
                        <td className="p-4">
                          {app.status === "pending" ? (
                            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">
                              Pending
                            </span>
                          ) : (
                            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-300">
                              Reviewed
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 📱 Mobile Card View */}
          <div className="md:hidden grid gap-4">
            {applications.map((app, index) => {
              const appliedDate = app.appliedAt
                ? new Date(app.appliedAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A";

              const shortMessage =
                app.message?.length > 50
                  ? app.message.slice(0, 50) + "..."
                  : app.message || "—";

              const isOpen = openCard === index;

              return (
                <div
                  key={app._id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenCard(isOpen ? null : index)}
                    className="w-full flex justify-between items-center p-4 bg-[#41a539]/10"
                  >
                    <div className="text-left">
                      <h2 className="font-semibold text-[#e32225] text-base">
                        {app.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {app.classApplying || "—"}
                      </p>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="text-[#41a539]" />
                    ) : (
                      <ChevronDown className="text-[#41a539]" />
                    )}
                  </button>

                  {isOpen && (
                    <div
                      className="p-4 text-sm text-gray-700 space-y-2"
                      onClick={() => navigate(`/admin/applications/${app._id}`)}
                    >
                      <p>
                        <strong>Parent:</strong> {app.parentName || "—"}
                      </p>
                      <p>
                        <strong>Phone:</strong> {app.phone || "—"}
                      </p>
                      <p>
                        <strong>Applied On:</strong> {appliedDate}
                      </p>
                      <p>
                        <strong>Message:</strong> {shortMessage}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        {app.status === "pending" ? (
                          <span className="text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-xs font-semibold">
                            Pending
                          </span>
                        ) : (
                          <span className="text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-semibold">
                            Reviewed
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
