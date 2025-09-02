import Hero from "../components/Hero";
import WhyDonate from "../components/WhyDonate";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-red-50 to pink-100">
      <Hero />
      <WhyDonate />
    </div>
  );
}
