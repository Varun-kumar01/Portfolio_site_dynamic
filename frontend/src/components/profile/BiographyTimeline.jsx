import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import { useTranslation } from "react-i18next";

const BIOGRAPHY_CACHE_KEY = "biography_timeline_latest";

const getCachedBiography = () => {
  try {
    const cached = localStorage.getItem(BIOGRAPHY_CACHE_KEY);

    if (!cached) {
      return "";
    }

    return cached;
  } catch (error) {
    console.error("Error reading biography cache:", error);
    return "";
  }
};

const BiographyTimeline = () => {
  const { i18n, t } = useTranslation();

  // Load cached biography immediately
  const [biographyContent, setBiographyContent] = useState(
    getCachedBiography()
  );

  const [loading, setLoading] = useState(
    !getCachedBiography()
  );

  useEffect(() => {
    let isMounted = true;

    const loadBiography = async () => {
      const language = i18n.language?.startsWith("te")
        ? "te"
        : "en";

      try {
        console.log(
          "Loading latest biography..."
        );

        const response = await fetch(
          `${API_BASE_URL}/api/content?lang=${language}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load biography: ${response.status}`
          );
        }

        const result = await response.json();

        console.log(
          "Biography API response:",
          result
        );

        // Support different API response structures
        const data =
          result?.content ||
          result?.data ||
          result;

        const biography =
          data?.biography?.biographyContent || "";

        if (!biography) {
          throw new Error(
            "Biography content was not returned by server"
          );
        }

        // Update page
        if (isMounted) {
          setBiographyContent(biography);
        }

        // ======================================================
        // SAVE LATEST SUCCESSFULLY LOADED BIOGRAPHY
        // ======================================================

        try {
          localStorage.setItem(
            BIOGRAPHY_CACHE_KEY,
            biography
          );

          console.log(
            "Biography saved to local cache."
          );
        } catch (storageError) {
          console.error(
            "Could not save biography to cache:",
            storageError
          );
        }

      } catch (error) {
        console.warn(
          "Backend unavailable for biography:",
          error.message
        );

        // ======================================================
        // USE PREVIOUSLY SAVED BIOGRAPHY
        // ======================================================

        const cachedBiography =
          getCachedBiography();

        if (
          cachedBiography &&
          isMounted
        ) {
          console.log(
            "Backend unavailable. Using cached biography."
          );

          setBiographyContent(
            cachedBiography
          );
        }

      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBiography();

    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  // ============================================================
  // LOADING
  // ============================================================

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

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          {t("biographyTimeline.label")}
        </h2>

        <div className="text-gray-600 leading-8 whitespace-pre-line">

          {biographyContent ? (
            [1, 2, 3, 4, 5].map(
              (paragraphNumber) => (
                <p
                  key={paragraphNumber}
                  className="mb-6 last:mb-0"
                >
                  {t(
                    `biographyTimeline.paragraph${paragraphNumber}`
                  )}
                </p>
              )
            )
          ) : (
            <p>
              {t("common.noContent")}
            </p>
          )}

        </div>

      </div>
    </section>
  );
};

export default BiographyTimeline;