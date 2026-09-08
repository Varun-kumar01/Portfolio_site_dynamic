import { useEffect, useState } from "react";
import {
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../../config";
import {
  cacheImage,
  getCachedImageUrl,
} from "../../services/cacheService";

const NEWS_CACHE_KEY = "latest_home_news";

export default function NewsPreview() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const defaultNewsData = {
    label: "",
    heading: "",
    description: "",
    featured: { image: "", date: "", title: "", description: "" },
    items: [{ image: "", date: "", title: "" }, { image: "", date: "", title: "" }],
  };

  const [newsData, setNewsData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(NEWS_CACHE_KEY)) || defaultNewsData;
    } catch {
      return defaultNewsData;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNewsPreview = async () => {
      try {
        const language = i18n.language?.startsWith("te") ? "te" : "en";
        const [contentResponse, newsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/content?lang=${language}&t=${Date.now()}`, {
            cache: "no-store",
          }),
          fetch(`${API_BASE_URL}/api/news?lang=${language}&t=${Date.now()}`, {
            cache: "no-store",
          }),
        ]);

        if (!contentResponse.ok || !newsResponse.ok) {
          throw new Error("Failed to load Home News Preview");
        }

        const data = await contentResponse.json();
        const newsResult = await newsResponse.json();

        const toImageUrl = (image) => {
          if (!image) return "";
          let value = String(image).trim();

          if (/^https?:\/\//i.test(value)) {
            value = new URL(value).pathname;
          }

          if (value.startsWith("/news/")) return value;
          if (value.startsWith("/uploads/")) return `${API_BASE_URL}${value}`;
          if (value.startsWith("uploads/")) return `${API_BASE_URL}/${value}`;
          return `${API_BASE_URL}/uploads/home/${value.replace(/^\/+/, "")}`;
        };

        const homeNews = data?.home?.newsPreview;

        if (!homeNews) {
          throw new Error("Home news preview is missing from the API response");
        }

        const newsRecords = Array.isArray(newsResult.data)
          ? newsResult.data
          : [];

        const mapNewsRecord = (item) => ({
          image: toImageUrl(item.image_url),
          date: item.published_date || "",
          title: item.title || "",
          description: item.description || "",
        });

        const dynamicRecords = newsRecords.slice(0, 3).map(mapNewsRecord);
        const dashboardFeatured = {
          image: toImageUrl(homeNews.featured?.image),
          date: homeNews.featured?.date || "",
          title: homeNews.featured?.title || "",
          description: homeNews.featured?.description || "",
        };
        const hasDashboardFeatured = Object.values(dashboardFeatured).some(Boolean);
        const featured = hasDashboardFeatured
          ? dashboardFeatured
          : dynamicRecords[0] || defaultNewsData.featured;

        const dashboardItems = (homeNews.news || [])
          .slice(0, 2)
          .map((item) => ({
            image: toImageUrl(item.image),
            date: item.date || "",
            title: item.title || "",
            description: "",
          }));
        const hasDashboardItems = dashboardItems.some((item) =>
          Object.values(item).some(Boolean)
        );

        const latestNews = {
          label: homeNews.label || "",
          heading: homeNews.heading || "",
          description: homeNews.description || "",
          featured,
          items: hasDashboardItems
            ? dashboardItems
            : dynamicRecords.slice(1, 3).map((item) => ({
                image: item.image,
                date: item.date,
                title: item.title,
                description: item.description,
              })),
        };
        while (latestNews.items.length < 2) {
          latestNews.items.push({ image: "", date: "", title: "" });
        }

        const imagesToCache = [latestNews.featured, ...latestNews.items];
        await Promise.all(imagesToCache.map(async (item, index) => {
          if (item.image) {
            await cacheImage(
              item.image,
              `home_news_image_${index}`
            );
            item._cachedImage = await getCachedImageUrl(
              item.image,
              `home_news_image_${index}`
            );
          }
        }));

        setNewsData(latestNews);
        localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify(latestNews));

      } catch (error) {
        console.error(
          "Error loading News Preview:",
          error
        );

        const cachedNews = JSON.parse(
          localStorage.getItem(NEWS_CACHE_KEY) || "null"
        );

        if (cachedNews) {
          const cachedItems = [cachedNews.featured, ...cachedNews.items];
          await Promise.all(cachedItems.map(async (item, index) => {
            if (item?.image) {
              item._cachedImage = await getCachedImageUrl(
                item.image,
                `home_news_image_${index}`
              );
            }
          }));
          setNewsData(cachedNews);
        }
      } finally {
        setLoading(false);
      }
    };

    loadNewsPreview();
  }, [i18n.language]);

  const localizedNews = {
    label: newsData.label || t("home.newsPreview.label"),
    heading: newsData.heading || t("home.newsPreview.title"),
    description: newsData.description || t("home.newsPreview.description"),
    featuredTitle: newsData.featured.title,
    featuredDescription: newsData.featured.description,
    item1Title: newsData.items[0].title,
    item2Title: newsData.items[1].title,
  };

  if (loading) {
    return (
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-gray-500">
            {t("news.loading", "Loading news...")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          <div className="max-w-2xl">

            <span className="uppercase tracking-[0.25em] text-orange-600 text-sm font-semibold">

              {localizedNews.label}

            </span>

            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">

              {localizedNews.heading}

            </h2>

            <p className="mt-5 text-gray-600 leading-8">

              {localizedNews.description}

            </p>

          </div>

          <button
            onClick={() => navigate("/news")}
            className="inline-flex items-center gap-2 text-orange-600 font-semibold group"
          >

            {t("home.newsPreview.viewAll")}

            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition"
            />

          </button>

        </div>


        {/* Content */}

        <div className="grid lg:grid-cols-[1.25fr_.75fr] gap-8 mt-10">


          {/* Featured */}

          <article className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition duration-500">

            <img
              src={newsData.featured._cachedImage || newsData.featured.image}
              alt={localizedNews.featuredTitle}
              className="w-full h-[260px] md:h-[380px] object-cover"
            />

            <div className="p-8">

              <div className="flex items-center gap-2 text-orange-600 text-sm">

                <CalendarDays size={16} />

                {newsData.featured.date}

              </div>

              <h3 className="mt-4 text-2xl font-bold text-slate-900">

                {localizedNews.featuredTitle}

              </h3>

              <p className="mt-5 text-gray-600 leading-8">

                {localizedNews.featuredDescription}

              </p>

              <button
                onClick={() => navigate("/news")}
                className="mt-7 inline-flex items-center gap-2 text-orange-600 font-semibold group"
              >

                {t("news.readMore")}

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />

              </button>

            </div>

          </article>


          {/* Recent */}

          <div className="space-y-6">

            {newsData.items.map(
              (item, index) => (

                <article
                  key={index}
                  className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition duration-500"
                >

                  <img
                    src={item._cachedImage || item.image}
                    alt={item.title}
                    className="w-full h-[170px] object-cover"
                  />

                  <div className="p-6">

                    <div className="flex items-center gap-2 text-orange-600 text-sm">

                      <CalendarDays size={15} />

                      {item.date}

                    </div>

                    <h4 className="mt-4 text-lg font-semibold text-slate-900 leading-8">

                      {index === 0 ? localizedNews.item1Title : localizedNews.item2Title}

                    </h4>

                    <button
                      onClick={() => navigate("/news")}
                      className="mt-5 inline-flex items-center gap-2 text-orange-600 font-semibold group"
                    >

                      {t("news.readMore")}

                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition"
                      />

                    </button>

                  </div>

                </article>

              )
            )}

          </div>

        </div>

      </div>

    </section>
  );
}