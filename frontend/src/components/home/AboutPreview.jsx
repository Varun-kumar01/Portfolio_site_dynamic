// import { ArrowRight } from "lucide-react";

// export default function AboutPreview() {
//   return (
//     <section className="py-20 lg:py-28 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         <div className="grid lg:grid-cols-2 gap-16 items-center">

//           {/* Image */}

//           <div className="relative">

//             <div className="absolute -top-6 -left-6 w-44 h-44 bg-orange-100 rounded-3xl hidden lg:block"></div>

//             <img
//               src="/about.png"
//               alt="About"
//               className="relative rounded-3xl shadow-xl w-full object-cover"
//             />

//           </div>

//           {/* Content */}

//           <div>

//             <span className="text-orange-600 font-semibold uppercase tracking-wider">
//               About
//             </span>

//             <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
//               Dedicated to the Progress of Every Citizen
//             </h2>

//             <p className="mt-6 text-gray-600 leading-8">
//               Public service is built on integrity, transparency, and
//               commitment. Through continuous interaction with citizens and
//               community-driven initiatives, our mission is to improve education,
//               healthcare, employment, infrastructure, and the quality of life
//               for every family.
//             </p>

//             <p className="mt-5 text-gray-600 leading-8">
//               Every development initiative reflects a long-term vision of
//               sustainable growth, accountability, and inclusive governance.
//             </p>

//             <div className="grid grid-cols-2 gap-6 mt-10">

//               <div className="border rounded-xl p-5">
//                 <h3 className="text-3xl font-bold text-orange-600">
//                   200+
//                 </h3>

//                 <p className="mt-2 text-gray-600">
//                   Public Projects
//                 </p>
//               </div>

//               <div className="border rounded-xl p-5">
//                 <h3 className="text-3xl font-bold text-orange-600">
//                   15+
//                 </h3>

//                 <p className="mt-2 text-gray-600">
//                   Years Experience
//                 </p>
//               </div>

//             </div>

//             <button className="mt-10 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition">

//               Learn More

//               <ArrowRight size={18} />

//             </button>

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }


import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


const features = [
  "Transparent Governance",
  "Infrastructure Development",
  "Quality Education",
  "Public Welfare",
];

export default function AboutPreview() {

  const navigate = useNavigate();
  
  return (
    <section className="relative pt-16 pb-16 lg:pt-20 lg:pb-20 bg-white overflow-hidden">

      {/* Background Glow */}

      <div className="absolute -left-32 top-20 w-72 h-72 bg-orange-100 rounded-full blur-[120px] opacity-50"></div>

      <div className="absolute right-0 bottom-0 w-72 h-72 bg-green-100 rounded-full blur-[120px] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">

          {/* LEFT IMAGE */}

          <div className="relative flex justify-center">

            {/* Orange Glow */}

            <div className="absolute w-[420px] h-[420px] rounded-full bg-orange-200 blur-[120px] opacity-50"></div>

            {/* Green Glow */}

            <div className="absolute bottom-0 right-0 w-[280px] h-[280px] rounded-full bg-green-200 blur-[120px] opacity-50"></div>

            <div className="relative">

              <div className="absolute inset-0 rounded-[36px] border-[5px] border-white z-20"></div>

              <img
                src="/about.png"
                alt="About"
                className="relative z-10 rounded-[36px] object-cover shadow-[0_20px_60px_rgba(0,0,0,.12)] hover:scale-[1.02] transition duration-500"
              />

            </div>

          </div>

          {/* RIGHT CONTENT */}

          <div>

            <span className="uppercase tracking-[0.25em] text-orange-600 font-semibold text-sm">

              About

            </span>

            <h2 className="mt-5 text-2xl lg:text-4xl font-black leading-tight text-slate-900">

              Dedicated to the
              <br />
              Progress of Every Citizen

            </h2>

            <p className="mt-8 text-lg leading-9 text-gray-600">

              Public service is built on integrity, transparency and
              commitment. Through continuous interaction with citizens,
              community participation and development-focused initiatives,
              every effort is directed towards building a stronger and
              more prosperous Telangana.

            </p>

            {/* Features */}

            <div className="grid sm:grid-cols-2 gap-5 mt-10">

              {features.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >

                  <CheckCircle2
                    size={20}
                    className="text-green-600"
                  />

                  <span className="font-medium text-gray-700">

                    {item}

                  </span>

                </div>

              ))}

            </div>

            {/* Stats */}

            <div className="grid grid-cols-2 gap-5 mt-12">

              <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:-translate-y-2 hover:shadow-xl transition duration-500">

                <h3 className="text-4xl font-black text-orange-600">

                  200+

                </h3>

                <p className="mt-2 text-gray-600">

                  Development Projects

                </p>

              </div>

              <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:-translate-y-2 hover:shadow-xl transition duration-500">

                <h3 className="text-4xl font-black text-orange-600">

                  25+

                </h3>

                <p className="mt-2 text-gray-600">

                  Years of Public Service

                </p>

              </div>

            </div>

            <button onClick={() => navigate("/about")} className="mt-12 inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-full font-semibold shadow-lg">

              Learn More

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}