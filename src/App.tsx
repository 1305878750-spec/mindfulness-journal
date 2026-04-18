import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Landing from './components/Landing';
import Today from './components/Today';
import Evening from './components/Evening';
import History from './components/History';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';

export type Screen = 'landing' | 'today' | 'evening' | 'history';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      {currentScreen !== 'landing' && <TopBar />}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex-grow flex flex-col"
        >
          {currentScreen === 'landing' && <Landing onGetStarted={() => setCurrentScreen('today')} />}
          {currentScreen === 'today' && <Today onSave={() => setCurrentScreen('evening')} />}
          {currentScreen === 'evening' && <Evening onSave={() => setCurrentScreen('history')} />}
          {currentScreen === 'history' && <History />}
        </motion.div>
      </AnimatePresence>

      {currentScreen !== 'landing' && (
        <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}
    </div>
  );
}
