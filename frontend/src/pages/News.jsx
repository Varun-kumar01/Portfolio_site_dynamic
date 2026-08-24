import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../config";
import { useTranslation } from "react-i18next";
import {
  CalendarDays,
  Search,
  ArrowRight,
} from "lucide-react";

const API_URL = `${API_BASE_URL}/api/news`;

const fallbackCategories = [
  "All",
  "Government",
  "Public",
  "Healthcare",
  "Education",
  "Agriculture",
];

export default function News() {
  const { i18n, t } = useTranslation();
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
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD NEWS FROM BACKEND
  // =====================================================

  const loadNews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}?lang=${i18n.language?.startsWith("te") ? "te" : "en"}&t=${Date.now()}`
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

      setNewsData(
        Array.isArray(result.data)
          ? result.data
          : []
      );

    } catch (error) {
      console.error(
        "LOAD PUBLIC NEWS ERROR:",
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
  // LOAD WHEN PAGE OPENS
  // =====================================================

  useEffect(() => {
    loadNews();
  }, [i18n.language]);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

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

  // =====================================================
  // CATEGORIES FROM DATABASE
  // =====================================================

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

  // =====================================================
  // FILTER NEWS
  // =====================================================

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

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="py-20 text-center">
            <p className="text-gray-500">
              {t("news.loading", "Loading news...")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="text-xl font-semibold text-red-700">
              {t("news.noNewsFound")}
            </h2>

            <p className="mt-2 text-red-600">
              {error}
            </p>

            <button
              onClick={loadNews}
              className="mt-5 rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700"
            >
              {t("common.tryAgain")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <>
      <section className="bg-slate-50 py-16 lg:py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-2xl">

              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                {t("news.pageLabel")}
              </span>

              <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                {t("news.pageTitle")}
              </h1>

              <p className="mt-4 leading-8 text-gray-600">
                {t("news.pageDescription")}
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
                placeholder={t("news.search")}
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

          <div className="mt-10 flex flex-wrap gap-3">

            {categories.length > 0
              ? categories.map((item) => (
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
                ))
              : fallbackCategories.map(
                  (item) => (
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

                        ${
                          category === item
                            ? "border-orange-600 bg-orange-600 text-white"
                            : "border-slate-200 bg-white text-slate-600"
                        }
                      `}
                    >
                      {translateCategory(item)}
                    </button>
                  )
                )}

          </div>

          {/* =================================================
              RESULT COUNT
          ================================================= */}

          <div className="mt-10 flex items-center justify-between">

            <p className="text-sm text-gray-500">

              {t("news.showing")} {" "}

              <span className="font-semibold text-slate-900">
                {filteredNews.length}
              </span>{" "}

              {filteredNews.length === 1
                ? t("news.update")
                : t("news.updates")}

            </p>

          </div>

          {/* =================================================
              NEWS GRID
          ================================================= */}

          {filteredNews.length > 0 ? (

            <div className="mt-6 grid gap-7 md:grid-cols-2 xl:grid-cols-3">

              {filteredNews.map(
                (item, index) => (

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

                    {/* IMAGE */}

                    <div className="overflow-hidden">

                      {item.image_url ? (

                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="
                            h-56
                            w-full
                            object-cover
                            transition
                            duration-700
                            group-hover:scale-105
                          "
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";
                          }}
                        />

                      ) : (

                        <div
                          className="
                            flex
                            h-56
                            w-full
                            items-center
                            justify-center
                            bg-gray-100
                            text-gray-400
                          "
                        >
                          {t("common.noImage", "No Image")}
                        </div>

                      )}

                    </div>

                    {/* CONTENT */}

                    <div className="p-6">

                      {/* DATE */}

                      <div className="flex items-center gap-2 text-sm text-orange-600">

                        <CalendarDays size={16} />

                        <span>
                          {formatDate(
                            item.published_date
                          )}
                        </span>

                      </div>

                      {/* CATEGORY */}

                      <span
                        className="
                          mt-4
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
                        {translateCategory(item.category || "News")}
                      </span>

                      {/* TITLE */}

                      <h2 className="mt-4 text-xl font-bold leading-8 text-slate-900">
                        {isTelugu
                          ? t(`news.items.news${index + 1}.title`, {
                              defaultValue: t("news.defaultTitle"),
                            })
                          : item.title}
                      </h2>

                      {/* DESCRIPTION */}

                      {item.description && (
                        <p className="mt-3 text-sm leading-7 text-gray-600">
                          {isTelugu
                            ? t(`news.items.news${index + 1}.description`, {
                                defaultValue: t("news.defaultDescription"),
                              })
                            : item.description}
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
                              {t("news.readMore")}

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

                )
              )}

            </div>

          ) : (

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white py-20 text-center">

              <Search
                size={30}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                No news found
              </h3>

              <p className="mt-2 text-gray-500">
                Try another search term or category.
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
                Clear Filters
              </button>

            </div>

          )}

        </div>

      </section>
    </>
  );
}