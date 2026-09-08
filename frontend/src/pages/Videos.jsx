// import SectionTitle from '../components/common/SectionTitle'
// import { useTranslation } from 'react-i18next'

// const Videos = () => {
//   const { t } = useTranslation()

//   return (
//     <section className="py-20">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <SectionTitle eyebrow={t('gallery.videos')} title={t('videos.title')} subtitle={t('videos.subtitle')} />
//       </div>
//     </section>
//   )
// }

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionTitle from "../components/common/SectionTitle";
import { API_BASE_URL } from "../config";

/* =========================================================
   API
========================================================= */

const BASE_URL = String(API_BASE_URL || "").replace(/\/+$/, "");
const VIDEO_API_URL = `${BASE_URL}/api/videos`;

/* =========================================================
   CACHE
========================================================= */

const VIDEO_CACHE_KEY = "videos_page_cache_v2";
const VIDEO_FILE_CACHE_NAME = "video-page-files-v2";

/* =========================================================
   URL HELPERS
========================================================= */

function getVideoUrl(videoPath) {
  if (!videoPath) return "";

  const cleanPath = String(videoPath).trim();

  if (!cleanPath) return "";

  /*
   * Already a blob URL.
   */
  if (cleanPath.startsWith("blob:")) {
    return cleanPath;
  }

  /*
   * External URL.
   */
  if (
    cleanPath.startsWith("http://") ||
    cleanPath.startsWith("https://")
  ) {
    /*
     * If this is a backend localhost URL, keep it
     * as-is while online.
     */
    return cleanPath;
  }

  /*
   * Normalize Windows backslashes.
   */
  const normalizedPath = cleanPath.replace(/\\/g, "/");

  /*
   * Avoid duplicate slashes.
   */
  return `${BASE_URL}${
    normalizedPath.startsWith("/") ? "" : "/"
  }/${normalizedPath}`;
}

/* =========================================================
   YOUTUBE
========================================================= */

function isYoutube(url) {
  if (!url) return false;

  const value = String(url).toLowerCase();

  return (
    value.includes("youtube.com") ||
    value.includes("youtu.be")
  );
}

function youtubeThumbnail(url) {
  if (!url) return "";

  const match = String(url).match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
  );

  if (!match) return "";

  return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
}

/* =========================================================
   DETECT LOCAL BACKEND VIDEO
========================================================= */

function isLocalBackendVideo(url) {
  if (!url) return false;

  const value = String(url);

  /*
   * YouTube is not locally cacheable for playback.
   */
  if (isYoutube(value)) {
    return false;
  }

  /*
   * Blob URLs are already cached.
   */
  if (value.startsWith("blob:")) {
    return false;
  }

  /*
   * Backend upload paths.
   */
  return (
    value.includes("/uploads/") ||
    value.includes("\\uploads\\") ||
    value.startsWith("/uploads/")
  );
}

/* =========================================================
   LOCAL STORAGE VIDEO METADATA CACHE
========================================================= */

function getCachedVideos() {
  try {
    const saved = localStorage.getItem(
      VIDEO_CACHE_KEY
    );

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(
      "VIDEO CACHE READ ERROR:",
      error
    );

    return [];
  }
}

function saveVideoCache(videos) {
  try {
    /*
     * Never store blob URLs in localStorage.
     *
     * Blob URLs are valid only for the current
     * browser document/session.
     */
    const cleanVideos = videos.map((video) => ({
      ...video,
      videoUrl:
        video.originalVideoUrl ||
        video.videoUrl ||
        "",
    }));

    localStorage.setItem(
      VIDEO_CACHE_KEY,
      JSON.stringify(cleanVideos)
    );

    console.log(
      "VIDEO METADATA CACHE SAVED:",
      cleanVideos.length
    );
  } catch (error) {
    console.warn(
      "VIDEO CACHE SAVE ERROR:",
      error
    );
  }
}

/* =========================================================
   CACHE KEY
========================================================= */

/*
 * Cache Storage needs a stable URL/key for each file.
 *
 * We use the real backend URL without query parameters.
 */
function getVideoCacheRequest(videoUrl) {
  if (!videoUrl) return null;

  try {
    const url = new URL(videoUrl);

    /*
     * Remove cache-busting query parameters.
     */
    url.search = "";

    return url.toString();
  } catch {
    return videoUrl;
  }
}

/* =========================================================
   CACHE ACTUAL VIDEO FILE
========================================================= */

async function cacheVideoFile(video) {
  if (!video?.originalVideoUrl) {
    return false;
  }

  const originalUrl = getVideoUrl(
    video.originalVideoUrl
  );

  /*
   * Do not cache YouTube.
   */
  if (isYoutube(originalUrl)) {
    return false;
  }

  /*
   * Only cache backend/upload videos.
   */
  if (!isLocalBackendVideo(originalUrl)) {
    return false;
  }

  if (!("caches" in window)) {
    console.warn(
      "Cache Storage is not supported."
    );

    return false;
  }

  const cacheKey =
    getVideoCacheRequest(originalUrl);

  if (!cacheKey) {
    return false;
  }

  try {
    const cache = await caches.open(
      VIDEO_FILE_CACHE_NAME
    );

    console.log(
      "CACHING VIDEO:",
      originalUrl
    );

    /*
     * Fetch the actual video file from backend.
     *
     * cache: no-store makes sure we receive the
     * current backend file.
     */
    const response = await fetch(
      originalUrl,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Video returned ${response.status}`
      );
    }

    /*
     * Store a clone because the response body can
     * only be consumed once.
     */
    await cache.put(
      cacheKey,
      response.clone()
    );

    console.log(
      "VIDEO CACHED SUCCESSFULLY:",
      originalUrl
    );

    return true;
  } catch (error) {
    console.error(
      "VIDEO FILE CACHE ERROR:",
      originalUrl,
      error
    );

    return false;
  }
}

/* =========================================================
   CACHE ALL LOCAL VIDEOS
========================================================= */

async function cacheAllVideoFiles(videos) {
  if (!Array.isArray(videos)) {
    return;
  }

  const localVideos = videos.filter(
    (video) =>
      video?.originalVideoUrl &&
      !isYoutube(video.originalVideoUrl) &&
      isLocalBackendVideo(
        getVideoUrl(video.originalVideoUrl)
      )
  );

  console.log(
    "LOCAL VIDEOS TO CACHE:",
    localVideos.length
  );

  if (localVideos.length === 0) {
    console.log(
      "NO LOCAL VIDEOS NEED CACHING."
    );

    return;
  }

  let cachedCount = 0;

  /*
   * Cache one-by-one.
   *
   * This avoids downloading many large video
   * files simultaneously.
   */
  for (const video of localVideos) {
    const success =
      await cacheVideoFile(video);

    if (success) {
      cachedCount += 1;
    }
  }

  console.log(
    `VIDEO CACHE COMPLETE: ${cachedCount}/${localVideos.length}`
  );
}

/* =========================================================
   GET CACHED VIDEO FILE
========================================================= */

async function getCachedVideoBlobUrl(
  originalVideoUrl
) {
  if (!originalVideoUrl) {
    return "";
  }

  if (!("caches" in window)) {
    return "";
  }

  const videoUrl =
    getVideoUrl(originalVideoUrl);

  const cacheKey =
    getVideoCacheRequest(videoUrl);

  if (!cacheKey) {
    return "";
  }

  try {
    const cache = await caches.open(
      VIDEO_FILE_CACHE_NAME
    );

    const cachedResponse =
      await cache.match(cacheKey);

    if (!cachedResponse) {
      console.warn(
        "CACHED VIDEO NOT FOUND:",
        cacheKey
      );

      return "";
    }

    /*
     * Convert cached response into a Blob.
     */
    const blob =
      await cachedResponse.blob();

    if (!blob || blob.size === 0) {
      console.warn(
        "CACHED VIDEO BLOB IS EMPTY:",
        cacheKey
      );

      return "";
    }

    /*
     * Create a temporary blob URL.
     */
    const blobUrl =
      URL.createObjectURL(blob);

    console.log(
      "OFFLINE VIDEO READY:",
      originalVideoUrl
    );

    return blobUrl;
  } catch (error) {
    console.error(
      "CACHED VIDEO READ ERROR:",
      error
    );

    return "";
  }
}

/* =========================================================
   HYDRATE OFFLINE VIDEOS
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

  console.log(
    "HYDRATING CACHED VIDEOS:",
    cachedVideos.length
  );

  const hydrated =
    await Promise.all(
      cachedVideos.map(
        async (video) => {
          if (!video?.videoUrl) {
            return null;
          }

          /*
           * YouTube videos cannot play offline.
           *
           * Keep metadata so the card can still
           * appear, but mark it as offline-only.
           */
          if (
            isYoutube(
              video.videoUrl
            )
          ) {
            return {
              ...video,
              originalVideoUrl:
                video.videoUrl,
              videoUrl:
                video.videoUrl,
              _offlineYoutube: true,
            };
          }

          /*
           * Local backend video.
           */
          const originalUrl =
            video.originalVideoUrl ||
            video.videoUrl;

          const cachedBlobUrl =
            await getCachedVideoBlobUrl(
              originalUrl
            );

          if (!cachedBlobUrl) {
            console.warn(
              "OFFLINE VIDEO FILE NOT FOUND:",
              originalUrl
            );

            /*
             * Do not return the video if its
             * actual file is not cached.
             */
            return null;
          }

          return {
            ...video,

            /*
             * Keep the original URL so we can
             * identify/cache it later.
             */
            originalVideoUrl:
              originalUrl,

            /*
             * Actual playable offline URL.
             */
            videoUrl:
              cachedBlobUrl,

            _offlineCached: true,
          };
        }
      )
    );

  const readyVideos =
    hydrated.filter(Boolean);

  console.log(
    "OFFLINE VIDEOS READY:",
    readyVideos.length
  );

  return readyVideos;
}

/* =========================================================
   CLEANUP BLOB URLS
========================================================= */

function revokeBlobUrls(videos) {
  if (!Array.isArray(videos)) {
    return;
  }

  videos.forEach((video) => {
    if (
      video?._offlineCached &&
      video?.videoUrl?.startsWith("blob:")
    ) {
      try {
        URL.revokeObjectURL(
          video.videoUrl
        );
      } catch {
        // Ignore cleanup errors.
      }
    }
  });
}

/* =========================================================
   COMPONENT
========================================================= */

const Videos = () => {
  const { t, i18n } = useTranslation();

  /*
   * Start with cached metadata.
   *
   * Actual video files are hydrated after
   * backend failure.
   */
  const [videos, setVideos] = useState(
    () => getCachedVideos()
  );

  const [loading, setLoading] =
    useState(
      getCachedVideos().length === 0
    );

  const [error, setError] =
    useState("");

  const [usingCache, setUsingCache] =
    useState(false);

  /* =========================================================
     LOAD VIDEOS
  ========================================================= */

  async function loadVideos() {
    const language =
      i18n.language?.startsWith("te")
        ? "te"
        : "en";

    try {
      setLoading(true);
      setError("");

      console.log(
        "================================"
      );

      console.log(
        "LOADING VIDEOS FROM BACKEND"
      );

      console.log(
        "API:",
        VIDEO_API_URL
      );

      console.log(
        "LANGUAGE:",
        language
      );

      console.log(
        "================================"
      );

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
        result = JSON.parse(text);
      } catch {
        throw new Error(
          "Backend returned invalid video data."
        );
      }

      if (!response.ok) {
        throw new Error(
          result?.message ||
            `Server returned ${response.status}`
        );
      }

      /*
       * Backend can return:
       *
       * [...]
       *
       * OR
       *
       * {
       *   success: true,
       *   data: [...]
       * }
       */

      const videoData =
        Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
          ? result.data
          : [];

      console.log(
        "DATABASE VIDEO COUNT:",
        videoData.length
      );

      /*
       * Backend is source of truth.
       *
       * Do not merge with old cached videos.
       */
      const formattedVideos =
        videoData
          .map((item, index) => {
            const videoUrl =
              item.video_url ||
              item.videoUrl ||
              item.url ||
              "";

            const thumbnailUrl =
              item.thumbnail_url ||
              item.thumbnailUrl ||
              "";

            return {
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

              /*
               * Store original backend URL.
               */
              originalVideoUrl:
                videoUrl,

              /*
               * Initially this is the backend
               * URL. It will become a blob URL
               * when loaded offline.
               */
              videoUrl,

              thumbnailUrl,

              link:
                item.link ||
                "",

              publishedDate:
                item.published_date ||
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
            };
          })
          .filter(
            (item) =>
              item.originalVideoUrl
          );

      /*
       * Sort using backend display_order.
       */
      formattedVideos.sort(
        (a, b) =>
          Number(
            a.display_order ?? 0
          ) -
          Number(
            b.display_order ?? 0
          )
      );

      console.log(
        "FORMATTED VIDEO COUNT:",
        formattedVideos.length
      );

      /*
       * Backend completely replaces
       * current videos.
       */
      setVideos(
        formattedVideos
      );

      setUsingCache(false);
      setError("");

      /*
       * Save metadata.
       */
      saveVideoCache(
        formattedVideos
      );

      /*
       * IMPORTANT:
       *
       * Cache the actual local video files.
       *
       * This runs in the background so the
       * page doesn't have to wait for every
       * potentially large video download.
       */
      cacheAllVideoFiles(
        formattedVideos
      ).catch((cacheError) => {
        console.error(
          "BACKGROUND VIDEO CACHE ERROR:",
          cacheError
        );
      });
    } catch (error) {
      console.error(
        "VIDEO BACKEND ERROR:",
        error
      );

      /*
       * =====================================================
       * BACKEND UNAVAILABLE
       * =====================================================
       */

      const cachedVideos =
        getCachedVideos();

      if (cachedVideos.length > 0) {
        console.log(
          "BACKEND UNAVAILABLE - TRYING VIDEO FILE CACHE"
        );

        console.log(
          "CACHED VIDEO METADATA FOUND:",
          cachedVideos.length
        );

        /*
         * First show cached metadata.
         */
        setVideos(
          cachedVideos
        );

        setUsingCache(true);
        setError("");

        /*
         * Then retrieve actual cached video
         * files.
         */
        const offlineVideos =
          await hydrateCachedVideos(
            cachedVideos
          );

        /*
         * Only replace the list if hydration
         * completed.
         */
        if (offlineVideos.length > 0) {
          setVideos(
            offlineVideos
          );

          console.log(
            "OFFLINE VIDEO FILES READY:",
            offlineVideos.length
          );
        } else {
          /*
           * No actual local files found.
           */
          console.warn(
            "VIDEO METADATA EXISTS BUT NO VIDEO FILES ARE CACHED."
          );

          /*
           * Keep YouTube metadata if present,
           * but local videos without cached files
           * cannot play.
           */
          const youtubeOnly =
            cachedVideos.filter(
              (video) =>
                isYoutube(
                  video.originalVideoUrl ||
                    video.videoUrl
                )
            );

          setVideos(
            youtubeOnly.map(
              (video) => ({
                ...video,
                originalVideoUrl:
                  video.originalVideoUrl ||
                  video.videoUrl,
                _offlineYoutube: true,
              })
            )
          );
        }
      } else {
        console.log(
          "NO BACKEND AND NO VIDEO CACHE"
        );

        setVideos([]);
        setUsingCache(false);

        setError(
          "Videos are currently unavailable."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    loadVideos();

    /*
     * eslint-disable-next-line react-hooks/exhaustive-deps
     */
  }, [i18n.language]);

  /* =========================================================
     REFRESH WHEN ADMIN CHANGES VIDEOS
  ========================================================= */

  useEffect(() => {
    function refreshVideos() {
      console.log(
        "Video update detected."
      );

      /*
       * Remove old video metadata so the
       * backend becomes the source of truth.
       */
      try {
        localStorage.removeItem(
          VIDEO_CACHE_KEY
        );
      } catch {
        // Ignore.
      }

      loadVideos();
    }

    window.addEventListener(
      "videos-updated",
      refreshVideos
    );

    return () => {
      window.removeEventListener(
        "videos-updated",
        refreshVideos
      );
    };

    /*
     * eslint-disable-next-line react-hooks/exhaustive-deps
     */
  }, []);

  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      /*
       * Blob URLs are temporary.
       */
      revokeBlobUrls(videos);
    };
  }, [videos]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <SectionTitle
          eyebrow={t("gallery.videos")}
          title={t("videos.title")}
          subtitle={t("videos.subtitle")}
        />

        {/* ===================================================
            CACHE STATUS
        =================================================== */}

        {!loading &&
          usingCache &&
          videos.length > 0 && (
            <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
              <p className="text-sm text-blue-700">
                Showing cached videos because
                the backend is currently unavailable.
              </p>
            </div>
          )}

        {/* ===================================================
            LOADING
        =================================================== */}

        {loading && (
          <div className="mt-12 flex min-h-[250px] items-center justify-center">
            <div className="text-center">

              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-600" />

              <p className="text-sm text-gray-500">
                {t(
                  "common.loading",
                  "Loading..."
                )}
              </p>

            </div>
          </div>
        )}

        {/* ===================================================
            ERROR
        =================================================== */}

        {!loading && error && (
          <div className="mt-10 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
            <p className="text-yellow-700">
              {error}
            </p>

            <button
              type="button"
              onClick={loadVideos}
              className="mt-4 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              {t(
                "common.tryAgain",
                "Try Again"
              )}
            </button>
          </div>
        )}

        {/* ===================================================
            VIDEO COUNT
        =================================================== */}

        {!loading &&
          !error &&
          videos.length > 0 && (
            <div className="mt-8 text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {videos.length}
              </span>{" "}
              {videos.length === 1
                ? "video"
                : "videos"}
            </div>
          )}

        {/* ===================================================
            VIDEO GRID
        =================================================== */}

        {!loading &&
          videos.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {videos.map(
                (video, index) => {
                  const originalUrl =
                    video.originalVideoUrl ||
                    video.videoUrl ||
                    "";

                  const youtube =
                    isYoutube(
                      originalUrl
                    );

                  const thumbnail =
                    video.thumbnailUrl
                      ? getVideoUrl(
                          video.thumbnailUrl
                        )
                      : youtube
                      ? youtubeThumbnail(
                          originalUrl
                        )
                      : "";

                  const videoUrl =
                    video.videoUrl;

                  return (
                    <article
                      key={`${video.id}-${index}`}
                      className="group overflow-hidden rounded-3xl bg-slate-950 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >

                      {/* =================================================
                          YOUTUBE VIDEO
                      ================================================= */}

                      {youtube ? (
                        <div className="relative aspect-video bg-black">

                          {thumbnail ? (
                            <img
                              src={thumbnail}
                              alt={
                                video.title ||
                                "Video thumbnail"
                              }
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-slate-900">
                              <Play
                                size={48}
                                className="text-white"
                                fill="currentColor"
                              />
                            </div>
                          )}

                          {video._offlineYoutube ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              <div className="rounded-xl bg-black/80 px-4 py-3 text-center text-sm text-white">
                                YouTube videos require
                                an internet connection.
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                window.open(
                                  originalUrl,
                                  "_blank",
                                  "noopener,noreferrer"
                                )
                              }
                              className="absolute inset-0 flex items-center justify-center"
                              aria-label={`Play ${video.title}`}
                            >
                              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl transition group-hover:scale-110">
                                <Play
                                  size={25}
                                  className="ml-1 text-orange-600"
                                  fill="currentColor"
                                />
                              </span>
                            </button>
                          )}

                        </div>
                      ) : (

                        /* =================================================
                           LOCAL VIDEO
                        ================================================= */

                        <div className="bg-black">

                          {video._offlineCached ? (
                            <div className="relative">

                              <video
                                src={videoUrl}
                                controls
                                playsInline
                                preload="metadata"
                                poster={
                                  thumbnail ||
                                  undefined
                                }
                                className="aspect-video w-full bg-black object-contain"
                                onError={(event) => {
                                  console.error(
                                    "OFFLINE VIDEO PLAYBACK ERROR:",
                                    video.originalVideoUrl,
                                    event
                                  );
                                }}
                              />

                              <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-green-600/90 px-3 py-1 text-xs font-medium text-white">
                                Offline
                              </div>

                            </div>
                          ) : (
                            <video
                              src={videoUrl}
                              controls
                              playsInline
                              preload="metadata"
                              poster={
                                thumbnail ||
                                undefined
                              }
                              className="aspect-video w-full bg-black object-contain"
                              onError={(event) => {
                                console.error(
                                  "LOCAL VIDEO ERROR:",
                                  videoUrl,
                                  event
                                );
                              }}
                            />
                          )}

                        </div>
                      )}

                      {/* =================================================
                          VIDEO INFORMATION
                      ================================================= */}

                      <div className="px-5 py-5">

                        <h3 className="text-lg font-semibold text-white">
                          {video.title}
                        </h3>

                        {video.category && (
                          <p className="mt-1 text-sm text-white/60">
                            {video.category}
                          </p>
                        )}

                        {video.description && (
                          <p className="mt-3 text-sm leading-6 text-white/70">
                            {video.description}
                          </p>
                        )}

                      </div>
                    </article>
                  );
                }
              )}

            </div>
          )}

        {/* ===================================================
            NO VIDEOS
        =================================================== */}

        {!loading &&
          !error &&
          videos.length === 0 && (
            <div className="mt-12 rounded-3xl border border-slate-100 bg-slate-50 py-20 text-center">
              <p className="text-gray-500">
                {t(
                  "gallery.noVideosFound",
                  "No videos found."
                )}
              </p>
            </div>
          )}

      </div>
    </section>
  );
};

export default Videos;