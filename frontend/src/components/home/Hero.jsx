import politician from "../../assets/hero.png";
import background from "../../assets/backgrounds/background.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-20 min-h-screen flex items-center">

        <div className="grid lg:grid-cols-2 gap-20 items-center w-full">

          {/* Left Side */}
          <div className="max-w-2xl">

            <p className="text-green-400 uppercase tracking-[8px] text-lg font-semibold mb-5">
              Hon'ble MLA
            </p>

            <h1 className=" text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              ADLURI <br />
              LAXMAN <br />
              KUMAR
            </h1>

            <h2 className="mt-6 text-xl md:text-2xl font-semibold text-yellow-300">
              Working Towards a Better Telangana
            </h2>

            <p className="mt-8 text-lg text-gray-100 leading-9 text-xl leading-8 max-w-xl">
              Dedicated to transparent governance, inclusive development,
              quality education, stronger infrastructure, and the welfare
              of every citizen through honest and responsible leadership.
            </p>

          </div>

          {/* Right Side */}
          <div className="flex justify-center lg:justify-end">

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 shadow-2xl border border-white/20">

              <img
                src={politician}
                alt="Adluri Laxman Kumar"
                className="w-[320px] sm:w-[380px] md:w-[450px] lg:w-[500px] object-contain"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}