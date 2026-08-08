// import { ArrowRight, Play } from "lucide-react";

// export default function Hero() {
//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-white">
//       {/* Background Shapes */}
//       <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-100 blur-3xl opacity-60"></div>
//       <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-50 blur-3xl opacity-70"></div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

//         <div className="grid lg:grid-cols-2 gap-14 items-center">

//           {/* LEFT */}
//           <div>

//             <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
//               Dedicated to Public Service
//             </span>

//             <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
//               Building a Better
//               <br />
//               Future Together
//             </h1>

//             <p className="mt-6 text-gray-600 text-lg leading-8 max-w-xl">
//               Committed to transparent governance, sustainable development,
//               quality education, healthcare, youth empowerment, and creating
//               better opportunities for every citizen.
//             </p>

//             <div className="mt-10 flex flex-wrap gap-4">

//               <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition">
//                 Explore Journey
//                 <ArrowRight size={18} />
//               </button>

//               <button className="border border-gray-300 hover:border-orange-600 hover:text-orange-600 px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition">
//                 <Play size={18} />
//                 Watch Video
//               </button>

//             </div>

//             {/* Stats */}

//             <div className="grid grid-cols-3 gap-6 mt-14">

//               <div>
//                 <h2 className="text-3xl font-bold text-orange-600">
//                   15+
//                 </h2>

//                 <p className="text-gray-600 mt-2 text-sm">
//                   Years of Service
//                 </p>
//               </div>

//               <div>
//                 <h2 className="text-3xl font-bold text-orange-600">
//                   200+
//                 </h2>

//                 <p className="text-gray-600 mt-2 text-sm">
//                   Development Works
//                 </p>
//               </div>

//               <div>
//                 <h2 className="text-3xl font-bold text-orange-600">
//                   5L+
//                 </h2>

//                 <p className="text-gray-600 mt-2 text-sm">
//                   Citizens Reached
//                 </p>
//               </div>

//             </div>

//           </div>

//           {/* RIGHT */}

//           <div className="relative flex justify-center">

//             {/* Orange Card */}

//             <div className="absolute top-10 right-5 w-52 h-52 bg-orange-100 rounded-3xl rotate-6 hidden lg:block"></div>

//             <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">

//               <img
//                 src="/leader.png"
//                 alt="Leader"
//                 className="w-full max-w-md object-cover"
//               />

//             </div>

//             {/* Floating Card */}

//             <div className="hidden lg:flex absolute bottom-10 -left-5 bg-white rounded-xl shadow-xl p-5 items-center gap-4">

//               <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">

//                 <svg
//                   className="w-7 h-7 text-orange-600"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     d="M12 5v14M5 12h14"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>

//               </div>

//               <div>

//                 <h4 className="font-semibold">
//                   People First
//                 </h4>

//                 <p className="text-sm text-gray-500">
//                   Service • Development • Trust
//                 </p>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }












import { ArrowRight } from "lucide-react";
import leader from "../../data/leader"
import { useNavigate } from "react-router-dom";

export default function Hero() {

  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white">

      {/* Background Blur */}

      <div className="absolute -top-40 -left-40 w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full bg-orange-200 blur-[120px] opacity-40 animate-pulse"></div>

      <div className="absolute -bottom-32 -right-40 w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full bg-green-200 blur-[120px] opacity-40 animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">

        <div className="grid md:grid-cols-[1.1fr_0.9fr] items-center min-h-[85vh] lg:min-h-[82vh] gap-12 lg:gap-8 py-8 lg:py-0">

          {/* LEFT */}

          <div className="order-1 w-full">

            <span className="inline-flex items-center px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase">

              <p>{leader.profile.designation2}</p> • Telangana

            </span>

            <div className="mt-7">

          {/* Family / surname */}
          <div
            className="
              text-sm
              sm:text-base
              lg:text-lg
              font-bold
              tracking-[0.45em]
              text-slate-500
              uppercase
            "
          >
            ADLURI
          </div>

          {/* Full name */}
          <h1
            className="
              mt-2
              text-4xl
              sm:text-5xl
              lg:text-6xl
              xl:text-7xl
              font-semibold
              leading-[1.05]
              tracking-tight
              text-slate-800
              whitespace-nowrap
            "
          >
            LAXMAN KUMAR
          </h1>

        </div>

            <h2 className="mt-4 text-[1.8rem] lg:text-[2.4rem] font-semibold text-gray-800 leading-tight">

              Building a Better Telangana

            </h2>

            <p className="mt-5 w-full text-[15px] sm:text-base lg:text-lg leading-8 text-gray-500">

              Committed to transparent governance, inclusive growth,
              stronger infrastructure, quality education and public
              welfare.

            </p>

            {/* Buttons */}

            <div className="mt-8 flex flex-wrap gap-4">

              <button onClick={() => navigate("/journey")} className="group bg-orange-600 hover:bg-orange-700 transition-all duration-300 px-7 py-4 rounded-full text-white font-semibold flex items-center justify-center gap-3">

                Explore Journey

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />

              </button>

              <button className="rounded-full border border-gray-300 hover:border-orange-600 hover:text-orange-600 transition-all duration-300 px-7 py-4 font-semibold">

                Development Works

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative order-2 flex justify-center md:justify-end mt-4 md:mt-0">

            {/* Orange Glow */}

            <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full bg-orange-300/40 blur-[100px]"></div>

            {/* Green Glow */}

            <div className="absolute bottom-0 right-5 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] rounded-full bg-green-300/40 blur-[90px]"></div>

            {/* Frame */}

            <div className="absolute inset-8 sm:inset-6 lg:inset-5 rounded-[38px] border-[4px] border-white"></div>

            {/* Leader */}

            <img
              src="/leader.png"
              alt="Leader"
              className="relative z-20 h-[360px] sm:h-[500px] lg:h-[640px] object-contain animate-float rounded-[32px]"
            />

          </div>

        </div>

      </div>

    </section>
  );
}