import {
  CheckCircle2,
  Target,
  Handshake,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function VisionLeadership() {
  const { t } = useTranslation();
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

              {t("visionLeadership.label")}

            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">

              {t("visionLeadership.titleLine1")}
              <br />
              {t("visionLeadership.titleLine2")}

            </h2>

            <p className="mt-6 text-gray-600 leading-8">

              {t("visionLeadership.description1")}

            </p>

            <p className="mt-5 text-gray-600 leading-8">

              {t("visionLeadership.description2")}

            </p>

            <div className="mt-10 space-y-5">

              {values.map((item, index) => (

                <div
                  key={item}
                  className="flex items-start gap-4"
                >

                  <CheckCircle2
                    className="text-orange-600 mt-1"
                    size={22}
                  />

                  <span className="text-gray-700">

                    {t(`visionLeadership.values.${["governance", "justice", "infrastructure", "youth", "administration"][index]}`, item)}

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

                    {t("visionLeadership.cards.visionTitle")}

                  </h4>

                  <p className="mt-3 text-gray-600 leading-7">

                    {t("visionLeadership.cards.visionDesc")}

                  </p>

                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">

                  <Handshake
                    className="text-orange-600"
                    size={36}
                  />

                  <h4 className="mt-5 font-semibold text-xl">

                    {t("visionLeadership.cards.commitmentTitle")}

                  </h4>

                  <p className="mt-3 text-gray-600 leading-7">

                    {t("visionLeadership.cards.commitmentDesc")}

                  </p>

                </div>

                <div className="col-span-2 rounded-3xl bg-orange-600 p-8 text-white">

                  <Users size={42} />

                  <h4 className="mt-5 text-2xl font-bold">

                    {t("visionLeadership.cards.peopleFirstTitle")}

                  </h4>

                  <p className="mt-4 text-orange-100 leading-8">

                    {t("visionLeadership.cards.peopleFirstDesc")}

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