import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer(){

return(

<footer className="bg-gray-900 text-white">

<div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

<div>

<h2 className="text-2xl font-bold">
Politician Name
</h2>

<p className="mt-5 text-gray-400 leading-7">
Dedicated to transparency,
development and public service.
</p>

<div className="flex gap-4 mt-6">

<FaFacebookF/>

<FaInstagram/>

<FaYoutube/>

</div>

</div>

<div>

<h3 className="font-semibold text-lg">
Quick Links
</h3>

<div className="flex flex-col gap-3 mt-5">

<Link to="/">Home</Link>

<Link to="/about">About</Link>

<Link to="/gallery">Gallery</Link>

<Link to="/contact">Contact</Link>

</div>

</div>

<div>

<h3 className="font-semibold text-lg">
Office
</h3>

<div className="mt-5 space-y-3 text-gray-400">

<p>Hyderabad</p>

<p>Telangana</p>

<p>+91 9876543210</p>

<p>office@email.com</p>

</div>

</div>

<div>

<h3 className="font-semibold text-lg">
Newsletter
</h3>

<input
type="email"
placeholder="Email Address"
className="mt-5 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 outline-none"
/>

<button className="mt-4 w-full bg-orange-600 py-3 rounded-lg font-semibold hover:bg-orange-700">

Subscribe

</button>

</div>

</div>

<hr className="border-gray-800 my-10"/>

<div className="text-center text-gray-500">

© 2026 All Rights Reserved.

</div>

</div>

</footer>

);

}