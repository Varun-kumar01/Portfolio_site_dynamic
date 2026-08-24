import { useTranslation } from "react-i18next";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const timeline = [
  { year: "2008", key: "publicService" },
  { year: "2012", key: "communityDevelopment" },
  { year: "2017", key: "leadership" },
  { year: "2023", key: "constituency" },
];

export default function Journey() {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-50 py-24">
      <Container>
        <SectionTitle
          subtitle={t("journey.pageLabel")}
          title={t("journey.pageTitle")}
          description={t("journey.pageDescription")}
          center
        />

        <div className="relative mt-20">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-1 -translate-x-1/2 bg-orange-200 lg:block" />

          <div className="space-y-16">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  index % 2 === 0
                    ? ""
                    : "lg:[&>*:first-child]:order-2"
                }`}
              >
                <div
                  className={
                    index % 2 === 0
                      ? "lg:text-right"
                      : "lg:text-left"
                  }
                >
                  <div className="rounded-2xl bg-white p-8 shadow">
                    <span className="text-3xl font-bold text-orange-600">
                      {item.year}
                    </span>

                    <h3 className="mt-4 text-2xl font-bold">
                      {t(`journey.timeline.${item.key}.title`)}
                    </h3>

                    <p className="mt-4 leading-7 text-gray-600">
                      {t(`journey.timeline.${item.key}.description`)}
                    </p>
                  </div>
                </div>

                <div className="hidden justify-center lg:flex">
                  <div className="h-6 w-6 rounded-full border-4 border-white bg-orange-600 shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}