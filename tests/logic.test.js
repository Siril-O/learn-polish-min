import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalize,
  checkAnswer,
  validateBackup,
  readState,
  defaults,
  shuffle,
  toggle,
  advanceSession,
} from '../src/logic.js';
import { validateContent } from '../src/content-contract.js';

function fixture() {
  const exercise = (id, topic, level, extra = {}) => ({
    id,
    topic,
    level,
    prompt: 'Prompt',
    answers: ['Answer'],
    explanation: 'Explanation',
    ...(['choice', 'event'].includes(level) ? { options: ['Answer', 'Other'] } : {}),
    ...extra,
  });
  const bundle = {
    contentVersion: 1,
    topics: [
      {
        id: 'topic',
        title: 'Title',
        group: 'Group',
        subtitle: 'Subtitle',
        rules: ['Rule'],
        columns: ['Column'],
        table: [['Cell']],
        warning: 'Warning',
        examples: [['Example', 'Translation']],
        drills: [],
      },
    ],
    caseMatrix: [['a', 'b', 'c', 'd', 'e']],
    vocabulary: [{ id: 'word', form: 'Form', base: 'Base', uk: 'Translation', kind: 'Kind' }],
    history: [
      {
        id: 'past',
        year: '1000',
        title: 'Title',
        pl: 'Text',
        uk: 'Translation',
        source: 'https://example.com',
        original: '',
        note: '',
        date: '',
      },
    ],
    interview: [
      {
        id: 'interview',
        category: 'Category',
        q: 'Question',
        uk: 'Translation',
        answer: 'Answer',
        tip: 'Tip',
      },
    ],
    sources: [['Source', 'https://example.com']],
    grammarExercises: ['choice', 'write', 'sentence'].map((level) =>
      exercise(`grammar-${level}`, 'topic', level),
    ),
    historyExercises: ['choice', 'write', 'event'].map((level) =>
      exercise(`history-${level}`, 'history', level),
    ),
    cultureQuestions: [exercise('culture-choice', 'culture', 'choice')],
    wordExercises: ['choice', 'write'].map((level) =>
      exercise(`unrelated-id-${level}`, 'vocabulary', level, { wordId: 'word' }),
    ),
  };
  bundle.allExercises = [
    ...bundle.grammarExercises,
    ...bundle.historyExercises,
    ...bundle.cultureQuestions,
    ...bundle.wordExercises,
  ];
  return bundle;
}

test('normalization accepts NFC, case, whitespace and final punctuation but preserves accents', () => {
  assert.equal(normalize('  CZEŚĆ  ŚWIECIE !  '), 'cześć świecie');
  assert.ok(checkAnswer('czes\u0301c\u0301.', ['cześć']));
  assert.ok(!checkAnswer('czesc', ['cześć']));
  assert.ok(!checkAnswer('Jestem tutaj', ['Tutaj jestem']));
  assert.ok(checkAnswer('Jestem tutaj!', ['Tutaj jestem', 'Jestem tutaj']));
});

test('backup sanitation prunes unknown IDs, deduplicates and does not mutate input', () => {
  const input = {
    ...defaults(),
    topic: 'removed',
    saved: ['word', 'word', 'gone'],
    known: ['gone', 'word'],
    mistakes: ['grammar-write', 'gone'],
    extra: true,
  };
  const original = structuredClone(input);
  const result = validateBackup(input, fixture());
  assert.deepEqual(result, {
    version: 1,
    topic: 'topic',
    lastView: 'grammar',
    saved: ['word'],
    known: ['word'],
    mistakes: ['grammar-write'],
  });
  assert.deepEqual(input, original);
});

test('invalid backup cannot replace existing state', () => {
  let current = defaults(fixture());
  const before = current;
  for (const change of [
    { version: 2 },
    { saved: [1] },
    { known: null },
    { mistakes: Array(10001).fill('x') },
    { topic: '' },
    { lastView: 'bad' },
  ]) {
    assert.throws(() => {
      current = validateBackup({ ...before, ...change }, fixture());
    });
    assert.equal(current, before);
  }
});

test('storage handles missing, malformed, blocked and oversized data', () => {
  const bundle = fixture();
  assert.deepEqual(readState({ getItem: () => null }, bundle).state, defaults(bundle));
  for (const storage of [
    { getItem: () => '{' },
    { getItem: () => 'x'.repeat(2 * 1024 * 1024 + 1) },
    {
      getItem() {
        throw Error('Blocked');
      },
    },
  ]) {
    const result = readState(storage, bundle);
    assert.deepEqual(result.state, defaults(bundle));
    assert.ok(result.warning);
  }
  assert.deepEqual(
    readState(
      { getItem: () => JSON.stringify({ ...defaults(bundle), saved: ['deleted', 'word'] }) },
      bundle,
    ).state.saved,
    ['word'],
  );
});

test('session records the submitted result once and keeps incorrect questions for retry', () => {
  const item = fixture().grammarExercises[0];
  const initial = { items: [item], index: 0, correct: 0, wrong: [] };
  const wrong = advanceSession(initial, 0, false);
  assert.equal(wrong.correct, 0);
  assert.deepEqual(wrong.wrong, [item]);
  assert.equal(advanceSession(wrong, 0, true), wrong);
  assert.equal(advanceSession(wrong, 1, true), wrong);
  const retry = advanceSession({ ...initial, items: wrong.wrong }, 0, true);
  assert.equal(retry.correct, 1);
  assert.deepEqual(retry.wrong, []);
});

test('shuffle and toggles leave source arrays unchanged', () => {
  const input = ['a', 'b', 'c'];
  assert.deepEqual(shuffle(input).sort(), input);
  assert.deepEqual(toggle(input, 'a'), ['b', 'c']);
  assert.deepEqual(toggle(input, 'd'), ['a', 'b', 'c', 'd']);
  assert.deepEqual(input, ['a', 'b', 'c']);
});

test('valid content returns unchanged and requires no drills', () => {
  const bundle = fixture();
  delete bundle.topics[0].drills;
  assert.equal(validateContent(bundle), bundle);
});

const invalidCases = {
  version: (b) => {
    b.contentVersion = 2;
  },
  'empty collection': (b) => {
    b.vocabulary = [];
  },
  'duplicate topic IDs': (b) => {
    b.topics.push(b.topics[0]);
  },
  'duplicate exercise IDs': (b) => {
    b.wordExercises[0].id = b.grammarExercises[0].id;
  },
  'unknown topic': (b) => {
    b.grammarExercises[0].topic = 'missing';
  },
  'unknown word reference': (b) => {
    b.wordExercises[0].wordId = 'missing';
  },
  'missing word reference': (b) => {
    delete b.wordExercises[0].wordId;
  },
  'duplicate normalized options': (b) => {
    b.grammarExercises[0].options.push('ANSWER.');
  },
  'no accepted option': (b) => {
    b.grammarExercises[0].answers = ['Missing'];
  },
  'multiple accepted options': (b) => {
    b.grammarExercises[0].answers.push('Other');
  },
  'blank answer': (b) => {
    b.grammarExercises[1].answers = ['!'];
  },
  'written options': (b) => {
    b.grammarExercises[1].options = ['Answer'];
  },
  'table width': (b) => {
    b.topics[0].table = [['a', 'b']];
  },
  'matrix width': (b) => {
    b.caseMatrix = [['a']];
  },
  'missing topic level': (b) => {
    b.grammarExercises[2].level = 'write';
  },
  'missing vocabulary level': (b) => {
    b.wordExercises[1].level = 'sentence';
  },
  'mismatched aggregate': (b) => {
    b.allExercises = b.allExercises.slice(1);
  },
  'unsafe source': (b) => {
    b.sources[0][1] = 'javascript:alert(1)';
  },
  'invalid history': (b) => {
    b.history[0].source = 'http://example.com';
  },
};
for (const [name, mutate] of Object.entries(invalidCases))
  test(`validator rejects ${name}`, () => {
    const bundle = fixture();
    mutate(bundle);
    assert.throws(() => validateContent(bundle), /Invalid content:/);
  });
