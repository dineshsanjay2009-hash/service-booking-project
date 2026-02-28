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

import ProtectedRoute from "./components/ProtectedRoute";
import PaymentTest from "./pages/PaymentTest";

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

        {/* LOGIN + REGISTER */}
        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />

        <Route
          path="/register"
          element={
            <PublicLayout>
              <Register />
            </PublicLayout>
          }
        />

        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        <Route
          path="/services"
          element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          }
        />

        <Route
          path="/services/:slug"
          element={
            <PublicLayout>
              <ServiceDetails />
            </PublicLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        {/* BOOKING ROUTES (LOGIN REQUIRED) */}
        <Route
          path="/book-service/:id"
          element={
            <ProtectedRoute>
              <PublicLayout>
                <ServiceBooking />
              </PublicLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <PublicLayout>
                <MyBookings />
              </PublicLayout>
            </ProtectedRoute>
          }
        />

        {/* ✅ PAYMENT TEST ROUTE (ONLY CHANGE MADE) */}
        <Route
          path="/payment-test"
          element={
            <PublicLayout>
              <PaymentTest />
            </PublicLayout>
          }
        />

        <Route
          path="/booking-success/:id"
          element={
            <ProtectedRoute>
              <PublicLayout>
                <BookingSuccess />
              </PublicLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;