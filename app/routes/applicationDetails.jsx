import { Link, Form, useLoaderData, redirect } from "react-router";
import { ArrowLeft, CheckCircle, Trash2 } from "lucide-react";
import {
  getStudentById,
  updateStudentStatus,
  deleteStudentById,
} from "../models/newStudents";
import { getSession } from "../.server/session";

export async function loader({ params, request }) {
  let session = await getSession(request.headers.get("Cookie"));
  let user = session.get("user");

  if (!user || user.role !== "admin") {
    throw redirect("/login");
  }

  const appData = await getStudentById(params.id);

  if (!appData) {
    throw new Response("Application not found", { status: 404 });
  }

  const app = appData.newApplication;
  const appliedDate = new Date(app.appliedAt).toLocaleDateString();

  return { app, appliedDate, id: params.id };
}

/* 🧾 Action — handles status updates and deletions */
export async function action({ request, params }) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    await deleteStudentById(params.id);
    return redirect("/admin/applications");
  }

  if (intent === "updateStatus") {
    const newStatus = formData.get("status");
    await updateStudentStatus(params.id, newStatus);
    return redirect(`/admin/applications/${params.id}`);
  }

  return null;
}

export default function ApplicationDetails() {
  const { app, appliedDate } = useLoaderData();

  return (
    <section className="p-4 sm:p-6 md:p-10 mt-20 min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* 🔙 Back link */}
      <Link
        to="/admin/applications"
        className="inline-flex items-center text-[#41a539] hover:text-[#e32225] transition-colors mb-6 font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Applications
      </Link>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl border-t-4 border-[#e32225] max-w-4xl mx-auto p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#e32225]">
            {app.name}
          </h1>

          {/* Buttons (stack on small screens) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {app.status === "pending" ? (
              <Form method="post">
                <input type="hidden" name="intent" value="updateStatus" />
                <input type="hidden" name="status" value="reviewed" />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-[#41a539] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
                >
                  <CheckCircle className="w-5 h-5" />
                  Mark as Reviewed
                </button>
              </Form>
            ) : (
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700 text-center">
                Reviewed
              </span>
            )}

            <Form
              method="post"
              onSubmit={(e) => {
                if (
                  !confirm(
                    `Are you sure you want to delete the application for ${app.name}?`
                  )
                ) {
                  e.preventDefault();
                }
              }}
            >
              <input type="hidden" name="intent" value="delete" />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[#e32225] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition w-full sm:w-auto"
              >
                <Trash2 className="w-5 h-5" />
                Delete
              </button>
            </Form>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Detail label="Date of Birth" value={app.dob} />
          <Detail label="Class Applying" value={app.classApplying} />
          <Detail label="Parent / Guardian" value={app.parentName} />
          <Detail label="Phone" value={app.phone} />
          <Detail label="Alt Phone" value={app.altPhone} />
          <Detail label="Email" value={app.email} />
          <Detail label="Residence" value={app.residence} />
          <Detail label="Previous School" value={app.previousSchool} />
          <Detail label="Status" value={app.status} />
          <Detail label="Applied On" value={appliedDate} />
        </div>

        {/* Message Section (optional if message exists) */}
        {app.message && (
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-[#e32225] mb-2">
              Additional Message
            </h2>
            <p className="text-gray-700 leading-relaxed">{app.message}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* 🧩 Detail Component */
function Detail({ label, value }) {
  return (
    <div className="flex flex-col bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm">
      <span className="text-xs sm:text-sm text-gray-500 font-medium">
        {label}
      </span>
      <span className="text-base sm:text-lg font-semibold text-gray-800 mt-1 break-words">
        {value || "—"}
      </span>
    </div>
  );
}
