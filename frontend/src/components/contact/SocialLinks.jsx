import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import leader from "../../data/leader";

import { FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next";


const SocialLinks = () => {
  const { t } = useTranslation();
  return (
    <div>
      {/* Heading */}
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {t("contactCard.followUs")}
      </h3>

      {/* Social Icons */}
      <div className="flex items-center gap-4">
        {/* Facebook */}
        <a
          href={leader.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 transition-all duration-300 hover:bg-green-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
        >
          <FaFacebookF size={18} />
        </a>

        {/* Instagram */}
        <a
          href={leader.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 transition-all duration-300 hover:bg-green-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
        >
          <FaInstagram size={18} />
        </a>

        {/* X (Twitter) */}
        <a
          href={leader.social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 transition-all duration-300 hover:bg-green-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
        >
          <FaXTwitter size={18} />
        </a>

        {/* YouTube */}
        <a
          href={leader.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 transition-all duration-300 hover:bg-green-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
        >
          <FaYoutube size={18} />
        </a>

        {/* LinkedIn */}
        <a
          href={leader.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 transition-all duration-300 hover:bg-green-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
        >
          <FaLinkedinIn size={18} />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;