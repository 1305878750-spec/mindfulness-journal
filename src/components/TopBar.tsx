export default function TopBar() {
  return (
    <header className="bg-[#050505]/80 backdrop-blur-xl fixed top-0 z-50 flex justify-between items-center w-full px-6 py-4 border-b border-white/15">
      <div className="flex items-center gap-2">
        <h1 className="font-serif italic text-2xl tracking-[-1px] text-primary">Ae.</h1>
      </div>
      <div className="flex gap-4">
        <span className="font-sans text-[11px] uppercase tracking-[3px] text-on-surface-variant">Ritual</span>
      </div>
    </header>
  );
}
