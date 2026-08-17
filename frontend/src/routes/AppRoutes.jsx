import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Biography from "../pages/Biography";
import PoliticalJourney from "../pages/PoliticalJourney";
import Gallery from "../pages/Gallery";
import News from "../pages/News";
import Videos from "../pages/Videos";
import Articles from "../pages/Articles";
import Contact from "../pages/Contact";

import AdminLogin from "../pages/AdminLogin";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* PUBLIC WEBSITE */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/biography" element={<Biography />} />
        <Route path="/political-journey" element={<PoliticalJourney />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<News />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ADMIN LOGIN */}
      <Route path="/secure" element={<AdminLogin />} />

      {/* PROTECTED ADMIN */}
      <Route element={<ProtectedRoute />}>
        <Route path="/secure/admin" element={<Dashboard />} />
      </Route>

      {/* /admin → /secure */}
      <Route
        path="/admin"
        element={<Navigate to="/secure" replace />}
      />

      {/* UNKNOWN URL */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
};

export default AppRoutes;