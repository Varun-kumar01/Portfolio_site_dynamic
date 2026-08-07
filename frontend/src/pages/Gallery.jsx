// import { useMemo, useState } from "react";
// import { Play, X } from "lucide-react";

// const galleryItems = [
//   {
//     id: 1,
//     type: "photo",
//     category: "Public Events",
//     image: "/gallery/1.png",
//     title: "Public Meetings",
//   },
//   {
//     id: 2,
//     type: "photo",
//     category: "Meetings",
//     image: "/gallery/2.png",
//     title: "Public Meetings",
//   },
//   {
//     id: 3,
//     type: "photo",
//     category: "Constituency",
//     image: "/gallery/3.png",
//     title: "Public Meetings",
//   },
//   {
//     id: 4,
//     type: "photo",
//     category: "Events",
//     image: "/gallery/4.png",
//     title: "Public Meetings",
//   },
//   {
//     id: 5,
//     type: "photo",
//     category: "Public Events",
//     image: "/gallery/5.png",
//     title: "Public Meetings",
//   },
//   {
//     id: 6,
//     type: "photo",
//     category: "Meetings",
//     image: "/gallery/6.png",
//     title: "Public Meetings",
//   },
//   {
//     id: 7,
//     type: "photo",
//     category: "Public Events",
//     image: "/gallery/7.png",
//     title: "Public Interaction",
//   },
//   {
//     id: 8,
//     type: "photo",
//     category: "Meetings",
//     image: "/gallery/8.png",
//     title: "Official Meeting",
//   },
//   {
//     id: 9,
//     type: "photo",
//     category: "Constituency",
//     image: "/gallery/9.png",
//     title: "Constituency Visit",
//   },
//   {
//     id: 10,
//     type: "photo",
//     category: "Events",
//     image: "/gallery/10.png",
//     title: "Public Programme",
//   },
//   {
//     id: 11,
//     type: "photo",
//     category: "Public Events",
//     image: "/gallery/11.png",
//     title: "Community Interaction",
//   },
//   {
//     id: 12,
//     type: "photo",
//     category: "Meetings",
//     image: "/gallery/12.png",
//     title: "Leadership Meeting",
//   },

//   // Videos
//   {
//     id: 13,
//     type: "video",
//     category: "Public Events",
//     title: "Public Programme",
//     videoUrl: "https://www.youtube.com/watch?v=qFusARwKYPk",
//   },
//   {
//     id: 14,
//     type: "video",
//     category: "Meetings",
//     title: "Public Interaction",
//     videoUrl: "https://www.youtube.com/watch?v=XTZMEkK0F7s",
//   },
// ];

// const categories = [
//   "All",
//   "Public Events",
//   "Constituency",
//   "Meetings",
//   "Events",
// ];

// // Get YouTube thumbnail from video URL
// const getYoutubeThumbnail = (url) => {
//   const match = url.match(
//     /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/
//   );

//   return match
//     ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
//     : "";
// };

// export default function Gallery() {
//   const [type, setType] = useState("photo");
//   const [category, setCategory] = useState("All");
//   const [selectedImage, setSelectedImage] = useState(null);

//   const filteredItems = useMemo(() => {
//     return galleryItems.filter((item) => {
//       const typeMatch = item.type === type;

//       const categoryMatch =
//         category === "All" || item.category === category;

//       return typeMatch && categoryMatch;
//     });
//   }, [type, category]);

//   return (
//     <>
//       {/* Gallery Section */}

//       <section className="bg-white py-16 lg:py-20">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">

//           {/* Header */}

//           <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

//             <div className="max-w-2xl">

//               <span className="text-orange-600 text-sm font-semibold uppercase tracking-[0.25em]">
//                 Media Gallery
//               </span>

//               <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
//                 Moments of Public Service
//               </h2>

//               <p className="mt-4 text-gray-600 leading-8">
//                 Explore photographs and videos capturing public programmes,
//                 constituency visits, meetings and important events.
//               </p>

//             </div>

//             {/* Photo / Video */}

//             <div className="flex rounded-full bg-slate-100 p-1 w-fit">

//               <button
//                 onClick={() => {
//                   setType("photo");
//                   setCategory("All");
//                 }}
//                 className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
//                   type === "photo"
//                     ? "bg-orange-600 text-white shadow"
//                     : "text-slate-600 hover:text-orange-600"
//                 }`}
//               >
//                 Photos
//               </button>

//               <button
//                 onClick={() => {
//                   setType("video");
//                   setCategory("All");
//                 }}
//                 className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
//                   type === "video"
//                     ? "bg-orange-600 text-white shadow"
//                     : "text-slate-600 hover:text-orange-600"
//                 }`}
//               >
//                 Videos
//               </button>

//             </div>

//           </div>

//           {/* Categories */}

//           <div className="flex flex-wrap gap-3 mt-10">

//             {categories.map((item) => (
//               <button
//                 key={item}
//                 onClick={() => setCategory(item)}
//                 className={`px-5 py-2 rounded-full border text-sm transition ${
//                   category === item
//                     ? "bg-orange-600 text-white border-orange-600"
//                     : "bg-white border-slate-200 text-slate-600 hover:border-orange-500 hover:text-orange-600"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}

//           </div>

//           {/* Gallery */}

//           {filteredItems.length > 0 ? (

//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-12">

//               {filteredItems.map((item, index) => (

//                 <article
//                   key={item.id}
//                   className={`group relative overflow-hidden rounded-3xl ${
//                     index === 0
//                       ? "md:col-span-2 md:row-span-2"
//                       : ""
//                   }`}
//                 >

//                   {/* Image / Video Thumbnail */}

//                   <img
//                     src={
//                       item.type === "video"
//                         ? getYoutubeThumbnail(item.videoUrl)
//                         : item.image
//                     }
//                     alt={item.title}
//                     onClick={() =>
//                       item.type === "photo" &&
//                       setSelectedImage(item.image)
//                     }
//                     className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
//                       item.type === "photo"
//                         ? "cursor-pointer"
//                         : ""
//                     } ${
//                       index === 0
//                         ? "h-[300px] md:h-[520px]"
//                         : "h-[220px] md:h-[250px]"
//                     }`}
//                   />

//                   {/* Overlay */}

//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">

//                     <div className="absolute bottom-0 left-0 right-0 p-6">

//                       <p className="text-white font-semibold text-lg">
//                         {item.title}
//                       </p>

//                       <p className="mt-1 text-white/70 text-sm">
//                         {item.category}
//                       </p>

//                     </div>

//                   </div>

//                   {/* Video */}

//                   {item.type === "video" && (

//                     <a
//                       href={item.videoUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="absolute inset-0 flex items-center justify-center"
//                     >

//                       <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition">

//                         <Play
//                           size={22}
//                           className="text-orange-600 ml-1"
//                           fill="currentColor"
//                         />

//                       </div>

//                     </a>

//                   )}

//                 </article>

//               ))}

//             </div>

//           ) : (

//             <div className="mt-12 py-20 text-center rounded-3xl bg-slate-50 border border-slate-100">

//               <p className="text-gray-500">
//                 No {type === "photo" ? "photos" : "videos"} found in this category.
//               </p>

//             </div>

//           )}

//         </div>
//       </section>

//       {/* Lightbox */}

//       {selectedImage && (

//         <div
//           className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-5"
//           onClick={() => setSelectedImage(null)}
//         >

//           <button
//             onClick={() => setSelectedImage(null)}
//             className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
//           >
//             <X size={24} />
//           </button>

//           <img
//             src={selectedImage}
//             alt="Gallery preview"
//             onClick={(e) => e.stopPropagation()}
//             className="max-w-full max-h-[90vh] object-contain rounded-xl"
//           />

//         </div>

//       )}

//     </>
//   );
// }






import { useEffect, useMemo, useState } from "react";
import { Play, X } from "lucide-react";

/* =========================================================
   DYNAMIC VIDEO API
========================================================= */

const API_URL = "http://localhost:5000/api/videos";
const CACHE_KEY = "gallery_videos_cache";

/* =========================================================
   OLD PHOTO DATA
   Your existing photos are kept unchanged
========================================================= */

const photoItems = [
  {
    id: 1,
    type: "photo",
    category: "Public Events",
    image: "/gallery/1.png",
    title: "Public Meetings",
  },
  {
    id: 2,
    type: "photo",
    category: "Meetings",
    image: "/gallery/2.png",
    title: "Public Meetings",
  },
  {
    id: 3,
    type: "photo",
    category: "Constituency",
    image: "/gallery/3.png",
    title: "Public Meetings",
  },
  {
    id: 4,
    type: "photo",
    category: "Events",
    image: "/gallery/4.png",
    title: "Public Meetings",
  },
  {
    id: 5,
    type: "photo",
    category: "Public Events",
    image: "/gallery/5.png",
    title: "Public Meetings",
  },
  {
    id: 6,
    type: "photo",
    category: "Meetings",
    image: "/gallery/6.png",
    title: "Public Meetings",
  },
  {
    id: 7,
    type: "photo",
    category: "Public Events",
    image: "/gallery/7.png",
    title: "Public Interaction",
  },
  {
    id: 8,
    type: "photo",
    category: "Meetings",
    image: "/gallery/8.png",
    title: "Official Meeting",
  },
  {
    id: 9,
    type: "photo",
    category: "Constituency",
    image: "/gallery/9.png",
    title: "Constituency Visit",
  },
  {
    id: 10,
    type: "photo",
    category: "Events",
    image: "/gallery/10.png",
    title: "Public Programme",
  },
  {
    id: 11,
    type: "photo",
    category: "Public Events",
    image: "/gallery/11.png",
    title: "Community Interaction",
  },
  {
    id: 12,
    type: "photo",
    category: "Meetings",
    image: "/gallery/12.png",
    title: "Leadership Meeting",
  },
];

/* =========================================================
   FALLBACK VIDEOS

   These are only used if:
   - backend is unavailable
   - no cached videos exist

   You can remove these later if you don't want fallback videos.
========================================================= */

const fallbackVideos = [
  {
    id: "old-1",
    type: "video",
    category: "Public Events",
    title: "Public Programme",
    description: "",
    videoUrl: "https://www.youtube.com/watch?v=qFusARwKYPk",
    thumbnailUrl: "",
  },
  {
    id: "old-2",
    type: "video",
    category: "Meetings",
    title: "Public Interaction",
    description: "",
    videoUrl: "https://www.youtube.com/watch?v=XTZMEkK0F7s",
    thumbnailUrl: "",
  },
];

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  "All",
  "Public Events",
  "Constituency",
  "Meetings",
  "Events",
  "Government",
  "Public",
  "Development",
  "Video",
];

/* =========================================================
   YOUTUBE HELPERS
========================================================= */

function isYoutube(url) {
  if (!url) {
    return false;
  }

  return (
    url.includes("youtube.com") ||
    url.includes("youtu.be")
  );
}

function youtubeThumbnail(url) {
  if (!url) {
    return "";
  }

  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
  );

  if (!match) {
    return "";
  }

  return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
}

/* =========================================================
   LOCAL STORAGE CACHE
========================================================= */

function getCachedVideos() {
  try {
    const saved = localStorage.getItem(CACHE_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("CACHE ERROR:", error);
    return [];
  }
}

/* =========================================================
   GALLERY COMPONENT
========================================================= */

export default function Gallery() {
  const [type, setType] = useState("photo");
  const [category, setCategory] = useState("All");

  const [selectedImage, setSelectedImage] = useState(null);

  /* ---------------------------------------------------------
     DYNAMIC VIDEOS
  --------------------------------------------------------- */

  const [videos, setVideos] = useState(() => {
    const cached = getCachedVideos();

    if (cached.length > 0) {
      return cached;
    }

    return fallbackVideos;
  });

  const [loadingVideos, setLoadingVideos] = useState(false);
  const [usingCache, setUsingCache] = useState(false);

  /* =========================================================
     LOAD VIDEOS FROM BACKEND
  ========================================================= */

  async function loadVideos() {
    try {
      setLoadingVideos(true);

      const response = await fetch(
        `${API_URL}?t=${Date.now()}`,
        {
          cache: "no-store",
        }
      );

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch (error) {
        throw new Error(
          "Backend returned invalid video data."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Server returned ${response.status}`
        );
      }

      if (!result.success) {
        throw new Error(
          result.message ||
            "Unable to load videos."
        );
      }

      /* -------------------------------------------------------
         Convert backend data into gallery format
      ------------------------------------------------------- */

      const latestVideos = Array.isArray(result.data)
        ? result.data.map((item, index) => ({
            id: item.id ?? `video-${index}`,
            type: "video",
            category: item.category || "Video",
            title: item.title || "Video",
            description: item.description || "",
            videoUrl: item.video_url || "",
            thumbnailUrl: item.thumbnail_url || "",
            link: item.link || "",
            publishedDate: item.published_date || "",
          }))
        : [];

      setVideos(latestVideos);

      /* -------------------------------------------------------
         Save latest videos in localStorage
      ------------------------------------------------------- */

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify(latestVideos)
      );

      setUsingCache(false);
    } catch (error) {
      console.error(
        "GALLERY VIDEO ERROR:",
        error
      );

      /* -------------------------------------------------------
         Backend failed
         Try cached videos
      ------------------------------------------------------- */

      const cached = getCachedVideos();

      if (cached.length > 0) {
        setVideos(cached);
        setUsingCache(true);
      } else {
        /* -----------------------------------------------------
           No cache → use fallback videos
        ----------------------------------------------------- */

        setVideos(fallbackVideos);
        setUsingCache(false);
      }
    } finally {
      setLoadingVideos(false);
    }
  }

  /* =========================================================
     INITIAL VIDEO LOAD
  ========================================================= */

  useEffect(() => {
    loadVideos();
  }, []);

  /* =========================================================
     REFRESH WHEN ADMIN UPDATES VIDEOS

     The admin page can dispatch:

     window.dispatchEvent(
       new Event("videos-updated")
     );

  ========================================================= */

  useEffect(() => {
    function refreshVideos() {
      loadVideos();
    }

    window.addEventListener(
      "videos-updated",
      refreshVideos
    );

    window.addEventListener(
      "focus",
      refreshVideos
    );

    return () => {
      window.removeEventListener(
        "videos-updated",
        refreshVideos
      );

      window.removeEventListener(
        "focus",
        refreshVideos
      );
    };
  }, []);

  /* =========================================================
     COMBINE PHOTOS + DYNAMIC VIDEOS
  ========================================================= */

  const galleryItems = useMemo(() => {
    return [
      ...photoItems,
      ...videos,
    ];
  }, [videos]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const typeMatch = item.type === type;

      const categoryMatch =
        category === "All" ||
        item.category === category;

      return typeMatch && categoryMatch;
    });
  }, [
    galleryItems,
    type,
    category,
  ]);

  /* =========================================================
     CHANGE PHOTO / VIDEO
  ========================================================= */

  function changeType(newType) {
    setType(newType);
    setCategory("All");

    if (newType === "video") {
      loadVideos();
    }
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <>
      {/* =====================================================
          GALLERY SECTION
      ===================================================== */}

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-2xl">

              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                Media Gallery
              </span>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                Moments of Public Service
              </h2>

              <p className="mt-4 leading-8 text-gray-600">
                Explore photographs and videos capturing
                public programmes, constituency visits,
                meetings and important events.
              </p>

            </div>

            {/* =================================================
                PHOTO / VIDEO SWITCH
            ================================================= */}

            <div className="flex w-fit rounded-full bg-slate-100 p-1">

              <button
                type="button"
                onClick={() =>
                  changeType("photo")
                }
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                  type === "photo"
                    ? "bg-orange-600 text-white shadow"
                    : "text-slate-600 hover:text-orange-600"
                }`}
              >
                Photos
              </button>

              <button
                type="button"
                onClick={() =>
                  changeType("video")
                }
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                  type === "video"
                    ? "bg-orange-600 text-white shadow"
                    : "text-slate-600 hover:text-orange-600"
                }`}
              >
                Videos
              </button>

            </div>

          </div>

          {/* =================================================
              CACHE MESSAGE
          ================================================= */}

          {type === "video" &&
            usingCache && (
              <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
                Showing the latest saved video
                information because the backend is
                unavailable.
              </div>
            )}

          {/* =================================================
              LOADING MESSAGE
          ================================================= */}

          {type === "video" &&
            loadingVideos && (
              <p className="mt-5 text-sm text-gray-500">
                Updating videos...
              </p>
            )}

          {/* =================================================
              CATEGORIES
          ================================================= */}

          <div className="mt-10 flex flex-wrap gap-3">

            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setCategory(item)
                }
                className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                  category === item
                    ? "border-orange-600 bg-orange-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

          {/* =================================================
              GALLERY GRID
          ================================================= */}

          {filteredItems.length > 0 ? (

            <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

              {filteredItems.map(
                (item, index) => {

                  /* -----------------------------------------
                     CHECK VIDEO TYPES
                  ----------------------------------------- */

                  const video =
                    item.type === "video";

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

                  /* -----------------------------------------
                     THUMBNAIL

                     Priority:
                     1. Admin uploaded thumbnail
                     2. YouTube thumbnail
                     3. Placeholder
                  ----------------------------------------- */

                  const thumbnail =
                    item.thumbnailUrl ||
                    (youtube
                      ? youtubeThumbnail(
                          item.videoUrl
                        )
                      : "");

                  return (
                    <article
                      key={item.id}
                      className={`relative overflow-hidden rounded-3xl bg-black ${
                        featured
                          ? "md:col-span-2 md:row-span-2"
                          : ""
                      }`}
                    >

                      {/* =================================================
                          LOCAL UPLOADED VIDEO
                      ================================================= */}

                      {localVideo ? (

                        <div className="bg-black">

                          <video
                            key={
                              item.videoUrl
                            }
                            src={
                              item.videoUrl
                            }
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
                              console.error(
                                "VIDEO PLAY ERROR:",
                                item.videoUrl,
                                event
                              );
                            }}
                          />

                          {/* VIDEO DETAILS */}

                          <div className="bg-slate-950 px-4 py-4">

                            <p className="text-base font-semibold text-white">
                              {item.title}
                            </p>

                            <p className="mt-1 text-sm text-white/60">
                              {item.category}
                            </p>

                            {item.description && (
                              <p className="mt-2 text-sm leading-6 text-white/70">
                                {
                                  item.description
                                }
                              </p>
                            )}

                          </div>

                        </div>

                      ) : (

                        <>
                          {/* =================================================
                              PHOTO / YOUTUBE THUMBNAIL
                          ================================================= */}

                          <img
                            src={
                              item.type ===
                              "photo"
                                ? item.image
                                : thumbnail ||
                                  "/gallery/placeholder.png"
                            }
                            alt={
                              item.title
                            }
                            onClick={() => {

                              /* PHOTO → LIGHTBOX */

                              if (
                                item.type ===
                                "photo"
                              ) {
                                setSelectedImage(
                                  item.image
                                );
                              }

                              /* YOUTUBE → OPEN */

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
                            className={`w-full object-cover transition duration-700 hover:scale-105 ${
                              item.type ===
                              "photo"
                                ? "cursor-pointer"
                                : ""
                            } ${
                              featured
                                ? "h-[300px] md:h-[520px]"
                                : "h-[220px] md:h-[250px]"
                            }`}
                          />

                          {/* =================================================
                              PHOTO OVERLAY
                          ================================================= */}

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

                              </div>

                            </div>

                          )}

                          {/* =================================================
                              YOUTUBE PLAY BUTTON
                          ================================================= */}

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

                        </>

                      )}

                    </article>
                  );
                }
              )}

            </div>

          ) : (

            /* =================================================
               NO RESULTS
            ================================================= */

            <div className="mt-12 rounded-3xl border border-slate-100 bg-slate-50 py-20 text-center">

              <p className="text-gray-500">
                No{" "}
                {type === "photo"
                  ? "photos"
                  : "videos"}{" "}
                found in this category.
              </p>

            </div>

          )}

        </div>
      </section>

      {/* =====================================================
          PHOTO LIGHTBOX
      ===================================================== */}

      {selectedImage && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5"
          onClick={() =>
            setSelectedImage(null)
          }
        >

          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={() =>
              setSelectedImage(null)
            }
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close image"
          >
            <X size={24} />
          </button>

          {/* LARGE IMAGE */}

          <img
            src={selectedImage}
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

