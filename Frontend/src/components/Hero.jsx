import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroImg from "/heroImg.png";
export default function Hero() {
  return (
    <section className="relative flex flex-col items-center text-center py-16 px-4 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.2)] z-10 md:flex-row md:justify-around md:py-24 md:px-6">
      <div className="flex flex-col justify-center items-center">
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-8xl font-[Creepster] text-rose-600 drop-shadow-lg"
        >
          🩸 LifeDrop
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 md:mt-5 italic text-base md:text-xl text-gray-700 max-w-xs sm:max-w-md md:max-w-2xl"
        >
          Connecting life savers with those in need. Every drop counts!
        </motion.p>
        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            to="/register"
            className="text-sm sm:text-base px-6 py-3 bg-rose-600 text-white rounded-xl shadow-lg hover:bg-rose-700 transition"
          >
            Become a Donor
          </Link>
          <Link
            to="/login"
            className="text-sm sm:text-base px-6 py-3 bg-white text-rose-600 border border-rose-600 rounded-xl shadow-lg hover:bg-rose-700 hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="mt-8 md:mt-0 flex flex-col justify-center items-center">
        <img
          src={HeroImg}
          alt="Donate Blood"
          className="h-48 sm:h-64 md:h-100"
        />
      </div>
    </section>
  );
}
