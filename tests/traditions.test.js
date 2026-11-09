import test from 'node:test';
import assert from 'node:assert/strict';
import { cultureQuestions, exerciseTranslations } from '../src/content/index.js';
import { traditionsQuestions } from '../src/content/traditions-extra.js';

test('traditions add forty distinct sourced bilingual questions to the active pool', () => {
  assert.ok(traditionsQuestions.length >= 40);
  assert.equal(new Set(cultureQuestions.map((item) => item.id)).size, cultureQuestions.length);
  assert.equal(new Set(cultureQuestions.map((item) => item.prompt)).size, cultureQuestions.length);
  for (const item of traditionsQuestions) {
    assert.ok(cultureQuestions.includes(item));
    assert.equal(item.topic, 'culture');
    assert.equal(item.level, 'choice');
    assert.ok(item.familyId);
    assert.equal(item.options.length, 5);
    assert.equal(new Set(item.options).size, 5);
    assert.equal(item.answers.length, 1);
    assert.ok(item.options.includes(item.answers[0]));
    assert.match(item.source, /^https:\/\//);
    assert.match(item.explanation, /[іїєґ]/i);
    assert.ok(exerciseTranslations.pl[item.id].explanation.length > 30);
  }
});
