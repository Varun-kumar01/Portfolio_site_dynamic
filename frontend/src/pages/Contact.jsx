// // import { useEffect, useState } from "react";
// // import { useTranslation } from "react-i18next";

// // import { getWebsiteContent } from "../services/contentApi";
// // import { fetchContentWithCache, getCache } from "../services/cacheService";

// // import ContactForm from "../components/contact/ContactForm";
// // import ContactCard from "../components/contact/ContactCard";

// // const Contact = () => {
// //   const { i18n } = useTranslation();
// //   const [content, setContent] = useState(null);
// //   const [usingCache, setUsingCache] = useState(false);

// //   useEffect(() => {
// //     const loadContent = async () => {
// //       try {
// //         setUsingCache(false);
// //         const language = i18n.language?.startsWith("te") ? "te" : "en";
// //         const data = await fetchContentWithCache(language, "http://localhost:5173");

// //         console.log("CONTACT CONTENT:", data);

// //         setContent(data);
// //       } catch (error) {
// //         console.error(
// //           "Failed to load contact content:",
// //           error
// //         );

// //         // Try to get cached data
// //         const language = i18n.language?.startsWith("te") ? "te" : "en";
// //         const cacheKey = `content_${language}_/api/content`;
// //         const cachedData = getCache(cacheKey);

// //         if (cachedData) {
// //           console.log("Using cached contact data");
// //           setContent(cachedData);
// //           setUsingCache(true);
// //         }
// //       }
// //     };

// //     loadContent();
// //   }, [i18n.language]);

// //   return (
// //     <>
// //       <section className="bg-gray-50 py-20">
// //         <div className="max-w-7xl mx-auto px-6">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

// //             <ContactForm />

// //             <ContactCard
// //               content={content}
// //             />

// //           </div>
// //         </div>
// //       </section>
// //     </>
// //   );
// // };

// // export default Contact;

// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";

// import {
//   fetchContentWithCache,
//   getCache,
// } from "../services/cacheService";

// import ContactForm from "../components/contact/ContactForm";
// import ContactCard from "../components/contact/ContactCard";

// const Contact = () => {
//   const { i18n } = useTranslation();

//   const [content, setContent] = useState(null);
//   const [usingCache, setUsingCache] = useState(false);

//   useEffect(() => {
//     let cancelled = false;

//     const loadContent = async () => {
//       const language = i18n.language?.startsWith("te")
//         ? "te"
//         : "en";

//       const cacheKey = `content_${language}_/api/content`;

//       // ------------------------------------------------
//       // FIRST: LOAD LATEST CACHED CONTENT IMMEDIATELY
//       // ------------------------------------------------
//       const cachedData = getCache(cacheKey);

//       if (cachedData && !cancelled) {
//         console.log("CONTACT: Showing cached content immediately");

//         setContent(cachedData);
//         setUsingCache(true);
//       }

//       // ------------------------------------------------
//       // THEN: TRY BACKEND FOR FRESH CONTENT
//       // ------------------------------------------------
//       try {
//         const data = await Promise.race([
//           fetchContentWithCache(
//             language,
//             "http://localhost:5173"
//           ),

//           // Do not make the page wait forever for backend
//           new Promise((_, reject) =>
//             setTimeout(
//               () => reject(new Error("Backend request timeout")),
//               5000
//             )
//           ),
//         ]);

//         if (!cancelled && data) {
//           console.log("CONTACT: Fresh content loaded");

//           setContent(data);
//           setUsingCache(false);
//         }
//       } catch (error) {
//         console.warn(
//           "CONTACT: Backend unavailable, using cached content.",
//           error
//         );

//         // ------------------------------------------------
//         // FALLBACK TO LATEST CACHE
//         // ------------------------------------------------
//         const latestCache = getCache(cacheKey);

//         if (!cancelled && latestCache) {
//           console.log(
//             "CONTACT: Using latest cached content"
//           );

//           setContent(latestCache);
//           setUsingCache(true);
//         }
//       }
//     };

//     loadContent();

//     return () => {
//       cancelled = true;
//     };
//   }, [i18n.language]);

//   return (
//     <section className="bg-gray-50 py-20">
//       <div className="max-w-7xl mx-auto px-6">

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

//           {/* CONTACT FORM */}
//           <ContactForm />

//           {/* CONTACT INFORMATION */}
//           <ContactCard content={content} />

//         </div>

//       </div>
//     </section>
//   );
// };

// export default Contact;



import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  fetchContentWithCache,
  getCache,
} from "../services/cacheService";

import ContactForm from "../components/contact/ContactForm";
import ContactCard from "../components/contact/ContactCard";

const Contact = () => {
  const { i18n } = useTranslation();

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usingCache, setUsingCache] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadContent = async () => {
      const language = i18n.language?.startsWith("te")
        ? "te"
        : "en";

      const cacheKey = `content_${language}_/api/content`;

      /*
       * --------------------------------------------------
       * 1. LOAD CACHED CONTENT FIRST
       * --------------------------------------------------
       */

      const cachedData = getCache(cacheKey);

      if (cachedData && !cancelled) {
        console.log(
          "CONTACT: Loading cached content first"
        );

        setContent(cachedData);
        setUsingCache(true);
        setLoading(false);
      }

      /*
       * --------------------------------------------------
       * 2. TRY TO GET FRESH CONTENT FROM BACKEND
       * --------------------------------------------------
       */

      try {
        const data = await Promise.race([
          fetchContentWithCache(
            language,
            "http://localhost:5173"
          ),

          /*
           * Don't keep the page waiting forever
           * if backend is unavailable.
           */
          new Promise((_, reject) =>
            setTimeout(
              () =>
                reject(
                  new Error(
                    "Backend request timeout"
                  )
                ),
              5000
            )
          ),
        ]);

        if (!cancelled && data) {
          console.log(
            "CONTACT: Fresh content loaded"
          );

          setContent(data);
          setUsingCache(false);
          setLoading(false);
        }
      } catch (error) {
        console.warn(
          "CONTACT: Backend unavailable.",
          error
        );

        /*
         * --------------------------------------------------
         * 3. FALLBACK TO CACHE
         * --------------------------------------------------
         */

        const latestCache = getCache(cacheKey);

        if (!cancelled && latestCache) {
          console.log(
            "CONTACT: Using cached content"
          );

          setContent(latestCache);
          setUsingCache(true);
        }

        setLoading(false);
      }
    };

    loadContent();

    return () => {
      cancelled = true;
    };
  }, [i18n.language]);

  /*
   * --------------------------------------------------
   * LOADING
   * --------------------------------------------------
   */

  if (loading && !content) {
    return (
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-slate-500">
            Loading...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* CONTACT FORM */}

          <ContactForm />

          {/* CONTACT INFORMATION */}

          <ContactCard
            content={content}
            usingCache={usingCache}
          />

        </div>

      </div>
    </section>
  );
};

export default Contact;