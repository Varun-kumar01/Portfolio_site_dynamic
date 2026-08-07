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















import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[82vh] lg:min-h-[85vh] overflow-hidden bg-white">

      {/* Background Blur */}

      <div className="absolute -top-56 -left-52 w-[500px] h-[500px] rounded-full bg-orange-200 blur-[140px] opacity-40 animate-pulse"></div>

      <div className="absolute -bottom-48 -right-52 w-[500px] h-[500px] rounded-full bg-green-200 blur-[140px] opacity-40 animate-pulse"></div>

      {/* Grid */}

      <div className="relative max-w-7xl mx-auto min-h-[82vh] lg:min-h-[85vh] px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 items-center min-h-[82vh] lg:min-h-[85vh]">

          {/* LEFT */}

          <div className="z-20">

            <span className="inline-flex items-center px-5 py-2 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-sm font-semibold tracking-[0.25em] uppercase">

              Cabinet Minister • Telangana

            </span>

            <h1 className="mt-6 text-5xl md:text-6xl xl:text-7xl font-black leading-[0.95] text-gray-900">

              ADLURI

              <br />

              <span className="text-orange-600">

                LAXMAN

              </span>

              <br />

              KUMAR

            </h1>

            <p className="mt-5 text-2xl font-medium text-gray-700">

              Building a Better Telangana

            </p>

            <p className="mt-6 max-w-xl text-lg leading-9 text-gray-500">

              Committed to transparent governance,
              inclusive growth, stronger infrastructure,
              quality education and public welfare.

            </p>

            {/* Buttons */}

            <div className="mt-8 flex flex-wrap gap-5">

              <button className="group bg-orange-600 hover:bg-orange-700 transition px-8 py-4 rounded-full text-white font-semibold flex items-center gap-3">

                Explore Journey

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />

              </button>

              <button className="rounded-full border border-gray-300 hover:border-orange-600 hover:text-orange-600 transition px-8 py-4 font-semibold">

                Development Works

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center lg:justify-end">

            {/* Orange Glow */}

            <div className="absolute w-[430px] h-[430px] rounded-full bg-orange-300 blur-[120px] opacity-50"></div>

            {/* Congress */}

            <img
              src="/congress.png"
              alt=""
              className="absolute top-16 w-72 opacity-10"
            />

            {/* Leader */}

            <img
              src="/leader.png"
              alt="Leader"
              className="relative z-20 h-[560px] md:h-[620px] lg:h-[640px] object-contain animate-float rounded-full"
            />

            {/* Glass Card */}

            <div className="hidden lg:block absolute top-32 left-0 backdrop-blur-xl bg-white/70 border border-white rounded-3xl px-8 py-6 shadow-2xl">

              <h3 className="text-4xl font-black text-orange-600">

                2023

              </h3>

              <p className="text-gray-700">

                Elected MLA

              </p>

            </div>

            <div className="hidden lg:block absolute bottom-28 right-0 backdrop-blur-xl bg-white/70 border border-white rounded-3xl px-8 py-6 shadow-2xl">

              <h3 className="text-4xl font-black text-green-700">

                25+

              </h3>

              <p className="text-gray-700">

                Years of Public Service

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Scroll */}

      {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">

        <span className="text-xs uppercase tracking-[0.35em] text-gray-500">

          Scroll

        </span>

        <ChevronDown
          size={24}
          className="mt-2 text-orange-600"
        />

      </div> */}

    </section>
  );
}