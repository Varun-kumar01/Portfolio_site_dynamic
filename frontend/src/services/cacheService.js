// /**
//  * Cache Service
//  * Provides utilities for caching API responses to localStorage
//  * and retrieving cached data when backend is unavailable
//  */

// /**
//  * Set cache for any data
//  * @param {string} key - Cache key
//  * @param {any} data - Data to cache
//  */
// export const setCache = (key, data) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(data));
//   } catch (error) {
//     console.warn(`Failed to cache ${key}:`, error);
//   }
// };

// /**
//  * Get cache for any data
//  * @param {string} key - Cache key
//  * @param {any} defaultValue - Default value if cache miss
//  * @returns {any} Cached data or default value
//  */
// export const getCache = (key, defaultValue = null) => {
//   try {
//     const cached = localStorage.getItem(key);
//     return cached ? JSON.parse(cached) : defaultValue;
//   } catch (error) {
//     console.warn(`Failed to retrieve cache ${key}:`, error);
//     return defaultValue;
//   }
// };

// /**
//  * Clear cache for a specific key
//  * @param {string} key - Cache key to clear
//  */
// export const clearCache = (key) => {
//   try {
//     localStorage.removeItem(key);
//   } catch (error) {
//     console.warn(`Failed to clear cache ${key}:`, error);
//   }
// };

// /**
//  * Fetch with cache fallback
//  * @param {string} url - URL to fetch
//  * @param {string} cacheKey - Key for caching
//  * @param {object} options - Fetch options
//  * @returns {Promise<object>} API response data
//  */
// export const fetchWithCache = async (url, cacheKey, options = {}) => {
//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//       ...options,
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}`);
//     }

//     const data = await response.json();

//     // Cache successful response
//     setCache(cacheKey, data);

//     return data;
//   } catch (error) {
//     console.error(`Fetch failed for ${url}:`, error);

//     // Try to return cached data on failure
//     const cached = getCache(cacheKey);
//     if (cached) {
//       console.log(`Using cached data for ${cacheKey}`);
//       return cached;
//     }

//     throw error;
//   }
// };

// /**
//  * Fetch content with language support and caching
//  * @param {string} language - Language code (en or te)
//  * @param {string} baseUrl - Base API URL
//  * @param {string} endpoint - API endpoint
//  * @returns {Promise<object>} Content data
//  */
// export const fetchContentWithCache = async (language, baseUrl, endpoint = "/api/content") => {
//   const cacheKey = `content_${language}_${endpoint}`;
//   const url = `${baseUrl}${endpoint}?lang=${language}`;

//   return fetchWithCache(url, cacheKey);
// };

// /**
//  * Check if backend is available
//  * @param {string} baseUrl - Base API URL
//  * @returns {Promise<boolean>} True if backend is reachable
//  */
// export const isBackendAvailable = async (baseUrl) => {
//   try {
//     const response = await fetch(`${baseUrl}/api/health`, {
//       method: "GET",
//       cache: "no-store",
//       timeout: 3000,
//     });
//     return response.ok;
//   } catch (error) {
//     return false;
//   }
// };

// /**
//  * Cache an image by converting it to base64
//  * @param {string} imageUrl - URL of the image to cache
//  * @param {string} cacheKey - Key for storing the cached image
//  * @returns {Promise<string>} Base64 data URL or original URL if caching fails
//  */
// export const cacheImageAsBase64 = async (imageUrl, cacheKey) => {
//   try {
//     const response = await fetch(imageUrl, {
//       method: "GET",
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       return imageUrl; // Return original URL if fetch fails
//     }

//     const blob = await response.blob();
//     const reader = new FileReader();

//     return new Promise((resolve) => {
//       reader.onloadend = () => {
//         const base64Data = reader.result;
//         try {
//           // Store base64 with metadata
//           localStorage.setItem(
//             cacheKey,
//             JSON.stringify({
//               base64: base64Data,
//               originalUrl: imageUrl,
//               cachedAt: Date.now(),
//             })
//           );
//           resolve(base64Data);
//         } catch (error) {
//           console.warn(`Failed to cache image ${imageUrl}:`, error);
//           resolve(imageUrl); // Fallback to original URL
//         }
//       };
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     console.error(`Error caching image ${imageUrl}:`, error);
//     return imageUrl; // Fallback to original URL
//   }
// };

// /**
//  * Get cached image as base64
//  * @param {string} cacheKey - Cache key for the image
//  * @returns {string|null} Base64 data URL or null if not cached
//  */
// export const getCachedImageBase64 = (cacheKey) => {
//   try {
//     const cached = localStorage.getItem(cacheKey);
//     if (!cached) {
//       return null;
//     }

//     const data = JSON.parse(cached);
//     return data.base64 || null;
//   } catch (error) {
//     console.warn(`Failed to retrieve cached image ${cacheKey}:`, error);
//     return null;
//   }
// };

// /**
//  * Clear cached image
//  * @param {string} cacheKey - Cache key for the image
//  */
// export const clearCachedImage = (cacheKey) => {
//   try {
//     localStorage.removeItem(cacheKey);
//   } catch (error) {
//     console.warn(`Failed to clear cached image ${cacheKey}:`, error);
//   }
// };





/**
 * ============================================================
 * CACHE SERVICE
 * ============================================================
 *
 * Purpose:
 * - Cache API JSON data
 * - Cache images as real Blob objects using IndexedDB
 * - Provide cached data when backend/API is unavailable
 * - Keep API as the source of truth
 * - Support cache-first + background refresh
 *
 * Storage:
 * - JSON/API data  -> localStorage
 * - Images         -> IndexedDB
 *
 * This service is shared by:
 * - PoliticalJourney.jsx
 * - Gallery.jsx
 * ============================================================
 */

/* ============================================================
   CONFIGURATION
============================================================ */

const IMAGE_DB_NAME = "portfolio_image_cache";
const IMAGE_DB_VERSION = 1;
const IMAGE_STORE_NAME = "images";

/*
 * Version the JSON cache keys so that if the data structure
 * changes in the future, we can easily invalidate old cache.
 */
const CACHE_VERSION = "v1";

/* ============================================================
   LOCAL STORAGE - JSON CACHE
============================================================ */

/**
 * Create a versioned cache key.
 *
 * Example:
 * createCacheKey("political_career_en")
 * =>
 * "portfolio_cache_v1_political_career_en"
 */
export const createCacheKey = (key) => {
  return `portfolio_cache_${CACHE_VERSION}_${key}`;
};

/**
 * Save JSON/API data to localStorage.
 *
 * @param {string} key
 * @param {*} data
 */
export const setCache = (key, data) => {
  try {
    const cacheKey = createCacheKey(key);

    const cacheObject = {
      data,
      cachedAt: Date.now(),
    };

    localStorage.setItem(cacheKey, JSON.stringify(cacheObject));

    return true;
  } catch (error) {
    /*
     * localStorage can fail because of:
     * - quota exceeded
     * - private browsing restrictions
     * - invalid data
     *
     * The application should continue working even if
     * caching fails.
     */
    console.warn(`Failed to cache data for "${key}":`, error);

    return false;
  }
};

/**
 * Get JSON/API data from localStorage.
 *
 * Supports both:
 * 1. New cache format:
 *    { data: ..., cachedAt: ... }
 *
 * 2. Old cache format:
 *    direct JSON data
 *
 * This allows existing users to continue using their
 * previously stored cache.
 *
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
export const getCache = (key, defaultValue = null) => {
  try {
    const cacheKey = createCacheKey(key);

    let cached = localStorage.getItem(cacheKey);

    /*
     * Backward compatibility:
     *
     * Your previous cacheService stored data using the
     * original key without the portfolio_cache_v1 prefix.
     */
    if (!cached) {
      cached = localStorage.getItem(key);
    }

    if (!cached) {
      return defaultValue;
    }

    const parsed = JSON.parse(cached);

    /*
     * New cache format.
     */
    if (
      parsed &&
      typeof parsed === "object" &&
      Object.prototype.hasOwnProperty.call(parsed, "data") &&
      Object.prototype.hasOwnProperty.call(parsed, "cachedAt")
    ) {
      return parsed.data;
    }

    /*
     * Old cache format.
     */
    return parsed;
  } catch (error) {
    console.warn(`Failed to retrieve cache for "${key}":`, error);

    return defaultValue;
  }
};

/**
 * Get cache metadata.
 *
 * Useful when you want to know when the cache was updated.
 *
 * @param {string} key
 * @returns {{data: *, cachedAt: number}|null}
 */
export const getCacheWithMetadata = (key) => {
  try {
    const cacheKey = createCacheKey(key);

    let cached = localStorage.getItem(cacheKey);

    /*
     * Check old key for backward compatibility.
     */
    if (!cached) {
      cached = localStorage.getItem(key);
    }

    if (!cached) {
      return null;
    }

    const parsed = JSON.parse(cached);

    /*
     * New format.
     */
    if (
      parsed &&
      typeof parsed === "object" &&
      Object.prototype.hasOwnProperty.call(parsed, "data")
    ) {
      return {
        data: parsed.data,
        cachedAt: parsed.cachedAt || 0,
      };
    }

    /*
     * Old format.
     */
    return {
      data: parsed,
      cachedAt: 0,
    };
  } catch (error) {
    console.warn(`Failed to retrieve cache metadata for "${key}":`, error);

    return null;
  }
};

/**
 * Check whether cache exists.
 *
 * @param {string} key
 * @returns {boolean}
 */
export const hasCache = (key) => {
  try {
    const cacheKey = createCacheKey(key);

    return (
      localStorage.getItem(cacheKey) !== null ||
      localStorage.getItem(key) !== null
    );
  } catch (error) {
    return false;
  }
};

/**
 * Clear a specific cache.
 *
 * @param {string} key
 */
export const clearCache = (key) => {
  try {
    localStorage.removeItem(createCacheKey(key));

    /*
     * Also remove the old key if it exists.
     */
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to clear cache "${key}":`, error);
  }
};

/**
 * Clear all portfolio JSON caches.
 *
 * This only removes keys created by this service.
 * Other localStorage data is untouched.
 */
export const clearAllCaches = () => {
  try {
    const prefix = "portfolio_cache_";

    const keysToRemove = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key && key.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.warn("Failed to clear all portfolio caches:", error);
  }
};

/* ============================================================
   INDEXEDDB - IMAGE CACHE
============================================================ */

/**
 * Open the IndexedDB database.
 *
 * IndexedDB is used instead of localStorage for images because
 * images can be much larger than normal JSON data.
 *
 * @returns {Promise<IDBDatabase>}
 */
const openImageDatabase = () => {
  return new Promise((resolve, reject) => {
    /*
     * Check browser support.
     */
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB is not supported by this browser."));
      return;
    }

    const request = indexedDB.open(
      IMAGE_DB_NAME,
      IMAGE_DB_VERSION
    );

    /**
     * Create object store during first installation or upgrade.
     */
    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(IMAGE_STORE_NAME)) {
        db.createObjectStore(IMAGE_STORE_NAME, {
          keyPath: "key",
        });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(
        request.error ||
          new Error("Unable to open image cache database.")
      );
    };
  });
};

/**
 * Normalize an image URL before using it as a cache key.
 *
 * Example:
 *
 * http://localhost:5000/uploads/photo.jpg?v=123
 *
 * becomes:
 *
 * http://localhost:5000/uploads/photo.jpg
 *
 * This prevents every cache-busting query parameter from
 * creating a completely new image cache entry.
 *
 * @param {string} imageUrl
 * @returns {string}
 */
export const normalizeImageUrl = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== "string") {
    return "";
  }

  try {
    const url = new URL(imageUrl, window.location.origin);

    /*
     * Remove cache-busting query parameters.
     */
    url.search = "";

    /*
     * Remove hash.
     */
    url.hash = "";

    return url.toString();
  } catch (error) {
    /*
     * If URL parsing fails, perform a simple fallback.
     */
    return imageUrl.split("?")[0].split("#")[0];
  }
};

/**
 * Create a stable IndexedDB key for an image.
 *
 * @param {string} imageUrl
 * @param {string} customKey
 * @returns {string}
 */
export const createImageCacheKey = (
  imageUrl,
  customKey = ""
) => {
  /*
   * If the page supplies its own key, prefer it.
   *
   * Example:
   * political_career_image_123
   */
  if (customKey) {
    return `image_${customKey}`;
  }

  const normalizedUrl = normalizeImageUrl(imageUrl);

  return `image_${normalizedUrl}`;
};

/**
 * Store an image Blob in IndexedDB.
 *
 * @param {string} imageUrl
 * @param {Blob} blob
 * @param {string} customKey
 * @returns {Promise<boolean>}
 */
const saveImageBlob = async (
  imageUrl,
  blob,
  customKey = ""
) => {
  try {
    const db = await openImageDatabase();

    const key = createImageCacheKey(
      imageUrl,
      customKey
    );

    return new Promise((resolve) => {
      const transaction = db.transaction(
        IMAGE_STORE_NAME,
        "readwrite"
      );

      const store = transaction.objectStore(
        IMAGE_STORE_NAME
      );

      store.put({
        key,
        blob,
        originalUrl: imageUrl,
        normalizedUrl: normalizeImageUrl(imageUrl),
        cachedAt: Date.now(),
      });

      transaction.oncomplete = () => {
        db.close();
        resolve(true);
      };

      transaction.onerror = () => {
        db.close();

        console.warn(
          `Failed to save image cache: ${imageUrl}`,
          transaction.error
        );

        resolve(false);
      };
    });
  } catch (error) {
    console.warn(
      `Failed to open image cache for "${imageUrl}":`,
      error
    );

    return false;
  }
};

/**
 * Cache an image from a URL.
 *
 * @param {string} imageUrl
 * @param {string} customKey
 * @returns {Promise<string>}
 *
 * Returns the original URL so callers can continue using it.
 */
export const cacheImage = async (
  imageUrl,
  customKey = ""
) => {
  if (!imageUrl || typeof imageUrl !== "string") {
    return imageUrl;
  }

  try {
    const response = await fetch(imageUrl, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(
        `Image request failed (${response.status}): ${imageUrl}`
      );

      return imageUrl;
    }

    const blob = await response.blob();

    if (!blob || blob.size === 0) {
      return imageUrl;
    }

    await saveImageBlob(
      imageUrl,
      blob,
      customKey
    );

    return imageUrl;
  } catch (error) {
    /*
     * Image caching failure should NEVER break the page.
     */
    console.warn(
      `Failed to cache image "${imageUrl}":`,
      error
    );

    return imageUrl;
  }
};

/**
 * Cache multiple images.
 *
 * Images are downloaded in parallel.
 *
 * @param {Array<string>} imageUrls
 * @returns {Promise<void>}
 */
export const cacheImages = async (imageUrls = []) => {
  if (!Array.isArray(imageUrls)) {
    return;
  }

  const uniqueUrls = [
    ...new Set(
      imageUrls.filter(
        (url) =>
          typeof url === "string" &&
          url.trim() !== ""
      )
    ),
  ];

  if (uniqueUrls.length === 0) {
    return;
  }

  /*
   * Use Promise.allSettled so that one failed image
   * does not stop the others from being cached.
   */
  await Promise.allSettled(
    uniqueUrls.map((url) =>
      cacheImage(url)
    )
  );
};

/**
 * Get an image Blob from IndexedDB.
 *
 * @param {string} imageUrl
 * @param {string} customKey
 * @returns {Promise<Blob|null>}
 */
export const getCachedImageBlob = async (
  imageUrl,
  customKey = ""
) => {
  if (!imageUrl) {
    return null;
  }

  try {
    const db = await openImageDatabase();

    const key = createImageCacheKey(
      imageUrl,
      customKey
    );

    return new Promise((resolve) => {
      const transaction = db.transaction(
        IMAGE_STORE_NAME,
        "readonly"
      );

      const store = transaction.objectStore(
        IMAGE_STORE_NAME
      );

      const request = store.get(key);

      request.onsuccess = () => {
        db.close();

        const result = request.result;

        if (!result || !result.blob) {
          resolve(null);
          return;
        }

        resolve(result.blob);
      };

      request.onerror = () => {
        db.close();

        console.warn(
          `Failed to retrieve cached image: ${imageUrl}`
        );

        resolve(null);
      };
    });
  } catch (error) {
    console.warn(
      `Failed to get cached image "${imageUrl}":`,
      error
    );

    return null;
  }
};

/**
 * Get a cached image as an object URL.
 *
 * This is useful directly in React:
 *
 * const cachedUrl = await getCachedImageUrl(imageUrl);
 * setImage(cachedUrl);
 *
 * IMPORTANT:
 * The component should call URL.revokeObjectURL()
 * when the image is no longer needed.
 *
 * @param {string} imageUrl
 * @param {string} customKey
 * @returns {Promise<string|null>}
 */
export const getCachedImageUrl = async (
  imageUrl,
  customKey = ""
) => {
  try {
    const blob = await getCachedImageBlob(
      imageUrl,
      customKey
    );

    if (!blob) {
      return null;
    }

    return URL.createObjectURL(blob);
  } catch (error) {
    console.warn(
      `Failed to create cached image URL: ${imageUrl}`,
      error
    );

    return null;
  }
};

/**
 * Check whether an image is already cached.
 *
 * @param {string} imageUrl
 * @param {string} customKey
 * @returns {Promise<boolean>}
 */
export const hasCachedImage = async (
  imageUrl,
  customKey = ""
) => {
  const blob = await getCachedImageBlob(
    imageUrl,
    customKey
  );

  return !!blob;
};

/**
 * Delete one cached image.
 *
 * @param {string} imageUrl
 * @param {string} customKey
 * @returns {Promise<boolean>}
 */
export const clearCachedImage = async (
  imageUrl,
  customKey = ""
) => {
  if (!imageUrl && !customKey) {
    return false;
  }

  try {
    const db = await openImageDatabase();

    const key = createImageCacheKey(
      imageUrl || "",
      customKey
    );

    return new Promise((resolve) => {
      const transaction = db.transaction(
        IMAGE_STORE_NAME,
        "readwrite"
      );

      const store = transaction.objectStore(
        IMAGE_STORE_NAME
      );

      store.delete(key);

      transaction.oncomplete = () => {
        db.close();
        resolve(true);
      };

      transaction.onerror = () => {
        db.close();

        console.warn(
          `Failed to clear cached image: ${key}`
        );

        resolve(false);
      };
    });
  } catch (error) {
    console.warn(
      "Failed to clear cached image:",
      error
    );

    return false;
  }
};

/**
 * Clear every cached image.
 *
 * This does NOT clear JSON/localStorage cache.
 */
export const clearAllCachedImages = async () => {
  try {
    const db = await openImageDatabase();

    return new Promise((resolve) => {
      const transaction = db.transaction(
        IMAGE_STORE_NAME,
        "readwrite"
      );

      const store = transaction.objectStore(
        IMAGE_STORE_NAME
      );

      store.clear();

      transaction.oncomplete = () => {
        db.close();
        resolve(true);
      };

      transaction.onerror = () => {
        db.close();

        console.warn(
          "Failed to clear image cache."
        );

        resolve(false);
      };
    });
  } catch (error) {
    console.warn(
      "Failed to clear all cached images:",
      error
    );

    return false;
  }
};

/* ============================================================
   BACKWARD COMPATIBILITY
============================================================ */

/**
 * ------------------------------------------------------------
 * OLD API:
 * cacheImageAsBase64()
 * ------------------------------------------------------------
 *
 * Your existing Gallery.jsx currently imports:
 *
 * cacheImageAsBase64
 *
 * We keep the function so the application does not break
 * immediately if another component still imports it.
 *
 * However, we NO LONGER store Base64 images in localStorage.
 *
 * The image is stored as a Blob in IndexedDB instead.
 */
export const cacheImageAsBase64 = async (
  imageUrl,
  cacheKey = ""
) => {
  try {
    await cacheImage(
      imageUrl,
      cacheKey
    );

    /*
     * Return the original URL.
     *
     * The updated Gallery.jsx / PoliticalJourney.jsx will
     * use getCachedImageUrl() when it needs the offline
     * version of the image.
     */
    return imageUrl;
  } catch (error) {
    console.warn(
      `Failed to cache image "${imageUrl}":`,
      error
    );

    return imageUrl;
  }
};

/**
 * ------------------------------------------------------------
 * OLD API:
 * getCachedImageBase64()
 * ------------------------------------------------------------
 *
 * Kept for backward compatibility.
 *
 * New code should use:
 *
 * getCachedImageUrl()
 *
 * instead.
 *
 * This function returns null when an old Base64 cache is not
 * available. It does NOT convert the IndexedDB Blob to Base64.
 */
export const getCachedImageBase64 = (
  cacheKey
) => {
  try {
    /*
     * Check old localStorage image cache first.
     *
     * This allows old cached images to continue working
     * until they are replaced by IndexedDB.
     */
    const cached = localStorage.getItem(
      cacheKey
    );

    if (!cached) {
      return null;
    }

    const data = JSON.parse(cached);

    if (
      data &&
      typeof data === "object" &&
      data.base64
    ) {
      return data.base64;
    }

    /*
     * Sometimes the old implementation may have stored
     * a raw Base64 string.
     */
    if (typeof data === "string") {
      return data;
    }

    return null;
  } catch (error) {
    console.warn(
      `Failed to retrieve old cached image "${cacheKey}":`,
      error
    );

    return null;
  }
};

/**
 * ------------------------------------------------------------
 * OLD API:
 * clearCachedImage(cacheKey)
 * ------------------------------------------------------------
 *
 * The new clearCachedImage function already supports the
 * same purpose.
 *
 * We also remove old localStorage image entries.
 */
export const clearLegacyCachedImage = (
  cacheKey
) => {
  try {
    localStorage.removeItem(cacheKey);

    return true;
  } catch (error) {
    console.warn(
      `Failed to clear legacy image cache "${cacheKey}":`,
      error
    );

    return false;
  }
};

/* ============================================================
   API FETCH HELPERS
============================================================ */

/**
 * Fetch fresh data from the backend.
 *
 * IMPORTANT:
 * This function does NOT automatically fall back to cache.
 *
 * That is intentional.
 *
 * The React pages will:
 *
 * 1. Read cache first.
 * 2. Display cache.
 * 3. Fetch API in background.
 * 4. Update cache if API succeeds.
 *
 * This gives proper cache-first / stale-while-revalidate
 * behavior.
 *
 * @param {string} url
 * @param {object} options
 * @returns {Promise<any>}
 */
export const fetchFresh = async (
  url,
  options = {}
) => {
  const response = await fetch(url, {
    method: "GET",
    ...options,
    headers: {
      /*
       * Do not overwrite custom headers supplied by caller.
       */
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },

    /*
     * We want the latest data from the backend.
     */
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
};

/**
 * Fetch fresh data and cache it if successful.
 *
 * @param {string} url
 * @param {string} cacheKey
 * @param {object} options
 * @returns {Promise<any>}
 */
export const fetchAndCache = async (
  url,
  cacheKey,
  options = {}
) => {
  const data = await fetchFresh(
    url,
    options
  );

  /*
   * Only cache after a successful API request.
   */
  setCache(cacheKey, data);

  return data;
};

/**
 * Fetch with cache fallback.
 *
 * This function is retained for compatibility with existing
 * components that use the old fetchWithCache() API.
 *
 * New pages should preferably implement:
 *
 * cache first -> render -> background refresh
 *
 * rather than waiting for this function.
 *
 * @param {string} url
 * @param {string} cacheKey
 * @param {object} options
 * @returns {Promise<any>}
 */
export const fetchWithCache = async (
  url,
  cacheKey,
  options = {}
) => {
  try {
    const data = await fetchAndCache(
      url,
      cacheKey,
      options
    );

    return data;
  } catch (error) {
    console.warn(
      `Fetch failed for "${url}". Trying cache...`,
      error
    );

    const cached = getCache(
      cacheKey,
      null
    );

    if (cached !== null) {
      console.log(
        `Using cached data for "${cacheKey}".`
      );

      return cached;
    }

    throw error;
  }
};

/* ============================================================
   LANGUAGE-SPECIFIC CONTENT
============================================================ */

/**
 * Fetch content with language support.
 *
 * @param {string} language
 * @param {string} baseUrl
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
export const fetchContentWithCache = async (
  language,
  baseUrl,
  endpoint = "/api/content"
) => {
  const safeLanguage =
    language || "en";

  const cacheKey = `content_${safeLanguage}_${endpoint}`;

  const separator = endpoint.includes("?")
    ? "&"
    : "?";

  const url =
    `${baseUrl}${endpoint}` +
    `${separator}lang=${encodeURIComponent(
      safeLanguage
    )}`;

  return fetchWithCache(
    url,
    cacheKey
  );
};

/* ============================================================
   BACKEND HEALTH CHECK
============================================================ */

/**
 * Check whether backend is available.
 *
 * NOTE:
 * fetch() does not support a "timeout" option directly.
 *
 * Therefore AbortController is used.
 *
 * @param {string} baseUrl
 * @param {number} timeoutMs
 * @returns {Promise<boolean>}
 */
export const isBackendAvailable = async (
  baseUrl,
  timeoutMs = 3000
) => {
  let controller = null;
  let timeoutId = null;

  try {
    controller = new AbortController();

    timeoutId = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    const response = await fetch(
      `${baseUrl}/api/health`,
      {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
      }
    );

    return response.ok;
  } catch (error) {
    return false;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
};

/* ============================================================
   CACHE-FIRST / BACKGROUND REFRESH HELPER
============================================================ */

/**
 * Load cached data immediately and refresh from API in the
 * background.
 *
 * This helper is optional. PoliticalJourney.jsx and Gallery.jsx
 * can use it to implement the same behavior consistently.
 *
 * Flow:
 *
 * 1. Read cache.
 * 2. Call onCache if cache exists.
 * 3. Fetch API.
 * 4. Cache API response.
 * 5. Call onFresh with latest data.
 * 6. If API fails, call onError while keeping cache visible.
 *
 * @param {Object} config
 *
 * config:
 * {
 *   url: string,
 *   cacheKey: string,
 *   onCache?: function,
 *   onFresh?: function,
 *   onError?: function,
 *   options?: object
 * }
 *
 * @returns {Promise<Object>}
 */
export const loadCacheThenRefresh = async ({
  url,
  cacheKey,
  onCache,
  onFresh,
  onError,
  options = {},
}) => {
  /*
   * ----------------------------------------------------------
   * STEP 1: Load cache immediately
   * ----------------------------------------------------------
   */
  const cachedData = getCache(
    cacheKey,
    null
  );

  if (
    cachedData !== null &&
    typeof onCache === "function"
  ) {
    try {
      onCache(cachedData);
    } catch (error) {
      console.warn(
        `Cache callback failed for "${cacheKey}":`,
        error
      );
    }
  }

  /*
   * ----------------------------------------------------------
   * STEP 2: Fetch latest data
   * ----------------------------------------------------------
   */
  try {
    const freshData = await fetchAndCache(
      url,
      cacheKey,
      options
    );

    if (typeof onFresh === "function") {
      try {
        onFresh(freshData);
      } catch (error) {
        console.warn(
          `Fresh-data callback failed for "${cacheKey}":`,
          error
        );
      }
    }

    return {
      data: freshData,
      fromCache: false,
      refreshed: true,
    };
  } catch (error) {
    /*
     * Cache remains untouched because the API request failed.
     *
     * This is important:
     *
     * OLD cache = last known good data
     *
     * We should NEVER replace it with an error/empty response.
     */
    if (typeof onError === "function") {
      try {
        onError(error, cachedData);
      } catch (callbackError) {
        console.warn(
          `Error callback failed for "${cacheKey}":`,
          callbackError
        );
      }
    }

    return {
      data: cachedData,
      fromCache: cachedData !== null,
      refreshed: false,
      error,
    };
  }
};

/* ============================================================
   CACHE CLEANUP
============================================================ */

/**
 * Clear both JSON and image caches.
 *
 * Useful for development/testing or an optional
 * "Clear cache" functionality.
 *
 * @returns {Promise<boolean>}
 */
export const clearPortfolioCache = async () => {
  try {
    clearAllCaches();

    await clearAllCachedImages();

    return true;
  } catch (error) {
    console.warn(
      "Failed to completely clear portfolio cache:",
      error
    );

    return false;
  }
};

/* ============================================================
   DEFAULT EXPORT
============================================================ */

export default {
  createCacheKey,

  setCache,
  getCache,
  getCacheWithMetadata,
  hasCache,
  clearCache,
  clearAllCaches,

  normalizeImageUrl,
  createImageCacheKey,

  cacheImage,
  cacheImages,
  getCachedImageBlob,
  getCachedImageUrl,
  hasCachedImage,
  clearCachedImage,
  clearAllCachedImages,

  /*
   * Backward compatibility
   */
  cacheImageAsBase64,
  getCachedImageBase64,
  clearLegacyCachedImage,

  /*
   * API
   */
  fetchFresh,
  fetchAndCache,
  fetchWithCache,
  fetchContentWithCache,
  isBackendAvailable,
  loadCacheThenRefresh,

  /*
   * Cleanup
   */
  clearPortfolioCache,
};