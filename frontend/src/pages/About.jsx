import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../config";
import { fetchContentWithCache, getCache } from "../services/cacheService";

import SectionTitle from "../components/common/SectionTitle";
import ProfileTabs from "../components/profile/ProfileTabs";
import BiographyTimeline from "../components/profile/BiographyTimeline";
import QuickFacts from "../components/profile/QucikFacts";
import VisionLeadership from "../components/profile/VisionLeadership";

const About = () => {
  const { i18n, t } = useTranslation();
  const [aboutData, setAboutData] = useState({
    aboutName: "",
    aboutPosition: "",
    aboutDescription: "",
  });

  const [loading, setLoading] = useState(true);
  const [usingCache, setUsingCache] = useState(false);

  // =========================
  // LOAD ABOUT CONTENT
  // =========================

  useEffect(() => {
    const loadAboutContent = async () => {
      try {
        setLoading(true);
        setUsingCache(false);

        const language = i18n.language?.startsWith("te") ? "te" : "en";
        const data = await fetchContentWithCache(language, API_BASE_URL);

        setAboutData({
          aboutName:
            data.about?.aboutName ||
            "Adluri Laxman Kumar",

          aboutPosition:
            data.about?.aboutPosition ||
            "Minister for SC, ST, Minority, Disabled, Senior Citizens Welfare & Transgender Empowerment",

          aboutDescription:
            data.about?.aboutDescription ||
            "",
        });
      } catch (error) {
        console.error(
          "Error loading About content:",
          error
        );

        // Try to get cached data
        const language = i18n.language?.startsWith("te") ? "te" : "en";
        const cacheKey = `content_${language}_/api/content`;
        const cachedData = getCache(cacheKey);

        if (cachedData) {
          console.log("Using cached About content");
          setAboutData({
            aboutName:
              cachedData.about?.aboutName ||
              "Adluri Laxman Kumar",

            aboutPosition:
              cachedData.about?.aboutPosition ||
              "Minister for SC, ST, Minority, Disabled, Senior Citizens Welfare & Transgender Empowerment",

            aboutDescription:
              cachedData.about?.aboutDescription ||
              "",
          });
          setUsingCache(true);
        }
      } finally {
        setLoading(false);
      }
    };

    loadAboutContent();
  }, [i18n.language]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-slate-500">
          Loading About page...
        </p>
      </div>
    );
  }

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

            {/* LEFT IMAGE */}

            <div className="flex justify-center">
              <div className="overflow-hidden rounded-3xl shadow-2xl max-w-md w-full">

                <img
                  src="/images/adluri-laxman-kumar.jpg.jpeg"
                  alt={aboutData.aboutName}
                  className="w-full h-full object-cover"
                />

              </div>
            </div>

            {/* RIGHT CONTENT */}

            <div>

              <span className="inline-block rounded-full bg-green-700 px-5 py-2 text-sm uppercase tracking-widest text-white">
                {t("about.label")}
              </span>

              {/* NAME */}

              <h2 className="mt-6 text-5xl font-bold text-gray-900">
                {t("about.name")}
              </h2>

              {/* POSITION */}

              <h3 className="mt-3 text-2xl font-medium text-gray-600">
                {t("about.designation")}
              </h3>

              <div className="my-8 h-1 w-24 bg-yellow-500"></div>

              {/* DESCRIPTION */}

              <div className="text-gray-600 leading-8 whitespace-pre-line">
                {t("about.paragraph1.part1")} {t("about.paragraph1.inc")} {t("about.paragraph1.part2")} {t("about.paragraph1.minister")} {t("about.paragraph1.part3")}
                <br /><br />
                {t("about.paragraph2.part1")} {t("about.paragraph2.constituency")} {t("about.paragraph2.part2")} {t("about.paragraph2.location")}. {t("about.paragraph2.part3")}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* OTHER ABOUT SECTIONS */}

      <QuickFacts />

      <ProfileTabs />

      <BiographyTimeline />

      <VisionLeadership />

    </>
  );
};

export default About;