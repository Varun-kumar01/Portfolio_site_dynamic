// import { useEffect, useState } from "react";
// import { ArrowRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { API_BASE_URL } from "../../config";

// export default function GalleryPreview() {
//   const navigate = useNavigate();
//   const { i18n, t } = useTranslation();

//   const [gallery, setGallery] = useState({
//     label: "Gallery",
//     heading: "Moments That Define Public Service",
//     description:
//       "A glimpse into development initiatives, constituency visits, public meetings, celebrations and citizen engagement.",
//     images: [
//       "/gallery/1.png",
//       "/gallery/2.png",
//       "/gallery/3.png",
//       "/gallery/4.png",
//       "/gallery/5.png",
//     ],
//     largeImageTitle: "Community Development",
//     count: "500+",
//     countText: "Moments",
//   });

//   useEffect(() => {
//     const loadGalleryContent = async () => {
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/api/content?lang=${
//             i18n.language?.startsWith("te") ? "te" : "en"
//           }`
//         );

//         if (!response.ok) {
//           throw new Error("Failed to load Gallery Preview");
//         }

//         const data = await response.json();

//         if (data.home?.galleryPreview) {
//           setGallery((previousGallery) => ({
//             ...previousGallery,
//             ...data.home.galleryPreview,
//           }));
//         }
//       } catch (error) {
//         console.error(
//           "Error loading Gallery Preview:",
//           error
//         );
//       }
//     };

//     loadGalleryContent();
//   }, [i18n.language]);

//   const images = gallery.images || [];
//   const galleryText = {
//     label: t("home.galleryPreview.label"),
//     heading: `${t("home.galleryPreview.titleLine1")} ${t("home.galleryPreview.titleLine2")}`,
//     description: t("home.galleryPreview.description"),
//     largeImageTitle: t("home.galleryPreview.communityDev"),
//     countText: t("home.galleryPreview.momentsLabel"),
//   };

//   return (
//     <section className="py-16 lg:py-20 bg-white">

//       <div className="max-w-7xl mx-auto px-6 lg:px-8">

//         {/* Heading */}

//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

//           <div className="max-w-2xl">

//             <span className="uppercase tracking-[0.25em] text-orange-600 text-sm font-semibold">

//               {galleryText.label}

//             </span>

//             <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">

//               {galleryText.heading}

//             </h2>

//             <p className="mt-5 text-gray-600 leading-8">

//               {galleryText.description}

//             </p>

//           </div>

//           <button
//             onClick={() => navigate("/gallery")}
//             className="inline-flex items-center gap-2 text-orange-600 font-semibold group"
//           >

//               {t("home.galleryPreview.viewComplete")}

//             <ArrowRight
//               size={18}
//               className="group-hover:translate-x-1 transition"
//             />

//           </button>

//         </div>

//         {/* Gallery */}

//         <div className="grid lg:grid-cols-3 gap-5 mt-10">

//           {/* Large */}

//           <div className="lg:col-span-2 relative overflow-hidden rounded-[28px] group">

//             <img
//               src={images[0]}
//               alt={galleryText.largeImageTitle}
//               className="w-full h-[260px] md:h-[520px] object-cover transition duration-700 group-hover:scale-105"
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-8">

//               <div>

//                 <p className="text-white text-2xl font-semibold">

//                   {galleryText.largeImageTitle}

//                 </p>

//                 <button onClick={() => navigate("/gallery")}>

//                   <span className="text-white/80">

//                     {t("home.galleryPreview.viewPhoto")}

//                   </span>

//                 </button>

//               </div>

//             </div>

//           </div>

//           {/* Right Grid */}

//           <div className="grid grid-cols-2 lg:grid-cols-1 gap-5">

//             {images.slice(1, 3).map((image, index) => (

//               <div
//                 key={index}
//                 className="relative overflow-hidden rounded-[24px] group"
//               >

//                 <img
//                   src={image}
//                   alt={`Gallery ${index + 2}`}
//                   className="w-full h-[180px] lg:h-[248px] object-cover transition duration-700 group-hover:scale-105"
//                 />

//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">

//                   <button onClick={() => navigate("/gallery")}>

//                     <span className="text-white font-semibold">

//                       {t("home.galleryPreview.view")}

//                     </span>

//                   </button>

//                 </div>

//               </div>

//             ))}

//           </div>

//         </div>

//         {/* Bottom */}

//         <div className="grid md:grid-cols-3 gap-5 mt-5">

//           {images.slice(3, 5).map((image, index) => (

//             <div
//               key={index}
//               className="relative overflow-hidden rounded-[24px] group"
//             >

//               <img
//                 src={image}
//                 alt={`Gallery ${index + 4}`}
//                 className="w-full h-[200px] object-cover transition duration-700 group-hover:scale-105"
//               />

//               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">

//                 <span className="text-white font-semibold">

//                   View

//                 </span>

//               </div>

//             </div>

//           ))}

//           {/* Last Card */}

//           <div className="rounded-[24px] bg-gradient-to-br from-orange-600 to-orange-500 p-8 text-white flex flex-col justify-center">

//             <p className="uppercase tracking-widest text-sm">

//               {galleryText.label}

//             </p>

//             <h3 className="mt-3 text-3xl font-bold">

//               {gallery.count}

//               <br />

//               {galleryText.countText}

//             </h3>

//             <button
//               onClick={() => navigate("/gallery")}
//               className="mt-8 inline-flex items-center gap-2 font-semibold"
//             >

//               {t("home.galleryPreview.exploreGallery")}

//               <ArrowRight size={18} />

//             </button>

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }
import { useEffect, useState } from "react";
import {
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../../config";

// ======================================================
// CONFIGURATION
// ======================================================

const BASE_URL = String(API_BASE_URL || "").replace(/\/+$/, "");

const DB_NAME = "portfolio_gallery_cache";
const DB_VERSION = 1;
const STORE_NAME = "images";

const METADATA_KEY = "latest_gallery_metadata";
const GALLERY_DATA_KEY = "latest_gallery_data";


// ======================================================
// DEFAULT DATA
// ======================================================

const DEFAULT_GALLERY = {
  label: "",
  heading: "",
  description: "",
  images: [],
  mainTitle: "",
  momentsNumber: "",
  momentsText: "",
  largeImageTitle: "",
  count: "0",
  countText: "",
};


// ======================================================
// IMAGE URL NORMALIZER
// ======================================================

function getImageUrl(image) {
  if (!image) return "";

  // Object returned from API
  if (typeof image === "object") {
    image =
      image.image_url ||
      image.imageUrl ||
      image.image ||
      image.file_url ||
      image.fileUrl ||
      image.url ||
      "";
  }

  if (!image) return "";

  let value = String(image).trim();

  if (!value) return "";

  // Complete URL
  if (/^https?:\/\//i.test(value)) {
    try {
      const parsedUrl = new URL(value);
      value = parsedUrl.pathname;
    } catch {
      return value;
    }
  }

  // Remove beginning /
  value = value.replace(/^\/+/, "");

  // uploads/gallery/image.jpg
  if (value.startsWith("uploads/")) {
    return `${BASE_URL}/${value}`;
  }

  // gallery/image.jpg
  if (value.startsWith("gallery/")) {
    return `${BASE_URL}/uploads/${value}`;
  }

  // images/image.jpg
  if (value.startsWith("images/")) {
    return `${BASE_URL}/uploads/${value}`;
  }

  // Just filename
  if (
    !value.includes("/") &&
    !value.includes("\\")
  ) {
    return `${BASE_URL}/uploads/gallery/${value}`;
  }

  return `${BASE_URL}/${value}`;
}

function getImageCandidates(image) {
  const primaryUrl = getImageUrl(image);
  const candidates = primaryUrl ? [primaryUrl] : [];

  if (image) {
    const value = String(image).trim();
    const filename = value.split(/[\\/]/).pop();

    if (filename) {
      candidates.push(`${BASE_URL}/uploads/home/${filename}`);
      candidates.push(`${BASE_URL}/uploads/gallery/${filename}`);
    }
  }

  return [...new Set(candidates)];
}


// ======================================================
// NORMALIZE IMAGES
// ======================================================

function normalizeImages(images) {
  if (!Array.isArray(images)) {
    return [];
  }

  return images
    .map((image) => {
      if (typeof image === "string") {
        return image;
      }

      if (typeof image === "object") {
        return (
          image.image_url ||
          image.imageUrl ||
          image.image ||
          image.file_url ||
          image.fileUrl ||
          image.url ||
          ""
        );
      }

      return "";
    })
    .filter(Boolean)
    .slice(0, 5);
}


// ======================================================
// INDEXED DB
// ======================================================

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(
        new Error(
          "IndexedDB is not supported by this browser."
        )
      );

      return;
    }

    const request = indexedDB.open(
      DB_NAME,
      DB_VERSION
    );

    request.onupgradeneeded = () => {
      const db = request.result;

      if (
        !db.objectStoreNames.contains(
          STORE_NAME
        )
      ) {
        db.createObjectStore(
          STORE_NAME,
          {
            keyPath: "key",
          }
        );
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}


// ======================================================
// SAVE IMAGE TO INDEXED DB
// ======================================================

async function saveImageToCache(
  key,
  blob
) {
  try {
    const db = await openDatabase();

    await new Promise(
      (resolve, reject) => {
        const transaction =
          db.transaction(
            STORE_NAME,
            "readwrite"
          );

        const store =
          transaction.objectStore(
            STORE_NAME
          );

        store.put({
          key,
          blob,
          savedAt: Date.now(),
        });

        transaction.oncomplete =
          () => {
            resolve();
          };

        transaction.onerror = () => {
          reject(
            transaction.error
          );
        };
      }
    );

    db.close();
  } catch (error) {
    console.error(
      "Failed to save image:",
      error
    );
  }
}


// ======================================================
// GET IMAGE FROM INDEXED DB
// ======================================================

async function getImageFromCache(
  key
) {
  try {
    const db = await openDatabase();

    const result =
      await new Promise(
        (resolve, reject) => {
          const transaction =
            db.transaction(
              STORE_NAME,
              "readonly"
            );

          const store =
            transaction.objectStore(
              STORE_NAME
            );

          const request =
            store.get(key);

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

    db.close();

    return result?.blob || null;
  } catch (error) {
    console.error(
      "Failed to read cached image:",
      error
    );

    return null;
  }
}


// ======================================================
// IMAGE CACHE KEY
// ======================================================

function getCacheKey(image) {
  return `gallery-image-${image}`;
}


// ======================================================
// SAVE GALLERY METADATA
// ======================================================

function saveMetadata(gallery) {
  try {
    localStorage.setItem(
      METADATA_KEY,
      JSON.stringify(gallery)
    );
  } catch (error) {
    console.error(
      "Failed to save gallery metadata:",
      error
    );
  }
}


// ======================================================
// LOAD GALLERY METADATA
// ======================================================

function loadMetadata() {
  try {
    const value =
      localStorage.getItem(
        METADATA_KEY
      );

    if (!value) {
      return null;
    }

    const parsed =
      JSON.parse(value);

    if (!parsed) {
      return null;
    }

    return {
      ...DEFAULT_GALLERY,
      ...parsed,
      images: normalizeImages(
        parsed.images
      ).slice(0, 5),
    };
  } catch (error) {
    console.error(
      "Failed to load gallery metadata:",
      error
    );

    return null;
  }
}


// ======================================================
// CACHE ONE IMAGE
// ======================================================

async function downloadAndCacheImage(
  image
) {
  const urls = getImageCandidates(image);

  if (urls.length === 0) {
    return false;
  }

  const key =
    getCacheKey(image);

  try {
    for (const url of urls) {
      const response = await fetch(url, { cache: "no-store" });

      if (!response.ok) {
        continue;
      }

      const blob = await response.blob();

      if (blob.type.startsWith("image/")) {
        await saveImageToCache(getCacheKey(image), blob);
        return true;
      }
    }

    return false;
  } catch (error) {
    console.warn(
      "Could not download image:",
      urls[0],
      error
    );

    return false;
  }
}


// ======================================================
// CACHE ALL 5 IMAGES
// ======================================================

async function cacheFiveImages(
  images
) {
  const fiveImages =
    normalizeImages(images).slice(
      0,
      5
    );

  for (
    const image of fiveImages
  ) {
    await downloadAndCacheImage(
      image
    );
  }
}


// ======================================================
// FULLSCREEN IMAGE VIEWER
// ======================================================

function FullscreenViewer({
  images,
  selectedIndex,
  onClose,
  onPrevious,
  onNext,
}) {
  const [imageSources, setImageSources] =
    useState({});

  const selectedImage =
    images[selectedIndex];

  useEffect(() => {
    let active = true;

    const loadAllCachedImages =
      async () => {
        const sources = {};

        for (
          const image of images
        ) {
          const key =
            getCacheKey(image);

          const blob =
            await getImageFromCache(
              key
            );

          if (blob) {
            sources[image] =
              URL.createObjectURL(
                blob
              );
          }
        }

        if (active) {
          setImageSources(
            sources
          );
        }
      };

    loadAllCachedImages();

    return () => {
      active = false;

      Object.values(
        imageSources
      ).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [images]);

  const selectedSource =
    imageSources[selectedImage];

  useEffect(() => {
    const handleKeyboard =
      (event) => {
        if (
          event.key === "Escape"
        ) {
          onClose();
        }

        if (
          event.key ===
          "ArrowLeft"
        ) {
          onPrevious();
        }

        if (
          event.key ===
          "ArrowRight"
        ) {
          onNext();
        }
      };

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, [
    onClose,
    onPrevious,
    onNext,
  ]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >

      {/* CLOSE */}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
      >
        <X size={28} />
      </button>


      {/* PREVIOUS */}

      {images.length > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPrevious();
          }}
          className="absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
        >
          <ChevronLeft size={30} />
        </button>
      )}


      {/* IMAGE */}

      <div
        className="w-full h-full flex items-center justify-center px-16 py-16"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {selectedSource ? (
          <img
            src={selectedSource}
            alt={`Gallery ${
              selectedIndex + 1
            }`}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="text-white">
            Loading image...
          </div>
        )}

      </div>


      {/* NEXT */}

      {images.length > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          className="absolute right-4 md:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
        >
          <ChevronRight size={30} />
        </button>
      )}


      {/* COUNTER */}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-sm bg-white/10 px-4 py-2 rounded-full">
        {selectedIndex + 1} /{" "}
        {images.length}
      </div>

    </div>
  );
}


// ======================================================
// CACHED IMAGE
// ======================================================

function CachedImage({
  image,
  alt,
  className,
  onClick,
}) {
  const [src, setSrc] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [failed, setFailed] =
    useState(false);


  useEffect(() => {
    let active = true;

    let objectUrl = null;

    const load = async () => {
      setLoading(true);
      setFailed(false);


      // =================================================
      // FIRST: LOAD CACHED IMAGE
      // =================================================

      const cacheKey =
        getCacheKey(image);

      const cachedBlob =
        await getImageFromCache(
          cacheKey
        );

      if (
        cachedBlob &&
        active
      ) {
        objectUrl =
          URL.createObjectURL(
            cachedBlob
          );

        setSrc(objectUrl);
        setLoading(false);

        console.log(
          "Showing cached image:",
          image
        );
      }


      // =================================================
      // SECOND: TRY BACKEND
      // =================================================

      try {
        let blob = null;
        let url = "";

        for (const candidate of getImageCandidates(image)) {
          const response = await fetch(candidate, { cache: "no-store" });

          if (!response.ok) {
            continue;
          }

          const candidateBlob = await response.blob();

          if (candidateBlob.type.startsWith("image/")) {
            blob = candidateBlob;
            url = candidate;
            break;
          }
        }

        if (!blob) {
          throw new Error("No valid gallery image source found");
        }


        // Save newest version
        await saveImageToCache(
          cacheKey,
          blob
        );


        if (active) {
          const newUrl =
            URL.createObjectURL(
              blob
            );

          if (objectUrl) {
            URL.revokeObjectURL(
              objectUrl
            );
          }

          objectUrl = newUrl;

          setSrc(newUrl);
          setLoading(false);
          setFailed(false);

          console.log(
            "Showing latest backend image:",
            url
          );
        }

      } catch (error) {

        console.log(
          "Backend unavailable. Using cached image."
        );


        // Cached image already displayed
        if (
          active &&
          cachedBlob
        ) {
          setLoading(false);
          setFailed(false);
          return;
        }


        // Nothing cached
        if (active) {
          setLoading(false);
          setFailed(true);
        }
      }
    };

    load();

    return () => {
      active = false;

      if (objectUrl) {
        URL.revokeObjectURL(
          objectUrl
        );
      }
    };
  }, [image]);


  // ======================================================
  // LOADING
  // ======================================================

  if (
    loading &&
    !src
  ) {
    return (
      <div
        className={`${className} bg-gray-100 animate-pulse flex items-center justify-center`}
      >
        <span className="text-gray-400 text-sm">
          Loading...
        </span>
      </div>
    );
  }


  // ======================================================
  // ERROR
  // ======================================================

  if (
    failed &&
    !src
  ) {
    return (
      <div
        className={`${className} bg-gray-100 flex items-center justify-center`}
      >
        <span className="text-gray-400 text-sm">
          Image unavailable
        </span>
      </div>
    );
  }


  // ======================================================
  // IMAGE
  // ======================================================

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onClick={onClick}
    />
  );
}


// ======================================================
// MAIN COMPONENT
// ======================================================

export default function GalleryPreview() {
  const navigate =
    useNavigate();

  const {
    i18n,
    t,
  } = useTranslation();


  // ======================================================
  // LOAD OLD CACHED METADATA FIRST
  // ======================================================

  const savedGallery =
    loadMetadata() || loadGalleryData();


  const [
    gallery,
    setGallery,
  ] = useState(
    savedGallery ||
      DEFAULT_GALLERY
  );


  const [
    loading,
    setLoading,
  ] = useState(
    !savedGallery
  );


  // ======================================================
  // FULLSCREEN STATE
  // ======================================================

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState(null);


  // ======================================================
  // LOAD LATEST BACKEND DATA
  // ======================================================

  useEffect(() => {
    let active = true;


    const loadLatestGallery =
      async () => {
        try {
          const lang = i18n.language?.startsWith("te") ? "te" : "en";

          const url =
            `${BASE_URL}/api/content?lang=${lang}&t=${Date.now()}`;


          console.log(
            "Loading latest gallery:",
            url
          );


          const response =
            await fetch(url, {
              cache: "no-store",
            });


          if (!response.ok) {
            throw new Error(
              `HTTP ${response.status}`
            );
          }


          const data = await response.json();
          const backendGallery = data?.home?.galleryPreview;

          if (!backendGallery) {
            throw new Error("Home gallery preview is missing from the API response");
          }


          // =================================================
          // ONLY FIRST 5
          // =================================================

          const latestImages =
            normalizeImages(
              backendGallery.images
            ).slice(0, 5);


          const latestGallery = {
            ...DEFAULT_GALLERY,
            ...backendGallery,
            count: backendGallery.momentsNumber || backendGallery.count || "0",

            images:
              latestImages,
          };


          if (!active) {
            return;
          }


          // =================================================
          // SAVE LATEST METADATA
          // =================================================

          saveMetadata(
            latestGallery
          );

          saveGalleryData(latestGallery);


          // =================================================
          // UPDATE SCREEN
          // =================================================

          setGallery(
            latestGallery
          );

          setLoading(false);


          // =================================================
          // CACHE ACTUAL IMAGE FILES
          // =================================================

          await cacheFiveImages(
            latestImages
          );


          console.log(
            "================================="
          );

          console.log(
            "LATEST 5 GALLERY IMAGES CACHED"
          );

          console.log(
            "================================="
          );

        } catch (error) {

          console.warn(
            "Backend unavailable:",
            error
          );


          // =================================================
          // USE LAST SAVED DATA
          // =================================================

          const oldGallery =
            loadMetadata();


          if (
            active &&
            oldGallery
          ) {
            setGallery(
              oldGallery
            );
          }


          setLoading(false);
        }
      };


    loadLatestGallery();


    return () => {
      active = false;
    };

  }, [i18n.language]);


  // ======================================================
  // TRANSLATIONS
  // ======================================================

  const images =
    normalizeImages(
      gallery.images
    ).slice(0, 5);


  const galleryText = {
    label: gallery.label,
    heading: gallery.heading,
    description: gallery.description,
    largeImageTitle: gallery.mainTitle || gallery.largeImageTitle,
    countText: gallery.momentsText || gallery.countText,

    viewComplete: t(
      "home.galleryPreview.viewComplete",
      {
        defaultValue:
          "Explore More",
      }
    ),

    viewPhoto: t(
      "home.galleryPreview.viewPhoto",
      {
        defaultValue:
          "View Photo",
      }
    ),

    view: t(
      "home.galleryPreview.view",
      {
        defaultValue:
          "View",
      }
    ),

    exploreGallery: t(
      "home.galleryPreview.exploreGallery",
      {
        defaultValue:
          "Explore Gallery",
      }
    ),
  };


  // ======================================================
  // LOADING
  // ======================================================

  if (
    loading &&
    images.length === 0
  ) {
    return (
      <section className="py-16 lg:py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="h-6 w-32 bg-gray-100 animate-pulse rounded" />

          <div className="mt-5 h-14 w-full max-w-2xl bg-gray-100 animate-pulse rounded" />

          <div className="mt-10 grid lg:grid-cols-3 gap-5">

            <div className="lg:col-span-2 h-[520px] bg-gray-100 animate-pulse rounded-[28px]" />

            <div className="grid gap-5">

              <div className="h-[248px] bg-gray-100 animate-pulse rounded-[24px]" />

              <div className="h-[248px] bg-gray-100 animate-pulse rounded-[24px]" />

            </div>

          </div>

        </div>

      </section>
    );
  }


  // ======================================================
  // RENDER
  // ======================================================

  return (
    <>
      <section className="py-16 lg:py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">


          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <div className="max-w-2xl">

              <span className="uppercase tracking-[0.25em] text-orange-600 text-sm font-semibold">
                {galleryText.label}
              </span>


              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">

                {galleryText.heading}

              </h2>


              <p className="mt-5 text-gray-600 leading-8">

                {galleryText.description}

              </p>

            </div>


            {/* =================================================
                EXPLORE MORE
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                navigate("/gallery")
              }
              className="inline-flex items-center gap-2 text-orange-600 font-semibold group"
            >

              {galleryText.viewComplete}

              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />

            </button>

          </div>


          {/* ==================================================
              MAIN GALLERY
          ================================================== */}

          <div className="grid lg:grid-cols-3 gap-5 mt-10">


            {/* =================================================
                IMAGE 1
            ================================================= */}

            {images[0] && (

              <div
                className="lg:col-span-2 relative overflow-hidden rounded-[28px] group cursor-pointer"
                onClick={() =>
                  setSelectedIndex(0)
                }
              >

                <CachedImage
                  image={images[0]}
                  alt={
                    galleryText.largeImageTitle
                  }
                  className="w-full h-[260px] md:h-[520px] object-cover transition duration-700 group-hover:scale-105"
                />


                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-8 pointer-events-none">

                  <div>

                    <p className="text-white text-2xl font-semibold">

                      {
                        galleryText.largeImageTitle
                      }

                    </p>


                    <span className="text-white/80">

                      {
                        galleryText.viewPhoto
                      }

                    </span>

                  </div>

                </div>

              </div>

            )}


            {/* =================================================
                IMAGES 2 & 3
            ================================================== */}

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-5">

              {images
                .slice(1, 3)
                .map(
                  (
                    image,
                    index
                  ) => (

                    <div
                      key={`${image}-${index}`}
                      className="relative overflow-hidden rounded-[24px] group cursor-pointer"
                      onClick={() =>
                        setSelectedIndex(
                          index + 1
                        )
                      }
                    >

                      <CachedImage
                        image={image}
                        alt={`Gallery ${
                          index + 2
                        }`}
                        className="w-full h-[180px] lg:h-[248px] object-cover transition duration-700 group-hover:scale-105"
                      />


                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center pointer-events-none">

                        <span className="text-white font-semibold">

                          {
                            galleryText.view
                          }

                        </span>

                      </div>

                    </div>

                  )
                )}

            </div>

          </div>


          {/* ==================================================
              IMAGES 4 & 5 + CARD
          ================================================== */}

          <div className="grid md:grid-cols-3 gap-5 mt-5">


            {images
              .slice(3, 5)
              .map(
                (
                  image,
                  index
                ) => (

                  <div
                    key={`${image}-${index + 3}`}
                    className="relative overflow-hidden rounded-[24px] group cursor-pointer"
                    onClick={() =>
                      setSelectedIndex(
                        index + 3
                      )
                    }
                  >

                    <CachedImage
                      image={image}
                      alt={`Gallery ${
                        index + 4
                      }`}
                      className="w-full h-[200px] object-cover transition duration-700 group-hover:scale-105"
                    />


                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center pointer-events-none">

                      <span className="text-white font-semibold">

                        {
                          galleryText.view
                        }

                      </span>

                    </div>

                  </div>

                )
              )}


            {/* =================================================
                ORANGE CARD
            ================================================== */}

            <div className="rounded-[24px] bg-gradient-to-br from-orange-600 to-orange-500 p-8 text-white flex flex-col justify-center">

              <p className="uppercase tracking-widest text-sm">

                {galleryText.label}

              </p>


              <h3 className="mt-3 text-3xl font-bold">

                {gallery.momentsNumber || gallery.count}

                <br />

                {galleryText.countText}

              </h3>


              <button
                type="button"
                onClick={() =>
                  navigate("/gallery")
                }
                className="mt-8 inline-flex items-center gap-2 font-semibold"
              >

                {
                  galleryText.exploreGallery
                }

                <ArrowRight
                  size={18}
                />

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FULLSCREEN VIEWER
      ===================================================== */}

      {selectedIndex !== null && (

        <FullscreenViewer
          images={images}
          selectedIndex={
            selectedIndex
          }
          onClose={() =>
            setSelectedIndex(null)
          }
          onPrevious={() =>
            setSelectedIndex(
              (previous) =>
                previous <= 0
                  ? images.length -
                    1
                  : previous - 1
            )
          }
          onNext={() =>
            setSelectedIndex(
              (previous) =>
                previous >=
                images.length - 1
                  ? 0
                  : previous + 1
            )
          }
        />

      )}

    </>
  );
}

function loadGalleryData() {
  try {
    const value = localStorage.getItem(GALLERY_DATA_KEY);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.warn("Failed to load cached gallery data:", error);
    return null;
  }
}

function saveGalleryData(gallery) {
  try {
    localStorage.setItem(GALLERY_DATA_KEY, JSON.stringify(gallery));
  } catch (error) {
    console.warn("Failed to save cached gallery data:", error);
  }
}