import { useState } from "react";
import {
  Mail,
  ClipboardList,
  BarChart2,
  LogOut,
  Menu,
  ChevronLeft,
  X,
} from "lucide-react";
import { getSession, setSuccessMessage } from "../.server/session";
import { redirect, NavLink, Link, useLoaderData } from "react-router";
import { motion } from "framer-motion";

// 📦 Loader
export async function loader({ request }) {
  let session = await getSession(request.headers.get("Cookie"));
  let user = session.get("user");

  if (!user || user.role !== "admin") {
    throw redirect("/login");
  }

  if (user.role === "admin") {
    setSuccessMessage(session, `Welcome Admin ${user.name}`);
  }

  return { user };
}

export default function AdminDashboard() {
  const { user } = useLoaderData();
  const [active, setActive] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Applications", path: "/admin/applications", icon: ClipboardList },
    { name: "Messages", path: "/admin/messages", icon: Mail },
    { name: "Reports", path: "/admin/reports", icon: BarChart2 },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans mt-30 md:mt-0">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full z-30 text-white flex flex-col transition-all duration-300 shadow-xl
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          bg-gradient-to-b from-[#e32225] to-[#41a539]
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mt-25 p-4 border-b border-white/20">
          {!collapsed && (
            <span className="text-lg font-bold">Maryanne Admin</span>
          )}

          <button
            onClick={() =>
              mobileOpen ? setMobileOpen(false) : setCollapsed(!collapsed)
            }
            className="p-2 rounded hover:bg-white/20"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : collapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => {
                  setActive(item.name);
                  setMobileOpen(false);
                }}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white text-[#e32225] font-semibold shadow-md"
                      : "hover:bg-white/20"
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <Link to={"/logout"}>
          <button className="flex items-center p-4 text-red-200 hover:text-white hover:bg-red-700 transition">
            <LogOut className="w-5 h-5 mr-2" />
            {!collapsed && "Logout"}
          </button>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Top Bar */}
        <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-6 h-6 text-[#e32225]" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-[#e32225]">
              {active}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600 text-sm md:text-base font-medium">
              {user?.name}
            </span>
            <img
              src="https://i.pravatar.cc/40"
              alt="Admin Avatar"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-[#41a539]"
            />
          </div>
        </header>

        {/* Content Sections */}
        {active === "Dashboard" && (
          <div className="text-gray-600">
            <p>Welcome back, Admin {user.name} 👋</p>
          </div>
        )}

        {active === "Applications" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold text-[#41a539] mb-4">
              New Applications
            </h2>
            <p className="text-gray-500">Applications data will load here...</p>
          </motion.div>
        )}

        {active === "Messages" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold text-[#41a539] mb-4">
              Messages
            </h2>
            <p className="text-gray-500">
              Messages from the contact form go here...
            </p>
          </motion.div>
        )}

        {active === "Reports" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold text-[#41a539] mb-4">
              Reports
            </h2>
            <p className="text-gray-500">
              Generate and view system reports here...
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
