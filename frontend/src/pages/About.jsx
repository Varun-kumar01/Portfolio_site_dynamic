import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

import SectionTitle from "../components/common/SectionTitle";
import ProfileTabs from "../components/profile/ProfileTabs";
import BiographyTimeline from "../components/profile/BiographyTimeline";
import QuickFacts from "../components/profile/QucikFacts";
import VisionLeadership from "../components/profile/VisionLeadership";

const About = () => {
  const [aboutData, setAboutData] = useState({
    aboutName: "",
    aboutPosition: "",
    aboutDescription: "",
  });

  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD ABOUT CONTENT
  // =========================

  useEffect(() => {
    const loadAboutContent = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/content`
        );

        if (!response.ok) {
          throw new Error("Failed to load About content");
        }

        const data = await response.json();

        setAboutData({
          aboutName:
            data.about?.aboutName ||
            "Adluri Laxman Kumar",

          aboutPosition:
            data.about?.aboutPosition ||
            "Minister for SC, ST, Minority, Disabled, Senior Citizens Welfare & Transgender Empowerment",

          aboutDescription:
            data.about?.aboutDescription ||
            "",
        });
      } catch (error) {
        console.error(
          "Error loading About content:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadAboutContent();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-slate-500">
          Loading About page...
        </p>
      </div>
    );
  }

  return (
    <>
      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionTitle
            title="About the Public Leadership Journey"
            subtitle="A profile grounded in service, responsibility, and public trust."
          />

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT IMAGE */}

            <div className="flex justify-center">
              <div className="overflow-hidden rounded-3xl shadow-2xl max-w-md w-full">

                <img
                  src="/images/adluri-laxman-kumar.jpg.jpeg"
                  alt={aboutData.aboutName}
                  className="w-full h-full object-cover"
                />

              </div>
            </div>

            {/* RIGHT CONTENT */}

            <div>

              <span className="inline-block rounded-full bg-green-700 px-5 py-2 text-sm uppercase tracking-widest text-white">
                About
              </span>

              {/* NAME */}

              <h2 className="mt-6 text-5xl font-bold text-gray-900">
                {aboutData.aboutName}
              </h2>

              {/* POSITION */}

              <h3 className="mt-3 text-2xl font-medium text-gray-600">
                {aboutData.aboutPosition}
              </h3>

              <div className="my-8 h-1 w-24 bg-yellow-500"></div>

              {/* DESCRIPTION */}

              <div className="text-gray-600 leading-8 whitespace-pre-line">
                {aboutData.aboutDescription}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* OTHER ABOUT SECTIONS */}

      <QuickFacts />

      <ProfileTabs />

      <BiographyTimeline />

      <VisionLeadership />

    </>
  );
};

export default About;