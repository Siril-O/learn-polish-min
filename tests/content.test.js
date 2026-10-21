import test from 'node:test';
import assert from 'node:assert/strict';
import * as content from '../src/content/index.js';
import { historyOriginals } from '../src/content/history-complete.js';

const normalize = (value) =>
  value
    .normalize('NFC')
    .toLocaleLowerCase('pl')
    .trim()
    .replace(/[.!?]+$/u, '')
    .replace(/\s+/gu, ' ');
const unique = (values) => assert.equal(new Set(values).size, values.length);

test('the entry point preserves collections and centralizes every exercise', () => {
  assert.equal(content.contentVersion, 1);
  assert.equal(content.topics.length, 19);
  assert.equal(content.history.filter((entry) => entry.category === 'chronology').length, 54);
  assert.equal(content.vocabulary.length, 158);
  assert.deepEqual(content.allExercises, [
    ...content.grammarExercises,
    ...content.historyExercises,
    ...content.cultureQuestions,
    ...content.wordExercises,
  ]);
  for (const collection of [
    content.topics,
    content.history,
    content.interview,
    content.vocabulary,
    content.allExercises,
  ]) {
    assert.ok(collection.length);
    unique(collection.map((item) => item.id));
  }
  unique(
    [
      content.topics,
      content.history,
      content.interview,
      content.vocabulary,
      content.allExercises,
    ].flatMap((collection) => collection.map((item) => item.id)),
  );
});

test('exercise references and normalized choice answers are consistent', () => {
  const topicIds = new Set([
    ...content.topics.map((topic) => topic.id),
    'history',
    'culture',
    'vocabulary',
  ]);
  for (const exercise of content.allExercises) {
    assert.ok(topicIds.has(exercise.topic), exercise.id);
    assert.ok(
      ['choice', 'write', 'sentence', 'event', 'identify'].includes(exercise.level),
      exercise.id,
    );
    assert.ok(exercise.prompt.trim() && exercise.explanation.trim(), exercise.id);
    assert.ok(
      exercise.answers.length && exercise.answers.every((answer) => answer.trim()),
      exercise.id,
    );
    unique(exercise.answers.map(normalize));
    if (['choice', 'event', 'identify'].includes(exercise.level)) {
      assert.ok(exercise.options.length >= 2, exercise.id);
      unique(exercise.options.map(normalize));
      assert.equal(
        exercise.options.filter((option) =>
          exercise.answers.some((answer) => normalize(answer) === normalize(option)),
        ).length,
        1,
        exercise.id,
      );
    } else {
      assert.equal(exercise.options, undefined, exercise.id);
    }
  }
});

test('case identification covers all seven cases and disambiguates matching forms', () => {
  const exercises = content.grammarExercises.filter((q) => q.level === 'identify');
  assert.equal(new Set(exercises.map((q) => q.answers[0])).size, 7);
  for (const q of exercises) {
    assert.equal(q.prompt.split(q.targetWord).length, 2);
    assert.equal(q.options.length, 7);
  }
  const genitive = exercises.find((q) => q.prompt === 'Szukam brata.');
  const accusative = exercises.find((q) => q.prompt === 'Widzę brata.');
  assert.equal(genitive.targetWord, accusative.targetWord);
  assert.notEqual(genitive.answers[0], accusative.answers[0]);
});

test('grammar tables and topic coverage follow the contract', () => {
  for (const topic of content.topics) {
    assert.ok(topic.table.length && topic.columns.length, topic.id);
    for (const row of topic.table) {
      assert.equal(row.length, topic.columns.length, topic.id);
      assert.ok(
        row.every((cell) => typeof cell === 'string'),
        topic.id,
      );
    }
    for (const level of topic.exerciseLevels ?? ['choice', 'write', 'sentence']) {
      assert.ok(
        content.grammarExercises.some(
          (exercise) => exercise.topic === topic.id && exercise.level === level,
        ),
        `${topic.id}: ${level}`,
      );
    }
  }
  for (const row of content.caseMatrix) assert.equal(row.length, 5);
});

test('vocabulary exercises have explicit references and unambiguous distractors', () => {
  const words = new Map(content.vocabulary.map((word) => [word.id, word]));
  unique(content.vocabulary.map((word) => normalize(word.base)));
  unique(content.vocabulary.map((word) => normalize(word.uk)));
  for (const exercise of content.wordExercises) {
    const word = words.get(exercise.wordId);
    assert.ok(word, exercise.id);
    assert.equal(exercise.topic, 'vocabulary');
    assert.equal(exercise.prompt, word.uk);
    assert.deepEqual(exercise.answers, [word.base]);
    for (const option of exercise.options ?? []) {
      if (option === word.base) continue;
      const candidates = content.vocabulary.filter((candidate) => candidate.base === option);
      assert.ok(candidates.length, exercise.id);
      assert.ok(
        candidates.every((candidate) => candidate.kind !== word.kind),
        exercise.id,
      );
    }
  }
  for (const word of words.values()) {
    for (const level of ['choice', 'write']) {
      assert.equal(
        content.wordExercises.filter(
          (exercise) => exercise.wordId === word.id && exercise.level === level,
        ).length,
        1,
        word.id,
      );
    }
  }
});

test('history practice uses corrected facts while retaining the original archive', () => {
  for (const entry of content.history) {
    assert.equal(
      entry.original,
      entry.originalKey
        ? historyOriginals[entry.originalKey]
        : entry.sourceDocument
          ? entry.original
          : '',
    );
    assert.equal(new URL(entry.source).protocol, 'https:');
    const exercises = content.historyExercises.filter((exercise) =>
      ['year', 'write', 'event'].some((suffix) => exercise.id === `${entry.id}-${suffix}`),
    );
    assert.deepEqual(
      exercises.map((exercise) => exercise.level),
      ['choice', 'write', 'event'],
    );
    assert.deepEqual(exercises[0].answers, [entry.year]);
    assert.ok(exercises[1].answers.includes(entry.year));
    assert.deepEqual(exercises[2].answers, [entry.title]);
    assert.equal(exercises[0].explanation, `${entry.pl} ${entry.uk}`);
    assert.equal(exercises[1].explanation, `${entry.pl} ${entry.uk}`);
    assert.equal(exercises[2].explanation, entry.uk);
  }
  assert.equal(
    content.history.find((entry) => entry.year === '1683').source,
    'https://orka.sejm.gov.pl/proc7.nsf/uchwaly/1132_u.htm',
  );
  assert.equal(
    content.history.find((entry) => entry.year === '1978').source,
    'https://www.gov.pl/web/uw-mazowiecki/dzien-papieza-jana-pawla-ii',
  );
  assert.equal(content.history.find((entry) => entry.year === '1978').date, '16 października 1978');
  assert.equal(content.history.find((entry) => entry.year === '1999').date, '12 marca 1999');
  for (const [label, url] of content.sources) {
    assert.ok(label.trim());
    assert.equal(new URL(url).protocol, 'https:');
  }
});

test('the shared logic validator accepts the exported bundle when available', async (t) => {
  const validatorUrl = new URL('../src/content-contract.js', import.meta.url);
  let validateContent;
  try {
    ({ validateContent } = await import(validatorUrl.href));
  } catch (error) {
    if (error.code !== 'ERR_MODULE_NOT_FOUND' || error.url !== validatorUrl.href) throw error;
    t.skip('The logic worker has not supplied src/content-contract.js yet.');
    return;
  }
  assert.equal(validateContent(content), content);
});
