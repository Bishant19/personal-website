export default function Services() {
  const services = [
    "Video Editing",
    "Motion Designs",
    "3D Product Modeling",
    "Logo Animations",
    "Graphics Designing",
    "Visual Effects / VFX"
  ];

  return (
    <section
    id="Services"
    className="py-28 px-6 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">

        {/* LEFT SIDE */}
        <div>
          <p className="text-sm text-purple-400 mb-4 tracking-widest">
            SERVICES / MY EXPERTISE
          </p>

          <h2 className="text-5xl md:text-6xl font-semibold leading-tight mb-8">
            Choose what matters to your{" "}
            <span className="text-purple-500 italic">
              Business
            </span>
          </h2>

          <button className="border border-gray-500 px-6 py-3 rounded-full hover:border-purple-500 hover:text-purple-400 transition duration-300">
            Learn More
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group flex justify-between items-center border-b border-gray-800 pb-6 cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <span className="text-gray-500 text-lg">
                  0{index + 1}.
                </span>

                <span className="text-xl group-hover:text-purple-400 transition">
                  {service}
                </span>
              </div>

              <div className="w-10 h-10 flex items-center justify-center border border-gray-700 rounded-full group-hover:border-purple-500 group-hover:text-purple-400 transition">
                ↘
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}