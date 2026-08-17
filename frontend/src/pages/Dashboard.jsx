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
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ============================================================
  // SIDEBAR MENU
  // ============================================================

  const menuSections = [
    {
      title: "MAIN",
      items: [
        {
          name: "Dashboard",
          icon: LayoutDashboard,
          path: "/admin",
        },
      ],
    },

    {
      title: "WEBSITE",
      items: [
        {
          name: "Home",
          icon: Home,
          path: "/admin/home",
        },
        {
          name: "About",
          icon: User,
          path: "/admin/about",
        },
        {
          name: "Biography",
          icon: BookOpen,
          path: "/admin/biography",
        },
        {
          name: "Political Career",
          icon: Landmark,
          path: "/admin/political-career",
        },
        {
          name: "Development",
          icon: Building2,
          path: "/admin/development",
        },
      ],
    },

    {
      title: "CONTENT",
      items: [
        {
          name: "News",
          icon: Newspaper,
          path: "/admin/news",
        },
        {
          name: "Articles",
          icon: FileText,
          path: "/admin/articles",
        },
        {
          name: "Gallery",
          icon: Image,
          path: "/admin/gallery",
        },
        {
          name: "Videos",
          icon: Video,
          path: "/admin/videos",
        },
      ],
    },

    {
      title: "OTHER",
      items: [
        {
          name: "Contact",
          icon: Phone,
          path: "/admin/contact",
        },
        {
          name: "Settings",
          icon: Settings,
          path: "/admin/settings",
        },
      ],
    },
  ];

  // ============================================================
  // STATISTICS
  // ============================================================

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

  // ============================================================
  // RECENT UPDATES
  // ============================================================

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
      date: "05 Aug 2026",
      status: "Draft",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ========================================================= */}
      {/* MOBILE OVERLAY */}
      {/* ========================================================= */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ========================================================= */}
      {/* SIDEBAR */}
      {/* ========================================================= */}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-72
          bg-white
          border-r
          border-gray-200
          z-50
          transition-transform
          duration-300
          overflow-y-auto

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        {/* LOGO */}

        <div className="h-20 px-6 border-b border-gray-200 flex items-center justify-between">

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Portfolio
            </h1>

            <p className="text-xs text-gray-500">
              Management
            </p>
          </div>

          <button
            className="lg:hidden text-gray-500"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>

        </div>

        {/* MENU */}

        <div className="p-4">

          {menuSections.map((section) => (

            <div
              key={section.title}
              className="mb-8"
            >

              <p className="px-2 mb-3 text-xs font-semibold tracking-widest text-gray-400">
                {section.title}
              </p>

              <div className="space-y-1">

                {section.items.map((item) => {

                  const Icon = item.icon;

                  return (

                    <button
                      key={item.name}
                      onClick={() => {
                        navigate(item.path);
                        setSidebarOpen(false);
                      }}
                      className="
                        w-full
                        flex
                        items-center
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        text-left
                        text-gray-600
                        hover:bg-gray-100
                        hover:text-gray-900
                        transition
                      "
                    >

                      <Icon size={21} />

                      <span className="font-medium">
                        {item.name}
                      </span>

                    </button>

                  );

                })}

              </div>

            </div>

          ))}

        </div>

        {/* LOGOUT */}

        <div className="p-4 border-t border-gray-200">

          <button
            onClick={() => navigate("/admin/login")}
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-red-600
              hover:bg-red-50
              transition
            "
          >

            <LogOut size={19} />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>

      {/* ========================================================= */}
      {/* MAIN AREA */}
      {/* ========================================================= */}

      <div className="lg:ml-72">

        {/* ======================================================= */}
        {/* TOP HEADER */}
        {/* ======================================================= */}

        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-5 sm:px-8">

          <div className="flex items-center gap-4">

            <button
              className="lg:hidden text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={26} />
            </button>

            <div>

              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Dashboard
              </h2>

              <p className="hidden sm:block text-sm text-gray-500">
                Manage your portfolio content
              </p>

            </div>

          </div>

          {/* ADMIN PROFILE */}

          <div className="flex items-center gap-3">

            <div className="hidden sm:block text-right">

              <p className="text-sm font-semibold text-gray-900">
                Administrator
              </p>

              <p className="text-xs text-gray-500">
                Website Admin
              </p>

            </div>

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-green-700
                text-white
                flex
                items-center
                justify-center
                font-semibold
              "
            >
              A
            </div>

          </div>

        </header>

        {/* ======================================================= */}
        {/* DASHBOARD CONTENT */}
        {/* ======================================================= */}

        <main className="p-5 sm:p-8">

          {/* WELCOME */}

          <div className="mb-8">

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome to the Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Manage and update all content of the public portfolio from one place.
            </p>

          </div>

          {/* ===================================================== */}
          {/* STATISTICS */}
          {/* ===================================================== */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-4
              gap-5
              mb-8
            "
          >

            {statistics.map((item) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.title}
                  className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-200
                    p-6
                    hover:shadow-lg
                    transition
                  "
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-sm text-gray-500">
                        {item.title}
                      </p>

                      <h3 className="text-3xl font-bold text-gray-900 mt-2">
                        {item.value}
                      </h3>

                      <p className="text-xs text-gray-400 mt-2">
                        {item.description}
                      </p>

                    </div>

                    <div
                      className="
                        w-12
                        h-12
                        rounded-xl
                        bg-green-50
                        text-green-700
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Icon size={24} />
                    </div>

                  </div>

                </div>

              );

            })}

          </div>

          {/* ===================================================== */}
          {/* QUICK ACTIONS */}
          {/* ===================================================== */}

          <div className="mb-8">

            <div className="mb-5">

              <h2 className="text-xl font-bold text-gray-900">
                Quick Actions
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Quickly access frequently used content management tools.
              </p>

            </div>

            {/* CHANGED lg:grid-cols-4 TO xl:grid-cols-5 */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-5
                gap-5
              "
            >

              {/* ADD NEWS */}

              <button
                onClick={() => navigate("/admin/news")}
                className="
                  bg-white
                  border
                  border-gray-200
                  rounded-2xl
                  p-6
                  text-left
                  hover:shadow-lg
                  hover:border-green-300
                  transition
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-green-50
                    text-green-700
                    flex
                    items-center
                    justify-center
                    mb-4
                  "
                >
                  <Plus size={22} />
                </div>

                <h3 className="font-semibold text-gray-900">
                  Add News
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Publish a new news update.
                </p>

              </button>

              {/* GALLERY */}

              <button
                onClick={() => navigate("/admin/gallery")}
                className="
                  bg-white
                  border
                  border-gray-200
                  rounded-2xl
                  p-6
                  text-left
                  hover:shadow-lg
                  hover:border-green-300
                  transition
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-blue-50
                    text-blue-700
                    flex
                    items-center
                    justify-center
                    mb-4
                  "
                >
                  <Image size={22} />
                </div>

                <h3 className="font-semibold text-gray-900">
                  Upload Images
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Add photos to the gallery.
                </p>

              </button>

              {/* ARTICLE */}

              <button
                onClick={() => navigate("/admin/articles")}
                className="
                  bg-white
                  border
                  border-gray-200
                  rounded-2xl
                  p-6
                  text-left
                  hover:shadow-lg
                  hover:border-green-300
                  transition
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-yellow-50
                    text-yellow-700
                    flex
                    items-center
                    justify-center
                    mb-4
                  "
                >
                  <FileText size={22} />
                </div>

                <h3 className="font-semibold text-gray-900">
                  Write Article
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Create a new article.
                </p>

              </button>

              {/* VIDEO */}

              <button
                onClick={() => navigate("/admin/videos")}
                className="
                  bg-white
                  border
                  border-gray-200
                  rounded-2xl
                  p-6
                  text-left
                  hover:shadow-lg
                  hover:border-green-300
                  transition
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-red-50
                    text-red-700
                    flex
                    items-center
                    justify-center
                    mb-4
                  "
                >
                  <Video size={22} />
                </div>

                <h3 className="font-semibold text-gray-900">
                  Add Video
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Add a new video.
                </p>

              </button>

              {/* ================================================= */}
              {/* EDIT CONTACT - NEW */}
              {/* ================================================= */}

              <button
                onClick={() => navigate("/admin/contact")}
                className="
                  bg-white
                  border
                  border-gray-200
                  rounded-2xl
                  p-6
                  text-left
                  hover:shadow-lg
                  hover:border-green-300
                  transition
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-green-50
                    text-green-700
                    flex
                    items-center
                    justify-center
                    mb-4
                  "
                >
                  <Phone size={22} />
                </div>

                <h3 className="font-semibold text-gray-900">
                  Edit Contact
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Update contact details and social links.
                </p>

              </button>

            </div>

          </div>

          {/* ===================================================== */}
          {/* RECENT UPDATES */}
          {/* ===================================================== */}

          <div
            className="
              bg-white
              border
              border-gray-200
              rounded-2xl
              overflow-hidden
            "
          >

            <div
              className="
                p-6
                border-b
                border-gray-200
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
              "
            >

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Recent Updates
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Latest content changes.
                </p>

              </div>

              <button
                onClick={() => navigate("/admin/news")}
                className="
                  text-sm
                  font-semibold
                  text-green-700
                  hover:text-green-800
                "
              >
                View All
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead>

                  <tr className="bg-gray-50">

                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Content
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Type
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Date
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Status
                    </th>

                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recentUpdates.map((item, index) => (

                    <tr
                      key={index}
                      className="border-t border-gray-100 hover:bg-gray-50"
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
                          className={`
                            inline-flex
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                            ${
                              item.status === "Published"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                          `}
                        >
                          {item.status}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            className="
                              p-2
                              rounded-lg
                              text-gray-500
                              hover:bg-gray-100
                              hover:text-gray-900
                            "
                            title="View"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            className="
                              p-2
                              rounded-lg
                              text-blue-600
                              hover:bg-blue-50
                            "
                            title="Edit"
                          >
                            <Edit size={17} />
                          </button>

                          <button
                            className="
                              p-2
                              rounded-lg
                              text-red-600
                              hover:bg-red-50
                            "
                            title="Delete"
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

        </main>

      </div>

    </div>
  );
};

export default Dashboard;