import {
  CheckCircle2,
  Target,
  Handshake,
  Users,
} from "lucide-react";

export default function VisionLeadership() {
  const values = [
    "Transparent & Accountable Governance",
    "Inclusive Social Justice",
    "Infrastructure & Rural Development",
    "Youth Empowerment & Employment",
    "Citizen-Centric Administration",
  ];

  return (
    <section className="py-16 lg:py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <span className="uppercase tracking-[0.3em] text-orange-600 font-semibold text-sm">

              Vision & Leadership

            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">

              Committed to Building
              <br />
              a Better Telangana

            </h2>

            <p className="mt-6 text-gray-600 leading-8">

              Leadership is not merely about holding office.
              It is about listening to people, understanding
              their challenges, and delivering meaningful,
              long-term solutions that improve lives.

            </p>

            <p className="mt-5 text-gray-600 leading-8">

              Every initiative is guided by transparency,
              inclusive development, social justice and
              accountable governance for every citizen.

            </p>

            <div className="mt-10 space-y-5">

              {values.map((item) => (

                <div
                  key={item}
                  className="flex items-start gap-4"
                >

                  <CheckCircle2
                    className="text-orange-600 mt-1"
                    size={22}
                  />

                  <span className="text-gray-700">

                    {item}

                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            {/* Background */}

            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-orange-50 via-white to-green-50"></div>

            <div className="relative rounded-[40px] border border-orange-100 p-10 shadow-xl">

              <div className="grid grid-cols-2 gap-6">

                <div className="rounded-3xl bg-white p-6 shadow-sm">

                  <Target
                    className="text-orange-600"
                    size={36}
                  />

                  <h4 className="mt-5 font-semibold text-xl">

                    Vision

                  </h4>

                  <p className="mt-3 text-gray-600 leading-7">

                    Sustainable development through
                    inclusive governance.

                  </p>

                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">

                  <Handshake
                    className="text-orange-600"
                    size={36}
                  />

                  <h4 className="mt-5 font-semibold text-xl">

                    Commitment

                  </h4>

                  <p className="mt-3 text-gray-600 leading-7">

                    Transparent public service
                    with accountability.

                  </p>

                </div>

                <div className="col-span-2 rounded-3xl bg-orange-600 p-8 text-white">

                  <Users size={42} />

                  <h4 className="mt-5 text-2xl font-bold">

                    People First

                  </h4>

                  <p className="mt-4 text-orange-100 leading-8">

                    Every decision is driven by the
                    welfare of citizens, equal opportunity,
                    stronger communities and a vision
                    for a progressive Telangana.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}