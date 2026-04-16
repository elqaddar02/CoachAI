import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import StudentPage from "../pages/student/StudentPage";
import CareerRoadmap from "../pages/student/CareerRoadmap";
import Certifications from "../pages/student/Certifications";
import TeacherPage from "../pages/teacher/TeacherPage";
import AdminPage from "../pages/admin/AdminPage";

// AI Learning Flow (student-only)
import PathSelector from "../pages/student/PathSelector";
import PlacementTest from "../pages/student/PlacementTest";
import AIResult from "../pages/student/AIResult";
import CoursePage from "../pages/student/CoursePage";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<Layout><Dashboard /></Layout>}
        />

        {/* ── AI Learning Flow (student-only, no Layout shell) ── */}
        <Route
          path="/choose-path"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <PathSelector />
            </ProtectedRoute>
          }
        />
        <Route
          path="/placement-test"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <PlacementTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-result"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <AIResult />
            </ProtectedRoute>
          }
        />

        {/* ── Course Player ── */}
        <Route
          path="/course/:courseId"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CoursePage />
            </ProtectedRoute>
          }
        />

        {/* ── Student Dashboard ── */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Layout><StudentPage /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/roadmap"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Layout><CareerRoadmap /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/certifications"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Layout><Certifications /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <Layout><TeacherPage /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout><AdminPage /></Layout>
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;