import { Droplet, Heart, ShieldCheck, Users } from "lucide-react";

export default function WhyDonate() {
  const reasons = [
    {
      icon: <Droplet className="mx-auto text-rose-600" size={40} />,
      title: "Save Lives",
      desc: "Your donation can help up to 3 people survive.",
    },
    {
      icon: <Users className="mx-auto text-rose-600" size={40} />,
      title: "Be a hero",
      desc: "Join a growing network of everyday heroes.",
    },
    {
      icon: <Heart className="mx-auto text-rose-600" size={40} />,
      title: "Healthy heart",
      desc: "Donating blood reduces harmful iron levels.",
    },
    {
      icon: <ShieldCheck className="mx-auto text-rose-600" size={40} />,
      title: "Trusted & Safe",
      desc: "Built with strong security and transparency.",
    },
  ];

  return (
    <section className="py-12 px-4 sm:py-20 sm:px-6 bg-white">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-rose-600 mb-8 sm:mb-12 font-['Vend_Sans']">
        Why Donate Blood?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {reasons.map((item, i) => (
          <div
            key={i}
            className="p-4 sm:p-6 bg-rose-50 rounded-2xl shadow text-center hover:shadow-lg transition-all"
          >
            {item.icon}
            <h3 className="mt-3 font-semibold text-base sm:text-lg">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
