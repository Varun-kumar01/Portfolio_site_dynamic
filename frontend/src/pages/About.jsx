import SectionTitle from "../components/common/SectionTitle";
import ProfileTabs from "../components/profile/ProfileTabs";
import BiographyTimeline from "../components/profile/BiographyTimeline";
import leader from "../data/leader";
import QuickFacts from "../components/profile/QucikFacts";
import VisionLeadership from "../components/profile/VisionLeadership";
// import LeadershipValues from "../components/profile/LeadershipValues";


const About = () => {
  return (
    <>
      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionTitle
          
            title="About the Public Leadership Journey"
            subtitle="A profile grounded in service, responsibility, and public trust."
          />

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Image */}
            <div className="flex justify-center">
              <div className="overflow-hidden rounded-3xl shadow-2xl max-w-md w-full">
                <img
                  src="\images\adluri-laxman-kumar.jpg.jpeg"
                  alt="Adluri Laxman Kumar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Content */}
            <div>

              <span className="inline-block rounded-full bg-green-700 px-5 py-2 text-sm uppercase tracking-widest text-white">
                About
              </span>

              <h2 className="mt-6 text-5xl font-bold text-gray-900">
                <h2>Adluri Laxman Kumar</h2>
              </h2>

              <h3 className="mt-3 text-2xl font-medium text-gray-600">
                Minister for SC, ST, Minority, Disabled, Senior Citizens Welfare &
                Transgender Empowerment
              </h3>

              <div className="my-8 h-1 w-24 bg-yellow-500"></div>

              <p className="text-gray-600 leading-8">
                <strong>Adluri Laxman Kumar</strong> is an Indian politician from the
                <strong> Indian National Congress (INC)</strong> who serves as the
                <strong>
                  {" "}Minister for SC, ST, Minority, Disabled, Senior Citizens Welfare,
                  and Transgender Empowerment
                </strong>{" "}
                in the Telangana State Cabinet.
              </p>

              <p className="mt-6 text-gray-600 leading-8">
                He represents the
                <strong> Dharmapuri Assembly Constituency</strong> (Scheduled Castes Reserved)
                in <strong> Jagtial District, Telangana</strong>. He is committed to
                social justice, inclusive governance, welfare initiatives, and the
                empowerment of marginalized communities.
              </p>

            </div>

          </div>

        </div>
      </section>
      <QuickFacts />
      <ProfileTabs />
      <BiographyTimeline />
      <VisionLeadership />
      {/* <LeadershipValues />   */}

    </>
  );
};

export default About;
