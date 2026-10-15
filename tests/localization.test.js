import test from 'node:test';
import assert from 'node:assert/strict';
import * as content from '../src/content/index.js';
import { validateContent } from '../src/content-contract.js';
import {
  localizeLesson,
  localizeExercise,
  localizeInterview,
  localizeHistory,
  localizeSource,
} from '../src/content-localization.js';

const cyrillic = /[\u0400-\u04ff]/u;

test('every lesson has complete Polish teaching text and unchanged Ukrainian originals', () => {
  for (const topic of content.topics) {
    const translated = content.lessonTranslations.pl[topic.id];
    assert.ok(translated, topic.id);
    for (const key of ['subtitle', 'rules', 'columns', 'table', 'warning']) {
      assert.ok(translated[key], `${topic.id}: ${key}`);
      assert.ok(
        !cyrillic.test(JSON.stringify(translated[key])),
        `${topic.id}: ${key} contains untranslated content`,
      );
    }
    assert.equal(translated.table.length, topic.table.length);
    assert.ok(translated.table.every((row) => row.length === translated.columns.length));
    assert.deepEqual(localizeLesson(topic, 'uk', content), topic);
    assert.equal(localizeLesson(topic, 'pl', content).id, topic.id);
    assert.equal(translated.ruleImages?.length ?? 0, topic.ruleImages?.length ?? 0);
    for (const image of translated.ruleImages ?? []) {
      assert.ok(!cyrillic.test(image.caption + image.alt));
      assert.ok(topic.ruleImages.some((original) => original.path === image.path));
    }
  }
});

test('all answer explanations are Polish in Polish mode without altering answers or progress IDs', () => {
  for (const item of content.allExercises) {
    const translated = content.exerciseTranslations.pl[item.id];
    assert.ok(translated?.explanation?.trim(), item.id);
    assert.ok(!cyrillic.test(translated.explanation), item.id);
    const localized = localizeExercise(item, 'pl', content);
    assert.equal(localized.id, item.id);
    assert.deepEqual(localized.answers, item.answers);
    assert.deepEqual(localized.options, item.options);
    if (item.level !== 'sentence' && item.topic !== 'vocabulary')
      assert.ok(!cyrillic.test(localized.prompt), item.id);
    if (item.level === 'sentence' || item.topic === 'vocabulary')
      assert.equal(localized.prompt, item.prompt);
    assert.deepEqual(localizeExercise(item, 'uk', content), item);
  }
});

test('interview tips, historical corrections and source labels have Polish variants', () => {
  for (const entry of content.interview) {
    const translated = localizeInterview(entry, 'pl', content);
    assert.ok(content.interviewTranslations.pl[entry.id]?.tip);
    assert.ok(!cyrillic.test(translated.tip), entry.id);
    assert.deepEqual(localizeInterview(entry, 'uk', content), entry);
  }
  for (const entry of content.history) {
    assert.equal(typeof content.historyTranslations.pl[entry.id]?.note, 'string');
    assert.ok(!cyrillic.test(localizeHistory(entry, 'pl', content).note), entry.id);
  }
  for (const [label] of content.sources)
    assert.ok(!cyrillic.test(localizeSource(label, 'pl', content)), label);
});

test('missing Polish rule translations fail validation instead of silently showing Ukrainian', () => {
  const bundle = { ...content, lessonTranslations: { pl: { ...content.lessonTranslations.pl } } };
  delete bundle.lessonTranslations.pl[content.topics[0].id];
  assert.throws(() => validateContent(bundle), /localization/i);
});
