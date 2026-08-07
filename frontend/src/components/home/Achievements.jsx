import {
  Award,
  Building2,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";

const achievements = [
  {
    icon: Building2,
    title: "Infrastructure",
    description:
      "Roads, drinking water, public facilities and civic improvements.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Schools, scholarships, digital classrooms and youth programs.",
  },
  {
    icon: HeartHandshake,
    title: "Healthcare",
    description:
      "Medical camps, health awareness and hospital development.",
  },
  {
    icon: Award,
    title: "Public Welfare",
    description:
      "Community empowerment and welfare initiatives across constituencies.",
  },
];

export default function Achievements() {
  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-orange-600 font-semibold uppercase tracking-widest">
            Achievements
          </span>

          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900">
            Working Towards Meaningful Change
          </h2>

          <p className="mt-6 text-gray-600 leading-8">
            Every initiative is focused on sustainable development,
            transparency and improving the everyday lives of citizens.
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">

          {achievements.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">

                  <Icon
                    className="text-orange-600"
                    size={30}
                  />

                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {item.description}
                </p>

              </div>

            );
          })}

        </div>

      </div>

    </section>
  );
}