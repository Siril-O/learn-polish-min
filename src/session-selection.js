import { shuffle } from './logic.js';

export function selectSessionExercises(
  items,
  count,
  completed = [],
  catalog = items,
  random = Math.random,
) {
  const family = (item) => item.familyId ?? item.id;
  const catalogById = new Map(catalog.map((item) => [item.id, item]));
  const lastAttempt = new Map(completed.map((id, index) => [id, index]));
  const lastFamilyAttempt = new Map();
  completed.forEach((id, index) => {
    const item = catalogById.get(id);
    if (item) lastFamilyAttempt.set(family(item), index);
  });
  const groups = new Map();
  for (const item of shuffle(items, random)) {
    const key = family(item);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  // Select one variant per context, preferring its least recently answered format.
  const representatives = [...groups.values()].map(
    (members) =>
      [...members].sort((a, b) => (lastAttempt.get(a.id) ?? -1) - (lastAttempt.get(b.id) ?? -1))[0],
  );
  const topicCount = new Set(items.map((item) => item.topic)).size;
  const verbCount = new Set(items.map((item) => item.verbId).filter(Boolean)).size;
  const stratum = (item) =>
    topicCount === 1 && item.verbId ? (verbCount > 1 ? item.verbId : item.tense) : item.topic;
  const balanced = (pool) => {
    const buckets = new Map();
    for (const item of pool) {
      const key = stratum(item);
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(item);
    }
    const keys = shuffle([...buckets.keys()], random);
    const result = [];
    while (keys.some((key) => buckets.get(key).length)) {
      for (const key of keys) {
        const item = buckets.get(key).shift();
        if (item) result.push(item);
      }
    }
    return result;
  };
  const unseen = representatives.filter((item) => !lastFamilyAttempt.has(family(item)));
  const review = representatives
    .filter((item) => lastFamilyAttempt.has(family(item)))
    .sort((a, b) => lastFamilyAttempt.get(family(a)) - lastFamilyAttempt.get(family(b)));
  return [...balanced(unseen), ...balanced(review)].slice(
    0,
    Math.max(0, Math.floor(Number(count) || 0)),
  );
}
