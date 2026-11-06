import test from 'node:test';
import assert from 'node:assert/strict';
import { history } from '../src/content/index.js';
import { historyBackground } from '../src/content/history-background.js';

test('every dated record has substantial bilingual historical background', () => {
  assert.deepEqual(Object.keys(historyBackground).sort(), history.map((entry) => entry.id).sort());
  for (const record of history) {
    const background = historyBackground[record.id];
    for (const language of ['pl', 'uk']) {
      assert.ok(background[language].length >= 2, record.id);
      const text = background[language].join(' ');
      const sentences = [
        ...new Intl.Segmenter(language, { granularity: 'sentence' }).segment(text),
      ];
      assert.ok(
        sentences.length >= 10 && sentences.length <= 30,
        `${record.id}/${language}: ${sentences.length} sentences`,
      );
      assert.ok(text.length > 500, `${record.id}/${language}: insufficient context`);
      if (language === 'pl') assert.doesNotMatch(text, /[А-Яа-яІіЇїЄє]/u);
      else assert.match(text, /[А-Яа-яІіЇїЄє]/u);
    }
    assert.ok(background.sources.length > 0, record.id);
    for (const source of background.sources) {
      assert.ok(source.title.trim());
      assert.equal(new URL(source.url).protocol, 'https:');
    }
  }
});

test('background paragraphs are specific to each record, not repeated filler', () => {
  for (const language of ['pl', 'uk']) {
    const paragraphs = Object.values(historyBackground).flatMap((entry) => entry[language]);
    assert.equal(new Set(paragraphs).size, paragraphs.length);
  }
});
