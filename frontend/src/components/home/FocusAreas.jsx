import {
  Building2,
  GraduationCap,
  HeartHandshake,
  Landmark,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const focusAreas = [
  {
    icon: Building2,
    title: "Infrastructure Development",
    description:
      "Improving roads, public facilities, drinking water systems and strengthening civic infrastructure for sustainable growth.",
  },
  {
    icon: GraduationCap,
    title: "Education & Youth",
    description:
      "Promoting quality education, skill development, scholarships and opportunities that empower students and young leaders.",
  },
  {
    icon: HeartHandshake,
    title: "SC & Tribal Welfare",
    description:
      "Committed to the welfare, empowerment and inclusive development of Scheduled Castes and Tribal communities.",
  },
  {
    icon: Landmark,
    title: "Citizen-Centric Governance",
    description:
      "Delivering transparent, accessible and accountable governance while addressing the needs of every citizen.",
  },
];

export default function FocusAreas() {
  const { t } = useTranslation();
  const areaKeys = ["infrastructure", "education", "welfare", "governance"];
  return (
    <section className="relative py-16 lg:py-20 bg-[#fafafa] overflow-hidden">

      {/* Background Glow */}

      <div className="absolute -left-32 top-20 w-72 h-72 rounded-full bg-orange-100 blur-[120px] opacity-50"></div>

      <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-green-100 blur-[120px] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">

          <span className="uppercase tracking-[0.3em] text-orange-600 font-semibold text-sm">

            {t("home.focusAreas.label")}

          </span>

          <h2 className="mt-5 text-2xl lg:text-4xl font-black text-slate-900 leading-tight">

            {t("home.focusAreas.title")}

          </h2>

          <p className="mt-8 text-lg leading-9 text-gray-600">

            {t("home.focusAreas.description")}

          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-10">

          {focusAreas.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  relative
                  bg-white/80
                  backdrop-blur-xl
                  border
                  border-orange-100
                  rounded-[30px]
                  p-8
                  shadow-sm
                  hover:shadow-2xl
                  hover:-translate-y-3
                  transition-all
                  duration-500
                "
              >

                {/* Icon */}

                <div className="w-18 h-18">

                  <div
                    className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-orange-100
                      flex
                      items-center
                      justify-center
                      group-hover:bg-orange-600
                      transition-all
                      duration-500
                    "
                  >

                    <Icon
                      size={30}
                      className="text-orange-600 group-hover:text-white transition-all duration-500"
                    />

                  </div>

                </div>

                {/* Divider */}

                <div className="mt-6 w-12 h-1 rounded-full bg-orange-500"></div>

                {/* Title */}

                <h3 className="mt-6 text-2xl font-bold text-slate-900 leading-snug">

                  {t(`home.focusAreas.areas.${areaKeys[index]}.title`)}

                </h3>

                {/* Description */}

                <p className="mt-5 text-gray-600 leading-8">

                  {t(`home.focusAreas.areas.${areaKeys[index]}.description`)}

                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}