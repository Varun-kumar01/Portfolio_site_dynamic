import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#222222] text-white pt-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* About */}
          <div>
            <h2 className="text-3xl font-bold">
              ADLURI LAXMAN KUMAR
            </h2>

            <p className="text-green-500 font-medium mt-2">
              Member of Legislative Assembly
            </p>

            <p className="text-gray-400 mt-6 leading-8">
              Dedicated to public service, transparent governance,
              inclusive development, and improving the lives of the
              people through honest leadership.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">

              <a
                href="#"
                className="w-11 h-11 bg-gray-700 rounded-md flex items-center justify-center hover:bg-blue-600 duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 bg-gray-700 rounded-md flex items-center justify-center hover:bg-pink-600 duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-11 h-11 bg-gray-700 rounded-md flex items-center justify-center hover:bg-black duration-300"
              >
                <FaXTwitter />
              </a>

              <a
                href="#"
                className="w-11 h-11 bg-gray-700 rounded-md flex items-center justify-center hover:bg-blue-700 duration-300"
              >
                <FaLinkedinIn />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold">Quick Links</h3>
              <div className="w-16 h-1 bg-green-600 mt-2 rounded"></div>
            </div>

            <ul className="space-y-4">
              <li className="text-gray-300 hover:text-green-500 cursor-pointer duration-300">
                Home
              </li>

              <li className="text-gray-300 hover:text-green-500 cursor-pointer duration-300">
                About
              </li>

              <li className="text-gray-300 hover:text-green-500 cursor-pointer duration-300">
                Political Journey
              </li>

              <li className="text-gray-300 hover:text-green-500 cursor-pointer duration-300">
                Vision
              </li>

              <li className="text-gray-300 hover:text-green-500 cursor-pointer duration-300">
                Contact
              </li>
            </ul>

          </div>

          {/* Media */}
          <div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold">Media</h3>
              <div className="w-16 h-1 bg-green-600 mt-2 rounded"></div>
            </div>

            <ul className="space-y-4">
              <li className="text-gray-300 hover:text-green-500 cursor-pointer duration-300">
                News
              </li>

              <li className="text-gray-300 hover:text-green-500 cursor-pointer duration-300">
                Photo Gallery
              </li>

              <li className="text-gray-300 hover:text-green-500 cursor-pointer duration-300">
                Video Gallery
              </li>

              <li className="text-gray-300 hover:text-green-500 cursor-pointer duration-300">
                Press Releases
              </li>
            </ul>

          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-700 mt-12 py-6 text-center text-gray-400">
          © {new Date().getFullYear()} Adluri Laxman Kumar. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}