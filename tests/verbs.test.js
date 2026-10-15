import test from 'node:test';
import assert from 'node:assert/strict';
import * as content from '../src/content/index.js';
import { checkAnswer } from '../src/logic.js';

test('twenty verbs include complete present, past, and future reference forms', () => {
  assert.equal(content.verbs.length, 20);
  assert.equal(new Set(content.verbs.map((verb) => verb.id)).size, 20);
  for (const verb of content.verbs) {
    for (const forms of [verb.present, verb.future, verb.past.masculine, verb.past.feminine]) {
      assert.equal(forms.length, 6, verb.id);
      assert.ok(
        forms.every((form) => typeof form === 'string' && form.trim()),
        verb.id,
      );
    }
    assert.ok(verb.past.neuter);
    for (const language of ['pl', 'uk'])
      assert.ok(verb.aspect.note[language] && verb.notes[language]);
  }
});

test('irregular, reflexive and motion forms are not inferred from a regular stem', () => {
  const find = (infinitive) => content.verbs.find((verb) => verb.infinitive === infinitive);
  assert.equal(find('być').future[0], 'będę');
  assert.equal(find('być').future[5], 'będą');
  assert.equal(find('iść').past.masculine[0], 'szedłem');
  assert.equal(find('iść').past.feminine[0], 'szłam');
  assert.equal(find('iść').past.masculine[3], 'szliśmy');
  assert.equal(find('iść').past.feminine[3], 'szłyśmy');
  assert.equal(find('jechać').present[0], 'jadę');
  assert.equal(find('jeździć').present[0], 'jeżdżę');
  assert.equal(find('jeść').present[2], 'je');
  assert.equal(find('rozumieć').present[5], 'rozumieją');
  assert.equal(find('uczyć się').past.feminine[0], 'uczyłam się');
  assert.equal(find('uczyć się').future[0], 'będę uczyć się');
  assert.equal(find('być').aspect.partner, null);
  assert.equal(find('mieć').aspect.partner, null);
});

test('every verb has practice coverage for all three tenses and both supported levels', () => {
  const exercises = content.grammarExercises.filter((item) => item.topic === 'verb-tables');
  for (const verb of content.verbs) {
    for (const tense of ['present', 'past', 'future'])
      for (const level of ['choice', 'write']) {
        const candidates = exercises.filter(
          (item) => item.verbId === verb.id && item.tense === tense && item.level === level,
        );
        assert.ok(candidates.length > 0, `${verb.id}: ${tense}/${level}`);
        for (const item of candidates) {
          const canonical =
            tense === 'past'
              ? verb.past[item.gender][item.personIndex]
              : verb[tense][item.personIndex];
          assert.ok(checkAnswer(canonical, item.answers), item.id);
          assert.ok(content.exerciseTranslations.pl[item.id]?.explanation, item.id);
        }
      }
  }
});

test('written compound futures accept both infinitive and correctly agreeing participles', () => {
  const verb = content.verbs.find((item) => item.infinitive === 'czytać');
  const exercise = content.grammarExercises.find(
    (item) =>
      item.verbId === verb.id &&
      item.tense === 'future' &&
      item.personIndex === 0 &&
      item.level === 'write',
  );
  for (const answer of ['będę czytać', 'będę czytał', 'będę czytała'])
    assert.ok(checkAnswer(answer, exercise.answers), answer);
  assert.ok(!checkAnswer('będzie czytać', exercise.answers));
});
