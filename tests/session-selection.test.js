import test from 'node:test';
import assert from 'node:assert/strict';
import { selectSessionExercises } from '../src/session-selection.js';
import { defaults, validateBackup, recordCompleted } from '../src/logic.js';
import { allExercises } from '../src/content/index.js';

const exercise = (id, topic = 'case', familyId = id, extra = {}) => ({
  id,
  topic,
  familyId,
  ...extra,
});
const random = () => 0.42;

test('production exercises have explicit stable IDs and context families', () => {
  for (const item of allExercises) {
    assert.ok(typeof item.id === 'string' && item.id.length, item.id);
    assert.ok(typeof item.familyId === 'string' && item.familyId.length, item.id);
  }
  assert.equal(new Set(allExercises.map((item) => item.id)).size, allExercises.length);
});

test('unseen contexts fill sessions before any answered context is repeated', () => {
  const items = Array.from({ length: 12 }, (_, i) => exercise(`q-${i}`));
  const completed = items.slice(0, 4).map((item) => item.id);
  const session = selectSessionExercises(items, 5, completed, items, random);
  assert.equal(session.length, 5);
  assert.ok(session.every((item) => !completed.includes(item.id)));
});

test('answering one format marks its family seen when selecting another format', () => {
  const choice = exercise('seen-choice', 'case', 'seen');
  const write = exercise('seen-write', 'case', 'seen');
  const fresh = exercise('fresh-write');
  assert.deepEqual(
    selectSessionExercises([write, fresh], 1, [choice.id], [choice, write, fresh], random),
    [fresh],
  );
});

test('review returns least recently attempted contexts and completion updates their order', () => {
  const items = ['a', 'b', 'c'].map((id) => exercise(id));
  assert.equal(selectSessionExercises(items, 1, ['a', 'b', 'c'], items, random)[0].id, 'a');
  assert.deepEqual(recordCompleted(['a', 'b', 'c'], 'a'), ['b', 'c', 'a']);
  assert.equal(selectSessionExercises(items, 1, ['b', 'c', 'a'], items, random)[0].id, 'b');
});

test('a session contains one format per context and prefers unanswered variants during review', () => {
  const items = [
    exercise('a-choice', 'case', 'a'),
    exercise('a-write', 'case', 'a'),
    exercise('b'),
  ];
  const session = selectSessionExercises(items, 10, ['a-choice'], items, random);
  assert.equal(session.length, 2);
  assert.equal(new Set(session.map((item) => item.familyId)).size, session.length);
  assert.ok(session.some((item) => item.id === 'a-write'));
});

test('mixed sessions balance topics instead of favoring the largest topic', () => {
  const items = [
    ...Array.from({ length: 20 }, (_, i) => exercise(`a-${i}`, 'large')),
    ...Array.from({ length: 2 }, (_, i) => exercise(`b-${i}`, 'small')),
  ];
  const session = selectSessionExercises(items, 4, [], items, random);
  assert.equal(session.filter((item) => item.topic === 'large').length, 2);
  assert.equal(session.filter((item) => item.topic === 'small').length, 2);
});

test('verb-only sessions spread practice across different verbs', () => {
  const items = ['a', 'b', 'c'].flatMap((verbId) =>
    [0, 1, 2].map((person) =>
      exercise(`${verbId}-${person}`, 'verb-tables', `${verbId}-${person}`, {
        verbId,
        tense: 'present',
      }),
    ),
  );
  assert.equal(
    new Set(selectSessionExercises(items, 3, [], items, random).map((item) => item.verbId)).size,
    3,
  );
});

test('selection handles empty pools and does not mutate source data or completed IDs', () => {
  const items = [exercise('a'), exercise('b')];
  const completed = ['a'];
  const before = structuredClone({ items, completed });
  assert.deepEqual(selectSessionExercises([], 10), []);
  assert.deepEqual(selectSessionExercises(items, 0), []);
  selectSessionExercises(items, 10, completed, items, random);
  assert.deepEqual({ items, completed }, before);
});

test('old backups migrate without losing state and completed IDs are validated and pruned', () => {
  const old = { ...defaults(), saved: ['word'], mistakes: ['a'] };
  delete old.completed;
  const bundle = {
    topics: [{ id: 'byc' }],
    vocabulary: [{ id: 'word' }],
    allExercises: [exercise('a'), exercise('b')],
  };
  assert.deepEqual(validateBackup(old, bundle).completed, []);
  assert.deepEqual(
    validateBackup({ ...old, completed: ['a', 'a', 'removed', 'b'] }, bundle).completed,
    ['a', 'b'],
  );
  for (const completed of [null, 'a', [1], Array(10001).fill('a')])
    assert.throws(() => validateBackup({ ...old, completed }, bundle));
});
