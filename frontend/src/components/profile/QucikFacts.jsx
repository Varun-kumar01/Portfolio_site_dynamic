import {
  BriefcaseBusiness,
  Landmark,
  MapPinned,
  Clock3,
} from "lucide-react";

import leader from "../../data/leader";
import { useTranslation } from "react-i18next";

const facts = [
  {
    icon: BriefcaseBusiness,
    value: leader.profile.designation2,
    label: "Current Position",
  },
  {
    icon: Landmark,
    value: leader.profile.party,
    label: "Political Party",
  },
  {
    icon: MapPinned,
    value: leader.profile.constituency,
    label: "Assembly Constituency",
  },
  {
    icon: Clock3,
    value: leader.profile.experience,
    label: "Public Service",
  },
];

export default function QuickFacts() {
  const { t } = useTranslation();
  const labels = [
    "Current Position",
    "Political Party",
    "Assembly Constituency",
    "Public Service",
  ];
  const valueKeys = [
    "position",
    "party",
    "constituency",
    "experience",
  ];
  return (
    <section className="py-16 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-orange-600 uppercase tracking-[0.3em] font-semibold text-sm">
            {t("profile.quickProfile", "Quick Profile")}
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
            {t("profile.atAGlance", "At a Glance")}
          </h2>

          <p className="mt-4 text-gray-600 leading-8">
            {t("profile.overview", "A quick overview of the public profile, leadership role and constituency represented.")}
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

                  {t(`quickFacts.values.${valueKeys[index]}`, item.value)}

                </h3>

                <p className="mt-2 text-gray-500">

                  {t(`profile.fact${index + 1}`, labels[index])}

                </p>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}