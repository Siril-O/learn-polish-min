# Learn Polish Minimalistic

A browser-only Polish learning app with Ukrainian explanations and a separate
Karta Polaka practice section. Built with React, Vite, and Bootstrap 5.

## Local Development

Requires Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

The project-local `.npmrc` uses the public npm registry. It does not change your
global npm configuration. The lockfile pins the dependency tree for repeatable installs.

```sh
npm test
npm run build
npm run preview
npx playwright install chromium
npm run test:e2e
```

## Features

- Polish letter and digraph reference with 76 contextual spelling exercises,
  covering diacritics, soft consonants, and easily confused letter groups.

- Grammar reference with examples, declension tables, and linked exercises.
- Sourced case guides with noun/adjective questions, common constructions, and
  contextual analysis of 21 additional sentences.
- Searchable tables for 20 common verbs across present, past, and future forms,
  with gender variants, aspect notes, case government, and 720 targeted exercises.
- Multiple-choice, fill-in-the-blank, and sentence translation practice.
- First-attempt feedback, explanations, and mistake review.
- History, dates, culture, and interview practice for Karta Polaka preparation.
- Searchable vocabulary, saved words, and bidirectional flashcards.
- Local browser storage, validated JSON backup import, and export.

The interface defaults to Polish, with a Ukrainian selector and a locally saved
language preference. All grammar rules, tables, image captions, and exercise
explanations have Polish and Ukrainian versions. Ukrainian translations of examples
can be revealed separately in Polish mode. Translation exercises and vocabulary
definitions intentionally retain Ukrainian when it is the language being practised.
Source identifiers,
comments, diagnostics, and documentation use English.

## Content Boundary

See [the content contract](docs/content-contract.md). Content lives separately from
application logic and can be expanded without changing components. Existing material
is an initial learning set, not an exhaustive curriculum or official interview bank.

Sentence grading accepts explicitly listed alternatives rather than unrestricted
language assessment. Polish diacritics matter. Personal interview answers are templates to
complete with the learner's own truthful information.

## Storage

Learning state is stored in `localStorage` under `polski-praktyka:v1`. It is scoped
to the browser and website origin and has no application-defined expiration.
Clearing site data removes it. Export/import transfers a backup between devices.
There is no backend, account, automatic synchronization, or analytics.

## GitHub Pages

The included deployment workflow builds the static `dist` directory using GitHub
Actions when changes are pushed to `main`. Enable GitHub Actions as the
Pages publishing source in repository settings when ready.
Vite uses relative asset paths so the build works under a repository subdirectory.
Navigation uses hash routes, requiring no server fallback rules.

## Project Structure

```text
src/content/          Content entry point
src/grammar.js        Grammar learning data
src/karta.js          History and interview learning data
src/vocabulary.json  Vocabulary learning data
src/main.jsx         Application views
src/logic.js         Answer and storage logic
tests/               Unit, content, and browser checks
docs/                Content contract
```
