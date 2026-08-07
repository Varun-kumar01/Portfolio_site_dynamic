import Container from "../common/Container";
import Button from "../common/Button";

export default function Biography() {
  return (
    <section className="py-24 bg-white">

      <Container>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}

          <div>

            <img
              src="/leader-about.jpg"
              alt=""
              className="rounded-2xl shadow-lg w-full"
            />

          </div>

          {/* Content */}

          <div>

            <span className="uppercase tracking-[0.25em] text-orange-600 font-semibold text-sm">

              Biography

            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight">

              Committed To Public Service And Social Development

            </h2>

            <p className="mt-8 text-gray-600 leading-8">

              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae laboriosam eaque pariatur dolore, maiores
              consequatur nemo asperiores.

            </p>

            <p className="mt-5 text-gray-600 leading-8">

              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nulla asperiores rem minima earum numquam ipsum
              doloremque.

            </p>

            <div className="mt-10">

              <Button>

                Read Complete Biography

              </Button>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}