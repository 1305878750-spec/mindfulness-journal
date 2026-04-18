import { useState, useEffect } from 'react';
import { getReflections, Reflection } from '../lib/api';

interface DayGroup {
  dateLabel: string;
  dayName: string;
  entries: Reflection[];
}

function groupByDay(reflections: Reflection[]): DayGroup[] {
  const groups: Record<string, DayGroup> = {};

  for (const r of reflections) {
    const date = new Date(r.created_at);
    const dateKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

    if (!groups[dateKey]) {
      groups[dateKey] = { dateLabel: dateKey, dayName, entries: [] };
    }
    groups[dateKey].entries.push(r);
  }

  return Object.values(groups);
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export default function History() {
  const [days, setDays] = useState<DayGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getReflections()
      .then((data) => {
        setDays(groupByDay(data));
      })
      .catch((err) => {
        setError(err.message || 'Failed to load reflections');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto w-full pb-32">
      <section className="mb-12 border-b border-white/15 pb-8">
        <p className="font-sans text-[11px] uppercase tracking-[3px] text-on-surface-variant mb-4">Archive</p>
        <h2 className="font-serif font-light italic text-[56px] md:text-[72px] leading-[0.95] tracking-[-2px] text-on-surface">History.</h2>
        <p className="text-on-surface-variant text-[14px] leading-[1.6] mt-6 max-w-md">A collection of your moments, preserved in time.</p>
      </section>

      {loading && (
        <div className="flex justify-center py-16">
          <span className="material-symbols-outlined text-3xl text-on-surface-variant animate-spin" data-icon="progress_activity">progress_activity</span>
        </div>
      )}

      {error && (
        <div className="text-center py-16">
          <p className="text-red-400 text-sm font-sans">{error}</p>
        </div>
      )}

      {!loading && !error && days.length === 0 && (
        <div className="text-center py-16">
          <p className="text-on-surface-variant font-serif italic text-lg">No reflections yet. Begin your stillness.</p>
        </div>
      )}

      <div className="space-y-12">
        {days.map((day) => (
          <article key={day.dateLabel} className="group cursor-pointer border border-white/15 p-6 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-baseline border-b border-white/15 pb-4">
                <h3 className="font-serif italic text-2xl text-primary">{day.dayName}</h3>
                <time className="font-sans text-[11px] uppercase tracking-[3px] text-on-surface-variant">{day.dateLabel}</time>
              </div>
              <div className="space-y-6">
                {day.entries.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-4">
                    <span className="font-sans text-[12px] font-semibold opacity-40 mt-1 w-12">{formatTime(entry.created_at)}</span>
                    <p className="font-serif italic text-lg leading-relaxed text-on-surface">{entry.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
