import test from 'node:test';
import assert from 'node:assert/strict';
import { wikibooksContexts, wikibooksExercises } from '../src/content/wikibooks-practice.js';
import { allExercises, exerciseTranslations } from '../src/content/index.js';
import { normalize } from '../src/logic.js';

test('thirty source examples produce ninety attributed exercises in the active catalog', () => {
  assert.equal(wikibooksContexts.length, 30);
  assert.equal(wikibooksExercises.length, 90);
  assert.equal(new Set(wikibooksExercises.map((item) => item.familyId)).size, 30);
  for (const exercise of wikibooksExercises) {
    assert.ok(allExercises.includes(exercise), exercise.id);
    assert.ok(exercise.attribution.url.includes('oldid='), exercise.id);
    assert.ok(exercise.attribution.authorsUrl.includes('action=history'), exercise.id);
    assert.equal(exercise.attribution.license, 'CC BY-SA 4.0');
    assert.ok(exerciseTranslations.pl[exercise.id]?.explanation, exercise.id);
  }
});

test('adapted gaps reconstruct the completed examples and offer five unique forms', () => {
  for (const [, , slug, prompt, options, sentence] of wikibooksContexts) {
    assert.equal(options.length, 5, slug);
    assert.equal(new Set(options.map(normalize)).size, 5, slug);
    const filled = prompt.replace(/\s*\([^()]*\)\s*$/u, '').replace('___', options[0]);
    assert.equal(normalize(filled), normalize(sentence), slug);
  }
});
