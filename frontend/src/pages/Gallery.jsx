import { useEffect, useMemo, useState } from "react";
import { Play, X } from "lucide-react";

const API_URL = "http://localhost:5000/api/videos";
const CACHE_KEY = "gallery_videos_cache";

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

const fallbackVideos = [
  {
    id: "old-1",
    type: "video",
    category: "Public Events",
    title: "Public Programme",
    videoUrl: "https://www.youtube.com/watch?v=qFusARwKYPk",
    thumbnailUrl: "",
  },
  {
    id: "old-2",
    type: "video",
    category: "Meetings",
    title: "Public Interaction",
    videoUrl: "https://www.youtube.com/watch?v=XTZMEkK0F7s",
    thumbnailUrl: "",
  },
];

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

export default function Gallery() {
  const [type, setType] = useState("photo");
  const [category, setCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const [videos, setVideos] = useState(() => {
    const cached = getCachedVideos();

    if (cached.length > 0) {
      return cached;
    }

    return fallbackVideos;
  });

  const [loadingVideos, setLoadingVideos] = useState(false);
  const [usingCache, setUsingCache] = useState(false);

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
        throw new Error("Backend returned invalid video data.");
      }

      if (!response.ok) {
        throw new Error(
          result.message || `Server returned ${response.status}`
        );
      }

      if (!result.success) {
        throw new Error(
          result.message || "Unable to load videos."
        );
      }

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

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify(latestVideos)
      );

      setUsingCache(false);
    } catch (error) {
      console.error("GALLERY VIDEO ERROR:", error);

      const cached = getCachedVideos();

      if (cached.length > 0) {
        setVideos(cached);
        setUsingCache(true);
      } else {
        setVideos(fallbackVideos);
        setUsingCache(false);
      }
    } finally {
      setLoadingVideos(false);
    }
  }

  useEffect(() => {
    loadVideos();
  }, []);

  useEffect(() => {
    function refreshVideos() {
      loadVideos();
    }

    window.addEventListener("videos-updated", refreshVideos);
    window.addEventListener("focus", refreshVideos);

    return () => {
      window.removeEventListener("videos-updated", refreshVideos);
      window.removeEventListener("focus", refreshVideos);
    };
  }, []);

  const galleryItems = useMemo(() => {
    return [...photoItems, ...videos];
  }, [videos]);

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const typeMatch = item.type === type;

      const categoryMatch =
        category === "All" || item.category === category;

      return typeMatch && categoryMatch;
    });
  }, [galleryItems, type, category]);

  function changeType(newType) {
    setType(newType);
    setCategory("All");

    if (newType === "video") {
      loadVideos();
    }
  }

  return (
    <>
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* HEADER */}

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                Media Gallery
              </span>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                Moments of Public Service
              </h2>

              <p className="mt-4 leading-8 text-gray-600">
                Explore photographs and videos capturing public programmes,
                constituency visits, meetings and important events.
              </p>
            </div>

            {/* PHOTOS / VIDEOS */}

            <div className="flex w-fit rounded-full bg-slate-100 p-1">

              <button
                type="button"
                onClick={() => changeType("photo")}
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
                onClick={() => changeType("video")}
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

          {/* CACHE MESSAGE */}

          {type === "video" && usingCache && (
            <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
              Showing the latest saved video information because the backend is unavailable.
            </div>
          )}

          {/* LOADING */}

          {type === "video" && loadingVideos && (
            <p className="mt-5 text-sm text-gray-500">
              Updating videos...
            </p>
          )}

          {/* CATEGORIES */}

          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
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

          {/* GALLERY */}

          {filteredItems.length > 0 ? (
            <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

              {filteredItems.map((item, index) => {
                const video =
                  item.type === "video";

                const youtube =
                  video && isYoutube(item.videoUrl);

                const localVideo =
                  video &&
                  item.videoUrl &&
                  !youtube;

                const featured = index === 0;

                const thumbnail =
                  item.thumbnailUrl ||
                  (youtube
                    ? youtubeThumbnail(item.videoUrl)
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

                    {/* LOCAL UPLOADED VIDEO */}

                    {localVideo ? (
                      <div className="bg-black">

                        <video
                          key={item.videoUrl}
                          src={item.videoUrl}
                          controls
                          playsInline
                          preload="metadata"
                          poster={thumbnail || undefined}
                          className={`block w-full bg-black object-contain ${
                            featured
                              ? "h-[300px] md:h-[520px]"
                              : "h-[220px] md:h-[250px]"
                          }`}
                          onError={(event) => {
                            console.error(
                              "VIDEO PLAY ERROR:",
                              item.videoUrl,
                              event
                            );
                          }}
                        />

                        <div className="bg-slate-950 px-4 py-4">
                          <p className="text-base font-semibold text-white">
                            {item.title}
                          </p>

                          <p className="mt-1 text-sm text-white/60">
                            {item.category}
                          </p>

                          {item.description && (
                            <p className="mt-2 text-sm leading-6 text-white/70">
                              {item.description}
                            </p>
                          )}
                        </div>

                      </div>
                    ) : (
                      <>
                        {/* PHOTO / YOUTUBE */}

                        <img
                          src={
                            item.type === "photo"
                              ? item.image
                              : thumbnail ||
                                "/gallery/placeholder.png"
                          }
                          alt={item.title}
                          onClick={() => {
                            if (item.type === "photo") {
                              setSelectedImage(item.image);
                            }

                            if (youtube) {
                              window.open(
                                item.videoUrl,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            }
                          }}
                          className={`w-full cursor-pointer object-cover transition duration-700 hover:scale-105 ${
                            featured
                              ? "h-[300px] md:h-[520px]"
                              : "h-[220px] md:h-[250px]"
                          }`}
                        />

                        {/* PHOTO OVERLAY */}

                        {item.type === "photo" && (
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition duration-500 hover:opacity-100">
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <p className="text-lg font-semibold text-white">
                                {item.title}
                              </p>

                              <p className="mt-1 text-sm text-white/70">
                                {item.category}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* YOUTUBE PLAY BUTTON */}

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
              })}

            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-slate-100 bg-slate-50 py-20 text-center">
              <p className="text-gray-500">
                No{" "}
                {type === "photo" ? "photos" : "videos"}{" "}
                found in this category.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* PHOTO LIGHTBOX */}

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={24} />
          </button>

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