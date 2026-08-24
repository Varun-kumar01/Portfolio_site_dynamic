import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getWebsiteContent } from "../services/contentApi";

import ContactForm from "../components/contact/ContactForm";
import ContactCard from "../components/contact/ContactCard";

const Contact = () => {
  const { i18n } = useTranslation();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await getWebsiteContent(
          i18n.language?.startsWith("te") ? "te" : "en"
        );

        console.log("CONTACT CONTENT:", data);

        setContent(data);
      } catch (error) {
        console.error(
          "Failed to load contact content:",
          error
        );
      }
    };

    loadContent();
  }, [i18n.language]);

  return (
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
  );
};

export default Contact;