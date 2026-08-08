import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const images = [
  "/gallery/1.png",
  "/gallery/2.png",
  "/gallery/3.png",
  "/gallery/4.png",
  "/gallery/5.png",
];

export default function GalleryPreview() {

  const navigate = useNavigate();

  return (
    <section className="py-16 lg:py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          <div className="max-w-2xl">

            <span className="uppercase tracking-[0.25em] text-orange-600 text-sm font-semibold">

              Gallery

            </span>

            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">

              Moments That Define
              Public Service

            </h2>

            <p className="mt-5 text-gray-600 leading-8">

              A glimpse into development initiatives,
              constituency visits, public meetings,
              celebrations and citizen engagement.

            </p>

          </div>

          <button onClick={() => navigate("/gallery")} className="inline-flex items-center gap-2 text-orange-600 font-semibold group">

            View Complete Gallery

            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition"
            />

          </button>

        </div>

        {/* Gallery */}

        <div className="grid lg:grid-cols-3 gap-5 mt-10">

          {/* Large */}

          <div className="lg:col-span-2 relative overflow-hidden rounded-[28px] group">

            <img
              src={images[0]}
              alt=""
              className="w-full h-[260px] md:h-[520px] object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-8">

              <div>

                <p className="text-white text-2xl font-semibold">

                  Community Development

                </p>

                <button onClick={() => navigate("/gallery")}>
                  <span className="text-white/80">

                    View Photo

                  </span>
                </button>

              </div>

            </div>

          </div>

          {/* Right Grid */}

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-5">

            {images.slice(1, 3).map((image, index) => (

              <div
                key={index}
                className="relative overflow-hidden rounded-[24px] group"
              >

                <img
                  src={image}
                  alt=""
                  className="w-full h-[180px] lg:h-[248px] object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">

                  <button onClick={() => navigate("/gallery")}>
                    <span className="text-white font-semibold">

                      View

                    </span>
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Bottom */}

        <div className="grid md:grid-cols-3 gap-5 mt-5">

          {images.slice(3).map((image, index) => (

            <div
              key={index}
              className="relative overflow-hidden rounded-[24px] group"
            >

              <img
                src={image}
                alt=""
                className="w-full h-[200px] object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">

                <span className="text-white font-semibold">

                  View

                </span>

              </div>

            </div>

          ))}

          {/* Last Card */}

          <div className="rounded-[24px] bg-gradient-to-br from-orange-600 to-orange-500 p-8 text-white flex flex-col justify-center">

            <p className="uppercase tracking-widest text-sm">

              Gallery

            </p>

            <h3 className="mt-3 text-3xl font-bold">

              500+
              <br />
              Moments

            </h3>

            <button onClick={() => navigate("/gallery")} className="mt-8 inline-flex items-center gap-2 font-semibold">

              Explore Gallery

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}