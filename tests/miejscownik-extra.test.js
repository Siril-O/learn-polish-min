import test from 'node:test';
import assert from 'node:assert/strict';
import { grammarExercises } from '../src/content/index.js';
import { normalize } from '../src/logic.js';
import { selectSessionExercises } from '../src/session-selection.js';

test('Miejscownik offers one hundred distinct contexts in every main answer mode', () => {
  const catalog = grammarExercises.filter((item) => item.topic === 'miejscownik');
  for (const level of ['choice', 'write', 'sentence']) {
    const pool = catalog.filter((item) => item.level === level);
    assert.equal(pool.length, 100, level);
    assert.equal(new Set(pool.map((item) => item.familyId)).size, 100, level);
    assert.equal(new Set(pool.map((item) => normalize(item.prompt))).size, 100, level);
    if (level === 'sentence')
      assert.equal(new Set(pool.map((item) => normalize(item.answers[0]))).size, 100);
    const selected = selectSessionExercises(pool, 50, [], catalog, () => 0.42);
    const next = selectSessionExercises(
      pool,
      50,
      selected.map((item) => item.id),
      catalog,
      () => 0.42,
    );
    assert.equal(selected.length, 50);
    assert.equal(next.length, 50);
    const seen = new Set(selected.map((item) => item.familyId));
    assert.ok(
      next.every((item) => !seen.has(item.familyId)),
      level,
    );
  }
});
