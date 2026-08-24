// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import {
//   Menu,
//   X,
// } from "lucide-react";
// import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

// const navLinks = [
//   { name: "Home", path: "/" },
//   { name: "About", path: "/about" },
//   { name: "Biography", path: "/biography" },
//   { name: "Development", path: "/development" },
//   { name: "Gallery", path: "/gallery" },
//   { name: "News", path: "/news" },
//   { name: "Videos", path: "/videos" },
//   { name: "Contact", path: "/contact" },
// ];

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-40 bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto">

//         {/* Navbar */}
//         <div className="h-20 px-4 lg:px-8 flex items-center justify-between">

//           {/* Logo */}

//           <Link
//             to="/"
//             className="flex items-center gap-3 flex-shrink-0"
//           >
//             <img
//               src="/logo.png"
//               alt="Logo"
//               className="w-14 h-14 object-contain"
//             />

//             <div className="hidden sm:block">
//               <h1 className="text-lg font-bold text-gray-800 leading-tight">
//                 Politician Name
//               </h1>

//               <p className="text-sm text-orange-600">
//                 Public Representative
//               </p>
//             </div>
//           </Link>

//           {/* Desktop Menu */}

//           <nav className="hidden lg:flex items-center gap-8">

//             {navLinks.map((item) => (
//               <NavLink
//                 {t(`nav.${item.key}`)}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `text-[15px] font-medium transition
//                   ${
//                     isActive
//                       ? "text-orange-600"
//                       : "text-gray-700 hover:text-orange-600"
//                   }`
//                 }
//               >
//                 {item.name}
//               </NavLink>
//             ))}

//           </nav>

//           {/* Social Icons */}

//           {/* <div className="hidden lg:flex items-center gap-3">

//             <a href="#">
//               <Facebook
//                 size={18}
//                 className="text-gray-600 hover:text-orange-600"
//               />
//             </a>

//             <a href="#">
//               <Instagram
//                 size={18}
//                 className="text-gray-600 hover:text-orange-600"
//               />
//             </a>

//             <a href="#">
//               <Youtube
//                 size={18}
//                 className="text-gray-600 hover:text-orange-600"
//               />
//             </a>

//           </div> */}

//           <div className="hidden lg:flex items-center gap-3">
//             <a href="#" className="text-gray-600 hover:text-orange-600 transition">
//               <FaFacebookF size={18} />
//             </a>

//             <a href="#" className="text-gray-600 hover:text-orange-600 transition">
//               <FaInstagram size={18} />
//             </a>

//             <a href="#" className="text-gray-600 hover:text-orange-600 transition">
//               <FaYoutube size={18} />
//             </a>
//           </div>

//           {/* Mobile Button */}

//           <button
//             onClick={() => setMenuOpen(true)}
//             className="lg:hidden"
//           >
//             <Menu size={30} />
//           </button>

//         </div>
//       </div>

//       {/* Mobile Drawer */}

//       <div
//         className={`fixed inset-0 z-50 transition ${
//           menuOpen
//             ? "visible"
//             : "invisible"
//         }`}
//       >

//         {/* Overlay */}

//         <div
//           onClick={() => setMenuOpen(false)}
//           className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
//             menuOpen
//               ? "opacity-100"
//               : "opacity-0"
//           }`}
//         />

//         {/* Drawer */}

//         <div
//           className={`absolute right-0 top-0 h-full
//           w-80 max-w-[85%]
//           bg-white
//           transition-transform duration-300
//           ${
//             menuOpen
//               ? "translate-x-0"
//               : "translate-x-full"
//           }`}
//         >

//           <div className="flex justify-between items-center h-20 px-6 border-b">

//             <h2 className="text-xl font-bold">
//               Menu
//             </h2>

//             <button
//               onClick={() => setMenuOpen(false)}
//             >
//               <X />
//             </button>

//           </div>

//           <nav className="flex flex-col py-4">

//             {navLinks.map((item) => (
//               <NavLink
//                 key={item.key}
//                 to={item.path}
//                 onClick={() => setMenuOpen(false)}
//                 className={({ isActive }) =>
//                   `px-6 py-4 border-b text-lg
//                   ${
//                     isActive
//                       ? "text-orange-600 font-semibold"
//                       : "text-gray-700"
//                   }`
//                 }
//               >
//                 {item.name}
//               </NavLink>
//             ))}

//           </nav>

//         </div>

//       </div>

//     </header>
//   );
// }


import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import leader from "../../data/leader";

const navLinks = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "journey", path: "/journey" },
  { key: "gallery", path: "/gallery" },
  { key: "news", path: "/news" },
  { key: "contact", path: "/contact" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-md"
            : "bg-white"
        }
      `}
    >
      <div className="max-w-7xl mx-auto">

        <div className="h-20 px-4 lg:px-8 flex items-center justify-between">

          {/* ================= LOGO ================= */}

          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-14 h-14 object-contain"
            />

            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-800">
                {t("about.name")}
              </h1>

              <p className="text-sm text-orange-600">
                {leader.profile.designation}
              </p>
            </div>
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}

          <nav className="hidden lg:flex items-center gap-8">

            {navLinks.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 font-semibold"
                    : "text-gray-700 hover:text-orange-600 transition"
                }
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}

          </nav>

          {/* ================= DESKTOP LANGUAGE SWITCHER ================= */}

          <div className="hidden lg:flex items-center gap-1 ml-4 border border-gray-200 rounded-full p-1">

            <button
              onClick={() => i18n.changeLanguage("en")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                i18n.language === "en"
                  ? "bg-orange-600 text-white"
                  : "text-gray-600 hover:text-orange-600"
              }`}
            >
              EN
            </button>

            <button
              onClick={() => i18n.changeLanguage("te")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                i18n.language === "te"
                  ? "bg-orange-600 text-white"
                  : "text-gray-600 hover:text-orange-600"
              }`}
            >
              తెలుగు
            </button>

          </div>

          {/* ================= SOCIAL ICONS ================= */}

          <div className="hidden lg:flex items-center gap-3">

            <a
              href={leader.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-gray-600 hover:text-orange-600 transition" />
            </a>

            <a
              href={leader.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-gray-600 hover:text-orange-600 transition" />
            </a>

            <a
              href={leader.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-gray-600 hover:text-orange-600 transition" />
            </a>

          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}

          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={30} />
          </button>

        </div>
      </div>

      {/* ================= MOBILE DRAWER ================= */}

      <div
        className={`fixed inset-0 z-50 transition ${
          menuOpen ? "visible" : "invisible"
        }`}
      >

        {/* Overlay */}

        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}

        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85%] bg-white transition-transform duration-300 ${
            menuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >

          {/* Mobile Header */}

          <div className="flex items-center justify-between h-20 px-6 border-b">

            <h2 className="text-xl font-bold">
              {t("common.menu")}
            </h2>

            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X />
            </button>

          </div>

          {/* Mobile Navigation */}

          <nav className="flex flex-col">

            {navLinks.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-6 py-4 border-b ${
                    isActive
                      ? "text-orange-600 font-semibold"
                      : "text-gray-700"
                  }`
                }
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}

          </nav>

          {/* Mobile Language Switcher */}

          <div className="flex items-center justify-center gap-2 p-6 border-t">

            <button
              onClick={() => i18n.changeLanguage("en")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                i18n.language === "en"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {t("common.english")}
            </button>

            <button
              onClick={() => i18n.changeLanguage("te")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                i18n.language === "te"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {t("common.telugu")}
            </button>

          </div>

        </div>
      </div>

    </header>
  );
}