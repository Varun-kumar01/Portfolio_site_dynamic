// import { useEffect, useMemo, useState } from "react";
// import { Play, X } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { API_BASE_URL } from "../config";
// import { cacheImageAsBase64, getCachedImageBase64 } from "../services/cacheService";

// /* =========================================================
//    API CONFIGURATION
// ========================================================= */

// const PHOTO_API_URL = `${API_BASE_URL}/api/gallery`;
// const VIDEO_API_URL = `${API_BASE_URL}/api/videos`;

// const VIDEO_CACHE_KEY = "gallery_videos_cache";
// const PHOTO_CACHE_KEY = "gallery_photos_cache";

// /* =========================================================
//    CATEGORIES
// ========================================================= */

// const categories = [
//   "All",
//   "Public Events",
//   "Constituency",
//   "Meetings",
//   "Events",
// ];

// /* =========================================================
//    EXISTING STATIC PHOTOS
//    ---------------------------------------------------------
//    These are your old gallery photos.

//    They will continue showing even if the backend
//    does not contain them.
// ========================================================= */

// const existingPhotos = [
//   {
//     id: "static-1",
//     type: "photo",
//     category: "Public Events",
//     image: "/gallery12/1.png",
//     title: "Public Meetings",
//     caption: "",
//     isStatic: true,
//   },

//   {
//     id: "static-2",
//     type: "photo",
//     category: "Meetings",
//     image: "/gallery12/2.png",
//     title: "Public Meetings",
//     caption: "",
//     isStatic: true,
//   },

//   {
//     id: "static-3",
//     type: "photo",
//     category: "Constituency",
//     image: "/gallery12/3.png",
//     title: "Public Meetings",
//     caption: "",
//     isStatic: true,
//   },

//   {
//     id: "static-4",
//     type: "photo",
//     category: "Events",
//     image: "/gallery12/4.png",
//     title: "Public Meetings",
//     caption: "",
//     isStatic: true,
//   },

//   {
//     id: "static-5",
//     type: "photo",
//     category: "Public Events",
//     image: "/gallery12/5.png",
//     title: "Public Meetings",
//     caption: "",
//     isStatic: true,
//   },

//   {
//     id: "static-6",
//     type: "photo",
//     category: "Meetings",
//     image: "/gallery12/6.png",
//     title: "Public Meetings",
//     caption: "",
//     isStatic: true,
//   },

//   {
//     id: "static-7",
//     type: "photo",
//     category: "Public Events",
//     image: "/gallery12/7.png",
//     title: "Public Interaction",
//     caption: "",
//     isStatic: true,
//   },

//   {
//     id: "static-8",
//     type: "photo",
//     category: "Meetings",
//     image: "/gallery12/8.png",
//     title: "Official Meeting",
//     caption: "",
//     isStatic: true,
//   },

//   {
//     id: "static-9",
//     type: "photo",
//     category: "Constituency",
//     image: "/gallery12/9.png",
//     title: "Constituency Visit",
//     caption: "",
//     isStatic: true,
//   },

//   {
//     id: "static-10",
//     type: "photo",
//     category: "Events",
//     image: "/gallery12/10.png",
//     title: "Public Programme",
//     caption: "",
//     isStatic: true,
//   },

//   {
//     id: "static-11",
//     type: "photo",
//     category: "Public Events",
//     image: "/gallery12/11.png",
//     title: "Community Interaction",
//     caption: "",
//     isStatic: true,
//   },

//   {
//     id: "static-12",
//     type: "photo",
//     category: "Meetings",
//     image: "/gallery12/12.png",
//     title: "Leadership Meeting",
//     caption: "",
//     isStatic: true,
//   },
// ];

// /* =========================================================
//    FALLBACK VIDEOS
// ========================================================= */

// const fallbackVideos = [
//   {
//     id: "old-video-1",
//     type: "video",
//     category: "Public Events",
//     title: "Public Programme",
//     description: "",
//     videoUrl: "https://www.youtube.com/watch?v=qFusARwKYPk",
//     thumbnailUrl: "",
//   },

//   {
//     id: "old-video-2",
//     type: "video",
//     category: "Meetings",
//     title: "Public Interaction",
//     description: "",
//     videoUrl: "https://www.youtube.com/watch?v=XTZMEkK0F7s",
//     thumbnailUrl: "",
//   },
// ];

// /* =========================================================
//    YOUTUBE CHECK
// ========================================================= */

// function isYoutube(url) {
//   if (!url) {
//     return false;
//   }

//   return (
//     url.includes("youtube.com") ||
//     url.includes("youtu.be")
//   );
// }

// /* =========================================================
//    YOUTUBE THUMBNAIL
// ========================================================= */

// function youtubeThumbnail(url) {
//   if (!url) {
//     return "";
//   }

//   const match = url.match(
//     /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
//   );

//   if (!match) {
//     return "";
//   }

//   return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
// }

// /* =========================================================
//    IMAGE URL HELPER
// ========================================================= */

// function getImageUrl(imagePath) {
//   if (!imagePath) {
//     return "";
//   }

//   const cleanPath = String(imagePath).trim();

//   if (!cleanPath) {
//     return "";
//   }

//   /* Already a complete URL */

//   if (
//     cleanPath.startsWith("http://") ||
//     cleanPath.startsWith("https://")
//   ) {
//     return cleanPath;
//   }

//   /* Frontend public image */

//   if (
//     cleanPath.startsWith("/gallery/") ||
//     cleanPath.startsWith("/gallery12/") ||
//     cleanPath.startsWith("/images/")
//   ) {
//     return cleanPath;
//   }

//   /* Backend upload */

//   return `${API_BASE_URL}${
//     cleanPath.startsWith("/") ? "" : "/"
//   }${cleanPath}`;
// }

// /* =========================================================
//    VIDEO URL HELPER

//    Ensures video URLs have full base URL for cross-domain requests.
// ========================================================= */

// function getVideoUrl(videoPath) {
//   if (!videoPath) {
//     return "";
//   }

//   const cleanPath = String(videoPath).trim();

//   if (!cleanPath) {
//     return "";
//   }

//   /* Already a complete URL (YouTube or other) */

//   if (
//     cleanPath.startsWith("http://") ||
//     cleanPath.startsWith("https://")
//   ) {
//     return cleanPath;
//   }

//   /* Backend upload - needs full URL */

//   return `${API_BASE_URL}${
//     cleanPath.startsWith("/") ? "" : "/"
//   }${cleanPath}`;
// }

// /* =========================================================
//    CACHE-BUST IMAGE URL

//    Important when admin replaces an image with another
//    image having the same filename.
// ========================================================= */

// function getFreshImageUrl(imageUrl, updatedAt = "") {
//   if (!imageUrl) {
//     return "";
//   }

//   /*
//     Static public images do not need cache busting.
//   */

//   if (
//     imageUrl.startsWith("/gallery/") ||
//     imageUrl.startsWith("/gallery12/") ||
//     imageUrl.startsWith("/images/")
//   ) {
//     return imageUrl;
//   }

//   const separator = imageUrl.includes("?")
//     ? "&"
//     : "?";

//   return `${imageUrl}${separator}v=${
//     updatedAt || Date.now()
//   }`;
// }

// /* =========================================================
//    GET CACHED PHOTOS
// ========================================================= */

// function getCachedPhotos() {
//   try {
//     const saved = localStorage.getItem(
//       PHOTO_CACHE_KEY
//     );

//     if (!saved) {
//       return [];
//     }

//     const parsed = JSON.parse(saved);

//     return Array.isArray(parsed)
//       ? parsed
//       : [];
//   } catch (error) {
//     console.error(
//       "PHOTO CACHE ERROR:",
//       error
//     );

//     return [];
//   }
// }

// /* =========================================================
//    GET CACHED VIDEOS
// ========================================================= */

// function getCachedVideos() {
//   try {
//     const saved = localStorage.getItem(
//       VIDEO_CACHE_KEY
//     );

//     if (!saved) {
//       return [];
//     }

//     const parsed = JSON.parse(saved);

//     return Array.isArray(parsed)
//       ? parsed
//       : [];
//   } catch (error) {
//     console.error(
//       "VIDEO CACHE ERROR:",
//       error
//     );

//     return [];
//   }
// }

// /* =========================================================
//    REMOVE DUPLICATE PHOTOS
// ========================================================= */

// function mergePhotos(
//   backendPhotos,
//   staticPhotos
// ) {
//   const result = [];

//   const backendImageSet = new Set();

//   /* -------------------------------------------------------
//      FIRST: BACKEND PHOTOS
//      Backend photos get priority.
//   ------------------------------------------------------- */

//   backendPhotos.forEach((photo) => {
//     if (!photo.image) {
//       return;
//     }

//     const normalized = photo.image
//       .split("?")[0]
//       .toLowerCase()
//       .trim();

//     if (!normalized) {
//       return;
//     }

//     /*
//       Do not add same backend image twice.
//     */

//     if (backendImageSet.has(normalized)) {
//       return;
//     }

//     backendImageSet.add(normalized);

//     result.push(photo);
//   });

//   /* -------------------------------------------------------
//      SECOND: OLD STATIC PHOTOS

//      Add only if the same path/image is NOT already
//      coming from the backend.
//   ------------------------------------------------------- */

//   staticPhotos.forEach((photo) => {
//     const staticPath = photo.image
//       .toLowerCase()
//       .trim();

//     const alreadyExists =
//       backendPhotos.some((backendPhoto) => {
//         const backendOriginalPath = String(
//           backendPhoto.image_path || ""
//         )
//           .toLowerCase()
//           .trim();

//         const backendImage = String(
//           backendPhoto.image || ""
//         )
//           .split("?")[0]
//           .toLowerCase()
//           .trim();

//         return (
//           backendOriginalPath ===
//             staticPath ||
//           backendImage === staticPath ||
//           backendImage.endsWith(
//             staticPath
//           )
//         );
//       });

//     if (!alreadyExists) {
//       result.push(photo);
//     }
//   });

//   return result;
// }

// /* =========================================================
//    GALLERY COMPONENT
// ========================================================= */

// export default function Gallery() {
//   const { i18n, t } = useTranslation();
//   /* =======================================================
//      TYPE
//   ======================================================= */

//   const [type, setType] = useState("photo");

//   /* =======================================================
//      CATEGORY
//   ======================================================= */

//   const [category, setCategory] =
//     useState("All");

//   /* =======================================================
//      LIGHTBOX
//   ======================================================= */

//   const [selectedImage, setSelectedImage] =
//     useState(null);

//   /* =======================================================
//      PHOTOS
//   ======================================================= */

//   const [photos, setPhotos] = useState(
//     existingPhotos
//   );

//   const [loadingPhotos, setLoadingPhotos] =
//     useState(false);

//   const [photoError, setPhotoError] =
//     useState("");

//   const [
//     usingPhotoCache,
//     setUsingPhotoCache,
//   ] = useState(false);

//   /* =======================================================
//      VIDEOS
//   ======================================================= */

//   const [videos, setVideos] = useState(() => {
//     const cached = getCachedVideos();

//     if (cached.length > 0) {
//       return cached;
//     }

//     return fallbackVideos;
//   });

//   const [loadingVideos, setLoadingVideos] =
//     useState(false);

//   const [
//     usingVideoCache,
//     setUsingVideoCache,
//   ] = useState(false);

//   /* =======================================================
//      LOAD PHOTOS
//   ======================================================= */

//   async function loadPhotos() {
//     try {
//       setLoadingPhotos(true);

//       setPhotoError("");

//       console.log(
//         "================================"
//       );

//       console.log(
//         "LOADING GALLERY PHOTOS"
//       );

//       console.log(
//         "API:",
//         PHOTO_API_URL
//       );

//       console.log(
//         "================================"
//       );

//       const response = await fetch(
//         `${PHOTO_API_URL}?lang=${i18n.language?.startsWith("te") ? "te" : "en"}&t=${Date.now()}`,
//         {
//           method: "GET",
//           cache: "no-store",
//         }
//       );

//       const text =
//         await response.text();

//       let result;

//       try {
//         result = JSON.parse(text);
//       } catch (error) {
//         console.error(
//           "INVALID JSON:",
//           text
//         );

//         throw new Error(
//           "Backend returned invalid gallery data."
//         );
//       }

//       if (!response.ok) {
//         throw new Error(
//           result.message ||
//             `Server returned ${response.status}`
//         );
//       }

//       /* ---------------------------------------------------
//          SUPPORT:

//          [
//            {...}
//          ]

//          OR

//          {
//            success: true,
//            data: [...]
//          }
//       --------------------------------------------------- */

//       const galleryData =
//         Array.isArray(result)
//           ? result
//           : Array.isArray(result.data)
//             ? result.data
//             : [];

//       console.log(
//         "BACKEND PHOTO COUNT:",
//         galleryData.length
//       );

//       /* ---------------------------------------------------
//          FORMAT PHOTOS
//       --------------------------------------------------- */

//       const formattedPhotos =
//         galleryData
//           .map((item, index) => {
//             const originalImagePath =
//               item.image_path ||
//               item.image ||
//               item.image_url ||
//               item.photo ||
//               item.photo_url ||
//               "";

//             const baseImageUrl =
//               getImageUrl(
//                 originalImagePath
//               );

//             return {
//               id:
//                 item.id ??
//                 `backend-photo-${index}`,

//               type: "photo",

//               category:
//                 item.category ||
//                 item.section ||
//                 "Public Events",

//               image_path:
//                 originalImagePath,

//               image:
//                 getFreshImageUrl(
//                   baseImageUrl,
//                   item.updated_at ||
//                     item.updatedAt ||
//                     item.created_at ||
//                     Date.now()
//                 ),

//               title:
//                 item.title ||
//                 "Public Service",

//               caption:
//                 item.caption ||
//                 item.description ||
//                 "",

//               created_at:
//                 item.created_at || "",

//               updated_at:
//                 item.updated_at || "",

//               // Cache key for storing image as base64
//               cacheImageKey: `photo_${item.id || index}_${i18n.language}`,

//               isStatic: false,
//             };
//           })
//           .filter(
//             (item) => item.image
//           );

//       console.log(
//         "FORMATTED BACKEND PHOTOS:",
//         formattedPhotos
//       );

//       /* ---------------------------------------------------
//          USE BACKEND PHOTOS IF AVAILABLE
//          FALLBACK TO STATIC ONLY IF BACKEND IS EMPTY
//       --------------------------------------------------- */

//       const allPhotos = formattedPhotos.length > 0 
//         ? formattedPhotos 
//         : existingPhotos;

//       console.log(
//         "================================"
//       );

//       console.log(
//         "FINAL PHOTO COUNT:",
//         allPhotos.length
//       );

//       console.log(
//         "BACKEND PHOTO COUNT:",
//         formattedPhotos.length
//       );

//       console.log(
//         "STATIC PHOTO COUNT:",
//         existingPhotos.length
//       );

//       console.log(
//         "================================"
//       );

//       setPhotos(allPhotos);

//       setPhotoError("");

//       /* Cache the backend photos if we got any */
//       if (formattedPhotos.length > 0) {
//         // Embed base64 images directly in photo data and cache
//         console.log("Starting to cache gallery images...");
        
//         Promise.all(
//           formattedPhotos.map(async (item) => {
//             if (!item.image) {
//               return item;
//             }

//             try {
//               const response = await fetch(item.image, {
//                 method: "GET",
//                 cache: "no-store",
//               });

//               if (!response.ok) {
//                 console.warn(`Failed to fetch gallery image for ${item.id}`);
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
//               console.warn(`Failed to cache gallery image for ${item.id}:`, err);
//               return item;
//             }
//           })
//         )
//           .then((photosWithImages) => {
//             try {
//               localStorage.setItem(
//                 PHOTO_CACHE_KEY,
//                 JSON.stringify(photosWithImages)
//               );
//               console.log("Cached all gallery photos with embedded images");
//             } catch (e) {
//               console.warn("Failed to cache gallery with images:", e);
//             }
//           })
//           .catch((err) => {
//             console.warn("Error caching gallery images:", err);
//           });
//       }

//       setUsingPhotoCache(false);
//     } catch (error) {
//       console.error(
//         "GALLERY PHOTO ERROR:",
//         error
//       );

//       /*
//         Try to use cached photos first,
//         then fall back to static photos.
//       */

//       const cachedPhotos = getCachedPhotos();

//       if (cachedPhotos.length > 0) {
//         console.log("Using cached photos");
//         setPhotos(cachedPhotos);
//         setUsingPhotoCache(true);
//         setPhotoError(""); // Clear error when using cache
//       } else {
//         setPhotos(existingPhotos);
//         setUsingPhotoCache(false);
//         setPhotoError(
//           error.message ||
//             "Unable to load gallery images."
//         );
//       }
//     } finally {
//       setLoadingPhotos(false);
//     }
//   }

//   /* =======================================================
//      LOAD VIDEOS
//   ======================================================= */

//   async function loadVideos() {
//     try {
//       setLoadingVideos(true);

//       const response = await fetch(
//         `${VIDEO_API_URL}?lang=${i18n.language?.startsWith("te") ? "te" : "en"}&t=${Date.now()}`,
//         {
//           method: "GET",
//           cache: "no-store",
//         }
//       );

//       const text =
//         await response.text();

//       let result;

//       try {
//         result = JSON.parse(text);
//       } catch (error) {
//         throw new Error(
//           "Backend returned invalid video data."
//         );
//       }

//       if (!response.ok) {
//         throw new Error(
//           result.message ||
//             `Server returned ${response.status}`
//         );
//       }

//       /*
//         Support success/data response.
//       */

//       const videoData =
//         Array.isArray(result)
//           ? result
//           : Array.isArray(result.data)
//             ? result.data
//             : [];

//       const latestVideos =
//         videoData.map(
//           (item, index) => ({
//             id:
//               item.id ??
//               `video-${index}`,

//             type: "video",

//             category:
//               item.category ||
//               "Video",

//             title:
//               item.title ||
//               "Video",

//             description:
//               item.description ||
//               "",

//             videoUrl:
//               item.video_url ||
//               item.videoUrl ||
//               item.url ||
//               "",

//             thumbnailUrl:
//               item.thumbnail_url ||
//               item.thumbnailUrl ||
//               "",

//             link:
//               item.link ||
//               "",

//             publishedDate:
//               item.published_date ||
//               "",
//           })
//         );

//       /*
//         If backend successfully responds but has zero
//         videos, don't use old fallback videos.
//       */

//       setVideos(latestVideos);

//       localStorage.setItem(
//         VIDEO_CACHE_KEY,
//         JSON.stringify(
//           latestVideos
//         )
//       );

//       setUsingVideoCache(false);
//     } catch (error) {
//       console.error(
//         "GALLERY VIDEO ERROR:",
//         error
//       );

//       const cached =
//         getCachedVideos();

//       if (cached.length > 0) {
//         setVideos(cached);

//         setUsingVideoCache(true);
//       } else {
//         setVideos(
//           fallbackVideos
//         );

//         setUsingVideoCache(false);
//       }
//     } finally {
//       setLoadingVideos(false);
//     }
//   }

//   /* =======================================================
//      INITIAL LOAD
//   ======================================================= */

//   useEffect(() => {
//     loadPhotos();

//     loadVideos();
//   }, [i18n.language]);

//   /* =======================================================
//      REFRESH WHEN ADMIN CHANGES GALLERY
//   ======================================================= */

//   useEffect(() => {
//     /* ---------------------------------------------------
//        ADMIN GALLERY UPDATE
//     --------------------------------------------------- */

//     function refreshPhotos() {
//       console.log(
//         "Gallery update detected."
//       );

//       loadPhotos();
//     }

//     /* ---------------------------------------------------
//        ADMIN VIDEO UPDATE
//     --------------------------------------------------- */

//     function refreshVideos() {
//       console.log(
//         "Video update detected."
//       );

//       loadVideos();
//     }

//     /* ---------------------------------------------------
//        REFRESH EVERYTHING
//     --------------------------------------------------- */

//     function refreshEverything() {
//       loadPhotos();

//       loadVideos();
//     }

//     window.addEventListener(
//       "gallery-updated",
//       refreshPhotos
//     );

//     window.addEventListener(
//       "videos-updated",
//       refreshVideos
//     );

//     window.addEventListener(
//       "focus",
//       refreshEverything
//     );

//     return () => {
//       window.removeEventListener(
//         "gallery-updated",
//         refreshPhotos
//       );

//       window.removeEventListener(
//         "videos-updated",
//         refreshVideos
//       );

//       window.removeEventListener(
//         "focus",
//         refreshEverything
//       );
//     };
//   }, []);

//   /* =======================================================
//      FILTER
//   ======================================================= */

//   const filteredItems = useMemo(() => {
//     const currentItems =
//       type === "photo"
//         ? photos
//         : videos;

//     return currentItems.filter(
//       (item) => {
//         const itemCategory =
//           String(
//             item.category || ""
//           )
//             .trim()
//             .toLowerCase();

//         const selectedCategory =
//           String(
//             category
//           )
//             .trim()
//             .toLowerCase();

//         return (
//           category === "All" ||
//           itemCategory ===
//             selectedCategory
//         );
//       }
//     );
//   }, [
//     type,
//     category,
//     photos,
//     videos,
//   ]);

//   /* =======================================================
//      CHANGE TYPE
//   ======================================================= */

//   function changeType(newType) {
//     setType(newType);

//     setCategory("All");

//     if (newType === "photo") {
//       loadPhotos();
//     }

//     if (newType === "video") {
//       loadVideos();
//     }
//   }

//   /* =======================================================
//      LOADING
//   ======================================================= */

//   const isLoading =
//     type === "photo"
//       ? loadingPhotos
//       : loadingVideos;

//   /* =======================================================
//      ERROR
//   ======================================================= */

//   const currentError =
//     type === "photo"
//       ? photoError
//       : "";

//   const categoryLabels = {
//     All: "all",
//     "Public Events": "publicEvents",
//     Constituency: "constituency",
//     Meetings: "meetings",
//     Events: "events",
//   };
//   const translateCategory = (value) =>
//     categoryLabels[value]
//       ? t(`gallery.${categoryLabels[value]}`)
//       : value;

//   /* =======================================================
//      UI
//   ======================================================= */

//   return (
//     <>
//       {/* ===================================================
//           GALLERY SECTION
//       =================================================== */}

//       <section className="bg-white py-16 lg:py-20">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">

//           {/* =================================================
//               HEADER
//           ================================================= */}

//           <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

//             <div className="max-w-2xl">

//               <span className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
//                 {t("gallery.pageTitle")}
//               </span>

//               <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
//                 {t("gallery.momentsTitle")}
//               </h2>

//               <p className="mt-4 leading-8 text-gray-600">
//                 {t("gallery.momentsSubtitle")}
//               </p>

//             </div>

//             {/* =================================================
//                 PHOTO / VIDEO SWITCH
//             ================================================= */}

//             <div className="flex w-fit rounded-full bg-slate-100 p-1">

//               <button
//                 type="button"
//                 onClick={() =>
//                   changeType("photo")
//                 }
//                 className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
//                   type === "photo"
//                     ? "bg-orange-600 text-white shadow"
//                     : "text-slate-600 hover:text-orange-600"
//                 }`}
//               >
//                 {t("gallery.photos")}
//               </button>

//               <button
//                 type="button"
//                 onClick={() =>
//                   changeType("video")
//                 }
//                 className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
//                   type === "video"
//                     ? "bg-orange-600 text-white shadow"
//                     : "text-slate-600 hover:text-orange-600"
//                 }`}
//               >
//                 {t("gallery.videos")}
//               </button>

//             </div>

//           </div>

//           {/* =================================================
//               CATEGORIES
//           ================================================= */}

//           <div className="mt-10 flex flex-wrap gap-3">

//             {categories.map(
//               (item) => (
//                 <button
//                   key={item}
//                   type="button"
//                   onClick={() =>
//                     setCategory(item)
//                   }
//                   className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
//                     category === item
//                       ? "border-orange-600 bg-orange-600 text-white"
//                       : "border-slate-200 bg-white text-slate-600 hover:border-orange-500 hover:text-orange-600"
//                   }`}
//                 >
//                   {translateCategory(item)}
//                 </button>
//               )
//             )}

//           </div>

//           {/* =================================================
//               LOADING
//           ================================================= */}

//           {isLoading && (
//             <div className="mt-12 flex min-h-[250px] items-center justify-center">

//               <div className="text-center">

//                 <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-600" />

//                 <p className="text-sm text-gray-500">
//                   {type === "photo"
//                     ? t("common.loading")
//                     : t("common.loading")}
//                 </p>

//               </div>

//             </div>
//           )}

//           {/* =================================================
//               ERROR
//           ================================================= */}

//           {!isLoading &&
//             currentError && (
//               <div className="mt-10 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">

//                 <p className="text-yellow-700">
//                   {currentError}
//                 </p>

//                 <p className="mt-2 text-sm text-yellow-600">
//                   Existing gallery photos are
//                   still being displayed.
//                 </p>

//                 <button
//                   type="button"
//                   onClick={
//                     loadPhotos
//                   }
//                   className="mt-4 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
//                 >
//                   {t("common.tryAgain", "Try Again")}
//                 </button>

//               </div>
//             )}

//           {/* =================================================
//               PHOTO COUNT

//               Helpful for checking whether all images
//               are actually being returned.
//           ================================================= */}

//           {!isLoading &&
//             type === "photo" && (
//               <div className="mt-8 text-sm text-gray-500">
//                 {t("gallery.showing")} {" "}
//                 <span className="font-semibold text-gray-800">
//                   {filteredItems.length}
//                 </span>{" "}
//                 {filteredItems.length !== 1 ? t("gallery.photos") : t("gallery.photo")}
//                 {category !==
//                   "All" &&
//                   ` ${t("gallery.inCategory")} ${translateCategory(category)}`}
//               </div>
//             )}

//           {/* =================================================
//               GALLERY GRID
//           ================================================= */}

//           {!isLoading &&
//             filteredItems.length >
//               0 && (

//               <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

//                 {filteredItems.map(
//                   (
//                     item,
//                     index
//                   ) => {

//                     /* ---------------------------------------
//                        VIDEO CHECK
//                     --------------------------------------- */

//                     const video =
//                       item.type ===
//                       "video";

//                     const youtube =
//                       video &&
//                       isYoutube(
//                         item.videoUrl
//                       );

//                     const localVideo =
//                       video &&
//                       item.videoUrl &&
//                       !youtube;

//                     const featured =
//                       index === 0;

//                     /* ---------------------------------------
//                        THUMBNAIL
//                     --------------------------------------- */

//                     const thumbnail =
//                       item.thumbnailUrl
//                         ? getImageUrl(
//                             item.thumbnailUrl
//                           )
//                         : (youtube
//                             ? youtubeThumbnail(
//                                 item.videoUrl
//                               )
//                             : "");

//                     return (
//                       <article
//                         key={`${item.type}-${item.id}`}
//                         className={`group relative overflow-hidden rounded-3xl bg-black ${
//                           featured
//                             ? "md:col-span-2 md:row-span-2"
//                             : ""
//                         }`}
//                       >

//                         {/* =================================
//                             LOCAL VIDEO
//                         ================================= */}

//                         {localVideo ? (
//                           <div className="bg-black">

//                             <video
//                               key={
//                                 item.videoUrl
//                               }
//                               src={
//                                 getVideoUrl(
//                                   item.videoUrl
//                                 )
//                               }
//                               controls
//                               playsInline
//                               preload="metadata"
//                               poster={
//                                 thumbnail ||
//                                 undefined
//                               }
//                               className={`block w-full bg-black object-contain ${
//                                 featured
//                                   ? "h-[300px] md:h-[520px]"
//                                   : "h-[220px] md:h-[250px]"
//                               }`}
//                               onError={(
//                                 event
//                               ) => {
//                                 console.error(
//                                   "VIDEO ERROR:",
//                                   getVideoUrl(
//                                     item.videoUrl
//                                   ),
//                                   event
//                                 );
//                               }}
//                             />

//                             <div className="bg-slate-950 px-4 py-4">

//                               <p className="text-base font-semibold text-white">
//                                 {
//                                   item.title
//                                 }
//                               </p>

//                               <p className="mt-1 text-sm text-white/60">
//                                 {
//                                   item.category
//                                 }
//                               </p>

//                               {item.description && (
//                                 <p className="mt-2 text-sm leading-6 text-white/70">
//                                   {
//                                     item.description
//                                   }
//                                 </p>
//                               )}

//                             </div>

//                           </div>
//                         ) : (
//                           <>
//                             {/* =============================
//                                 PHOTO / YOUTUBE IMAGE
//                             ============================== */}

//                             <img
//                               src={
//                                 item.type ===
//                                 "photo"
//                                   ? getImageUrl(
//                                       item.image
//                                     )
//                                   : thumbnail ||
//                                     "/gallery12/placeholder.png"
//                               }
//                               alt={
//                                 item.title ||
//                                 "Gallery item"
//                               }
//                               loading="lazy"
//                               onClick={() => {

//                                 /* PHOTO */

//                                 if (
//                                   item.type ===
//                                   "photo"
//                                 ) {
//                                   setSelectedImage(
//                                     getImageUrl(
//                                       item.image
//                                     )
//                                   );
//                                 }

//                                 /* YOUTUBE */

//                                 if (
//                                   youtube
//                                 ) {
//                                   window.open(
//                                     item.videoUrl,
//                                     "_blank",
//                                     "noopener,noreferrer"
//                                   );
//                                 }
//                               }}
//                               onError={(
//                                 event
//                               ) => {
//                                 console.error(
//                                   "IMAGE LOAD ERROR:",
//                                   item.image
//                                 );

//                                 /*
//                                   Try to use cached base64 image first,
//                                   then fall back to static gallery images
//                                   when backend images fail to load
//                                 */

//                                 // Try to get embedded cached base64 image first
//                                 if (item._cachedImageBase64) {
//                                   console.log(
//                                     "Using cached gallery image for:",
//                                     item.id
//                                   );
//                                   event.currentTarget.src = 
//                                     item._cachedImageBase64;
//                                   return;
//                                 }

//                                 // Fall back to static gallery images
//                                 const fallbackImages = [
//                                   "/gallery12/1.png",
//                                   "/gallery12/2.png",
//                                   "/gallery12/3.png",
//                                   "/gallery12/4.png",
//                                   "/gallery12/5.png",
//                                   "/gallery12/6.png",
//                                   "/gallery12/7.png",
//                                   "/gallery12/8.png",
//                                   "/gallery12/9.png",
//                                   "/gallery12/10.png",
//                                   "/gallery12/11.png",
//                                   "/gallery12/12.png",
//                                 ];

//                                 const randomFallback = 
//                                   fallbackImages[
//                                     Math.floor(
//                                       Math.random() * 
//                                       fallbackImages.length
//                                     )
//                                   ];

//                                 event.currentTarget.src = 
//                                   randomFallback;
//                               }}
//                               onLoad={(
//                                 event
//                               ) => {
//                                 // No caching needed in onLoad since we embed during fetch
//                               }}
//                               className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
//                                 item.type ===
//                                 "photo"
//                                   ? "cursor-pointer"
//                                   : ""
//                               } ${
//                                 featured
//                                   ? "h-[300px] md:h-[520px]"
//                                   : "h-[220px] md:h-[250px]"
//                               }`}
//                             />

//                             {/* =============================
//                                 PHOTO OVERLAY
//                             ============================== */}

//                             {item.type ===
//                               "photo" && (
//                               <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100">

//                                 <div className="absolute bottom-0 left-0 right-0 p-6">

//                                   <p className="text-lg font-semibold text-white">
//                                     {
//                                       item.title
//                                     }
//                                   </p>

//                                   <p className="mt-1 text-sm text-white/70">
//                                     {
//                                       item.category
//                                     }
//                                   </p>

//                                   {item.caption && (
//                                     <p className="mt-2 text-sm text-white/70">
//                                       {
//                                         item.caption
//                                       }
//                                     </p>
//                                   )}

//                                 </div>

//                               </div>
//                             )}

//                             {/* =============================
//                                 YOUTUBE PLAY
//                             ============================== */}

//                             {youtube && (
//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   window.open(
//                                     item.videoUrl,
//                                     "_blank",
//                                     "noopener,noreferrer"
//                                   )
//                                 }
//                                 className="absolute inset-0 flex items-center justify-center"
//                                 aria-label={`Play ${item.title}`}
//                               >

//                                 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl transition hover:scale-110">

//                                   <Play
//                                     size={22}
//                                     className="ml-1 text-orange-600"
//                                     fill="currentColor"
//                                   />

//                                 </div>

//                               </button>
//                             )}

//                           </>
//                         )}

//                       </article>
//                     );
//                   }
//                 )}

//               </div>
//             )}

//           {/* =================================================
//               NO RESULTS
//           ================================================= */}

//           {!isLoading &&
//             !currentError &&
//             filteredItems.length ===
//               0 && (
//               <div className="mt-12 rounded-3xl border border-slate-100 bg-slate-50 py-20 text-center">

//                 <p className="text-gray-500">
//                   {t(type === "photo" ? "gallery.noPhotosFound" : "gallery.noVideosFound")}
//                 </p>

//               </div>
//             )}

//         </div>
//       </section>

//       {/* ===================================================
//           PHOTO LIGHTBOX
//       =================================================== */}

//       {selectedImage && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5"
//           onClick={() =>
//             setSelectedImage(null)
//           }
//         >

//           {/* CLOSE */}

//           <button
//             type="button"
//             onClick={() =>
//               setSelectedImage(null)
//             }
//             className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
//             aria-label="Close image"
//           >
//             <X size={24} />
//           </button>

//           {/* IMAGE */}

//           <img
//             src={selectedImage}
//             alt="Gallery preview"
//             onClick={(event) =>
//               event.stopPropagation()
//             }
//             className="max-h-[90vh] max-w-full rounded-xl object-contain"
//           />

//         </div>
//       )}
//     </>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import { Play, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../config";

/* =========================================================
   API CONFIGURATION
========================================================= */

const BASE_URL = String(API_BASE_URL || "").replace(/\/+$/, "");

const PHOTO_API_URL = `${BASE_URL}/api/gallery`;
const VIDEO_API_URL = `${BASE_URL}/api/videos`;

/* =========================================================
   CACHE CONFIGURATION
========================================================= */

/*
 * IMPORTANT:
 *
 * Backend/PostgreSQL is the source of truth when online.
 *
 * Photos:
 *   - Metadata -> localStorage
 *   - Actual image files -> Cache Storage
 *
 * Videos:
 *   - Metadata -> localStorage
 *   - Actual LOCAL video files -> Cache Storage
 *
 * YouTube videos cannot be played fully offline because
 * YouTube itself must be reachable. Their metadata can still
 * be remembered, but local uploaded videos are cached and
 * played offline.
 *
 * v4/v2 are intentionally versioned so old cache data is not
 * mixed with the new offline implementation.
 */

const PHOTO_CACHE_KEY = "gallery_photos_cache_v4";
const PHOTO_IMAGE_CACHE_NAME = "gallery-photo-images-v4";

const VIDEO_CACHE_KEY = "gallery_videos_cache_v2";
const VIDEO_FILE_CACHE_NAME = "gallery-video-files-v2";

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  "All",
  "Public Events",
  "Constituency",
  "Meetings",
  "Events",
];

/* =========================================================
   YOUTUBE CHECK
========================================================= */

function isYoutube(url) {
  if (!url) return false;

  const value = String(url).toLowerCase();

  return (
    value.includes("youtube.com") ||
    value.includes("youtu.be")
  );
}

/* =========================================================
   YOUTUBE THUMBNAIL
========================================================= */

function youtubeThumbnail(url) {
  if (!url) return "";

  const match = String(url).match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
  );

  if (!match) return "";

  return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
}

/* =========================================================
   IMAGE URL HELPER
========================================================= */

function getImageUrl(imagePath) {
  if (!imagePath) return "";

  let cleanPath = String(imagePath).trim();

  if (!cleanPath) return "";

  if (
    cleanPath.startsWith("data:") ||
    cleanPath.startsWith("blob:")
  ) {
    return cleanPath;
  }

  if (
    cleanPath.startsWith("http://") ||
    cleanPath.startsWith("https://")
  ) {
    try {
      const url = new URL(cleanPath);

      if (
        url.hostname === "localhost" ||
        url.hostname === "127.0.0.1"
      ) {
        cleanPath = url.pathname;
      } else {
        return cleanPath;
      }
    } catch {
      return cleanPath;
    }
  }

  cleanPath = cleanPath.replace(/\\/g, "/");

  if (
    cleanPath.startsWith("/gallery/") ||
    cleanPath.startsWith("/gallery12/") ||
    cleanPath.startsWith("/images/")
  ) {
    return cleanPath;
  }

  if (!cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
  }

  return `${BASE_URL}${cleanPath}`;
}

/* =========================================================
   VIDEO URL HELPER
========================================================= */

function getVideoUrl(videoPath) {
  if (!videoPath) return "";

  const cleanPath = String(videoPath).trim();

  if (!cleanPath) return "";

  /*
   * IMPORTANT:
   * Do not convert Blob URLs into backend URLs.
   * Blob URLs are used for offline playback.
   */

  if (
    cleanPath.startsWith("blob:") ||
    cleanPath.startsWith("data:")
  ) {
    return cleanPath;
  }

  if (
    cleanPath.startsWith("http://") ||
    cleanPath.startsWith("https://")
  ) {
    return cleanPath;
  }

  return `${BASE_URL}${
    cleanPath.startsWith("/") ? "" : "/"
  }${cleanPath}`;
}

/* =========================================================
   REMOVE QUERY FROM CACHE URL
========================================================= */

function getCacheUrl(url) {
  if (!url) return "";

  try {
    const parsed = new URL(
      url,
      window.location.origin
    );

    parsed.search = "";
    parsed.hash = "";

    return parsed.toString();
  } catch {
    return url;
  }
}

/* =========================================================
   CACHE-BUST IMAGE URL
========================================================= */

function getFreshImageUrl(imageUrl, updatedAt = "") {
  if (!imageUrl) return "";

  if (
    imageUrl.startsWith("data:") ||
    imageUrl.startsWith("blob:")
  ) {
    return imageUrl;
  }

  if (
    imageUrl.startsWith("/gallery/") ||
    imageUrl.startsWith("/gallery12/") ||
    imageUrl.startsWith("/images/")
  ) {
    return imageUrl;
  }

  const separator = imageUrl.includes("?")
    ? "&"
    : "?";

  return `${imageUrl}${separator}v=${
    updatedAt || Date.now()
  }`;
}

/* =========================================================
   GET CACHED PHOTO METADATA
========================================================= */

function getCachedPhotos() {
  try {
    const saved = localStorage.getItem(
      PHOTO_CACHE_KEY
    );

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (photo) =>
        photo &&
        photo.isStatic !== true &&
        photo.image
    );
  } catch (error) {
    console.warn(
      "PHOTO CACHE METADATA ERROR:",
      error
    );

    return [];
  }
}

/* =========================================================
   SAVE PHOTO METADATA
========================================================= */

function savePhotoCache(photos) {
  try {
    const backendPhotos = Array.isArray(photos)
      ? photos.filter(
          (photo) =>
            photo &&
            photo.isStatic !== true
        )
      : [];

    localStorage.setItem(
      PHOTO_CACHE_KEY,
      JSON.stringify(backendPhotos)
    );

    console.log(
      "PHOTO METADATA CACHE SAVED:",
      backendPhotos.length
    );
  } catch (error) {
    console.warn(
      "PHOTO METADATA CACHE SAVE ERROR:",
      error
    );
  }
}

/* =========================================================
   CACHE ACTUAL PHOTO IMAGE
========================================================= */

async function cachePhotoImage(photo) {
  if (!photo?.image) return;

  if (
    typeof window === "undefined" ||
    !("caches" in window)
  ) {
    return;
  }

  try {
    const imageUrl = getImageUrl(
      photo.image_path || photo.image
    );

    if (!imageUrl) return;

    const cacheUrl = getCacheUrl(imageUrl);

    const cache = await caches.open(
      PHOTO_IMAGE_CACHE_NAME
    );

    /*
     * Always fetch the latest version.
     * This is important when admin replaces an image
     * using the same filename/path.
     */

    const response = await fetch(imageUrl, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(
        "IMAGE CACHE FETCH FAILED:",
        response.status,
        imageUrl
      );
      return;
    }

    await cache.put(
      cacheUrl,
      response.clone()
    );

    console.log(
      "IMAGE CACHED:",
      cacheUrl
    );
  } catch (error) {
    console.warn(
      "IMAGE CACHE ERROR:",
      photo.id,
      error
    );
  }
}

/* =========================================================
   CACHE ALL PHOTO IMAGES
========================================================= */

async function cacheAllPhotoImages(photos) {
  if (
    !Array.isArray(photos) ||
    photos.length === 0
  ) {
    return;
  }

  let cachedCount = 0;

  await Promise.all(
    photos.map(async (photo) => {
      await cachePhotoImage(photo);
      cachedCount += 1;
    })
  );

  console.log(
    `PHOTO IMAGE CACHE COMPLETE: ${cachedCount}/${photos.length}`
  );
}

/* =========================================================
   GET ONE PHOTO FROM CACHE
========================================================= */

async function getCachedPhotoImage(imageUrl) {
  if (
    !imageUrl ||
    typeof window === "undefined" ||
    !("caches" in window)
  ) {
    return "";
  }

  try {
    const cache = await caches.open(
      PHOTO_IMAGE_CACHE_NAME
    );

    const cacheUrl = getCacheUrl(imageUrl);

    const cachedResponse =
      await cache.match(cacheUrl);

    if (!cachedResponse) {
      return "";
    }

    const blob =
      await cachedResponse.blob();

    return URL.createObjectURL(blob);
  } catch (error) {
    console.warn(
      "GET CACHED IMAGE ERROR:",
      error
    );

    return "";
  }
}

/* =========================================================
   HYDRATE CACHED PHOTOS
========================================================= */

async function hydrateCachedPhotos(cachedPhotos) {
  if (
    !Array.isArray(cachedPhotos) ||
    cachedPhotos.length === 0
  ) {
    return [];
  }

  const hydrated = await Promise.all(
    cachedPhotos.map(async (photo) => {
      if (!photo?.image) return null;

      const originalUrl = getImageUrl(
        photo.image_path || photo.image
      );

      const cachedImage =
        await getCachedPhotoImage(
          originalUrl
        );

      if (!cachedImage) {
        return null;
      }

      return {
        ...photo,
        image: cachedImage,
        _offlineCached: true,
      };
    })
  );

  return hydrated.filter(Boolean);
}

/* =========================================================
   GET CACHED VIDEO METADATA
========================================================= */

function getCachedVideos() {
  try {
    const saved = localStorage.getItem(
      VIDEO_CACHE_KEY
    );

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch (error) {
    console.warn(
      "VIDEO CACHE METADATA ERROR:",
      error
    );

    return [];
  }
}

/* =========================================================
   SAVE VIDEO METADATA
========================================================= */

function saveVideoCache(videos) {
  try {
    const backendVideos = Array.isArray(videos)
      ? videos
      : [];

    localStorage.setItem(
      VIDEO_CACHE_KEY,
      JSON.stringify(backendVideos)
    );

    console.log(
      "VIDEO METADATA CACHE SAVED:",
      backendVideos.length
    );
  } catch (error) {
    console.warn(
      "VIDEO METADATA CACHE SAVE ERROR:",
      error
    );
  }
}

/* =========================================================
   CACHE ONE LOCAL VIDEO FILE
========================================================= */

async function cacheVideoFile(video) {
  if (!video?.videoUrl) {
    return false;
  }

  /*
   * YouTube videos cannot be downloaded/cached here
   * for offline YouTube playback.
   */

  if (isYoutube(video.videoUrl)) {
    console.log(
      "YOUTUBE VIDEO - FILE CACHE SKIPPED:",
      video.videoUrl
    );

    return false;
  }

  if (
    typeof window === "undefined" ||
    !("caches" in window)
  ) {
    console.warn(
      "Browser Cache Storage is not available."
    );

    return false;
  }

  try {
    const videoUrl = getVideoUrl(
      video.videoUrl
    );

    if (!videoUrl) return false;

    const cacheUrl =
      getCacheUrl(videoUrl);

    const cache = await caches.open(
      VIDEO_FILE_CACHE_NAME
    );

    /*
     * Always fetch the latest backend video.
     * Do not rely on an old cached file.
     */

    const response = await fetch(videoUrl, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(
        "VIDEO CACHE FETCH FAILED:",
        response.status,
        videoUrl
      );

      return false;
    }

    await cache.put(
      cacheUrl,
      response.clone()
    );

    console.log(
      "VIDEO FILE CACHED:",
      cacheUrl
    );

    return true;
  } catch (error) {
    console.warn(
      "VIDEO FILE CACHE ERROR:",
      video.id,
      error
    );

    return false;
  }
}

/* =========================================================
   CACHE ALL LOCAL VIDEOS
========================================================= */

async function cacheAllVideoFiles(videos) {
  if (
    !Array.isArray(videos) ||
    videos.length === 0
  ) {
    return {
      totalLocal: 0,
      cached: 0,
    };
  }

  const localVideos = videos.filter(
    (video) =>
      video?.videoUrl &&
      !isYoutube(video.videoUrl)
  );

  console.log(
    "LOCAL VIDEOS TO CACHE:",
    localVideos.length
  );

  const results = await Promise.all(
    localVideos.map((video) =>
      cacheVideoFile(video)
    )
  );

  const cached = results.filter(Boolean).length;

  console.log(
    `VIDEO FILE CACHE COMPLETE: ${cached}/${localVideos.length}`
  );

  return {
    totalLocal: localVideos.length,
    cached,
  };
}

/* =========================================================
   GET ONE LOCAL VIDEO FROM CACHE
========================================================= */

async function getCachedVideoFile(videoUrl) {
  if (
    !videoUrl ||
    typeof window === "undefined" ||
    !("caches" in window)
  ) {
    return "";
  }

  try {
    const cache = await caches.open(
      VIDEO_FILE_CACHE_NAME
    );

    const cacheUrl =
      getCacheUrl(
        getVideoUrl(videoUrl)
      );

    const cachedResponse =
      await cache.match(cacheUrl);

    if (!cachedResponse) {
      console.warn(
        "NO CACHED VIDEO FILE FOUND:",
        cacheUrl
      );

      return "";
    }

    const blob =
      await cachedResponse.blob();

    const blobUrl =
      URL.createObjectURL(blob);

    console.log(
      "OFFLINE VIDEO FILE LOADED:",
      cacheUrl
    );

    return blobUrl;
  } catch (error) {
    console.warn(
      "GET CACHED VIDEO ERROR:",
      error
    );

    return "";
  }
}

/* =========================================================
   HYDRATE CACHED VIDEOS
========================================================= */

async function hydrateCachedVideos(
  cachedVideos
) {
  if (
    !Array.isArray(cachedVideos) ||
    cachedVideos.length === 0
  ) {
    return [];
  }

  const hydrated =
    await Promise.all(
      cachedVideos.map(
        async (video) => {
          if (!video?.videoUrl) {
            return null;
          }

          /*
           * YouTube metadata can remain visible,
           * but YouTube playback itself requires internet.
           */

          if (
            isYoutube(
              video.videoUrl
            )
          ) {
            return {
              ...video,
              _offlineYoutube: true,
            };
          }

          const cachedVideo =
            await getCachedVideoFile(
              video.videoUrl
            );

          /*
           * Do not display a local video if its actual
           * file was not cached. This prevents the UI from
           * showing a 0:00 broken player offline.
           */

          if (!cachedVideo) {
            return null;
          }

          return {
            ...video,
            videoUrl: cachedVideo,
            _offlineCached: true,
          };
        }
      )
    );

  return hydrated.filter(Boolean);
}

/* =========================================================
   GALLERY COMPONENT
========================================================= */

export default function Gallery() {
  const { i18n, t } =
    useTranslation();

  /* =======================================================
     TYPE
  ======================================================= */

  const [type, setType] =
    useState("photo");

  /* =======================================================
     CATEGORY
  ======================================================= */

  const [category, setCategory] =
    useState("All");

  /* =======================================================
     LIGHTBOX
  ======================================================= */

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(null);

  /* =======================================================
     PHOTOS
  ======================================================= */

  const [photos, setPhotos] =
    useState(() => {
      const cached =
        getCachedPhotos();

      console.log(
        "INITIAL CACHED PHOTO METADATA COUNT:",
        cached.length
      );

      return cached;
    });

  const [
    loadingPhotos,
    setLoadingPhotos,
  ] = useState(false);

  const [
    photoError,
    setPhotoError,
  ] = useState("");

  const [
    usingPhotoCache,
    setUsingPhotoCache,
  ] = useState(false);

  /* =======================================================
     VIDEOS
  ======================================================= */

  const [videos, setVideos] =
    useState(() => {
      /*
       * Do NOT use hardcoded/static videos.
       *
       * Backend data is the source of truth.
       * If backend is unavailable, cached DB data is used.
       */

      return getCachedVideos();
    });

  const [
    loadingVideos,
    setLoadingVideos,
  ] = useState(false);

  const [
    usingVideoCache,
    setUsingVideoCache,
  ] = useState(false);

  /* =======================================================
     LOAD PHOTOS
  ======================================================= */

  async function loadPhotos() {
    const language =
      i18n.language?.startsWith("te")
        ? "te"
        : "en";

    try {
      setLoadingPhotos(true);
      setPhotoError("");

      const response =
        await fetch(
          `${PHOTO_API_URL}?lang=${language}&t=${Date.now()}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

      const text =
        await response.text();

      let result;

      try {
        result =
          JSON.parse(text);
      } catch {
        throw new Error(
          "Invalid gallery response."
        );
      }

      if (!response.ok) {
        throw new Error(
          result?.message ||
            `Server returned ${response.status}`
        );
      }

      const galleryData =
        Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
          ? result.data
          : [];

      console.log(
        "DATABASE PHOTO COUNT:",
        galleryData.length
      );

      const formattedPhotos =
        galleryData
          .map(
            (item, index) => {
              const originalImagePath =
                item.image_path ||
                item.image ||
                item.image_url ||
                item.photo ||
                item.photo_url ||
                "";

              const baseImageUrl =
                getImageUrl(
                  originalImagePath
                );

              return {
                id:
                  item.id ??
                  `backend-photo-${index}`,

                type: "photo",

                category:
                  item.category ||
                  item.section ||
                  "Public Events",

                image_path:
                  originalImagePath,

                image:
                  getFreshImageUrl(
                    baseImageUrl,
                    item.updated_at ||
                      item.updatedAt ||
                      item.created_at ||
                      Date.now()
                  ),

                title:
                  item.title ||
                  "Public Service",

                caption:
                  item.caption ||
                  item.description ||
                  "",

                created_at:
                  item.created_at ||
                  "",

                updated_at:
                  item.updated_at ||
                  "",

                display_order:
                  item.display_order ??
                  index,

                isStatic: false,
              };
            }
          )
          .filter(
            (item) => item.image
          );

      /*
       * Backend response completely replaces the old list.
       * No merge with old photos.
       * No gallery12.
       * No static photos.
       */

      setPhotos(
        formattedPhotos
      );

      setUsingPhotoCache(false);
      setPhotoError("");

      /*
       * Save metadata immediately.
       */

      savePhotoCache(
        formattedPhotos
      );

      /*
       * Cache the actual image files.
       */

      cacheAllPhotoImages(
        formattedPhotos
      ).catch(
        (error) =>
          console.warn(
            "BACKGROUND PHOTO CACHE ERROR:",
            error
          )
      );
    } catch (error) {
      /*
       * Backend is unavailable.
       * Silently use the last successful cache.
       *
       * No visible "Failed to fetch" notification.
       */

      console.warn(
        "PHOTO BACKEND UNAVAILABLE - USING CACHE"
      );

      const cachedPhotos =
        getCachedPhotos();

      if (
        cachedPhotos.length > 0
      ) {
        const hydratedPhotos =
          await hydrateCachedPhotos(
            cachedPhotos
          );

        /*
         * Only display actual cached files.
         */

        setPhotos(
          hydratedPhotos
        );

        setUsingPhotoCache(
          true
        );

        setPhotoError("");
      } else {
        setPhotos([]);
        setUsingPhotoCache(
          false
        );

        /*
         * Keep the error invisible.
         */

        setPhotoError("");
      }
    } finally {
      setLoadingPhotos(
        false
      );
    }
  }

  /* =======================================================
     LOAD VIDEOS
  ======================================================= */

  async function loadVideos() {
    try {
      setLoadingVideos(true);

      const language =
        i18n.language?.startsWith("te")
          ? "te"
          : "en";

      const response =
        await fetch(
          `${VIDEO_API_URL}?lang=${language}&t=${Date.now()}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

      const text =
        await response.text();

      let result;

      try {
        result =
          JSON.parse(text);
      } catch {
        throw new Error(
          "Invalid video response."
        );
      }

      if (!response.ok) {
        throw new Error(
          result?.message ||
            `Server returned ${response.status}`
        );
      }

      const videoData =
        Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
          ? result.data
          : [];

      /*
       * Backend is the source of truth.
       * Whatever the backend returns becomes the latest list.
       */

      const latestVideos =
        videoData
          .map(
            (item, index) => ({
              id:
                item.id ??
                `video-${index}`,

              type: "video",

              category:
                item.category ||
                "Video",

              title:
                item.title ||
                "Video",

              description:
                item.description ||
                "",

              videoUrl:
                item.video_url ||
                item.videoUrl ||
                item.url ||
                "",

              thumbnailUrl:
                item.thumbnail_url ||
                item.thumbnailUrl ||
                "",

              link:
                item.link ||
                "",

              publishedDate:
                item.published_date ||
                "",

              display_order:
                item.display_order ??
                index,

              created_at:
                item.created_at ||
                "",

              updated_at:
                item.updated_at ||
                "",
            })
          )
          .filter(
            (video) =>
              video.videoUrl
          );

      /*
       * Keep backend ordering.
       */

      latestVideos.sort(
        (a, b) =>
          Number(
            a.display_order ?? 0
          ) -
          Number(
            b.display_order ?? 0
          )
      );

      setVideos(
        latestVideos
      );

      setUsingVideoCache(
        false
      );

      /*
       * Save the latest DB metadata.
       */

      saveVideoCache(
        latestVideos
      );

      /*
       * IMPORTANT:
       *
       * Wait for local video files to be cached.
       *
       * This means when this function completes,
       * the latest local backend videos have been downloaded
       * to Cache Storage and can be used when backend stops.
       */

      await cacheAllVideoFiles(
        latestVideos
      );
    } catch (error) {
      /*
       * Backend unavailable.
       *
       * DO NOT show "Failed to fetch".
       * Use the last successful cached database data.
       */

      console.warn(
        "VIDEO BACKEND UNAVAILABLE - USING CACHE"
      );

      const cachedVideos =
        getCachedVideos();

      if (
        cachedVideos.length > 0
      ) {
        const hydratedVideos =
          await hydrateCachedVideos(
            cachedVideos
          );

        setVideos(
          hydratedVideos
        );

        setUsingVideoCache(
          true
        );
      } else {
        /*
         * No backend and no cache.
         * Empty state only.
         *
         * No hardcoded videos.
         */

        setVideos([]);
        setUsingVideoCache(
          false
        );
      }
    } finally {
      setLoadingVideos(
        false
      );
    }
  }

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    loadPhotos();
    loadVideos();

    /*
     * eslint-disable-next-line react-hooks/exhaustive-deps
     */
  }, [i18n.language]);

  /* =======================================================
     REFRESH WHEN ADMIN CHANGES GALLERY
  ======================================================= */

  useEffect(() => {
    function refreshPhotos() {
      loadPhotos();
    }

    function refreshVideos() {
      loadVideos();
    }

    function refreshEverything() {
      loadPhotos();
      loadVideos();
    }

    window.addEventListener(
      "gallery-updated",
      refreshPhotos
    );

    window.addEventListener(
      "videos-updated",
      refreshVideos
    );

    window.addEventListener(
      "focus",
      refreshEverything
    );

    return () => {
      window.removeEventListener(
        "gallery-updated",
        refreshPhotos
      );

      window.removeEventListener(
        "videos-updated",
        refreshVideos
      );

      window.removeEventListener(
        "focus",
        refreshEverything
      );
    };

    /*
     * eslint-disable-next-line react-hooks/exhaustive-deps
     */
  }, []);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredItems =
    useMemo(() => {
      const currentItems =
        type === "photo"
          ? photos
          : videos;

      return currentItems.filter(
        (item) => {
          const itemCategory =
            String(
              item.category || ""
            )
              .trim()
              .toLowerCase();

          const selectedCategory =
            String(category)
              .trim()
              .toLowerCase();

          return (
            category === "All" ||
            itemCategory ===
              selectedCategory
          );
        }
      );
    }, [
      type,
      category,
      photos,
      videos,
    ]);

  /* =======================================================
     CHANGE TYPE
  ======================================================= */

  function changeType(newType) {
    setType(newType);
    setCategory("All");

    if (
      newType === "photo"
    ) {
      loadPhotos();
    }

    if (
      newType === "video"
    ) {
      loadVideos();
    }
  }

  /* =======================================================
     LOADING
  ======================================================= */

  const isLoading =
    type === "photo"
      ? loadingPhotos
      : loadingVideos;

  /* =======================================================
     CATEGORY TRANSLATION
  ======================================================= */

  const categoryLabels = {
    All: "all",
    "Public Events":
      "publicEvents",
    Constituency:
      "constituency",
    Meetings:
      "meetings",
    Events: "events",
  };

  const translateCategory =
    (value) =>
      categoryLabels[value]
        ? t(
            `gallery.${categoryLabels[value]}`
          )
        : value;

  /* =======================================================
     UI
  ======================================================= */

  return (
    <>
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* HEADER */}

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-2xl">

              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                {t(
                  "gallery.pageTitle"
                )}
              </span>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                {t(
                  "gallery.momentsTitle"
                )}
              </h2>

              <p className="mt-4 leading-8 text-gray-600">
                {t(
                  "gallery.momentsSubtitle"
                )}
              </p>

            </div>

            {/* PHOTO / VIDEO SWITCH */}

            <div className="flex w-fit rounded-full bg-slate-100 p-1">

              <button
                type="button"
                onClick={() =>
                  changeType(
                    "photo"
                  )
                }
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                  type === "photo"
                    ? "bg-orange-600 text-white shadow"
                    : "text-slate-600 hover:text-orange-600"
                }`}
              >
                {t(
                  "gallery.photos"
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  changeType(
                    "video"
                  )
                }
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                  type === "video"
                    ? "bg-orange-600 text-white shadow"
                    : "text-slate-600 hover:text-orange-600"
                }`}
              >
                {t(
                  "gallery.videos"
                )}
              </button>

            </div>

          </div>

          {/* CATEGORIES */}

          <div className="mt-10 flex flex-wrap gap-3">

            {categories.map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setCategory(
                      item
                    )
                  }
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                    category === item
                      ? "border-orange-600 bg-orange-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-orange-500 hover:text-orange-600"
                  }`}
                >
                  {translateCategory(
                    item
                  )}
                </button>
              )
            )}

          </div>

          {/* LOADING */}

          {isLoading && (
            <div className="mt-12 flex min-h-[250px] items-center justify-center">
              <div className="text-center">

                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-600" />

                <p className="text-sm text-gray-500">
                  {t(
                    "common.loading"
                  )}
                </p>

              </div>
            </div>
          )}

          {/* PHOTO CACHE STATUS */}

          {!isLoading &&
            type === "photo" &&
            usingPhotoCache &&
            filteredItems.length >
              0 && (
              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                <p className="text-sm text-blue-700">
                </p>
              </div>
            )}

          {/* VIDEO CACHE STATUS */}

          {!isLoading &&
            type === "video" &&
            usingVideoCache &&
            filteredItems.length >
              0 && (
              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                <p className="text-sm text-blue-700">
               
                </p>
              </div>
            )}

          {/* PHOTO COUNT */}

          {!isLoading &&
            type === "photo" && (
              <div className="mt-8 text-sm text-gray-500">

                {t(
                  "gallery.showing"
                )}{" "}

                <span className="font-semibold text-gray-800">
                  {
                    filteredItems.length
                  }
                </span>{" "}

                {filteredItems.length !==
                1
                  ? t(
                      "gallery.photos"
                    )
                  : t(
                      "gallery.photo"
                    )}

                {category !==
                  "All" &&
                  ` ${t(
                    "gallery.inCategory"
                  )} ${translateCategory(
                    category
                  )}`}

              </div>
            )}

          {/* GALLERY GRID */}

          {!isLoading &&
            filteredItems.length >
              0 && (
              <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

                {filteredItems.map(
                  (
                    item,
                    index
                  ) => {

                    const video =
                      item.type ===
                      "video";

                    const youtube =
                      video &&
                      isYoutube(
                        item.videoUrl
                      );

                    const localVideo =
                      video &&
                      item.videoUrl &&
                      !youtube;

                    const featured =
                      index === 0;

                    const thumbnail =
                      item.thumbnailUrl
                        ? getImageUrl(
                            item.thumbnailUrl
                          )
                        : youtube
                        ? youtubeThumbnail(
                            item.videoUrl
                          )
                        : "";

                    return (
                      <article
                        key={`${item.type}-${item.id}`}
                        className={`group relative overflow-hidden rounded-3xl bg-black ${
                          featured
                            ? "md:col-span-2 md:row-span-2"
                            : ""
                        }`}
                      >

                        {/* LOCAL VIDEO */}

                        {localVideo ? (
                          <div className="bg-black">

                            <video
                              key={
                                item.videoUrl
                              }
                              src={getVideoUrl(
                                item.videoUrl
                              )}
                              controls
                              playsInline
                              preload="metadata"
                              poster={
                                thumbnail ||
                                undefined
                              }
                              className={`block w-full bg-black object-contain ${
                                featured
                                  ? "h-[300px] md:h-[520px]"
                                  : "h-[220px] md:h-[250px]"
                              }`}
                              onError={(
                                event
                              ) => {
                                console.warn(
                                  "VIDEO PLAYBACK ERROR:",
                                  event.currentTarget.error
                                );
                              }}
                            />

                            <div className="bg-slate-950 px-4 py-4">

                              <p className="text-base font-semibold text-white">
                                {
                                  item.title
                                }
                              </p>

                              <p className="mt-1 text-sm text-white/60">
                                {
                                  item.category
                                }
                              </p>

                              {item.description && (
                                <p className="mt-2 text-sm leading-6 text-white/70">
                                  {
                                    item.description
                                  }
                                </p>
                              )}

                              {item._offlineCached && (
                                <p className="mt-2 text-xs font-medium text-green-400">
                                  Available offline
                                </p>
                              )}

                            </div>

                          </div>
                        ) : (
                          <>
                            {/* PHOTO / YOUTUBE IMAGE */}

                            <img
                              src={
                                item.type ===
                                "photo"
                                  ? getImageUrl(
                                      item.image
                                    )
                                  : thumbnail
                              }
                              alt={
                                item.title ||
                                "Gallery item"
                              }
                              loading="lazy"
                              onClick={() => {

                                /* PHOTO */

                                if (
                                  item.type ===
                                  "photo"
                                ) {
                                  const preview =
                                    getImageUrl(
                                      item.image
                                    );

                                  if (
                                    preview
                                  ) {
                                    setSelectedImage(
                                      preview
                                    );
                                  }
                                }

                                /* YOUTUBE */

                                if (
                                  youtube
                                ) {
                                  window.open(
                                    item.videoUrl,
                                    "_blank",
                                    "noopener,noreferrer"
                                  );
                                }

                              }}
                              className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                                item.type ===
                                "photo"
                                  ? "cursor-pointer"
                                  : ""
                              } ${
                                featured
                                  ? "h-[300px] md:h-[520px]"
                                  : "h-[220px] md:h-[250px]"
                              }`}
                              onError={async (
                                event
                              ) => {

                                if (
                                  item.type !==
                                  "photo"
                                ) {
                                  return;
                                }

                                if (
                                  item.image?.startsWith(
                                    "blob:"
                                  )
                                ) {
                                  return;
                                }

                                const originalUrl =
                                  getImageUrl(
                                    item.image_path ||
                                      item.image
                                  );

                                const cachedImage =
                                  await getCachedPhotoImage(
                                    originalUrl
                                  );

                                if (
                                  cachedImage
                                ) {
                                  event.currentTarget.src =
                                    cachedImage;
                                }

                              }}
                            />

                            {/* PHOTO OVERLAY */}

                            {item.type ===
                              "photo" && (
                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100">

                                <div className="absolute bottom-0 left-0 right-0 p-6">

                                  <p className="text-lg font-semibold text-white">
                                    {
                                      item.title
                                    }
                                  </p>

                                  <p className="mt-1 text-sm text-white/70">
                                    {
                                      item.category
                                    }
                                  </p>

                                  {item.caption && (
                                    <p className="mt-2 text-sm text-white/70">
                                      {
                                        item.caption
                                      }
                                    </p>
                                  )}

                                </div>

                              </div>
                            )}

                            {/* YOUTUBE PLAY */}

                            {youtube && (
                              <button
                                type="button"
                                onClick={() =>
                                  window.open(
                                    item.videoUrl,
                                    "_blank",
                                    "noopener,noreferrer"
                                  )
                                }
                                className="absolute inset-0 flex items-center justify-center"
                                aria-label={`Play ${item.title}`}
                              >
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl transition hover:scale-110">

                                  <Play
                                    size={22}
                                    className="ml-1 text-orange-600"
                                    fill="currentColor"
                                  />

                                </div>
                              </button>
                            )}

                            {/* OFFLINE YOUTUBE MESSAGE */}

                            {youtube &&
                              item._offlineYoutube && (
                                <div className="pointer-events-none absolute bottom-3 left-3 right-3 rounded-lg bg-black/70 px-3 py-2 text-center text-xs text-white">
                                  Internet is required to play YouTube videos.
                                </div>
                              )}

                          </>
                        )}

                      </article>
                    );
                  }
                )}

              </div>
            )}

          {/* NO RESULTS */}

          {!isLoading &&
            filteredItems.length ===
              0 && (
              <div className="mt-12 rounded-3xl border border-slate-100 bg-slate-50 py-20 text-center">

                <p className="text-gray-500">
                  {t(
                    type ===
                      "photo"
                      ? "gallery.noPhotosFound"
                      : "gallery.noVideosFound"
                  )}
                </p>

              </div>
            )}

        </div>
      </section>

      {/* PHOTO LIGHTBOX */}

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5"
          onClick={() =>
            setSelectedImage(
              null
            )
          }
        >

          {/* CLOSE */}

          <button
            type="button"
            onClick={() =>
              setSelectedImage(
                null
              )
            }
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close image"
          >
            <X size={24} />
          </button>

          {/* IMAGE */}

          <img
            src={
              selectedImage
            }
            alt="Gallery preview"
            onClick={(event) =>
              event.stopPropagation()
            }
            className="max-h-[90vh] max-w-full rounded-xl object-contain"
          />

        </div>
      )}

    </>
  );
}
