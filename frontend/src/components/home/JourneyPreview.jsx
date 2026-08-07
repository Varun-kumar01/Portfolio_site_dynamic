import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function JourneyPreview() {

  const journey = [
    {
      year: "1996",
      title: "Started Public Service",
      desc: "General Secretary, Andhra Pradesh Youth Congress",
    },
    {
      year: "2023",
      title: "Elected MLA",
      desc: "Won from Dharmapuri Assembly Constituency",
    },
    {
      year: "2025",
      title: "Cabinet Minister",
      desc: "Joined the Telangana State Cabinet",
    },
  ];

  return (
    <section className="py-3 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-green-700 font-semibold">
            Journey
          </p>

          <h2 className="text-5xl font-black mt-4">
            Leadership Journey
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-5 text-lg">
            A journey built on dedication, leadership and commitment
            towards public service.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {journey.map((item, index) => (

            <div
              key={index}
              className="relative bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-10 text-white shadow-2xl hover:-translate-y-3 duration-300"
            >

              <div className="absolute top-5 right-5 text-6xl font-black opacity-10">
                {item.year}
              </div>

              <span className="inline-block bg-orange-500 px-5 py-2 rounded-full text-sm font-semibold">
                {item.year}
              </span>

              <h3 className="text-2xl font-bold mt-8">
                {item.title}
              </h3>

              <p className="mt-5 text-green-100 leading-8">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

        <div className="text-center mt-16">

          <Link
            to="/biography"
            className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold transition"
          >
            Explore Complete Political Journey
            <FaArrowRight />
          </Link>

        </div>

      </div>

    </section>
  );
}