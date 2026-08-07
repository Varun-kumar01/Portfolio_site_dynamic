import { ArrowRight } from "lucide-react";

const images = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
  "/gallery5.jpg",
  "/gallery6.jpg",
];

export default function GalleryPreview() {
  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center">

          <span className="text-orange-600 uppercase font-semibold tracking-widest">
            Gallery
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            Moments With People
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-gray-600 leading-8">
            A glimpse into public meetings, development programs,
            celebrations and community engagement.
          </p>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-16">

          {images.map((image, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-2xl group"
            >

              <img
                src={image}
                alt=""
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
              />

            </div>

          ))}

        </div>

        <div className="flex justify-center mt-14">

          <button className="bg-orange-600 hover:bg-orange-700 transition text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2">

            View Gallery

            <ArrowRight size={18} />

          </button>

        </div>

      </div>

    </section>
  );
}