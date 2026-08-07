import { useMemo, useState } from "react";
import {
  CalendarDays,
  Search,
  ArrowRight,
} from "lucide-react";

import PageBanner from "../components/common/PageBanner";

const newsData = [
  {
    id: 1,
    title: "Development Review Meeting Conducted Successfully",
    image: "/news/news1.jpg",
    category: "Development",
    date: "20 August 2026",
    description:
      "Review meeting conducted to monitor ongoing infrastructure and welfare projects.",
  },
  {
    id: 2,
    title: "Village Development Programme",
    image: "/news/news2.jpg",
    category: "Government",
    date: "18 August 2026",
    description:
      "Interaction with local citizens regarding drinking water and road development.",
  },
  {
    id: 3,
    title: "Health Camp Inaugurated",
    image: "/news/news3.jpg",
    category: "Healthcare",
    date: "16 August 2026",
    description:
      "Large scale medical camp organized for citizens across the constituency.",
  },
  {
    id: 4,
    title: "Education Support Initiative",
    image: "/news/news4.jpg",
    category: "Education",
    date: "14 August 2026",
    description:
      "Scholarship and educational assistance programme launched.",
  },
  {
    id: 5,
    title: "Farmer Welfare Meeting",
    image: "/news/news5.jpg",
    category: "Agriculture",
    date: "10 August 2026",
    description:
      "Interaction with farmers regarding irrigation and welfare schemes.",
  },
  {
    id: 6,
    title: "Public Grievance Programme",
    image: "/news/news6.jpg",
    category: "Public",
    date: "08 August 2026",
    description:
      "Meeting with citizens to resolve constituency issues.",
  },
];

const categories = [
  "All",
  "Development",
  "Government",
  "Healthcare",
  "Education",
  "Agriculture",
  "Public",
];

export default function News() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredNews = useMemo(() => {
    return newsData.filter((item) => {
      const categoryMatch =
        category === "All" || item.category === category;

      const searchMatch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  return (
    <>
      <PageBanner
        title="Latest News"
        background="/news-banner.jpg"
      />

      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          {/* Header */}

          <div className="flex flex-col lg:flex-row justify-between gap-8">

            <div>

              <span className="uppercase tracking-[0.25em] text-orange-600 font-semibold">
                Latest Updates
              </span>

              <h2 className="mt-3 text-4xl lg:text-5xl font-bold">
                News & Announcements
              </h2>

            </div>

            <div className="relative lg:w-96">

              <Search
                className="absolute left-4 top-4 text-gray-400"
                size={18}
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search news..."
                className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-4 outline-none focus:border-orange-600"
              />

            </div>

          </div>

          {/* Featured */}

          <div className="mt-16">

            <div className="grid lg:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">

              <img
                src="/news/news1.jpg"
                alt=""
                className="w-full h-full min-h-[380px] object-cover"
              />

              <div className="p-10 flex flex-col justify-center">

                <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold w-fit">
                  FEATURED
                </span>

                <h2 className="mt-6 text-4xl font-bold leading-tight">

                  Government Welfare Initiatives Continue Across Dharmapuri Constituency

                </h2>

                <div className="flex items-center gap-2 mt-5 text-gray-500">

                  <CalendarDays size={16} />

                  20 August 2026

                </div>

                <p className="mt-8 text-gray-600 leading-8">

                  Shri Adluri Laxman Kumar reviewed multiple development
                  projects and interacted with citizens regarding
                  welfare programmes and constituency development.

                </p>

                <button className="mt-8 bg-orange-600 hover:bg-orange-700 transition text-white px-7 py-3 rounded-lg w-fit">

                  Read Complete Story

                </button>

              </div>

            </div>

          </div>

          {/* Categories */}

          <div className="flex flex-wrap gap-3 mt-16">

            {categories.map((item) => (

              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`px-5 py-2 rounded-full border transition ${
                  category === item
                    ? "bg-orange-600 border-orange-600 text-white"
                    : "bg-white hover:border-orange-600 hover:text-orange-600"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

          {/* Cards */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">

            {filteredNews.map((item) => (

              <article
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow hover:-translate-y-2 hover:shadow-2xl transition duration-300"
              >

                <div className="overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
                  />

                </div>

                <div className="p-7">

                  <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">

                    {item.category}

                  </span>

                  <div className="flex items-center gap-2 mt-5 text-gray-500">

                    <CalendarDays size={15} />

                    {item.date}

                  </div>

                  <h3 className="mt-4 text-2xl font-bold leading-snug">

                    {item.title}

                  </h3>

                  <p className="mt-4 text-gray-600 leading-8">

                    {item.description}

                  </p>

                  <button className="mt-6 flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-4 transition-all">

                    Read More

                    <ArrowRight size={18} />

                  </button>

                </div>

              </article>

            ))}

          </div>

          {/* Newsletter */}

          <section className="mt-24">

            <div className="rounded-3xl bg-orange-600 text-white p-12 text-center">

              <h2 className="text-4xl font-bold">

                Stay Updated

              </h2>

              <p className="mt-5 max-w-2xl mx-auto text-orange-100 leading-8">

                Subscribe to receive the latest updates regarding
                development works, welfare programmes, public meetings,
                and constituency activities.

              </p>

              <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full md:w-96 px-5 py-4 rounded-lg text-gray-900 outline-none"
                />

                <button className="bg-white text-orange-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition">

                  Subscribe

                </button>

              </div>

            </div>

          </section>

        </div>

      </section>
    </>
  );
}