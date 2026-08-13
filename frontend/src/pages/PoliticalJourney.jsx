import { useTranslation } from "react-i18next";
import SectionTitle from "../components/common/SectionTitle";


/* =========================================================
   INFORMATION CARD
========================================================= */

const CareerContent = ({ item }) => {
  return (
    <div
      className={`
        h-full
        rounded-xl
        border
        p-3
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg

        sm:rounded-2xl
        sm:p-5

        lg:p-7

        ${
          item.highlight
            ? 'border-orange-200 bg-orange-50'
            : 'border-slate-200 bg-white'
        }
      `}
    >

      {/* LABEL */}
      <div
        className="
          text-[7px]
          font-bold
          uppercase
          tracking-[0.08em]
          text-orange-500

          sm:text-[10px]

          lg:text-xs
        "
      >
        {item.label}
      </div>


      {/* YEAR */}
      <div
        className="
          mt-2
          text-[9px]
          font-bold
          text-emerald-600

          sm:mt-3
          sm:text-xs

          lg:text-sm
        "
      >
        {item.year}
      </div>


      {/* TITLE */}
      <h2
        className="
          mt-1
          text-[11px]
          font-bold
          leading-tight
          text-slate-900

          sm:mt-2
          sm:text-base

          lg:text-xl
        "
      >
        {item.title}
      </h2>


      {/* DATE */}
      <p
        className="
          mt-1
          text-[7px]
          font-medium
          uppercase
          tracking-wide
          text-slate-400

          sm:text-[9px]

          lg:text-xs
        "
      >
        {item.date}
      </p>


      {/* DESCRIPTION */}
      <p
        className="
          mt-2
          text-[8px]
          leading-4
          text-slate-600

          sm:mt-3
          sm:text-[11px]
          sm:leading-5

          lg:mt-4
          lg:text-sm
          lg:leading-6
        "
      >
        {item.description}
      </p>


      {/* DECORATIVE LINE */}
      <div
        className="
          mt-3
          flex
          items-center
          gap-1

          sm:mt-4
        "
      >
        <span className="h-1 w-5 rounded-full bg-orange-500 sm:w-7" />

        <span className="h-1 w-1.5 rounded-full bg-emerald-500 sm:w-2" />

        <span className="h-1 w-1.5 rounded-full bg-slate-300 sm:w-2" />
      </div>

    </div>
  )
}


/* =========================================================
   IMAGE CARD
========================================================= */

const CareerImage = ({ item }) => {
  return (
    <div
      className="
        group
        h-full
        overflow-hidden
        rounded-xl
        bg-slate-100
        shadow-sm

        sm:rounded-2xl
      "
    >

      <div
        className="
          relative
          h-full
          min-h-[170px]
          overflow-hidden

          sm:min-h-[230px]

          lg:min-h-[300px]
        "
      >

        {/* IMAGE */}

        <img
          src={item.image}
          alt={item.title}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />


        {/* GRADIENT */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/50
            via-transparent
            to-transparent
          "
        />


        {/* YEAR BADGE */}

        <div
          className="
            absolute
            bottom-2
            left-2

            sm:bottom-4
            sm:left-4
          "
        >
          <span
            className="
              rounded-full
              bg-white/95
              px-2
              py-1
              text-[7px]
              font-bold
              text-slate-900
              shadow

              sm:px-3
              sm:py-1.5
              sm:text-[10px]

              lg:px-4
              lg:py-2
              lg:text-xs
            "
          >
            {item.year}
          </span>
        </div>

      </div>

    </div>
  )
}


/* =========================================================
   MAIN DEVELOPMENT PAGE
========================================================= */

const PoliticalJourney = () => {
  const { t } = useTranslation();

  // Build career journey array from i18n data
  const careerJourneyRaw = t("journey.careerJourney", { returnObjects: true });
  const careerJourney = Array.isArray(careerJourneyRaw)
    ? careerJourneyRaw.map((item, index) => ({
        year: item.year,
        date: item.date,
        title: item.title,
        label: item.label,
        description: item.description,
        image: `/images/career${index + 1}.jpeg`,
        highlight: index === 7 || index === 10,
      }))
    : [];

  return (
    <div className="min-h-screen bg-white">

      {/* =====================================================
          PAGE HERO
      ===================================================== */}

      <section className="bg-slate-50">

        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-10

            sm:px-6
            sm:py-14

            lg:px-8
            lg:py-20
          "
        >

          <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 items-center">

            {/* ================= LEFT ================= */}

            <div>

              {/* LABEL */}

              <div className="mb-5 flex items-center gap-3">

                <span className="h-[2px] w-10 bg-orange-500" />

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">

                  {t("journey.pageLabel")}

                </span>

              </div>

              {/* HEADING */}

              <h1
                className="
                  max-w-3xl
                  text-3xl
                  font-bold
                  leading-tight
                  text-slate-900

                  sm:text-4xl

                  lg:text-5xl
                "
              >
                {t("journey.pageTitle")}
              </h1>

              {/* SUBTITLE */}

              <p
                className="
                  mt-6
                  max-w-2xl
                  text-sm
                  leading-7
                  text-slate-600

                  sm:text-base

                  lg:text-lg
                  lg:leading-8
                "
              >
                {t("journey.pageDescription")}
              </p>

            </div>

            {/* ================= RIGHT ================= */}

            <div className="grid gap-5">

              {/* TOP */}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm hover:shadow-lg transition">

                <h3 className="text-4xl font-bold text-orange-500">

                  25+

                </h3>

                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">

                  {t("journeyStats.yearsExperience")}

                </p>

              </div>

              {/* BOTTOM */}

              <div className="grid grid-cols-2 gap-5">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm hover:shadow-lg transition">

                  <h3 className="text-3xl font-bold text-emerald-600">

                    2023

                  </h3>

                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-500">

                    {t("journeyStats.assemblyVictory")}

                  </p>

                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm hover:shadow-lg transition">

                  <h3 className="text-3xl font-bold text-orange-500">

                    2025

                  </h3>

                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-500">

                    {t("journeyStats.cabinetMinister")}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TIMELINE
      ===================================================== */}

      <section
        className="
          bg-white
          py-12

          sm:py-16

          lg:py-24
        "
      >

        <div
          className="
            mx-auto
            max-w-7xl
            px-3

            sm:px-5

            lg:px-8
          "
        >

          <div className="relative">


            {/* =================================================
                CENTER VERTICAL LINE
            ================================================= */}

            <div
              className="
                absolute
                left-1/2
                top-0
                h-full
                w-[2px]
                -translate-x-1/2
                bg-orange-200
              "
            />


            {/* =================================================
                ALL CAREER ITEMS
            ================================================= */}

            {careerJourney.map((item, index) => {

              const leftSide = index % 2 === 0

              return (
                <div
                  key={`${item.year}-${item.title}`}
                  className="
                    relative
                    mb-14

                    sm:mb-20

                    lg:mb-28

                    last:mb-0
                  "
                >

                  {/* =================================================
                      CENTER DOT
                  ================================================= */}

                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      z-20
                      flex
                      h-4
                      w-4
                      -translate-x-1/2
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border-[3px]
                      border-white
                      bg-orange-500
                      shadow-md

                      sm:h-5
                      sm:w-5
                    "
                  />


                  {/* =================================================
                      TWO COLUMN LAYOUT

                      IMPORTANT:
                      grid-cols-2 is kept for MOBILE.
                      So text and image remain side-by-side.
                  ================================================= */}

                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-4

                      sm:gap-7

                      lg:gap-16
                    "
                  >


                    {/* =================================================
                        LEFT SIDE
                    ================================================= */}

                    <div
                      className={
                        leftSide
                          ? 'pr-2 sm:pr-5 lg:pr-8'
                          : 'order-2 pl-2 sm:pl-5 lg:pl-8'
                      }
                    >

                      {leftSide ? (
                        <CareerContent item={item} />
                      ) : (
                        <CareerImage item={item} />
                      )}

                    </div>


                    {/* =================================================
                        RIGHT SIDE
                    ================================================= */}

                    <div
                      className={
                        leftSide
                          ? 'pl-2 sm:pl-5 lg:pl-8'
                          : 'order-1 pr-2 sm:pr-5 lg:pr-8'
                      }
                    >

                      {leftSide ? (
                        <CareerImage item={item} />
                      ) : (
                        <CareerContent item={item} />
                      )}

                    </div>

                  </div>

                </div>
              )
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CAREER HIGHLIGHT
      ===================================================== */}

      <section className="bg-slate-900">

        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-12

            sm:px-6
            sm:py-16

            lg:px-8
            lg:py-20
          "
        >

          <div
            className="
              grid
              grid-cols-1
              gap-8

              md:grid-cols-2
              md:items-center
            "
          >

            {/* =================================================
                TEXT
            ================================================= */}

            <div>

              <div
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-orange-400

                  sm:text-xs
                "
              >
                {t("journeyStats.keyHighlight")}
              </div>


              <h2
                className="
                  mt-3
                  text-2xl
                  font-bold
                  leading-tight
                  text-white

                  sm:text-3xl

                  lg:text-4xl
                "
              >
                {t("journeyStats.highlightTitle")}
              </h2>


              <p
                className="
                  mt-4
                  max-w-xl
                  text-xs
                  leading-5
                  text-slate-300

                  sm:text-sm
                  sm:leading-6
                "
              >
                {t("journeyStats.highlightDesc")}
              </p>

            </div>


            {/* =================================================
                FINAL STATS
            ================================================= */}

            <div
              className="
                grid
                grid-cols-2
                gap-3

                sm:gap-4
              "
            >

              {/* VOTES */}

              <div
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  p-4

                  sm:p-6
                "
              >

                <div
                  className="
                    text-2xl
                    font-bold
                    text-orange-400

                    sm:text-3xl
                  "
                >
                  91,393
                </div>

                <div
                  className="
                    mt-1
                    text-[9px]
                    text-slate-400

                    sm:text-xs
                  "
                >
                  {t("journeyStats.votesSecured")}
                </div>

              </div>


              {/* MARGIN */}

              <div
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  p-4

                  sm:p-6
                "
              >

                <div
                  className="
                    text-2xl
                    font-bold
                    text-emerald-400

                    sm:text-3xl
                  "
                >
                  22,039
                </div>

                <div
                  className="
                    mt-1
                    text-[9px]
                    text-slate-400

                    sm:text-xs
                  "
                >
                  {t("journeyStats.victoryMargin")}
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default PoliticalJourney;
