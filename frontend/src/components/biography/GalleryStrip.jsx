import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const gallery = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
  "/gallery5.jpg",
  "/gallery6.jpg",
];

export default function GalleryStrip() {
  return (
    <section className="py-24 bg-gray-50">

      <Container>

        <SectionTitle
          subtitle="Gallery"
          title="Moments from Public Life"
          description="Snapshots from public meetings, welfare programmes and constituency visits."
          center
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-16">

          {gallery.map((image, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-2xl"
            >

              <img
                src={image}
                alt=""
                className="w-full h-72 object-cover hover:scale-105 transition duration-500"
              />

            </div>

          ))}

        </div>

      </Container>

    </section>
  );
}