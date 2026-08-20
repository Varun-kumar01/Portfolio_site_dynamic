import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { API_BASE_URL } from "../../config";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";


const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Political Journey", path: "/journey" },
  { name: "Gallery", path: "/gallery" },
  { name: "News", path: "/news" },
  { name: "Contact", path: "/contact" },
];


export default function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);


  // =========================
  // GLOBAL WEBSITE DATA
  // =========================

  const [websiteData, setWebsiteData] =
    useState({
      profile: {
        name: "",
        designation: "",
      },

      social: {
        facebook: "",
        instagram: "",
        twitter: "",
        youtube: "",
      },
    });


  // =========================
  // LOAD PROFILE + SOCIAL DATA
  // =========================

  useEffect(() => {

    const loadWebsiteData = async () => {

      try {

        const response = await fetch(
          `${API_BASE_URL}/api/content`
        );

        if (!response.ok) {

          throw new Error(
            "Failed to load website data"
          );

        }

        const data =
          await response.json();


        setWebsiteData({

          profile: {

            name:
              data.profile?.name ||
              "",

            designation:
              data.profile?.designation ||
              "",

          },


          social: {

            facebook:
              data.social?.facebook ||
              "",

            instagram:
              data.social?.instagram ||
              "",

            twitter:
              data.social?.twitter ||
              "",

            youtube:
              data.social?.youtube ||
              "",

          },

        });

      } catch (error) {

        console.error(
          "Error loading Navbar data:",
          error
        );

      }

    };


    loadWebsiteData();

  }, []);


  // =========================
  // SCROLL EFFECT
  // =========================

  useEffect(() => {

    const onScroll = () => {

      setScrolled(
        window.scrollY > 50
      );

    };


    window.addEventListener(
      "scroll",
      onScroll
    );


    return () => {

      window.removeEventListener(
        "scroll",
        onScroll
      );

    };

  }, []);


  return (

    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-500
        ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-md"
            : "bg-white"
        }
      `}
    >

      <div className="max-w-7xl mx-auto">

        <div className="h-20 px-4 lg:px-8 flex items-center justify-between">


          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <img
              src="/logo.png"
              alt="Logo"
              className="w-14 h-14 object-contain"
            />


            <div className="hidden sm:block">

              <h1 className="text-lg font-bold text-gray-800">

                {websiteData.profile.name}

              </h1>


              <p className="text-sm text-orange-600">

                {websiteData.profile.designation}

              </p>

            </div>

          </Link>


          {/* DESKTOP NAVIGATION */}

          <nav className="hidden lg:flex items-center gap-8">

            {navLinks.map((item) => (

              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>

                  isActive
                    ? "text-orange-600 font-semibold"
                    : "text-gray-700 hover:text-orange-600 transition"

                }
              >

                {item.name}

              </NavLink>

            ))}

          </nav>


          {/* DESKTOP SOCIAL ICONS */}

          <div className="hidden lg:flex items-center gap-3">


            {/* FACEBOOK */}

            {websiteData.social.facebook && (

              <a
                href={
                  websiteData.social.facebook
                }
                target="_blank"
                rel="noopener noreferrer"
              >

                <FaFacebookF className="text-gray-600 hover:text-orange-600 transition" />

              </a>

            )}


            {/* INSTAGRAM */}

            {websiteData.social.instagram && (

              <a
                href={
                  websiteData.social.instagram
                }
                target="_blank"
                rel="noopener noreferrer"
              >

                <FaInstagram className="text-gray-600 hover:text-orange-600 transition" />

              </a>

            )}


            {/* TWITTER */}

            {websiteData.social.twitter && (

              <a
                href={
                  websiteData.social.twitter
                }
                target="_blank"
                rel="noopener noreferrer"
              >

                <FaTwitter className="text-gray-600 hover:text-orange-600 transition" />

              </a>

            )}


            {/* YOUTUBE */}

            {websiteData.social.youtube &&
              websiteData.social.youtube !== "#" && (

              <a
                href={
                  websiteData.social.youtube
                }
                target="_blank"
                rel="noopener noreferrer"
              >

                <FaYoutube className="text-gray-600 hover:text-orange-600 transition" />

              </a>

            )}

          </div>


          {/* MOBILE MENU BUTTON */}

          <button
            className="lg:hidden"
            onClick={() =>
              setMenuOpen(true)
            }
          >

            <Menu size={30} />

          </button>

        </div>

      </div>


      {/* MOBILE DRAWER */}

      <div
        className={`fixed inset-0 z-50 transition ${
          menuOpen
            ? "visible"
            : "invisible"
        }`}
      >

        {/* BACKGROUND */}

        <div
          onClick={() =>
            setMenuOpen(false)
          }
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            menuOpen
              ? "opacity-100"
              : "opacity-0"
          }`}
        />


        {/* DRAWER */}

        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85%] bg-white transition-transform duration-300 ${
            menuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >

          {/* DRAWER HEADER */}

          <div className="flex items-center justify-between h-20 px-6 border-b">

            <h2 className="text-xl font-bold">

              Menu

            </h2>


            <button
              onClick={() =>
                setMenuOpen(false)
              }
            >

              <X />

            </button>

          </div>


          {/* MOBILE NAVIGATION */}

          <nav className="flex flex-col">

            {navLinks.map((item) => (

              <NavLink
                key={item.name}
                to={item.path}
                onClick={() =>
                  setMenuOpen(false)
                }
                className={({ isActive }) =>

                  `px-6 py-4 border-b ${
                    isActive
                      ? "text-orange-600 font-semibold"
                      : "text-gray-700"
                  }`

                }
              >

                {item.name}

              </NavLink>

            ))}

          </nav>


          {/* MOBILE SOCIAL MEDIA */}

          <div className="flex items-center gap-5 px-6 py-6">


            {websiteData.social.facebook && (

              <a
                href={
                  websiteData.social.facebook
                }
                target="_blank"
                rel="noopener noreferrer"
              >

                <FaFacebookF
                  size={20}
                  className="text-gray-600 hover:text-orange-600"
                />

              </a>

            )}


            {websiteData.social.instagram && (

              <a
                href={
                  websiteData.social.instagram
                }
                target="_blank"
                rel="noopener noreferrer"
              >

                <FaInstagram
                  size={20}
                  className="text-gray-600 hover:text-orange-600"
                />

              </a>

            )}


            {websiteData.social.twitter && (

              <a
                href={
                  websiteData.social.twitter
                }
                target="_blank"
                rel="noopener noreferrer"
              >

                <FaTwitter
                  size={20}
                  className="text-gray-600 hover:text-orange-600"
                />

              </a>

            )}


            {websiteData.social.youtube &&
              websiteData.social.youtube !== "#" && (

              <a
                href={
                  websiteData.social.youtube
                }
                target="_blank"
                rel="noopener noreferrer"
              >

                <FaYoutube
                  size={20}
                  className="text-gray-600 hover:text-orange-600"
                />

              </a>

            )}

          </div>

        </div>

      </div>

    </header>
  );
}