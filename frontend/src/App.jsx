import { BrowserRouter, Routes, Route } from "react-router-dom";

/* PUBLIC */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Contact from "./pages/Contact";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import ServiceBooking from "./pages/Booking/ServiceBooking";
import BookingSuccess from "./pages/Booking/BookingSuccess";
import MyBookings from "./pages/Booking/MyBookings";


/* ADMIN */
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import CarouselAdmin from "./admin/pages/CarouselAdmin";
import Bookings from "./admin/pages/Bookings";
import BikeServicesAdmin from "./admin/pages/BikeServicesAdmin";
import CarServicesAdmin from "./admin/pages/CarServicesAdmin";
import AchievementsAdmin from "./admin/pages/AchievementsAdmin";
import PackagesAdmin from "./admin/pages/PackagesAdmin";
import AdminMessages from "./admin/components/AdminMessages";

/* PUBLIC LAYOUT */
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={<PublicLayout><Home /></PublicLayout>}
        />

        <Route
          path="/about"
          element={<PublicLayout><About /></PublicLayout>}
        />

        <Route
          path="/services"
          element={<PublicLayout><Services /></PublicLayout>}
        />

        <Route
          path="/services/:slug"
          element={<PublicLayout><ServiceDetails /></PublicLayout>}
        />

        <Route
          path="/booking-success"
          element={<PublicLayout><BookingSuccess /></PublicLayout>}
        />

        <Route
          path="/contact"
          element={<PublicLayout><Contact /></PublicLayout>}
        />

        <Route
          path="/login"
          element={<PublicLayout><Login /></PublicLayout>}
        />

        <Route
          path="/register"
          element={<PublicLayout><Register /></PublicLayout>}
        />

        {/* ✅ FIXED — Added PublicLayout */}
        <Route
          path="/book-service/:id"
          element={
            <PublicLayout>
              <ServiceBooking />
            </PublicLayout>
          }
        />

        {/* ✅ FIXED — Added PublicLayout */}
        <Route
          path="/my-bookings"
          element={
            <PublicLayout>
              <MyBookings />
            </PublicLayout>
          }
        />


        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="carousel" element={<CarouselAdmin />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="services/bike" element={<BikeServicesAdmin />} />
          <Route path="services/car" element={<CarServicesAdmin />} />
          <Route path="achievements" element={<AchievementsAdmin />} />
          <Route path="packages" element={<PackagesAdmin />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
