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







import {
  FaEnvelope,
  FaLocationDot,
  FaClock,
  FaPhone,
} from "react-icons/fa6";

import leader from "../../data/leader";
import SocialLinks from "./SocialLinks";

const ContactCard = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">

      {/* Heading */}
      <span className="text-green-700 font-semibold uppercase tracking-wider">
        Contact Information
      </span>

      <h2 className="text-4xl font-bold mt-2 mb-8 text-gray-900">
        Let's Stay Connected
      </h2>

      {/* Contact Information - 2 x 2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="bg-green-100 p-4 rounded-full shrink-0">
            <FaEnvelope className="text-green-700 text-xl" />
          </div>

          <div className="min-w-0">
            <h4 className="font-semibold text-lg text-gray-900">
              Email
            </h4>

            <a
              href={`mailto:${leader.contact.email}`}
              className="text-gray-600 hover:text-green-700 transition break-all"
            >
              {leader.contact.email}
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="bg-green-100 p-4 rounded-full shrink-0">
            <FaPhone className="text-green-700 text-xl" />
          </div>

          <div>
            <h4 className="font-semibold text-lg text-gray-900">
              Phone
            </h4>

            <a
              href={`tel:${leader.contact.phone}`}
              className="text-gray-600 hover:text-green-700 transition"
            >
              {leader.contact.phone}
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="bg-green-100 p-4 rounded-full shrink-0">
            <FaLocationDot className="text-green-700 text-xl" />
          </div>

          <div>
            <h4 className="font-semibold text-lg text-gray-900">
              Office Address
            </h4>

            <p className="text-gray-600 leading-7">
              Hyderabad
              <br />
              Telangana
              <br />
              India
            </p>
          </div>
        </div>

        {/* Office Hours */}
        <div className="flex items-start gap-4">
          <div className="bg-green-100 p-4 rounded-full shrink-0">
            <FaClock className="text-green-700 text-xl" />
          </div>

          <div>
            <h4 className="font-semibold text-lg text-gray-900">
              Office Hours
            </h4>

            <p className="text-gray-600 leading-7">
              Monday – Saturday
              <br />
              9:00 AM – 6:00 PM
            </p>
          </div>
        </div>

      </div>

      {/* Social Links */}
      <hr className="border-gray-200 mb-8 mt-8" />

      <SocialLinks />

    </div>
  );
};

export default ContactCard;