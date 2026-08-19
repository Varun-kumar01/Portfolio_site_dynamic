import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/articles";

const initialForm = {
  title: "",
  summary: "",
  content: "",
  category: "Article",
  published_date: "",
  link: "",
};

export default function AdminArticles() {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [formData, setFormData] =
    useState(initialForm);

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

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =====================================================
  // LOAD
  // =====================================================

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}?t=${Date.now()}`,
        {
          cache: "no-store",
        }
      );

      const text =
        await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(
          "The server did not return valid JSON."
        );
      }

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            `Server returned ${response.status}`
        );
      }

      setArticles(
        Array.isArray(result.data)
          ? result.data
          : []
      );
    } catch (err) {
      console.error(
        "LOAD ARTICLES ERROR:",
        err
      );

      setError(
        err.message ||
          "Unable to load articles."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  // =====================================================
  // CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // IMAGE
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
      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        "Image must be less than 5 MB."
      );
      return;
    }

    setSelectedImage(file);
    setImagePreview(
      URL.createObjectURL(file)
    );
    setError("");
  };

  // =====================================================
  // RESET
  // =====================================================

  const resetForm = () => {
    setFormData({
      ...initialForm,
    });

    setSelectedImage(null);
    setImagePreview("");
    setEditingId(null);
    setError("");
  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError(
        "Article title is required."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const data =
        new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "summary",
        formData.summary
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

      if (selectedImage) {
        data.append(
          "image",
          selectedImage
        );
      }

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response =
        await fetch(url, {
          method: editingId
            ? "PUT"
            : "POST",
          body: data,
        });

      const text =
        await response.text();

      let result;

      try {
        result =
          JSON.parse(text);
      } catch {
        throw new Error(
          "The server returned an invalid response."
        );
      }

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to save article."
        );
      }

      await loadArticles();

      window.dispatchEvent(
        new Event(
          "articles-updated"
        )
      );

      setSuccess(
        editingId
          ? "Article updated successfully."
          : "Article added successfully."
      );

      resetForm();
    } catch (err) {
      console.error(
        "SAVE ARTICLE ERROR:",
        err
      );

      setError(
        err.message ||
          "Unable to save article."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (article) => {
    setEditingId(
      article.id
    );

    setFormData({
      title:
        article.title || "",

      summary:
        article.summary || "",

      content:
        article.content || "",

      category:
        article.category ||
        "Article",

      published_date:
        article.published_date
          ? String(
              article.published_date
            ).slice(0, 10)
          : "",

      link:
        article.link || "",
    });

    setSelectedImage(null);

    setImagePreview(
      article.image_url || ""
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

  const handleDelete =
    async (id) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this article?"
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
            "The server returned an invalid response."
          );
        }

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
              "Unable to delete article."
          );
        }

        await loadArticles();

        window.dispatchEvent(
          new Event(
            "articles-updated"
          )
        );

        setSuccess(
          "Article deleted successfully."
        );
      } catch (err) {
        console.error(
          "DELETE ARTICLE ERROR:",
          err
        );

        setError(
          err.message ||
            "Unable to delete article."
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

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Articles Management
            </h1>

            <p className="mt-2 text-gray-600">
              Add, edit, delete and manage articles.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/secure/admin/dashboard")
            }
            className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            ← Back to Dashboard
          </button>

        </div>

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* FORM */}

        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-2xl font-bold text-gray-900">
            {editingId
              ? "Edit Article"
              : "Add Article"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
          >

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
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

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
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
              >
                <option value="Article">
                  Article
                </option>

                <option value="Government">
                  Government
                </option>

                <option value="Development">
                  Development
                </option>

                <option value="Public">
                  Public
                </option>

                <option value="Education">
                  Education
                </option>
              </select>
            </div>

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
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Upload Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
              />

              {imagePreview && (
                <div className="mt-4 overflow-hidden rounded-xl border">
                  <img
                    src={
                      imagePreview
                    }
                    alt="Article preview"
                    className="h-64 w-full object-cover"
                  />
                </div>
              )}
            </div>

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
                placeholder="https://example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Summary
              </label>

              <textarea
                name="summary"
                value={
                  formData.summary
                }
                onChange={
                  handleChange
                }
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

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
                rows={8}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div className="flex gap-3 md:col-span-2">

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Article"
                  : "Add Article"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700"
                >
                  Cancel Edit
                </button>
              )}

            </div>
          </form>
        </div>

        {/* EXISTING */}

        <div className="mt-10 rounded-xl border border-gray-300 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-2xl font-bold text-gray-900">
            Existing Articles
          </h2>

          {loading ? (
            <div className="py-10 text-center text-gray-500">
              Loading articles...
            </div>
          ) : articles.length === 0 ? (
            <div className="mt-6 rounded-lg border border-dashed border-gray-300 py-10 text-center text-gray-500">
              No articles found.
            </div>
          ) : (
            <div className="mt-6 space-y-4">

              {articles.map(
                (article) => (
                  <div
                    key={
                      article.id
                    }
                    className="rounded-xl border border-gray-200 p-5"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                      {article.image_url ? (
                        <img
                          src={
                            article.image_url
                          }
                          alt={
                            article.title
                          }
                          className="h-32 w-48 shrink-0 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-32 w-48 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                          No Image
                        </div>
                      )}

                      <div className="min-w-0 flex-1">

                        <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          {article.category ||
                            "Article"}
                        </span>

                        <h3 className="mt-3 text-lg font-bold text-gray-900">
                          {article.title}
                        </h3>

                        {article.summary && (
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            {article.summary}
                          </p>
                        )}

                      </div>

                      <div className="flex shrink-0 gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(
                              article
                            )
                          }
                          className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              article.id
                            )
                          }
                          className="rounded-lg border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600"
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
}