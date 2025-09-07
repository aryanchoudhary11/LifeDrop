import { Link } from "react-router-dom";

export default function HomeCTA() {
  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 bg-gradient-to-r from-rose-600 to-pink-500 text-white text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Vend_Sans']">
        Ready to Save a Life?
      </h2>

      <p className="mt-2 text-sm sm:text-base md:text-lg">
        Join LifeDrop and become a hero today.
      </p>

      <Link
        to="/register"
        className="mt-4 sm:mt-6 inline-block bg-white px-5 sm:px-6 py-2 sm:py-3 text-rose-600 font-semibold rounded-xl shadow hover:bg-gray-100 transition text-sm sm:text-base"
      >
        Get Started
      </Link>
    </section>
  );
}
