import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ProfileTabs() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("early-life");

  const tabs = [
    {
      id: "early-life",
      title: t("profileTabs.earlyLife"),
      image: "/images/early-life.jpg.jpg",
      content: (
        <ul className="space-y-3 text-gray-700 leading-8">
          <li>{t("profileTabs.tabs.earlyLife.birthdate")}</li>
          <li>{t("profileTabs.tabs.earlyLife.birthplace")}</li>
          <li>{t("profileTabs.tabs.earlyLife.parents")}</li>
          <li>{t("profileTabs.tabs.earlyLife.community")}</li>
          <li>{t("profileTabs.tabs.earlyLife.description")}</li>
        </ul>
      ),
    },

    {
      id: "education",
      title: t("profileTabs.education"),
      image: "/images/education.jpg.jpg",
      content: (
        <ul className="space-y-3 text-gray-700 leading-8">
          <li>{t("profileTabs.tabs.education.schooling")}</li>
          <li>{t("profileTabs.tabs.education.iti")}</li>
          <li>{t("profileTabs.tabs.education.association")}</li>
        </ul>
      ),
    },

    {
      id: "politics",
      title: t("profileTabs.politicalJourney"),
      image: "/images/politics.jpg.jpg",
      content: (
        <ul className="space-y-3 text-gray-700 leading-8">
          <li>{t("profileTabs.tabs.politicalJourney.point1")}</li>
          <li>{t("profileTabs.tabs.politicalJourney.point2")}</li>
          <li>{t("profileTabs.tabs.politicalJourney.point3")}</li>
          <li>{t("profileTabs.tabs.politicalJourney.point4")}</li>
          <li>{t("profileTabs.tabs.politicalJourney.point5")}</li>
          <li>{t("profileTabs.tabs.politicalJourney.point6")}</li>
        </ul>
      ),
    },

    {
      id: "leadership",
      title: t("profileTabs.leadership"),
      image: "/images/leadership.jpg.jpg",
      content: (
        <ul className="space-y-3 text-gray-700 leading-8">
          <li>{t("profileTabs.tabs.leadership.point1")}</li>
          <li>{t("profileTabs.tabs.leadership.point2")}</li>
          <li>{t("profileTabs.tabs.leadership.point3")}</li>
          <li>{t("profileTabs.tabs.leadership.point4")}</li>
        </ul>
      ),
    },

    {
      id: "vision",
      title: t("profileTabs.vision"),
      image: "/images/vision.jpg.jpg",
      content: (
        <ul className="space-y-3 text-gray-700 leading-8">
          <li>{t("profileTabs.tabs.vision.point1")}</li>
          <li>{t("profileTabs.tabs.vision.point2")}</li>
          <li>{t("profileTabs.tabs.vision.point3")}</li>
        </ul>
      ),
    },
  ];

  const current = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <section className="py-10 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <p className="text-gray-600 mt-4">
            {t("profileTabs.learnMore")}
          </p>
        </div>

        {/* Tabs */}

        <div className="flex flex-wrap justify-center gap-4 mb-12">

          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300
              ${
                activeTab === tab.id
                  ? "bg-green-700 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-green-100"
              }`}
            >
              {tab.title}
            </button>
          ))}

        </div>

        {/* Content */}

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <img
                src={current.image}
                alt={current.title}
                className="rounded-2xl shadow-lg w-full"
              />

            </div>

            <div>

              <h3 className="text-3xl font-bold text-green-700 mb-6">
                {current.title}
              </h3>

              {current.content}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}