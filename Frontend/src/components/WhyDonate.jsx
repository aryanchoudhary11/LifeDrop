import { Droplet, Heart, ShieldCheck, Users } from "lucide-react";
export default function WhyDonate() {
  return (
    <section className="py-20 px-6 bg-white">
      <h2 className="text-4xl font-bold text-center text-rose-600 mb-12 font-['Vend_Sans']">
        Why Donate Blood?
      </h2>
      <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <div className="p-6 bg-rose-50 rounded-2xl shadow text-center hover:shadow-lg transition-all">
          <Droplet className="mx-auto text-rose-600" size={40} />
          <h3 className="mt-3 font-semibold">Save Lives</h3>
          <p className="text-gray-600 text-sm">
            Your donation can help up to 3 people survive.
          </p>
        </div>
        <div className="p-6 bg-rose-50 rounded-2xl shadow text-center hover:shadow-lg transition-all">
          <Users className="mx-auto text-rose-600" size={40} />
          <h3 className="mt-3 font-semibold">Be a hero</h3>
          <p className="text-gray-600 text-sm">
            Join a growing network of everyday heroes.
          </p>
        </div>
        <div className="p-6 bg-rose-50 rounded-2xl shadow text-center hover:shadow-lg transition-all">
          <Heart className="mx-auto text-rose-600" size={40} />
          <h3 className="mt-3 font-semibold">Healthy heart</h3>
          <p className="text-gray-600 text-sm">
            Donating blood reduces harmful iron levels.
          </p>
        </div>
        <div className="p-6 bg-rose-50 rounded-2xl shadow text-center hover:shadow-lg transition-all">
          <ShieldCheck className="mx-auto text-rose-600" size={40} />
          <h3 className="mt-3 font-semibold">Trusted & Safe</h3>
          <p className="text-gray-600 text-sm">
            Built with strong security and transparency.
          </p>
        </div>
      </div>
    </section>
  );
}
