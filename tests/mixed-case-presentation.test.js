import test from 'node:test';
import assert from 'node:assert/strict';
import { isMixedCaseSession, withoutCaseHints } from '../src/mixed-case-presentation.js';
import { topics, grammarExercises, exerciseTranslations } from '../src/content/index.js';

test('mixed case detection follows the actual session, including mistake reviews', () => {
  assert.equal(isMixedCaseSession([{ topic: 'biernik' }, { topic: 'celownik' }], topics), true);
  assert.equal(isMixedCaseSession([{ topic: 'biernik' }, { topic: 'biernik' }], topics), false);
  assert.equal(isMixedCaseSession([{ topic: 'biernik' }, { topic: 'present' }], topics), false);
  assert.equal(isMixedCaseSession([], topics), false);
});

test('case labels are removed from cues without removing lemmas, number or sentence text', () => {
  assert.equal(withoutCaseHints('___, chodź tutaj! (mama, wołacz)'), '___, chodź tutaj! (mama)');
  assert.equal(
    withoutCaseHints('To są ___. (dziecko, mianownik liczby mnogiej)'),
    'To są ___. (dziecko, liczby mnogiej)',
  );
  assert.equal(withoutCaseHints('___? (biernik)'), '___?');
  assert.equal(
    withoutCaseHints('Rozmawiamy o bierniku. (przypadek)'),
    'Rozmawiamy o bierniku. (przypadek)',
  );
  for (const item of grammarExercises) {
    const prompt = exerciseTranslations.pl[item.id]?.prompt || item.prompt;
    for (const hint of withoutCaseHints(prompt).match(/\([^()]*\)/gu) || [])
      assert.doesNotMatch(
        hint,
        /mianownik|dopełniacz|celownik|biernik|narzędnik|miejscownik|wołacz/iu,
        item.id,
      );
  }
});
