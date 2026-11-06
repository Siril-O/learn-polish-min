# Historical background

Extended context is separate from the supplied document, its Ukrainian translation and its simplified Polish text. Editing background must not modify those original collections or exercise answers.

The four `src/content/history-background-*.js` files export records keyed by stable history IDs. Each record has `pl` and `uk` paragraph arrays and `sources` containing a readable title and supporting HTTPS URL. `history-background.js` combines them. The UI loads this module only when a reader opens a context section.

Keep each language version between 10 and 30 substantive sentences. Explain circumstances, consequences and relevant historical connections. For biographies, explain the person's work and historical setting; for recurring holidays, explain origins and traditions. Avoid padding, copying source passages, unsupported causal claims and treating legends as documented events. Preserve the same meaning across both languages.

Prefer museums, universities, archives and public cultural or historical institutions. Verify the actual linked page, not just a search result. A source link should support the specific record, rather than only point to an institution's homepage.

Run `npm test` for coverage, paragraph uniqueness and sentence-count checks. Browser coverage lives in `tests/browser/history-background.spec.js` and checks deferred loading, language switching and preservation of the original text.
