import { useState } from 'react';
import { ArrowRight, Check, LoaderCircle, Sparkles } from 'lucide-react';
import { saveReflection } from '../lib/api';

export default function Evening({ onSave }: { onSave?: () => void }) {
  const [reflection, setReflection] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!reflection.trim()) return;
    setError('');
    setIsSaving(true);

    try {
      await saveReflection('evening', reflection.trim());
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        setReflection('');
        setIsSaving(false);
        if (onSave) onSave();
      }, 800);
    } catch (err: any) {
      setError(err.message || 'Failed to save');
      setIsSaving(false);
    }
  };

  return (
    <main className="flex-grow flex flex-col px-6 pt-24 pb-32 max-w-2xl mx-auto w-full">
      <section className="relative mb-16">
        <div className="ritual-scene ritual-scene-evening w-full h-64 rounded-xl border border-white/15" aria-label="Evening lake" />
        <div className="mt-8">
          <p className="font-sans text-[11px] uppercase tracking-[3px] text-on-surface-variant mb-4">Evening Reflection</p>
          <h2 className="font-serif font-light italic text-[56px] md:text-[72px] leading-[0.95] tracking-[-2px] text-on-surface">What's one thing<br/>you're grateful<br/>for today?</h2>
        </div>
      </section>

      <section className="flex-grow flex flex-col gap-8">
        <div className="relative">
          <textarea 
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full min-h-[200px] p-6 rounded-lg bg-transparent border border-white/15 focus:border-white focus:ring-0 text-lg font-serif italic text-on-surface placeholder:text-on-surface-variant transition-all resize-none outline-none" 
            placeholder="Start typing..."
          />
        </div>

        <aside className="p-6 border border-white/15 rounded-lg flex gap-6 items-center">
          <div className="p-3 border border-white/15 rounded-full">
            <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="font-serif text-lg italic text-white">"Gratitude turns what we have into enough."</p>
            <p className="text-[10px] font-sans uppercase tracking-[2px] text-on-surface-variant mt-2">— Anonymous</p>
          </div>
        </aside>

        {error && (
          <p className="text-red-400 text-sm font-sans">{error}</p>
        )}
      </section>

      <section className="mt-12 flex justify-between items-center border-t border-white/15 pt-8">
        <div className="flex flex-col">
          <span className="text-[14px] font-normal">{isSaved ? 'Saved' : 'Save'}</span>
          <span className="text-[9px] uppercase tracking-[1px] text-on-surface-variant mt-1">Reflection</span>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving || isSaved || !reflection.trim()}
          className={`w-16 h-16 border rounded-full flex items-center justify-center transition-colors ${
            isSaved 
              ? 'bg-white text-black border-white' 
              : isSaving
                ? 'border-white/30 opacity-50 cursor-wait'
                : !reflection.trim()
                  ? 'border-white/15 opacity-30 cursor-not-allowed'
                  : 'border-white hover:bg-white hover:text-black cursor-pointer'
          }`}
        >
          {isSaving ? (
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            isSaved ? (
              <Check className="h-5 w-5" aria-hidden="true" />
            ) : (
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            )
          )}
        </button>
      </section>
    </main>
  );
}
