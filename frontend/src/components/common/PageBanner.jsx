import { Link } from "react-router-dom";

export default function PageBanner({
  title,
  background = "/about-banner.jpg",
}) {
  return (
    <section
      className="relative h-[280px] md:h-[340px] overflow-hidden"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-white/90">

            <Link
              to="/"
              className="hover:text-orange-400 transition"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-orange-400">
              {title}
            </span>

          </div>

        </div>
      </div>
    </section>
  );
}