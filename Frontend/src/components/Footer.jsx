export default function Footer() {
  return (
    <footer className="py-6 bg-gray-900 text-gray-400 text-center text-sm shadow-[0_-15px_20px_rgba(0,0,0,0.7)] z-20">
      © {new Date().getFullYear()} LifeDrop. All rights reserved.
    </footer>
  );
}
