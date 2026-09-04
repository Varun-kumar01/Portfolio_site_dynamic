import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../config";
import { useTranslation } from "react-i18next";
import { fetchWithCache, getCache, cacheImageAsBase64, getCachedImageBase64 } from "../services/cacheService";

import {
  CalendarDays,
  Search,
  ArrowRight,
} from "lucide-react";

const API_URL = `${API_BASE_URL}/api/news`;
const NEWS_CACHE_KEY = "news_cache";

/* =========================================================
   FALLBACK CATEGORIES
========================================================= */

const fallbackCategories = [
  "All",
  "Government",
  "Public",
  "Healthcare",
  "Education",
  "Agriculture",
];

/* =========================================================
   IMAGE URL HELPER
========================================================= */

const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;

  const value = String(imageUrl).trim();

  if (!value) return null;

  // Already a complete URL
  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  // Remove leading /
  const cleanPath = value.replace(/^\/+/, "");

  // uploads/news/news1.jpeg
  if (cleanPath.startsWith("uploads/")) {
    return `${API_BASE_URL}/${cleanPath}`;
  }

  // news/news1.jpeg
  if (cleanPath.startsWith("news/")) {
    return `${API_BASE_URL}/uploads/${cleanPath}`;
  }

  // news1.jpeg
  return `${API_BASE_URL}/uploads/news/${cleanPath}`;
};

/* =========================================================
   NEWS PAGE
========================================================= */

export default function News() {
  const { i18n, t } = useTranslation();

  /* =======================================================
     CATEGORY TRANSLATION
  ======================================================= */

  const categoryKeys = {
    All: "all",
    Government: "government",
    Public: "public",
    Healthcare: "healthcare",
    Education: "education",
    Agriculture: "agriculture",
  };

  const translateCategory = (category) =>
    categoryKeys[category]
      ? t(`news.${categoryKeys[category]}`)
      : i18n.language?.startsWith("te")
        ? t("news.defaultCategory")
        : category;

  const isTelugu = i18n.language?.startsWith("te");

  /* =======================================================
     STATES
  ======================================================= */

  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usingCache, setUsingCache] = useState(false);

  /* =======================================================
     LOAD NEWS
  ======================================================= */

  const loadNews = async () => {
    try {
      setLoading(true);
      setUsingCache(false);

      const language = isTelugu ? "te" : "en";
      const cacheKey = `${NEWS_CACHE_KEY}_${language}`;

      const response = await fetch(
        `${API_URL}?lang=${language}&t=${Date.now()}`
      );

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message || "Unable to load news"
        );
      }

      const data = Array.isArray(result.data)
        ? result.data
        : [];

      console.log("=================================");
      console.log("NEWS DATA FROM DATABASE");
      console.log("=================================");

      data.forEach((item) => {
        console.log("Title:", item.title);
        console.log(
          "Database image:",
          item.image_url
        );
        console.log(
          "Final image URL:",
          getImageUrl(item.image_url)
        );
      });

      setNewsData(data);
      
      // Cache the data and embed base64 images
      if (data.length > 0) {
        // Proactively fetch all images and embed base64 directly in data
        console.log("Starting to cache news images...");
        
        Promise.all(
          data.map(async (item, index) => {
            const imageUrl = getImageUrl(item.image_url);
            if (!imageUrl) {
              return item;
            }

            try {
              const response = await fetch(imageUrl, {
                method: "GET",
                cache: "no-store",
              });

              if (!response.ok) {
                console.warn(`Failed to fetch image for news ${item.id || index}`);
                return item;
              }

              const blob = await response.blob();
              return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  // Embed base64 directly in the item
                  resolve({
                    ...item,
                    _cachedImageBase64: reader.result,
                  });
                };
                reader.readAsDataURL(blob);
              });
            } catch (err) {
              console.warn(`Failed to cache image for news ${item.id || index}:`, err);
              return item;
            }
          })
        )
          .then((dataWithImages) => {
            try {
              localStorage.setItem(cacheKey, JSON.stringify(dataWithImages));
              console.log("Cached all news with embedded images");
            } catch (e) {
              console.warn("Failed to cache news with images:", e);
            }
          })
          .catch((err) => {
            console.warn("Error caching news images:", err);
          });
      }
    } catch (err) {
      console.error(
        "LOAD PUBLIC NEWS ERROR:",
        err
      );

      // Try to get cached data
      const language = isTelugu ? "te" : "en";
      const cacheKey = `${NEWS_CACHE_KEY}_${language}`;
      const cachedData = getCache(cacheKey, []);

      if (cachedData.length > 0) {
        console.log("Using cached news data");
        setNewsData(cachedData);
        setUsingCache(true);
        setError(""); // Clear error when using cache
      } else {
        setError(
          err.message ||
            "Unable to load news."
        );
        setNewsData([]);
      }
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     LOAD ON PAGE OPEN / LANGUAGE CHANGE
  ======================================================= */

  useEffect(() => {
    loadNews();
  }, [i18n.language]);

  /* =======================================================
     FORMAT DATE
  ======================================================= */

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return String(date).substring(0, 10);
    }

    return parsedDate.toLocaleDateString(
      isTelugu ? "te-IN" : "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const categories = useMemo(() => {
    const databaseCategories = newsData
      .map((item) => item.category)
      .filter(Boolean);

    const uniqueCategories = [
      ...new Set(databaseCategories),
    ];

    return [
      "All",
      ...uniqueCategories,
    ];
  }, [newsData]);

  /* =======================================================
     FILTER NEWS
  ======================================================= */

  const filteredNews = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return newsData.filter((item) => {
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
          .includes(query) ||
        (item.content || "")
          .toLowerCase()
          .includes(query);

      return (
        categoryMatch &&
        searchMatch
      );
    });
  }, [
    newsData,
    category,
    search,
  ]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="py-20 text-center">
            <p className="text-gray-500">
              {t(
                "news.loading",
                "Loading news..."
              )}
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="
            rounded-2xl
            border
            border-red-200
            bg-red-50
            p-8
            text-center
          ">

            <h2 className="
              text-xl
              font-semibold
              text-red-700
            ">
              {t(
                "news.noNewsFound",
                "Unable to load news"
              )}
            </h2>

            <p className="
              mt-2
              text-red-600
            ">
              {error}
            </p>

            <button
              onClick={loadNews}
              className="
                mt-5
                rounded-lg
                bg-orange-600
                px-5
                py-3
                font-semibold
                text-white
                hover:bg-orange-700
              "
            >
              {t(
                "common.tryAgain",
                "Try Again"
              )}
            </button>

          </div>

        </div>
      </section>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <>
      <section className="
        min-h-screen
        bg-slate-50
        py-10
        sm:py-14
        lg:py-16
      ">

      <div className="
        mx-auto
        max-w-7xl
        px-4
        sm:px-6
        lg:px-8
      ">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-end
          lg:justify-between
        ">

          <div className="max-w-2xl">

            <span className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-orange-600
              sm:text-sm
            ">
              {t("news.pageLabel")}
            </span>

            <h1 className="
              mt-2
              text-3xl
              font-bold
              text-slate-900
              sm:text-4xl
              lg:text-5xl
            ">
              {t("news.pageTitle")}
            </h1>

            <p className="
              mt-3
              leading-7
              text-gray-600
            ">
              {t("news.pageDescription")}
            </p>

          </div>

          {/* SEARCH */}

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
                setSearch(e.target.value)
              }
              placeholder={t(
                "news.search",
                "Search news..."
              )}
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
                transition
                focus:border-orange-500
                focus:ring-2
                focus:ring-orange-100
              "
            />

          </div>

        </div>

        {/* =================================================
            CATEGORIES
        ================================================= */}

        <div className="
          mt-8
          flex
          flex-wrap
          gap-3
        ">

          {(categories.length > 0
            ? categories
            : fallbackCategories
          ).map((item) => (

            <button
              key={item}
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
              {translateCategory(item)}
            </button>

          ))}

        </div>

        {/* =================================================
            RESULT COUNT
        ================================================= */}

        <div className="
          mt-8
          flex
          items-center
          justify-between
        ">

          <p className="
            text-sm
            text-gray-500
          ">

            {t("news.showing", "Showing")}{" "}

            <span className="
              font-semibold
              text-slate-900
            ">
              {filteredNews.length}
            </span>{" "}

            {filteredNews.length === 1
              ? t(
                  "news.update",
                  "update"
                )
              : t(
                  "news.updates",
                  "updates"
                )}

          </p>

        </div>

        {/* =================================================
            NEWS GRID
        ================================================= */}

        {filteredNews.length > 0 ? (

          <div className="
            mt-6
            grid
            gap-7
            md:grid-cols-2
            xl:grid-cols-3
          ">

            {filteredNews.map(
              (item, index) => {

                const imageUrl =
                  getImageUrl(
                    item.image_url
                  );

                return (

                  <article
                    key={
                      item.id ||
                      `${item.title}-${index}`
                    }
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

                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <div className="
                      relative
                      h-56
                      w-full
                      overflow-hidden
                      bg-gray-100
                    ">

                      {imageUrl ? (

                        <img
                          src={imageUrl}
                          alt={
                            item.title ||
                            "News"
                          }
                          className="
                            h-full
                            w-full
                            object-cover
                            transition
                            duration-700
                            group-hover:scale-105
                          "
                          onLoad={() => {
                            console.log(
                              "IMAGE LOADED:",
                              imageUrl
                            );
                          }}
                          onError={(e) => {
                            console.error(
                              "IMAGE FAILED:",
                              imageUrl
                            );

                            /*
                              Try to use cached base64 image first,
                              then fall back to static news images
                            */
                            
                            // Try embedded cached base64
                            if (item._cachedImageBase64) {
                              console.log(
                                "Using cached news image for:",
                                item.id
                              );
                              e.currentTarget.src =
                                item._cachedImageBase64;
                              return;
                            }

                            // Fall back to static news images
                            const staticNewsImages = [
                              "/news/news1.png",
                              "/news/news2.png",
                              "/news/news3.png",
                              "/news/news4.png",
                              "/news/news5.png",
                              "/news/news6.png",
                            ];

                            const fallbackImage =
                              staticNewsImages[
                                index %
                                  staticNewsImages.length
                              ];

                            e.currentTarget.src =
                              fallbackImage;

                            e.currentTarget.style.display =
                              "block";
                          }}
                        />

                      ) : (

                        <div className="
                          flex
                          h-full
                          w-full
                          items-center
                          justify-center
                          bg-gray-100
                          text-sm
                          text-gray-400
                        ">
                          {t(
                            "common.noImage",
                            "No Image"
                          )}
                        </div>

                      )}

                    </div>

                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="p-6">

                      {/* DATE */}

                      {item.published_date && (

                        <div className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          text-orange-600
                        ">

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

                      {/* CATEGORY */}

                      {item.category && (

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
                          {translateCategory(
                            item.category
                          )}
                        </span>

                      )}

                      {/* TITLE */}

                      <h2 className="
                        mt-4
                        text-xl
                        font-bold
                        leading-8
                        text-slate-900
                      ">
                        {item.title}
                      </h2>

                      {/* DESCRIPTION */}

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

                      {/* READ MORE */}

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

                          {t(
                            "news.readMore",
                            "Read More"
                          )}

                          <ArrowRight
                            size={17}
                            className="
                              transition
                              group-hover:translate-x-1
                            "
                          />

                        </a>

                      )}

                    </div>

                  </article>

                );
              }
            )}

          </div>

        ) : (

          /* =================================================
             NO NEWS
          ================================================= */

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
              {t(
                "news.noNewsFound",
                "No news found"
              )}
            </h3>

            <p className="
              mt-2
              text-gray-500
            ">
              {t(
                "news.noNewsDescription",
                "Try another search term or category."
              )}
            </p>

            <button
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
                transition
                hover:bg-orange-700
              "
            >
              {t(
                "news.clearFilters",
                "Clear Filters"
              )}
            </button>

          </div>

        )}

      </div>

    </section>
    </>
  );
}