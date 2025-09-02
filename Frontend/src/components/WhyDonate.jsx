import { Droplet, Heart, ShieldCheck, Users } from "lucide-react";
export default function WhyDonate() {
  return (
    <section className="py-20 px-6 bg-white">
      <h2 className="text-4xl font-bold text-center text-rose-600 mb-12 font-['Vend_Sans']">
        Why Donate Blood?
      </h2>
      <div>
        <div>
          <Droplet />
          <h3>Save Lives</h3>
          <p>Your donation can help up to 3 people survive.</p>
        </div>
        <div>
          <Users />
          <h3>Be a hero</h3>
          <p>Join a growing network of everyday heroes.</p>
        </div>
        <div>
          <Heart />
          <h3>Healthy heart</h3>
          <p>Donating blood reduces harmful iron levels.</p>
        </div>
        <div>
          <ShieldCheck />
          <h3>Trusted & Safe</h3>
          <p>Built with strong security and transparency.</p>
        </div>
      </div>
    </section>
  );
}
