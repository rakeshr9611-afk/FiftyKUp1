import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/40 backdrop-blur-sm mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-white/40 text-sm font-medium tracking-wide">
          © {new Date().getFullYear()} FiftyKUp
        </span>
        <nav className="flex items-center gap-6" aria-label="Legal">
          <Link href="/privacy" className="text-white/40 hover:text-emerald-400 text-sm transition-colors duration-200">Privacy Policy</Link>
          <Link href="/terms" className="text-white/40 hover:text-emerald-400 text-sm transition-colors duration-200">Terms of Service</Link>
          <Link href="/compliance" className="text-white/40 hover:text-emerald-400 text-sm transition-colors duration-200">Compliance</Link>
        </nav>
        <p className="text-white/25 text-xs text-center sm:text-right max-w-xs leading-relaxed">
          Not financial advice. For educational purposes only.
        </p>
      </div>
    </footer>
  );
}
