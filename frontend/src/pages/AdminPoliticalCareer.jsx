import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const API_URL =
  "http://localhost:5000/api/political-career";

const CACHE_KEY = "political_career_cache";

const emptyForm = {
  year: "",
  position: "",
  organization: "",
  location: "",
  description: "",
  category: "Political Career",
  display_order: 0,
};

// =====================================================
// SORTABLE CAREER ITEM
// =====================================================

function SortableCareerItem({
  item,
  onEdit,
  onDelete,
}) {
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

        {/* LEFT SIDE */}

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
              bg-gray-100
              text-gray-500
              hover:bg-gray-200
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
              alt={item.position || "Political career"}
              className="
                h-28
                w-40
                shrink-0
                rounded-lg
                object-cover
              "
            />
          ) : (
            <div className="
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
            ">
              No Image
            </div>
          )}

          {/* DETAILS */}

          <div className="min-w-0">

            <span className="
              inline-block
              rounded-full
              bg-orange-50
              px-3
              py-1
              text-xs
              font-semibold
              text-orange-600
            ">
              {item.category || "Political Career"}
            </span>

            <p className="
              mt-2
              text-sm
              font-semibold
              text-orange-600
            ">
              {item.year}
            </p>

            <h3 className="
              mt-1
              text-lg
              font-bold
              text-gray-900
            ">
              {item.position}
            </h3>

            <p className="
              mt-1
              text-sm
              text-gray-600
            ">
              {item.organization}
            </p>

            <p className="
              mt-1
              text-sm
              text-gray-500
            ">
              {item.location}
            </p>

            {item.description && (
              <p className="
                mt-2
                line-clamp-2
                text-sm
                leading-6
                text-gray-600
              ">
                {item.description}
              </p>
            )}

          </div>
        </div>

        {/* ACTIONS */}

        <div className="flex shrink-0 gap-3">

          <button
            type="button"
            onClick={() => onEdit(item)}
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
            onClick={() => onDelete(item.id)}
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
}

// =====================================================
// ADMIN POLITICAL CAREER
// =====================================================

export default function AdminPoliticalCareer() {
  const navigate = useNavigate();

  const [careerData, setCareerData] = useState([]);
  const [formData, setFormData] = useState(emptyForm);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
  // LOAD POLITICAL CAREER
  // =====================================================

  const loadCareer = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}?t=${Date.now()}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(
          "Backend returned invalid political career data."
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            `Server returned ${response.status}`
        );
      }

      const latest = Array.isArray(result.data)
        ? result.data
        : [];

      setCareerData(latest);

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify(latest)
      );
    } catch (err) {
      console.error(
        "LOAD POLITICAL CAREER ERROR:",
        err
      );

      try {
        const cached =
          localStorage.getItem(CACHE_KEY);

        if (cached) {
          const parsed = JSON.parse(cached);

          if (Array.isArray(parsed)) {
            setCareerData(parsed);
          }
        }
      } catch (cacheError) {
        console.error(
          "POLITICAL CAREER CACHE ERROR:",
          cacheError
        );
      }

      setError(
        err.message ||
          "Unable to load political career."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCareer();
  }, []);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // YEAR / PERIOD
    //
    // Allowed examples:
    // 1996
    // 1996-2001
    // 1000-1234
    //
    // Maximum:
    // 4 digits + hyphen + 4 digits
    // ===================================================

    if (name === "year") {
      if (!/^\d{0,4}(-\d{0,4})?$/.test(value)) {
        return;
      }

      setFormData((previous) => ({
        ...previous,
        year: value,
      }));

      return;
    }

    // DISPLAY ORDER NUMBERS ONLY

    if (name === "display_order") {
      if (!/^\d*$/.test(value)) {
        return;
      }
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // IMAGE
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

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

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Image must be less than 5 MB."
      );

      e.target.value = "";
      return;
    }

    setSelectedImage(file);
    setImagePreview(
      URL.createObjectURL(file)
    );

    setError("");
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
  };

  // =====================================================
  // ADD / UPDATE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!formData.year) {
        throw new Error(
          "Year / Period is required."
        );
      }

      // Final validation
      if (
        !/^\d{4}(-\d{4})?$/.test(
          formData.year
        )
      ) {
        throw new Error(
          "Year / Period must be like 1996 or 1996-2001."
        );
      }

      if (!formData.position.trim()) {
        throw new Error(
          "Position / Designation is required."
        );
      }

      if (!formData.organization.trim()) {
        throw new Error(
          "Organization is required."
        );
      }

      if (!formData.location.trim()) {
        throw new Error(
          "Location / Constituency is required."
        );
      }

      const data = new FormData();

      data.append(
        "year",
        formData.year
      );

      data.append(
        "position",
        formData.position.trim()
      );

      data.append(
        "organization",
        formData.organization.trim()
      );

      data.append(
        "location",
        formData.location.trim()
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "category",
        formData.category ||
          "Political Career"
      );

      data.append(
        "display_order",
        String(
          Number(
            formData.display_order
          ) || 0
        )
      );

      if (selectedImage) {
        data.append(
          "image",
          selectedImage
        );
      }

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(
        url,
        {
          method: editingId
            ? "PUT"
            : "POST",
          body: data,
        }
      );

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(
          "Backend returned an invalid response."
        );
      }

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to save political career."
        );
      }

      await loadCareer();

      window.dispatchEvent(
        new Event(
          "political-career-updated"
        )
      );

      setSuccess(
        editingId
          ? "Political career updated successfully."
          : "Political career added successfully."
      );

      resetForm();
    } catch (err) {
      console.error(
        "SAVE POLITICAL CAREER ERROR:",
        err
      );

      setError(
        err.message ||
          "Unable to save political career."
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
      year: item.year || "",

      position:
        item.position || "",

      organization:
        item.organization || "",

      location:
        item.location || "",

      description:
        item.description || "",

      category:
        item.category ||
        "Political Career",

      display_order:
        item.display_order ?? 0,
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
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this political career entry?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: "DELETE",
          }
        );

      const text =
        await response.text();

      let result;

      try {
        result =
          JSON.parse(text);
      } catch {
        throw new Error(
          "Backend returned an invalid response."
        );
      }

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to delete political career entry."
        );
      }

      await loadCareer();

      window.dispatchEvent(
        new Event(
          "political-career-updated"
        )
      );

      setSuccess(
        "Political career entry deleted successfully."
      );
    } catch (err) {
      console.error(
        "DELETE POLITICAL CAREER ERROR:",
        err
      );

      setError(
        err.message ||
          "Unable to delete political career entry."
      );
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

    const oldIndex =
      careerData.findIndex(
        (item) =>
          item.id === active.id
      );

    const newIndex =
      careerData.findIndex(
        (item) =>
          item.id === over.id
      );

    if (
      oldIndex === -1 ||
      newIndex === -1
    ) {
      return;
    }

    const reordered =
      arrayMove(
        careerData,
        oldIndex,
        newIndex
      );

    // Show immediately
    setCareerData(reordered);

    try {
      for (
        let index = 0;
        index < reordered.length;
        index++
      ) {
        const item =
          reordered[index];

        const data =
          new FormData();

        data.append(
          "year",
          item.year || ""
        );

        data.append(
          "position",
          item.position || ""
        );

        data.append(
          "organization",
          item.organization || ""
        );

        data.append(
          "location",
          item.location || ""
        );

        data.append(
          "description",
          item.description || ""
        );

        data.append(
          "category",
          item.category ||
            "Political Career"
        );

        data.append(
          "display_order",
          String(index)
        );

        const response =
          await fetch(
            `${API_URL}/${item.id}`,
            {
              method: "PUT",
              body: data,
            }
          );

        const text =
          await response.text();

        let result;

        try {
          result =
            JSON.parse(text);
        } catch {
          throw new Error(
            "Invalid response while saving order."
          );
        }

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
              "Unable to save order."
          );
        }
      }

      const updated =
        reordered.map(
          (item, index) => ({
            ...item,
            display_order:
              index,
          })
        );

      setCareerData(updated);

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify(updated)
      );

      window.dispatchEvent(
        new Event(
          "political-career-updated"
        )
      );

      setSuccess(
        "Political career order updated successfully."
      );
    } catch (err) {
      console.error(
        "REORDER POLITICAL CAREER ERROR:",
        err
      );

      setError(
        err.message ||
          "Unable to save the new order."
      );

      await loadCareer();
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="
        mx-auto
        max-w-7xl
        px-4
        sm:px-6
        lg:px-8
      ">

        {/* HEADER */}

        <div className="
          mb-8
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        ">

          <div>

            <h1 className="
              text-3xl
              font-bold
              text-gray-900
            ">
              Political Career Management
            </h1>

            <p className="
              mt-2
              text-gray-600
            ">
              Add, edit, delete and reorder
              political career timeline entries.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/admin")
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

        {/* SUCCESS */}

        {success && (
          <div className="
            mb-6
            rounded-lg
            border
            border-green-200
            bg-green-50
            px-4
            py-3
            text-sm
            text-green-700
          ">
            {success}
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="
            mb-6
            rounded-lg
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-700
          ">
            {error}
          </div>
        )}

        {/* FORM */}

        <div className="
          rounded-xl
          border
          border-gray-300
          bg-white
          p-6
          shadow-sm
          sm:p-8
        ">

          <h2 className="
            text-2xl
            font-bold
            text-gray-900
          ">
            {editingId
              ? "Edit Political Career"
              : "Add Political Career"}
          </h2>

          <p className="
            mt-1
            text-sm
            text-gray-500
          ">
            Enter the details for the
            Political Career timeline.
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

            {/* YEAR / PERIOD */}

            <div>

              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              ">
                Year / Period
              </label>

              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                inputMode="numeric"
                autoComplete="off"
                maxLength={9}
                placeholder="1996-2001"
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

              <p className="
                mt-1
                text-xs
                text-gray-400
              ">
                Format: 1000-1234
              </p>

            </div>

            {/* POSITION */}

            <div>

              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              ">
                Position / Designation
              </label>

              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="General Secretary"
                required
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                "
              />

            </div>

            {/* ORGANIZATION */}

            <div>

              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              ">
                Organization
              </label>

              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Andhra Pradesh Youth Congress"
                required
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                "
              />

            </div>

            {/* LOCATION */}

            <div>

              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              ">
                Location / Constituency
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Dharmaram"
                required
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                "
              />

            </div>

            {/* CATEGORY */}

            <div>

              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              ">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                "
              />

            </div>

            {/* DISPLAY ORDER */}

            <div>

              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              ">
                Display Order
              </label>

              <input
                type="text"
                name="display_order"
                value={formData.display_order}
                onChange={handleChange}
                inputMode="numeric"
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                "
              />

            </div>

            {/* IMAGE */}

            <div className="md:col-span-2">

              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              ">
                Upload Image
              </label>

              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
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

              <p className="
                mt-2
                text-xs
                text-gray-500
              ">
                JPG, JPEG, PNG or WEBP.
                Maximum 5 MB.
              </p>

              {imagePreview && (
                <div className="
                  mt-4
                  overflow-hidden
                  rounded-xl
                  border
                ">

                  <img
                    src={imagePreview}
                    alt="Political career preview"
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

              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              ">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
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

            <div className="
              flex
              flex-wrap
              gap-3
              md:col-span-2
            ">

              <button
                type="submit"
                disabled={saving}
                className="
                  rounded-lg
                  bg-orange-600
                  px-6
                  py-3
                  font-semibold
                  text-white
                  hover:bg-orange-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Political Career"
                  : "Add Political Career"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
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

        {/* EXISTING POLITICAL CAREER */}

        <div className="
          mt-10
          rounded-xl
          border
          border-gray-300
          bg-white
          p-6
          shadow-sm
          sm:p-8
        ">

          <div className="mb-6">

            <h2 className="
              text-2xl
              font-bold
              text-gray-900
            ">
              Existing Political Career
            </h2>

            <p className="
              mt-1
              text-sm
              text-gray-500
            ">
              Drag cards up or down to change
              their order on the public page.
            </p>

          </div>

          {loading ? (

            <div className="
              py-10
              text-center
              text-gray-500
            ">
              Loading political career...
            </div>

          ) : careerData.length === 0 ? (

            <div className="
              rounded-lg
              border
              border-dashed
              border-gray-300
              py-10
              text-center
              text-gray-500
            ">
              No political career entries found.
            </div>

          ) : (

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >

              <SortableContext
                items={careerData.map(
                  (item) => item.id
                )}
                strategy={
                  verticalListSortingStrategy
                }
              >

                <div className="space-y-4">

                  {careerData.map(
                    (item) => (
                      <SortableCareerItem
                        key={item.id}
                        item={item}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
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
}