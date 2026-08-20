import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";

export default function ContactCTA() {
  const navigate = useNavigate();

  const [contactCTA, setContactCTA] = useState({
    label: "Get In Touch",

    heading:
      "Together, Let's Build A Better Tomorrow",

    description:
      "Your ideas, suggestions and concerns matter. Stay connected and work together towards stronger communities, better development and transparent governance.",

    buttonText: "Contact Office",
  });

  const [contact, setContact] = useState({
    phone: "",
    email: "",
    address: "",
  });

  // =========================
  // LOAD CONTACT DATA
  // =========================

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/content`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load contact information"
          );
        }

        const data = await response.json();

        // =========================
        // GLOBAL CONTACT INFORMATION
        // This comes from Contact Page data
        // =========================

        if (data.contact) {
          setContact({
            phone:
              data.contact.phone || "",

            email:
              data.contact.email || "",

            address:
              data.contact.address || "",
          });
        }

        // =========================
        // CONTACT CTA TEXT
        // =========================

        if (data.home?.contactCTA) {
          setContactCTA({
            label:
              data.home.contactCTA.label ||
              "Get In Touch",

            heading:
              data.home.contactCTA.heading ||
              "Together, Let's Build A Better Tomorrow",

            description:
              data.home.contactCTA.description ||
              "Your ideas, suggestions and concerns matter. Stay connected and work together towards stronger communities, better development and transparent governance.",

            buttonText:
              data.home.contactCTA.buttonText ||
              "Contact Office",
          });
        }
      } catch (error) {
        console.error(
          "Error loading Contact CTA:",
          error
        );
      }
    };

    loadData();
  }, []);

  return (
    <section className="pt-16 pb-20 lg:pt-20 lg:pb-24 bg-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 px-8 py-14 md:px-14 md:py-16">

          {/* Decorative Blur */}

          <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-white/10 blur-[120px]"></div>

          <div className="absolute -bottom-24 right-0 w-72 h-72 rounded-full bg-white/10 blur-[120px]"></div>


          <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-12 items-center">

            {/* LEFT */}

            <div>

              {/* LABEL */}

              <span className="uppercase tracking-[0.25em] text-white/80 text-sm font-semibold">

                {contactCTA.label}

              </span>


              {/* HEADING */}

              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight whitespace-pre-line">

                {contactCTA.heading}

              </h2>


              {/* DESCRIPTION */}

              <p className="mt-6 text-white/90 leading-8 max-w-2xl">

                {contactCTA.description}

              </p>


              {/* CONTACT DETAILS */}

              <div className="grid sm:grid-cols-3 gap-6 mt-10">


                {/* PHONE */}

                <div className="flex items-start gap-3">

                  <Phone
                    className="text-white mt-1"
                    size={20}
                  />

                  <div>

                    <p className="text-white font-medium">

                      Phone

                    </p>

                    <p className="text-white/80 text-sm">

                      {contact.phone}

                    </p>

                  </div>

                </div>


                {/* EMAIL */}

                <div className="flex items-start gap-3">

                  <Mail
                    className="text-white mt-1"
                    size={20}
                  />

                  <div>

                    <p className="text-white font-medium">

                      Email

                    </p>

                    <p className="text-white/80 text-sm break-all">

                      {contact.email}

                    </p>

                  </div>

                </div>


                {/* OFFICE */}

                <div className="flex items-start gap-3">

                  <MapPin
                    className="text-white mt-1"
                    size={20}
                  />

                  <div>

                    <p className="text-white font-medium">

                      Office

                    </p>

                    <p className="text-white/80 text-sm">

                      {contact.address}

                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* RIGHT */}

            <div className="flex justify-center lg:justify-end">

              <button
                onClick={() =>
                  navigate("/contact")
                }
                className="bg-white text-orange-600 hover:bg-slate-100 transition-all duration-300 rounded-full px-10 py-5 font-semibold inline-flex items-center gap-3 shadow-xl hover:scale-105"
              >

                {contactCTA.buttonText}

                <ArrowRight size={18} />

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}