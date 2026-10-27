import { history } from '../karta.js';
import { normalize } from '../logic.js';

export function buildHistoryContexts(rows) {
  const translations = { pl: {} };
  const exercises = rows.flatMap((row) => {
    const source = history.find((entry) => entry.id === row.sourceEntryId);
    // The pre-existing Gniezno record has app text but no attached PDF excerpt.
    if (!(source?.original || source?.pl || '').includes(row.evidence)) {
      throw new Error(`Missing original history context evidence: ${row.slug}`);
    }
    const familyId = `history-context-${row.slug}`;
    const candidates = [row.options[0], ...(row.aliases ?? [])];
    const writtenAnswers = candidates.filter(
      (answer, index) =>
        candidates.findIndex((candidate) => normalize(candidate) === normalize(answer)) === index,
    );
    return ['choice', 'write'].map((level) => {
      const id = `${familyId}-${level}`;
      translations.pl[id] = { prompt: row.prompt.pl, explanation: row.explanation.pl };
      return {
        id,
        familyId,
        topic: 'history',
        historyTestType: 'context',
        historyCategory: source.category,
        sourceEntryId: source.id,
        historyDate: row.historyDate ?? source.year,
        originalEvidence: row.evidence,
        level,
        prompt: row.prompt.uk,
        answers: level === 'choice' ? [row.options[0]] : writtenAnswers,
        ...(level === 'choice' ? { options: [...row.options] } : {}),
        explanation: row.explanation.uk,
      };
    });
  });
  return { exercises, translations };
}
