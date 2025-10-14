import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("about", "routes/about.jsx"),
  route("academics", "routes/academics.jsx"),
  route("admissions", "routes/admission.jsx"),
  route("contact", "routes/contact.jsx"),
  route("news/:id", "routes/newsDetails.jsx"),
  route("signup", "routes/signup.jsx"),
  route("login", "routes/login.jsx"),
  route("logout", "routes/logout.jsx"),
  route("admin", "routes/dashboard.jsx"),
  route("admin/applications", "routes/application.jsx"),
  route("admin/applications/:id", "routes/applicationDetails.jsx"),
  route("admin/messages", "routes/message.jsx"),
  route("admin/reports", "routes/report.jsx"),
  route("forgot-password", "routes/forgotPassword.jsx"),
  route("reset-password/:token", "routes/resetPassword.jsx"),
];
