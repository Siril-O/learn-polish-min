import test from 'node:test';
import assert from 'node:assert/strict';
import { allExercises } from '../src/content/index.js';
import { normalize } from '../src/logic.js';

test('multiple-choice exercises have at least five distinct options except focused spelling pairs', () => {
  for (const exercise of allExercises.filter((item) => item.options)) {
    const options = exercise.options.map(normalize);
    assert.equal(new Set(options).size, options.length, exercise.id);
    assert.ok(options.length >= (exercise.topic === 'spelling' ? 2 : 5), exercise.id);
    const correct = options.filter((option) =>
      exercise.answers.some((answer) => normalize(answer) === option),
    );
    assert.equal(correct.length, 1, exercise.id);
  }
});
