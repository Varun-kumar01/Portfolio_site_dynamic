import {
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../config";

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

  // =====================================
  // LOAD WEBSITE CONTENT
  // =====================================

  useEffect(() => {

    const loadWebsiteContent =
      async () => {

        try {

          setLoading(true);

          setError("");

          const response =
            await fetch(
              `${API_BASE_URL}/api/content?lang=${
                i18n.language?.startsWith("te") ? "te" : "en"
              }`,
              {
                method:
                  "GET",

                headers: {
                  "Cache-Control":
                    "no-cache",
                },

                cache:
                  "no-store",
              }
            );

          if (
            !response.ok
          ) {

            throw new Error(
              `Failed to load website content. Status: ${response.status}`
            );

          }

          const data =
            await response.json();

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

          setError(
            error.message
          );

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