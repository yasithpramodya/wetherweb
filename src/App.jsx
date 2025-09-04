import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from './navbar/NavBar';

// Pages
import Home from "./Pages/Home";
import Tasks from "./Pages/Tasks";
import Location from "./Pages/Location";
import ContactUs from "./Pages/ContactUs";

// Auth Pages
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ForgotPassword from "./Auth/ForgotPassword";
import Profile from "./Auth/Profile";
import Footer from "./Footer";

// 404 Error Page
const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
      <div className="text-6xl mb-3">🚫</div>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Page Not Found</h1>
      <p className="text-slate-600 mb-4">The page you're looking for doesn't exist or has been moved.</p>
      <div className="space-y-2">
        <button
          onClick={() => window.history.back()}
          className="w-full bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Go Back
        </button>
        <a
          href="/"
          className="block w-full bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  </div>
);

// Loading Component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500 mx-auto mb-2"></div>
      <p className="text-slate-600 text-sm">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/src/assets/background.png')",
      }}
    >
      {/* Navigation */}
      <NavBar />

      {/* Page Content */}
      <main className="flex-grow pt-20 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Routes>
            {/* Main Pages */}
            <Route index element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/location" element={<Location />} />
            <Route path="/contact" element={<ContactUs />} />

            {/* Auth Pages */}
            <Route path="/signin" element={<Login />} />
            <Route path="/login" element={<Navigate to="/signin" replace />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<Navigate to="/signup" replace />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
