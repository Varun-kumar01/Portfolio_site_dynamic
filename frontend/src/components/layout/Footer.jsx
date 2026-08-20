import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";

import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

import leader from "../../data/leader";


const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Political Journey", path: "/journey" },
  { name: "Gallery", path: "/gallery" },
  { name: "News", path: "/news" },
  { name: "Contact", path: "/contact" },
];


export default function Footer() {

  // =========================
  // WEBSITE DATA
  // =========================

  const [websiteData, setWebsiteData] = useState({
    profile: leader.profile || {},
    contact: leader.contact || {},
    social: leader.social || {},
  });


  // =========================
  // LOAD LATEST DATA
  // =========================

  useEffect(() => {

    const loadWebsiteData = async () => {

      try {

        const response = await fetch(
          `${API_BASE_URL}/api/content`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load Footer data"
          );
        }

        const data = await response.json();


        setWebsiteData({

          profile:
            data.profile ||
            leader.profile ||
            {},

          contact:
            data.contact ||
            leader.contact ||
            {},

          social:
            data.social ||
            leader.social ||
            {},

        });

      } catch (error) {

        console.error(
          "Error loading Footer data:",
          error
        );

      }

    };


    loadWebsiteData();

  }, []);


  return (

    <footer className="bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">


        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">


          {/* ========================= */}
          {/* ABOUT */}
          {/* ========================= */}

          <div>

            <img
              src="/logo.png"
              alt="Logo"
              className="w-16"
            />


            <h3 className="mt-5 text-2xl font-bold">

              {websiteData.profile?.name}

            </h3>


            <p className="mt-2 text-orange-400">

              {websiteData.profile?.designation2 ||
                "Cabinet Minister"}

              {" • "}

              {websiteData.profile?.state ||
                "Telangana"}

            </p>


            <p className="mt-6 leading-8 text-slate-400">

              Dedicated to transparent governance,
              inclusive development and improving
              the quality of life for every citizen.

            </p>


            {/* SOCIAL MEDIA */}

            <div className="flex gap-4 mt-8">


              {websiteData.social?.facebook && (

                <a
                  href={
                    websiteData.social.facebook
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-600 transition"
                >

                  <FaFacebookF />

                </a>

              )}


              {websiteData.social?.instagram && (

                <a
                  href={
                    websiteData.social.instagram
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-600 transition"
                >

                  <FaInstagram />

                </a>

              )}


              {websiteData.social?.twitter && (

                <a
                  href={
                    websiteData.social.twitter
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-600 transition"
                >

                  <FaTwitter />

                </a>

              )}

            </div>

          </div>


          {/* ========================= */}
          {/* QUICK LINKS */}
          {/* ========================= */}

          <div>

            <h4 className="text-xl font-semibold">

              Quick Links

            </h4>


            <div className="mt-6 flex flex-col gap-4">

              {links.map((item) => (

                <Link
                  key={item.name}
                  to={item.path}
                  className="group flex items-center justify-between text-slate-400 hover:text-orange-400 transition"
                >

                  {item.name}

                  <ArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition"
                  />

                </Link>

              ))}

            </div>

          </div>


          {/* ========================= */}
          {/* CONTACT */}
          {/* ========================= */}

          <div>

            <h4 className="text-xl font-semibold">

              Contact

            </h4>


            <div className="mt-6 space-y-6">


              {/* PHONE */}

              <div className="flex gap-4">

                <Phone className="text-orange-500 mt-1" />

                <div>

                  <p className="text-slate-300">

                    Phone

                  </p>

                  <p className="text-slate-400 break-all">

                    {websiteData.contact?.phone}

                  </p>

                </div>

              </div>


              {/* EMAIL */}

              <div className="flex gap-4">

                <Mail className="text-orange-500 mt-1" />

                <div>

                  <p className="text-slate-300">

                    Email

                  </p>

                  <p className="text-slate-400 break-all">

                    {websiteData.contact?.email}

                  </p>

                </div>

              </div>


              {/* ADDRESS */}

              <div className="flex gap-4">

                <MapPin className="text-orange-500 mt-1" />

                <div>

                  <p className="text-slate-300">

                    Office

                  </p>

                  <p className="text-slate-400 whitespace-pre-line">

                    {websiteData.contact?.address}

                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* ========================= */}
          {/* CONSTITUENCY */}
          {/* ========================= */}

          <div>

            <h4 className="text-xl font-semibold">

              Constituency

            </h4>


            <div className="mt-6 space-y-5">


              <div>

                <p className="text-slate-500 uppercase tracking-widest text-xs">

                  Assembly Constituency

                </p>

                <h5 className="mt-2 text-lg">

                  {websiteData.profile?.constituency}

                </h5>

              </div>


              <div>

                <p className="text-slate-500 uppercase tracking-widest text-xs">

                  District

                </p>

                <h5 className="mt-2 text-lg">

                  {websiteData.profile?.district}

                </h5>

              </div>


              <div>

                <p className="text-slate-500 uppercase tracking-widest text-xs">

                  State

                </p>

                <h5 className="mt-2 text-lg">

                  {websiteData.profile?.state}

                </h5>

              </div>

            </div>

          </div>

        </div>


        {/* ========================= */}
        {/* BOTTOM */}
        {/* ========================= */}

        <div className="border-t border-slate-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-500 text-sm">

            © 2026{" "}

            <span className="font-semibold">

              {websiteData.profile?.name}

            </span>

            . All Rights Reserved.

          </p>


          <p className="text-slate-500 text-sm">

            Designed & Developed with ❤️

          </p>

        </div>

      </div>

    </footer>

  );
}