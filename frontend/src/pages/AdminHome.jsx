import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Home,
  Plus,
  ArrowLeft,
  LayoutDashboard,
  Upload,
  Image as ImageIcon,
  X,
} from "lucide-react";

const API_URL = "http://localhost:5000";

const AdminHome = () => {

  const navigate = useNavigate();

  // ==========================================================
  // STATES
  // ==========================================================

  const [showEditForm, setShowEditForm] =
    useState(false);

  const [formData, setFormData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    heroImage: "",
  });

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================================================
  // LOAD HOME CONTENT
  // ==========================================================

  useEffect(() => {

    const loadHomeContent = async () => {

      try {

        const response =
          await fetch(
            `${API_URL}/api/content`
          );

        if (!response.ok) {

          throw new Error(
            "Failed to load home content"
          );

        }

        const data =
          await response.json();

        console.log(
          "HOME CONTENT FROM SERVER:",
          data
        );

        const home =
          data.home || {};

        setFormData({

          heroTitle:
            home.heroTitle || "",

          heroSubtitle:
            home.heroSubtitle || "",

          heroDescription:
            home.heroDescription || "",

          heroImage:
            home.heroImage || "",

        });

        // ------------------------------------------------------
        // IMAGE PREVIEW
        // ------------------------------------------------------

        if (home.heroImage) {

          setImagePreview(
            getImageUrl(home.heroImage)
          );

        }

      } catch (error) {

        console.error(
          "Error loading home content:",
          error
        );

        setMessage(
          "Failed to load home content"
        );

      }

    };

    loadHomeContent();

  }, []);

  // ==========================================================
  // IMAGE URL HELPER
  // ==========================================================

  const getImageUrl = (imagePath) => {

    if (!imagePath) {
      return "";
    }

    // Already a complete URL
    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://")
    ) {

      return imagePath;

    }

    // Local upload path
    if (
      imagePath.startsWith("/uploads/")
    ) {

      return `${API_URL}${imagePath}`;

    }

    // Old local image such as /leader.png
    if (
      imagePath.startsWith("/")
    ) {

      return imagePath;

    }

    return `${API_URL}/${imagePath}`;

  };

  // ==========================================================
  // HANDLE INPUT CHANGE
  // ==========================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData(
      (previousData) => ({

        ...previousData,

        [name]: value,

      })
    );

  };

  // ==========================================================
  // HANDLE IMAGE SELECTION
  // ==========================================================

  const handleImageChange = (e) => {

    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    // --------------------------------------------------------
    // CHECK IMAGE
    // --------------------------------------------------------

    if (
      !file.type.startsWith("image/")
    ) {

      setMessage(
        "Please select a valid image file."
      );

      return;

    }

    // --------------------------------------------------------
    // CHECK FILE SIZE
    // --------------------------------------------------------

    if (
      file.size > 5 * 1024 * 1024
    ) {

      setMessage(
        "Image size must be less than 5 MB."
      );

      return;

    }

    // --------------------------------------------------------
    // SAVE SELECTED FILE
    // --------------------------------------------------------

    setSelectedImage(file);

    // --------------------------------------------------------
    // CREATE PREVIEW
    // --------------------------------------------------------

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(
      previewUrl
    );

    setMessage("");

    console.log(
      "NEW IMAGE SELECTED:",
      file.name
    );

  };

  // ==========================================================
  // REMOVE SELECTED IMAGE
  // ==========================================================

  const removeSelectedImage = () => {

    setSelectedImage(null);

    // Restore old image
    setImagePreview(
      getImageUrl(
        formData.heroImage
      )
    );

    setMessage("");

  };

  // ==========================================================
  // SAVE HOME CONTENT
  // ==========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setMessage("");

      console.log(
        "=========================================="
      );

      console.log(
        "SENDING HOME UPDATE"
      );

      console.log(
        "Hero Title:",
        formData.heroTitle
      );

      console.log(
        "Hero Subtitle:",
        formData.heroSubtitle
      );

      console.log(
        "Hero Description:",
        formData.heroDescription
      );

      console.log(
        "New Image:",
        selectedImage
          ? selectedImage.name
          : "No new image"
      );

      console.log(
        "=========================================="
      );

      // ------------------------------------------------------
      // CREATE FORMDATA
      // ------------------------------------------------------

      const uploadData =
        new FormData();

      uploadData.append(
        "heroTitle",
        formData.heroTitle || ""
      );

      uploadData.append(
        "heroSubtitle",
        formData.heroSubtitle || ""
      );

      uploadData.append(
        "heroDescription",
        formData.heroDescription || ""
      );

      // ------------------------------------------------------
      // IMPORTANT:
      // The backend expects "heroImage"
      // ------------------------------------------------------

      if (selectedImage) {

        uploadData.append(
          "heroImage",
          selectedImage
        );

      }

      // ------------------------------------------------------
      // SEND REQUEST
      // ------------------------------------------------------

      const response =
        await fetch(
          `${API_URL}/api/content/home`,
          {
            method: "PUT",
            body: uploadData,
          }
        );

      const result =
        await response.json();

      console.log(
        "HOME UPDATE RESPONSE:",
        result
      );

      // ------------------------------------------------------
      // ERROR
      // ------------------------------------------------------

      if (!response.ok) {

        throw new Error(
          result.message ||
          "Failed to update home content"
        );

      }

      // ------------------------------------------------------
      // UPDATE LOCAL FORM DATA
      // ------------------------------------------------------

      if (result.home) {

        setFormData({

          heroTitle:
            result.home.heroTitle || "",

          heroSubtitle:
            result.home.heroSubtitle || "",

          heroDescription:
            result.home.heroDescription || "",

          heroImage:
            result.home.heroImage || "",

        });

        // ----------------------------------------------------
        // UPDATE IMAGE PREVIEW
        // ----------------------------------------------------

        if (
          result.home.heroImage
        ) {

          setImagePreview(
            getImageUrl(
              result.home.heroImage
            )
          );

        }

      }

      // ------------------------------------------------------
      // CLEAR SELECTED IMAGE
      // ------------------------------------------------------

      setSelectedImage(null);

      // ------------------------------------------------------
      // SUCCESS MESSAGE
      // ------------------------------------------------------

      setMessage(
        "Home content updated successfully!"
      );

      console.log(
        "HOME CONTENT SAVED SUCCESSFULLY"
      );

    } catch (error) {

      console.error(
        "Error updating home:",
        error
      );

      setMessage(
        error.message ||
        "Failed to update home content"
      );

    } finally {

      setLoading(false);

    }

  };

  // ==========================================================
  // MANAGEMENT PAGE
  // ==========================================================

  if (!showEditForm) {

    return (

      <div className="min-h-screen bg-slate-100 p-6 md:p-8">

        {/* DASHBOARD BUTTON */}

        <div className="max-w-6xl mx-auto mb-6 flex justify-end">

          <button
            onClick={() =>
              navigate("/secure/admin/dashboard")
            }
            className="
              flex
              items-center
              gap-2
              px-5
              py-3
              border
              border-slate-300
              bg-white
              rounded-xl
              hover:bg-slate-100
              transition
              text-slate-700
            "
          >

            <LayoutDashboard size={18} />

            Back to Dashboard

          </button>

        </div>

        {/* HOME MANAGEMENT */}

        <div
          className="
            max-w-6xl
            mx-auto
            bg-white
            rounded-2xl
            border
            border-slate-200
            min-h-[350px]
            flex
            flex-col
            items-center
            justify-center
            px-6
          "
        >

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-green-50
              flex
              items-center
              justify-center
              mb-6
            "
          >

            <Home
              size={32}
              className="text-green-700"
            />

          </div>

          <h1 className="text-3xl font-bold text-slate-800">

            Home Management

          </h1>

          <p
            className="
              mt-3
              text-center
              text-slate-500
              max-w-xl
            "
          >

            This section allows the administrator
            to add, edit, and update home content
            on the public portfolio.

          </p>

          <button
            onClick={() => {

              setShowEditForm(true);

              setMessage("");

            }}
            className="
              mt-8
              flex
              items-center
              gap-2
              bg-green-700
              hover:bg-green-800
              text-white
              px-6
              py-3
              rounded-xl
              transition
            "
          >

            <Plus size={20} />

            Edit Home Content

          </button>

        </div>

      </div>

    );

  }

  // ==========================================================
  // EDIT FORM
  // ==========================================================

  return (

    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
            mb-8
          "
        >

          <div>

            <p
              className="
                text-sm
                font-semibold
                tracking-wider
                text-orange-600
                uppercase
              "
            >

              Admin Panel

            </p>

            <h1
              className="
                text-3xl
                font-bold
                text-slate-800
                mt-1
              "
            >

              Edit Home Page

            </h1>

            <p className="text-slate-500 mt-2">

              Update the Hero section content.

            </p>

          </div>

          {/* HEADER BUTTONS */}

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >

            <button
              onClick={() => {

                setShowEditForm(false);

                setMessage("");

              }}
              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                border
                border-slate-300
                bg-white
                rounded-xl
                hover:bg-slate-100
                transition
              "
            >

              <ArrowLeft size={18} />

              Back

            </button>

            <button
              onClick={() =>
                navigate("/secure/admin/dashboard")
              }
              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                border
                border-slate-300
                bg-white
                rounded-xl
                hover:bg-slate-100
                transition
              "
            >

              <LayoutDashboard size={18} />

              Dashboard

            </button>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            rounded-2xl
            border
            border-slate-200
            shadow-sm
            p-6
            md:p-8
          "
        >

          {/* HERO TITLE */}

          <div className="mb-6">

            <label
              className="
                block
                text-slate-700
                font-medium
                mb-2
              "
            >

              Hero Title

            </label>

            <input
              type="text"
              name="heroTitle"
              value={
                formData.heroTitle
              }
              onChange={
                handleChange
              }
              className="
                w-full
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-green-600
              "
              placeholder="Enter hero title"
            />

          </div>

          {/* HERO SUBTITLE */}

          <div className="mb-6">

            <label
              className="
                block
                text-slate-700
                font-medium
                mb-2
              "
            >

              Hero Subtitle

            </label>

            <input
              type="text"
              name="heroSubtitle"
              value={
                formData.heroSubtitle
              }
              onChange={
                handleChange
              }
              className="
                w-full
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-green-600
              "
              placeholder="Enter hero subtitle"
            />

          </div>

          {/* HERO DESCRIPTION */}

          <div className="mb-6">

            <label
              className="
                block
                text-slate-700
                font-medium
                mb-2
              "
            >

              Hero Description

            </label>

            <textarea
              name="heroDescription"
              value={
                formData.heroDescription
              }
              onChange={
                handleChange
              }
              rows="5"
              className="
                w-full
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-green-600
                resize-none
              "
              placeholder="Enter hero description"
            />

          </div>

          {/* IMAGE */}

          <div className="mb-6">

            <label
              className="
                block
                text-slate-700
                font-medium
                mb-2
              "
            >

              Hero Image

            </label>

            {/* UPLOAD AREA */}

            <label
              className="
                w-full
                min-h-[180px]
                border-2
                border-dashed
                border-slate-300
                rounded-xl
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
                hover:border-green-600
                hover:bg-green-50
                transition
                p-6
              "
            >

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={
                  handleImageChange
                }
                className="hidden"
              />

              {!imagePreview && (

                <>

                  <div
                    className="
                      w-14
                      h-14
                      rounded-full
                      bg-green-50
                      flex
                      items-center
                      justify-center
                      mb-4
                    "
                  >

                    <Upload
                      size={28}
                      className="text-green-700"
                    />

                  </div>

                  <p className="font-medium text-slate-700">

                    Click to upload an image

                  </p>

                  <p className="text-sm text-slate-400 mt-1">

                    PNG, JPG, JPEG or WEBP

                  </p>

                </>

              )}

              {imagePreview && (

                <div
                  className="
                    relative
                    w-full
                    flex
                    flex-col
                    items-center
                  "
                >

                  <img
                    src={
                      imagePreview
                    }
                    alt="Hero preview"
                    className="
                      max-h-64
                      max-w-full
                      object-contain
                      rounded-xl
                      border
                      border-slate-200
                    "
                    onError={(e) => {

                      console.error(
                        "IMAGE PREVIEW FAILED:",
                        imagePreview
                      );

                      e.currentTarget.style.display =
                        "none";

                    }}
                  />

                  {selectedImage && (

                    <p
                      className="
                        text-sm
                        text-green-700
                        font-medium
                        mt-3
                      "
                    >

                      New image selected:

                      {" "}

                      {selectedImage.name}

                    </p>

                  )}

                </div>

              )}

            </label>

            {/* IMAGE ACTIONS */}

            {imagePreview && (

              <div
                className="
                  flex
                  items-center
                  gap-4
                  mt-4
                "
              >

                <label
                  className="
                    flex
                    items-center
                    gap-2
                    text-green-700
                    cursor-pointer
                    font-medium
                  "
                >

                  <ImageIcon size={18} />

                  Change Image

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={
                      handleImageChange
                    }
                    className="hidden"
                  />

                </label>

                {selectedImage && (

                  <button
                    type="button"
                    onClick={
                      removeSelectedImage
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      text-red-600
                      font-medium
                    "
                  >

                    <X size={18} />

                    Cancel New Image

                  </button>

                )}

              </div>

            )}

            <p className="text-sm text-slate-400 mt-3">

              Maximum image size: 5 MB.

            </p>

          </div>

          {/* MESSAGE */}

          {message && (

            <div
              className={`
                mb-5
                px-4
                py-3
                rounded-xl
                border
                ${
                  message.includes(
                    "successfully"
                  )
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }
              `}
            >

              {message}

            </div>

          )}

          {/* BUTTONS */}

          <div
            className="
              flex
              justify-end
              gap-4
              mt-8
            "
          >

            <button
              type="button"
              onClick={() => {

                setShowEditForm(false);

                setMessage("");

              }}
              className="
                px-6
                py-3
                border
                border-slate-300
                rounded-xl
                hover:bg-slate-100
                transition
              "
            >

              Cancel

            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                bg-orange-600
                hover:bg-orange-700
                disabled:bg-orange-400
                text-white
                px-8
                py-3
                rounded-xl
                font-medium
                transition
              "
            >

              {loading
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default AdminHome;