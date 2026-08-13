import { useEffect, useState } from "react";

const API_URL =
  "http://localhost:5000/api/political-career";

const CACHE_KEY =
  "political_career_latest_v4";

/* =========================================================
   GET SAVED DATA
========================================================= */

const getSavedCareer = () => {
  try {
    const saved =
      localStorage.getItem(CACHE_KEY);

    if (!saved) {
      return [];
    }

    const data = JSON.parse(saved);

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(
      "POLITICAL CAREER CACHE ERROR:",
      error
    );

    return [];
  }
};

/* =========================================================
   CONTENT CARD
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
          item.category === "Major Milestone"
            ? "border-orange-200 bg-orange-50"
            : "border-slate-200 bg-white"
        }
      `}
    >
      <div className="text-[7px] font-bold uppercase tracking-[0.08em] text-orange-500 sm:text-[10px] lg:text-xs">
        {item.category || "Political Career"}
      </div>

      <div className="mt-2 text-[9px] font-bold text-emerald-600 sm:mt-3 sm:text-xs lg:text-sm">
        {item.year || ""}
      </div>

      <h2 className="mt-1 text-[11px] font-bold leading-tight text-slate-900 sm:mt-2 sm:text-base lg:text-xl">
        {item.position || ""}
      </h2>

      {item.organization && (
        <p className="mt-1 text-[8px] font-semibold text-slate-500 sm:text-[10px] lg:text-xs">
          {item.organization}
        </p>
      )}

      {item.location && (
        <p className="mt-1 text-[7px] font-medium uppercase tracking-wide text-slate-400 sm:text-[9px] lg:text-xs">
          {item.location}
        </p>
      )}

      <p className="mt-2 text-[8px] leading-4 text-slate-600 sm:mt-3 sm:text-[11px] sm:leading-5 lg:mt-4 lg:text-sm lg:leading-6">
        {item.description || ""}
      </p>

      <div className="mt-3 flex items-center gap-1 sm:mt-4">
        <span className="h-1 w-5 rounded-full bg-orange-500 sm:w-7" />
        <span className="h-1 w-1.5 rounded-full bg-emerald-500 sm:w-2" />
        <span className="h-1 w-1.5 rounded-full bg-slate-300 sm:w-2" />
      </div>
    </div>
  );
};

/* =========================================================
   IMAGE CARD
========================================================= */

const CareerImage = ({ item }) => {
  const imageUrl = item.image_url || "";

  return (
    <div className="group h-full overflow-hidden rounded-xl bg-slate-100 shadow-sm sm:rounded-2xl">
      <div className="relative h-full min-h-[170px] overflow-hidden sm:min-h-[230px] lg:min-h-[300px]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.position || "Political Career"}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = "none";

              const fallback =
                event.currentTarget.parentElement.querySelector(
                  ".career-image-fallback"
                );

              if (fallback) {
                fallback.classList.remove("hidden");
              }
            }}
          />
        ) : null}

        <div
          className={`
            career-image-fallback
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-slate-100
            text-sm
            text-slate-400
            ${imageUrl ? "hidden" : ""}
          `}
        >
          No image available
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="absolute bottom-2 left-2 z-20 sm:bottom-4 sm:left-4">
          <span className="rounded-full bg-white/95 px-2 py-1 text-[7px] font-bold text-slate-900 shadow sm:px-3 sm:py-1.5 sm:text-[10px] lg:px-4 lg:py-2 lg:text-xs">
            {item.year || ""}
          </span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   PAGE
========================================================= */

const PoliticalJourney = () => {
  /*
    IMPORTANT:
    Read localStorage FIRST.
    Therefore an already-saved page does not wait for backend.
  */

  const initialCareer = getSavedCareer();

  const [careerJourney, setCareerJourney] =
    useState(initialCareer);

  const [checkingBackend, setCheckingBackend] =
    useState(true);

  const [backendOffline, setBackendOffline] =
    useState(false);

  /* =========================================================
     FETCH LATEST BACKEND DATA
  ========================================================= */

  const loadCareerData = async () => {
    try {
      const response = await fetch(
        `${API_URL}?t=${Date.now()}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message ||
            "Unable to load political career"
        );
      }

      const latestCareer =
        Array.isArray(result.data)
          ? result.data
          : [];

      /*
        LATEST POSTGRESQL DATA
      */

      setCareerJourney(latestCareer);

      /*
        SAVE COMPLETE DATA
      */

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify(latestCareer)
      );

      setBackendOffline(false);
    } catch (error) {
      console.warn(
        "Backend unavailable. Using saved Political Career data.",
        error
      );

      /*
        DO NOT clear careerJourney.
      */

      setBackendOffline(true);
    } finally {
      setCheckingBackend(false);
    }
  };

  useEffect(() => {
    loadCareerData();
  }, []);

  /* =========================================================
     ONLY SHOW LOADING IF THERE IS NO SAVED DATA
  ========================================================= */

  if (
    checkingBackend &&
    careerJourney.length === 0
  ) {
    return (
      <section className="min-h-screen bg-white">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading political career...
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     NO DATA
  ========================================================= */

  if (careerJourney.length === 0) {
    return (
      <section className="min-h-screen bg-white">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              No Political Career Information
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Start the backend once to load the
              latest information.
            </p>

            <button
              type="button"
              onClick={loadCareerData}
              className="mt-6 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_340px] lg:gap-20">

            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-10 bg-orange-500" />

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
                  Political Journey
                </span>
              </div>

              <h1 className="max-w-3xl text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Political Career
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:text-lg lg:leading-8">
                A journey of public service,
                leadership, social justice and
                inclusive development spanning
                more than two decades of dedicated
                service to the people of Telangana.
              </p>
            </div>

            <div className="grid gap-5">

              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <h3 className="text-4xl font-bold text-orange-500">
                  25+
                </h3>

                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                  Years Experience
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                  <h3 className="text-3xl font-bold text-emerald-600">
                    2023
                  </h3>

                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-500">
                    Assembly Victory
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                  <h3 className="text-3xl font-bold text-orange-500">
                    2025
                  </h3>

                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-500">
                    Cabinet Minister
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          OFFLINE MESSAGE
      ===================================================== */}

      {backendOffline && (
        <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
            Showing the latest saved Political Career
            information. The backend server is currently
            offline.
          </div>
        </div>
      )}

      {/* =====================================================
          TIMELINE
      ===================================================== */}

      <section className="bg-white py-12 sm:py-16 lg:py-24">

        <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">

          <div className="relative">

            <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-orange-200" />

            {careerJourney.map(
              (item, index) => {

                const leftSide =
                  index % 2 === 0;

                return (
                  <div
                    key={
                      item.id ||
                      `${item.year}-${item.position}-${index}`
                    }
                    className="relative mb-14 sm:mb-20 lg:mb-28 last:mb-0"
                  >

                    <div className="absolute left-1/2 top-1/2 z-20 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-orange-500 shadow-md sm:h-5 sm:w-5" />

                    <div className="grid grid-cols-2 gap-4 sm:gap-7 lg:gap-16">

                      <div
                        className={
                          leftSide
                            ? "pr-2 sm:pr-5 lg:pr-8"
                            : "order-2 pl-2 sm:pl-5 lg:pl-8"
                        }
                      >
                        {leftSide ? (
                          <CareerContent
                            item={item}
                          />
                        ) : (
                          <CareerImage
                            item={item}
                          />
                        )}
                      </div>

                      <div
                        className={
                          leftSide
                            ? "pl-2 sm:pl-5 lg:pl-8"
                            : "order-1 pr-2 sm:pr-5 lg:pr-8"
                        }
                      >
                        {leftSide ? (
                          <CareerImage
                            item={item}
                          />
                        ) : (
                          <CareerContent
                            item={item}
                          />
                        )}
                      </div>

                    </div>
                  </div>
                );
              }
            )}

          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL HIGHLIGHT
      ===================================================== */}

      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">

            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-orange-400 sm:text-xs">
                Key Highlight
              </div>

              <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                From Youth Leadership to Cabinet Responsibility
              </h2>

              <p className="mt-4 max-w-xl text-xs leading-5 text-slate-300 sm:text-sm sm:leading-6">
                With more than 25 years of political
                experience, his journey reflects a
                continued focus on public service,
                social justice, welfare and inclusive
                development.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6">
                <div className="text-2xl font-bold text-orange-400 sm:text-3xl">
                  91,393
                </div>

                <div className="mt-1 text-[9px] text-slate-400 sm:text-xs">
                  Votes secured in 2023
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6">
                <div className="text-2xl font-bold text-emerald-400 sm:text-3xl">
                  22,039
                </div>

                <div className="mt-1 text-[9px] text-slate-400 sm:text-xs">
                  Victory margin
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default PoliticalJourney;