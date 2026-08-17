import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// =========================
// PUBLIC PAGES
// =========================

import Home from "../pages/Home";
import About from "../pages/About";
import Biography from "../pages/Biography";
import PoliticalJourney from "../pages/PoliticalJourney";
import Development from "../pages/Development";
import Gallery from "../pages/Gallery";
import News from "../pages/News";
import Contact from "../pages/Contact";

// =========================
// ADMIN PAGES
// =========================

import AdminLogin from "../pages/AdminLogin";

import Dashboard from "../pages/Dashboard";

// HOME ADMIN
import EditHome from "../pages/EditHome";

// ABOUT ADMIN
import AdminAbout from "../pages/AdminAbout";
import EditAbout from "../pages/EditAbout";

// BIOGRAPHY ADMIN
import AdminBiography from "../pages/AdminBiography";
import EditBiography from "../pages/EditBiography";

// DEVELOPMENT ADMIN
import AdminDevelopment from "../pages/AdminDevelopment";
import EditDevelopment from "../pages/EditDevelopment";

// CONTACT ADMIN
import EditContact from "../pages/EditContact";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ========================= */}
      {/* PUBLIC WEBSITE */}
      {/* ========================= */}

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
          path="/biography"
          element={<Biography />}
        />

        <Route
          path="/journey"
          element={<PoliticalJourney />}
        />

        <Route
          path="/development"
          element={<Development />}
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
          path="/contact"
          element={<Contact />}
        />

      </Route>

      {/* ========================= */}
      {/* ADMIN LOGIN */}
      {/* ========================= */}

      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />

      {/* ========================= */}
      {/* ADMIN DASHBOARD */}
      {/* ========================= */}

      <Route
        path="/admin"
        element={<Dashboard />}
      />

      {/* ========================= */}
      {/* HOME ADMIN */}
      {/* ========================= */}

      {/* Clicking Home directly opens Edit Home */}
      <Route
        path="/admin/home"
        element={<EditHome />}
      />

      {/* Edit route also opens the same page */}
      <Route
        path="/admin/home/edit"
        element={<EditHome />}
      />

      {/* ========================= */}
      {/* ABOUT ADMIN */}
      {/* ========================= */}

      <Route
        path="/admin/about"
        element={<AdminAbout />}
      />

      <Route
        path="/admin/about/edit"
        element={<EditAbout />}
      />

      {/* ========================= */}
      {/* BIOGRAPHY ADMIN */}
      {/* ========================= */}

      <Route
        path="/admin/biography"
        element={<AdminBiography />}
      />

      <Route
        path="/admin/biography/edit"
        element={<EditBiography />}
      />

      {/* ========================= */}
      {/* DEVELOPMENT ADMIN */}
      {/* ========================= */}

      <Route
        path="/admin/development"
        element={<AdminDevelopment />}
      />

      <Route
        path="/admin/development/edit"
        element={<EditDevelopment />}
      />

      {/* ========================= */}
      {/* CONTACT ADMIN */}
      {/* ========================= */}

      <Route
        path="/admin/contact"
        element={<EditContact />}
      />

    </Routes>
  );
}