import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CalendarDays, Search, ArrowRight } from "lucide-react";
import PageBanner from "../components/common/PageBanner";

const newsDataRaw = [
  {
    id: 1,
    titleKey: "news.items.news1.title",
    descriptionKey: "news.items.news1.description",
    categoryKey: "government",
    image: "/news/news1.png",
    date: "20 August 2026",
    link: "https://hyderabadnewshunt.com/minister-adluri-laxman-kumar-reviews-village-development-works/",  
  },
  {
    id: 2,
    titleKey: "news.items.news2.title",
    descriptionKey: "news.items.news2.description",
    categoryKey: "public",
    image: "/news/news2.png",
    date: "18 August 2026",
    link: "https://www.facebook.com/61557986352577/videos/the-true-measure-of-governance-lies-in-ensuring-that-every-welfare-initiative-re/1388621763113437/",  
  },
  {
    id: 3,
    titleKey: "news.items.news3.title",
    descriptionKey: "news.items.news3.description",
    categoryKey: "healthcare",
    image: "/news/news3.png",
    date: "16 August 2026",
    link: "https://www.facebook.com/smsghm/videos/honble-minister-for-minorities-welfare-telangana-sri-adluri-laxman-kumar-praised/1596232714869992/",  
  },
  {
    id: 4,
    titleKey: "news.items.news4.title",
    descriptionKey: "news.items.news4.description",
    categoryKey: "education",
    image: "/news/news4.png",
    date: "14 August 2026",
    link: "https://timesofindia.indiatimes.com/city/hyderabad/t-urges-centre-to-release-450cr-scholarship-dues-for-tribal-students/articleshow/133035186.cms",  
  },
  {
    id: 5,
    titleKey: "news.items.news5.title",
    descriptionKey: "news.items.news5.description",
    categoryKey: "agriculture",
    image: "/news/news5.png",
    date: "10 August 2026",
    link: "https://www.facebook.com/IPRTelangana/posts/minister-adluri-laxman-kumar-assures-village-level-problem-resolutiontelangana-s/1399975242161476/",  
  },
  {
    id: 6,
    titleKey: "news.items.news6.title",
    descriptionKey: "news.items.news6.description",
    categoryKey: "public",
    image: "/news/news6.png",
    date: "08 August 2026",
    link: "https://www.thehansindia.com/news/cities/hyderabad/laxman-assures-support-to-differently-abled-employees-1101729",  
  },
];

const categoryKeys = [
  "all",
  "government",
  "public",
  "healthcare",
  "education",
  "agriculture",
];

export default function News() {
  const { t } = useTranslation();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  // Build newsData with translated values
  const newsData = newsDataRaw.map(item => ({
    ...item,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    category: t(`news.${item.categoryKey}`),
  }));

  const filteredNews = useMemo(() => {
    const query = search.trim().toLowerCase();

    return newsData.filter((item) => {
      const categoryMatch =
        category === "all" || item.categoryKey === category;

      const searchMatch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [category, search, newsData]);

  return (
    <>
      {/* <PageBanner
        title="News & Updates"
        subtitle="Latest updates, public activities, programmes and announcements."
      /> */}

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header */}

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <div className="max-w-2xl">

              <span className="text-orange-600 text-sm font-semibold uppercase tracking-[0.25em]">
                {t('news.pageLabel')}
              </span>

              <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                {t('news.pageTitle')}
              </h1>

              <p className="mt-4 text-gray-600 leading-8">
                {t('news.pageDescription')}
              </p>

            </div>

            {/* Search */}

            <div className="relative w-full lg:w-80">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('news.search')}
                className="
                  w-full
                  rounded-2xl
                  border border-slate-200
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

          {/* Categories */}

          <div className="flex flex-wrap gap-3 mt-10">

            {categoryKeys.map((key) => (

              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`
                  rounded-full
                  border
                  px-5
                  py-2
                  text-sm
                  font-medium
                  transition
                  ${
                    category === key
                      ? "border-orange-600 bg-orange-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-orange-500 hover:text-orange-600"
                  }
                `}
              >
                {t(`news.${key}`)}
              </button>

            ))}

          </div>

          {/* Result Count */}

          <div className="mt-10 flex items-center justify-between">

            <p className="text-sm text-gray-500">
              {t('news.showing')}{" "}
              <span className="font-semibold text-slate-900">
                {filteredNews.length}
              </span>{" "}
              {filteredNews.length === 1 ? t('news.update') : t('news.updates')}
            </p>

          </div>

          {/* News Grid */}

          {filteredNews.length > 0 ? (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7 mt-6">

              {filteredNews.map((item) => (

                <article
                  key={item.id}
                  className="
                    group
                    overflow-hidden
                    rounded-3xl
                    border border-slate-100
                    bg-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >

                  {/* Image */}

                  <div className="overflow-hidden">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        h-56
                        w-full
                        object-cover
                        transition
                        duration-700
                        group-hover:scale-105
                      "
                    />

                  </div>

                  {/* Content */}

                  <div className="p-6">

                    <div className="flex items-center gap-2 text-sm text-orange-600">

                      <CalendarDays size={16} />

                      <span>{item.date}</span>

                    </div>

                    <span className="inline-block mt-4 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                      {item.category}
                    </span>

                    <h2 className="mt-4 text-xl font-bold leading-8 text-slate-900">
                      {item.title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      {item.description}
                    </p>

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-600"
                    >
                      {t('news.readMore')}

                      <ArrowRight
                        size={17}
                        className="transition group-hover:translate-x-1"
                      />
                    </a>

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white py-20 text-center">

              <Search
                size={30}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {t('news.noNewsFound')}
              </h3>

              <p className="mt-2 text-gray-500">
                {t('news.tryAnother')}
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
                className="mt-6 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition"
              >
                {t('news.clearFilters')}
              </button>

            </div>

          )}

        </div>
      </section>
    </>
  );
}