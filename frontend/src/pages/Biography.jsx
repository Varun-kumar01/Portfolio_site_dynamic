import { useEffect, useState } from "react";

import BiographyHero from "../components/biography/BiographyHero";
import ProfileSection from "../components/biography/ProfileSection";
import Education from "../components/biography/Education";
import PoliticalTimeline from "../components/biography/PoliticalTimeline";
import LeadershipRoles from "../components/biography/LeadershipRoles";
import Awards from "../components/biography/Awards";
import GalleryStrip from "../components/biography/GalleryStrip";

export default function Biography() {
  const [biographyContent, setBiographyContent] = useState("");
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD BIOGRAPHY FROM BACKEND
  // ==========================================

  useEffect(() => {
    const loadBiography = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/content"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load biography"
          );
        }

        console.log("Biography data:", data);

        setBiographyContent(
          data.biography?.biographyContent || ""
        );
      } catch (error) {
        console.error(
          "Error loading biography:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadBiography();
  }, []);

  return (
    <>
      {/* ==========================================
          BIOGRAPHY HERO
      ========================================== */}

      <BiographyHero />

      {/* ==========================================
          DATABASE BIOGRAPHY CONTENT
      ========================================== */}

      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-sm">

            <span className="inline-block bg-green-700 text-white px-5 py-2 rounded-full text-sm uppercase tracking-widest">
              Biography
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-8">
              About Adluri Laxman Kumar
            </h2>

            {loading ? (
              <p className="text-gray-500">
                Loading biography...
              </p>
            ) : (
              <div className="text-gray-700 text-lg leading-8 whitespace-pre-line">
                {biographyContent ||
                  "Biography content is not available."}
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ==========================================
          EXISTING BIOGRAPHY SECTIONS
      ========================================== */}

      <ProfileSection />

      <Education />

      <PoliticalTimeline />

      <LeadershipRoles />

      <Awards />

      <GalleryStrip />
    </>
  );
}