import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LayoutDashboard } from "lucide-react";

const EditAbout = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    aboutName: "",
    aboutPosition: "",
    aboutDescription: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================
  // LOAD EXISTING ABOUT CONTENT
  // =========================

  useEffect(() => {
    const loadAboutContent = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/content"
        );

        if (!response.ok) {
          throw new Error("Failed to load About content");
        }

        const data = await response.json();

        setFormData({
          aboutName: data.about?.aboutName || "",
          aboutPosition: data.about?.aboutPosition || "",
          aboutDescription:
            data.about?.aboutDescription || "",
        });
      } catch (error) {
        console.error("Error loading About content:", error);

        setMessage(
          "Error loading About content: " + error.message
        );
      } finally {
        setLoading(false);
      }
    };

    loadAboutContent();
  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // =========================
  // SAVE ABOUT CONTENT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/api/content/about",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to update About content"
        );
      }

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
          (
            error.message ||
            "Failed to update About content"
          )
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600">
          Loading About content...
        </p>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

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

          <div className="flex gap-3">

            <button
              onClick={() => navigate("/admin/about")}
              className="flex items-center gap-2 border border-slate-300 bg-white px-5 py-3 rounded-xl hover:bg-slate-100 transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 border border-slate-300 bg-white px-5 py-3 rounded-xl hover:bg-slate-100 transition"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

          </div>

        </div>


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10"
        >

          {/* NAME */}

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


          {/* POSITION */}

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


          {/* DESCRIPTION */}

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


          {/* MESSAGE */}

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


          {/* BUTTONS */}

          <div className="flex justify-end gap-4 mt-8">

            <button
              type="button"
              onClick={() => navigate("/admin/about")}
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