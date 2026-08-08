import { CalendarDays, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const featured = {
  image: "/news/news1.png",
  date: "2 March 2026",
  title: "Minister Calls for Reclaiming Encroached Government Land for the Poor",
  description:
    "Adluri Laxman Kumar directed officials to identify illegally occupied government land and redistribute eligible land to poor families while addressing a public awareness programme in Dharmaram Mandal.",
};

const news = [
  {
    image: "/news/news2.png",
    date: "1 March 2026",
    title: "Annadanam Service Inaugurated at Dharmapuri Temple",
  },
  {
    image: "/news/news3.png",
    date: "14 February 2026",
    title: "Congress Records Complete Municipal Sweep in Dharmapuri",
  },
];

export default function NewsPreview() {

  const navigate = useNavigate();
  
  return (
    <section className="py-16 lg:py-20 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          <div className="max-w-2xl">

            <span className="uppercase tracking-[0.25em] text-orange-600 text-sm font-semibold">

              Latest News

            </span>

            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">

              Recent Updates & Public Activities

            </h2>

            <p className="mt-5 text-gray-600 leading-8">

              Stay updated with recent constituency visits,
              welfare initiatives, government programmes and
              important public announcements.

            </p>

          </div>

          <button onClick={() => navigate("/news")} className="inline-flex items-center gap-2 text-orange-600 font-semibold group">

            View All News

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
              src={featured.image}
              alt=""
              className="w-full h-[260px] md:h-[380px] object-cover"
            />

            <div className="p-8">

              <div className="flex items-center gap-2 text-orange-600 text-sm">

                <CalendarDays size={16} />

                {featured.date}

              </div>

              <h3 className="mt-4 text-2xl font-bold text-slate-900">

                {featured.title}

              </h3>

              <p className="mt-5 text-gray-600 leading-8">

                {featured.description}

              </p>

              <button className="mt-7 inline-flex items-center gap-2 text-orange-600 font-semibold group">

                Read More

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />

              </button>

            </div>

          </article>

          {/* Recent */}

          <div className="space-y-6">

            {news.map((item, index) => (

              <article
                key={index}
                className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition duration-500"
              >

                <img
                  src={item.image}
                  alt=""
                  className="w-full h-[170px] object-cover"
                />

                <div className="p-6">

                  <div className="flex items-center gap-2 text-orange-600 text-sm">

                    <CalendarDays size={15} />

                    {item.date}

                  </div>

                  <h4 className="mt-4 text-lg font-semibold text-slate-900 leading-8">

                    {item.title}

                  </h4>

                  <button className="mt-5 inline-flex items-center gap-2 text-orange-600 font-semibold group">

                    Read More

                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition"
                    />

                  </button>

                </div>

              </article>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}