import {
  BriefcaseBusiness,
  Landmark,
  MapPinned,
  Clock3,
} from "lucide-react";

import { useTranslation } from "react-i18next";

export default function QuickFacts() {
  const { t } = useTranslation();

  const facts = [
    {
      icon: BriefcaseBusiness,
      value: t("quickFacts.values.position"),
      label: t("quickFacts.facts.position"),
    },
    {
      icon: Landmark,
      value: t("quickFacts.values.party"),
      label: t("quickFacts.facts.party"),
    },
    {
      icon: MapPinned,
      value: t("quickFacts.values.constituency"),
      label: t("quickFacts.facts.constituency"),
    },
    {
      icon: Clock3,
      value: t("quickFacts.values.experience"),
      label: t("quickFacts.facts.experience"),
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-orange-600 uppercase tracking-[0.3em] font-semibold text-sm">
            {t("quickFacts.label")}
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
            {t("quickFacts.title")}
          </h2>

          <p className="mt-4 text-gray-600 leading-8">
            {t("quickFacts.description")}
          </p>

        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">

          {facts.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="group rounded-3xl bg-white border border-slate-200 p-8 hover:border-orange-200 hover:shadow-xl transition-all duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-600 transition">

                  <Icon
                    size={30}
                    className="text-orange-600 group-hover:text-white transition"
                  />

                </div>

                <h3 className="mt-8 text-xl font-semibold text-slate-900">

                  {item.value}

                </h3>

                <p className="mt-2 text-gray-500">

                  {item.label}

                </p>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}