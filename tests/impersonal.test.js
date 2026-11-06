import test from 'node:test';
import assert from 'node:assert/strict';
import { impersonalExercises, impersonalTopic } from '../src/content/impersonal.js';
import {
  grammarExercises,
  lessonTranslations,
  exerciseTranslations,
} from '../src/content/index.js';

test('impersonal practice covers all tenses with twenty verbs and two answer modes', () => {
  for (const tense of ['present', 'past', 'future']) {
    for (const level of ['choice', 'write']) {
      assert.equal(
        impersonalExercises.filter(
          (item) => item.construction === 'sie' && item.tense === tense && item.level === level,
        ).length,
        20,
      );
    }
  }
  for (const level of ['choice', 'write']) {
    assert.equal(
      impersonalExercises.filter((item) => item.construction === 'no-to' && item.level === level)
        .length,
      20,
    );
  }
  for (const item of impersonalExercises) {
    assert.ok(grammarExercises.includes(item));
    assert.ok(exerciseTranslations.pl[item.id].explanation);
    if (item.level === 'choice') {
      assert.equal(new Set(item.options).size, 5);
      assert.equal(item.options.filter((option) => item.answers.includes(option)).length, 1);
    }
    if (item.construction === 'no-to') assert.equal(item.tense, 'past');
  }
});

test('impersonal written answers accept both future constructions and irregular forms', () => {
  const find = (id) => impersonalExercises.find((item) => item.id === `impersonal-${id}-write`);
  assert.ok(find('eat-future').answers.includes('będzie się jadło'));
  assert.ok(find('eat-future').answers.includes('będzie się jeść'));
  assert.equal(find('eat-past').answers[0], 'jadło się');
  assert.equal(find('drink-no-to').answers[0], 'pito');
  assert.equal(find('wash-no-to').answers[0], 'myto');
  assert.equal(find('ought-past').answers[0], 'należało');
  assert.ok(find('possible-past').answers.includes('było można'));
});

test('impersonal lesson provides bilingual tables and source links', () => {
  const polish = lessonTranslations.pl.impersonal;
  assert.equal(polish.table.length, impersonalTopic.table.length);
  assert.equal(polish.columns.length, 4);
  assert.ok(impersonalTopic.sources.every((source) => source.url.startsWith('https://')));
  assert.ok(polish.rules.some((rule) => rule.includes('dokonany')));
});
