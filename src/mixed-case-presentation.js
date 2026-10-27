const caseNames = /\b(?:mianownik|dopełniacz|celownik|biernik|narzędnik|miejscownik|wołacz)\b/giu;

export function isMixedCaseSession(items, topics) {
  const caseTopics = new Set(
    topics.filter((topic) => topic.group === 'Відмінки').map((topic) => topic.id),
  );
  return (
    new Set(items.filter((item) => caseTopics.has(item.topic)).map((item) => item.topic)).size > 1
  );
}

export function withoutCaseHints(prompt) {
  return prompt
    .replace(/\(([^()]*)\)/gu, (_, hint) => {
      const remaining = hint
        .replace(caseNames, '')
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
        .join(', ');
      return remaining ? `(${remaining})` : '';
    })
    .trim();
}
