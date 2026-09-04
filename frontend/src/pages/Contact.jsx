import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getWebsiteContent } from "../services/contentApi";
import { fetchContentWithCache, getCache } from "../services/cacheService";

import ContactForm from "../components/contact/ContactForm";
import ContactCard from "../components/contact/ContactCard";

const Contact = () => {
  const { i18n } = useTranslation();
  const [content, setContent] = useState(null);
  const [usingCache, setUsingCache] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setUsingCache(false);
        const language = i18n.language?.startsWith("te") ? "te" : "en";
        const data = await fetchContentWithCache(language, "http://localhost:5173");

        console.log("CONTACT CONTENT:", data);

        setContent(data);
      } catch (error) {
        console.error(
          "Failed to load contact content:",
          error
        );

        // Try to get cached data
        const language = i18n.language?.startsWith("te") ? "te" : "en";
        const cacheKey = `content_${language}_/api/content`;
        const cachedData = getCache(cacheKey);

        if (cachedData) {
          console.log("Using cached contact data");
          setContent(cachedData);
          setUsingCache(true);
        }
      }
    };

    loadContent();
  }, [i18n.language]);

  return (
    <>
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            <ContactForm />

            <ContactCard
              content={content}
            />

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;