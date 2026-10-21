import test from 'node:test';
import assert from 'node:assert/strict';
import { basicContexts, basicExercises } from '../src/content/basic-practice.js';
import { grammarExercises, exerciseTranslations } from '../src/content/index.js';
import { normalize } from '../src/logic.js';
import { selectSessionExercises } from '../src/session-selection.js';

test('each previously small grammar topic has thirty distinct contexts in every answer mode', () => {
  assert.equal(Object.keys(basicContexts).length, 9);
  assert.equal(basicExercises.length, 702);
  for (const topic of Object.keys(basicContexts)) {
    const exercises = grammarExercises.filter((item) => item.topic === topic);
    assert.equal(new Set(exercises.map((item) => item.familyId)).size, 30, topic);
    for (const level of ['choice', 'write', 'sentence']) {
      const pool = exercises.filter((item) => item.level === level);
      assert.equal(pool.length, 30, `${topic}/${level}`);
      assert.equal(
        new Set(pool.map((item) => normalize(item.prompt))).size,
        30,
        `${topic}/${level}`,
      );
      const session = selectSessionExercises(pool, 20, [], exercises, () => 0.5);
      assert.equal(session.length, 20);
      assert.equal(new Set(session.map((item) => item.familyId)).size, 20);
    }
  }
});

test('new contexts have aligned answers, complete translations and five unique choice options', () => {
  for (const [topic, rows] of Object.entries(basicContexts)) {
    for (const [slug, prompt, options, sentence, ukrainian, rulePl, ruleUk] of rows) {
      const id = `basic-${topic}-${slug}`;
      assert.equal(options.length, 5, id);
      assert.equal(new Set(options.map(normalize)).size, 5, id);
      assert.equal((prompt.match(/___/gu) || []).length, 1, id);
      const filled = prompt.replace(/\s*\([^()]*\)\s*$/u, '').replace('___', options[0]);
      assert.equal(normalize(filled), normalize(sentence), id);
      assert.match(ukrainian + ruleUk, /[\u0400-\u04ff]/u, id);
      assert.doesNotMatch(rulePl, /[\u0400-\u04ff]/u, id);
      for (const level of ['choice', 'write', 'sentence']) {
        const exercise = basicExercises.find((item) => item.id === `${id}-${level}`);
        assert.ok(exercise, id);
        assert.ok(exerciseTranslations.pl[exercise.id]?.explanation, id);
      }
    }
  }
});
