import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero({ content }) {
  const navigate = useNavigate();

  // =========================
  // SAFETY CHECK
  // =========================

  if (!content) {
    return null;
  }

  return (
    <section className="relative overflow-hidden">

      {/* Background Blur */}

      <div className="absolute -top-40 -left-40 w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full bg-orange-200 blur-[120px] opacity-40 animate-pulse"></div>

      <div className="absolute -bottom-32 -right-40 w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full bg-green-200 blur-[120px] opacity-40 animate-pulse"></div>


      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">

        <div className="grid md:grid-cols-[1.1fr_0.9fr] items-center min-h-[85vh] lg:min-h-[82vh] gap-12 lg:gap-8 py-8 lg:py-0">

          {/* =========================
              LEFT CONTENT
          ========================= */}

          <div className="order-1 w-full">

            {/* DESIGNATION */}

            <span className="inline-flex items-center px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase">

              {content.profile?.designation2 || ""}

              {" • "}

              {content.profile?.state || ""}

            </span>


            {/* NAME */}

            <div className="mt-7">

              <div className="text-sm sm:text-base lg:text-lg font-bold tracking-[0.45em] text-slate-500 uppercase">

                ADLURI

              </div>


              <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.05] tracking-tight text-slate-800 whitespace-nowrap">

                {content.home?.heroTitle || ""}

              </h1>

            </div>


            {/* HERO SUBTITLE */}

            <h2 className="mt-4 text-[1.8rem] lg:text-[2.4rem] font-semibold text-gray-800 leading-tight">

              {content.home?.heroSubtitle || ""}

            </h2>


            {/* HERO DESCRIPTION */}

            <p className="mt-5 w-full text-[15px] sm:text-base lg:text-lg leading-8 text-gray-500">

              {content.home?.heroDescription || ""}

            </p>


            {/* BUTTONS */}

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                onClick={() => navigate("/journey")}
                className="group bg-orange-600 hover:bg-orange-700 transition-all duration-300 px-7 py-4 rounded-full text-white font-semibold flex items-center justify-center gap-3"
              >

                Explore Journey

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />

              </button>


              <button
                onClick={() => navigate("/news")}
                className="rounded-full border border-gray-300 hover:border-orange-600 hover:text-orange-600 transition-all duration-300 px-7 py-4 font-semibold"
              >

                Development Works

              </button>

            </div>

          </div>


          {/* =========================
              RIGHT IMAGE
          ========================= */}

          <div className="relative order-2 flex justify-center md:justify-end mt-4 md:mt-0">

            <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full bg-orange-300/40 blur-[100px]"></div>

            <div className="absolute bottom-0 right-5 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] rounded-full bg-green-300/40 blur-[90px]"></div>

            <div className="absolute inset-8 sm:inset-6 lg:inset-5 rounded-[38px] border-[4px] border-white"></div>


            {content.home?.heroImage && (

              <img
                src={content.home.heroImage}
                alt={content.profile?.name || "Leader"}
                className="relative z-20 h-[360px] sm:h-[500px] lg:h-[640px] object-contain animate-float rounded-[32px]"
              />

            )}

          </div>

        </div>

      </div>

    </section>
  );
}