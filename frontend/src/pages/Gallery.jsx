import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5000";

const categories = [
  "All",
  "Public Events",
  "Constituency",
  "Meetings",
  "Events",
];

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("Photos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/api/gallery`);

      if (!response.ok) {
        throw new Error("Failed to fetch gallery");
      }

      const data = await response.json();

      console.log("Gallery API response:", data);

      if (Array.isArray(data)) {
        setGallery(data);
      } else {
        setGallery([]);
      }
    } catch (err) {
      console.error("Gallery loading error:", err);
      setError("Unable to load gallery images.");
    } finally {
      setLoading(false);
    }
  };

  // Build complete image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    // Already a complete URL
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // Backend stores paths like:
    // /uploads/gallery/image.jpg
    return `${API_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  };

  // Filter images according to category
  const filteredGallery =
    activeCategory === "All"
      ? gallery
      : gallery.filter(
          (item) =>
            String(item.category || "").toLowerCase() ===
            activeCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-white">

      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-8 md:px-10 lg:px-12">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          {/* Heading */}
          <div className="max-w-3xl">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">
              Media Gallery
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              Moments of Public Service
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Explore photographs and videos capturing public programmes,
              constituency visits, meetings and important events.
            </p>

          </div>

          {/* Photos / Videos */}
          <div className="flex w-fit rounded-full bg-slate-100 p-1">

            <button
              onClick={() => setActiveType("Photos")}
              className={`rounded-full px-7 py-3 text-sm font-semibold transition ${
                activeType === "Photos"
                  ? "bg-orange-600 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Photos
            </button>

            <button
              onClick={() => setActiveType("Videos")}
              className={`rounded-full px-7 py-3 text-sm font-semibold transition ${
                activeType === "Videos"
                  ? "bg-orange-600 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Videos
            </button>

          </div>

        </div>

      </section>


      {/* ================= FILTERS ================= */}
      <section className="mx-auto max-w-7xl px-6 pb-8 md:px-10 lg:px-12">

        <div className="flex flex-wrap gap-3">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-6 py-2.5 text-sm font-medium transition ${
                activeCategory === category
                  ? "border-orange-600 bg-orange-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-600"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

      </section>


      {/* ================= GALLERY ================= */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10 lg:px-12">

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 px-6 py-5 text-red-600">
            {error}
          </div>
        )}


        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className={`animate-pulse rounded-3xl bg-slate-200 ${
                  index === 0
                    ? "col-span-2 row-span-2 h-[500px]"
                    : "h-[240px]"
                }`}
              />
            ))}

          </div>
        )}


        {/* No images */}
        {!loading && filteredGallery.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 py-20 text-center">

            <h3 className="text-xl font-semibold text-slate-800">
              No images found
            </h3>

            <p className="mt-2 text-slate-500">
              There are no gallery images in this category.
            </p>

          </div>
        )}


        {/* Images */}
        {!loading && filteredGallery.length > 0 && activeType === "Photos" && (

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {filteredGallery.map((item, index) => (

              <GalleryCard
                key={item.id || index}
                item={item}
                index={index}
                getImageUrl={getImageUrl}
              />

            ))}

          </div>

        )}


        {/* Videos */}
        {!loading && activeType === "Videos" && (

          <div className="rounded-2xl border border-slate-200 bg-slate-50 py-20 text-center">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl">
              ▶
            </div>

            <h3 className="text-xl font-semibold text-slate-800">
              Videos
            </h3>

            <p className="mt-2 text-slate-500">
              Video gallery will be available here.
            </p>

          </div>

        )}

      </section>

    </div>
  );
}


/* =========================================================
   GALLERY CARD
========================================================= */

function GalleryCard({ item, index, getImageUrl }) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = getImageUrl(item.image_path);

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-slate-200 ${
        index === 0
          ? "sm:col-span-2 sm:row-span-2"
          : ""
      }`}
    >

      {/* Image */}
      {!imageError && imageUrl ? (
        <img
          src={imageUrl}
          alt={item.title || "Gallery image"}
          onError={() => {
            console.error("Image failed:", imageUrl);
            setImageError(true);
          }}
          className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
            index === 0
              ? "h-[420px] sm:h-[500px]"
              : "h-[240px] sm:h-[250px]"
          }`}
        />
      ) : (
        <div
          className={`flex w-full items-center justify-center bg-slate-200 text-slate-500 ${
            index === 0
              ? "h-[420px] sm:h-[500px]"
              : "h-[240px] sm:h-[250px]"
          }`}
        >
          Image not available
        </div>
      )}


      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90" />


      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">

        <h3 className="text-lg font-semibold md:text-xl">
          {item.title || "Public Service"}
        </h3>

        {item.category && (
          <p className="mt-1 text-sm text-white/80">
            {item.category}
          </p>
        )}

        {item.caption && (
          <p className="mt-2 line-clamp-2 text-sm text-white/80">
            {item.caption}
          </p>
        )}

      </div>

    </div>
  );
}