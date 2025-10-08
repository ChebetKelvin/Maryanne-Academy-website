import { useState } from "react";
import { useLoaderData, useFetcher, Link } from "react-router";
import {
  getMessages,
  deleteMessageById,
  toggleMessageReadStatus,
} from "../models/messages";

// --- Loader ---
export async function loader() {
  const results = await getMessages();
  const messages = results.map((msg) => ({
    ...msg,
    _id: msg._id.toString(),
  }));
  return { messages };
}

// --- Action ---
export async function action({ request }) {
  const formData = await request.formData();
  const id = formData.get("id");
  const intent = formData.get("intent");

  if (intent === "delete") {
    await deleteMessageById(id);
  } else if (intent === "toggle") {
    await toggleMessageReadStatus(id);
  }

  return null;
}

// --- Helper: truncate long messages ---
function truncate(text, limit = 120) {
  if (!text) return "";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
}

// --- Component ---
export default function MessagesAdmin() {
  const { messages: initialMessages } = useLoaderData();
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const fetcher = useFetcher();

  // Filter messages
  const filtered = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase())
  );

  // Delete message
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setMessages(messages.filter((msg) => msg._id !== id));
    fetcher.submit({ id, intent: "delete" }, { method: "post" });
  };

  // Toggle read/unread
  const toggleRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg._id === id ? { ...msg, read: !msg.read } : msg))
    );
    fetcher.submit({ id, intent: "toggle" }, { method: "post" });
  };

  return (
    <section className="p-6 md:p-10 mt-20 max-w-6xl mx-auto font-sans text-gray-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#e32225] flex items-center gap-2">
          📩 Admin Messages
        </h1>
        <Link
          to="/admin"
          className="px-4 py-2 bg-[#41a539] text-white rounded-xl shadow-sm hover:bg-[#368c2e] transition"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
        <p>
          Total Messages:{" "}
          <span className="font-semibold text-[#41a539]">
            {filtered.length}
          </span>
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#41a539] placeholder-gray-500"
        />
      </div>

      {/* Message List */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 italic text-center mt-10">
          No messages found.
        </p>
      ) : (
        <div className="grid gap-5">
          {filtered.map((msg) => (
            <div
              key={msg._id}
              onClick={() => setSelected(msg)}
              className={`p-5 border rounded-2xl shadow-md cursor-pointer transform transition-all hover:scale-[1.02] hover:shadow-lg ${
                msg.read
                  ? "bg-[#f9f9f9] border-gray-200"
                  : "bg-white border-[#41a539]/30"
              }`}
            >
              {/* Header Row */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-lg text-[#e32225]">
                  {msg.name}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRead(msg._id);
                    }}
                    className={`text-sm px-4 py-1.5 rounded-full font-medium transition ${
                      msg.read
                        ? "bg-[#41a539] text-white hover:bg-[#368c2e]"
                        : "bg-gray-200 text-gray-800 hover:bg-[#41a539]/10"
                    }`}
                  >
                    {msg.read ? "Read" : "Mark as Read"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(msg._id);
                    }}
                    className="text-sm px-4 py-1.5 rounded-full font-medium bg-[#e32225] text-white hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {msg.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Phone:</strong> {msg.phone}
              </p>
              <p className="mt-2 text-gray-800">{truncate(msg.message, 120)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 md:w-[600px] rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#e32225] text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-[#e32225] mb-4">
              Message Details
            </h2>

            <div className="space-y-3 text-gray-700">
              <p>
                <strong className="text-[#41a539]">Name:</strong>{" "}
                {selected.name}
              </p>
              <p>
                <strong className="text-[#41a539]">Email:</strong>{" "}
                {selected.email}
              </p>
              <p>
                <strong className="text-[#41a539]">Phone:</strong>{" "}
                {selected.phone}
              </p>
              <p>
                <strong className="text-[#41a539]">Message:</strong>
              </p>
              <p className="bg-gray-50 p-3 rounded-xl border text-gray-800 leading-relaxed">
                {selected.message}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  toggleRead(selected._id);
                  setSelected({ ...selected, read: !selected.read });
                }}
                className={`px-5 py-2 rounded-lg font-medium transition ${
                  selected.read
                    ? "bg-[#41a539] text-white hover:bg-[#368c2e]"
                    : "bg-gray-200 text-gray-800 hover:bg-[#41a539]/10"
                }`}
              >
                {selected.read ? "Mark Unread" : "Mark as Read"}
              </button>

              <button
                onClick={() => {
                  handleDelete(selected._id);
                  setSelected(null);
                }}
                className="px-5 py-2 rounded-lg font-medium bg-[#e32225] text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
