import test from 'node:test';
import assert from 'node:assert/strict';
import {
  declensionExercises,
  exerciseTranslations,
  caseMatrix,
  grammarExercises,
} from '../src/content/index.js';

test('extra declension practice covers full choice, written and translation modes for every context', () => {
  assert.equal(declensionExercises.length, 388);
  for (const topic of [
    'mianownik',
    'dopelniacz',
    'celownik',
    'biernik',
    'narzednik',
    'miejscownik',
    'wolacz',
  ]) {
    const items = declensionExercises.filter((item) => item.topic === topic);
    assert.equal(items.length, topic === 'narzednik' ? 144 : 36, topic);
    assert.equal(
      new Set(items.map((item) => item.familyId)).size,
      topic === 'narzednik' ? 48 : 12,
      topic,
    );
    for (const familyId of new Set(items.map((item) => item.familyId))) {
      assert.deepEqual(
        items
          .filter((item) => item.familyId === familyId)
          .map((item) => item.level)
          .sort(),
        ['choice', 'sentence', 'write'],
      );
    }
  }
  for (const answer of [
    'miłej lekarce',
    'małemu zwierzęciu',
    'mojemu ojcu',
    'tę panią',
    'dobrzy ludzie',
  ]) {
    assert.ok(
      declensionExercises.some((item) => item.answers.includes(answer)),
      answer,
    );
  }
});

test('Narzędnik has at least fifty distinct exercises in each main answer mode', () => {
  for (const level of ['choice', 'write', 'sentence']) {
    const items = grammarExercises.filter(
      (item) => item.topic === 'narzednik' && item.level === level,
    );
    assert.ok(items.length >= 52, level);
    assert.equal(new Set(items.map((item) => item.familyId)).size, items.length, level);
    assert.equal(new Set(items.map((item) => item.prompt)).size, items.length, level);
  }
});

test('extra identification practice covers every case with explicit unambiguous targets', () => {
  const items = declensionExercises.filter((item) => item.level === 'identify');
  assert.equal(items.length, 28);
  for (const [name] of caseMatrix)
    assert.equal(items.filter((item) => item.answers[0] === name).length, 4, name);
  for (const item of declensionExercises) {
    assert.ok(item.familyId && item.explanation);
    assert.ok(exerciseTranslations.pl[item.id].explanation);
    if (item.level === 'identify') {
      assert.equal(item.prompt.split(item.targetWord).length, 2);
      assert.equal(item.options.length, 7);
    }
  }
});
