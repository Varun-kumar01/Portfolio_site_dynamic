import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../config";
import { fetchContentWithCache, getCache } from "../services/cacheService";

import BiographyHero from "../components/biography/BiographyHero";
import ProfileSection from "../components/biography/ProfileSection";
import Education from "../components/biography/Education";
import PoliticalTimeline from "../components/biography/PoliticalTimeline";
import LeadershipRoles from "../components/biography/LeadershipRoles";
import Awards from "../components/biography/Awards";
import GalleryStrip from "../components/biography/GalleryStrip";

export default function Biography() {
  const { i18n, t } = useTranslation();
  const [biographyContent, setBiographyContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [usingCache, setUsingCache] = useState(false);

  // ==========================================
  // LOAD BIOGRAPHY FROM BACKEND
  // ==========================================

  useEffect(() => {
    const loadBiography = async () => {
      try {
        setLoading(true);
        setUsingCache(false);

        const language = i18n.language?.startsWith("te") ? "te" : "en";
        const data = await fetchContentWithCache(language, API_BASE_URL);

        console.log("Biography data:", data);

        setBiographyContent(
          data.biography?.biographyContent || ""
        );
      } catch (error) {
        console.error(
          "Error loading biography:",
          error
        );

        // Try to get cached data
        const language = i18n.language?.startsWith("te") ? "te" : "en";
        const cacheKey = `content_${language}_/api/content`;
        const cachedData = getCache(cacheKey);

        if (cachedData) {
          console.log("Using cached biography data");
          setBiographyContent(
            cachedData.biography?.biographyContent || ""
          );
          setUsingCache(true);
        }
      } finally {
        setLoading(false);
      }
    };

    loadBiography();
  }, [i18n.language]);

  return (
    <>
      {/* ==========================================
          BIOGRAPHY HERO
      ========================================== */}

      <BiographyHero />

      {/* ==========================================
          DATABASE BIOGRAPHY CONTENT
      ========================================== */}

      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-sm">

            <span className="inline-block bg-green-700 text-white px-5 py-2 rounded-full text-sm uppercase tracking-widest">
              {t("biographyTimeline.label")}
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-8">
              {t("biographyTimeline.title")}
            </h2>

            {loading ? (
              <p className="text-gray-500">
                {t("common.loading")}
              </p>
            ) : (
              <div className="text-gray-700 text-lg leading-8 whitespace-pre-line">
                {biographyContent ? (
                  [1, 2, 3, 4, 5].map((paragraphNumber) => (
                    <p key={paragraphNumber} className="mb-6 last:mb-0">
                      {t(`biographyTimeline.paragraph${paragraphNumber}`)}
                    </p>
                  ))
                ) : (
                  t("common.noContent")
                )}
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ==========================================
          EXISTING BIOGRAPHY SECTIONS
      ========================================== */}

      <ProfileSection />

      <Education />

      <PoliticalTimeline />

      <LeadershipRoles />

      <Awards />

      <GalleryStrip />
    </>
  );
}