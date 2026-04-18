const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const API_BASE = `${API_URL}/api`;

export interface Reflection {
  id: string;
  type: 'morning' | 'evening';
  content: string;
  created_at: string;
}

export async function saveReflection(
  type: 'morning' | 'evening',
  content: string
): Promise<Reflection> {
  const res = await fetch(`${API_BASE}/reflections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, content }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Network error' }));
    throw new Error(err.error || 'Failed to save reflection');
  }

  return res.json();
}

export async function getReflections(): Promise<Reflection[]> {
  const res = await fetch(`${API_BASE}/reflections`);

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Network error' }));
    throw new Error(err.error || 'Failed to load reflections');
  }

  return res.json();
}
