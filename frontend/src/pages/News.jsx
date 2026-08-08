import { useMemo, useState } from "react";
import { CalendarDays, Search, ArrowRight } from "lucide-react";
import PageBanner from "../components/common/PageBanner";

const newsData = [
  {
    id: 1,
    title: "Development Review Meeting Conducted Successfully",
    image: "/news/news1.png",
    category: "Government",
    date: "20 August 2026",
    description:
      "Review meeting conducted to monitor ongoing infrastructure and welfare projects.",
    link: "https://hyderabadnewshunt.com/minister-adluri-laxman-kumar-reviews-village-development-works/",  
  },
  {
    id: 2,
    title: "Village Development Programme",
    image: "/news/news2.png",
    category: "Public",
    date: "18 August 2026",
    description:
      "Interaction with local citizens regarding drinking water and road development.",
    link: "https://www.facebook.com/61557986352577/videos/the-true-measure-of-governance-lies-in-ensuring-that-every-welfare-initiative-re/1388621763113437/",  
  },
  {
    id: 3,
    title: "Health Camp Inaugurated",
    image: "/news/news3.png",
    category: "Healthcare",
    date: "16 August 2026",
    description:
      "Large scale medical camp organized for citizens across the constituency.",
    link: "https://www.facebook.com/smsghm/videos/honble-minister-for-minorities-welfare-telangana-sri-adluri-laxman-kumar-praised/1596232714869992/",  
  },
  {
    id: 4,
    title: "Education Support Initiative",
    image: "/news/news4.png",
    category: "Education",
    date: "14 August 2026",
    description:
      "Scholarship and educational assistance programme launched.",
    link: "https://timesofindia.indiatimes.com/city/hyderabad/t-urges-centre-to-release-450cr-scholarship-dues-for-tribal-students/articleshow/133035186.cms",  
  },
  {
    id: 5,
    title: "Farmer Welfare Meeting",
    image: "/news/news5.png",
    category: "Agriculture",
    date: "10 August 2026",
    description:
      "Interaction with farmers regarding irrigation and welfare schemes.",
    link: "https://www.facebook.com/IPRTelangana/posts/minister-adluri-laxman-kumar-assures-village-level-problem-resolutiontelangana-s/1399975242161476/",  
  },
  {
    id: 6,
    title: "Public Grievance Programme",
    image: "/news/news6.png",
    category: "Public",
    date: "08 August 2026",
    description:
      "Meeting with citizens to discuss and address constituency issues.",
    link: "https://www.thehansindia.com/news/cities/hyderabad/laxman-assures-support-to-differently-abled-employees-1101729",  
  },
];

const categories = [
  "All",
  "Government",
  "Public",
  "Healthcare",
  "Education",
  "Agriculture",
];

export default function News() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredNews = useMemo(() => {
    const query = search.trim().toLowerCase();

    return newsData.filter((item) => {
      const categoryMatch =
        category === "All" || item.category === category;

      const searchMatch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [category, search]);

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
                Latest Updates
              </span>

              <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                News & Announcements
              </h1>

              <p className="mt-4 text-gray-600 leading-8">
                Follow the latest public programmes, constituency activities,
                welfare initiatives and important announcements.
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
                placeholder="Search news..."
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

            {categories.map((item) => (

              <button
                key={item}
                onClick={() => setCategory(item)}
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

          {/* Result Count */}

          <div className="mt-10 flex items-center justify-between">

            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredNews.length}
              </span>{" "}
              {filteredNews.length === 1 ? "update" : "updates"}
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

                    {/* <button className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-600">

                      Read More

                      <ArrowRight
                        size={17}
                        className="transition group-hover:translate-x-1"
                      />

                    </button> */}


                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-600"
                    >
                      Read More

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
                className="mt-6 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition"
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