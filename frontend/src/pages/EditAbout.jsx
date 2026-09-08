import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  LayoutDashboard,
  Image as ImageIcon,
} from "lucide-react";

import { authFetch } from "../services/authFetch";
import { API_BASE_URL } from "../config";

const EditAbout = () => {
  const navigate = useNavigate();

  // ============================================================
  // FORM DATA
  // ============================================================

  const [formData, setFormData] = useState({
    aboutName: "",
    aboutPosition: "",
    aboutDescription: "",
    aboutImage: "",
  });

  // ============================================================
  // IMAGE STATE
  // ============================================================

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // ============================================================
  // PAGE STATE
  // ============================================================

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ============================================================
  // LOAD ABOUT CONTENT FROM POSTGRESQL
  // ============================================================

  useEffect(() => {
    const loadAboutContent = async () => {
      try {
        setLoading(true);
        setMessage("");

        const response = await authFetch(
          `${API_BASE_URL}/api/about`
        );

        if (!response.ok) {
          const result = await response
            .json()
            .catch(() => ({}));

          throw new Error(
            result.message ||
              "Failed to load About content"
          );
        }

        const data = await response.json();

        console.log("ABOUT DATA FROM DATABASE:", data);

        // ======================================================
        // SET FORM DATA
        // ======================================================

        setFormData({
          aboutName:
            data.about?.aboutName || "",

          aboutPosition:
            data.about?.aboutPosition || "",

          aboutDescription:
            data.about?.aboutDescription || "",

          aboutImage:
            data.about?.aboutImage || "",
        });

        // ======================================================
        // SET EXISTING IMAGE PREVIEW
        // ======================================================

        setImagePreview(
          data.about?.aboutImage || ""
        );

      } catch (error) {
        console.error(
          "Error loading About content:",
          error
        );

        setMessage(
          "Error loading About content: " +
            (error.message || "Unknown error")
        );
      } finally {
        setLoading(false);
      }
    };

    loadAboutContent();
  }, []);

  // ============================================================
  // HANDLE TEXT INPUT CHANGE
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ============================================================
  // HANDLE IMAGE SELECTION
  // ============================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // ========================================================
    // CHECK IMAGE TYPE
    // ========================================================

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage(
        "Error: Please select a JPG, PNG, or WEBP image."
      );

      // Clear selected file
      e.target.value = "";
      return;
    }

    // ========================================================
    // CHECK IMAGE SIZE
    // ========================================================

    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (file.size > maxSize) {
      setMessage(
        "Error: Image size must be less than 10 MB."
      );

      // Clear selected file
      e.target.value = "";
      return;
    }

    // ========================================================
    // SAVE SELECTED FILE
    // ========================================================

    setImageFile(file);

    // ========================================================
    // CREATE IMAGE PREVIEW
    // ========================================================

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);

    // Clear error message
    setMessage("");
  };

  // ============================================================
  // SAVE ABOUT CONTENT + IMAGE
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      // ======================================================
      // CREATE MULTIPART FORM DATA
      // ======================================================

      const formDataToSend = new FormData();

      // Text fields
      formDataToSend.append(
        "aboutName",
        formData.aboutName
      );

      formDataToSend.append(
        "aboutPosition",
        formData.aboutPosition
      );

      formDataToSend.append(
        "aboutDescription",
        formData.aboutDescription
      );

      // ======================================================
      // ADD IMAGE ONLY IF A NEW IMAGE WAS SELECTED
      // ======================================================

      if (imageFile) {
        formDataToSend.append(
          "aboutImage",
          imageFile
        );
      }

      console.log(
        "Saving About content..."
      );

      console.log(
        "New image:",
        imageFile
          ? imageFile.name
          : "No new image selected"
      );

      // ======================================================
      // SEND TO BACKEND
      // ======================================================

      const response = await authFetch(
        `${API_BASE_URL}/api/content/about`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "adminToken"
            )}`,
          },

          // IMPORTANT:
          // Do NOT set Content-Type here.
          //
          // Browser automatically sets:
          // multipart/form-data; boundary=...
          //
          body: formDataToSend,
        }
      );

      const result = await response.json();

      console.log(
        "UPDATE ABOUT RESPONSE:",
        result
      );

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to update About content"
        );
      }

      // ======================================================
      // UPDATE FORM WITH DATABASE RESPONSE
      // ======================================================

      if (result.about) {
        setFormData({
          aboutName:
            result.about.aboutName || "",

          aboutPosition:
            result.about.aboutPosition || "",

          aboutDescription:
            result.about.aboutDescription || "",

          aboutImage:
            result.about.aboutImage || "",
        });

        // ====================================================
        // UPDATE IMAGE PREVIEW
        // ====================================================

        setImagePreview(
          result.about.aboutImage || ""
        );
      }

      // ======================================================
      // CLEAR SELECTED FILE
      // ======================================================

      setImageFile(null);

      // ======================================================
      // UPDATE LOCAL STORAGE CACHE
      // ======================================================

      localStorage.setItem(
        "about_page_latest",
        JSON.stringify({
          success: true,
          about: result.about,
          updatedAt:
            result.about?.updatedAt ||
            new Date().toISOString(),
        })
      );

      // ======================================================
      // SUCCESS MESSAGE
      // ======================================================

      setMessage(
        result.message ||
          "About content updated successfully!"
      );

    } catch (error) {
      console.error(
        "Error updating About content:",
        error
      );

      setMessage(
        "Error: " +
          (error.message ||
            "Failed to update About content")
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600">
          Loading About content...
        </p>
      </div>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      <div className="max-w-6xl mx-auto">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-8">

          <div>
            <p className="text-sm font-semibold tracking-widest text-orange-600 uppercase">
              Admin Panel
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">
              Edit About Page
            </h1>

            <p className="text-slate-500 mt-2">
              Update the About section content.
            </p>
          </div>

          {/* ===================================================
              HEADER BUTTONS
          ==================================================== */}

          <div className="flex gap-3">

            <button
              type="button"
              onClick={() =>
                navigate("/secure/admin/about")
              }
              className="flex items-center gap-2 border border-slate-300 bg-white px-5 py-3 rounded-xl hover:bg-slate-100 transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/secure/admin/dashboard")
              }
              className="flex items-center gap-2 border border-slate-300 bg-white px-5 py-3 rounded-xl hover:bg-slate-100 transition"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

          </div>
        </div>

        {/* =====================================================
            FORM
        ====================================================== */}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10"
        >

          {/* ===================================================
              NAME
          ==================================================== */}

          <div className="mb-6">

            <label className="block text-slate-700 font-medium mb-2">
              Name
            </label>

            <input
              type="text"
              name="aboutName"
              value={formData.aboutName}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full border border-slate-300 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-green-600"
            />

          </div>

          {/* ===================================================
              POSITION
          ==================================================== */}

          <div className="mb-6">

            <label className="block text-slate-700 font-medium mb-2">
              Position
            </label>

            <input
              type="text"
              name="aboutPosition"
              value={formData.aboutPosition}
              onChange={handleChange}
              placeholder="Enter position"
              className="w-full border border-slate-300 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-green-600"
            />

          </div>

          {/* ===================================================
              DESCRIPTION
          ==================================================== */}

          <div className="mb-6">

            <label className="block text-slate-700 font-medium mb-2">
              About Description
            </label>

            <textarea
              name="aboutDescription"
              value={formData.aboutDescription}
              onChange={handleChange}
              rows="10"
              placeholder="Enter About description"
              className="w-full border border-slate-300 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-green-600 resize-y"
            />

          </div>

          {/* ===================================================
              ABOUT IMAGE UPLOAD
          ==================================================== */}

          <div className="mb-8">

            <label className="block text-slate-700 font-medium mb-2">
              About Image
            </label>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 bg-slate-50">

              {/* =================================================
                  IMAGE ICON / TITLE
              ================================================== */}

              <div className="flex items-center gap-3 mb-4">

                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <ImageIcon
                    size={22}
                    className="text-green-700"
                  />
                </div>

                <div>
                  <p className="font-medium text-slate-700">
                    Upload About Image
                  </p>

                  <p className="text-sm text-slate-400">
                    Choose an image for the About page.
                  </p>
                </div>

              </div>

              {/* =================================================
                  FILE INPUT
              ================================================== */}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="
                  block
                  w-full
                  text-sm
                  text-slate-600

                  file:mr-4
                  file:py-2
                  file:px-4

                  file:rounded-lg
                  file:border-0

                  file:bg-green-700
                  file:text-white

                  file:font-medium
                  file:cursor-pointer

                  hover:file:bg-green-800
                "
              />

              {/* =================================================
                  IMAGE REQUIREMENTS
              ================================================== */}

              <p className="text-sm text-slate-400 mt-3">
                Supported formats: JPG, PNG, WEBP
              </p>

              <p className="text-sm text-slate-400">
                Maximum image size: 10 MB
              </p>

              {/* =================================================
                  SELECTED FILE NAME
              ================================================== */}

              {imageFile && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3">

                  <p className="text-sm text-green-700 font-medium">
                    New image selected:
                  </p>

                  <p className="text-sm text-green-600 mt-1 break-all">
                    {imageFile.name}
                  </p>

                </div>
              )}

              {/* =================================================
                  IMAGE PREVIEW
              ================================================== */}

              {imagePreview && (
                <div className="mt-6">

                  <p className="text-sm font-medium text-slate-700 mb-3">
                    Image Preview
                  </p>

                  <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <img
                      src={imagePreview}
                      alt="About Preview"
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        console.error(
                          "Failed to load image:",
                          imagePreview
                        );

                        e.currentTarget.style.display =
                          "none";
                      }}
                    />

                  </div>

                </div>
              )}

              {/* =================================================
                  NO IMAGE
              ================================================== */}

              {!imagePreview && (
                <div className="mt-5 p-5 bg-white rounded-xl border border-slate-200 text-center">

                  <ImageIcon
                    size={40}
                    className="mx-auto text-slate-300 mb-2"
                  />

                  <p className="text-sm text-slate-500">
                    No About image uploaded yet.
                  </p>

                </div>
              )}

            </div>
          </div>

          {/* ===================================================
              MESSAGE
          ==================================================== */}

          {message && (
            <div
              className={`mb-6 px-4 py-3 rounded-xl border ${
                message.startsWith("Error")
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-green-50 text-green-700 border-green-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* ===================================================
              BUTTONS
          ==================================================== */}

          <div className="flex justify-end gap-4 mt-8">

            <button
              type="button"
              onClick={() =>
                navigate("/secure/admin/about")
              }
              className="px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-8 py-3 rounded-xl font-medium transition"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditAbout;