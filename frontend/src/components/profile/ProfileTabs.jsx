import { useState } from "react";

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("early-life");

  const tabs = [
    {
      id: "early-life",
      title: "Early Life",
      image: "/images/early-life.jpg.jpg",
      content: (
        <>
          <ul className="space-y-3 text-gray-700 leading-8">
            <li><strong>Birthdate:</strong> April 1, 1968</li>
            <li><strong>Birthplace:</strong> Peddapalli, Telangana</li>
            <li><strong>Parents:</strong> Adluri Nagaiah and Lakshmi</li>
            <li><strong>Community:</strong> Scheduled Caste (Madiga)</li>
            <li>
              Grew up in a humble family where his father worked in
              Singareni Collieries.
            </li>
          </ul>
        </>
      ),
    },

    {
      id: "education",
      title: "Education",
      image: "/images/education.jpg.jpg",
      content: (
        <>
          <ul className="space-y-3 text-gray-700 leading-8">
            <li>
              <strong>Schooling:</strong> Government Junior College,
              Godavarikhani (1978–1982)
            </li>

            <li>
              <strong>ITI Diploma:</strong> Government ITI College,
              Peddapalli (1982–1985)
            </li>

            <li>
              Strong academic association through his family.
            </li>
          </ul>
        </>
      ),
    },

    {
      id: "politics",
      title: "Political Journey",
      image: "/images/politics.jpg.jpg",
      content: (
        <>
          <ul className="space-y-3 text-gray-700 leading-8">
            <li>Started as NSUI President in 1982.</li>
            <li>Served in NSUI and Youth Congress.</li>
            <li>Won ZPTC election in 2006.</li>
            <li>Karimnagar Zilla Parishad Chairman (2010–2012).</li>
            <li>SC Corporation Chairman (2013–2014).</li>
            <li>Minister in Telangana Cabinet (2025).</li>
          </ul>
        </>
      ),
    },

    {
      id: "leadership",
      title: "Leadership",
      image: "/images/leadership.jpg.jpg",
      content: (
        <>
          <ul className="space-y-3 text-gray-700 leading-8">
            <li>Grassroots leadership.</li>
            <li>People-first governance.</li>
            <li>Implements SC Sub Plan.</li>
            <li>Supports over 1.5 lakh students.</li>
          </ul>
        </>
      ),
    },

    {
      id: "vision",
      title: "Vision",
      image: "/images/vision.jpg.jpg",
      content: (
        <>
          <ul className="space-y-3 text-gray-700 leading-8">
            <li>Empower marginalized communities.</li>
            <li>Digital governance.</li>
            <li>Quality education for all.</li>
          </ul>
        </>
      ),
    },
  ];

  const current = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="py-10 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <span className="bg-green-700 text-white px-5 py-2 rounded-full uppercase tracking-widest text-sm">
            Profile
          </span>

          <p className="text-gray-600 mt-4">
            Learn more about the life and leadership journey.
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