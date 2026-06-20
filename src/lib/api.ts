export interface Reflection {
  id: string;
  type: 'morning' | 'evening';
  content: string;
  created_at: string;
}

const STORAGE_KEY = 'ae_reflections';

function readStoredReflections(): Reflection[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const reflections = JSON.parse(raw);
    return Array.isArray(reflections) ? reflections : [];
  } catch {
    return [];
  }
}

function writeStoredReflections(reflections: Reflection[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reflections));
}

export async function saveReflection(
  type: 'morning' | 'evening',
  content: string
): Promise<Reflection> {
  const reflection: Reflection = {
    id: crypto.randomUUID(),
    type,
    content,
    created_at: new Date().toISOString(),
  };
  writeStoredReflections([reflection, ...readStoredReflections()]);
  return reflection;
}

export async function getReflections(): Promise<Reflection[]> {
  return readStoredReflections().sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}
