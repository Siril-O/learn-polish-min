import { buildHistoryContexts } from './history-context-builder.js';
import { historyContextEarlyRows } from './history-context-early.js';
import { historyContextMiddleRows } from './history-context-middle.js';
import { historyContextLateRows } from './history-context-late.js';

const expansion = buildHistoryContexts([
  ...historyContextEarlyRows,
  ...historyContextMiddleRows,
  ...historyContextLateRows,
]);

export const expandedHistoryContextExercises = expansion.exercises;
export const expandedHistoryContextTranslations = expansion.translations;
