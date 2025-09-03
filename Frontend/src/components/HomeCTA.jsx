import { Link } from "react-router";

export default function HomeCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-rose-600 to-pink-500 text-white text-center">
      <h2 className="text-4xl font-bold font-['Vend_Sans']">
        Ready to Save a Life?
      </h2>
      <p className="mt-2">Join LifeDrop and become a hero today.</p>
      <Link
        to="/register"
        className="mt-6 inline-block bg-white px-6 py-3 text-rose-600 font-semibold rounded-xl shadow hover:bg-gray-100 transition cursor-pointer"
      >
        Get Started
      </Link>
    </section>
  );
}
