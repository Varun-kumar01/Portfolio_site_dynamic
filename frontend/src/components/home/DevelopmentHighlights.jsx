import { useState } from "react";
import {
  Building2,
  GraduationCap,
  HeartHandshake,
  Trees,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const developments = [

  {
    title: "Healthcare",
    icon: HeartHandshake,
    image: "/works/health.png",
    description:
      "Enhancing healthcare access through medical camps, awareness programmes and better health facilities.",
  },
  {
    title: "Agriculture",
    icon: Trees,
    image: "/works/agriculture.png",
    description:
      "Working alongside farmers to encourage sustainable agriculture and rural development initiatives.",
  },
    {
    title: "Infrastructure Development",
    icon: Building2,
    image: "/works/roads.png",
    description:
      "Strengthening roads, public buildings, drinking water facilities and civic infrastructure to improve connectivity and everyday life.",
  },
  {
    title: "Education & Youth",
    icon: GraduationCap,
    image: "/works/education.png",
    description:
      "Supporting schools, scholarships, digital learning and opportunities that empower students and young leaders.",
  },
];

export default function DevelopmentHighlights() {
  const [active, setActive] = useState(0);

  const current = developments[active];

  const navigate = useNavigate();

  return (
    <section className="py-16 lg:py-20 bg-slate-50 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="max-w-2xl">

          <span className="uppercase tracking-[0.25em] text-orange-600 text-sm font-semibold">
            Development Highlights
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            Building Stronger Communities
          </h2>

          <p className="mt-5 text-gray-600 leading-8">
            Development is driven by better infrastructure,
            quality education, healthcare and sustainable
            opportunities that improve everyday life.
          </p>

        </div>

        {/* Featured */}

        <div className="mt-10 grid lg:grid-cols-[1.15fr_.85fr] gap-10 items-center">

          <div>

            <img
              src={current.image}
              alt={current.title}
              className="w-full h-[260px] md:h-[420px] rounded-[28px] object-cover shadow-xl transition-all duration-500"
            />

          </div>

          <div>

            <div className="inline-flex items-center gap-3 text-orange-600">

              <current.icon size={22} />

              <span className="font-semibold uppercase tracking-wide">
                Featured Initiative
              </span>

            </div>

            <h3 className="mt-5 text-3xl font-bold text-slate-900">
              {current.title}
            </h3>

            <p className="mt-6 text-gray-600 leading-8">
              {current.description}
            </p>

            <button onClick={() => navigate("/news")} className="mt-8 inline-flex items-center gap-2 text-orange-600 font-semibold group">

              Learn More

              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />

            </button>

          </div>

        </div>

        {/* Cards */}

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-12">

          {developments.map((item, index) => {

            const Icon = item.icon;

            return (

              <button
                key={index}
                onClick={() => setActive(index)}
                className={`text-left rounded-[24px] p-6 border transition-all duration-300 ${
                  active === index
                    ? "bg-orange-600 text-white border-orange-600 shadow-xl"
                    : "bg-white hover:-translate-y-2 border-slate-200 hover:border-orange-200"
                }`}
              >

                <Icon
                  size={28}
                  className={
                    active === index
                      ? "text-white"
                      : "text-orange-600"
                  }
                />

                <h4 className="mt-5 text-lg font-semibold">
                  {item.title}
                </h4>

                <p
                  className={`mt-3 text-sm leading-7 ${
                    active === index
                      ? "text-orange-50"
                      : "text-gray-600"
                  }`}
                >
                  {item.description.substring(0, 90)}...
                </p>

              </button>

            );

          })}

        </div>

      </div>

    </section>
  );
}