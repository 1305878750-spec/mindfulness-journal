import { Screen } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <nav className="bg-[#050505]/90 backdrop-blur-2xl fixed bottom-0 left-0 w-full z-50 flex justify-center gap-4 items-center px-8 py-6 border-t border-white/15">
      <button 
        onClick={() => onNavigate('today')}
        className={`px-5 py-2 rounded-full border border-white/15 text-[11px] uppercase tracking-[1px] transition-all ${
          currentScreen === 'today' 
            ? 'bg-white text-black' 
            : 'text-on-surface-variant hover:text-white'
        }`}
      >
        Morning
      </button>

      <button 
        onClick={() => onNavigate('evening')}
        className={`px-5 py-2 rounded-full border border-white/15 text-[11px] uppercase tracking-[1px] transition-all ${
          currentScreen === 'evening' 
            ? 'bg-white text-black' 
            : 'text-on-surface-variant hover:text-white'
        }`}
      >
        Evening
      </button>

      <button 
        onClick={() => onNavigate('history')}
        className={`px-5 py-2 rounded-full border border-white/15 text-[11px] uppercase tracking-[1px] transition-all ${
          currentScreen === 'history' 
            ? 'bg-white text-black' 
            : 'text-on-surface-variant hover:text-white'
        }`}
      >
        History
      </button>
    </nav>
  );
}
