export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Bishant Rajbhandari. All rights reserved.</p>
        <p>Designed &amp; built with care.</p>
      </div>
    </footer>
  );
}
