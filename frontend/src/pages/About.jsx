import { useTranslation } from "react-i18next";

import SectionTitle from "../components/common/SectionTitle";
import ProfileTabs from "../components/profile/ProfileTabs";
import BiographyTimeline from "../components/profile/BiographyTimeline";
import QuickFacts from "../components/profile/QucikFacts";
import VisionLeadership from "../components/profile/VisionLeadership";

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionTitle
            title={t("about.pageTitle")}
            subtitle={t("about.pageSubtitle")}
          />

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Image */}
            <div className="flex justify-center">
              <div className="overflow-hidden rounded-3xl shadow-2xl max-w-md w-full">
                <img
                  src="/images/adluri-laxman-kumar.jpg.jpeg"
                  alt="Adluri Laxman Kumar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Content */}
            <div>

              <span className="inline-block rounded-full bg-green-700 px-5 py-2 text-sm uppercase tracking-widest text-white">
                {t("about.label")}
              </span>

              <h2 className="mt-6 text-5xl font-bold text-gray-900">
                {t("about.name")}
              </h2>

              <h3 className="mt-3 text-2xl font-medium text-gray-600">
                {t("about.designation")}
              </h3>

              <div className="my-8 h-1 w-24 bg-yellow-500"></div>

              <p className="text-gray-600 leading-8">
                <strong>{t("about.name")}</strong>{" "}
                {t("about.paragraph1.part1")}{" "}
                <strong>{t("about.paragraph1.inc")}</strong>{" "}
                {t("about.paragraph1.part2")}{" "}
                <strong>{t("about.paragraph1.minister")}</strong>{" "}
                {t("about.paragraph1.part3")}
              </p>

              <p className="mt-6 text-gray-600 leading-8">
                {t("about.paragraph2.part1")}{" "}
                <strong>{t("about.paragraph2.constituency")}</strong>{" "}
                {t("about.paragraph2.part2")}{" "}
                <strong>{t("about.paragraph2.location")}</strong>.{" "}
                {t("about.paragraph2.part3")}
              </p>

            </div>

          </div>

        </div>
      </section>

      <QuickFacts />

      <ProfileTabs />

      <BiographyTimeline />

      <VisionLeadership />

      {/* <LeadershipValues /> */}
    </>
  );
};

export default About;
