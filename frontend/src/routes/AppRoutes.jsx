import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// =====================================================
// PUBLIC PAGES
// =====================================================

import Home from "../pages/Home";
import About from "../pages/About";
import PoliticalJourney from "../pages/PoliticalJourney";
import Gallery from "../pages/Gallery";
import News from "../pages/News";
import Videos from "../pages/Videos";
import Contact from "../pages/Contact";

// =====================================================
// ADMIN PAGES
// =====================================================

import Dashboard from "../pages/Dashboard";
import AdminPoliticalCareer from "../pages/AdminPoliticalCareer";
import AdminNews from "../pages/AdminNews";
import AdminArticles from "../pages/AdminArticles";
import AdminVideos from "../pages/AdminVideos";

export default function AppRoutes() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC
      ===================================================== */}

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/journey"
          element={<PoliticalJourney />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/news"
          element={<News />}
        />

        <Route
          path="/videos"
          element={<Videos />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Route>

      {/* =====================================================
          ADMIN
      ===================================================== */}

      <Route
        path="/admin"
        element={<Dashboard />}
      />

      <Route
        path="/admin/political-career"
        element={<AdminPoliticalCareer />}
      />

      <Route
        path="/admin/news"
        element={<AdminNews />}
      />

      <Route
        path="/admin/articles"
        element={<AdminArticles />}
      />

      <Route
        path="/admin/videos"
        element={<AdminVideos />}
      />

    </Routes>
  );
}