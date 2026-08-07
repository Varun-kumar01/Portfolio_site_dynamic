import { GraduationCap, BookOpen, Briefcase } from "lucide-react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const education = [
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Dedicated to continuous learning and public administration with a strong understanding of grassroots governance and public welfare.",
  },
  {
    icon: BookOpen,
    title: "Public Service",
    description:
      "Worked closely with people at the grassroots level, understanding community needs and promoting inclusive development.",
  },
  {
    icon: Briefcase,
    title: "Leadership",
    description:
      "Built leadership through community engagement, public outreach, and organizational responsibilities.",
  },
];

export default function Education() {
  return (
    <section className="py-24 bg-gray-50">
      <Container>

        <SectionTitle
          subtitle="Education & Experience"
          title="Learning, Leadership & Public Service"
          description="A journey built on education, community engagement, and dedication to public welfare."
          center
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {education.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition"
              >

                <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center">

                  <Icon
                    className="text-orange-600"
                    size={30}
                  />

                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-8">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

      </Container>
    </section>
  );
}