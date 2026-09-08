// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { API_BASE_URL } from "../config";
// import { fetchContentWithCache, getCache } from "../services/cacheService";

// import SectionTitle from "../components/common/SectionTitle";
// import ProfileTabs from "../components/profile/ProfileTabs";
// import BiographyTimeline from "../components/profile/BiographyTimeline";
// import QuickFacts from "../components/profile/QucikFacts";
// import VisionLeadership from "../components/profile/VisionLeadership";

// const About = () => {
//   const { i18n, t } = useTranslation();
//   const [aboutData, setAboutData] = useState({
//     aboutName: "",
//     aboutPosition: "",
//     aboutDescription: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [usingCache, setUsingCache] = useState(false);

//   // =========================
//   // LOAD ABOUT CONTENT
//   // =========================

//   useEffect(() => {
//     const loadAboutContent = async () => {
//       try {
//         setLoading(true);
//         setUsingCache(false);

//         const language = i18n.language?.startsWith("te") ? "te" : "en";
//         const data = await fetchContentWithCache(language, API_BASE_URL);

//         setAboutData({
//           aboutName:
//             data.about?.aboutName ||
//             "Adluri Laxman Kumar",

//           aboutPosition:
//             data.about?.aboutPosition ||
//             "Minister for SC, ST, Minority, Disabled, Senior Citizens Welfare & Transgender Empowerment",

//           aboutDescription:
//             data.about?.aboutDescription ||
//             "",
//         });
//       } catch (error) {
//         console.error(
//           "Error loading About content:",
//           error
//         );

//         // Try to get cached data
//         const language = i18n.language?.startsWith("te") ? "te" : "en";
//         const cacheKey = `content_${language}_/api/content`;
//         const cachedData = getCache(cacheKey);

//         if (cachedData) {
//           console.log("Using cached About content");
//           setAboutData({
//             aboutName:
//               cachedData.about?.aboutName ||
//               "Adluri Laxman Kumar",

//             aboutPosition:
//               cachedData.about?.aboutPosition ||
//               "Minister for SC, ST, Minority, Disabled, Senior Citizens Welfare & Transgender Empowerment",

//             aboutDescription:
//               cachedData.about?.aboutDescription ||
//               "",
//           });
//           setUsingCache(true);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadAboutContent();
//   }, [i18n.language]);

//   // =========================
//   // LOADING
//   // =========================

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <p className="text-slate-500">
//           Loading About page...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* =========================
//           HERO SECTION
//       ========================= */}

//       <section className="bg-white py-8">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//           <SectionTitle
//             title={t("about.pageTitle")}
//             subtitle={t("about.pageSubtitle")}
//           />

//           <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

//             {/* LEFT IMAGE */}

//             <div className="flex justify-center">
//               <div className="overflow-hidden rounded-3xl shadow-2xl max-w-md w-full">

//                 <img
//                   src="/images/adluri-laxman-kumar.jpg.jpeg"
//                   alt={aboutData.aboutName}
//                   className="w-full h-full object-cover"
//                 />

//               </div>
//             </div>

//             {/* RIGHT CONTENT */}

//             <div>

//               <span className="inline-block rounded-full bg-green-700 px-5 py-2 text-sm uppercase tracking-widest text-white">
//                 {t("about.label")}
//               </span>

//               {/* NAME */}

//               <h2 className="mt-6 text-5xl font-bold text-gray-900">
//                 {t("about.name")}
//               </h2>

//               {/* POSITION */}

//               <h3 className="mt-3 text-2xl font-medium text-gray-600">
//                 {t("about.designation")}
//               </h3>

//               <div className="my-8 h-1 w-24 bg-yellow-500"></div>

//               {/* DESCRIPTION */}

//               <div className="text-gray-600 leading-8 whitespace-pre-line">
//                 {t("about.paragraph1.part1")} {t("about.paragraph1.inc")} {t("about.paragraph1.part2")} {t("about.paragraph1.minister")} {t("about.paragraph1.part3")}
//                 <br /><br />
//                 {t("about.paragraph2.part1")} {t("about.paragraph2.constituency")} {t("about.paragraph2.part2")} {t("about.paragraph2.location")}. {t("about.paragraph2.part3")}
//               </div>

//             </div>

//           </div>

//         </div>
//       </section>

//       {/* OTHER ABOUT SECTIONS */}

//       <QuickFacts />

//       <ProfileTabs />

//       <BiographyTimeline />

//       <VisionLeadership />

//     </>
//   );
// };

// export default About;
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../config";

import SectionTitle from "../components/common/SectionTitle";
import ProfileTabs from "../components/profile/ProfileTabs";
import BiographyTimeline from "../components/profile/BiographyTimeline";
import QuickFacts from "../components/profile/QucikFacts";
import VisionLeadership from "../components/profile/VisionLeadership";

// ============================================================
// LOCAL STORAGE CACHE KEY
// ============================================================

const ABOUT_CACHE_KEY = "about_page_latest";

// ============================================================
// CONVERT IMAGE URL TO DATA URL
// ============================================================

const imageUrlToDataUrl = async (imageUrl) => {
  try {
    if (!imageUrl) {
      return "";
    }

    // Already cached as a data URL
    if (imageUrl.startsWith("data:image/")) {
      return imageUrl;
    }

    console.log(
      "Downloading About image for offline cache:",
      imageUrl
    );

    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(
        `Image request failed: ${response.status}`
      );
    }

    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(
          new Error("Failed to convert image to data URL")
        );
      };

      reader.readAsDataURL(blob);
    });

  } catch (error) {
    console.error(
      "Could not cache About image:",
      error
    );

    return "";
  }
};

// ============================================================
// GET CACHED ABOUT DATA
// ============================================================

const getCachedAboutData = () => {
  try {
    const cachedData =
      localStorage.getItem(ABOUT_CACHE_KEY);

    if (!cachedData) {
      return null;
    }

    const parsedCache =
      JSON.parse(cachedData);

    if (parsedCache?.about) {
      return parsedCache.about;
    }

    return null;

  } catch (error) {
    console.error(
      "Error reading About cache:",
      error
    );

    return null;
  }
};

// ============================================================
// ABOUT COMPONENT
// ============================================================

const About = () => {
  const { t } = useTranslation();

  // ==========================================================
  // INITIAL DATA FROM CACHE
  // ==========================================================

  const initialCachedData =
    getCachedAboutData();

  // ==========================================================
  // ABOUT STATE
  // ==========================================================

  const [aboutData, setAboutData] =
    useState(
      initialCachedData || {
        aboutName: "",
        aboutPosition: "",
        aboutDescription: "",
        aboutImage: "",
        updatedAt: "",
      }
    );

  const [loading, setLoading] =
    useState(!initialCachedData);

  const [usingCache, setUsingCache] =
    useState(!!initialCachedData);

  // ==========================================================
  // LOAD ABOUT DATA
  // ==========================================================

  useEffect(() => {
    let isMounted = true;

    const loadAboutContent = async () => {
      try {
        console.log(
          "Fetching latest About data..."
        );

        // ====================================================
        // GET LATEST DATABASE DATA
        // ====================================================

        const response = await fetch(
          `${API_BASE_URL}/api/about`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData =
            await response
              .json()
              .catch(() => ({}));

          throw new Error(
            errorData.message ||
              "Failed to fetch About content"
          );
        }

        const data =
          await response.json();

        console.log(
          "Latest About data:",
          data
        );

        if (!data?.about) {
          throw new Error(
            "About data was not returned by server"
          );
        }

        // ====================================================
        // GET IMAGE URL
        // ====================================================

        const imageUrl =
          data.about.aboutImage || "";

        // ====================================================
        // DOWNLOAD IMAGE AND CONVERT TO DATA URL
        // ====================================================

        let cachedImage = "";

        if (imageUrl) {
          cachedImage =
            await imageUrlToDataUrl(
              imageUrl
            );
        }

        // ====================================================
        // CREATE LATEST ABOUT DATA
        // ====================================================

        const latestAboutData = {
          aboutName:
            data.about.aboutName || "",

          aboutPosition:
            data.about.aboutPosition || "",

          aboutDescription:
            data.about.aboutDescription || "",

          /*
           * IMPORTANT:
           *
           * If image was successfully converted,
           * store the actual image data.
           *
           * Otherwise keep the original URL.
           */

          aboutImage:
            cachedImage ||
            imageUrl ||
            "",

          updatedAt:
            data.about.updatedAt ||
            new Date().toISOString(),
        };

        // ====================================================
        // UPDATE PAGE
        // ====================================================

        if (isMounted) {
          setAboutData(
            latestAboutData
          );

          setUsingCache(false);
        }

        // ====================================================
        // SAVE EVERYTHING TO LOCAL STORAGE
        // ====================================================

        try {
          localStorage.setItem(
            ABOUT_CACHE_KEY,
            JSON.stringify({
              success: true,

              about:
                latestAboutData,

              updatedAt:
                latestAboutData.updatedAt,
            })
          );

          console.log(
            "About data + image saved to localStorage"
          );

        } catch (storageError) {
          // ==================================================
          // LOCAL STORAGE SIZE LIMIT
          // ==================================================

          console.error(
            "Could not save About data to localStorage:",
            storageError
          );

          /*
           * If the image is too large for localStorage,
           * save text data without the image.
           */

          try {
            localStorage.setItem(
              ABOUT_CACHE_KEY,
              JSON.stringify({
                success: true,

                about: {
                  ...latestAboutData,

                  aboutImage:
                    imageUrl || "",
                },

                updatedAt:
                  latestAboutData.updatedAt,
              })
            );

            console.warn(
              "Saved About text, but image could not be cached because of storage size."
            );

          } catch (secondError) {
            console.error(
              "Could not save About cache:",
              secondError
            );
          }
        }

      } catch (error) {

        // ====================================================
        // BACKEND NOT AVAILABLE
        // ====================================================

        console.warn(
          "Backend unavailable:",
          error.message
        );

        const cachedData =
          getCachedAboutData();

        // ====================================================
        // USE CACHED DATA
        // ====================================================

        if (
          cachedData &&
          isMounted
        ) {
          console.log(
            "Backend unavailable. Using cached About data."
          );

          setAboutData(
            cachedData
          );

          setUsingCache(true);
        }

      } finally {

        if (isMounted) {
          setLoading(false);
        }

      }
    };

    loadAboutContent();

    // ========================================================
    // CLEANUP
    // ========================================================

    return () => {
      isMounted = false;
    };

  }, []);

  // ============================================================
  // LOADING
  // ============================================================

  if (
    loading &&
    !aboutData.aboutName &&
    !aboutData.aboutDescription
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-green-200 border-t-green-700 rounded-full animate-spin mx-auto mb-4" />

          <p className="text-slate-500">
            Loading About page...
          </p>

        </div>

      </div>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <>
      {/* ======================================================
          CACHE STATUS
      ======================================================= */}

      {usingCache && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">

          <p className="text-center text-sm text-yellow-700">
            
          </p>

        </div>
      )}

      {/* ======================================================
          HERO SECTION
      ======================================================= */}

      <section className="bg-white py-8">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ==================================================
              PAGE TITLE
          ================================================== */}

          <SectionTitle
            title={t("about.pageTitle")}
            subtitle={t("about.pageSubtitle")}
          />

          {/* ==================================================
              MAIN ABOUT CONTENT
          ================================================== */}

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* =================================================
                LEFT IMAGE
            ================================================== */}

            <div className="flex justify-center">

              <div className="overflow-hidden rounded-3xl shadow-2xl max-w-md w-full aspect-[4/3] bg-slate-100">

                {aboutData.aboutImage ? (

                  <img
                    src={aboutData.aboutImage}
                    alt={
                      aboutData.aboutName ||
                      "About"
                    }
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(
                        "About image failed to load:",
                        aboutData.aboutImage
                      );

                      e.currentTarget.style.display =
                        "none";
                    }}
                  />

                ) : (

                  <div className="w-full h-full flex items-center justify-center">

                    <p className="text-slate-400">
                      No About image available
                    </p>

                  </div>

                )}

              </div>

            </div>

            {/* =================================================
                RIGHT CONTENT
            ================================================== */}

            <div>

              {/* =================================================
                  LABEL
              ================================================== */}

              <span className="inline-block rounded-full bg-green-700 px-5 py-2 text-sm uppercase tracking-widest text-white">
                {t("about.label")}
              </span>

              {/* =================================================
                  NAME
              ================================================== */}

              <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
                {aboutData.aboutName}
              </h2>

              {/* =================================================
                  POSITION
              ================================================== */}

              {aboutData.aboutPosition && (
                <h3 className="mt-3 text-xl md:text-2xl font-medium text-gray-600">
                  {aboutData.aboutPosition}
                </h3>
              )}

              {/* =================================================
                  YELLOW LINE
              ================================================== */}

              <div className="my-8 h-1 w-24 bg-yellow-500"></div>

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              {aboutData.aboutDescription && (
                <div className="text-gray-600 leading-8 whitespace-pre-line">
                  {aboutData.aboutDescription}
                </div>
              )}

              {/* =================================================
                  CACHE STATUS
              ================================================== */}

              {usingCache && (
                <div className="mt-6 text-sm text-slate-400">
                  Latest successfully loaded information is
                  being displayed.
                </div>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* ======================================================
          OTHER ABOUT SECTIONS
      ======================================================= */}

      <QuickFacts />

      <ProfileTabs />

      <BiographyTimeline />

      <VisionLeadership />
    </>
  );
};

export default About;