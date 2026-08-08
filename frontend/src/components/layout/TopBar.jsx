// import {
//   Phone,
//   Mail,
//   MapPin,
// } from "lucide-react";
// import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

// export default function TopBar() {
//   return (
//     <div className="hidden md:block bg-[#f7f7f7] border-b border-gray-200">
//       <div className="max-w-7xl mx-auto h-10 px-4 lg:px-8 flex items-center justify-between text-sm">

//         {/* Left */}

//         <div className="flex items-center gap-6 text-gray-600">

//           <div className="flex items-center gap-2">
//             <Phone size={14} className="text-orange-600" />
//             <span>+91 9876543210</span>
//           </div>

//           <div className="flex items-center gap-2">
//             <Mail size={14} className="text-orange-600" />
//             <span>office@email.com</span>
//           </div>

//           <div className="hidden xl:flex items-center gap-2">
//             <MapPin size={14} className="text-orange-600" />
//             <span>Hyderabad, Telangana</span>
//           </div>

//         </div>

//         {/* Right */}

//         <div className="flex items-center gap-4">
//           <a href="#" className="hover:text-orange-600 transition">
//             <FaFacebookF size={16} />
//           </a>

//           <a href="#" className="hover:text-orange-600 transition">
//             <FaInstagram size={16} />
//           </a>

//           <a href="#" className="hover:text-orange-600 transition">
//             <FaYoutube size={16} />
//           </a>
//         </div>

//       </div>
//     </div>
//   );
// }


import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function TopBar() {
  return (
    <div className="hidden md:block bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-10 px-4 lg:px-8 flex items-center justify-between text-sm">
        <div className="flex items-center gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-orange-600" />
            <span>+91 9876543210</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={14} className="text-orange-600" />
            <span>leader.contact.email</span>
          </div>

          <div className="hidden xl:flex items-center gap-2">
            <MapPin size={14} className="text-orange-600" />
            <span>Hyderabad, Telangana</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-600">
          <a href="#">
            <FaFacebookF className="hover:text-orange-600 transition" />
          </a>

          <a href="#">
            <FaInstagram className="hover:text-orange-600 transition" />
          </a>

          <a href="#">
            <FaYoutube className="hover:text-orange-600 transition" />
          </a>
        </div>
      </div>
    </div>
  );
}