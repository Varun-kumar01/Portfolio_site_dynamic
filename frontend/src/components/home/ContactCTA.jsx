import { ArrowRight } from "lucide-react";

export default function ContactCTA(){

return(

<section className="py-24 bg-orange-600">

<div className="max-w-5xl mx-auto text-center px-4">

<h2 className="text-4xl lg:text-5xl font-bold text-white">

Together We Can Build
A Better Tomorrow

</h2>

<p className="mt-6 text-orange-100 leading-8 text-lg">

Your ideas, feedback and participation help strengthen our community.

</p>

<button className="mt-10 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-gray-100 transition">

Contact Us

<ArrowRight size={18}/>

</button>

</div>

</section>

);

}