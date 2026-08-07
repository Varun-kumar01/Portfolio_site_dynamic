import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const awards = [
  {
    title: "People's Recognition",
    year: "2023",
    description:
      "Earned the trust of the people through dedicated public service and was elected as MLA from Dharmapuri.",
  },
  {
    title: "Cabinet Responsibility",
    year: "2024",
    description:
      "Entrusted with important ministerial responsibilities in the Government of Telangana.",
  },
  {
    title: "Community Leadership",
    year: "Present",
    description:
      "Continuing to lead initiatives focused on education, healthcare, welfare and social justice.",
  },
];

export default function Awards() {
  return (
    <section className="py-24 bg-white">

      <Container>

        <SectionTitle
          subtitle="Recognition"
          title="Milestones & Recognition"
          description="Key milestones achieved during the journey of public service."
          center
        />

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {awards.map((item, index) => (

            <div
              key={index}
              className="rounded-2xl border border-orange-100 bg-orange-50 p-8"
            >

              <span className="text-4xl font-bold text-orange-600">

                {item.year}

              </span>

              <h3 className="mt-5 text-2xl font-bold">

                {item.title}

              </h3>

              <p className="mt-5 text-gray-600 leading-8">

                {item.description}

              </p>

            </div>

          ))}

        </div>

      </Container>

    </section>
  );
}