import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Search,
  ArrowRight,
  Play,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/videos";
const CACHE_KEY = "videos_latest_cache";

const categories = [
  "All",
  "Video",
  "Government",
  "Public",
  "Development",
  "Events",
];

const getCachedVideos = () => {
  try {
    const saved = localStorage.getItem(CACHE_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch (error) {
    console.error("VIDEO CACHE ERROR:", error);
    return [];
  }
};

const formatDate = (date) => {
  if (!date) {
    return "";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function Videos() {
  const cachedVideos = getCachedVideos();

  const [videos, setVideos] = useState(
    cachedVideos
  );

  const [category, setCategory] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(cachedVideos.length === 0);

  const [usingCache, setUsingCache] =
    useState(false);

  const [error, setError] =
    useState("");

  // =====================================================
  // LOAD VIDEOS
  // =====================================================

  const loadVideos = async () => {
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

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(
          `Server returned non-JSON data: ${text.slice(
            0,
            100
          )}`
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

      const latestVideos =
        Array.isArray(result.data)
          ? result.data
          : [];

      setVideos(latestVideos);

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify(latestVideos)
      );

      setUsingCache(false);
      setError("");
    } catch (backendError) {
      console.error(
        "VIDEOS LOAD ERROR:",
        backendError
      );

      const savedVideos =
        getCachedVideos();

      if (savedVideos.length > 0) {
        setVideos(savedVideos);
        setUsingCache(true);
        setError("");
      } else {
        setVideos([]);

        setError(
          "Backend is unavailable and no previously saved video information is available."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredVideos = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return videos.filter((item) => {
      const categoryMatch =
        category === "All" ||
        item.category === category;

      const searchMatch =
        !query ||
        (item.title || "")
          .toLowerCase()
          .includes(query) ||
        (item.description || "")
          .toLowerCase()
          .includes(query);

      return (
        categoryMatch &&
        searchMatch
      );
    });
  }, [
    videos,
    category,
    search,
  ]);

  // =====================================================
  // LOADING
  // =====================================================

  if (
    loading &&
    videos.length === 0
  ) {
    return (
      <section className="min-h-screen bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600" />

              <p className="mt-4 text-sm text-gray-500">
                Loading videos...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // NO DATA
  // =====================================================

  if (
    !loading &&
    videos.length === 0 &&
    error
  ) {
    return (
      <section className="min-h-screen bg-slate-50 py-16">
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

            <h1 className="text-2xl font-bold text-slate-900">
              Videos
            </h1>

            <p className="mt-4 text-sm leading-7 text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={loadVideos}
              className="mt-6 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700"
            >
              Try Again
            </button>

          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // PUBLIC PAGE
  // =====================================================

  return (
    <section className="bg-slate-50 py-16 lg:py-20">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* HEADER */}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          <div className="max-w-3xl">

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
              Video Gallery
            </span>

            <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              Videos
            </h1>

            <p className="mt-4 leading-8 text-gray-600">
              Watch speeches, public programmes,
              constituency activities, development
              initiatives and important events.
            </p>

          </div>

          {/* SEARCH */}

          <div className="relative w-full lg:w-80">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search videos..."
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                py-3.5
                pl-11
                pr-4
                text-sm
                outline-none
                focus:border-orange-500
                focus:ring-2
                focus:ring-orange-100
              "
            />

          </div>

        </div>

        {/* CACHE MESSAGE */}

        {usingCache && (
          <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
            Showing the latest saved video information.
            The backend server is currently unavailable.
          </div>
        )}

        {/* CATEGORIES */}

        <div className="mt-10 flex flex-wrap gap-3">

          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                setCategory(item)
              }
              className={`
                rounded-full
                border
                px-5
                py-2
                text-sm
                font-medium
                transition
                ${
                  category === item
                    ? "border-orange-600 bg-orange-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-orange-500 hover:text-orange-600"
                }
              `}
            >
              {item}
            </button>
          ))}

        </div>

        {/* COUNT */}

        <div className="mt-10">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredVideos.length}
            </span>{" "}
            {filteredVideos.length === 1
              ? "video"
              : "videos"}
          </p>
        </div>

        {/* VIDEO GRID */}

        {filteredVideos.length > 0 ? (

          <div className="mt-6 grid gap-7 md:grid-cols-2 xl:grid-cols-3">

            {filteredVideos.map(
              (item) => (
                <article
                  key={item.id}
                  className="
                    group
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-100
                    bg-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >

                  {/* VIDEO */}

                  <div className="relative bg-black">

                    {item.video_url ? (
                      <video
                        src={
                          item.video_url
                        }
                        controls
                        preload="metadata"
                        poster={
                          item.thumbnail_url ||
                          undefined
                        }
                        className="
                          h-56
                          w-full
                          bg-black
                          object-contain
                        "
                        onError={() => {
                          console.error(
                            "VIDEO FILE ERROR:",
                            item.video_url
                          );
                        }}
                      />
                    ) : (
                      <div className="
                        flex
                        h-56
                        w-full
                        items-center
                        justify-center
                        bg-slate-900
                        text-gray-400
                      ">
                        <div className="text-center">
                          <Play
                            size={35}
                            className="mx-auto mb-2 text-gray-500"
                          />

                          <p>
                            No video available
                          </p>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* CONTENT */}

                  <div className="p-6">

                    {item.published_date && (
                      <div className="flex items-center gap-2 text-sm text-orange-600">

                        <CalendarDays
                          size={16}
                        />

                        <span>
                          {formatDate(
                            item.published_date
                          )}
                        </span>

                      </div>
                    )}

                    <span className="
                      mt-4
                      inline-block
                      rounded-full
                      bg-orange-50
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-orange-600
                    ">
                      {item.category ||
                        "Video"}
                    </span>

                    <h2 className="
                      mt-4
                      text-xl
                      font-bold
                      leading-8
                      text-slate-900
                    ">
                      {item.title}
                    </h2>

                    {item.description && (
                      <p className="
                        mt-3
                        text-sm
                        leading-7
                        text-gray-600
                      ">
                        {item.description}
                      </p>
                    )}

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          mt-6
                          inline-flex
                          items-center
                          gap-2
                          font-semibold
                          text-orange-600
                        "
                      >
                        View Link

                        <ArrowRight
                          size={17}
                          className="transition group-hover:translate-x-1"
                        />
                      </a>
                    )}

                  </div>

                </article>
              )
            )}

          </div>

        ) : (

          <div className="
            mt-8
            rounded-3xl
            border
            border-slate-200
            bg-white
            py-20
            text-center
          ">

            <Search
              size={30}
              className="mx-auto text-gray-300"
            />

            <h3 className="
              mt-4
              text-xl
              font-semibold
              text-slate-900
            ">
              No videos found
            </h3>

            <p className="mt-2 text-gray-500">
              Try another search term or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="
                mt-6
                rounded-full
                bg-orange-600
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                hover:bg-orange-700
              "
            >
              Clear Filters
            </button>

          </div>
        )}

      </div>
    </section>
  );
}