import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter
} from "react-icons/fa";
import leader from "../../data/leader";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Project Journey", path: "/journey" },
  { name: "Gallery", path: "/gallery" },
  { name: "News", path: "/news" },
  { name: "Contact", path: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* About */}

          <div>

            <img
              src="/logo.png"
              alt="Logo"
              className="w-16"
            />

            <h3 className="mt-5 text-2xl font-bold">{leader.profile.name}</h3>

            <p className="mt-2 text-orange-400">

              Cabinet Minister • Telangana

            </p>

            <p className="mt-6 leading-8 text-slate-400">

              Dedicated to transparent governance,
              inclusive development and improving
              the quality of life for every citizen.

            </p>

            <div className="flex gap-4 mt-8">

              <a
                href={leader.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-600 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href={leader.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-600 transition"
              >
                <FaInstagram />
              </a>

              <a
                href={leader.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-600 transition"
              >
                <FaTwitter />
              </a>

            </div>

          </div>

          {/* Quick Links */}

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

          {/* Contact */}

          <div>

            <h4 className="text-xl font-semibold">

              Contact

            </h4>

            <div className="mt-6 space-y-6">

              <div className="flex gap-4">

                <Phone className="text-orange-500 mt-1" />

                <div>

                  <p className="text-slate-300">

                    Phone

                  </p>

                  <p className="text-slate-400">{leader.contact.phone}</p>

                </div>

              </div>

              <div className="flex gap-4">

                <Mail className="text-orange-500 mt-1" />

                <div>

                  <p className="text-slate-300">

                    Email

                  </p>

                  <p className="text-slate-400">{leader.contact.email}</p>

                </div>

              </div>

              <div className="flex gap-4">

                <MapPin className="text-orange-500 mt-1" />

                <div>

                  <p className="text-slate-300">

                    Office

                  </p>

                  <p className="text-slate-400">

                    Dharmapuri,
                    Jagtial,
                    Telangana

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Constituency */}

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

                  Dharmapuri (SC)

                </h5>

              </div>

              <div>

                <p className="text-slate-500 uppercase tracking-widest text-xs">

                  District

                </p>

                <h5 className="mt-2 text-lg">

                  Jagtial

                </h5>

              </div>

              <div>

                <p className="text-slate-500 uppercase tracking-widest text-xs">

                  State

                </p>

                <h5 className="mt-2 text-lg">

                  Telangana

                </h5>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-500 text-sm">© 2026 <span className="font-semibold">{leader.profile.name}</span>. All Rights Reserved.</p>

          <p className="text-slate-500 text-sm">

            Designed & Developed with ❤️

          </p>

        </div>

      </div>

    </footer>
  );
}