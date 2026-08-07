import { ArrowRight } from "lucide-react";

const works = [
  {
    id: 1,
    image: "/works1.jpg",
    title: "Road Infrastructure Development",
    description:
      "Construction and renovation of major roads improving connectivity across villages and urban areas.",
  },
  {
    id: 2,
    image: "/works2.jpg",
    title: "Healthcare Initiatives",
    description:
      "Organizing medical camps, upgrading hospitals and providing accessible healthcare services.",
  },
  {
    id: 3,
    image: "/works3.jpg",
    title: "Educational Development",
    description:
      "Supporting schools with better infrastructure, scholarships and digital learning facilities.",
  },
];

export default function Works() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">

          <div>
            <span className="text-orange-600 font-semibold uppercase tracking-widest">
              Development Works
            </span>

            <h2 className="mt-4 text-4xl font-bold text-gray-900">
              Transforming Communities
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl leading-8">
              Development projects focused on improving infrastructure,
              education, healthcare and public welfare.
            </p>
          </div>

          <button className="flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all">
            View All
            <ArrowRight size={18} />
          </button>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {works.map((work) => (

            <div
              key={work.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >

              <div className="overflow-hidden">

                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />

              </div>

              <div className="p-7">

                <h3 className="text-2xl font-semibold text-gray-900">
                  {work.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {work.description}
                </p>

                <button className="mt-6 text-orange-600 font-semibold flex items-center gap-2">
                  Read More
                  <ArrowRight size={16} />
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}