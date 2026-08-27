import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Image,
  Plus,
  X,
  Edit,
  Trash2,
  Save,
  GripVertical,
  LayoutDashboard,
} from "lucide-react";

import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/gallery`;

export default function AdminGallery() {
  const navigate = useNavigate();

  // =========================================
  // FORM VISIBILITY
  // =========================================

  const [showGalleryManager, setShowGalleryManager] =
    useState(false);

  // =========================================
  // EDIT MODE
  // =========================================

  const [editingId, setEditingId] = useState(null);

  // =========================================
  // FORM VALUES
  // =========================================

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] =
    useState("Public Events");

  // =========================================
  // IMAGE
  // =========================================

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [preview, setPreview] = useState("");

  // =========================================
  // EXISTING GALLERY
  // =========================================

  const [galleryItems, setGalleryItems] =
    useState([]);

  // =========================================
  // DRAG STATE
  // =========================================

  const [draggedItemId, setDraggedItemId] =
    useState(null);

  const [dragOverItemId, setDragOverItemId] =
    useState(null);

  // =========================================
  // LOADING
  // =========================================

  const [loading, setLoading] = useState(false);

  // =========================================
  // MESSAGE
  // =========================================

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================================
  // GET TOKEN
  // =========================================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("adminToken")
    );
  };

  // =========================================
  // BUILD BACKEND IMAGE URL
  // =========================================
  //
  // IMPORTANT:
  //
  // Database should ideally contain:
  //
  // /uploads/gallery/gallery1.jpeg
  //
  // NOT:
  //
  // http://localhost:5000/uploads/gallery/gallery1.jpeg
  //
  // This function supports both old and new records.
  // =========================================

  const getImageUrl = (item) => {
    const image =
      item?.image_url ||
      item?.image ||
      item?.image_path ||
      item?.photo ||
      "";

    if (!image) {
      return "";
    }

    let imagePath = String(image).trim();

    if (!imagePath) {
      return "";
    }

    // =========================================
    // REMOVE OLD LOCALHOST URL
    // =========================================

    imagePath = imagePath.replace(
      /^https?:\/\/localhost:\d+/i,
      ""
    );

    // =========================================
    // REMOVE POSSIBLE FRONTEND ORIGIN
    // =========================================

    imagePath = imagePath.replace(
      /^https?:\/\/127\.0\.0\.1:\d+/i,
      ""
    );

    // =========================================
    // NORMALIZE SLASHES
    // =========================================

    imagePath = imagePath.replace(/\\/g, "/");

    // =========================================
    // MAKE SURE PATH STARTS WITH /
    // =========================================

    if (!imagePath.startsWith("/")) {
      imagePath = `/${imagePath}`;
    }

    // =========================================
    // FINAL BACKEND URL
    // =========================================

    return `${API_BASE_URL}${imagePath}`;
  };

  // =========================================
  // FETCH EXISTING GALLERY
  // =========================================

  const fetchGallery = async () => {
    try {
      setError("");

      const response = await fetch(
        `${API_URL}?t=${Date.now()}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Backend returned invalid gallery data."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load gallery."
        );
      }

      const items = Array.isArray(data)
        ? data
        : Array.isArray(data.gallery)
        ? data.gallery
        : Array.isArray(data.data)
        ? data.data
        : [];

      setGalleryItems(items);
    } catch (error) {
      console.error(
        "GALLERY FETCH ERROR:",
        error
      );

      setError(
        error.message ||
          "Unable to load gallery photos."
      );
    }
  };

  // =========================================
  // LOAD GALLERY
  // =========================================

  useEffect(() => {
    fetchGallery();
  }, []);

  // =========================================
  // OPEN ADD FORM
  // =========================================

  const openGalleryManager = () => {
    clearGalleryForm();

    setEditingId(null);

    setMessage("");
    setError("");

    setShowGalleryManager(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // CLOSE FORM
  // =========================================

  const closeGalleryManager = () => {
    clearGalleryForm();

    setEditingId(null);

    setMessage("");
    setError("");

    setShowGalleryManager(false);
  };

  // =========================================
  // IMAGE SELECTION
  // =========================================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    // =========================================
    // IMAGE TYPE VALIDATION
    // =========================================

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      );

      e.target.value = "";
      return;
    }

    // =========================================
    // IMAGE SIZE VALIDATION
    // =========================================

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Image must be less than 5 MB."
      );

      e.target.value = "";
      return;
    }

    // =========================================
    // TEMPORARY FRONTEND PREVIEW
    // =========================================
    //
    // This is ONLY for preview.
    //
    // The actual image will be uploaded
    // to backend when Submit is clicked.
    // =========================================

    setSelectedFile(file);

    const imageUrl =
      URL.createObjectURL(file);

    setPreview(imageUrl);

    setMessage("");
    setError("");
  };

  // =========================================
  // ADD / UPDATE GALLERY
  // =========================================

  const handleGallerySubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // =========================================
    // TITLE VALIDATION
    // =========================================

    if (!title.trim()) {
      setError(
        "Please enter an image title."
      );
      return;
    }

    // =========================================
    // IMAGE REQUIRED FOR NEW RECORD
    // =========================================

    if (!editingId && !selectedFile) {
      setError(
        "Please select an image."
      );
      return;
    }

    try {
      setLoading(true);

      // =========================================
      // FORM DATA
      // =========================================

      const formData = new FormData();

      formData.append(
        "title",
        title.trim()
      );

      formData.append(
        "caption",
        caption.trim()
      );

      formData.append(
        "category",
        category
      );

      // =========================================
      // IMPORTANT:
      // IMAGE GOES TO BACKEND
      // =========================================

      if (selectedFile) {
        formData.append(
          "image",
          selectedFile
        );
      }

      const token = getToken();

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId
        ? "PUT"
        : "POST";

      // =========================================
      // SEND TO BACKEND
      // =========================================

      const response = await fetch(
        url,
        {
          method,

          headers: token
            ? {
                Authorization:
                  `Bearer ${token}`,
              }
            : undefined,

          // DO NOT SET Content-Type HERE
          //
          // Browser automatically sets:
          // multipart/form-data boundary
          //
          body: formData,
        }
      );

      const text =
        await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Backend returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Failed to ${
              editingId
                ? "update"
                : "upload"
            } gallery photo.`
        );
      }

      // =========================================
      // SUCCESS
      // =========================================

      setMessage(
        editingId
          ? "Gallery photo updated successfully."
          : "Gallery photo uploaded successfully."
      );

      // =========================================
      // GET FRESH DATA FROM BACKEND
      // =========================================

      await fetchGallery();

      // =========================================
      // CLEAR FORM
      // =========================================

      clearGalleryForm();

      setEditingId(null);

      setShowGalleryManager(false);
    } catch (error) {
      console.error(
        "GALLERY SAVE ERROR:",
        error
      );

      setError(
        error.message ||
          "Failed to save gallery photo."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // EDIT
  // =========================================

  const handleEdit = (item) => {
    setEditingId(item.id);

    setTitle(
      item.title || ""
    );

    setCaption(
      item.caption || ""
    );

    setCategory(
      item.category ||
        "Public Events"
    );

    // No new file selected initially
    setSelectedFile(null);

    // Existing image comes from BACKEND
    setPreview(
      getImageUrl(item)
    );

    setMessage("");
    setError("");

    setShowGalleryManager(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // DELETE
  // =========================================

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this gallery photo?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      setMessage("");
      setError("");

      const token = getToken();

      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: "DELETE",

            headers: token
              ? {
                  Authorization:
                    `Bearer ${token}`,
                }
              : undefined,
          }
        );

      const text =
        await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Backend returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete gallery photo."
        );
      }

      setMessage(
        "Gallery photo deleted successfully."
      );

      await fetchGallery();
    } catch (error) {
      console.error(
        "GALLERY DELETE ERROR:",
        error
      );

      setError(
        error.message ||
          "Failed to delete gallery photo."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // CLEAR FORM
  // =========================================

  const clearGalleryForm = () => {
    setTitle("");

    setCaption("");

    setCategory(
      "Public Events"
    );

    setSelectedFile(null);

    setPreview("");

    setMessage("");
    setError("");
  };

  // =========================================
  // DRAG START
  // =========================================

  const handleDragStart = (
    e,
    id
  ) => {
    setDraggedItemId(id);

    e.dataTransfer.effectAllowed =
      "move";

    e.dataTransfer.setData(
      "text/plain",
      String(id)
    );
  };

  // =========================================
  // DRAG OVER
  // =========================================

  const handleDragOver = (
    e,
    id
  ) => {
    e.preventDefault();

    e.dataTransfer.dropEffect =
      "move";

    setDragOverItemId(id);
  };

  // =========================================
  // DRAG LEAVE
  // =========================================

  const handleDragLeave = () => {
    setDragOverItemId(null);
  };

  // =========================================
  // DRAG END
  // =========================================

  const handleDragEnd = () => {
    setDraggedItemId(null);

    setDragOverItemId(null);
  };

  // =========================================
  // DROP
  // =========================================

  const handleDrop = async (
    e,
    targetId
  ) => {
    e.preventDefault();

    const sourceId = Number(
      e.dataTransfer.getData(
        "text/plain"
      )
    );

    setDragOverItemId(null);

    setDraggedItemId(null);

    if (
      !sourceId ||
      sourceId === targetId
    ) {
      return;
    }

    const oldItems = [
      ...galleryItems,
    ];

    const sourceIndex =
      oldItems.findIndex(
        (item) =>
          Number(item.id) ===
          sourceId
      );

    const targetIndex =
      oldItems.findIndex(
        (item) =>
          Number(item.id) ===
          targetId
      );

    if (
      sourceIndex === -1 ||
      targetIndex === -1
    ) {
      return;
    }

    const newItems = [
      ...oldItems,
    ];

    const [
      movedItem,
    ] = newItems.splice(
      sourceIndex,
      1
    );

    newItems.splice(
      targetIndex,
      0,
      movedItem
    );

    setGalleryItems(newItems);

    await saveGalleryOrder(
      newItems
    );
  };

  // =========================================
  // SAVE ORDER
  // =========================================

  const saveGalleryOrder = async (
    items
  ) => {
    try {
      setMessage("");
      setError("");

      const token = getToken();

      const order = items.map(
        (item, index) => ({
          id: item.id,
          display_order:
            index + 1,
        })
      );

      const response =
        await fetch(
          `${API_URL}/reorder`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              ...(token
                ? {
                    Authorization:
                      `Bearer ${token}`,
                  }
                : {}),
            },

            body: JSON.stringify({
              order,
            }),
          }
        );

      const text =
        await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Backend returned an invalid reorder response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save gallery order."
        );
      }

      setMessage(
        "Gallery order updated successfully."
      );
    } catch (error) {
      console.error(
        "GALLERY REORDER ERROR:",
        error
      );

      setError(
        error.message ||
          "The new order could not be saved."
      );

      await fetchGallery();
    }
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="p-6 lg:p-10">

      {/* =====================================
          TOP HEADER
      ===================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gallery Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all photographs displayed
            on the public gallery.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/secure/admin/dashboard"
            )
          }
          className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          <LayoutDashboard size={19} />

          Back to Dashboard
        </button>

      </div>

      {/* =====================================
          INTRODUCTION
      ===================================== */}

      {!showGalleryManager && (
        <div className="bg-white rounded-2xl shadow-sm p-12">

          <div className="text-center max-w-3xl mx-auto">

            <div className="w-20 h-20 mx-auto rounded-2xl bg-green-50 flex items-center justify-center">

              <Image
                size={40}
                className="text-green-600"
              />

            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-8">
              Gallery Management
            </h2>

            <p className="text-gray-500 text-lg mt-4">
              Add, edit, replace, delete and
              reorder photographs displayed
              on the public gallery.
            </p>

            <button
              type="button"
              onClick={
                openGalleryManager
              }
              className="mt-8 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-4 rounded-xl font-semibold transition"
            >
              <Plus size={21} />

              Add New Gallery
            </button>

          </div>

        </div>
      )}

      {/* =====================================
          ADD / EDIT FORM
      ===================================== */}

      {showGalleryManager && (
        <div className="bg-white rounded-2xl shadow-sm p-10">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold text-gray-900">

                {editingId
                  ? "Edit Gallery Photo"
                  : "Add Gallery Photo"}

              </h2>

              <p className="text-gray-500 mt-2">

                {editingId
                  ? "Update the gallery photograph."
                  : "Add a new photograph to your public gallery."}

              </p>

            </div>

            <button
              type="button"
              onClick={
                closeGalleryManager
              }
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
            >

              <X size={20} />

              Close

            </button>

          </div>

          {message && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 text-green-700 px-5 py-4">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 text-red-700 px-5 py-4">
              {error}
            </div>
          )}

          <form
            onSubmit={
              handleGallerySubmit
            }
            className="grid lg:grid-cols-2 gap-10"
          >

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
                    setTitle(
                      e.target.value
                    )
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
                    setCaption(
                      e.target.value
                    )
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
                    setCategory(
                      e.target.value
                    )
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

                  {editingId
                    ? "Replace Image (Optional)"
                    : "Image"}

                </label>

                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={
                    handleFileChange
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />

                {editingId && (
                  <p className="text-sm text-gray-500 mt-2">
                    Leave empty to keep the existing backend image.
                  </p>
                )}

              </div>

              {/* BUTTONS */}

              <div className="flex flex-wrap gap-4">

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-7 py-3 rounded-xl font-semibold transition"
                >

                  {editingId ? (
                    <>
                      <Save size={18} />

                      {loading
                        ? "Updating..."
                        : "Update Image"}
                    </>
                  ) : (
                    <>
                      <Plus size={18} />

                      {loading
                        ? "Uploading..."
                        : "Upload Image"}
                    </>
                  )}

                </button>

                <button
                  type="button"
                  onClick={
                    clearGalleryForm
                  }
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-7 py-3 rounded-xl font-semibold transition"
                >
                  Clear
                </button>

              </div>

            </div>

            {/* PREVIEW */}

            <div>

              <label className="block font-medium text-gray-800 mb-2">
                Preview
              </label>

              <div className="h-96 border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50">

                {preview ? (
                  <img
                    src={preview}
                    alt="Gallery preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display =
                        "none";
                    }}
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
          EXISTING PHOTOS
      ===================================== */}

      <div className="bg-white rounded-2xl shadow-sm p-8 mt-8">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

          <div>

            <h2 className="text-2xl font-bold text-gray-900">
              Existing Gallery Photos
            </h2>

            <p className="text-gray-500 mt-1">
              Drag and drop photos to change
              their order on the public page.
            </p>

          </div>

          <div className="flex items-center gap-3">

            <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium">
              {galleryItems.length} Photos
            </span>

            <button
              type="button"
              onClick={
                openGalleryManager
              }
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              <Plus size={18} />

              Add
            </button>

          </div>

        </div>

        {message && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 text-green-700 px-5 py-4">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 text-red-700 px-5 py-4">
            {error}
          </div>
        )}

        {loading &&
          galleryItems.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              Loading gallery photos...
            </div>
          )}

        {!loading &&
          galleryItems.length === 0 && (
            <div className="border-2 border-dashed border-gray-200 rounded-2xl py-16 text-center">

              <Image
                size={55}
                className="mx-auto text-gray-300 mb-4"
              />

              <h3 className="text-lg font-semibold text-gray-700">
                No gallery photos yet
              </h3>

              <p className="text-gray-500 mt-2">
                Add your first gallery photograph.
              </p>

            </div>
          )}

        {galleryItems.length > 0 && (
          <div className="space-y-4">

            {galleryItems.map(
              (item, index) => {

                // =================================
                // IMAGE COMES FROM BACKEND
                // =================================

                const imageUrl =
                  getImageUrl(item);

                const isDragging =
                  draggedItemId ===
                  item.id;

                const isDragOver =
                  dragOverItemId ===
                  item.id;

                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(
                        e,
                        item.id
                      )
                    }
                    onDragOver={(e) =>
                      handleDragOver(
                        e,
                        item.id
                      )
                    }
                    onDragLeave={
                      handleDragLeave
                    }
                    onDrop={(e) =>
                      handleDrop(
                        e,
                        item.id
                      )
                    }
                    onDragEnd={
                      handleDragEnd
                    }
                    className={`
                      border rounded-2xl p-4
                      flex flex-col lg:flex-row
                      gap-5
                      transition-all
                      cursor-grab
                      active:cursor-grabbing

                      ${
                        isDragOver
                          ? "border-orange-400 bg-orange-50 ring-2 ring-orange-200"
                          : "border-gray-200 hover:border-gray-300"
                      }

                      ${
                        isDragging
                          ? "opacity-50 scale-[0.99]"
                          : "opacity-100"
                      }
                    `}
                  >

                    {/* DRAG HANDLE */}

                    <div className="flex items-center justify-center">

                      <div
                        className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
                        title="Drag to reorder"
                      >
                        <GripVertical
                          size={22}
                        />
                      </div>

                    </div>

                    {/* POSITION */}

                    <div className="flex items-center justify-center">

                      <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>

                    </div>

                    {/* BACKEND IMAGE */}

                    <div className="w-full lg:w-52 h-40 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">

                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={
                            item.title ||
                            "Gallery image"
                          }
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error(
                              "IMAGE LOAD ERROR:",
                              imageUrl
                            );

                            e.currentTarget.style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">

                          <Image
                            size={40}
                          />

                        </div>
                      )}

                    </div>

                    {/* DETAILS */}

                    <div className="flex-1 min-w-0">

                      <div className="flex flex-wrap items-center gap-2 mb-2">

                        <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                          {item.category ||
                            "Gallery"}
                        </span>

                        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          Position #
                          {index + 1}
                        </span>

                      </div>

                      <h3 className="text-xl font-bold text-gray-900 break-words">
                        {item.title ||
                          "Untitled"}
                      </h3>

                      <p className="text-gray-600 mt-2">
                        {item.caption ||
                          "No caption"}
                      </p>

                      {/* BACKEND PATH */}

                      {item.image_url && (
                        <p className="mt-3 text-xs text-gray-400 break-all">
                          {item.image_url}
                        </p>
                      )}

                    </div>

                    {/* ACTIONS */}

                    <div className="flex lg:flex-col gap-3 justify-center">

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          handleEdit(
                            item
                          );
                        }}
                        draggable={false}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium transition"
                      >

                        <Edit
                          size={17}
                        />

                        Edit

                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          handleDelete(
                            item.id
                          );
                        }}
                        draggable={false}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 font-medium transition"
                      >

                        <Trash2
                          size={17}
                        />

                        Delete

                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>

    </div>
  );
}