export const STORAGE_KEY = 'polski-praktyka:v1';
export const defaults = (bundle) => ({
  version: 1,
  topic: bundle?.topics[0]?.id || 'byc',
  saved: [],
  known: [],
  mistakes: [],
  lastView: 'grammar',
});
export function normalize(value) {
  return String(value)
    .normalize('NFC')
    .toLocaleLowerCase('pl')
    .trim()
    .replace(/[.!?]+$/u, '')
    .trim()
    .replace(/\s+/gu, ' ');
}
export function checkAnswer(value, answers) {
  const clean = normalize(value);
  return answers.some((answer) => normalize(answer) === clean);
}
export function validateBackup(data, bundle) {
  if (!data || typeof data !== 'object' || Array.isArray(data) || data.version !== 1)
    throw new Error('Unsupported backup format');
  for (const key of ['saved', 'known', 'mistakes']) {
    if (
      !Array.isArray(data[key]) ||
      data[key].length > 10000 ||
      data[key].some((v) => typeof v !== 'string' || !v.length || v.length > 160)
    )
      throw new Error('Invalid learning data');
  }
  if (
    typeof data.topic !== 'string' ||
    !data.topic.length ||
    data.topic.length > 160 ||
    !['grammar', 'practice', 'karta', 'vocabulary', 'settings'].includes(data.lastView)
  )
    throw new Error('Invalid settings');
  const result = {
    version: 1,
    topic: data.topic,
    lastView: data.lastView,
    ...Object.fromEntries(['saved', 'known', 'mistakes'].map((k) => [k, [...new Set(data[k])]])),
  };
  if (bundle) {
    const words = new Set(bundle.vocabulary.map((w) => w.id));
    const exercises = new Set(bundle.allExercises.map((q) => q.id));
    result.topic = bundle.topics.some((t) => t.id === result.topic)
      ? result.topic
      : defaults(bundle).topic;
    result.saved = result.saved.filter((id) => words.has(id));
    result.known = result.known.filter((id) => words.has(id));
    result.mistakes = result.mistakes.filter((id) => exercises.has(id));
  }
  return result;
}
export function readState(storage, bundle) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw && raw.length > 2 * 1024 * 1024) throw new Error('Stored state exceeds size limit');
    return { state: raw ? validateBackup(JSON.parse(raw), bundle) : defaults(bundle), warning: '' };
  } catch {
    return {
      state: defaults(bundle),
      warning: 'Не вдалося прочитати збереження. Доступна нова сесія; перевірте резервну копію.',
    };
  }
}
export function advanceSession(session, index, correct) {
  if (!session || session.index !== index || index >= session.items.length) return session;
  return {
    ...session,
    index: index + 1,
    correct: session.correct + (correct ? 1 : 0),
    wrong: correct ? session.wrong : [...session.wrong, session.items[index]],
  };
}
export function toggle(list, id) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}
export function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
