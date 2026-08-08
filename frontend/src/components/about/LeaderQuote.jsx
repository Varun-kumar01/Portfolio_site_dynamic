import Container from "../common/Container";
import leader from "../../data/leader"

export default function LeaderQuote() {
  return (
    <section className="py-24 bg-orange-600">

      <Container>

        <div className="max-w-4xl mx-auto text-center">

          <span className="text-orange-100 uppercase tracking-[0.25em]">
            Message
          </span>

          <blockquote className="mt-8 text-3xl lg:text-5xl font-bold text-white leading-tight">

            "True leadership is measured not by promises,
            but by the positive change we create
            in people's lives."

          </blockquote>

          <div className="mt-10">

            <img
              src="/leader-about.jpg"
              alt=""
              className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white"
            />

            <h3 className="mt-5 text-white text-xl font-semibold">
              <p>{leader.profile.name}</p>
            </h3>

            <p className="text-orange-100">
              {leader.profile.designation}
            </p>

          </div>

        </div>

      </Container>

    </section>
  );
}