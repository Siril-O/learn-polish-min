import test from 'node:test';
import assert from 'node:assert/strict';
import {
  allExercises,
  historyExercises,
  history,
  exerciseTranslations,
} from '../src/content/index.js';
import { extraHistoryExercises } from '../src/content/history-practice-extra.js';

function assertMinimum(items, groupKey) {
  const groups = new Map();
  for (const exercise of items) {
    const key = `${groupKey(exercise)}/${exercise.level}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(exercise);
  }
  for (const [key, pool] of groups) {
    assert.ok(
      new Set(pool.map((item) => item.familyId)).size >= 20,
      `${key}: fewer than 20 contexts`,
    );
    assert.ok(new Set(pool.map((item) => item.prompt)).size >= 20, `${key}: fewer than 20 prompts`);
  }
}

test('every available topic and answer mode offers at least twenty distinct questions', () => {
  assertMinimum(allExercises, (exercise) => exercise.topic);
});

test('every history subsection offers at least twenty distinct questions in every mode', () => {
  assertMinimum(historyExercises, (exercise) => exercise.historyCategory);
});

test('additional historical details retain original evidence and direct bilingual explanations', () => {
  for (const exercise of extraHistoryExercises) {
    const source = history.find((entry) => entry.id === exercise.sourceEntryId);
    assert.ok(source?.original.includes(exercise.originalEvidence), exercise.id);
    const polish = exerciseTranslations.pl[exercise.id].explanation;
    assert.doesNotMatch(
      polish,
      /(?:dokument|notatka|opis)\s+(?:podaje|datuje|wskazuje|określa|łączy|umieszcza)|według dokumentu/iu,
      exercise.id,
    );
    assert.doesNotMatch(
      exercise.explanation,
      /документ (?:подає|датує|визначає|пов’язує|розміщує)/iu,
      exercise.id,
    );
  }
});
