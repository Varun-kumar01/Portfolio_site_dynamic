import ScrollReveal from "./ScrollReveal";

export default function BiographyTimeline() {
  return (
    <section className="bg-[#f7f8f5] py-20">

      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-12">

            <p className="text-green-700 uppercase tracking-[0.25em] text-sm font-semibold">
              Biography
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
              About His Journey
            </h2>

            <div className="w-16 h-1 bg-green-700 mx-auto mt-5 rounded-full" />

          </div>
        </ScrollReveal>


        {/* Biography Content */}
        <ScrollReveal delay={150}>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-12">

            {/* Paragraph 1 */}
            <p className="text-gray-700 text-lg leading-9 text-justify">
              <strong>Adluri Laxman Kumar is a prominent Indian politician
              from Telangana currently serving as the State Minister for
              Scheduled Castes Development, Tribal Welfare, and Minorities
              Welfare.</strong>{" "}
              He is an elected Member of the Legislative Assembly (MLA)
              representing the Dharmapuri Assembly constituency under the
              <strong> Indian National Congress (INC)</strong> banner. Known
              for his extensive grassroots leadership, he has emerged as a
              key advocate for marginalized communities and progressive
              welfare models in Telangana.
            </p>


            {/* Paragraph 2 */}
            <p className="text-gray-700 text-lg leading-9 text-justify mt-7">
              Born on <strong>April 1, 1968</strong>, in Peddapalli, Telangana,
              Kumar was raised in a humble family by his parents, Adluri
              Nagaiah and Lakshmi. He belongs to the Scheduled Caste (Madiga)
              community, an identity that heavily shaped his outlook on social
              inequality. Growing up in the combined Karimnagar district, he
              completed his early education locally before pursuing higher
              secondary studies. His early life in a rural ecosystem instilled
              a deep-seated determination to fight for the socio-economic
              upliftment of downtrodden classes.
            </p>


            {/* Paragraph 3 */}
            <p className="text-gray-700 text-lg leading-9 text-justify mt-7">
              Kumar's political journey began during his student days in
              <strong> 1982</strong>, when he served as the National Students'
              Union of India (NSUI) president at Junior College Godavarikhani.
              Over the next few decades, he systematically climbed the
              political ladder by working diligently within the Youth
              Congress. His consistent dedication led to prominent leadership
              roles, including serving as the Karimnagar Zilla Parishad (ZP)
              Chairman and the District Congress President. These grassroots
              roles allowed him to build a robust, loyal support base across
              the region.
            </p>


            {/* Paragraph 4 */}
            <p className="text-gray-700 text-lg leading-9 text-justify mt-7">
              After facing electoral challenges in previous political cycles,
              Kumar achieved a landmark victory in the
              <strong> 2023 Telangana Legislative Assembly election</strong>.
              He won the reserved Dharmapuri constituency by defeating his
              political opponents with a notable mandate. Following his
              victory, he initially served as a government whip before his
              administrative capabilities caught the attention of the state
              leadership. This legislative milestone firmly established him
              as a frontline leader within the state's ruling Congress party.
            </p>


            {/* Paragraph 5 */}
            <p className="text-gray-700 text-lg leading-9 text-justify mt-7">
              In <strong>June 2025</strong>, Chief Minister A. Revanth Reddy
              expanded his cabinet and inducted Kumar as a cabinet minister.
              He assumed charge of critical portfolios overseeing SC, ST, and
              Minorities welfare. In his ministerial role, Kumar has actively
              championed digital governance tools to accelerate the
              distribution of welfare funds and has prioritized academic
              excellence through institutions like the Telangana Social
              Welfare Residential Educational Institutions Society. He
              continues to implement impactful social welfare reforms aimed at
              making Telangana a benchmark for inclusive growth.
            </p>

          </div>

        </ScrollReveal>

      </div>

    </section>
  );
}