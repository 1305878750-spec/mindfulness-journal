interface LandingProps {
  onGetStarted: () => void;
}

export default function Landing({ onGetStarted }: LandingProps) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="relative flex-grow flex flex-col items-center justify-center px-6 py-20 text-center bg-ethereal min-h-[100svh]">
        <header className="absolute top-0 left-0 w-full p-10 flex justify-center z-50">
          <h1 className="font-serif text-3xl italic tracking-tighter text-primary">Ae.</h1>
        </header>

        <div className="max-w-xl w-full flex flex-col items-center space-y-12 mt-16">
          <div className="space-y-6">
            <p className="font-sans text-[11px] uppercase tracking-[3px] text-on-surface-variant mb-4">The Journey</p>
            <h2 className="font-serif text-[64px] md:text-[88px] font-light italic tracking-[-2px] text-on-surface leading-[0.95]">
              Begin your<br/>stillness.
            </h2>
            <p className="text-on-surface-variant text-[14px] leading-[1.6] max-w-md mx-auto mt-8">
              A private space for your daily reflections. No account needed to start.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-8 w-full mt-12">
            <button 
              onClick={onGetStarted}
              className="px-8 py-3 rounded-full border border-white/15 text-on-surface text-[11px] uppercase tracking-[1px] hover:bg-white hover:text-black transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
