import test from 'node:test';
import assert from 'node:assert/strict';
import { historyExercises, exerciseTranslations } from '../src/content/index.js';
import { history } from '../src/karta.js';
const historyContextExercises = historyExercises.filter(
  (item) => item.historyTestType === 'context',
);

test('context questions retain bilingual source evidence and five choices', () => {
  assert.ok(
    new Set(historyContextExercises.map((item) => item.familyId)).size >= history.length * 2,
  );
  for (const exercise of historyContextExercises) {
    const source = history.find((item) => item.id === exercise.sourceEntryId);
    assert.ok(exercise.originalEvidence.trim().length > 0);
    assert.ok((source.original || source.pl).includes(exercise.originalEvidence));
    assert.ok(exerciseTranslations.pl[exercise.id].prompt);
    assert.ok(exerciseTranslations.pl[exercise.id].explanation);
    assert.match(exercise.prompt, /[А-Яа-яІіЇїЄє]/u);
    assert.match(exercise.explanation, /[А-Яа-яІіЇїЄє]/u);
    assert.equal(exercise.historyTestType, 'context');
    if (exercise.level === 'choice') {
      assert.equal(new Set(exercise.options).size, 5);
      assert.ok(exercise.options.includes(exercise.answers[0]));
    }
  }
});

test('every dated record has at least two distinct context questions in both formats', () => {
  for (const entry of history) {
    for (const level of ['choice', 'write']) {
      const questions = historyContextExercises.filter(
        (item) => item.sourceEntryId === entry.id && item.level === level,
      );
      assert.ok(
        new Set(questions.map((item) => item.familyId)).size >= 2,
        `${entry.id}: fewer than two ${level} questions`,
      );
      const prompts = questions.map((item) =>
        exerciseTranslations.pl[item.id].prompt.trim().toLocaleLowerCase('pl'),
      );
      assert.equal(new Set(prompts).size, prompts.length, `${entry.id}: repeated prompt`);
    }
  }
});

test('context formats share a stable family and the same canonical answer', () => {
  const families = Map.groupBy(historyContextExercises, (item) => item.familyId);
  for (const [familyId, questions] of families) {
    assert.equal(questions.length, 2, `${familyId}: expected two formats`);
    assert.deepEqual(new Set(questions.map((item) => item.level)), new Set(['choice', 'write']));
    assert.equal(questions[0].answers[0], questions[1].answers[0]);
  }
});
import {
  historyYearRanges,
  matchesHistoryPractice,
  validHistoryRange,
} from '../src/history-practice.js';

test('history periods preserve explicit ranges and isolated years', () => {
  assert.deepEqual(historyYearRanges('1569-1795; 1918-1939; 1989'), [
    [1569, 1795],
    [1918, 1939],
    [1989, 1989],
  ]);
  assert.deepEqual(historyYearRanges('XVIII wiek'), [[1701, 1800]]);
  assert.deepEqual(historyYearRanges('15 sierpnia'), []);
});
test('history filters compose type and inclusive year bounds', () => {
  const records = [{ id: 'event', year: '966' }];
  const question = { familyId: 'event' };
  assert.equal(matchesHistoryPractice(question, records, 'dates', '966', '966'), true);
  assert.equal(matchesHistoryPractice(question, records, 'dates', '967', ''), false);
  assert.equal(matchesHistoryPractice(question, records, 'context'), false);
  assert.equal(
    matchesHistoryPractice(
      { ...question, historyTestType: 'context', sourceEntryId: 'event' },
      records,
      'context',
      '900',
      '1000',
    ),
    true,
  );
  assert.equal(
    matchesHistoryPractice(
      { historyDate: '15 sierpnia', sourceEntryId: 'event' },
      records,
      'dates',
      '900',
      '1000',
    ),
    false,
  );
  assert.equal(validHistoryRange('2000', '1000'), false);
  assert.equal(validHistoryRange('-1', ''), false);
  assert.equal(validHistoryRange('', ''), true);
});
