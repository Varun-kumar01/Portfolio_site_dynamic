import { useTranslation } from "react-i18next";
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
  FaTwitter
} from "react-icons/fa";
import leader from "../../data/leader";

const links = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "journey", path: "/journey" },
  { key: "gallery", path: "/gallery" },
  { key: "news", path: "/news" },
  { key: "contact", path: "/contact" },
];

export default function Footer() {
  const { t } = useTranslation();

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

            <h3 className="mt-5 text-2xl font-bold">{t("about.name")}</h3>

            <p className="mt-2 text-orange-400">

              {t("footer.designation")}

            </p>

            <p className="mt-6 leading-8 text-slate-400">

              {t("footer.bio")}

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

              {t("footer.quickLinks")}

            </h4>

            <div className="mt-6 flex flex-col gap-4">

              {links.map((item) => (

                <Link
                  key={item.key}
                  to={item.path}
                  className="group flex items-center justify-between text-slate-400 hover:text-orange-400 transition"
                >

                  {t(`nav.${item.key}`)}

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

              {t("footer.contact")}

            </h4>

            <div className="mt-6 space-y-6">

              <div className="flex gap-4">

                <Phone className="text-orange-500 mt-1" />

                <div>

                  <p className="text-slate-300">

                    {t("footer.phone")}

                  </p>

                  <p className="text-slate-400">{leader.contact.phone}</p>

                </div>

              </div>

              <div className="flex gap-4">

                <Mail className="text-orange-500 mt-1" />

                <div>

                  <p className="text-slate-300">

                    {t("footer.email")}

                  </p>

                  <p className="text-slate-400">{leader.contact.email}</p>

                </div>

              </div>

              <div className="flex gap-4">

                <MapPin className="text-orange-500 mt-1" />

                <div>

                  <p className="text-slate-300">

                    {t("footer.office")}

                  </p>

                  <p className="text-slate-400">

                    {t("footer.officeAddress")}

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Constituency */}

          <div>

            <h4 className="text-xl font-semibold">

              {t("footer.constituency")}

            </h4>

            <div className="mt-6 space-y-5">

              <div>

                <p className="text-slate-500 uppercase tracking-widest text-xs">

                  {t("footer.assemblyConstituency")}

                </p>

                <h5 className="mt-2 text-lg">

                  {t("footer.dharmapuriSc")}

                </h5>

              </div>

              <div>

                <p className="text-slate-500 uppercase tracking-widest text-xs">

                  {t("footer.district")}

                </p>

                <h5 className="mt-2 text-lg">

                  {t("footer.jagtial")}

                </h5>

              </div>

              <div>

                <p className="text-slate-500 uppercase tracking-widest text-xs">

                  {t("footer.state")}

                </p>

                <h5 className="mt-2 text-lg">

                  {t("footer.telangana")}

                </h5>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-500 text-sm">© 2026 <span className="font-semibold">{t("about.name")}</span>. {t("footer.rights")}</p>

          <p className="text-slate-500 text-sm">

            {t("footer.designed")}

          </p>

        </div>

      </div>

    </footer>
  );
}