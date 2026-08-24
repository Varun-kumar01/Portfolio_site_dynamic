import { useEffect, useState } from "react";
import {
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../../config";

export default function NewsPreview() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const [newsData, setNewsData] = useState({
    label: "Latest News",
    heading: "Recent Updates & Public Activities",
    description:
      "Stay updated with recent constituency visits, welfare initiatives, government programmes and important public announcements.",

    featured: {
      image: "/news/news1.png",
      date: "2 March 2026",
      title:
        "Minister Calls for Reclaiming Encroached Government Land for the Poor",
      description:
        "Adluri Laxman Kumar directed officials to identify illegally occupied government land and redistribute eligible land to poor families while addressing a public awareness programme in Dharmaram Mandal.",
    },

    items: [
      {
        image: "/news/news2.png",
        date: "1 March 2026",
        title:
          "Annadanam Service Inaugurated at Dharmapuri Temple",
      },
      {
        image: "/news/news3.png",
        date: "14 February 2026",
        title:
          "Congress Records Complete Municipal Sweep in Dharmapuri",
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const isTelugu = i18n.language?.startsWith("te");

  useEffect(() => {
    const loadNewsPreview = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/content?lang=${
            i18n.language?.startsWith("te") ? "te" : "en"
          }`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load News Preview"
          );
        }

        const data = await response.json();

        if (data.home?.newsPreview) {
          setNewsData({
            label:
              data.home.newsPreview.label ||
              "Latest News",

            heading:
              data.home.newsPreview.heading ||
              "Recent Updates & Public Activities",

            description:
              data.home.newsPreview.description ||
              "",

            featured: {
              image:
                data.home.newsPreview.featured
                  ?.image ||
                "/news/news1.png",

              date:
                data.home.newsPreview.featured
                  ?.date ||
                "",

              title:
                data.home.newsPreview.featured
                  ?.title ||
                "",

              description:
                data.home.newsPreview.featured
                  ?.description ||
                "",
            },

            items: [
              {
                image:
                  data.home.newsPreview.items?.[0]
                    ?.image ||
                  "/news/news2.png",

                date:
                  data.home.newsPreview.items?.[0]
                    ?.date ||
                  "",

                title:
                  data.home.newsPreview.items?.[0]
                    ?.title ||
                  "",
              },

              {
                image:
                  data.home.newsPreview.items?.[1]
                    ?.image ||
                  "/news/news3.png",

                date:
                  data.home.newsPreview.items?.[1]
                    ?.date ||
                  "",

                title:
                  data.home.newsPreview.items?.[1]
                    ?.title ||
                  "",
              },
            ],
          });
        }

      } catch (error) {
        console.error(
          "Error loading News Preview:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadNewsPreview();
  }, [i18n.language]);

  const localizedNews = {
    label: t("home.newsPreview.label"),
    heading: t("home.newsPreview.title"),
    description: t("home.newsPreview.description"),
    featuredTitle: isTelugu
      ? t("home.newsPreview.featuredTitle")
      : newsData.featured.title,
    featuredDescription: isTelugu
      ? t("home.newsPreview.featuredDescription")
      : newsData.featured.description,
    item1Title: isTelugu
      ? t("home.newsPreview.item1Title")
      : newsData.items[0].title,
    item2Title: isTelugu
      ? t("home.newsPreview.item2Title")
      : newsData.items[1].title,
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
              src={newsData.featured.image}
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
                    src={item.image}
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