import { useMemo, useState } from "react";
import { Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import PageBanner from "../components/common/PageBanner";

const galleryItems = [
  { id: 1, image: "/gallery/gallery1.jpg", category: "Public Meetings", title: "Public Meeting" },
  { id: 2, image: "/gallery/gallery2.jpg", category: "Development", title: "Development Work" },
  { id: 3, image: "/gallery/gallery3.jpg", category: "Government Programs", title: "Government Programme" },
  { id: 4, image: "/gallery/gallery4.jpg", category: "Party Events", title: "Congress Event" },
  { id: 5, image: "/gallery/gallery5.jpg", category: "Community Outreach", title: "Community Visit" },
  { id: 6, image: "/gallery/gallery6.jpg", category: "Public Meetings", title: "Citizens Meeting" },
  { id: 7, image: "/gallery/gallery7.jpg", category: "Development", title: "Road Inspection" },
  { id: 8, image: "/gallery/gallery8.jpg", category: "Government Programs", title: "Welfare Programme" },
  { id: 9, image: "/gallery/gallery9.jpg", category: "Party Events", title: "Party Gathering" },
  { id: 10, image: "/gallery/gallery10.jpg", category: "Community Outreach", title: "Village Visit" },
  { id: 11, image: "/gallery/gallery11.jpg", category: "Public Meetings", title: "Public Interaction" },
  { id: 12, image: "/gallery/gallery12.jpg", category: "Development", title: "Project Review" },
];

const filters = [
  "All",
  "Public Meetings",
  "Development",
  "Government Programs",
  "Party Events",
  "Community Outreach",
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");

  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);

 const filteredImages = useMemo(() => {
  if (activeFilter === "All") return galleryItems;
  return galleryItems.filter(
    (item) => item.category === activeFilter
  );
}, [activeFilter]);

const visibleImages = filteredImages.slice(0, visibleCount);

const nextImage = () => {
  const currentIndex = filteredImages.findIndex(
    (item) => item.id === selectedImage.id
  );

  const next = filteredImages[(currentIndex + 1) % filteredImages.length];
    setSelectedImage(next);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(
      (item) => item.id === selectedImage.id
    );

    const prev =
      filteredImages[
        (currentIndex - 1 + filteredImages.length) %
          filteredImages.length
      ];

    setSelectedImage(prev);
  };

  return (
    <>
      <PageBanner
        title="Gallery"
        background="/gallery-banner.jpg"
      />

      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          <div className="text-center">

            <span className="uppercase tracking-[0.25em] text-orange-600 font-semibold">
              Photo Gallery
            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900">
              Moments of Public Service
            </h2>

            <p className="mt-5 max-w-3xl mx-auto text-gray-600 leading-8">
              A collection of memorable moments from constituency visits,
              development programmes, government initiatives, public meetings,
              and community outreach activities.
            </p>

          </div>

          {/* Filters */}

          <div className="flex flex-wrap justify-center gap-4 mt-14">

            {filters.map((filter) => (

              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full border transition font-medium ${
                  activeFilter === filter
                    ? "bg-orange-600 text-white border-orange-600"
                    : "bg-white border-gray-300 hover:border-orange-600 hover:text-orange-600"
                }`}
              >
                {filter}
              </button>

            ))}

          </div>

          {/* Gallery Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">

            {visibleImages.map((item) => (

              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl bg-white shadow hover:shadow-xl transition duration-300"
              >

                <div className="relative overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300 flex items-center justify-center">

                    <div className="opacity-0 group-hover:opacity-100 transition duration-300">

                      <button
                        onClick={() => setSelectedImage(item)}
                        className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-110 transition"
                      >
                        <Eye
                          size={22}
                          className="text-orange-600"
                        />
                      </button>

                    </div>

                  </div>

                </div>

                <div className="p-6">

                  <p className="text-orange-600 text-sm font-semibold uppercase tracking-wider">
                    {item.category}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>

                </div>

              </div>

            ))}

          </div>
          
          {visibleCount < filteredImages.length && (

            <div className="flex justify-center mt-16">

              <button
                onClick={() =>
                setVisibleCount((prev) => prev + 6)
                }
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition"
                >

                Load More

              </button>

            </div>

          )}

        </div>

      </section>

      {selectedImage && (

        <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center px-4">

          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 text-white"
            >

            <X size={34}/>

          </button>

          <button
            onClick={prevImage}
            className="absolute left-5 text-white"
            >

            <ChevronLeft size={45}/>

          </button>

          <img
            src={selectedImage.image}
            alt=""
            className="max-h-[85vh] rounded-xl"
          />

          <button
            onClick={nextImage}
            className="absolute right-5 text-white"
            >

            <ChevronRight size={45}/>

          </button>

        </div>

      )}
    </>
  );
}