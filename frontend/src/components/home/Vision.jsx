import {
  FaBus,
  FaUsers,
  FaGlobeAsia,
  FaArrowRight,
} from "react-icons/fa";

export default function Vision() {
  const cards = [
    {
      icon: <FaBus />,
      title: "Transforming Transportation",
      text: "Building modern transport systems that connect people to opportunities and strengthen communities.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <FaUsers />,
      title: "Empowering Communities",
      text: "Ensuring equal opportunities through education, welfare, and inclusive social development.",
      color: "from-green-600 to-emerald-500",
    },
    {
      icon: <FaGlobeAsia />,
      title: "Inclusive Growth",
      text: "Creating a future where development reaches every citizen without leaving anyone behind.",
      color: "from-blue-600 to-cyan-500",
    },
  ];

  return (
    <section className="relative py-10 bg-gradient-to-br from-[#0f172a] via-[#14532d] to-[#052e16] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500/20 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400/20 blur-[150px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">

          <p className="uppercase tracking-[6px] text-orange-400 font-semibold">
            Vision & Mission
          </p>

          <h2 className="text-5xl lg:text-6xl font-black text-white mt-4">
            Building a Better Tomorrow
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto mt-4 text-lg leading-8">
            Every decision is guided by one purpose — creating opportunities,
            strengthening communities and ensuring inclusive growth for every citizen.
          </p>

        </div>

        {/* Mission Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 mb-16">

          <h3 className="text-3xl font-bold text-white mb-6">
            My Vision
          </h3>

          <p className="text-gray-200 leading-9 text-lg">
            I believe no one should be left behind in the story of progress.
            Inclusive growth, social justice, and sustainable development guide
            every decision I make because governance should always serve the people.
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {cards.map((card, index) => (

            <div
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-2xl hover:-translate-y-4 duration-500"
            >

              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white text-3xl mb-8`}>
                {card.icon}
              </div>

              <h3 className="text-2xl font-bold mb-5">
                {card.title}
              </h3>

              <p className="text-gray-600 leading-8">
                {card.text}
              </p>

              

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}