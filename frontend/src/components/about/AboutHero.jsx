const AboutHero = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Image */}
          <div className="flex justify-center">

            <div className="w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">

              <img
                src="/images/profile-placeholder.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />

            </div>

          </div>

          {/* Right Content */}

          <div>

            <span className="inline-block bg-green-700 text-white px-5 py-2 rounded-full text-sm tracking-widest uppercase">

              About

            </span>

            <h1 className="mt-6 text-5xl font-bold text-gray-900 leading-tight">

              Ponnam Prabhakar

            </h1>

            <h2 className="mt-3 text-2xl text-gray-600 font-medium">

              Transport & BC Welfare Minister

            </h2>

            <div className="w-24 h-1 bg-yellow-500 my-8"></div>

            <p className="text-gray-600 leading-8">

              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <p className="mt-6 text-gray-600 leading-8">

              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <button className="bg-green-700 hover:bg-green-800 transition text-white px-8 py-3 rounded-lg">

                View Profile

              </button>

              <button className="border-2 border-green-700 hover:bg-green-700 hover:text-white transition text-green-700 px-8 py-3 rounded-lg">

                Biography

              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutHero;