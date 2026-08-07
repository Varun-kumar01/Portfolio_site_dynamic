import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function PoliticalPreview() {
  return (
    <section className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-green-700 font-semibold uppercase tracking-widest">
            Leadership Journey
          </p>

          <h2 className="text-5xl font-bold mt-3 text-gray-900">
            Political Journey
          </h2>

          <div className="w-24 h-1 bg-orange-500 mx-auto mt-5 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div>

            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Serving the People with Commitment & Integrity
            </h3>

            <p className="text-gray-600 leading-9 text-lg mb-6">
              Dedicated to public service and committed to improving the lives
              of people through transparent governance, social welfare,
              infrastructure development and inclusive growth.
            </p>

            <p className="text-gray-600 leading-9 text-lg mb-10">
              The leadership journey reflects years of dedication,
              grassroots connection, and continuous efforts toward
              strengthening communities and building a better future.
            </p>

            <Link
              to="/biography"
              className="inline-flex items-center gap-3 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-semibold transition"
            >
              Explore Political Journey
              <FaArrowRight />
            </Link>

          </div>

          {/* RIGHT */}
          <div className="relative">

            <div className="bg-gradient-to-br from-green-50 via-white to-orange-50 rounded-3xl shadow-xl p-10">

              <div className="space-y-8">

                <div className="flex items-start gap-5">
                  <div className="w-4 h-4 bg-green-600 rounded-full mt-2"></div>

                  <div>
                    <h4 className="font-bold text-xl">
                      Public Service
                    </h4>

                    <p className="text-gray-600">
                      Dedicated to serving citizens with honesty and commitment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mt-2"></div>

                  <div>
                    <h4 className="font-bold text-xl">
                      Development Vision
                    </h4>

                    <p className="text-gray-600">
                      Focused on education, infrastructure and social welfare.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-4 h-4 bg-blue-600 rounded-full mt-2"></div>

                  <div>
                    <h4 className="font-bold text-xl">
                      People's Trust
                    </h4>

                    <p className="text-gray-600">
                      Building stronger communities through leadership and service.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}