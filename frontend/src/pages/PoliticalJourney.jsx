import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../config";

// =====================================================
// API
// =====================================================

const API_URL =
  `${API_BASE_URL}/api/political-career`;

const CACHE_KEY =
  "political_career_latest_v5";

// =====================================================
// CACHE
// =====================================================

const getSavedCareer = () => {
  try {
    const saved =
      localStorage.getItem(CACHE_KEY);

    if (!saved) {
      return [];
    }

    const parsed =
      JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch (error) {
    console.error(
      "Political Career cache error:",
      error
    );

    return [];
  }
};

const saveCareerData = (data) => {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error(
      "Unable to save Political Career cache:",
      error
    );
  }
};

// =====================================================
// IMAGE URL
// =====================================================

const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "";
  }

  const path =
    String(imagePath).trim();

  if (!path) {
    return "";
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  if (path.startsWith("/")) {
    return `${API_BASE_URL}${path}`;
  }

  return `${API_BASE_URL}/${path}`;
};

// =====================================================
// CONTENT CARD
// =====================================================

const CareerContent = ({ item }) => {
  const isMajorMilestone =
    item.category === "Major Milestone" ||
    item.highlight === true;

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
          isMajorMilestone
            ? "border-orange-200 bg-orange-50"
            : "border-slate-200 bg-white"
        }
      `}
    >
      {/* CATEGORY */}

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
        {item.category ||
          "Political Career"}
      </div>

      {/* TIME PERIOD */}

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
        {item.year || ""}
      </div>

      {/* POSITION */}

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
        {item.position || ""}
      </h2>

      {/* ORGANIZATION */}

      {item.organization && (
        <p
          className="
            mt-1
            text-[8px]
            font-semibold
            text-slate-500

            sm:text-[10px]

            lg:text-xs
          "
        >
          {item.organization}
        </p>
      )}

      {/* LOCATION */}

      {item.location && (
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
          {item.location}
        </p>
      )}

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
        {item.description || ""}
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
  );
};

// =====================================================
// IMAGE CARD
// =====================================================

const CareerImage = ({ item }) => {
  const rawImage =
    item.image_url ||
    item.image ||
    "";

  const imageUrl =
    getImageUrl(rawImage);

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

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={
              item.position ||
              "Political Career"
            }
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
            onError={(event) => {
              console.error(
                "Political Career image failed:",
                imageUrl
              );

              event.currentTarget.style.display =
                "none";

              const fallback =
                event.currentTarget.parentElement?.querySelector(
                  ".career-image-fallback"
                );

              if (fallback) {
                fallback.classList.remove(
                  "hidden"
                );
              }
            }}
          />
        ) : null}

        {/* FALLBACK */}

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

        {/* GRADIENT */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/50
            via-transparent
            to-transparent
          "
        />

        {/* TIME PERIOD */}

        <div
          className="
            absolute
            bottom-2
            left-2
            z-20

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
            {item.year || ""}
          </span>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// MAIN PAGE
// =====================================================

const PoliticalJourney = () => {
  const { i18n, t } =
    useTranslation();

  const [careerJourney, setCareerJourney] =
    useState(() => getSavedCareer());

  const [checkingBackend, setCheckingBackend] =
    useState(true);

  const [backendOffline, setBackendOffline] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  const [lastUpdated, setLastUpdated] =
    useState(null);

  // =====================================================
  // LOAD BACKEND
  // =====================================================

  const loadCareerData =
    useCallback(
      async (showRefresh = false) => {
        try {
          if (showRefresh) {
            setRefreshing(true);
          }

          setCheckingBackend(true);

          const language =
            i18n.language?.startsWith(
              "te"
            )
              ? "te"
              : "en";

          const url =
            `${API_URL}?lang=${language}&_=${Date.now()}`;

          console.log(
            "POLITICAL CAREER API:",
            url
          );

          const response =
            await fetch(url, {
              method: "GET",

              headers: {
                Accept:
                  "application/json",

                "Cache-Control":
                  "no-cache, no-store, must-revalidate",

                Pragma:
                  "no-cache",
              },

              cache: "no-store",
            });

          if (!response.ok) {
            throw new Error(
              `Server returned ${response.status}`
            );
          }

          const result =
            await response.json();

          console.log(
            "LATEST POLITICAL CAREER:",
            result
          );

          if (!result.success) {
            throw new Error(
              result.message ||
                "Political Career API returned unsuccessful response."
            );
          }

          const latestCareer =
            Array.isArray(
              result.data
            )
              ? result.data
              : [];

              console.log("LATEST CAREER DATA:");
              console.log(latestCareer);
          setCareerJourney(
            latestCareer
          );

          console.log("///////////////////////Rendering careerJourney:");
          console.log(careerJourney);

          saveCareerData(
            latestCareer
          );

          setLastUpdated(
            new Date()
          );

          setBackendOffline(
            false
          );
        } catch (error) {
          console.error(
            "POLITICAL CAREER BACKEND ERROR:",
            error
          );

          setBackendOffline(
            true
          );
        } finally {
          setCheckingBackend(
            false
          );

          setRefreshing(false);
        }
      },
      [i18n.language]
    );

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadCareerData(false);
  }, [loadCareerData]);

  // =====================================================
  // AUTO REFRESH
  // =====================================================

  useEffect(() => {
    const interval =
      setInterval(() => {
        loadCareerData(false);
      }, 30000);

    return () => {
      clearInterval(
        interval
      );
    };
  }, [loadCareerData]);

  // =====================================================
  // LOADING
  // =====================================================

  if (
    checkingBackend &&
    careerJourney.length === 0
  ) {
    return (
      <section className="min-h-screen bg-white">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div
              className="
                mx-auto
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-orange-200
                border-t-orange-600
              "
            />

            <p className="mt-4 text-sm text-slate-500">
              {t(
                "common.loading",
                "Loading..."
              )}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // NO DATA
  // =====================================================

  if (
    careerJourney.length === 0
  ) {
    return (
      <section className="min-h-screen bg-white">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-8
              text-center
              shadow-sm
            "
          >
            <h2 className="text-xl font-bold text-gray-900">
              {t(
                "journey.noData",
                "No Political Career Information"
              )}
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Unable to load Political Career
              information from the backend.
            </p>

            <button
              type="button"
              onClick={() =>
                loadCareerData(true)
              }
              disabled={refreshing}
              className="
                mt-6
                rounded-lg
                bg-orange-600
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-orange-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {refreshing
                ? "Refreshing..."
                : t(
                    "common.tryAgain",
                    "Try Again"
                  )}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}

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
          <div
            className="
              grid
              items-center
              gap-12

              lg:grid-cols-[1fr_340px]
              lg:gap-20
            "
          >
            {/* LEFT */}

            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-10 bg-orange-500" />

                <span
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-orange-500
                  "
                >
                  {t(
                    "journey.pageLabel",
                    "Political Journey"
                  )}
                </span>
              </div>

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
                {t(
                  "journey.pageTitle",
                  "Political Career"
                )}
              </h1>

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
                {t(
                  "journey.pageDescription",
                  "A journey of public service, leadership, social justice and inclusive development spanning more than two decades of dedicated service to the people of Telangana."
                )}
              </p>

              {/* REFRESH */}

              <button
                type="button"
                onClick={() =>
                  loadCareerData(true)
                }
                disabled={refreshing}
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-orange-600
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-orange-700
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <span
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                >
                  ↻
                </span>

                {refreshing
                  ? "Refreshing..."
                  : "Refresh Data"}
              </button>

              {lastUpdated && (
                <p className="mt-2 text-xs text-slate-400">
                  Last checked:{" "}
                  {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>

            {/* STATS */}

            <div className="grid gap-5">
              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  text-center
                  shadow-sm
                "
              >
                <h3 className="text-4xl font-bold text-orange-500">
                  25+
                </h3>

                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                  {t(
                    "journeyStats.yearsExperience",
                    "Years Experience"
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    text-center
                    shadow-sm
                  "
                >
                  <h3 className="text-3xl font-bold text-emerald-600">
                    2023
                  </h3>

                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-500">
                    {t(
                      "journeyStats.assemblyVictory",
                      "Assembly Victory"
                    )}
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    text-center
                    shadow-sm
                  "
                >
                  <h3 className="text-3xl font-bold text-orange-500">
                    2025
                  </h3>

                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-500">
                    {t(
                      "journeyStats.cabinetMinister",
                      "Cabinet Minister"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BACKEND STATUS */}

      {backendOffline && (
        <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
          <div
            className="
              rounded-xl
              border
              border-yellow-200
              bg-yellow-50
              px-4
              py-3
              text-sm
              text-yellow-700
            "
          >
            Backend is currently unavailable.
            Showing the last saved Political
            Career information.
          </div>
        </div>
      )}

      {/* TIMELINE */}

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

            {/* CENTER LINE */}

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

            {/* CAREER */}

            

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
                    className="
                      relative
                      mb-14

                      sm:mb-20

                      lg:mb-28

                      last:mb-0
                    "
                  >
                    {/* DOT */}

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

                    {/* COLUMNS */}

                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-4

                        sm:gap-7

                        lg:gap-16
                      "
                    >
                      {/* LEFT */}

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

                      {/* RIGHT */}

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

      {/* FINAL HIGHLIGHT */}

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
                {t(
                  "journeyStats.keyHighlight",
                  "Key Highlight"
                )}
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
                {t(
                  "journeyStats.highlightTitle",
                  "From Youth Leadership to Cabinet Responsibility"
                )}
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
                {t(
                  "journeyStats.highlightDesc",
                  "With more than 25 years of political experience, his journey reflects a continued focus on public service, social justice, welfare and inclusive development."
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
                  {t(
                    "journeyStats.votesSecured",
                    "Votes secured in 2023"
                  )}
                </div>
              </div>

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
                  {t(
                    "journeyStats.victoryMargin",
                    "Victory margin"
                  )}
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