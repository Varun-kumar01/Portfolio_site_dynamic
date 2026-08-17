
import { useState } from "react";
import {
  LayoutDashboard,
  Home,
  User,
  BookOpen,
  Landmark,
  Building2,
  Newspaper,
  FileText,
  Image,
  Video,
  Phone,
  Settings,
  LogOut,
  Plus,
  X,
} from "lucide-react";

export default function Dashboard() {
  // Dashboard is the first section shown
  const [activeSection, setActiveSection] = useState("dashboard");

  // Gallery form visibility
  const [showGalleryManager, setShowGalleryManager] = useState(false);

  // Gallery form values
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Public Events");

  // Selected image
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  // Message
  const [message, setMessage] = useState("");

  // -----------------------------------
  // LOGOUT
  // -----------------------------------
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminLoggedIn");

    window.location.href = "/secure";
  };

  // -----------------------------------
  // OPEN GALLERY
  // -----------------------------------
  const openGallery = () => {
    setActiveSection("gallery");
    setShowGalleryManager(false);
    setMessage("");
  };

  // -----------------------------------
  // OPEN GALLERY FORM
  // -----------------------------------
  const openGalleryManager = () => {
    setShowGalleryManager(true);
    setMessage("");
  };

  // -----------------------------------
  // CLOSE GALLERY FORM
  // -----------------------------------
  const closeGalleryManager = () => {
    setShowGalleryManager(false);
    setMessage("");
  };

  // -----------------------------------
  // IMAGE SELECTION
  // -----------------------------------
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setSelectedFile(null);
      setPreview("");
      return;
    }

    setSelectedFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    setMessage("");
  };

  // -----------------------------------
  // GALLERY FORM SUBMIT
  // -----------------------------------
  const handleGallerySubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setMessage("Please enter an image title.");
      return;
    }

    if (!selectedFile) {
      setMessage("Please select an image.");
      return;
    }

    /*
      IMPORTANT:

      Your backend gallery upload API is not confirmed yet.

      So we are NOT calling:
      http://localhost:5000/api/admin/gallery

      here.

      This prevents the "failed to fetch" problem while
      we finish the backend gallery route.
    */

    setMessage(
      "Image selected successfully. Gallery upload API will be connected next."
    );
  };

  // -----------------------------------
  // CLEAR FORM
  // -----------------------------------
  const clearGalleryForm = () => {
    setTitle("");
    setCaption("");
    setCategory("Public Events");
    setSelectedFile(null);
    setPreview("");
    setMessage("");
  };

  // -----------------------------------
  // SIDEBAR BUTTON CLASS
  // -----------------------------------
  const sidebarButton = (section) => {
    return `w-full flex items-center gap-4 px-4 py-3 rounded-lg mb-2 text-left transition ${
      activeSection === section
        ? "bg-green-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* =========================================
          SIDEBAR
      ========================================= */}
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">

        {/* ADMIN TITLE */}
        <div className="p-7 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Panel
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Portfolio Management
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-5 overflow-y-auto">

          {/* MAIN */}
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Main
          </p>

          <button
            onClick={() => {
              setActiveSection("dashboard");
              setShowGalleryManager(false);
              setMessage("");
            }}
            className={sidebarButton("dashboard")}
          >
            <LayoutDashboard size={21} />
            Dashboard
          </button>

          {/* WEBSITE */}
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mt-8 mb-4">
            Website
          </p>

          <button
            onClick={() => setActiveSection("home")}
            className={sidebarButton("home")}
          >
            <Home size={21} />
            Home
          </button>

          <button
            onClick={() => setActiveSection("about")}
            className={sidebarButton("about")}
          >
            <User size={21} />
            About
          </button>

          <button
            onClick={() => setActiveSection("biography")}
            className={sidebarButton("biography")}
          >
            <BookOpen size={21} />
            Biography
          </button>

          <button
            onClick={() => setActiveSection("political")}
            className={sidebarButton("political")}
          >
            <Landmark size={21} />
            Political Career
          </button>

          <button
            onClick={() => setActiveSection("development")}
            className={sidebarButton("development")}
          >
            <Building2 size={21} />
            Development
          </button>

          {/* CONTENT */}
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mt-8 mb-4">
            Content
          </p>

          <button
            onClick={() => setActiveSection("news")}
            className={sidebarButton("news")}
          >
            <Newspaper size={21} />
            News
          </button>

          <button
            onClick={() => setActiveSection("articles")}
            className={sidebarButton("articles")}
          >
            <FileText size={21} />
            Articles
          </button>

          {/* GALLERY */}
          <button
            onClick={openGallery}
            className={sidebarButton("gallery")}
          >
            <Image size={21} />
            Gallery
          </button>

          <button
            onClick={() => setActiveSection("videos")}
            className={sidebarButton("videos")}
          >
            <Video size={21} />
            Videos
          </button>

          {/* OTHER */}
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mt-8 mb-4">
            Other
          </p>

          <button
            onClick={() => setActiveSection("contact")}
            className={sidebarButton("contact")}
          >
            <Phone size={21} />
            Contact
          </button>

          <button
            onClick={() => setActiveSection("settings")}
            className={sidebarButton("settings")}
          >
            <Settings size={21} />
            Settings
          </button>

        </nav>

        {/* LOGOUT */}
        <div className="p-5 border-t border-gray-200">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition text-left"
          >
            <LogOut size={21} />
            Logout
          </button>

        </div>
      </aside>

      {/* =========================================
          MAIN AREA
      ========================================= */}
      <main className="flex-1 min-w-0">

        {/* TOP HEADER */}
        <header className="h-24 bg-white border-b border-gray-200 flex items-center justify-between px-10">

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {activeSection === "dashboard"
                ? "Dashboard"
                : activeSection === "gallery"
                ? "Gallery"
                : activeSection.charAt(0).toUpperCase() +
                  activeSection.slice(1)}
            </h2>

            <p className="text-gray-500">
              Manage your portfolio content
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="text-right">
              <p className="font-medium text-gray-900">
                Administrator
              </p>

              <p className="text-sm text-gray-500">
                Website Admin
              </p>
            </div>

            <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-semibold">
              A
            </div>

          </div>

        </header>

        {/* =========================================
            PAGE CONTENT
        ========================================= */}
        <div className="p-10">

          {/* =====================================
              DASHBOARD
          ===================================== */}
          {activeSection === "dashboard" && (
            <div className="bg-white rounded-2xl shadow-sm p-10">

              <h1 className="text-3xl font-bold text-gray-900">
                Welcome to Admin Dashboard
              </h1>

              <p className="text-gray-500 mt-2">
                Manage your portfolio website from this panel.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-10">

                <div className="p-6 rounded-xl bg-green-50">
                  <h3 className="font-semibold text-gray-900">
                    Website
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    Manage website pages and content.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    Content
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    Manage news, articles and gallery.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-orange-50">
                  <h3 className="font-semibold text-gray-900">
                    Settings
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    Manage administrator settings.
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* =====================================
              GALLERY INTRODUCTION
          ===================================== */}
          {activeSection === "gallery" &&
            !showGalleryManager && (
              <div className="bg-white rounded-2xl shadow-sm p-12">

                <div className="text-center max-w-3xl mx-auto">

                  <div className="w-20 h-20 mx-auto rounded-2xl bg-green-50 flex items-center justify-center">
                    <Image
                      size={40}
                      className="text-green-600"
                    />
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mt-8">
                    Gallery Management
                  </h1>

                  <p className="text-gray-500 text-lg mt-4">
                    This section allows the administrator to add,
                    edit, replace and delete gallery photographs
                    displayed on the public portfolio.
                  </p>

                  <button
                    onClick={openGalleryManager}
                    className="mt-8 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-4 rounded-xl font-semibold transition"
                  >
                    <Plus size={21} />
                    Add New Gallery
                  </button>

                </div>

              </div>
            )}

          {/* =====================================
              GALLERY FORM
          ===================================== */}
          {activeSection === "gallery" &&
            showGalleryManager && (
              <div className="bg-white rounded-2xl shadow-sm p-10">

                {/* FORM HEADER */}
                <div className="flex items-center justify-between mb-8">

                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Gallery Management
                    </h1>

                    <p className="text-gray-500 mt-2">
                      Add a new photograph to your public gallery.
                    </p>
                  </div>

                  <button
                    onClick={closeGalleryManager}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                  >
                    <X size={20} />
                    Close
                  </button>

                </div>

                {/* MESSAGE */}
                {message && (
                  <div className="mb-6 rounded-xl border border-green-200 bg-green-50 text-green-700 px-5 py-4">
                    {message}
                  </div>
                )}

                {/* FORM */}
                <form
                  onSubmit={handleGallerySubmit}
                  className="grid lg:grid-cols-2 gap-10"
                >

                  {/* LEFT SIDE */}
                  <div className="space-y-6">

                    {/* TITLE */}
                    <div>
                      <label className="block font-medium text-gray-800 mb-2">
                        Image Title
                      </label>

                      <input
                        type="text"
                        value={title}
                        onChange={(e) =>
                          setTitle(e.target.value)
                        }
                        placeholder="Enter image title"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    {/* CAPTION */}
                    <div>
                      <label className="block font-medium text-gray-800 mb-2">
                        Caption
                      </label>

                      <textarea
                        rows="5"
                        value={caption}
                        onChange={(e) =>
                          setCaption(e.target.value)
                        }
                        placeholder="Enter image caption"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                      />
                    </div>

                    {/* CATEGORY */}
                    <div>
                      <label className="block font-medium text-gray-800 mb-2">
                        Section / Category
                      </label>

                      <select
                        value={category}
                        onChange={(e) =>
                          setCategory(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="Public Events">
                          Public Events
                        </option>

                        <option value="Constituency">
                          Constituency
                        </option>

                        <option value="Meetings">
                          Meetings
                        </option>

                        <option value="Events">
                          Events
                        </option>
                      </select>
                    </div>

                    {/* IMAGE */}
                    <div>
                      <label className="block font-medium text-gray-800 mb-2">
                        Image
                      </label>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3"
                      />
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-4">

                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-xl font-semibold transition"
                      >
                        Upload Image
                      </button>

                      <button
                        type="button"
                        onClick={clearGalleryForm}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-7 py-3 rounded-xl font-semibold transition"
                      >
                        Clear
                      </button>

                    </div>

                  </div>

                  {/* RIGHT SIDE - PREVIEW */}
                  <div>

                    <label className="block font-medium text-gray-800 mb-2">
                      Preview
                    </label>

                    <div className="h-96 border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50">

                      {preview ? (
                        <img
                          src={preview}
                          alt="Selected preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center text-gray-400">

                          <Image
                            size={60}
                            className="mx-auto mb-4"
                          />

                          <p>
                            Select an image to preview
                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </form>

              </div>
            )}

          {/* =====================================
              OTHER SECTIONS
          ===================================== */}
          {activeSection !== "dashboard" &&
            activeSection !== "gallery" && (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

                <h1 className="text-3xl font-bold text-gray-900">
                  {activeSection.charAt(0).toUpperCase() +
                    activeSection.slice(1)}
                </h1>

                <p className="text-gray-500 mt-3">
                  This section will be developed next.
                </p>

              </div>
            )}

        </div>
      </main>
    </div>
  );
}
