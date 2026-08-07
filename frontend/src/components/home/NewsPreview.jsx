import { ArrowRight, CalendarDays } from "lucide-react";

const news = [
  {
    id: 1,
    image: "/news1.jpg",
    date: "20 August 2026",
    title: "Development Review Meeting Conducted Successfully",
    description:
      "A comprehensive review meeting was held to monitor the progress of ongoing development projects.",
  },
  {
    id: 2,
    image: "/news2.jpg",
    date: "18 August 2026",
    title: "New Drinking Water Project Inaugurated",
    description:
      "The initiative aims to provide safe drinking water to thousands of families in rural areas.",
  },
  {
    id: 3,
    image: "/news3.jpg",
    date: "14 August 2026",
    title: "Youth Employment Awareness Programme",
    description:
      "Special employment and skill development camps organized for young citizens.",
  },
];

export default function NewsPreview() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <div className="flex justify-between items-end flex-wrap gap-5">
          <div>
            <span className="uppercase tracking-widest text-orange-600 font-semibold">
              Latest News
            </span>

            <h2 className="mt-3 text-4xl font-bold">
              Recent Updates
            </h2>
          </div>

          <button className="flex items-center gap-2 font-semibold text-orange-600">
            View All
            <ArrowRight size={18}/>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-14">

          {news.map(item=>(
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden shadow hover:shadow-xl transition bg-white"
            >

              <img
                src={item.image}
                alt=""
                className="w-full h-60 object-cover"
              />

              <div className="p-6">

                <div className="flex items-center gap-2 text-sm text-orange-600">

                  <CalendarDays size={16}/>

                  {item.date}

                </div>

                <h3 className="mt-4 text-2xl font-semibold leading-snug">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {item.description}
                </p>

                <button className="mt-6 text-orange-600 font-semibold flex items-center gap-2">
                  Read More
                  <ArrowRight size={16}/>
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}