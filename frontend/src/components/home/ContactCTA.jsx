import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import leader from "../../data/leader";

export default function ContactCTA() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="pt-16 pb-20 lg:pt-20 lg:pb-24 bg-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 px-8 py-14 md:px-14 md:py-16">

          {/* Decorative Blur */}

          <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-white/10 blur-[120px]"></div>

          <div className="absolute -bottom-24 right-0 w-72 h-72 rounded-full bg-white/10 blur-[120px]"></div>

          <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-12 items-center">

            {/* Left */}

            <div>

              <span className="uppercase tracking-[0.25em] text-white/80 text-sm font-semibold">

                {t("contactCTA.label")}

              </span>

              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">

                {t("contactCTA.titleLine1")}
                <br />
                {t("contactCTA.titleLine2")}

              </h2>

              <p className="mt-6 text-white/90 leading-8 max-w-2xl">

                {t("contactCTA.description")}

              </p>

              <div className="grid sm:grid-cols-3 gap-6 mt-10">

                <div className="flex items-start gap-3">

                  <Phone className="text-white mt-1" size={20} />

                  <div>

                    <p className="text-white font-medium">

                      {t("contactCTA.phone")}

                    </p>

                    <p className="text-white/80 text-sm">

                      {leader.contact.phone}

                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <Mail className="text-white mt-1" size={20} />

                  <div>

                    <p className="text-white font-medium">

                      {t("contactCTA.email")}

                    </p>

                    <p className="text-white/80 text-sm">
                      <span>{leader.contact.email}</span>
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <MapPin className="text-white mt-1" size={20} />

                  <div>

                    <p className="text-white font-medium">

                      {t("contactCTA.office")}

                    </p>

                    <p className="text-white/80 text-sm">

                      {t("contactCTA.officeAddress")}

                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Right */}

            <div className="flex justify-center lg:justify-end">

              <button onClick={() => navigate("/contact")} className="bg-white text-orange-600 hover:bg-slate-100 transition-all duration-300 rounded-full px-10 py-5 font-semibold inline-flex items-center gap-3 shadow-xl hover:scale-105">

                {t("contactCTA.button")}

                <ArrowRight size={18} />

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}