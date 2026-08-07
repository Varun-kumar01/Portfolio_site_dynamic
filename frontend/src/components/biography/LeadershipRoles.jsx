import { Landmark, Users, ShieldCheck } from "lucide-react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const roles = [
  {
    icon: Landmark,
    title: "Member of Legislative Assembly",
    subtitle: "Dharmapuri Assembly Constituency",
    description:
      "Represents the people of Dharmapuri Assembly Constituency, Jagtial District, Telangana.",
  },
  {
    icon: Users,
    title: "Public Representative",
    subtitle: "Indian National Congress",
    description:
      "Actively working with citizens, local organizations and government departments to ensure inclusive development.",
  },
  {
    icon: ShieldCheck,
    title: "Cabinet Minister",
    subtitle: "Government of Telangana",
    description:
      "Responsible for Scheduled Castes Development, Tribal Welfare, Minority Welfare, Empowerment of Persons with Disabilities, Senior Citizens and Transgender Welfare.",
  },
];

export default function LeadershipRoles() {
  return (
    <section className="py-24 bg-gray-50">
      <Container>

        <SectionTitle
          subtitle="Leadership"
          title="Leadership & Public Responsibilities"
          description="Serving people through transparent governance and inclusive development."
          center
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {roles.map((role, index) => {

            const Icon = role.icon;

            return (

              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition"
              >

                <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center">

                  <Icon
                    size={30}
                    className="text-orange-600"
                  />

                </div>

                <h3 className="mt-6 text-2xl font-bold">

                  {role.title}

                </h3>

                <p className="mt-2 text-orange-600 font-semibold">

                  {role.subtitle}

                </p>

                <p className="mt-5 text-gray-600 leading-8">

                  {role.description}

                </p>

              </div>

            );

          })}

        </div>

      </Container>
    </section>
  );
}