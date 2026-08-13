import { useEffect, useState } from "react";
import {
  CalendarDays,
  Search,
  Play,
  ArrowRight,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/videos";
const CACHE_KEY = "public_videos_cache";

const categories = [
  "All",
  "Video",
  "Government",
  "Public",
  "Development",
  "Events",
];

const readCache = () => {
  try {
    const value =
      localStorage.getItem(
        CACHE_KEY
      );

    if (!value) {
      return [];
    }

    const parsed =
      JSON.parse(value);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
};

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return date.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );
};

export default function Videos() {
  const [videos, setVideos] =
    useState(readCache());

  const [loading, setLoading] =
    useState(false);

  const [category, setCategory] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [usingCache, setUsingCache] =
    useState(false);

  const [error, setError] =
    useState("");

  // =====================================================
  // ALWAYS LOAD LATEST DATA
  // =====================================================

  const loadVideos = async () => {
    try {
      setError("");

      const response =
        await fetch(
          `${API_URL}?t=${Date.now()}`,
          {
            cache: "no-store",
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
          `Server returned invalid data: ${text.slice(
            0,
            120
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

      const latest =
        Array.isArray(
          result.data
        )
          ? result.data
          : [];

      // Latest database data
      setVideos(latest);

      // Update public cache
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify(latest)
      );

      setUsingCache(false);
      setError("");

    } catch (err) {
      console.error(
        "PUBLIC VIDEOS ERROR:",
        err
      );

      const cached =
        readCache();

      if (
        cached.length > 0
      ) {
        setVideos(cached);
        setUsingCache(true);
      } else {
        setError(
          err.message ||
            "Unable to load videos."
        );
      }
    }
  };

  // =====================================================
  // FIRST LOAD
  // =====================================================

  useEffect(() => {
    loadVideos();
  }, []);

  // =====================================================
  // RECEIVE ADMIN UPDATE
  // =====================================================

  useEffect(() => {
    const refreshVideos =
      () => {
        loadVideos();
      };

    window.addEventListener(
      "videos-updated",
      refreshVideos
    );

    window.addEventListener(
      "focus",
      refreshVideos
    );

    return () => {
      window.removeEventListener(
        "videos-updated",
        refreshVideos
      );

      window.removeEventListener(
        "focus",
        refreshVideos
      );
    };
  }, []);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredVideos =
    videos.filter(
      (item) => {
        const query =
          search
            .trim()
            .toLowerCase();

        const categoryMatch =
          category === "All" ||
          item.category ===
            category;

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
      }
    );

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <section className="
      min-h-screen
      bg-slate-50
      py-16
      lg:py-20
    ">

      <div className="
        mx-auto
        max-w-7xl
        px-6
        lg:px-8
      ">

        <div className="
          flex
          flex-col
          gap-8
          lg:flex-row
          lg:items-end
          lg:justify-between
        ">

          <div className="max-w-3xl">

            <span className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.25em]
              text-orange-600
            ">
              Video Gallery
            </span>

            <h1 className="
              mt-3
              text-3xl
              font-bold
              text-slate-900
              md:text-4xl
              lg:text-5xl
            ">
              Videos
            </h1>

            <p className="
              mt-4
              leading-8
              text-gray-600
            ">
              Watch speeches, public programmes,
              constituency activities, development
              initiatives and important events.
            </p>

          </div>

          <div className="
            relative
            w-full
            lg:w-80
          ">

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
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

        {usingCache && (
          <div className="
            mt-6
            rounded-xl
            border
            border-yellow-200
            bg-yellow-50
            px-4
            py-3
            text-sm
            text-yellow-700
          ">
            Showing the last saved video information.
          </div>
        )}

        {error && (
          <div className="
            mt-6
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-600
          ">
            {error}
          </div>
        )}

        <div className="
          mt-10
          flex
          flex-wrap
          gap-3
        ">

          {categories.map(
            (item) => (
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
                  ${
                    category === item
                      ? "border-orange-600 bg-orange-600 text-white"
                      : "border-slate-200 bg-white text-slate-600"
                  }
                `}
              >
                {item}
              </button>
            )
          )}

        </div>

        <div className="mt-10">

          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="
              font-semibold
              text-slate-900
            ">
              {filteredVideos.length}
            </span>{" "}
            {filteredVideos.length === 1
              ? "video"
              : "videos"}
          </p>

        </div>

        {filteredVideos.length > 0 ? (

          <div className="
            mt-6
            grid
            gap-7
            md:grid-cols-2
            xl:grid-cols-3
          ">

            {filteredVideos.map(
              (item) => (

                <article
                  key={item.id}
                  className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-100
                    bg-white
                    shadow-sm
                  "
                >

                  <div className="bg-black">

                    {item.video_url ? (
                      <video
                        key={item.video_url}
                        src={
                          item.video_url
                        }
                        controls
                        preload="metadata"
                        className="
                          h-56
                          w-full
                          bg-black
                          object-contain
                        "
                      />
                    ) : (
                      <div className="
                        flex
                        h-56
                        items-center
                        justify-center
                        bg-black
                        text-gray-400
                      ">
                        <Play size={36} />
                      </div>
                    )}

                  </div>

                  <div className="p-6">

                    {item.published_date && (
                      <div className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-orange-600
                      ">
                        <CalendarDays size={16} />

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

                        <ArrowRight size={17} />
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

            <Play
              size={32}
              className="
                mx-auto
                text-gray-300
              "
            />

            <h3 className="
              mt-4
              text-xl
              font-semibold
              text-slate-900
            ">
              No videos found
            </h3>

          </div>
        )}

      </div>
    </section>
  );
}