import test from 'node:test';
import assert from 'node:assert/strict';
import { history, historyExercises } from '../src/karta.js';
import { historyOriginals } from '../src/content/history-complete.js';
import pageCoverage from './fixtures/history-pdf-coverage.json' with { type: 'json' };

test('every source chronology paragraph is present, including both 2005 entries', () => {
  assert.equal(Object.keys(historyOriginals).length, 53);
  assert.equal(history.filter((entry) => entry.originalKey).length, 53);
  for (const [key, original] of Object.entries(historyOriginals)) {
    const matches = history.filter((entry) => entry.originalKey === key);
    assert.equal(matches.length, 1, key);
    assert.equal(matches[0].original, original);
  }
  assert.equal(history.filter((entry) => entry.originalKey && entry.year === '2005').length, 2);
  assert.ok(history.some((entry) => entry.year === '1038 - 1050'));
  assert.ok(history.some((entry) => entry.year === 'Ok. 1550'));
});

test('every dated passage has an original Ukrainian translation and substantial simplified text', () => {
  for (const entry of history.filter((item) => item.original)) {
    assert.match(entry.originalUk, /[\u0400-\u04ff]/u, entry.id);
    assert.doesNotMatch(entry.pl, /[\u0400-\u04ff]/u, entry.id);
    // Compact date ranges use fewer tokens without removing the listed dates.
    assert.ok(entry.pl.split(/\s+/u).length >= entry.original.split(/\s+/u).length * 0.5, entry.id);
    assert.ok(entry.uk.length > 0, entry.id);
    assert.ok(entry.category && entry.sourcePages.length, entry.id);
  }
});

test('simplified chronology tells the history directly without source commentary', () => {
  for (const entry of history.filter((item) => item.originalKey)) {
    assert.doesNotMatch(
      entry.pl,
      /(?:tekst|dokument|autor)\s+(?:podaje|mówi|nazywa|twierdzi|opisuje|przedstawia|łączy|dodaje|pisze)|według tekstu|to błąd/iu,
      entry.id,
    );
    assert.doesNotMatch(entry.uk, /за текстом|текст (?:називає|подає|говорить|описує)/iu, entry.id);
  }
});

test('all dated source pages retain every extracted calendar year', () => {
  for (const { page, years } of pageCoverage) {
    const passages = history.filter((entry) => entry.sourcePages?.includes(page));
    const text = passages.map((entry) => `${entry.originalYear || ''} ${entry.original}`).join(' ');
    for (const year of years) assert.ok(text.includes(year), `PDF page ${page}: missing ${year}`);
  }
});

test('all history groups have exercises and duplicate years have distinct answer options', () => {
  for (const category of ['chronology', 'history', 'people', 'places', 'holidays']) {
    const exercises = historyExercises.filter((entry) => entry.historyCategory === category);
    assert.ok(exercises.length > 0, category);
    for (const exercise of exercises) {
      if (exercise.options) assert.equal(new Set(exercise.options).size, exercise.options.length);
    }
  }
  assert.match(history.find((entry) => entry.id === 'history-1978').originalUk, /6 жовтня/u);
  assert.equal(history.find((entry) => entry.id === 'history-1999').originalYear, '1998');
});
