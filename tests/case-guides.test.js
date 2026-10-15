import test from 'node:test';
import assert from 'node:assert/strict';
import * as content from '../src/content/index.js';
import { validateContent } from '../src/content-contract.js';

const ids = [
  'mianownik',
  'dopelniacz',
  'celownik',
  'biernik',
  'narzednik',
  'miejscownik',
  'wolacz',
];

test('all cases have bilingual sourced question guides and analyzed examples', () => {
  assert.ok(content.caseGuides);
  for (const id of ids) {
    const guide = content.caseGuides[id];
    assert.ok(guide?.sources.length >= 2, id);
    for (const locale of ['pl', 'uk']) {
      assert.ok(guide[locale].nounQuestions && guide[locale].adjectiveQuestions, id);
      assert.ok(guide[locale].patterns.length >= 2, id);
      assert.ok(guide[locale].examples.length >= 3, id);
    }
  }
  assert.equal(validateContent(content), content);
});

test('guides teach vocative as address and distinguish context from endings', () => {
  assert.match(content.caseGuides.wolacz.pl.nounQuestions, /nie|brak/i);
  assert.doesNotMatch(content.caseGuides.wolacz.pl.nounQuestions, /kogo\?/i);
  assert.match(content.caseGuides.dopelniacz.pl.nounQuestions, /kogo\?.*czego\?/i);
  assert.match(content.caseGuides.biernik.pl.nounQuestions, /kogo\?.*co\?/i);
  assert.match(content.caseGuides.narzednik.pl.nounQuestions, /kim\?.*czym\?/i);
});

test('case guide validation rejects missing translations, unsafe sources, and invalid highlights', () => {
  const broken = structuredClone({ caseGuides: content.caseGuides });
  delete broken.caseGuides.celownik.uk;
  assert.throws(() => validateContent({ ...content, ...broken }), /case guide/i);
  const unsafe = structuredClone({ caseGuides: content.caseGuides });
  unsafe.caseGuides.biernik.sources[0].url = 'javascript:alert(1)';
  assert.throws(() => validateContent({ ...content, ...unsafe }), /case guide/i);
  const mismatch = structuredClone({ caseGuides: content.caseGuides });
  mismatch.caseGuides.mianownik.pl.examples[0].target = 'nonexistent';
  assert.throws(() => validateContent({ ...content, ...mismatch }), /case guide/i);
});
