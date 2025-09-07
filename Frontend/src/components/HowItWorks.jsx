import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    { step: "1", title: "Register", desc: "Sign up with your details" },
    { step: "2", title: "Verify", desc: "Confirm your email address" },
    { step: "3", title: "Donate", desc: "Register as a donor" },
    { step: "4", title: "Get Matched", desc: "Help someone in need" },
  ];

  return (
    <section className="py-12 px-4 sm:py-20 sm:px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-600 mb-8 sm:mb-12 font-['Vend_Sans']">
        How It Works
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
        {steps.map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="p-4 sm:p-6 bg-indigo-50 rounded-2xl shadow"
          >
            <div className="text-2xl sm:text-3xl md:text-3xl font-bold text-indigo-600">
              {item.step}
            </div>
            <h3 className="mt-2 sm:mt-3 font-semibold text-base sm:text-lg">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-2">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
