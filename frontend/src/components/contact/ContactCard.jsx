// import {
//   FaEnvelope,
//   FaLocationDot,
//   FaClock,
//   FaPhone,
// } from "react-icons/fa6";
// import leader from "../../data/leader"


// import SocialLinks from "./SocialLinks";

// const ContactCard = () => {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
//       {/* Heading */}
//       <p className="text-green-700 font-semibold uppercase tracking-wider">
//         Contact Information
//       </p>

//       <h2 className="text-4xl font-bold mt-2 mb-8 text-gray-900">
//         Let's Stay Connected
//       </h2>

//       {/* Email */}
//       <div className="flex items-start gap-4 mb-8">
//         <div className="bg-green-100 p-4 rounded-full">
//           <FaEnvelope className="text-green-700 text-xl" />
//         </div>

//         <div>
//           <h4 className="font-semibold text-lg text-gray-900">
//             Email
//           </h4>

//           <a
//             href={leader.contact.phone}
//             className="text-gray-600 hover:text-green-700 transition"
//           >
//             <p>{leader.contact.email}</p>
//           </a>
//         </div>
//       </div>

//       {/* Phone */}
//       <div className="flex items-start gap-4 mb-8">
//         <div className="bg-green-100 p-4 rounded-full">
//           <FaPhone className="text-green-700 text-xl" />
//         </div>

//         <div>
//           <h4 className="font-semibold text-lg text-gray-900">
//             Phone
//           </h4>

//           <a
//             href={leader.contact.phone}
//             className="text-gray-600 hover:text-green-700 transition"
//           >
//             <p>{leader.contact.phone}</p>
//           </a>
//         </div>
//       </div>

//       {/* Address */}
//       <div className="flex items-start gap-4 mb-8">
//         <div className="bg-green-100 p-4 rounded-full">
//           <FaLocationDot className="text-green-700 text-xl" />
//         </div>

//         <div>
//           <h4 className="font-semibold text-lg text-gray-900">
//             Office Address
//           </h4>

//           <p className="text-gray-600 leading-7">
//             Hyderabad
//             <br />
//             Telangana
//             <br />
//             India
//           </p>
//         </div>
//       </div>

//       {/* Office Hours */}
//       <div className="flex items-start gap-4 mb-10">
//         <div className="bg-green-100 p-4 rounded-full">
//           <FaClock className="text-green-700 text-xl" />
//         </div>

//         <div>
//           <h4 className="font-semibold text-lg text-gray-900">
//             Office Hours
//           </h4>

//           <p className="text-gray-600 leading-7">
//             Monday – Saturday
//             <br />
//             9:00 AM – 6:00 PM
//           </p>
//         </div>
//       </div>

//       <hr className="border-gray-200 mb-8" />

//       {/* Social Links */}
//       <SocialLinks />
//     </div>
//   );
// };

// export default ContactCard;







import { useEffect, useState } from "react";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";


const ContactCard = () => {

  const [contact, setContact] = useState({
    email: "",
    phone: "",
    address: "",
    officeHours: "",
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    linkedin: "",
  });


  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =========================
  // LOAD GLOBAL CONTACT DATA
  // =========================

  useEffect(() => {

    const loadContactDetails = async () => {

      try {

        setLoading(true);

        setError("");


        const response = await fetch(
          "http://localhost:5000/api/content"
        );


        if (!response.ok) {

          throw new Error(
            `Failed to load contact details (${response.status})`
          );

        }


        const data = await response.json();


        console.log(
          "GLOBAL CONTACT DATA:",
          data
        );


        setContact({

          email:
            data.contact?.email ||
            "",


          phone:
            data.contact?.phone ||
            "",


          address:
            data.contact?.address ||
            "",


          officeHours:
            data.contact?.officeHours ||
            "",


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


          linkedin:
            data.social?.linkedin ||
            "",

        });

      } catch (error) {

        console.error(
          "Error loading contact details:",
          error
        );


        setError(
          "Unable to load contact information."
        );

      } finally {

        setLoading(false);

      }

    };


    loadContactDetails();

  }, []);


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="bg-white rounded-2xl p-8 shadow-lg">

        <p className="text-slate-500">

          Loading contact information...

        </p>

      </div>

    );

  }


  // =========================
  // ERROR
  // =========================

  if (error) {

    return (

      <div className="bg-white rounded-2xl p-8 shadow-lg">

        <p className="text-red-600">

          {error}

        </p>

      </div>

    );

  }


  return (

    <div className="bg-white rounded-2xl p-8 shadow-lg">


      {/* TITLE */}

      <p className="text-sm font-semibold tracking-widest text-orange-600">

        CONTACT INFORMATION

      </p>


      <h2 className="text-3xl font-bold text-slate-900 mt-2">

        Let’s Stay Connected

      </h2>


      {/* CONTACT DETAILS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">


        {/* EMAIL */}

        <div className="flex items-start gap-4">

          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">

            <Mail
              size={20}
              className="text-orange-600"
            />

          </div>


          <div>

            <h3 className="font-semibold text-slate-900">

              Email

            </h3>


            <a
              href={
                contact.email
                  ? `mailto:${contact.email}`
                  : "#"
              }
              className="text-sm text-slate-500 break-all hover:text-orange-600"
            >

              {contact.email || "Not provided"}

            </a>

          </div>

        </div>


        {/* PHONE */}

        <div className="flex items-start gap-4">

          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">

            <Phone
              size={20}
              className="text-orange-600"
            />

          </div>


          <div>

            <h3 className="font-semibold text-slate-900">

              Phone

            </h3>


            <a
              href={
                contact.phone
                  ? `tel:${contact.phone}`
                  : "#"
              }
              className="text-sm text-slate-500 hover:text-orange-600"
            >

              {contact.phone || "Not provided"}

            </a>

          </div>

        </div>


        {/* ADDRESS */}

        <div className="flex items-start gap-4">

          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">

            <MapPin
              size={20}
              className="text-orange-600"
            />

          </div>


          <div>

            <h3 className="font-semibold text-slate-900">

              Office Address

            </h3>


            <p className="text-sm text-slate-500 whitespace-pre-line">

              {contact.address || "Not provided"}

            </p>

          </div>

        </div>


        {/* OFFICE HOURS */}

        <div className="flex items-start gap-4">

          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">

            <Clock
              size={20}
              className="text-orange-600"
            />

          </div>


          <div>

            <h3 className="font-semibold text-slate-900">

              Office Hours

            </h3>


            <p className="text-sm text-slate-500 whitespace-pre-line">

              {contact.officeHours || "Not provided"}

            </p>

          </div>

        </div>

      </div>


      {/* DIVIDER */}

      <div className="border-t border-slate-200 my-8"></div>


      {/* SOCIAL MEDIA */}

      <h3 className="text-xl font-semibold text-slate-900 mb-5">

        Follow Us

      </h3>


      <div className="flex items-center gap-3 flex-wrap">


        {/* FACEBOOK */}

        {contact.facebook && (

          <a
            href={contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-orange-100 flex items-center justify-center text-slate-700 hover:text-orange-600 transition"
          >

            <FaFacebookF size={17} />

          </a>

        )}


        {/* INSTAGRAM */}

        {contact.instagram && (

          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-orange-100 flex items-center justify-center text-slate-700 hover:text-orange-600 transition"
          >

            <FaInstagram size={17} />

          </a>

        )}


        {/* X / TWITTER */}

        {contact.twitter && (

          <a
            href={contact.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X / Twitter"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-orange-100 flex items-center justify-center text-slate-700 hover:text-orange-600 transition"
          >

            <FaXTwitter size={16} />

          </a>

        )}


        {/* YOUTUBE */}

        {contact.youtube &&
          contact.youtube !== "#" && (

          <a
            href={contact.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-orange-100 flex items-center justify-center text-slate-700 hover:text-orange-600 transition"
          >

            <FaYoutube size={17} />

          </a>

        )}


        {/* LINKEDIN */}

        {contact.linkedin && (

          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-orange-100 flex items-center justify-center text-slate-700 hover:text-orange-600 transition"
          >

            <FaLinkedinIn size={17} />

          </a>

        )}

      </div>

    </div>

  );

};


export default ContactCard;