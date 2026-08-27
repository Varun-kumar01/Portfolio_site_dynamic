import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../services/authFetch";
import { API_BASE_URL } from "../config";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import {
  Image as ImageIcon,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Save,
  X,
  RefreshCw,
  LayoutDashboard,
} from "lucide-react";

const API_URL = `${API_BASE_URL}/api/news`;

// =====================================================
// EMPTY FORM
// =====================================================

const emptyForm = {
  title: "",
  description: "",
  content: "",
  category: "Government",
  published_date: "",
  link: "",
};

// =====================================================
// IMAGE URL HELPER
// =====================================================

const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  if (image.startsWith("/")) {
    return `${API_BASE_URL}${image}`;
  }

  return `${API_BASE_URL}/${image}`;
};

// =====================================================
// SORTABLE NEWS ITEM
// =====================================================

const SortableNewsItem = ({
  item,
  index,
  handleEdit,
  handleDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 20 : "auto",
  };

  const imageUrl = getImageUrl(item.image_url);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        rounded-2xl
        border
        bg-white
        p-4
        sm:p-5
        transition-all
        ${
          isDragging
            ? "border-orange-400 shadow-xl ring-2 ring-orange-200"
            : "border-gray-200 hover:border-orange-300 hover:shadow-sm"
        }
      `}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

        {/* =================================================
            DRAG HANDLE
        ================================================= */}

        <div className="flex shrink-0 items-center justify-center lg:self-center">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="
              flex
              h-10
              w-10
              cursor-grab
              items-center
              justify-center
              rounded-lg
              border
              border-gray-200
              bg-gray-100
              text-gray-500
              hover:bg-orange-50
              hover:text-orange-600
              active:cursor-grabbing
            "
            title="Drag to reorder"
          >
            <GripVertical size={20} />
          </button>
        </div>

        {/* =================================================
            POSITION
        ================================================= */}

        <div className="flex shrink-0 items-center justify-center">
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-gray-900
              text-sm
              font-bold
              text-white
            "
          >
            {index + 1}
          </div>
        </div>

        {/* =================================================
            IMAGE
        ================================================= */}

        <div
          className="
            h-48
            w-full
            shrink-0
            overflow-hidden
            rounded-xl
            bg-gray-100
            sm:h-40
            sm:w-56
          "
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={item.title || "News image"}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                text-gray-400
              "
            >
              <div className="text-center">
                <ImageIcon
                  size={40}
                  className="mx-auto mb-2"
                />
                <span className="text-xs">
                  No Image
                </span>
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            DETAILS
        ================================================= */}

        <div className="min-w-0 flex-1">

          <div className="mb-2 flex flex-wrap items-center gap-2">

            <span
              className="
                rounded-full
                bg-orange-50
                px-3
                py-1
                text-xs
                font-semibold
                text-orange-600
              "
            >
              {item.category || "News"}
            </span>

            <span
              className="
                rounded-full
                bg-gray-100
                px-3
                py-1
                text-xs
                font-semibold
                text-gray-600
              "
            >
              Position #{index + 1}
            </span>

          </div>

          <h3
            className="
              break-words
              text-lg
              font-bold
              text-gray-900
              sm:text-xl
            "
          >
            {item.title || "Untitled News"}
          </h3>

          {item.published_date && (
            <p className="mt-1 text-sm text-gray-500">
              Published:{" "}
              {String(item.published_date).substring(
                0,
                10
              )}
            </p>
          )}

          {item.description && (
            <p
              className="
                mt-2
                max-w-3xl
                break-words
                text-sm
                leading-6
                text-gray-600
              "
            >
              {item.description}
            </p>
          )}

          <p className="mt-2 text-xs font-medium text-gray-400">
            Database display order:{" "}
            {item.display_order ?? index}
          </p>

        </div>

        {/* =================================================
            ACTION BUTTONS
        ================================================= */}

        <div
          className="
            flex
            w-full
            shrink-0
            gap-3
            lg:w-auto
            lg:flex-col
          "
        >

          <button
            type="button"
            onClick={() => handleEdit(item)}
            className="
              inline-flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-blue-200
              bg-blue-50
              px-5
              py-2.5
              text-sm
              font-semibold
              text-blue-600
              transition
              hover:bg-blue-100
              lg:flex-none
            "
          >
            <Edit size={17} />
            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              handleDelete(item.id)
            }
            className="
              inline-flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-red-200
              bg-red-50
              px-5
              py-2.5
              text-sm
              font-semibold
              text-red-600
              transition
              hover:bg-red-100
              lg:flex-none
            "
          >
            <Trash2 size={17} />
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};

// =====================================================
// ADMIN NEWS
// =====================================================

const AdminNews = () => {
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [newsData, setNewsData] = useState([]);

  const [formData, setFormData] =
    useState(emptyForm);

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [savingOrder, setSavingOrder] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =====================================================
  // DRAG SENSOR
  // =====================================================

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // =====================================================
  // LOAD NEWS
  // =====================================================

  const loadNews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await authFetch(
        `${API_URL}?t=${Date.now()}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Server returned ${response.status}`
        );
      }

      /*
       Backend response expected:

       {
         success: true,
         data: [...]
       }
      */

      const data = Array.isArray(result.data)
        ? result.data
        : Array.isArray(result)
        ? result
        : [];

      /*
       Sort by database display_order.
       This keeps frontend order synchronized
       with PostgreSQL.
      */

      const sortedData = [...data].sort(
        (a, b) =>
          Number(a.display_order ?? 0) -
          Number(b.display_order ?? 0)
      );

      setNewsData(sortedData);

    } catch (error) {
      console.error(
        "LOAD NEWS ERROR:",
        error
      );

      setError(
        error.message ||
          "Unable to load news."
      );

      setNewsData([]);

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadNews();
  }, []);

  // =====================================================
  // TEXT INPUT
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // IMAGE INPUT
  // =====================================================

  const handleImageChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    // Check image type
    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );

      e.target.value = "";
      return;
    }

    // Maximum 5 MB
    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        "Image must be less than 5 MB."
      );

      e.target.value = "";
      return;
    }

    setError("");
    setSuccess("");

    setSelectedImage(file);

    /*
      Revoke previous preview if needed
      before creating another object URL.
    */

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setFormData({
      ...emptyForm,
    });

    setSelectedImage(null);
    setImagePreview("");
    setEditingId(null);

    setError("");
    setSuccess("");
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // -----------------------------------------------
      // VALIDATION
      // -----------------------------------------------

      if (!formData.title.trim()) {
        throw new Error(
          "Please enter a news title."
        );
      }

      if (
        formData.link &&
        !/^https?:\/\/.+/i.test(
          formData.link.trim()
        )
      ) {
        throw new Error(
          "Read More Link must start with http:// or https://."
        );
      }

      // -----------------------------------------------
      // FORM DATA
      // -----------------------------------------------

      const data = new FormData();

      data.append(
        "title",
        formData.title.trim()
      );

      data.append(
        "description",
        formData.description.trim()
      );

      data.append(
        "content",
        formData.content.trim()
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "published_date",
        formData.published_date
      );

      data.append(
        "link",
        formData.link.trim()
      );

      /*
       Do not send display_order here.

       Backend should:
       - keep existing order while editing
       - assign new news to the end while adding
      */

      if (selectedImage) {
        data.append(
          "image",
          selectedImage
        );
      }

      // -----------------------------------------------
      // URL + METHOD
      // -----------------------------------------------

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId
        ? "PUT"
        : "POST";

      // -----------------------------------------------
      // API REQUEST
      // -----------------------------------------------

      const response = await authFetch(
        url,
        {
          method,
          body: data,
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            `Unable to ${
              editingId
                ? "update"
                : "add"
            } news.`
        );
      }

      // -----------------------------------------------
      // SUCCESS
      // -----------------------------------------------

      setSuccess(
        editingId
          ? "News updated successfully."
          : "News added successfully."
      );

      await loadNews();

      resetForm();

    } catch (error) {
      console.error(
        "SAVE NEWS ERROR:",
        error
      );

      setError(
        error.message ||
          "Unable to save news."
      );

    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      title: item.title || "",

      description:
        item.description || "",

      content:
        item.content || "",

      category:
        item.category ||
        "Government",

      published_date:
        item.published_date
          ? String(
              item.published_date
            ).substring(0, 10)
          : "",

      link:
        item.link || "",
    });

    setSelectedImage(null);

    setImagePreview(
      getImageUrl(item.image_url)
    );

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this news?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");
      setSaving(true);

      const response =
        await authFetch(
          `${API_URL}/${id}`,
          {
            method: "DELETE",
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to delete news."
        );
      }

      setSuccess(
        "News deleted successfully."
      );

      /*
       Reload database order after delete.
      */

      await loadNews();

    } catch (error) {
      console.error(
        "DELETE NEWS ERROR:",
        error
      );

      setError(
        error.message ||
          "Unable to delete news."
      );

    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // SAVE ORDER
  // =====================================================

  const saveNewsOrder = async (
    reorderedNews
  ) => {
    try {
      setSavingOrder(true);
      setError("");
      setSuccess("");

      /*
       We update only display_order.

       This avoids accidentally overwriting
       title/content/image data during reorder.
      */

      const order = reorderedNews.map(
        (item, index) => ({
          id: item.id,
          display_order: index,
        })
      );

      const response =
        await authFetch(
          `${API_URL}/reorder`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              order,
            }),
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to save news order."
        );
      }

      /*
       Get the real order from PostgreSQL.
      */

      await loadNews();

      setSuccess(
        "News order updated successfully."
      );

    } catch (error) {
      console.error(
        "SAVE NEWS ORDER ERROR:",
        error
      );

      setError(
        error.message ||
          "Unable to save news order."
      );

      /*
       Restore database order.
      */

      await loadNews();

    } finally {
      setSavingOrder(false);
    }
  };

  // =====================================================
  // DRAG END
  // =====================================================

  const handleDragEnd = async (event) => {
    const {
      active,
      over,
    } = event;

    if (
      !over ||
      active.id === over.id
    ) {
      return;
    }

    const currentData =
      [...newsData];

    const oldIndex =
      currentData.findIndex(
        (item) =>
          String(item.id) ===
          String(active.id)
      );

    const newIndex =
      currentData.findIndex(
        (item) =>
          String(item.id) ===
          String(over.id)
      );

    if (
      oldIndex === -1 ||
      newIndex === -1
    ) {
      return;
    }

    /*
     Create new order.
    */

    const reorderedNews =
      arrayMove(
        currentData,
        oldIndex,
        newIndex
      ).map(
        (item, index) => ({
          ...item,
          display_order: index,
        })
      );

    /*
     Immediately update UI.
    */

    setNewsData(
      reorderedNews
    );

    /*
     Save to backend.
    */

    await saveNewsOrder(
      reorderedNews
    );
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancelEdit = () => {
    resetForm();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <section className="min-h-screen bg-gray-50 py-6 sm:py-10">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div>
            <h1
              className="
                text-2xl
                font-bold
                text-gray-900
                sm:text-3xl
              "
            >
              News Management
            </h1>

            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Add, edit, delete and manage public news.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/secure/admin/dashboard"
              )
            }
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-gray-300
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-gray-700
              transition
              hover:bg-gray-50
            "
          >
            <LayoutDashboard size={18} />
            Back to Dashboard
          </button>

        </div>

        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (
          <div
            className="
              mb-6
              rounded-xl
              border
              border-green-200
              bg-green-50
              px-4
              py-3
              text-sm
              text-green-700
            "
          >
            {success}
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div
            className="
              mb-6
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-700
            "
          >
            {error}
          </div>
        )}

        {/* =================================================
            FORM
        ================================================= */}

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            sm:p-8
          "
        >

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                {editingId
                  ? "Edit News"
                  : "Add News"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter the information that should appear
                on the public News page.
              </p>

            </div>

            {editingId && (
              <button
                type="button"
                onClick={
                  handleCancelEdit
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-gray-100
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-gray-700
                  hover:bg-gray-200
                "
              >
                <X size={17} />
                Cancel Edit
              </button>
            )}

          </div>

          <form
            onSubmit={handleSubmit}
            className="
              mt-8
              grid
              grid-cols-1
              gap-6
              md:grid-cols-2
            "
          >

            {/* TITLE */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                placeholder="Enter news title"
                required
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-orange-500
                  focus:ring-2
                  focus:ring-orange-100
                "
              />

            </div>

            {/* CATEGORY */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  outline-none
                  focus:border-orange-500
                "
              >
                <option value="Government">
                  Government
                </option>

                <option value="Public">
                  Public
                </option>

                <option value="Healthcare">
                  Healthcare
                </option>

                <option value="Education">
                  Education
                </option>

                <option value="Agriculture">
                  Agriculture
                </option>
              </select>

            </div>

            {/* DATE */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Published Date
              </label>

              <input
                type="date"
                name="published_date"
                value={
                  formData.published_date
                }
                onChange={
                  handleChange
                }
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
                  focus:border-orange-500
                "
              />

            </div>

            {/* LINK */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Read More Link
              </label>

              <input
                type="url"
                name="link"
                value={
                  formData.link
                }
                onChange={
                  handleChange
                }
                placeholder="https://example.com/news"
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
                  focus:border-orange-500
                "
              />

            </div>

            {/* IMAGE */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-gray-700">
                {editingId
                  ? "Replace Image (Optional)"
                  : "Upload Image"}
              </label>

              <input
                type="file"
                accept="
                  image/jpeg,
                  image/jpg,
                  image/png,
                  image/webp
                "
                onChange={
                  handleImageChange
                }
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                "
              />

              <p className="mt-2 text-xs text-gray-500">
                JPG, JPEG, PNG or WEBP.
                Maximum 5 MB.
              </p>

              {editingId && (
                <p className="mt-1 text-xs text-gray-500">
                  Leave the image empty to keep
                  the current image.
                </p>
              )}

              {imagePreview && (
                <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">

                  <img
                    src={imagePreview}
                    alt="News preview"
                    className="
                      h-64
                      w-full
                      object-cover
                      sm:h-80
                    "
                    onError={(e) => {
                      e.currentTarget.style.display =
                        "none";
                    }}
                  />

                </div>
              )}

            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                rows={4}
                placeholder="Short description"
                className="
                  w-full
                  resize-y
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
                  focus:border-orange-500
                "
              />

            </div>

            {/* CONTENT */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Content
              </label>

              <textarea
                name="content"
                value={
                  formData.content
                }
                onChange={
                  handleChange
                }
                rows={7}
                placeholder="Full news content..."
                className="
                  w-full
                  resize-y
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
                  focus:border-orange-500
                "
              />

            </div>

            {/* BUTTONS */}

            <div
              className="
                flex
                flex-wrap
                gap-3
                md:col-span-2
              "
            >

              <button
                type="submit"
                disabled={
                  saving ||
                  savingOrder
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-orange-600
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-orange-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                {saving ? (
                  <>
                    <RefreshCw
                      size={18}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : editingId ? (
                  <>
                    <Save size={18} />
                    Update News
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Add News
                  </>
                )}

              </button>

              <button
                type="button"
                onClick={
                  resetForm
                }
                disabled={saving}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-6
                  py-3
                  font-semibold
                  text-gray-700
                  hover:bg-gray-50
                  disabled:opacity-50
                "
              >
                <X size={18} />
                Clear
              </button>

            </div>

          </form>

        </div>

        {/* =================================================
            EXISTING NEWS
        ================================================= */}

        <div
          className="
            mt-10
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            sm:p-8
          "
        >

          {/* HEADING */}

          <div
            className="
              mb-6
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                Existing News
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Drag the news cards to change
                their order on the public website.
              </p>

            </div>

            <div className="flex flex-wrap items-center gap-3">

              <span
                className="
                  rounded-full
                  bg-gray-100
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-gray-700
                "
              >
                {newsData.length} News
              </span>

              {savingOrder && (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-orange-50
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-orange-600
                  "
                >
                  <RefreshCw
                    size={15}
                    className="animate-spin"
                  />
                  Saving order...
                </span>
              )}

            </div>

          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="py-12 text-center text-gray-500">
              <RefreshCw
                size={30}
                className="mx-auto mb-3 animate-spin"
              />

              Loading news...
            </div>
          )}

          {/* =================================================
              EMPTY
          ================================================= */}

          {!loading &&
            newsData.length === 0 && (
              <div
                className="
                  rounded-xl
                  border-2
                  border-dashed
                  border-gray-300
                  py-14
                  text-center
                "
              >

                <ImageIcon
                  size={45}
                  className="mx-auto mb-4 text-gray-300"
                />

                <h3 className="text-lg font-semibold text-gray-700">
                  No news records found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Add your first news article
                  using the form above.
                </p>

              </div>
            )}

          {/* =================================================
              NEWS LIST
          ================================================= */}

          {!loading &&
            newsData.length > 0 && (
              <DndContext
                sensors={sensors}
                collisionDetection={
                  closestCenter
                }
                onDragEnd={
                  handleDragEnd
                }
              >

                <SortableContext
                  items={newsData.map(
                    (item) =>
                      item.id
                  )}
                  strategy={
                    verticalListSortingStrategy
                  }
                >

                  <div className="space-y-4">

                    {newsData.map(
                      (item, index) => (
                        <SortableNewsItem
                          key={
                            item.id
                          }
                          item={
                            item
                          }
                          index={
                            index
                          }
                          handleEdit={
                            handleEdit
                          }
                          handleDelete={
                            handleDelete
                          }
                        />
                      )
                    )}

                  </div>

                </SortableContext>

              </DndContext>
            )}

        </div>

      </div>

    </section>
  );
};

export default AdminNews;