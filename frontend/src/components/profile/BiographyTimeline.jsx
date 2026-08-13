import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal";

export default function BiographyTimeline() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#f7f8f5] py-20">

      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-12">

            <p className="text-green-700 uppercase tracking-[0.25em] text-sm font-semibold">
              {t("biographyTimeline.label")}
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
              {t("biographyTimeline.title")}
            </h2>

            <div className="w-16 h-1 bg-green-700 mx-auto mt-5 rounded-full" />

          </div>
        </ScrollReveal>


        {/* Biography Content */}
        <ScrollReveal delay={150}>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-12">

            {/* Paragraph 1 */}
            <p className="text-gray-700 text-lg leading-9 text-justify">
              {t("biographyTimeline.paragraph1")}
            </p>

            {/* Paragraph 2 */}
            <p className="text-gray-700 text-lg leading-9 text-justify mt-7">
              {t("biographyTimeline.paragraph2")}
            </p>

            {/* Paragraph 3 */}
            <p className="text-gray-700 text-lg leading-9 text-justify mt-7">
              {t("biographyTimeline.paragraph3")}
            </p>

            {/* Paragraph 4 */}
            <p className="text-gray-700 text-lg leading-9 text-justify mt-7">
              {t("biographyTimeline.paragraph4")}
            </p>

            {/* Paragraph 5 */}
            <p className="text-gray-700 text-lg leading-9 text-justify mt-7">
              {t("biographyTimeline.paragraph5")}
            </p>

          </div>

        </ScrollReveal>

      </div>

    </section>
  );
}