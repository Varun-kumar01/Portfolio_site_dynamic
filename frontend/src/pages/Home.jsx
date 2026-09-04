import {
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../config";
import { fetchContentWithCache, getCache } from "../services/cacheService";

import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import FocusAreas from "../components/home/FocusAreas";
import DevelopmentHighlights from "../components/home/DevelopmentHighlights";
import GalleryPreview from "../components/home/GalleryPreview";
import NewsPreview from "../components/home/NewsPreview";
import ContactCTA from "../components/home/ContactCTA";

const Home = () => {
  const { i18n, t } = useTranslation();

  const [
    content,
    setContent,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    usingCache,
    setUsingCache,
  ] = useState(false);

  // =====================================
  // LOAD WEBSITE CONTENT
  // =====================================

  useEffect(() => {

    const loadWebsiteContent =
      async () => {

        try {

          setLoading(true);

          setError("");

          setUsingCache(false);

          const language = 
            i18n.language?.startsWith("te") ? "te" : "en";

          const data = 
            await fetchContentWithCache(
              language,
              API_BASE_URL
            );

          console.log(
            "LATEST WEBSITE CONTENT:",
            data
          );

          setContent(
            data
          );

        } catch (
          error
        ) {

          console.error(
            "Error loading website content:",
            error
          );

          // Try to get cached data
          const language = 
            i18n.language?.startsWith("te") ? "te" : "en";

          const cacheKey = `content_${language}_/api/content`;

          const cachedData = 
            getCache(cacheKey);

          if (cachedData) {

            console.log(
              "Using cached content"
            );

            setContent(cachedData);

            setUsingCache(true);

            setError("");

          } else {

            setError(
              "Unable to load website content. No cached data available."
            );

          }

        } finally {

          setLoading(
            false
          );

        }

      };

    loadWebsiteContent();

  }, [i18n.language, t]);

  // =====================================
  // LOADING
  // =====================================

  if (
    loading
  ) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <p className="text-slate-600">
          {t("common.loading", "Loading website...")}
        </p>

      </div>

    );

  }

  // =====================================
  // ERROR
  // =====================================

  if (
    error
  ) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <p className="text-red-600">

          {error}

        </p>

      </div>

    );

  }

  // =====================================
  // SAFETY CHECK
  // =====================================

  if (
    !content
  ) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <p className="text-slate-600">
          {t("common.noContent", "No website content found.")}
        </p>

      </div>

    );

  }

  // =====================================
  // WEBSITE
  // =====================================

  return (

    <>

      {/* HERO */}

      <Hero
        content={content}
      />

      {/* ABOUT PREVIEW */}

      <AboutPreview
        content={content}
      />

      {/* FOCUS AREAS */}

      <FocusAreas />

      {/* DEVELOPMENT HIGHLIGHTS */}

      <DevelopmentHighlights />

      {/* GALLERY PREVIEW */}

      <GalleryPreview />

      {/* NEWS PREVIEW */}

      <NewsPreview />

      {/* CONTACT CTA */}

      <ContactCTA />

    </>

  );

};

export default Home;