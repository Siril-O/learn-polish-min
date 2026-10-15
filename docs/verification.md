# Local Verification

Verified on 2026-10-15 using Node.js 22 and Chromium through Playwright.

## Results

- `npm test`: 45 passing unit, content, and localization checks.
- `npm run build`: production build completed successfully.
- `npm run format:check`: all checked files pass.
- `npm run test:e2e -- --workers=2`: 42 passing browser checks across desktop
  Chromium and an iPhone 13-sized Chromium viewport.

## Browser Coverage

- Polish interface by default, persistent Ukrainian preference, and stable vocabulary
  filter identifiers across language changes.
- Complete Polish teaching text for all 19 grammar topics, Ukrainian switching,
  localized exercise feedback and rule dialogs, and preserved in-progress answers.
- Coverage tests reject missing Polish lessons, explanations, captions, tips, and sources.
- All seven sourced case guides, noun/adjective questions, 21 analyzed examples,
  bilingual presentation, reference links, and availability inside practice dialogs.
- Grammar navigation, topic persistence, search, and comparative case table.
- Contextual spelling gaps covering diacritics, digraphs, and soft consonants;
  exact-letter grading and targeted written practice on desktop and mobile.
- Twenty searchable verb tables, past-tense gender switching, irregular forms,
  case government, selected-verb practice, and contextual reference dialogs.
- Coverage of all three tenses and both exercise levels for every reference verb,
  including accepted infinitive and gender-agreeing compound future variants.
- Case overview as a persistent topic and highlighted-word case identification.
- Written quizzes, incorrect feedback, linked rule dialogs, and mistake review.
- Accepted sentence alternatives, first-attempt scoring, and correct session results.
- Vocabulary search, saved-word persistence, known-word state, and flashcard requeueing.
- History translation, interview sections, culture questions, and choice exercises.
- Backup import/export and rejection of invalid JSON without changing saved state.
- Blocked localStorage without blocking the learning interface.
- Static production assets under `/learn_pollish_minimalistic/`, hash navigation,
  and reloads without server-side route fallback.
- Viewport overflow checks and screenshots of all five main views.

Screenshots were visually reviewed on desktop and mobile. Browser artifacts are
generated under ignored `test-results/` and are not part of the source tree.

## Scope

These checks validate the local application and content structure. They do not
constitute a full linguistic review or an official Karta Polaka curriculum audit.
Written translation grading uses listed accepted alternatives, not unrestricted
semantic evaluation. The mobile run emulates a mobile viewport in Chromium; it is
not a test on physical iOS hardware or Safari. Deployment availability is verified
separately from local checks.
