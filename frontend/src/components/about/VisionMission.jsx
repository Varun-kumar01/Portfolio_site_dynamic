import {
  Eye,
  Target,
  HeartHandshake,
} from "lucide-react";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const cards = [
  {
    icon: Eye,
    title: "Vision",
    text: "Building an inclusive society where development reaches every citizen.",
  },
  {
    icon: Target,
    title: "Mission",
    text: "Transparent governance, sustainable growth and people-centric leadership.",
  },
  {
    icon: HeartHandshake,
    title: "Values",
    text: "Integrity, accountability, compassion and dedication to public welfare.",
  },
];

export default function VisionMission() {
  return (
    <section className="py-24 bg-white">

      <Container>

        <SectionTitle
          subtitle="Vision"
          title="Vision, Mission & Values"
          center
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">

          {cards.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 p-10 hover:shadow-xl transition"
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

                <p className="mt-5 text-gray-600 leading-8">
                  {item.text}
                </p>

              </div>

            );

          })}

        </div>

      </Container>

    </section>
  );
}