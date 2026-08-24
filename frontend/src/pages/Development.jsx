import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../config";

const Development = () => {
  const { i18n, t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===============================
  // LOAD DEVELOPMENT CONTENT
  // ===============================

  useEffect(() => {
    const loadDevelopment = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/content?lang=${
            i18n.language?.startsWith("te") ? "te" : "en"
          }`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load development content"
          );
        }

      } catch (error) {
        console.error(
          "Error loading development content:",
          error
        );

        setError(
          error.message ||
            "Failed to load development content"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDevelopment();
  }, [i18n.language]);

  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">
          {t("common.loading")}
        </p>
      </div>
    );
  }

  // ===============================
  // ERROR
  // ===============================

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    );
  }

  // ===============================
  // DEVELOPMENT PAGE
  // ===============================

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center mb-16">

          <span className="inline-block bg-green-700 text-white px-5 py-2 rounded-full text-sm uppercase tracking-widest">
            {t("home.development.label")}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-6">
            {t("home.development.title")}
          </h1>

          <div className="mx-auto mt-6 h-1 w-24 bg-yellow-500"></div>

        </div>

        {/* Development Content */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">

          <p className="text-gray-700 text-lg leading-8 whitespace-pre-line">
            {t("home.development.description")}
          </p>

        </div>

      </div>
    </section>
  );
};

export default Development;