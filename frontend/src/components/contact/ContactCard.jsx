import {
  FaEnvelope,
  FaLocationDot,
  FaClock,
  FaPhone,
} from "react-icons/fa6";

import SocialLinks from "./SocialLinks";

const ContactCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Heading */}
      <p className="text-green-700 font-semibold uppercase tracking-wider">
        Contact Information
      </p>

      <h2 className="text-4xl font-bold mt-2 mb-8 text-gray-900">
        Let's Stay Connected
      </h2>

      {/* Email */}
      <div className="flex items-start gap-4 mb-8">
        <div className="bg-green-100 p-4 rounded-full">
          <FaEnvelope className="text-green-700 text-xl" />
        </div>

        <div>
          <h4 className="font-semibold text-lg text-gray-900">
            Email
          </h4>

          <a
            href="mailto:ponnam.loksabha@gmail.com"
            className="text-gray-600 hover:text-green-700 transition"
          >
            ponnam.loksabha@gmail.com
          </a>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start gap-4 mb-8">
        <div className="bg-green-100 p-4 rounded-full">
          <FaPhone className="text-green-700 text-xl" />
        </div>

        <div>
          <h4 className="font-semibold text-lg text-gray-900">
            Phone
          </h4>

          <a
            href="tel:+919876543210"
            className="text-gray-600 hover:text-green-700 transition"
          >
            +91 98765 43210
          </a>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-start gap-4 mb-8">
        <div className="bg-green-100 p-4 rounded-full">
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
      <div className="flex items-start gap-4 mb-10">
        <div className="bg-green-100 p-4 rounded-full">
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

      <hr className="border-gray-200 mb-8" />

      {/* Social Links */}
      <SocialLinks />
    </div>
  );
};

export default ContactCard;