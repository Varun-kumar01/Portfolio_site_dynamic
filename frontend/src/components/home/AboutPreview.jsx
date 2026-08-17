import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

export default function AboutPreview({
  content,
}) {
  const navigate =
    useNavigate();

  // =====================================
  // SAFETY CHECK
  // =====================================

  if (!content) {
    return null;
  }

  // =====================================
  // HOME CONTENT
  // =====================================

  const home =
    content.home || {};

  // =====================================
  // FEATURES
  // =====================================

  const features =
    home.features || [];

  // =====================================
  // STATS
  // =====================================

  const stats =
    home.stats || [];

  return (
    <section className="relative pt-16 pb-16 lg:pt-20 lg:pb-20 bg-white overflow-hidden">

      {/* BACKGROUND GLOW */}

      <div className="absolute -left-32 top-20 w-72 h-72 bg-orange-100 rounded-full blur-[120px] opacity-50" />

      <div className="absolute right-0 bottom-0 w-72 h-72 bg-green-100 rounded-full blur-[120px] opacity-40" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">

          {/* ================================= */}
          {/* LEFT IMAGE */}
          {/* ================================= */}

          <div className="relative flex justify-center">

            {/* ORANGE GLOW */}

            <div className="absolute w-[420px] h-[420px] rounded-full bg-orange-200 blur-[120px] opacity-50" />

            {/* GREEN GLOW */}

            <div className="absolute bottom-0 right-0 w-[280px] h-[280px] rounded-full bg-green-200 blur-[120px] opacity-50" />

            <div className="relative">

              <div className="absolute inset-0 rounded-[36px] border-[5px] border-white z-20" />

              <img
                src={
                  home.aboutImage ||
                  "/about.png"
                }
                alt={
                  home.aboutHeading ||
                  "About"
                }
                className="relative z-10 rounded-[36px] object-cover shadow-[0_20px_60px_rgba(0,0,0,.12)] hover:scale-[1.02] transition duration-500"
              />

            </div>

          </div>

          {/* ================================= */}
          {/* RIGHT CONTENT */}
          {/* ================================= */}

          <div>

            {/* SECTION LABEL */}

            <span className="uppercase tracking-[0.25em] text-orange-600 font-semibold text-sm">
              About
            </span>

            {/* HEADING */}

            <h2 className="mt-5 text-2xl lg:text-4xl font-black leading-tight text-slate-900">

              {
                home.aboutHeading ||
                "Dedicated to the Progress of Every Citizen"
              }

            </h2>

            {/* DESCRIPTION */}

            <p className="mt-8 text-lg leading-9 text-gray-600">

              {
                home.aboutDescription ||
                "Public service is built on integrity, transparency and commitment."
              }

            </p>

            {/* ================================= */}
            {/* FEATURES */}
            {/* ================================= */}

            <div className="grid sm:grid-cols-2 gap-5 mt-10">

              {features
                .filter(
                  (item) => item
                )
                .map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >

                      <CheckCircle2
                        size={20}
                        className="text-green-600"
                      />

                      <span className="font-medium text-gray-700">

                        {item}

                      </span>

                    </div>

                  )
                )}

            </div>

            {/* ================================= */}
            {/* STATISTICS */}
            {/* ================================= */}

            <div className="grid grid-cols-2 gap-5 mt-12">

              {stats
                .filter(
                  (stat) =>
                    stat?.number ||
                    stat?.text
                )
                .map(
                  (
                    stat,
                    index
                  ) => (

                    <div
                      key={index}
                      className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:-translate-y-2 hover:shadow-xl transition duration-500"
                    >

                      <h3 className="text-4xl font-black text-orange-600">

                        {stat.number}

                      </h3>

                      <p className="mt-2 text-gray-600">

                        {stat.text}

                      </p>

                    </div>

                  )
                )}

            </div>

            {/* BUTTON */}

            <button
              onClick={() =>
                navigate("/about")
              }
              className="mt-12 inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-full font-semibold shadow-lg"
            >

              Learn More

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}