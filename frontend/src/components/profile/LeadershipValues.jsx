import {
  ShieldCheck,
  HeartHandshake,
  Users,
  Landmark,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Committed to honest leadership, transparency and accountability in every public decision.",
  },
  {
    icon: Users,
    title: "People First",
    description:
      "Listening to citizens, understanding their needs and delivering meaningful solutions.",
  },
  {
    icon: HeartHandshake,
    title: "Inclusive Growth",
    description:
      "Ensuring development reaches every section of society without discrimination.",
  },
  {
    icon: Landmark,
    title: "Responsible Governance",
    description:
      "Building stronger institutions and creating opportunities for sustainable progress.",
  },
];

export default function LeadershipValues() {
  return (
    <section className="py-16 lg:py-20 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto">

          <span className="uppercase tracking-[0.3em] text-orange-600 font-semibold text-sm">

            Core Values

          </span>

          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900">

            Leadership Built on Values

          </h2>

          <p className="mt-5 text-gray-600 leading-8">

            Public leadership is guided by principles that place
            people, transparency and long-term development at
            the centre of every decision.

          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-14">

          {values.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="group bg-white rounded-3xl border border-slate-200 p-8 hover:border-orange-200 hover:shadow-xl transition-all duration-300"
              >

                <div className="flex items-start gap-6">

                  <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-600 transition">

                    <Icon
                      size={30}
                      className="text-orange-600 group-hover:text-white transition"
                    />

                  </div>

                  <div>

                    <h3 className="text-2xl font-semibold text-slate-900">

                      {item.title}

                    </h3>

                    <p className="mt-3 text-gray-600 leading-8">

                      {item.description}

                    </p>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}