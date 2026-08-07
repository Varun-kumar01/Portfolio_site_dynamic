import { ArrowRight } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}

          <div className="relative">

            <div className="absolute -top-6 -left-6 w-44 h-44 bg-orange-100 rounded-3xl hidden lg:block"></div>

            <img
              src="/about.png"
              alt="About"
              className="relative rounded-3xl shadow-xl w-full object-cover"
            />

          </div>

          {/* Content */}

          <div>

            <span className="text-orange-600 font-semibold uppercase tracking-wider">
              About
            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Dedicated to the Progress of Every Citizen
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              Public service is built on integrity, transparency, and
              commitment. Through continuous interaction with citizens and
              community-driven initiatives, our mission is to improve education,
              healthcare, employment, infrastructure, and the quality of life
              for every family.
            </p>

            <p className="mt-5 text-gray-600 leading-8">
              Every development initiative reflects a long-term vision of
              sustainable growth, accountability, and inclusive governance.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">

              <div className="border rounded-xl p-5">
                <h3 className="text-3xl font-bold text-orange-600">
                  200+
                </h3>

                <p className="mt-2 text-gray-600">
                  Public Projects
                </p>
              </div>

              <div className="border rounded-xl p-5">
                <h3 className="text-3xl font-bold text-orange-600">
                  15+
                </h3>

                <p className="mt-2 text-gray-600">
                  Years Experience
                </p>
              </div>

            </div>

            <button className="mt-10 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition">

              Learn More

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      </div>
    </section>
  );
}