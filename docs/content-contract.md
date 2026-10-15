# Content Contract v1

Application code, comments, documentation, identifiers, and diagnostic messages are in English.
Ukrainian and Polish are allowed in user-facing application content only.

## Ownership

- Logic worker: `src/main.jsx`, `src/logic.js`, `src/content-contract.js`, `tests/logic.test.js`.
- Content worker: `src/grammar.js`, `src/karta.js`, `src/vocabulary.json`,
  `src/original-history.json`, `src/content/index.js`, `tests/content.test.js`.
- Coordinator: package/build configuration, styles, browser tests, README, integration.

Do not edit another worker's files. Report required contract changes to the coordinator.
Content is executable static data only; no network requests, HTML strings, or evaluation.
The application uses ordinary React text rendering.

## Entry Point

`src/content/index.js` exports:

```js
export const contentVersion = 1;
export { topics, caseMatrix, grammarExercises };
export { history, interview, historyExercises, cultureQuestions, sources };
export { vocabulary, wordExercises, allExercises };
```

Existing module shapes below are the v1 boundary. Keep IDs stable: browser storage
references topic IDs, word IDs, and exercise IDs. Exercise IDs must be globally unique.
New content can be added without editing components. The UI must derive totals from data.
All collections are nonempty for this first release, but filtered subsets can be empty.

## Topic

```ts
type Topic = {
  id: string;
  title: string;
  group: string;
  subtitle: string;
  rules: string[];
  columns: string[];
  table: string[][]; // Every row has columns.length cells.
  warning: string;
  examples: [string, string][]; // Polish sentence, Ukrainian translation.
  drills: unknown[]; // Content-authoring metadata; never consumed by UI logic.
  ruleImages?: { path: string; alt: string; caption: string }[]; // Local public/images/grammar assets.
};
```

Grammar topic groups currently include `Основи`, `Відмінки`, `Дієслова`, `Речення`.
`caseMatrix` is a string matrix with five cells per row.

## Teaching Localizations

Ukrainian teaching fields remain in the base records. Full Polish display variants
are exported from `src/content/grammar-pl.js` and `src/content/practice-pl.js` through
the content entry point. All bundles are loaded with the app; no on-demand fetching.

- `lessonTranslations.pl[topicId]`: subtitle, rules, columns, table, warning, and
  ruleImages with the same asset paths and translated captions/alternative text.
- `exerciseTranslations.pl[exerciseId]`: explanation, optional prompt and hint.
- `interviewTranslations.pl[entryId]`: tip.
- `historyTranslations.pl[entryId]`: note.
- `sourceTranslations.pl[sourceLabel]`: Polish source label.

The selector changes interface and teaching language together, defaulting to Polish.
Example sentences stay Polish; their Ukrainian translations are hidden behind a
disclosure in Polish mode. Ukrainian-to-Polish translation questions and vocabulary
definitions intentionally remain Ukrainian as the learning task, not as a fallback.
Changing language never changes exercise IDs, choices, answers, scores, or saved state.
Validation rejects incomplete Polish teaching records instead of falling back silently.

## Exercise

Case-specific research supplements are exported as `caseGuides` from
`src/content/case-guides.js`, keyed by the seven case topic IDs. Each record has
verified `sources: {title, url}[]` plus complete `pl` and `uk` records containing:

- `nounQuestions`, `adjectiveQuestions`, `howToAsk`, `note`: explanatory text.
- `patterns`: three-column rows (construction, contextual question, Polish example).
- `examples`: `{sentence, target, question, answer, explanation, translation}[]`.

Analyzed sentences are original teaching examples, not quotations from the sources.
`target` occurs once and matches `answer`. Both locales use the same Polish sentence
and Ukrainian translation; only instructions and analysis change language. Ukrainian
translations are disclosed on demand in Polish mode. Vocative is explicitly taught
as direct address, without inventing a grammatical case question.

```ts
type Exercise = {
  id: string;
  topic: string; // Topic.id or history, culture, vocabulary.
  level: 'choice' | 'write' | 'sentence' | 'event' | 'identify';
  prompt: string;
  answers: string[]; // Explicit accepted alternatives, not regexes.
  options?: string[]; // Required for choice/event; absent for write/sentence.
  explanation: string;
  hint?: string;
  wordId?: string; // Required for vocabulary exercises; references VocabularyWord.id.
  targetWord?: string; // Required for identify; occurs exactly once in prompt.
};
```

Choice/event/identify options must be unique, with exactly one accepted answer. Questions must
be unambiguous. Written answers normalize NFC, case, whitespace, and final punctuation;
Polish diacritics are significant. Sentence alternatives must be listed explicitly.
Do not claim unrestricted translation grading. Explanation is shown after submission.

`allExercises` concatenates grammar, history, culture, and vocabulary exercises.
Grammar topics default to choice, write, and sentence coverage. A topic can declare
`exerciseLevels` explicitly; the case overview uses `['identify']`. Identification
highlights `targetWord` in a complete Polish sentence and asks for its grammatical case.
Vocabulary has choice
and write. History has choice (year), write (year), and event (year-to-event choice).

## Vocabulary

```ts
type VocabularyWord = {
  id: string;
  form: string; // Form found in a text.
  base: string; // Infinitive for verbs, dictionary form otherwise.
  uk: string;
  kind: string; // User-facing part of speech.
};
```

No personal names or proper nouns. Use wordId rather than parsing an exercise ID.
Distractors must be distinct base forms and cannot be valid translations of the prompt.

## History and Interview

```ts
type HistoryEntry = {
  id: string;
  year: string;
  title: string;
  pl: string;
  uk: string;
  source: string; // Verified https URL supporting the teaching text.
  original: string; // Supplied original text, if available; may contain errors.
  note: string; // Explain material corrections to the original.
  date: string; // Optional full date; empty string if only a year is taught.
};
type InterviewEntry = {
  id: string;
  category: string;
  q: string;
  uk: string;
  answer: string;
  tip: string;
};
```

`sources` is an array of `[label, httpsUrl]` pairs. Historical practice must use the
corrected teaching text, never the supplied original. Interview answers about the
learner are templates, not invented personal facts or an official question bank.

## Verb Reference

`src/content/verbs.js` exports 20 imperfective verb records and a `verb-tables`
grammar topic. A record contains stable `id`, `infinitive`, `uk`, six `present`
forms, six `future` forms, and `past: {masculine: string[6], feminine: string[6],
neuter: string}`. Person order is ja, ty, on/ona/ono, my, wy, oni/one.

`aspect: {partner: string|null, note: {pl, uk}}` describes both exact aspect pairs
and related motion/onset verbs without treating all prefixes as interchangeable.
`government` records contain `construction`, `question`, `example`, and bilingual
`case` labels. Bilingual `notes` and verified `verbSources` accompany the tables.

Form exercises reference `verbId` and include `tense`, `personIndex`, and, for past
forms, `gender`. They use the existing choice/write grading and mistake review.
Selecting practice from the reference filters to the currently selected verb.
The rule dialog reopens that verb's table without replacing the active answer.

## Browser State

```ts
type SavedState = {
  version: 1;
  topic: string;
  lastView: 'grammar' | 'practice' | 'karta' | 'vocabulary' | 'settings';
  saved: string[]; // Word IDs.
  known: string[]; // Word IDs.
  mistakes: string[]; // Exercise IDs.
};
```

Storage and imports validate shape, limit size, deduplicate, and prune unknown IDs.
Storage failures must not prevent practice. Invalid imports must leave state unchanged.
Import replaces learning data without unexpectedly navigating away from its status.
Completed session scoring uses the submitted first attempt only. A correct review
removes its exercise ID from mistakes. Incorrect cards must remain available to review.

## Validation

Content tests cover unique IDs, reference integrity, choices, accepted answers, table
dimensions, and topic/level coverage. The logic worker supplies `validateContent(bundle)`
in `src/content-contract.js`: throw an English Error on an invalid bundle; otherwise
return the bundle. The content test can import it once available.
