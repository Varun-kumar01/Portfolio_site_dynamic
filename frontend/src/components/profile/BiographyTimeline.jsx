import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import { useTranslation } from "react-i18next";

const BiographyTimeline = () => {
  const { i18n, t } = useTranslation();
  const [biographyContent, setBiographyContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBiography = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/content?lang=${
            i18n.language?.startsWith("te") ? "te" : "en"
          }`
        );

        if (!response.ok) {
          throw new Error("Failed to load biography");
        }

        const data = await response.json();

        setBiographyContent(
          data.biography?.biographyContent || ""
        );
      } catch (error) {
        console.error(
          "Error loading biography:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadBiography();
  }, [i18n.language]);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500">
            {t("common.loading")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          {t("biographyTimeline.label")}
        </h2>

        <div className="text-gray-600 leading-8 whitespace-pre-line">

          {biographyContent ? (
            [1, 2, 3, 4, 5].map((paragraphNumber) => (
              <p key={paragraphNumber} className="mb-6 last:mb-0">
                {t(`biographyTimeline.paragraph${paragraphNumber}`)}
              </p>
            ))
          ) : (
            <p>{t("common.noContent")}</p>
          )}

        </div>

      </div>
    </section>
  );
};

export default BiographyTimeline;
