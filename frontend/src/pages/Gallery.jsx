import { useMemo, useState } from "react";
import { Play, X } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    type: "photo",
    category: "Public Events",
    image: "/gallery/1.png",
    title: "Public Meetings",
  },
  {
    id: 2,
    type: "photo",
    category: "Meetings",
    image: "/gallery/2.png",
    title: "Public Meetings",
  },
  {
    id: 3,
    type: "photo",
    category: "Constituency",
    image: "/gallery/3.png",
    title: "Public Meetings",
  },
  {
    id: 4,
    type: "photo",
    category: "Events",
    image: "/gallery/4.png",
    title: "Public Meetings",
  },
  {
    id: 5,
    type: "photo",
    category: "Public Events",
    image: "/gallery/5.png",
    title: "Public Meetings",
  },
  {
    id: 6,
    type: "photo",
    category: "Meetings",
    image: "/gallery/6.png",
    title: "Public Meetings",
  },
  {
    id: 7,
    type: "photo",
    category: "Public Events",
    image: "/gallery/7.png",
    title: "Public Interaction",
  },
  {
    id: 8,
    type: "photo",
    category: "Meetings",
    image: "/gallery/8.png",
    title: "Official Meeting",
  },
  {
    id: 9,
    type: "photo",
    category: "Constituency",
    image: "/gallery/9.png",
    title: "Constituency Visit",
  },
  {
    id: 10,
    type: "photo",
    category: "Events",
    image: "/gallery/10.png",
    title: "Public Programme",
  },
  {
    id: 11,
    type: "photo",
    category: "Public Events",
    image: "/gallery/11.png",
    title: "Community Interaction",
  },
  {
    id: 12,
    type: "photo",
    category: "Meetings",
    image: "/gallery/12.png",
    title: "Leadership Meeting",
  },

  // Videos
  {
    id: 13,
    type: "video",
    category: "Public Events",
    title: "Public Programme",
    videoUrl: "https://www.youtube.com/watch?v=qFusARwKYPk",
  },
  {
    id: 14,
    type: "video",
    category: "Meetings",
    title: "Public Interaction",
    videoUrl: "https://www.youtube.com/watch?v=XTZMEkK0F7s",
  },
];

const categories = [
  "All",
  "Public Events",
  "Constituency",
  "Meetings",
  "Events",
];

// Get YouTube thumbnail from video URL
const getYoutubeThumbnail = (url) => {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/
  );

  return match
    ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
    : "";
};

export default function Gallery() {
  const [type, setType] = useState("photo");
  const [category, setCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const typeMatch = item.type === type;

      const categoryMatch =
        category === "All" || item.category === category;

      return typeMatch && categoryMatch;
    });
  }, [type, category]);

  return (
    <>
      {/* Gallery Section */}

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header */}

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <div className="max-w-2xl">

              <span className="text-orange-600 text-sm font-semibold uppercase tracking-[0.25em]">
                Media Gallery
              </span>

              <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                Moments of Public Service
              </h2>

              <p className="mt-4 text-gray-600 leading-8">
                Explore photographs and videos capturing public programmes,
                constituency visits, meetings and important events.
              </p>

            </div>

            {/* Photo / Video */}

            <div className="flex rounded-full bg-slate-100 p-1 w-fit">

              <button
                onClick={() => {
                  setType("photo");
                  setCategory("All");
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
                  type === "photo"
                    ? "bg-orange-600 text-white shadow"
                    : "text-slate-600 hover:text-orange-600"
                }`}
              >
                Photos
              </button>

              <button
                onClick={() => {
                  setType("video");
                  setCategory("All");
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
                  type === "video"
                    ? "bg-orange-600 text-white shadow"
                    : "text-slate-600 hover:text-orange-600"
                }`}
              >
                Videos
              </button>

            </div>

          </div>

          {/* Categories */}

          <div className="flex flex-wrap gap-3 mt-10">

            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`px-5 py-2 rounded-full border text-sm transition ${
                  category === item
                    ? "bg-orange-600 text-white border-orange-600"
                    : "bg-white border-slate-200 text-slate-600 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

          {/* Gallery */}

          {filteredItems.length > 0 ? (

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-12">

              {filteredItems.map((item, index) => (

                <article
                  key={item.id}
                  className={`group relative overflow-hidden rounded-3xl ${
                    index === 0
                      ? "md:col-span-2 md:row-span-2"
                      : ""
                  }`}
                >

                  {/* Image / Video Thumbnail */}

                  <img
                    src={
                      item.type === "video"
                        ? getYoutubeThumbnail(item.videoUrl)
                        : item.image
                    }
                    alt={item.title}
                    onClick={() =>
                      item.type === "photo" &&
                      setSelectedImage(item.image)
                    }
                    className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                      item.type === "photo"
                        ? "cursor-pointer"
                        : ""
                    } ${
                      index === 0
                        ? "h-[300px] md:h-[520px]"
                        : "h-[220px] md:h-[250px]"
                    }`}
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">

                    <div className="absolute bottom-0 left-0 right-0 p-6">

                      <p className="text-white font-semibold text-lg">
                        {item.title}
                      </p>

                      <p className="mt-1 text-white/70 text-sm">
                        {item.category}
                      </p>

                    </div>

                  </div>

                  {/* Video */}

                  {item.type === "video" && (

                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center"
                    >

                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition">

                        <Play
                          size={22}
                          className="text-orange-600 ml-1"
                          fill="currentColor"
                        />

                      </div>

                    </a>

                  )}

                </article>

              ))}

            </div>

          ) : (

            <div className="mt-12 py-20 text-center rounded-3xl bg-slate-50 border border-slate-100">

              <p className="text-gray-500">
                No {type === "photo" ? "photos" : "videos"} found in this category.
              </p>

            </div>

          )}

        </div>
      </section>

      {/* Lightbox */}

      {selectedImage && (

        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-5"
          onClick={() => setSelectedImage(null)}
        >

          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
          >
            <X size={24} />
          </button>

          <img
            src={selectedImage}
            alt="Gallery preview"
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
          />

        </div>

      )}

    </>
  );
}