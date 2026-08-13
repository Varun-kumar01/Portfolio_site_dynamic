import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/videos";

const CACHE_KEY = "public_videos_cache";

const emptyForm = {
  title: "",
  description: "",
  category: "Video",
  published_date: "",
  link: "",
  thumbnail_url: "",
  display_order: 0,
};

const AdminVideos = () => {
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // LOAD VIDEOS
  // =====================================================

  const loadVideos = async () => {
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
          `Server returned invalid JSON: ${text.slice(0, 150)}`
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Server returned ${response.status}`
        );
      }

      if (!result.success) {
        throw new Error(
          result.message ||
            "Unable to load videos"
        );
      }

      const latestVideos = Array.isArray(result.data)
        ? result.data
        : [];

      setVideos(latestVideos);

      // IMPORTANT:
      // Save latest database information for public page.
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify(latestVideos)
      );

      // Tell other browser tabs/pages that data changed.
      window.dispatchEvent(
        new Event("videos-updated")
      );
    } catch (err) {
      console.error(
        "LOAD VIDEOS ERROR:",
        err
      );

      setError(
        err.message ||
          "Unable to load videos."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  // =====================================================
  // INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // VIDEO FILE
  // =====================================================

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setSelectedVideo(null);
      return;
    }

    if (
      file.type &&
      !file.type.startsWith("video/") &&
      file.type !== "application/octet-stream"
    ) {
      setSelectedVideo(null);
      setError(
        "Please select a valid video file."
      );
      e.target.value = "";
      return;
    }

    if (file.size > 500 * 1024 * 1024) {
      setSelectedVideo(null);
      setError(
        "Video must be less than 500 MB."
      );
      e.target.value = "";
      return;
    }

    setSelectedVideo(file);
    setError("");
  };

  // =====================================================
  // RESET
  // =====================================================

  const resetForm = () => {
    setFormData({ ...emptyForm });
    setSelectedVideo(null);
    setEditingId(null);
    setError("");
    setSuccess("");
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
      if (!formData.title.trim()) {
        throw new Error(
          "Video title is required."
        );
      }

      if (!editingId && !selectedVideo) {
        throw new Error(
          "Please select a video."
        );
      }

      const data = new FormData();

      data.append(
        "title",
        formData.title.trim()
      );

      data.append(
        "description",
        formData.description
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

      data.append(
        "thumbnail_url",
        formData.thumbnail_url
      );

      data.append(
        "display_order",
        String(
          Number(
            formData.display_order
          ) || 0
        )
      );

      if (selectedVideo) {
        data.append(
          "video",
          selectedVideo
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
          `Server returned invalid JSON: ${text.slice(0, 150)}`
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to save video"
        );
      }

      // IMPORTANT:
      // Reload latest database data immediately.
      await loadVideos();

      setSuccess(
        editingId
          ? "Video updated successfully."
          : "Video added successfully."
      );

      resetForm();
    } catch (err) {
      console.error(
        "SAVE VIDEO ERROR:",
        err
      );

      setError(
        err.message ||
          "Unable to save video."
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
      description: item.description || "",
      category: item.category || "Video",

      published_date:
        item.published_date
          ? String(
              item.published_date
            ).slice(0, 10)
          : "",

      link: item.link || "",

      thumbnail_url:
        item.thumbnail_url || "",

      display_order:
        item.display_order ?? 0,
    });

    setSelectedVideo(null);
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
        "Are you sure you want to delete this video?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(
          `Server returned invalid JSON: ${text.slice(0, 150)}`
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to delete video"
        );
      }

      await loadVideos();

      setSuccess(
        "Video deleted successfully."
      );
    } catch (err) {
      console.error(
        "DELETE VIDEO ERROR:",
        err
      );

      setError(
        err.message ||
          "Unable to delete video."
      );
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

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
              Videos Management
            </h1>

            <p className="
              mt-2
              text-gray-600
            ">
              Add, edit, delete and manage website videos.
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
              ? "Edit Video"
              : "Add Video"}
          </h2>

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

            <div className="md:col-span-2">

              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              ">
                Video Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
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

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                "
              >
                <option value="Video">
                  Video
                </option>

                <option value="Government">
                  Government
                </option>

                <option value="Public">
                  Public
                </option>

                <option value="Development">
                  Development
                </option>

                <option value="Events">
                  Events
                </option>
              </select>

            </div>

            <div>

              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              ">
                Published Date
              </label>

              <input
                type="date"
                name="published_date"
                value={
                  formData.published_date
                }
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

            <div className="md:col-span-2">

              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              ">
                Upload Video
              </label>

              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
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
                Any browser-recognized video format.
                Maximum 500 MB.
              </p>

              {selectedVideo && (
                <p className="
                  mt-2
                  text-sm
                  font-medium
                  text-green-700
                ">
                  Selected: {selectedVideo.name}
                </p>
              )}

            </div>

            <div className="md:col-span-2">

              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              ">
                External Link
              </label>

              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://example.com"
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
                rows={5}
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
                type="number"
                name="display_order"
                value={
                  formData.display_order
                }
                onChange={handleChange}
                min="0"
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

            <div className="
              flex
              items-end
              gap-3
            ">

              <button
                type="submit"
                disabled={saving}
                className="
                  rounded-lg
                  bg-green-700
                  px-6
                  py-3
                  font-semibold
                  text-white
                  hover:bg-green-800
                  disabled:opacity-50
                "
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Video"
                  : "Add Video"}
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
                  "
                >
                  Cancel Edit
                </button>
              )}

            </div>

          </form>
        </div>

        {/* EXISTING VIDEOS */}

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

          <h2 className="
            text-2xl
            font-bold
            text-gray-900
          ">
            Existing Videos
          </h2>

          <p className="
            mt-1
            text-sm
            text-gray-500
          ">
            Edit or delete existing videos.
          </p>

          {loading ? (
            <div className="
              py-10
              text-center
              text-gray-500
            ">
              Loading videos...
            </div>
          ) : videos.length === 0 ? (
            <div className="
              mt-6
              rounded-lg
              border
              border-dashed
              border-gray-300
              py-10
              text-center
              text-gray-500
            ">
              No videos found.
            </div>
          ) : (
            <div className="
              mt-6
              space-y-4
            ">

              {videos.map(
                (item) => (
                  <div
                    key={item.id}
                    className="
                      rounded-xl
                      border
                      border-gray-200
                      p-5
                    "
                  >

                    <div className="
                      flex
                      flex-col
                      gap-5
                      lg:flex-row
                      lg:items-center
                      lg:justify-between
                    ">

                      <div className="
                        w-full
                        max-w-md
                      ">

                        {item.video_url ? (
                          <video
                            src={item.video_url}
                            controls
                            preload="metadata"
                            className="
                              h-48
                              w-full
                              rounded-lg
                              bg-black
                              object-contain
                            "
                          />
                        ) : (
                          <div className="
                            flex
                            h-48
                            items-center
                            justify-center
                            rounded-lg
                            bg-gray-100
                            text-gray-400
                          ">
                            No video
                          </div>
                        )}

                      </div>

                      <div className="flex-1">

                        <span className="
                          inline-block
                          rounded-full
                          bg-green-50
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-green-700
                        ">
                          {item.category || "Video"}
                        </span>

                        <h3 className="
                          mt-3
                          text-lg
                          font-bold
                          text-gray-900
                        ">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="
                            mt-3
                            text-sm
                            leading-6
                            text-gray-600
                          ">
                            {item.description}
                          </p>
                        )}

                      </div>

                      <div className="
                        flex
                        shrink-0
                        gap-3
                      ">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(item)
                          }
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
                          "
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default AdminVideos;