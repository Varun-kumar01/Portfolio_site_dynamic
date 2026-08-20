import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../services/authFetch";
import { API_BASE_URL } from "../config";
import {
  ArrowLeft,
  LayoutDashboard,
  Save,
} from "lucide-react";

const EditBiography = () => {
  const navigate = useNavigate();

  // ===============================
  // BIOGRAPHY STATE
  // ===============================

  const [biography, setBiography] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  const [isError, setIsError] = useState(false);

  // ===============================
  // LOAD EXISTING BIOGRAPHY
  // ===============================

  useEffect(() => {
    const loadBiography = async () => {
      try {
        setLoading(true);
        setMessage("");

        const response = await authFetch(
          `${API_BASE_URL}/api/content`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load biography"
          );
        }

        // Existing biography automatically
        // appears inside textarea

        setBiography(
          data.biography?.biographyContent || ""
        );

      } catch (error) {

        console.error(
          "Error loading biography:",
          error
        );

        setIsError(true);

        setMessage(
          error.message ||
            "Failed to load biography"
        );

      } finally {

        setLoading(false);

      }
    };

    loadBiography();

  }, []);

  // ===============================
  // SAVE BIOGRAPHY
  // ===============================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      setSaving(true);
      setMessage("");
      setIsError(false);

      const response = await authFetch(
        `${API_BASE_URL}/api/content/biography`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            biographyContent: biography,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to update biography"
        );
      }

      setIsError(false);

      setMessage(
        result.message ||
          "Biography content updated successfully!"
      );

    } catch (error) {

      console.error(
        "Error updating biography:",
        error
      );

      setIsError(true);

      setMessage(
        error.message ||
          "Failed to update biography"
      );

    } finally {

      setSaving(false);

    }
  };

  // ===============================
  // LOADING SCREEN
  // ===============================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <p className="text-slate-600">
          Loading biography content...
        </p>

      </div>
    );
  }

  // ===============================
  // PAGE
  // ===============================

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-8">

          <div>

            <p className="text-sm font-semibold tracking-widest text-orange-600 uppercase">
              Admin Panel
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">
              Edit Biography
            </h1>

            <p className="text-slate-500 mt-2">
              Update the complete biography content.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            {/* BACK */}

            <button
              type="button"
              onClick={() =>
                navigate("/secure/admin/biography")
              }
              className="flex items-center gap-2 border border-slate-300 bg-white px-5 py-3 rounded-xl hover:bg-slate-100 transition"
            >
              <ArrowLeft size={18} />

              Back
            </button>

            {/* DASHBOARD */}

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

        {/* ================= BIOGRAPHY FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm"
        >

          {/* LABEL */}

          <label
            htmlFor="biography"
            className="block font-medium text-slate-700 mb-2"
          >
            Biography Content
          </label>

          {/* TEXTAREA */}

          <textarea
            id="biography"
            rows="22"
            value={biography}
            onChange={(event) =>
              setBiography(event.target.value)
            }
            placeholder="Enter biography content..."
            className="w-full border border-slate-300 rounded-xl px-4 py-4 text-slate-700 leading-7 resize-y focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
          />

          {/* CHARACTER COUNT */}

          <div className="mt-2 text-right text-xs text-slate-400">
            {biography.length} characters
          </div>

          {/* MESSAGE */}

          {message && (
            <div
              className={`mt-6 border rounded-xl px-4 py-3 text-sm ${
                isError
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-green-50 text-green-700 border-green-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* BUTTONS */}

          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">

            {/* CANCEL */}

            <button
              type="button"
              onClick={() =>
                navigate("/secure/admin/biography")
              }
              className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-medium transition"
            >
              Cancel
            </button>

            {/* SAVE */}

            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              <Save size={18} />

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

export default EditBiography;