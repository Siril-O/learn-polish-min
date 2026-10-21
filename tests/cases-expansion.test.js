import test from 'node:test';
import assert from 'node:assert/strict';
import { expandedCaseContexts, expandedCaseExercises } from '../src/content/cases-expansion.js';
import { grammarExercises, exerciseTranslations } from '../src/content/index.js';
import { normalize } from '../src/logic.js';
import { selectSessionExercises } from '../src/session-selection.js';

test('all seven cases offer at least fifty unique contexts in each main answer mode', () => {
  for (const topic of [
    'mianownik',
    'dopelniacz',
    'celownik',
    'biernik',
    'narzednik',
    'miejscownik',
    'wolacz',
  ]) {
    const catalog = grammarExercises.filter((item) => item.topic === topic);
    for (const level of ['choice', 'write', 'sentence']) {
      const pool = catalog.filter((item) => item.level === level);
      assert.ok(new Set(pool.map((item) => item.familyId)).size >= 50, `${topic}/${level}`);
      assert.equal(
        new Set(pool.map((item) => normalize(item.prompt))).size,
        pool.length,
        `${topic}/${level}`,
      );
      if (level === 'sentence')
        assert.ok(new Set(pool.map((item) => normalize(item.answers[0]))).size >= 50, topic);
      const selected = selectSessionExercises(pool, 50, [], catalog, () => 0.42);
      assert.equal(selected.length, 50);
      assert.equal(new Set(selected.map((item) => item.familyId)).size, 50);
    }
  }
});

test('new case contexts align gap answers and contain bilingual teaching content', () => {
  assert.equal(expandedCaseExercises.length, 519);
  for (const [topic, rows] of Object.entries(expandedCaseContexts)) {
    for (const [slug, prompt, options, sentence, ukrainian, rulePl, ruleUk] of rows) {
      const id = `cases-expanded-${topic}-${slug}`;
      assert.equal((prompt.match(/___/gu) || []).length, 1, id);
      assert.equal(options.length, 5, id);
      assert.equal(new Set(options.map(normalize)).size, 5, id);
      assert.equal(
        normalize(prompt.replace(/\s*\([^()]*\)\s*$/u, '').replace('___', options[0])),
        normalize(sentence),
        id,
      );
      assert.match(ukrainian, /[\u0400-\u04ff]/u, id);
      assert.match(ruleUk, /[\u0400-\u04ff]/u, id);
      assert.doesNotMatch(rulePl, /[\u0400-\u04ff]/u, id);
      for (const level of ['choice', 'write', 'sentence'])
        assert.ok(exerciseTranslations.pl[`${id}-${level}`]?.explanation, id);
    }
  }
});
