import test from 'node:test';
import assert from 'node:assert/strict';
import { spellingItems, spellingExercises } from '../src/content/spelling.js';
import { checkAnswer } from '../src/logic.js';

test('spelling gaps reconstruct authored sentences and cover both practice levels', () => {
  assert.equal(spellingExercises.length, 76);
  for (const [id, , sentence, gap, answer, distractor] of spellingItems) {
    assert.equal(gap.replace('_', answer).toLowerCase(), sentence.toLowerCase());
    for (const level of ['choice', 'write']) {
      const exercise = spellingExercises.find((item) => item.id === `spelling-${id}-${level}`);
      assert.ok(exercise);
      assert.ok(checkAnswer(answer, exercise.answers));
      assert.ok(!checkAnswer(distractor, exercise.answers));
    }
  }
});
