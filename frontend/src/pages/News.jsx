// import { useEffect, useMemo, useState } from "react";
// import { API_BASE_URL } from "../config";
// import { useTranslation } from "react-i18next";
// import { fetchWithCache, getCache, cacheImageAsBase64, getCachedImageBase64 } from "../services/cacheService";

// import {
//   CalendarDays,
//   Search,
//   ArrowRight,
// } from "lucide-react";

// const API_URL = `${API_BASE_URL}/api/news`;
// const NEWS_CACHE_KEY = "news_cache";

// /* =========================================================
//    FALLBACK CATEGORIES
// ========================================================= */

// const fallbackCategories = [
//   "All",
//   "Government",
//   "Public",
//   "Healthcare",
//   "Education",
//   "Agriculture",
// ];

// /* =========================================================
//    IMAGE URL HELPER
// ========================================================= */

// const getImageUrl = (imageUrl) => {
//   if (!imageUrl) return null;

//   const value = String(imageUrl).trim();

//   if (!value) return null;

//   // Already a complete URL
//   if (
//     value.startsWith("http://") ||
//     value.startsWith("https://")
//   ) {
//     return value;
//   }

//   // Remove leading /
//   const cleanPath = value.replace(/^\/+/, "");

//   // uploads/news/news1.jpeg
//   if (cleanPath.startsWith("uploads/")) {
//     return `${API_BASE_URL}/${cleanPath}`;
//   }

//   // news/news1.jpeg
//   if (cleanPath.startsWith("news/")) {
//     return `${API_BASE_URL}/uploads/${cleanPath}`;
//   }

//   // news1.jpeg
//   return `${API_BASE_URL}/uploads/news/${cleanPath}`;
// };

// /* =========================================================
//    NEWS PAGE
// ========================================================= */

// export default function News() {
//   const { i18n, t } = useTranslation();

//   /* =======================================================
//      CATEGORY TRANSLATION
//   ======================================================= */

//   const categoryKeys = {
//     All: "all",
//     Government: "government",
//     Public: "public",
//     Healthcare: "healthcare",
//     Education: "education",
//     Agriculture: "agriculture",
//   };

//   const translateCategory = (category) =>
//     categoryKeys[category]
//       ? t(`news.${categoryKeys[category]}`)
//       : i18n.language?.startsWith("te")
//         ? t("news.defaultCategory")
//         : category;

//   const isTelugu = i18n.language?.startsWith("te");

//   /* =======================================================
//      STATES
//   ======================================================= */

//   const [newsData, setNewsData] = useState([]);
//   const [category, setCategory] = useState("All");
//   const [search, setSearch] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [usingCache, setUsingCache] = useState(false);

//   /* =======================================================
//      LOAD NEWS
//   ======================================================= */

//   const loadNews = async () => {
//     try {
//       setLoading(true);
//       setUsingCache(false);

//       const language = isTelugu ? "te" : "en";
//       const cacheKey = `${NEWS_CACHE_KEY}_${language}`;

//       const response = await fetch(
//         `${API_URL}?lang=${language}&t=${Date.now()}`
//       );

//       if (!response.ok) {
//         throw new Error(
//           `Server returned ${response.status}`
//         );
//       }

//       const result = await response.json();

//       if (!result.success) {
//         throw new Error(
//           result.message || "Unable to load news"
//         );
//       }

//       const data = Array.isArray(result.data)
//         ? result.data
//         : [];

//       console.log("=================================");
//       console.log("NEWS DATA FROM DATABASE");
//       console.log("=================================");

//       data.forEach((item) => {
//         console.log("Title:", item.title);
//         console.log(
//           "Database image:",
//           item.image_url
//         );
//         console.log(
//           "Final image URL:",
//           getImageUrl(item.image_url)
//         );
//       });

//       setNewsData(data);
      
//       // Cache the data and embed base64 images
//       if (data.length > 0) {
//         // Proactively fetch all images and embed base64 directly in data
//         console.log("Starting to cache news images...");
        
//         Promise.all(
//           data.map(async (item, index) => {
//             const imageUrl = getImageUrl(item.image_url);
//             if (!imageUrl) {
//               return item;
//             }

//             try {
//               const response = await fetch(imageUrl, {
//                 method: "GET",
//                 cache: "no-store",
//               });

//               if (!response.ok) {
//                 console.warn(`Failed to fetch image for news ${item.id || index}`);
//                 return item;
//               }

//               const blob = await response.blob();
//               return new Promise((resolve) => {
//                 const reader = new FileReader();
//                 reader.onloadend = () => {
//                   // Embed base64 directly in the item
//                   resolve({
//                     ...item,
//                     _cachedImageBase64: reader.result,
//                   });
//                 };
//                 reader.readAsDataURL(blob);
//               });
//             } catch (err) {
//               console.warn(`Failed to cache image for news ${item.id || index}:`, err);
//               return item;
//             }
//           })
//         )
//           .then((dataWithImages) => {
//             try {
//               localStorage.setItem(cacheKey, JSON.stringify(dataWithImages));
//               console.log("Cached all news with embedded images");
//             } catch (e) {
//               console.warn("Failed to cache news with images:", e);
//             }
//           })
//           .catch((err) => {
//             console.warn("Error caching news images:", err);
//           });
//       }
//     } catch (err) {
//       console.error(
//         "LOAD PUBLIC NEWS ERROR:",
//         err
//       );

//       // Try to get cached data
//       const language = isTelugu ? "te" : "en";
//       const cacheKey = `${NEWS_CACHE_KEY}_${language}`;
//       const cachedData = getCache(cacheKey, []);

//       if (cachedData.length > 0) {
//         console.log("Using cached news data");
//         setNewsData(cachedData);
//         setUsingCache(true);
//         setError(""); // Clear error when using cache
//       } else {
//         setError(
//           err.message ||
//             "Unable to load news."
//         );
//         setNewsData([]);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      LOAD ON PAGE OPEN / LANGUAGE CHANGE
//   ======================================================= */

//   useEffect(() => {
//     loadNews();
//   }, [i18n.language]);

//   /* =======================================================
//      FORMAT DATE
//   ======================================================= */

//   const formatDate = (date) => {
//     if (!date) return "";

//     const parsedDate = new Date(date);

//     if (Number.isNaN(parsedDate.getTime())) {
//       return String(date).substring(0, 10);
//     }

//     return parsedDate.toLocaleDateString(
//       isTelugu ? "te-IN" : "en-IN",
//       {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       }
//     );
//   };

//   /* =======================================================
//      CATEGORIES
//   ======================================================= */

//   const categories = useMemo(() => {
//     const databaseCategories = newsData
//       .map((item) => item.category)
//       .filter(Boolean);

//     const uniqueCategories = [
//       ...new Set(databaseCategories),
//     ];

//     return [
//       "All",
//       ...uniqueCategories,
//     ];
//   }, [newsData]);

//   /* =======================================================
//      FILTER NEWS
//   ======================================================= */

//   const filteredNews = useMemo(() => {
//     const query =
//       search.trim().toLowerCase();

//     return newsData.filter((item) => {
//       const categoryMatch =
//         category === "All" ||
//         item.category === category;

//       const searchMatch =
//         !query ||
//         (item.title || "")
//           .toLowerCase()
//           .includes(query) ||
//         (item.description || "")
//           .toLowerCase()
//           .includes(query) ||
//         (item.content || "")
//           .toLowerCase()
//           .includes(query);

//       return (
//         categoryMatch &&
//         searchMatch
//       );
//     });
//   }, [
//     newsData,
//     category,
//     search,
//   ]);

//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {
//     return (
//       <section className="bg-slate-50 py-20">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="py-20 text-center">
//             <p className="text-gray-500">
//               {t(
//                 "news.loading",
//                 "Loading news..."
//               )}
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   /* =======================================================
//      ERROR
//   ======================================================= */

//   if (error) {
//     return (
//       <section className="bg-slate-50 py-20">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="
//             rounded-2xl
//             border
//             border-red-200
//             bg-red-50
//             p-8
//             text-center
//           ">

//             <h2 className="
//               text-xl
//               font-semibold
//               text-red-700
//             ">
//               {t(
//                 "news.noNewsFound",
//                 "Unable to load news"
//               )}
//             </h2>

//             <p className="
//               mt-2
//               text-red-600
//             ">
//               {error}
//             </p>

//             <button
//               onClick={loadNews}
//               className="
//                 mt-5
//                 rounded-lg
//                 bg-orange-600
//                 px-5
//                 py-3
//                 font-semibold
//                 text-white
//                 hover:bg-orange-700
//               "
//             >
//               {t(
//                 "common.tryAgain",
//                 "Try Again"
//               )}
//             </button>

//           </div>

//         </div>
//       </section>
//     );
//   }

//   /* =======================================================
//      PAGE
//   ======================================================= */

//   return (
//     <>
//       <section className="
//         min-h-screen
//         bg-slate-50
//         py-10
//         sm:py-14
//         lg:py-16
//       ">

//       <div className="
//         mx-auto
//         max-w-7xl
//         px-4
//         sm:px-6
//         lg:px-8
//       ">

//         {/* =================================================
//             HEADER
//         ================================================= */}

//         <div className="
//           flex
//           flex-col
//           gap-6
//           lg:flex-row
//           lg:items-end
//           lg:justify-between
//         ">

//           <div className="max-w-2xl">

//             <span className="
//               text-xs
//               font-semibold
//               uppercase
//               tracking-[0.25em]
//               text-orange-600
//               sm:text-sm
//             ">
//               {t("news.pageLabel")}
//             </span>

//             <h1 className="
//               mt-2
//               text-3xl
//               font-bold
//               text-slate-900
//               sm:text-4xl
//               lg:text-5xl
//             ">
//               {t("news.pageTitle")}
//             </h1>

//             <p className="
//               mt-3
//               leading-7
//               text-gray-600
//             ">
//               {t("news.pageDescription")}
//             </p>

//           </div>

//           {/* SEARCH */}

//           <div className="
//             relative
//             w-full
//             lg:w-80
//           ">

//             <Search
//               size={18}
//               className="
//                 absolute
//                 left-4
//                 top-1/2
//                 -translate-y-1/2
//                 text-gray-400
//               "
//             />

//             <input
//               type="text"
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//               placeholder={t(
//                 "news.search",
//                 "Search news..."
//               )}
//               className="
//                 w-full
//                 rounded-2xl
//                 border
//                 border-slate-200
//                 bg-white
//                 py-3.5
//                 pl-11
//                 pr-4
//                 text-sm
//                 outline-none
//                 transition
//                 focus:border-orange-500
//                 focus:ring-2
//                 focus:ring-orange-100
//               "
//             />

//           </div>

//         </div>

//         {/* =================================================
//             CATEGORIES
//         ================================================= */}

//         <div className="
//           mt-8
//           flex
//           flex-wrap
//           gap-3
//         ">

//           {(categories.length > 0
//             ? categories
//             : fallbackCategories
//           ).map((item) => (

//             <button
//               key={item}
//               onClick={() =>
//                 setCategory(item)
//               }
//               className={`
//                 rounded-full
//                 border
//                 px-5
//                 py-2
//                 text-sm
//                 font-medium
//                 transition

//                 ${
//                   category === item
//                     ? "border-orange-600 bg-orange-600 text-white"
//                     : "border-slate-200 bg-white text-slate-600 hover:border-orange-500 hover:text-orange-600"
//                 }
//               `}
//             >
//               {translateCategory(item)}
//             </button>

//           ))}

//         </div>

//         {/* =================================================
//             RESULT COUNT
//         ================================================= */}

//         <div className="
//           mt-8
//           flex
//           items-center
//           justify-between
//         ">

//           <p className="
//             text-sm
//             text-gray-500
//           ">

//             {t("news.showing", "Showing")}{" "}

//             <span className="
//               font-semibold
//               text-slate-900
//             ">
//               {filteredNews.length}
//             </span>{" "}

//             {filteredNews.length === 1
//               ? t(
//                   "news.update",
//                   "update"
//                 )
//               : t(
//                   "news.updates",
//                   "updates"
//                 )}

//           </p>

//         </div>

//         {/* =================================================
//             NEWS GRID
//         ================================================= */}

//         {filteredNews.length > 0 ? (

//           <div className="
//             mt-6
//             grid
//             gap-7
//             md:grid-cols-2
//             xl:grid-cols-3
//           ">

//             {filteredNews.map(
//               (item, index) => {

//                 const imageUrl =
//                   getImageUrl(
//                     item.image_url
//                   );

//                 return (

//                   <article
//                     key={
//                       item.id ||
//                       `${item.title}-${index}`
//                     }
//                     className="
//                       group
//                       overflow-hidden
//                       rounded-3xl
//                       border
//                       border-slate-100
//                       bg-white
//                       shadow-sm
//                       transition-all
//                       duration-300
//                       hover:-translate-y-1
//                       hover:shadow-xl
//                     "
//                   >

//                     {/* =================================================
//                         IMAGE
//                     ================================================= */}

//                     <div className="
//                       relative
//                       h-56
//                       w-full
//                       overflow-hidden
//                       bg-gray-100
//                     ">

//                       {imageUrl ? (

//                         <img
//                           src={imageUrl}
//                           alt={
//                             item.title ||
//                             "News"
//                           }
//                           className="
//                             h-full
//                             w-full
//                             object-cover
//                             transition
//                             duration-700
//                             group-hover:scale-105
//                           "
//                           onLoad={() => {
//                             console.log(
//                               "IMAGE LOADED:",
//                               imageUrl
//                             );
//                           }}
//                           onError={(e) => {
//                             console.error(
//                               "IMAGE FAILED:",
//                               imageUrl
//                             );

//                             /*
//                               Try to use cached base64 image first,
//                               then fall back to static news images
//                             */
                            
//                             // Try embedded cached base64
//                             if (item._cachedImageBase64) {
//                               console.log(
//                                 "Using cached news image for:",
//                                 item.id
//                               );
//                               e.currentTarget.src =
//                                 item._cachedImageBase64;
//                               return;
//                             }

//                             // Fall back to static news images
//                             const staticNewsImages = [
//                               "/news/news1.png",
//                               "/news/news2.png",
//                               "/news/news3.png",
//                               "/news/news4.png",
//                               "/news/news5.png",
//                               "/news/news6.png",
//                             ];

//                             const fallbackImage =
//                               staticNewsImages[
//                                 index %
//                                   staticNewsImages.length
//                               ];

//                             e.currentTarget.src =
//                               fallbackImage;

//                             e.currentTarget.style.display =
//                               "block";
//                           }}
//                         />

//                       ) : (

//                         <div className="
//                           flex
//                           h-full
//                           w-full
//                           items-center
//                           justify-center
//                           bg-gray-100
//                           text-sm
//                           text-gray-400
//                         ">
//                           {t(
//                             "common.noImage",
//                             "No Image"
//                           )}
//                         </div>

//                       )}

//                     </div>

//                     {/* =================================================
//                         CONTENT
//                     ================================================= */}

//                     <div className="p-6">

//                       {/* DATE */}

//                       {item.published_date && (

//                         <div className="
//                           flex
//                           items-center
//                           gap-2
//                           text-sm
//                           text-orange-600
//                         ">

//                           <CalendarDays
//                             size={16}
//                           />

//                           <span>
//                             {formatDate(
//                               item.published_date
//                             )}
//                           </span>

//                         </div>

//                       )}

//                       {/* CATEGORY */}

//                       {item.category && (

//                         <span className="
//                           mt-4
//                           inline-block
//                           rounded-full
//                           bg-orange-50
//                           px-3
//                           py-1
//                           text-xs
//                           font-semibold
//                           text-orange-600
//                         ">
//                           {translateCategory(
//                             item.category
//                           )}
//                         </span>

//                       )}

//                       {/* TITLE */}

//                       <h2 className="
//                         mt-4
//                         text-xl
//                         font-bold
//                         leading-8
//                         text-slate-900
//                       ">
//                         {item.title}
//                       </h2>

//                       {/* DESCRIPTION */}

//                       {item.description && (

//                         <p className="
//                           mt-3
//                           text-sm
//                           leading-7
//                           text-gray-600
//                         ">
//                           {item.description}
//                         </p>

//                       )}

//                       {/* READ MORE */}

//                       {item.link && (

//                         <a
//                           href={item.link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="
//                             mt-6
//                             inline-flex
//                             items-center
//                             gap-2
//                             font-semibold
//                             text-orange-600
//                           "
//                         >

//                           {t(
//                             "news.readMore",
//                             "Read More"
//                           )}

//                           <ArrowRight
//                             size={17}
//                             className="
//                               transition
//                               group-hover:translate-x-1
//                             "
//                           />

//                         </a>

//                       )}

//                     </div>

//                   </article>

//                 );
//               }
//             )}

//           </div>

//         ) : (

//           /* =================================================
//              NO NEWS
//           ================================================= */

//           <div className="
//             mt-8
//             rounded-3xl
//             border
//             border-slate-200
//             bg-white
//             py-20
//             text-center
//           ">

//             <Search
//               size={30}
//               className="
//                 mx-auto
//                 text-gray-300
//               "
//             />

//             <h3 className="
//               mt-4
//               text-xl
//               font-semibold
//               text-slate-900
//             ">
//               {t(
//                 "news.noNewsFound",
//                 "No news found"
//               )}
//             </h3>

//             <p className="
//               mt-2
//               text-gray-500
//             ">
//               {t(
//                 "news.noNewsDescription",
//                 "Try another search term or category."
//               )}
//             </p>

//             <button
//               onClick={() => {
//                 setSearch("");
//                 setCategory("All");
//               }}
//               className="
//                 mt-6
//                 rounded-full
//                 bg-orange-600
//                 px-6
//                 py-3
//                 text-sm
//                 font-semibold
//                 text-white
//                 transition
//                 hover:bg-orange-700
//               "
//             >
//               {t(
//                 "news.clearFilters",
//                 "Clear Filters"
//               )}
//             </button>

//           </div>

//         )}

//       </div>

//     </section>
//     </>
//   );
// }

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useTranslation } from "react-i18next";

import { API_BASE_URL } from "../config";

import {
  CalendarDays,
  Search,
  ArrowRight,
} from "lucide-react";

// =====================================================
// API
// =====================================================

const API_URL = `${API_BASE_URL}/api/news`;

// =====================================================
// CACHE
// =====================================================
//
// Backend/database = SOURCE OF TRUTH
//
// localStorage:
//   Stores latest successful News API response.
//
// IndexedDB:
//   Stores actual image Blob files.
//
// This means:
//   1. Latest backend data is shown when online.
//   2. Previously loaded data remains available offline.
//   3. Images can continue displaying when backend is down.
// =====================================================

const CACHE_VERSION = "v6";

const NEWS_CACHE_PREFIX =
  `news_latest_${CACHE_VERSION}`;

// =====================================================
// LANGUAGE
// =====================================================

const getLanguage = (language) =>
  language?.startsWith("te")
    ? "te"
    : "en";

const getNewsCacheKey = (language) =>
  `${NEWS_CACHE_PREFIX}_${getLanguage(language)}`;

// =====================================================
// LOCAL STORAGE CACHE
// =====================================================

const getSavedNews = (language) => {
  try {
    const saved = localStorage.getItem(
      getNewsCacheKey(language)
    );

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch (error) {
    console.error(
      "News cache read error:",
      error
    );

    return [];
  }
};

// =====================================================
// SAVE NEWS DATA
// =====================================================

const saveNewsData = (
  data,
  language
) => {
  try {
    if (!Array.isArray(data)) {
      return;
    }

    localStorage.setItem(
      getNewsCacheKey(language),
      JSON.stringify(data)
    );
  } catch (error) {
    console.error(
      "Unable to save News cache:",
      error
    );
  }
};

// =====================================================
// IMAGE URL HELPER
// =====================================================
//
// Supports:
//
// uploads/news/news1.jpeg
// /uploads/news/news1.jpeg
// news/news1.jpeg
// news1.jpeg
// http://...
// https://...
// blob:...
// data:image/...
//
// Backend should ideally store:
//
// uploads/news/news1.jpeg
// =====================================================

const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "";
  }

  let value =
    String(imagePath).trim();

  if (!value) {
    return "";
  }

  // Normalize Windows paths
  value = value.replace(/\\/g, "/");

  // Already cached/base64
  if (
    value.startsWith("data:image/")
  ) {
    return value;
  }

  // Blob URL
  if (
    value.startsWith("blob:")
  ) {
    return value;
  }

  // Already a complete URL
  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  // Remove leading slashes
  const cleanPath =
    value.replace(/^\/+/, "");

  // uploads/news/image.jpg
  if (
    cleanPath.startsWith("uploads/")
  ) {
    return `${API_BASE_URL}/${cleanPath}`;
  }

  // news/image.jpg
  if (
    cleanPath.startsWith("news/")
  ) {
    return `${API_BASE_URL}/uploads/${cleanPath}`;
  }

  // image.jpg
  return `${API_BASE_URL}/uploads/news/${cleanPath}`;
};

// =====================================================
// INDEXEDDB IMAGE CACHE
// =====================================================

const IMAGE_DB_NAME =
  "news_image_cache_v1";

const IMAGE_STORE_NAME =
  "images";

const IMAGE_DB_VERSION = 1;

// =====================================================
// OPEN IMAGE DATABASE
// =====================================================

const openImageDatabase = () => {
  if (
    typeof window === "undefined" ||
    !window.indexedDB
  ) {
    return Promise.resolve(null);
  }

  return new Promise(
    (resolve, reject) => {
      const request =
        window.indexedDB.open(
          IMAGE_DB_NAME,
          IMAGE_DB_VERSION
        );

      request.onupgradeneeded = () => {
        const db =
          request.result;

        if (
          !db.objectStoreNames.contains(
            IMAGE_STORE_NAME
          )
        ) {
          db.createObjectStore(
            IMAGE_STORE_NAME
          );
        }
      };

      request.onsuccess = () => {
        resolve(
          request.result
        );
      };

      request.onerror = () => {
        reject(
          request.error
        );
      };
    }
  );
};

// =====================================================
// IMAGE CACHE KEY
// =====================================================

const getImageCacheKey = (
  imagePath
) => {
  if (!imagePath) {
    return "";
  }

  return getImageUrl(
    imagePath
  );
};

// =====================================================
// SAVE IMAGE TO INDEXEDDB
// =====================================================

const saveImageToCache = async (
  imagePath
) => {
  const imageUrl =
    getImageCacheKey(
      imagePath
    );

  if (
    !imageUrl ||
    imageUrl.startsWith("blob:") ||
    imageUrl.startsWith("data:")
  ) {
    return;
  }

  try {
    const response =
      await fetch(
        imageUrl,
        {
          method: "GET",
          cache: "no-store",
        }
      );

    if (!response.ok) {
      throw new Error(
        `Image returned ${response.status}`
      );
    }

    const blob =
      await response.blob();

    const db =
      await openImageDatabase();

    if (!db) {
      return;
    }

    await new Promise(
      (resolve, reject) => {
        const transaction =
          db.transaction(
            IMAGE_STORE_NAME,
            "readwrite"
          );

        transaction
          .objectStore(
            IMAGE_STORE_NAME
          )
          .put(
            {
              blob,
              contentType:
                blob.type ||
                "image/jpeg",
              savedAt:
                Date.now(),
            },
            imageUrl
          );

        transaction.oncomplete =
          () => resolve();

        transaction.onerror =
          () =>
            reject(
              transaction.error
            );
      }
    );

    db.close();
  } catch (error) {
    // Image caching is best effort.
    //
    // A failed image cache must
    // NEVER prevent News data
    // from rendering.

    console.warn(
      "Unable to cache News image:",
      imageUrl,
      error
    );
  }
};

// =====================================================
// GET CACHED IMAGE
// =====================================================

const getCachedImageBlob = async (
  imagePath
) => {
  const imageUrl =
    getImageCacheKey(
      imagePath
    );

  if (!imageUrl) {
    return null;
  }

  try {
    const db =
      await openImageDatabase();

    if (!db) {
      return null;
    }

    const cached =
      await new Promise(
        (resolve, reject) => {
          const transaction =
            db.transaction(
              IMAGE_STORE_NAME,
              "readonly"
            );

          const request =
            transaction
              .objectStore(
                IMAGE_STORE_NAME
              )
              .get(imageUrl);

          request.onsuccess =
            () =>
              resolve(
                request.result ||
                  null
              );

          request.onerror =
            () =>
              reject(
                request.error
              );
        }
      );

    db.close();

    if (!cached?.blob) {
      return null;
    }

    return URL.createObjectURL(
      cached.blob
    );
  } catch (error) {
    console.warn(
      "Unable to read News image cache:",
      imageUrl,
      error
    );

    return null;
  }
};

// =====================================================
// CACHE ALL NEWS IMAGES
// =====================================================

const cacheNewsImages = async (
  data
) => {
  if (!Array.isArray(data)) {
    return;
  }

  const imagePaths =
    data
      .map(
        (item) =>
          item?.image_url ||
          item?.image ||
          ""
      )
      .filter(Boolean);

  await Promise.allSettled(
    imagePaths.map(
      (imagePath) =>
        saveImageToCache(
          imagePath
        )
    )
  );
};

// =====================================================
// NEWS IMAGE COMPONENT
// =====================================================
//
// Handles:
//
// 1. Backend image
// 2. IndexedDB cached image
// 3. No image fallback
//
// Backend failure does NOT automatically
// remove the existing image.
// =====================================================

const NewsImage = ({
  item,
  index,
}) => {
  const imagePath =
    item?.image_url ||
    item?.image ||
    "";

  const backendImageUrl =
    getImageUrl(
      imagePath
    );

  const [
    displayImageUrl,
    setDisplayImageUrl,
  ] = useState(
    backendImageUrl
  );

  const [
    imageFailed,
    setImageFailed,
  ] = useState(false);

  const [
    imageLoading,
    setImageLoading,
  ] = useState(
    Boolean(
      backendImageUrl
    )
  );

  useEffect(() => {
    let active = true;

    setDisplayImageUrl(
      backendImageUrl
    );

    setImageFailed(false);

    setImageLoading(
      Boolean(
        backendImageUrl
      )
    );

    const loadCachedImage =
      async () => {
        if (!imagePath) {
          return;
        }

        const cachedUrl =
          await getCachedImageBlob(
            imagePath
          );

        if (
          active &&
          cachedUrl
        ) {
          // Do not immediately replace
          // the backend image.
          //
          // The cached image is used
          // if the backend image fails.

          if (!backendImageUrl) {
            setDisplayImageUrl(
              cachedUrl
            );
          }
        }
      };

    loadCachedImage();

    return () => {
      active = false;
    };
  }, [
    imagePath,
    backendImageUrl,
  ]);

  const handleImageError =
    async () => {
      setImageFailed(true);

      const cachedUrl =
        await getCachedImageBlob(
          imagePath
        );

      if (cachedUrl) {
        setDisplayImageUrl(
          cachedUrl
        );

        setImageFailed(false);
        setImageLoading(false);
      } else {
        setDisplayImageUrl("");
        setImageLoading(false);
      }
    };

  return (
    <div
      className="
        relative
        h-56
        w-full
        overflow-hidden
        bg-slate-100
      "
    >
      {displayImageUrl &&
      !imageFailed ? (
        <img
          src={displayImageUrl}
          alt={
            item?.title ||
            "News"
          }
          className="
            h-full
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-105
          "
          onLoad={() => {
            setImageLoading(
              false
            );
            setImageFailed(
              false
            );
          }}
          onError={
            handleImageError
          }
        />
      ) : null}

      {imageLoading && (
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-slate-100
            text-sm
            text-slate-400
          "
        >
          Loading image...
        </div>
      )}

      {!displayImageUrl ||
      imageFailed ? (
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-slate-100
            text-sm
            text-slate-400
          "
        >
          No image available
        </div>
      ) : null}
    </div>
  );
};

// =====================================================
// MAIN NEWS PAGE
// =====================================================

export default function News() {
  const {
    i18n,
    t,
  } = useTranslation();

  // ===================================================
  // LANGUAGE
  // ===================================================

  const initialLanguage =
    getLanguage(
      i18n.language
    );

  const language =
    getLanguage(
      i18n.language
    );

  const isTelugu =
    language === "te";

  // ===================================================
  // CATEGORY TRANSLATION
  // ===================================================

  const categoryKeys = {
    All: "all",
    Government: "government",
    Public: "public",
    Healthcare: "healthcare",
    Education: "education",
    Agriculture: "agriculture",
  };

  const translateCategory =
    (categoryValue) =>
      categoryKeys[
        categoryValue
      ]
        ? t(
            `news.${
              categoryKeys[
                categoryValue
              ]
            }`
          )
        : isTelugu
          ? t(
              "news.defaultCategory",
              categoryValue
            )
          : categoryValue;

  // ===================================================
  // STATES
  // ===================================================

  const [
    newsData,
    setNewsData,
  ] = useState(
    () =>
      getSavedNews(
        initialLanguage
      )
  );

  const [
    category,
    setCategory,
  ] = useState("All");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    checkingBackend,
    setCheckingBackend,
  ] = useState(true);

  const [
    backendOffline,
    setBackendOffline,
  ] = useState(false);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    lastUpdated,
    setLastUpdated,
  ] = useState(null);

  const [
    error,
    setError,
  ] = useState("");

  // ===================================================
  // LOAD NEWS
  // ===================================================

  const loadNews =
    useCallback(
      async (
        showRefresh = false
      ) => {
        try {
          if (showRefresh) {
            setRefreshing(true);
          }

          setCheckingBackend(
            true
          );

          setError("");

          const currentLanguage =
            getLanguage(
              i18n.language
            );

          // =================================================
          // API URL
          // =================================================

          const url =
            `${API_URL}?lang=${currentLanguage}&_=${Date.now()}`;

          console.log(
            "NEWS API:",
            url
          );

          // =================================================
          // FETCH
          // =================================================

          const response =
            await fetch(
              url,
              {
                method: "GET",

                headers: {
                  Accept:
                    "application/json",

                  "Cache-Control":
                    "no-cache, no-store, must-revalidate",

                  Pragma:
                    "no-cache",
                },

                cache:
                  "no-store",
              }
            );

          // =================================================
          // HTTP ERROR
          // =================================================

          if (!response.ok) {
            throw new Error(
              `Server returned ${response.status}`
            );
          }

          // =================================================
          // JSON
          // =================================================

          const result =
            await response.json();

          console.log(
            "LATEST NEWS:",
            result
          );

          // =================================================
          // API SUCCESS CHECK
          // =================================================

          if (
            !result.success
          ) {
            throw new Error(
              result.message ||
                "News API returned unsuccessful response."
            );
          }

          // =================================================
          // DATA
          // =================================================

          const latestNews =
            Array.isArray(
              result.data
            )
              ? result.data
              : [];

          console.log(
            "NEWS DATA FROM DATABASE:",
            latestNews
          );

          // =================================================
          // DATABASE IS SOURCE OF TRUTH
          // =================================================

          setNewsData(
            latestNews
          );

          // =================================================
          // BACKEND ONLINE
          // =================================================

          setBackendOffline(
            false
          );

          // =================================================
          // LAST UPDATED
          // =================================================

          setLastUpdated(
            new Date()
          );

          // =================================================
          // SAVE JSON CACHE
          // =================================================
          //
          // IMPORTANT:
          //
          // Only successful backend
          // data is saved.
          //
          // Backend failure can therefore
          // NEVER overwrite good cached
          // data with [].
          // =================================================

          saveNewsData(
            latestNews,
            currentLanguage
          );

          // =================================================
          // CACHE IMAGES
          // =================================================
          //
          // Runs in background.
          //
          // It does not block rendering.
          // =================================================

          cacheNewsImages(
            latestNews
          ).catch(
            (
              cacheError
            ) => {
              console.warn(
                "News image caching error:",
                cacheError
              );
            }
          );
        } catch (error) {
          // =================================================
          // BACKEND ERROR
          // =================================================

          console.error(
            "NEWS BACKEND ERROR:",
            error
          );

          // =================================================
          // IMPORTANT
          // =================================================
          //
          // DO NOT:
          //
          // setNewsData([])
          //
          // Existing cached data may already
          // be displayed.
          //
          // Keep current newsData.
          // =================================================

          setBackendOffline(
            true
          );

          // Only show an error if
          // there is no existing data.

          if (
            newsData.length === 0
          ) {
            setError(
              error.message ||
                "Unable to load News."
            );
          }
        } finally {
          setCheckingBackend(
            false
          );

          setRefreshing(
            false
          );
        }
      },
      [
        i18n.language,
        newsData.length,
      ]
    );

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    loadNews(false);
  }, [
    loadNews,
  ]);

  // ===================================================
  // AUTO REFRESH
  // ===================================================
  //
  // Same approach as Political Career.
  //
  // Every 30 seconds the frontend checks
  // the backend for newly published news.
  // ===================================================

  useEffect(() => {
    const interval =
      setInterval(() => {
        loadNews(false);
      }, 30000);

    return () => {
      clearInterval(
        interval
      );
    };
  }, [
    loadNews,
  ]);

  // ===================================================
  // CATEGORIES
  // ===================================================

  const categories =
    useMemo(() => {
      const dynamicCategories =
        newsData
          .map(
            (item) =>
              item?.category
          )
          .filter(Boolean);

      return [
        "All",
        ...Array.from(
          new Set([
            ...[
              "Government",
              "Public",
              "Healthcare",
              "Education",
              "Agriculture",
            ],
            ...dynamicCategories,
          ])
        ),
      ];
    }, [
      newsData,
    ]);

  // ===================================================
  // FILTER NEWS
  // ===================================================

  const filteredNews =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return newsData.filter(
        (item) => {
          const matchesCategory =
            category === "All" ||
            item.category ===
              category;

          if (
            !matchesCategory
          ) {
            return false;
          }

          if (
            !normalizedSearch
          ) {
            return true;
          }

          const searchableText =
            [
              item.title,
              item.description,
              item.content,
              item.caption,
              item.category,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

          return searchableText.includes(
            normalizedSearch
          );
        }
      );
    }, [
      newsData,
      category,
      search,
    ]);

  // ===================================================
  // FORMAT DATE
  // ===================================================

  const formatDate = (
    date
  ) => {
    if (!date) {
      return "";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return String(
        date
      ).substring(0, 10);
    }

    return parsedDate.toLocaleDateString(
      isTelugu
        ? "te-IN"
        : "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (
    checkingBackend &&
    newsData.length === 0
  ) {
    return (
      <section className="min-h-screen bg-white">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div
              className="
                mx-auto
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-orange-200
                border-t-orange-600
              "
            />

            <p className="mt-4 text-sm text-slate-500">
              {t(
                "common.loading",
                "Loading..."
              )}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ===================================================
  // NO DATA
  // ===================================================

  if (
    newsData.length === 0
  ) {
    return (
      <section className="min-h-screen bg-white">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-8
              text-center
              shadow-sm
            "
          >
            <Search
              size={40}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              {t(
                "news.noNewsFound",
                "No news found"
              )}
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {error ||
                t(
                  "news.noNewsDescription",
                  "Unable to load news information from the backend."
                )}
            </p>

            <button
              type="button"
              onClick={() =>
                loadNews(true)
              }
              disabled={
                refreshing
              }
              className="
                mt-6
                rounded-lg
                bg-orange-600
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-orange-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {refreshing
                ? "Refreshing..."
                : t(
                    "common.tryAgain",
                    "Try Again"
                  )}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ===================================================
  // PAGE
  // ===================================================

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="bg-white">
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-12
            sm:px-6
            lg:px-8
            lg:py-16
          "
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-orange-500
                "
              >
                {t(
                  "news.pageLabel",
                  "News & Updates"
                )}
              </span>

              {backendOffline && (
                <span
                  className="
                    rounded-full
                    bg-amber-50
                    px-3
                    py-1
                    text-[10px]
                    font-semibold
                    text-amber-700
                  "
                >
                  {t(
                    "news.offline",
                    "Offline"
                  )}
                </span>
              )}
            </div>

            <h1
              className="
                mt-4
                text-3xl
                font-bold
                leading-tight
                text-slate-900
                sm:text-4xl
                lg:text-5xl
              "
            >
              {t(
                "news.pageTitle",
                "Latest News"
              )}
            </h1>

            <p
              className="
                mt-5
                max-w-2xl
                text-sm
                leading-7
                text-slate-600
                sm:text-base
                lg:text-lg
                lg:leading-8
              "
            >
              {t(
                "news.pageDescription",
                "Stay updated with the latest news, public initiatives, development activities and important updates."
              )}
            </p>

            {/* REFRESH */}

            <button
              type="button"
              onClick={() =>
                loadNews(true)
              }
              disabled={
                refreshing
              }
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-orange-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-orange-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <span
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              >
                ↻
              </span>

              {refreshing
                ? "Refreshing..."
                : "Refresh Data"}
            </button>

            {lastUpdated && (
              <p className="mt-2 text-xs text-slate-400">
                Last checked:{" "}
                {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          FILTER AREA
      ================================================= */}

      <section className="border-y border-slate-200 bg-slate-50">
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-6
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* CATEGORIES */}

            <div className="flex flex-wrap gap-2">
              {categories.map(
                (itemCategory) => (
                  <button
                    key={
                      itemCategory
                    }
                    type="button"
                    onClick={() =>
                      setCategory(
                        itemCategory
                      )
                    }
                    className={`
                      rounded-full
                      px-4
                      py-2
                      text-xs
                      font-semibold
                      transition
                      ${
                        category ===
                        itemCategory
                          ? "bg-orange-600 text-white shadow-sm"
                          : "bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-700"
                      }
                    `}
                  >
                    {translateCategory(
                      itemCategory
                    )}
                  </button>
                )
              )}
            </div>

            {/* SEARCH */}

            <div
              className="
                relative
                w-full
                lg:max-w-sm
              "
            >
              <Search
                size={18}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder={t(
                  "news.searchPlaceholder",
                  "Search news..."
                )}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  py-3
                  pl-10
                  pr-4
                  text-sm
                  outline-none
                  transition
                  focus:border-orange-400
                  focus:ring-2
                  focus:ring-orange-100
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          NEWS GRID
      ================================================= */}

      <section>
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-10
            sm:px-6
            lg:px-8
            lg:py-14
          "
        >
          {filteredNews.length > 0 ? (
            <div
              className="
                grid
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {filteredNews.map(
                (
                  item,
                  index
                ) => (
                  <article
                    key={
                      item.id ||
                      `${item.title}-${index}`
                    }
                    className="
                      group
                      overflow-hidden
                      rounded-3xl
                      border
                      border-slate-200
                      bg-white
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-xl
                    "
                  >
                    {/* IMAGE */}

                    <NewsImage
                      item={item}
                      index={index}
                    />

                    {/* CONTENT */}

                    <div className="p-6">
                      {/* CATEGORY */}

                      {item.category && (
                        <span
                          className="
                            inline-flex
                            rounded-full
                            bg-orange-50
                            px-3
                            py-1
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-wide
                            text-orange-600
                          "
                        >
                          {translateCategory(
                            item.category
                          )}
                        </span>
                      )}

                      {/* DATE */}

                      {(item.date ||
                        item.published_at ||
                        item.created_at) && (
                        <div
                          className="
                            mt-3
                            flex
                            items-center
                            gap-2
                            text-xs
                            text-slate-400
                          "
                        >
                          <CalendarDays
                            size={14}
                          />

                          <span>
                            {formatDate(
                              item.date ||
                                item.published_at ||
                                item.created_at
                            )}
                          </span>
                        </div>
                      )}

                      {/* TITLE */}

                      <h2
                        className="
                          mt-4
                          text-xl
                          font-bold
                          leading-tight
                          text-slate-900
                        "
                      >
                        {item.title ||
                          "Untitled News"}
                      </h2>

                      {/* DESCRIPTION */}

                      <p
                        className="
                          mt-3
                          line-clamp-4
                          text-sm
                          leading-6
                          text-slate-600
                        "
                      >
                        {item.description ||
                          item.content ||
                          item.caption ||
                          ""}
                      </p>

                      {/* READ MORE */}

                      {item.link && (
                        <a
                          href={
                            item.link
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            mt-6
                            inline-flex
                            items-center
                            gap-2
                            font-semibold
                            text-orange-600
                          "
                        >
                          {t(
                            "news.readMore",
                            "Read More"
                          )}

                          <ArrowRight
                            size={17}
                            className="
                              transition
                              group-hover:translate-x-1
                            "
                          />
                        </a>
                      )}
                    </div>
                  </article>
                )
              )}
            </div>
          ) : (
            /* ===========================================
               NO NEWS AFTER FILTER
            =========================================== */

            <div
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                py-20
                text-center
              "
            >
              <Search
                size={30}
                className="
                  mx-auto
                  text-gray-300
                "
              />

              <h3
                className="
                  mt-4
                  text-xl
                  font-semibold
                  text-slate-900
                "
              >
                {t(
                  "news.noNewsFound",
                  "No news found"
                )}
              </h3>

              <p
                className="
                  mt-2
                  text-gray-500
                "
              >
                {t(
                  "news.noNewsDescription",
                  "There are no news articles matching your search."
                )}
              </p>

              {(search ||
                category !==
                  "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory(
                      "All"
                    );
                  }}
                  className="
                    mt-5
                    rounded-lg
                    bg-orange-600
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-orange-700
                  "
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}