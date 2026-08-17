import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditDevelopment = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // ===============================
  // LOAD DEVELOPMENT CONTENT
  // ===============================

  useEffect(() => {
    const loadDevelopment = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/content"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load development content"
          );
        }

        setTitle(
          data.development?.title || ""
        );

        setDescription(
          data.development?.description || ""
        );
      } catch (error) {
        console.error(
          "Error loading development:",
          error
        );

        setMessage(
          error.message ||
            "Failed to load development content"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDevelopment();
  }, []);

  // ===============================
  // SAVE DEVELOPMENT CONTENT
  // ===============================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/content/development",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            developmentTitle: title,
            developmentDescription: description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update development content"
        );
      }

      setMessage(
        "Development content updated successfully!"
      );
    } catch (error) {
      console.error(
        "Error updating development:",
        error
      );

      setMessage(
        "Error: " + error.message
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
          Loading development content...
        </p>
      </div>
    );
  }

  // ===============================
  // PAGE
  // ===============================

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      <div className="max-w-4xl mx-auto">

        {/* ===============================
            PAGE HEADER
        =============================== */}

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-5 mb-8">

          <div>
            <p className="text-sm font-semibold tracking-widest text-orange-600">
              ADMIN PANEL
            </p>

            <h1 className="text-3xl font-bold text-slate-800 mt-1">
              Edit Development
            </h1>

            <p className="text-slate-500 mt-2">
              Update development content.
            </p>
          </div>

          {/* Back Button */}

          <button
            type="button"
            onClick={() =>
              navigate("/admin/development")
            }
            className="
              border
              border-slate-300
              bg-white
              hover:bg-slate-50
              px-5
              py-3
              rounded-xl
              text-slate-700
              font-medium
              transition
            "
          >
            Back
          </button>

        </div>

        {/* ===============================
            DEVELOPMENT FORM
        =============================== */}

        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            border
            border-slate-200
            rounded-2xl
            p-6
            md:p-8
            shadow-sm
          "
        >

          {/* Development Title */}

          <div className="mb-6">

            <label
              htmlFor="developmentTitle"
              className="
                block
                font-medium
                text-slate-700
                mb-2
              "
            >
              Development Title
            </label>

            <input
              id="developmentTitle"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Enter development title..."
              className="
                w-full
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                text-slate-700
                focus:outline-none
                focus:ring-2
                focus:ring-green-600
                focus:border-green-600
              "
            />

          </div>

          {/* Development Description */}

          <div>

            <label
              htmlFor="developmentDescription"
              className="
                block
                font-medium
                text-slate-700
                mb-2
              "
            >
              Development Description
            </label>

            <textarea
              id="developmentDescription"
              rows="12"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Enter development description..."
              className="
                w-full
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                text-slate-700
                leading-7
                resize-y
                focus:outline-none
                focus:ring-2
                focus:ring-green-600
                focus:border-green-600
              "
            />

          </div>

          {/* ===============================
              MESSAGE
          =============================== */}

          {message && (
            <div
              className="
                mt-6
                border
                border-slate-200
                bg-slate-50
                rounded-xl
                px-4
                py-3
                text-sm
                text-slate-700
              "
            >
              {message}
            </div>
          )}

          {/* ===============================
              SAVE BUTTON
          =============================== */}

          <div className="flex justify-end mt-6">

            <button
              type="submit"
              disabled={saving}
              className="
                bg-orange-500
                hover:bg-orange-600
                disabled:bg-orange-300
                disabled:cursor-not-allowed
                text-white
                px-8
                py-3
                rounded-xl
                font-semibold
                transition
              "
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

export default EditDevelopment;