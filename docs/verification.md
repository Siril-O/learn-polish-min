# Local Verification

Verified on 2026-10-21 using local Node.js 26 and Chromium through Playwright.
The deployment workflow targets Node.js 22.

## Results

- `npm test`: 72 passing unit, content, and localization checks.
- `npm run build`: production build completed successfully.
- `npm run format:check`: all checked files pass.
- `npm run test:e2e -- --workers=2`: 66 passing browser checks across desktop
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
- Complete 53-paragraph source chronology, including both 2005 records, plus
  dated passages from other PDF sections: 120 learning records and 456 date exercises.
- Exact normalized source-paragraph comparison against the PDF, all extracted year
  tokens retained in source text, original Ukrainian translations,
  material filters, pagination, and filtered date practice.
- At least 50 distinct contexts per individual case in choice, written, and sentence
  modes; 57 contexts for Narzędnik. Fifty-question sessions are verified for all modes.
- Thirty distinct contexts in each foundational grammar topic, five answer choices,
  and attributed Wikibooks adaptations with source and license links.
- At least 20 distinct questions per available topic/mode and history subsection/mode.
- Original historical text is shown first; simplified text and translations expand
  separately. Pagination scrolls to the beginning of the new history page.
- Stable exercise/context identifiers, persistent answered-ID history, unseen-context
  priority, topic-balanced selection, and least-recent-context review.
- Session sizes 5, 10, 20, and 50 are honored when the selected pool permits them;
  smaller pools show their actual selectable limit and planned session size.
- Older backups migrate without losing existing state; unknown completed IDs are
  pruned and incorrect attempts remain available in mistake review.
- Backup import/export and rejection of invalid JSON without changing saved state.
- Blocked localStorage without blocking the learning interface.
- Static production assets under `/learn_pollish_minimalistic/`, hash navigation,
  and reloads without server-side route fallback.
- Viewport overflow checks and screenshots of all five main views.

Screenshots were visually reviewed on desktop and mobile. Browser artifacts are
generated under ignored `test-results/` and are not part of the source tree.
The build emits a non-fatal bundle-size warning: the main JavaScript asset is about
1,034 kB minified, 313 kB gzipped. Content remains bundled rather than fetched on demand.

## Scope

These checks validate the local application and content structure. They do not
constitute a full linguistic review or an official Karta Polaka curriculum audit.
Written translation grading uses listed accepted alternatives, not unrestricted
semantic evaluation. The mobile run emulates a mobile viewport in Chromium; it is
not a test on physical iOS hardware or Safari. Deployment availability is verified
separately from local checks.
