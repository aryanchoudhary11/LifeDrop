import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroImg from "../../public/heroImg.png";
export default function Hero() {
  return (
    <section className="relative flex items-center justify-around text-center py-24 px-6 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.2)] z-10">
      <div className="flex flex-col justify-center items-center">
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-8xl font-[Creepster] text-rose-600 drop-shadow-lg"
        >
          🩸 LifeDrop
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-5 italic text-xl text-gray-700 max-w-2xl"
        >
          Connecting life savers with those in need. Every drop counts!
        </motion.p>
        <div className="mt-8 flex gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-rose-600 text-white rounded-xl shadow-lg hover:bg-rose-700 transition"
          >
            Become a Donor
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-rose-600 border border-rose-600 rounded-xl shadow-lg hover:bg-rose-700 hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img src={HeroImg} alt="Donate Blood" className="h-100" />
      </div>
    </section>
  );
}
