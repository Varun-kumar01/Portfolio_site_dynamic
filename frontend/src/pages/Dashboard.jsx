import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Home,
  User,
  BookOpen,
  Landmark,
  Building2,
  Newspaper,
  FileText,
  Image,
  Video,
  Phone,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] =
    useState("Dashboard");

  const navigate = useNavigate();

  // =====================================================
  // SIDEBAR MENU
  // =====================================================

  const menuSections = [
    {
      title: "MAIN",
      items: [
        {
          name: "Dashboard",
          icon: LayoutDashboard,
        },
      ],
    },

    {
      title: "WEBSITE",
      items: [
        {
          name: "Home",
          icon: Home,
        },
        {
          name: "About",
          icon: User,
        },
        {
          name: "Biography",
          icon: BookOpen,
        },
        {
          name: "Political Career",
          icon: Landmark,
        },
        {
          name: "Development",
          icon: Building2,
        },
      ],
    },

    {
      title: "CONTENT",
      items: [
        {
          name: "News",
          icon: Newspaper,
        },
        {
          name: "Articles",
          icon: FileText,
        },
        {
          name: "Gallery",
          icon: Image,
        },
        {
          name: "Videos",
          icon: Video,
        },
      ],
    },

    {
      title: "OTHER",
      items: [
        {
          name: "Contact",
          icon: Phone,
        },
        {
          name: "Settings",
          icon: Settings,
        },
      ],
    },
  ];

  // =====================================================
  // STATISTICS
  // =====================================================

  const statistics = [
    {
      title: "Total News",
      value: "24",
      description: "Published news",
      icon: Newspaper,
    },
    {
      title: "Gallery Images",
      value: "156",
      description: "Uploaded images",
      icon: Image,
    },
    {
      title: "Articles",
      value: "18",
      description: "Published articles",
      icon: FileText,
    },
    {
      title: "Videos",
      value: "12",
      description: "Published videos",
      icon: Video,
    },
  ];

  // =====================================================
  // RECENT UPDATES
  // =====================================================

  const recentUpdates = [
    {
      title: "New Welfare Initiative",
      type: "News",
      date: "10 Aug 2026",
      status: "Published",
    },
    {
      title: "Public Meeting at Dharmapuri",
      type: "News",
      date: "08 Aug 2026",
      status: "Published",
    },
    {
      title: "Development Projects",
      type: "Article",
      date: "06 Aug 2026",
      status: "Draft",
    },
    {
      title: "Public Service Event",
      type: "Gallery",
      date: "04 Aug 2026",
      status: "Published",
    },
  ];

  // =====================================================
  // NAVIGATION
  // =====================================================

  const handleSectionChange = (item) => {
    setSidebarOpen(false);

    switch (item.name) {
      case "Dashboard":
        setActiveSection("Dashboard");
        navigate("/admin");
        break;

      case "Political Career":
        setActiveSection("Political Career");
        navigate("/admin/political-career");
        break;

      case "News":
        setActiveSection("News");
        navigate("/admin/news");
        break;

      case "Articles":
        setActiveSection("Articles");
        navigate("/admin/articles");
        break;

      case "Videos":
        setActiveSection("Videos");
        navigate("/admin/videos");
        break;

      default:
        setActiveSection(item.name);
        break;
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  // =====================================================
  // DASHBOARD HOME
  // =====================================================

  const DashboardHome = () => {
    return (
      <>
        {/* WELCOME */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome to the Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Manage and update all content of the
            public portfolio from one place.
          </p>
        </div>

        {/* STATISTICS */}

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      {item.title}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-gray-900">
                      {item.value}
                    </h3>

                    <p className="mt-2 text-xs text-gray-400">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* QUICK ACTIONS */}

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Quickly access frequently used content
            management tools.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* NEWS */}

            <button
              type="button"
              onClick={() => navigate("/admin/news")}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-left transition hover:border-green-300 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <Plus size={22} />
              </div>

              <h3 className="font-semibold text-gray-900">
                Add News
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Publish a new news update.
              </p>
            </button>

            {/* GALLERY */}

            <button
              type="button"
              onClick={() => setActiveSection("Gallery")}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-left transition hover:border-green-300 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Image size={22} />
              </div>

              <h3 className="font-semibold text-gray-900">
                Upload Images
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add photos to the gallery.
              </p>
            </button>

            {/* ARTICLES */}

            <button
              type="button"
              onClick={() => navigate("/admin/articles")}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-left transition hover:border-green-300 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-700">
                <FileText size={22} />
              </div>

              <h3 className="font-semibold text-gray-900">
                Write Article
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Create a new article.
              </p>
            </button>

            {/* VIDEOS */}

            <button
              type="button"
              onClick={() => navigate("/admin/videos")}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-left transition hover:border-green-300 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-700">
                <Video size={22} />
              </div>

              <h3 className="font-semibold text-gray-900">
                Add Video
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add a new video.
              </p>
            </button>
          </div>
        </div>

        {/* RECENT UPDATES */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-gray-200 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recent Updates
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest content changes.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/news")}
              className="text-sm font-semibold text-green-700 hover:text-green-800"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    Content
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    Type
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentUpdates.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {item.title}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {item.type}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {item.date}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          item.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        >
                          <Edit size={17} />
                        </button>

                        <button
                          type="button"
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-100">
      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-72
          border-r
          border-gray-200
          bg-white
          transition-transform
          duration-300
          lg:translate-x-0
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex h-20 items-center justify-between border-b border-gray-200 px-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Admin Panel
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              Portfolio Management
            </p>
          </div>

          <button
            type="button"
            className="text-gray-600 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="h-[calc(100vh-80px)] overflow-y-auto px-4 py-6">
          {menuSections.map((section) => (
            <div
              key={section.title}
              className="mb-7"
            >
              <p className="mb-3 px-3 text-xs font-semibold tracking-widest text-gray-400">
                {section.title}
              </p>

              <nav className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    activeSection === item.name;

                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() =>
                        handleSectionChange(item)
                      }
                      className={`
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-left
                        text-sm
                        font-medium
                        transition
                        ${
                          isActive
                            ? "bg-green-700 text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }
                      `}
                    >
                      <Icon size={19} />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}

          <div className="border-t border-gray-200 pt-5">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut size={19} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}

      <div className="lg:ml-72">
        {/* HEADER */}

        <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={26} />
            </button>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                {activeSection}
              </h2>

              <p className="hidden text-sm text-gray-500 sm:block">
                Manage your portfolio content
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-900">
                Administrator
              </p>

              <p className="text-xs text-gray-500">
                Website Admin
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 font-semibold text-white">
              A
            </div>
          </div>
        </header>

        {/* CONTENT */}

        <main className="p-5 sm:p-8">
          {activeSection === "Dashboard" ? (
            <DashboardHome />
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeSection} Management
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-gray-500">
                Use the navigation button below to
                open this management section.
              </p>

              {activeSection === "Articles" && (
                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/articles")
                  }
                  className="mt-6 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
                >
                  Open Articles
                </button>
              )}

              {activeSection === "News" && (
                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/news")
                  }
                  className="mt-6 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
                >
                  Open News
                </button>
              )}

              {activeSection === "Videos" && (
                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/videos")
                  }
                  className="mt-6 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
                >
                  Open Videos
                </button>
              )}

              {activeSection === "Political Career" && (
                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/political-career")
                  }
                  className="mt-6 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
                >
                  Open Political Career
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;