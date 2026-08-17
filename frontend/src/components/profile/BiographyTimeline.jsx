import { useEffect, useState } from "react";

const BiographyTimeline = () => {
  const [biographyContent, setBiographyContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBiography = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/content"
        );

        if (!response.ok) {
          throw new Error("Failed to load biography");
        }

        const data = await response.json();

        setBiographyContent(
          data.biography?.biographyContent || ""
        );
      } catch (error) {
        console.error(
          "Error loading biography:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadBiography();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500">
            Loading biography...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Biography
        </h2>

        <div className="text-gray-600 leading-8 whitespace-pre-line">

          {biographyContent || (
            <p>
              Biography content is not available.
            </p>
          )}

        </div>

      </div>
    </section>
  );
};

export default BiographyTimeline;
