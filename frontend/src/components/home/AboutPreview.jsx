import { Link } from "react-router-dom";

export default function AboutPreview() {
  return (
    <section className="py-3 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div>
          <span className="text-green-700 font-semibold uppercase tracking-widest">
            About
          </span>

          <h2 className="text-4xl font-bold mt-3 text-gray-900">
            A Life Dedicated to Public Service
          </h2>

          <div className="w-24 h-1 bg-orange-500 rounded-full my-5"></div>

          <p className="text-gray-600 text-lg leading-9">
            Adluri Laxman Kumar has consistently worked towards
            strengthening public welfare, improving infrastructure,
            empowering youth, and addressing people's concerns through
            transparent leadership.
          </p>

          <p className="text-gray-600 text-lg leading-9 mt-5">
            His journey reflects dedication, integrity, and a strong
            commitment to the development of Telangana and the welfare
            of every citizen.
          </p>

          <Link
            to="/biography"
            className="inline-flex items-center mt-10 px-7 py-4 bg-green-700 hover:bg-green-800 text-white rounded-full font-semibold transition"
          >
            Read Full Biography →
          </Link>
        </div>

        {/* Right Side */}
        <div className="relative">

          <div className="absolute -top-6 -left-6 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-70"></div>

          <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-10 text-white shadow-2xl">

            <h3 className="text-2xl font-bold mb-6">
              Leadership Vision
            </h3>

            <ul className="space-y-5 text-lg">

              <li>✔ Transparent Governance</li>

              <li>✔ Rural Development</li>

              <li>✔ Youth Empowerment</li>

              <li>✔ Social Justice</li>

              <li>✔ Public Welfare</li>

            </ul>

          </div>

        </div>

      </div>
    </section>
  );
}