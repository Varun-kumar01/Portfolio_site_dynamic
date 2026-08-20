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
// SORTABLE NEWS ITEM
// =====================================================

const SortableNewsItem = ({
  item,
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
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        rounded-xl
        border
        border-gray-200
        bg-white
        p-5
        transition
        ${
          isDragging
            ? "shadow-xl ring-2 ring-orange-300"
            : "hover:border-orange-300"
        }
      `}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="flex min-w-0 gap-4">

          {/* DRAG HANDLE */}

          <button
            type="button"
            {...attributes}
            {...listeners}
            className="
              flex
              h-10
              w-10
              shrink-0
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
            ⋮⋮
          </button>

          {/* IMAGE */}

          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.title}
              className="
                h-28
                w-40
                shrink-0
                rounded-lg
                object-cover
              "
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div
              className="
                flex
                h-28
                w-40
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-gray-100
                text-xs
                text-gray-400
              "
            >
              No Image
            </div>
          )}

          {/* DETAILS */}

          <div className="min-w-0">

            <span
              className="
                inline-block
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

            <h3 className="mt-2 text-lg font-bold text-gray-900">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {item.published_date
                ? String(item.published_date).substring(
                    0,
                    10
                  )
                : ""}
            </p>

            {item.description && (
              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                {item.description}
              </p>
            )}

            {/* ORDER NUMBER */}

            <p className="mt-2 text-xs font-medium text-gray-400">
              Display order: {item.display_order ?? 0}
            </p>

          </div>
        </div>

        {/* =================================================
            ACTION BUTTONS
        ================================================= */}

        <div className="flex shrink-0 gap-3">

          <button
            type="button"
            onClick={() => handleEdit(item)}
            className="
              rounded-lg
              border
              border-blue-200
              bg-blue-50
              px-5
              py-2.5
              text-sm
              font-semibold
              text-blue-600
              hover:bg-blue-100
            "
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              handleDelete(item.id)
            }
            className="
              rounded-lg
              border
              border-red-200
              bg-red-50
              px-5
              py-2.5
              text-sm
              font-semibold
              text-red-600
              hover:bg-red-100
            "
          >
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

      const response =
        await authFetch(
          `${API_URL}?t=${Date.now()}`
        );

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const result =
        await response.json();

      if (!result.success) {
        throw new Error(
          result.message ||
            "Unable to load news"
        );
      }

      const data =
        Array.isArray(result.data)
          ? result.data
          : [];

      setNewsData(data);

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

  useEffect(() => {
    loadNews();
  }, []);

  // =====================================================
  // HANDLE TEXT INPUT
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  // =====================================================
  // HANDLE IMAGE
  // =====================================================

  const handleImageChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setError(
        "Please select a valid image."
      );

      e.target.value = "";
      return;
    }

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

    setSelectedImage(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(
      previewUrl
    );
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setFormData(emptyForm);
    setSelectedImage(null);
    setImagePreview("");
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  // =====================================================
  // ADD / UPDATE NEWS
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const data =
        new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "content",
        formData.content
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
        formData.link
      );

      /*
        Do NOT send display_order while adding/editing
        unless you specifically want to change it.
        Backend keeps the existing order during edit
        and assigns a new item to the end during add.
      */

      if (selectedImage) {
        data.append(
          "image",
          selectedImage
        );
      }

      const url =
        editingId
          ? `${API_URL}/${editingId}`
          : API_URL;

      const method =
        editingId
          ? "PUT"
          : "POST";

      const response =
        await authFetch(
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
            "Unable to save news"
        );
      }

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
  // EDIT NEWS
  // =====================================================

  const handleEdit = (item) => {
    setEditingId(
      item.id
    );

    setFormData({
      title:
        item.title || "",

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
      item.image_url || ""
    );

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // DELETE NEWS
  // =====================================================

  const handleDelete =
    async (id) => {

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
              "Unable to delete news"
          );
        }

        setSuccess(
          "News deleted successfully."
        );

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
      }
    };

  // =====================================================
  // SAVE DRAG ORDER
  // =====================================================

  const saveNewsOrder = async (
    reorderedNews
  ) => {
    try {
      setSavingOrder(true);
      setError("");
      setSuccess("");

      /*
        Send every item's new position
        to PostgreSQL.
      */

      for (
        let index = 0;
        index < reorderedNews.length;
        index++
      ) {
        const item =
          reorderedNews[index];

        const response =
          await authFetch(
            `${API_URL}/${item.id}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                title:
                  item.title || "",

                description:
                  item.description || "",

                content:
                  item.content || "",

                category:
                  item.category ||
                  "News",

                published_date:
                  item.published_date ||
                  null,

                display_order:
                  index,

                link:
                  item.link || "",
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
              `Failed to save order for news ID ${item.id}`
          );
        }
      }

      /*
        Reload from PostgreSQL after all
        positions have been saved.
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
        Restore actual database order
        if saving fails.
      */

      await loadNews();

    } finally {
      setSavingOrder(false);
    }
  };

  // =====================================================
  // DRAG END
  // =====================================================

  const handleDragEnd =
    async (event) => {

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
            item.id === active.id
        );

      const newIndex =
        currentData.findIndex(
          (item) =>
            item.id === over.id
        );

      if (
        oldIndex === -1 ||
        newIndex === -1
      ) {
        return;
      }

      /*
        Create new visual order.
      */

      const reorderedNews =
        arrayMove(
          currentData,
          oldIndex,
          newIndex
        );

      /*
        Immediately update the screen.
      */

      const orderedWithDisplayOrder =
        reorderedNews.map(
          (item, index) => ({
            ...item,
            display_order:
              index,
          })
        );

      setNewsData(
        orderedWithDisplayOrder
      );

      /*
        Save to PostgreSQL.
      */

      await saveNewsOrder(
        orderedWithDisplayOrder
      );
    };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <section className="min-h-screen bg-gray-50 py-10">

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

            <h1 className="text-3xl font-bold text-gray-900">
              News Management
            </h1>

            <p className="mt-2 text-gray-600">
              Add, edit, delete and manage public news.
            </p>

          </div>

          {/* BACK TO DASHBOARD */}

          <button
            type="button"
            onClick={() =>
              navigate("/secure/admin/dashboard")
            }
            className="
              rounded-lg
              border
              border-gray-300
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-gray-700
              hover:bg-gray-50
            "
          >
            ← Back to Dashboard
          </button>

        </div>

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        {success && (
          <div
            className="
              mb-6
              rounded-lg
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
            ERROR MESSAGE
        ================================================= */}

        {error && (
          <div
            className="
              mb-6
              rounded-lg
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
            rounded-xl
            border
            border-gray-300
            bg-white
            p-6
            shadow-sm
            sm:p-8
          "
        >

          <h2 className="text-2xl font-bold text-gray-900">
            {editingId
              ? "Edit News"
              : "Add News"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter the information that should appear
            on the public News page.
          </p>

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

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
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
                  focus:border-orange-500
                  focus:ring-2
                  focus:ring-orange-100
                "
              />

            </div>

            {/* CATEGORY */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
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

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
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
                "
              />

            </div>

            {/* LINK */}

            <div className="md:col-span-2">

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
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
                "
              />

            </div>

            {/* IMAGE */}

            <div className="md:col-span-2">

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
                Upload Image
              </label>

              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
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
                "
              />

              <p className="mt-2 text-xs text-gray-500">
                JPG, JPEG, PNG or WEBP.
                Maximum 5 MB.
              </p>

              {imagePreview && (
                <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">

                  <img
                    src={imagePreview}
                    alt="News preview"
                    className="
                      h-64
                      w-full
                      object-cover
                    "
                  />

                </div>
              )}

            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
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
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
                "
              />

            </div>

            {/* CONTENT */}

            <div className="md:col-span-2">

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
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
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
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
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update News"
                  : "Add News"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={
                    resetForm
                  }
                  className="
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-6
                    py-3
                    font-semibold
                    text-gray-700
                    hover:bg-gray-50
                  "
                >
                  Cancel Edit
                </button>
              )}

            </div>

          </form>
        </div>

        {/* =================================================
            EXISTING NEWS
        ================================================= */}

        <div
          className="
            mt-10
            rounded-xl
            border
            border-gray-300
            bg-white
            p-6
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
              gap-2
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
                Drag the news cards up or down to
                change the public website order.
              </p>

            </div>

            {/* ORDER STATUS */}

            {savingOrder && (
              <div
                className="
                  rounded-full
                  bg-orange-50
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-orange-600
                "
              >
                Saving order...
              </div>
            )}

          </div>

          {/* LIST */}

          {loading ? (

            <div className="py-10 text-center text-gray-500">
              Loading news...
            </div>

          ) : newsData.length === 0 ? (

            <div
              className="
                rounded-lg
                border
                border-dashed
                border-gray-300
                py-10
                text-center
                text-gray-500
              "
            >
              No news records found.
            </div>

          ) : (

            <DndContext
              sensors={
                sensors
              }
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
                    (item) => (
                      <SortableNewsItem
                        key={
                          item.id
                        }
                        item={
                          item
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