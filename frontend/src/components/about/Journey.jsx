import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const timeline = [
  {
    year: "2008",
    title: "Started Public Service",
    description:
      "Began working closely with local communities and addressing public issues.",
  },
  {
    year: "2012",
    title: "Community Development",
    description:
      "Focused on education, health camps and rural development initiatives.",
  },
  {
    year: "2017",
    title: "Leadership Responsibilities",
    description:
      "Expanded public outreach and successfully led multiple social programmes.",
  },
  {
    year: "2023",
    title: "Serving the Constituency",
    description:
      "Continuing to work towards infrastructure, employment and citizen welfare.",
  },
];

export default function Journey() {
  return (
    <section className="py-24 bg-gray-50">
      <Container>

        <SectionTitle
          subtitle="Journey"
          title="Political Journey"
          description="A timeline highlighting important milestones in public service."
          center
        />

        <div className="relative mt-20">

          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-orange-200 -translate-x-1/2"></div>

          <div className="space-y-16">

            {timeline.map((item, index) => (

              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  index % 2 === 0 ? "" : "lg:[&>*:first-child]:order-2"
                }`}
              >

                <div
                  className={`${
                    index % 2 === 0
                      ? "lg:text-right"
                      : "lg:text-left"
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow p-8">

                    <span className="text-orange-600 font-bold text-3xl">
                      {item.year}
                    </span>

                    <h3 className="mt-4 text-2xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-gray-600 leading-7">
                      {item.description}
                    </p>

                  </div>
                </div>

                <div className="hidden lg:flex justify-center">

                  <div className="w-6 h-6 rounded-full bg-orange-600 border-4 border-white shadow-lg"></div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </Container>
    </section>
  );
}