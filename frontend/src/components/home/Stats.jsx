export default function Stats() {

  const stats = [
    {
      number: "2023",
      title: "Elected MLA",
    },
    {
      number: "2025",
      title: "Cabinet Minister",
    },
    {
      number: "25+",
      title: "Years of Public Service",
    },
    {
      number: "100%",
      title: "People Commitment",
    },
  ];

  return (
    <section className="bg-white py-8">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 duration-300"
            >

              <h2 className="text-5xl font-bold text-green-700">
                {item.number}
              </h2>

              <p className="mt-4 text-lg font-semibold text-gray-700">
                {item.title}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}