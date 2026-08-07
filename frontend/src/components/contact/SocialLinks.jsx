import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const SocialLinks = () => {
  return (
    <div>
      {/* Heading */}
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Follow Us
      </h3>

      {/* Social Icons */}
      <div className="flex items-center gap-4">
        {/* Facebook */}
        <a
          href="#"
          aria-label="Facebook"
          className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 transition-all duration-300 hover:bg-green-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
        >
          <FaFacebookF size={18} />
        </a>

        {/* Instagram */}
        <a
          href="#"
          aria-label="Instagram"
          className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 transition-all duration-300 hover:bg-green-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
        >
          <FaInstagram size={18} />
        </a>

        {/* X (Twitter) */}
        <a
          href="#"
          aria-label="X"
          className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 transition-all duration-300 hover:bg-green-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
        >
          <FaXTwitter size={18} />
        </a>

        {/* YouTube */}
        <a
          href="#"
          aria-label="YouTube"
          className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 transition-all duration-300 hover:bg-green-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
        >
          <FaYoutube size={18} />
        </a>

        {/* LinkedIn */}
        <a
          href="#"
          aria-label="LinkedIn"
          className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 transition-all duration-300 hover:bg-green-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
        >
          <FaLinkedinIn size={18} />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;