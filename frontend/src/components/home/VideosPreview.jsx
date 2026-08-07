import { PlayCircle } from "lucide-react";

const videos=[
"/video1.jpg",
"/video2.jpg",
"/video3.jpg"
];

export default function VideosPreview(){

return(

<section className="py-20 bg-gray-50">

<div className="max-w-7xl mx-auto px-4 lg:px-8">

<div className="text-center">

<span className="uppercase tracking-widest font-semibold text-orange-600">
Latest Videos
</span>

<h2 className="mt-4 text-4xl font-bold">
Campaign & Public Events
</h2>

</div>

<div className="grid lg:grid-cols-3 gap-8 mt-16">

{videos.map((video,index)=>(

<div
key={index}
className="relative rounded-2xl overflow-hidden group cursor-pointer shadow"
>

<img
src={video}
alt=""
className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
/>

<div className="absolute inset-0 bg-black/30"/>

<div className="absolute inset-0 flex items-center justify-center">

<div className="w-20 h-20 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition">

<PlayCircle
size={42}
className="text-orange-600"
/>

</div>

</div>

</div>

))}

</div>

</div>

</section>

);

}