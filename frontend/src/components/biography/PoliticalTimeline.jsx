import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import { useTranslation } from "react-i18next";

const timeline = [
  {
    year: "Early Years",
    title: "Grassroots Public Service",
    description:
      "Began actively engaging with local communities, understanding civic issues and supporting welfare initiatives.",
  },
  {
    year: "Political Career",
    title: "Active Political Leadership",
    description:
      "Strengthened public outreach through organizational responsibilities and direct interaction with citizens.",
  },
  {
    year: "2023",
    title: "Elected as MLA",
    description:
      "Elected as Member of the Legislative Assembly from Dharmapuri Assembly Constituency representing the Indian National Congress.",
  },
  {
    year: "Present",
    title: "Minister, Government of Telangana",
    description:
      "Serving the people with a focus on Scheduled Castes Development, Tribal Welfare, Minority Welfare, and inclusive growth.",
  },
];

export default function PoliticalTimeline() {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-white">

      <Container>

        <SectionTitle
          subtitle={t("journey.pageLabel")}
          title={t("timeline.title", "Political Timeline")}
          description={t("timeline.description", "Key milestones in the journey of public service.")}
          center
        />

        <div className="mt-20 relative">

          <div className="absolute left-6 top-0 bottom-0 w-1 bg-orange-200 hidden md:block"></div>

          <div className="space-y-12">

            {timeline.map((item, index) => (

              <div
                key={index}
                className="relative md:pl-20"
              >

                <div className="hidden md:flex absolute left-0 top-3 w-12 h-12 rounded-full bg-orange-600 items-center justify-center text-white font-bold">

                  {index + 1}

                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">

                  <span className="text-orange-600 font-bold">
                    {item.year}
                  </span>

                  <h3 className="mt-2 text-2xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-gray-600 leading-8">
                    {item.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </Container>

    </section>
  );
}