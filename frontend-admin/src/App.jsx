import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import CarouselAdmin from "./admin/pages/CarouselAdmin";
import Bookings from "./admin/pages/Bookings";
import BikeServicesAdmin from "./admin/pages/BikeServicesAdmin";
import CarServicesAdmin from "./admin/pages/CarServicesAdmin";
import AchievementsAdmin from "./admin/pages/AchievementsAdmin";
import PackagesAdmin from "./admin/pages/PackagesAdmin";
import AdminMessages from "./admin/components/AdminMessages";

import Login from "./admin/pages/Login";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import ChangePassword from "./admin/pages/ChangePassword";
import AdminNotFound from "./admin/pages/AdminNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Valid Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="carousel" element={<CarouselAdmin />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="services/bike" element={<BikeServicesAdmin />} />
          <Route path="services/car" element={<CarServicesAdmin />} />
          <Route path="achievements" element={<AchievementsAdmin />} />
          <Route path="packages" element={<PackagesAdmin />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* 🔥 Clean Admin 404 (NO LAYOUT) */}
        <Route path="/admin/*" element={<AdminNotFound />} />

        {/* Global fallback */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;