import { useEffect, useMemo, useState } from "react";
import { Play, X } from "lucide-react";

/* =========================================================
   API CONFIGURATION
========================================================= */

const API_BASE_URL = "http://localhost:5000";

const PHOTO_API_URL = `${API_BASE_URL}/api/gallery`;
const VIDEO_API_URL = `${API_BASE_URL}/api/videos`;

const VIDEO_CACHE_KEY = "gallery_videos_cache";

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
   EXISTING STATIC PHOTOS
   ---------------------------------------------------------
   These are your old gallery photos.

   They will continue showing even if the backend
   does not contain them.
========================================================= */

const existingPhotos = [
  {
    id: "static-1",
    type: "photo",
    category: "Public Events",
    image: "/gallery/1.png",
    title: "Public Meetings",
    caption: "",
    isStatic: true,
  },

  {
    id: "static-2",
    type: "photo",
    category: "Meetings",
    image: "/gallery/2.png",
    title: "Public Meetings",
    caption: "",
    isStatic: true,
  },

  {
    id: "static-3",
    type: "photo",
    category: "Constituency",
    image: "/gallery/3.png",
    title: "Public Meetings",
    caption: "",
    isStatic: true,
  },

  {
    id: "static-4",
    type: "photo",
    category: "Events",
    image: "/gallery/4.png",
    title: "Public Meetings",
    caption: "",
    isStatic: true,
  },

  {
    id: "static-5",
    type: "photo",
    category: "Public Events",
    image: "/gallery/5.png",
    title: "Public Meetings",
    caption: "",
    isStatic: true,
  },

  {
    id: "static-6",
    type: "photo",
    category: "Meetings",
    image: "/gallery/6.png",
    title: "Public Meetings",
    caption: "",
    isStatic: true,
  },

  {
    id: "static-7",
    type: "photo",
    category: "Public Events",
    image: "/gallery/7.png",
    title: "Public Interaction",
    caption: "",
    isStatic: true,
  },

  {
    id: "static-8",
    type: "photo",
    category: "Meetings",
    image: "/gallery/8.png",
    title: "Official Meeting",
    caption: "",
    isStatic: true,
  },

  {
    id: "static-9",
    type: "photo",
    category: "Constituency",
    image: "/gallery/9.png",
    title: "Constituency Visit",
    caption: "",
    isStatic: true,
  },

  {
    id: "static-10",
    type: "photo",
    category: "Events",
    image: "/gallery/10.png",
    title: "Public Programme",
    caption: "",
    isStatic: true,
  },

  {
    id: "static-11",
    type: "photo",
    category: "Public Events",
    image: "/gallery/11.png",
    title: "Community Interaction",
    caption: "",
    isStatic: true,
  },

  {
    id: "static-12",
    type: "photo",
    category: "Meetings",
    image: "/gallery/12.png",
    title: "Leadership Meeting",
    caption: "",
    isStatic: true,
  },
];

/* =========================================================
   FALLBACK VIDEOS
========================================================= */

const fallbackVideos = [
  {
    id: "old-video-1",
    type: "video",
    category: "Public Events",
    title: "Public Programme",
    description: "",
    videoUrl: "https://www.youtube.com/watch?v=qFusARwKYPk",
    thumbnailUrl: "",
  },

  {
    id: "old-video-2",
    type: "video",
    category: "Meetings",
    title: "Public Interaction",
    description: "",
    videoUrl: "https://www.youtube.com/watch?v=XTZMEkK0F7s",
    thumbnailUrl: "",
  },
];

/* =========================================================
   YOUTUBE CHECK
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

/* =========================================================
   YOUTUBE THUMBNAIL
========================================================= */

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
   IMAGE URL HELPER
========================================================= */

function getImageUrl(imagePath) {
  if (!imagePath) {
    return "";
  }

  const cleanPath = String(imagePath).trim();

  if (!cleanPath) {
    return "";
  }

  /* Already a complete URL */

  if (
    cleanPath.startsWith("http://") ||
    cleanPath.startsWith("https://")
  ) {
    return cleanPath;
  }

  /* Frontend public image */

  if (
    cleanPath.startsWith("/gallery/") ||
    cleanPath.startsWith("/images/")
  ) {
    return cleanPath;
  }

  /* Backend upload */

  return `${API_BASE_URL}${
    cleanPath.startsWith("/") ? "" : "/"
  }${cleanPath}`;
}

/* =========================================================
   CACHE-BUST IMAGE URL

   Important when admin replaces an image with another
   image having the same filename.
========================================================= */

function getFreshImageUrl(imageUrl, updatedAt = "") {
  if (!imageUrl) {
    return "";
  }

  /*
    Static public images do not need cache busting.
  */

  if (
    imageUrl.startsWith("/gallery/") ||
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
   GET CACHED VIDEOS
========================================================= */

function getCachedVideos() {
  try {
    const saved = localStorage.getItem(
      VIDEO_CACHE_KEY
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
      "VIDEO CACHE ERROR:",
      error
    );

    return [];
  }
}

/* =========================================================
   REMOVE DUPLICATE PHOTOS
========================================================= */

function mergePhotos(
  backendPhotos,
  staticPhotos
) {
  const result = [];

  const backendImageSet = new Set();

  /* -------------------------------------------------------
     FIRST: BACKEND PHOTOS
     Backend photos get priority.
  ------------------------------------------------------- */

  backendPhotos.forEach((photo) => {
    if (!photo.image) {
      return;
    }

    const normalized = photo.image
      .split("?")[0]
      .toLowerCase()
      .trim();

    if (!normalized) {
      return;
    }

    /*
      Do not add same backend image twice.
    */

    if (backendImageSet.has(normalized)) {
      return;
    }

    backendImageSet.add(normalized);

    result.push(photo);
  });

  /* -------------------------------------------------------
     SECOND: OLD STATIC PHOTOS

     Add only if the same path/image is NOT already
     coming from the backend.
  ------------------------------------------------------- */

  staticPhotos.forEach((photo) => {
    const staticPath = photo.image
      .toLowerCase()
      .trim();

    const alreadyExists =
      backendPhotos.some((backendPhoto) => {
        const backendOriginalPath = String(
          backendPhoto.image_path || ""
        )
          .toLowerCase()
          .trim();

        const backendImage = String(
          backendPhoto.image || ""
        )
          .split("?")[0]
          .toLowerCase()
          .trim();

        return (
          backendOriginalPath ===
            staticPath ||
          backendImage === staticPath ||
          backendImage.endsWith(
            staticPath
          )
        );
      });

    if (!alreadyExists) {
      result.push(photo);
    }
  });

  return result;
}

/* =========================================================
   GALLERY COMPONENT
========================================================= */

export default function Gallery() {
  /* =======================================================
     TYPE
  ======================================================= */

  const [type, setType] = useState("photo");

  /* =======================================================
     CATEGORY
  ======================================================= */

  const [category, setCategory] =
    useState("All");

  /* =======================================================
     LIGHTBOX
  ======================================================= */

  const [selectedImage, setSelectedImage] =
    useState(null);

  /* =======================================================
     PHOTOS
  ======================================================= */

  const [photos, setPhotos] = useState(
    existingPhotos
  );

  const [loadingPhotos, setLoadingPhotos] =
    useState(false);

  const [photoError, setPhotoError] =
    useState("");

  /* =======================================================
     VIDEOS
  ======================================================= */

  const [videos, setVideos] = useState(() => {
    const cached = getCachedVideos();

    if (cached.length > 0) {
      return cached;
    }

    return fallbackVideos;
  });

  const [loadingVideos, setLoadingVideos] =
    useState(false);

  const [
    usingVideoCache,
    setUsingVideoCache,
  ] = useState(false);

  /* =======================================================
     LOAD PHOTOS
  ======================================================= */

  async function loadPhotos() {
    try {
      setLoadingPhotos(true);

      setPhotoError("");

      console.log(
        "================================"
      );

      console.log(
        "LOADING GALLERY PHOTOS"
      );

      console.log(
        "API:",
        PHOTO_API_URL
      );

      console.log(
        "================================"
      );

      const response = await fetch(
        `${PHOTO_API_URL}?t=${Date.now()}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const text =
        await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch (error) {
        console.error(
          "INVALID JSON:",
          text
        );

        throw new Error(
          "Backend returned invalid gallery data."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Server returned ${response.status}`
        );
      }

      /* ---------------------------------------------------
         SUPPORT:

         [
           {...}
         ]

         OR

         {
           success: true,
           data: [...]
         }
      --------------------------------------------------- */

      const galleryData =
        Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : [];

      console.log(
        "BACKEND PHOTO COUNT:",
        galleryData.length
      );

      /* ---------------------------------------------------
         FORMAT PHOTOS
      --------------------------------------------------- */

      const formattedPhotos =
        galleryData
          .map((item, index) => {
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
                item.created_at || "",

              updated_at:
                item.updated_at || "",

              isStatic: false,
            };
          })
          .filter(
            (item) => item.image
          );

      console.log(
        "FORMATTED BACKEND PHOTOS:",
        formattedPhotos
      );

      /* ---------------------------------------------------
         MERGE BACKEND + EXISTING STATIC
      --------------------------------------------------- */

      const allPhotos = mergePhotos(
        formattedPhotos,
        existingPhotos
      );

      console.log(
        "================================"
      );

      console.log(
        "FINAL PHOTO COUNT:",
        allPhotos.length
      );

      console.log(
        "BACKEND PHOTO COUNT:",
        formattedPhotos.length
      );

      console.log(
        "STATIC PHOTO COUNT:",
        existingPhotos.length
      );

      console.log(
        "================================"
      );

      setPhotos(allPhotos);

      setPhotoError("");
    } catch (error) {
      console.error(
        "GALLERY PHOTO ERROR:",
        error
      );

      /*
        IMPORTANT:

        If backend fails, don't remove the old
        gallery.

        Keep static photos visible.
      */

      setPhotos(existingPhotos);

      setPhotoError(
        error.message ||
          "Unable to load gallery images."
      );
    } finally {
      setLoadingPhotos(false);
    }
  }

  /* =======================================================
     LOAD VIDEOS
  ======================================================= */

  async function loadVideos() {
    try {
      setLoadingVideos(true);

      const response = await fetch(
        `${VIDEO_API_URL}?t=${Date.now()}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const text =
        await response.text();

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

      /*
        Support success/data response.
      */

      const videoData =
        Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : [];

      const latestVideos =
        videoData.map(
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
          })
        );

      /*
        If backend successfully responds but has zero
        videos, don't use old fallback videos.
      */

      setVideos(latestVideos);

      localStorage.setItem(
        VIDEO_CACHE_KEY,
        JSON.stringify(
          latestVideos
        )
      );

      setUsingVideoCache(false);
    } catch (error) {
      console.error(
        "GALLERY VIDEO ERROR:",
        error
      );

      const cached =
        getCachedVideos();

      if (cached.length > 0) {
        setVideos(cached);

        setUsingVideoCache(true);
      } else {
        setVideos(
          fallbackVideos
        );

        setUsingVideoCache(false);
      }
    } finally {
      setLoadingVideos(false);
    }
  }

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    loadPhotos();

    loadVideos();
  }, []);

  /* =======================================================
     REFRESH WHEN ADMIN CHANGES GALLERY
  ======================================================= */

  useEffect(() => {
    /* ---------------------------------------------------
       ADMIN GALLERY UPDATE
    --------------------------------------------------- */

    function refreshPhotos() {
      console.log(
        "Gallery update detected."
      );

      loadPhotos();
    }

    /* ---------------------------------------------------
       ADMIN VIDEO UPDATE
    --------------------------------------------------- */

    function refreshVideos() {
      console.log(
        "Video update detected."
      );

      loadVideos();
    }

    /* ---------------------------------------------------
       REFRESH EVERYTHING
    --------------------------------------------------- */

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
  }, []);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredItems = useMemo(() => {
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
          String(
            category
          )
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

    if (newType === "photo") {
      loadPhotos();
    }

    if (newType === "video") {
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
     ERROR
  ======================================================= */

  const currentError =
    type === "photo"
      ? photoError
      : "";

  /* =======================================================
     UI
  ======================================================= */

  return (
    <>
      {/* ===================================================
          GALLERY SECTION
      =================================================== */}

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
                Explore photographs and videos
                capturing public programmes,
                constituency visits, meetings
                and important events.
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
              VIDEO CACHE MESSAGE
          ================================================= */}

          {type === "video" &&
            usingVideoCache && (
              <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
                Showing saved video information
                because the video backend is
                temporarily unavailable.
              </div>
            )}

          {/* =================================================
              CATEGORIES
          ================================================= */}

          <div className="mt-10 flex flex-wrap gap-3">

            {categories.map(
              (item) => (
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
              )
            )}

          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {isLoading && (
            <div className="mt-12 flex min-h-[250px] items-center justify-center">

              <div className="text-center">

                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-600" />

                <p className="text-sm text-gray-500">
                  {type === "photo"
                    ? "Loading gallery photos..."
                    : "Loading videos..."}
                </p>

              </div>

            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!isLoading &&
            currentError && (
              <div className="mt-10 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">

                <p className="text-yellow-700">
                  {currentError}
                </p>

                <p className="mt-2 text-sm text-yellow-600">
                  Existing gallery photos are
                  still being displayed.
                </p>

                <button
                  type="button"
                  onClick={
                    loadPhotos
                  }
                  className="mt-4 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
                >
                  Try Again
                </button>

              </div>
            )}

          {/* =================================================
              PHOTO COUNT

              Helpful for checking whether all images
              are actually being returned.
          ================================================= */}

          {!isLoading &&
            type === "photo" &&
            !currentError && (
              <div className="mt-8 text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {filteredItems.length}
                </span>{" "}
                photo
                {filteredItems.length !==
                1
                  ? "s"
                  : ""}
                {category !==
                  "All" &&
                  ` in ${category}`}
              </div>
            )}

          {/* =================================================
              GALLERY GRID
          ================================================= */}

          {!isLoading &&
            !currentError &&
            filteredItems.length >
              0 && (

              <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

                {filteredItems.map(
                  (
                    item,
                    index
                  ) => {

                    /* ---------------------------------------
                       VIDEO CHECK
                    --------------------------------------- */

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

                    /* ---------------------------------------
                       THUMBNAIL
                    --------------------------------------- */

                    const thumbnail =
                      item.thumbnailUrl ||
                      (youtube
                        ? youtubeThumbnail(
                            item.videoUrl
                          )
                        : "");

                    return (
                      <article
                        key={`${item.type}-${item.id}`}
                        className={`group relative overflow-hidden rounded-3xl bg-black ${
                          featured
                            ? "md:col-span-2 md:row-span-2"
                            : ""
                        }`}
                      >

                        {/* =================================
                            LOCAL VIDEO
                        ================================= */}

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
                                  "VIDEO ERROR:",
                                  item.videoUrl,
                                  event
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

                            </div>

                          </div>
                        ) : (
                          <>
                            {/* =============================
                                PHOTO / YOUTUBE IMAGE
                            ============================== */}

                            <img
                              src={
                                item.type ===
                                "photo"
                                  ? item.image
                                  : thumbnail ||
                                    "/gallery/placeholder.png"
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
                                  setSelectedImage(
                                    item.image
                                  );
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
                              onError={(
                                event
                              ) => {
                                console.error(
                                  "IMAGE LOAD ERROR:",
                                  item.image
                                );

                                /*
                                  Don't break the entire
                                  gallery if one image fails.
                                */

                                event.currentTarget.src =
                                  "/gallery/placeholder.png";
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
                            />

                            {/* =============================
                                PHOTO OVERLAY
                            ============================== */}

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

                            {/* =============================
                                YOUTUBE PLAY
                            ============================== */}

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
            )}

          {/* =================================================
              NO RESULTS
          ================================================= */}

          {!isLoading &&
            !currentError &&
            filteredItems.length ===
              0 && (
              <div className="mt-12 rounded-3xl border border-slate-100 bg-slate-50 py-20 text-center">

                <p className="text-gray-500">
                  No{" "}
                  {type ===
                  "photo"
                    ? "photos"
                    : "videos"}{" "}
                  found in this
                  category.
                </p>

              </div>
            )}

        </div>
      </section>

      {/* ===================================================
          PHOTO LIGHTBOX
      =================================================== */}

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5"
          onClick={() =>
            setSelectedImage(null)
          }
        >

          {/* CLOSE */}

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

          {/* IMAGE */}

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