# History Source Coverage

The supplied 19-page PDF, `Karta_Polaka_-_Pytania_Ogolne.docx – копія.docx.pdf`,
is the reference for this expansion. Its chronology on pages 2–5 contains 53
paragraphs. Two separate paragraphs are headed 2005: the death of John Paul II
and the presidential election. Both must remain separate records.

## Representation

- `original` preserves the source paragraph, with PDF layout whitespace normalized.
- `originalUk` translates that original, including claims that need correction.
- `pl` uses easier vocabulary and shorter sentences without removing source details.
- `uk` translates the simplified version, not the original.
- `note` and `notePl` separate corrections and qualifications from source wording.
- `originalYear` retains the source date label even when the teaching date differs,
  notably the source's 1998 heading for Poland joining NATO in 1999.
- `sourcePages` records the relevant PDF pages. The main chronology is referenced
  as the complete pages 2–5 section; supplementary passages have narrower references.

The old standalone Gniezno entry for 1000 and all existing history progress IDs
remain available. Added date passages from other sections are grouped into
historical questions, people and culture, places, and holidays. Repeated source
passages may share a reference, but additional details are not discarded.

The archival chronology is in `src/original-history.json`, with the additional
papal-death paragraph in `src/content/history-complete.js`. Supplementary records
carry their own originals. Source assertions about contemporary officeholders,
city populations, institutions, and traditions are historical document content,
not a claim that the document is current or an official interview syllabus.

## Checks

`tests/fixtures/history-pdf-coverage.json` records extracted three- and four-digit
calendar-year tokens by PDF page. Tests check that every listed year remains in
a source passage assigned to that page. Tests also require all 53 chronology
paragraphs, original Ukrainian translations, and exercises for each material group.
The token manifest is a regression guard, not a substitute for semantic review;
preserving a year alone would not prove that every statement was translated correctly.

Reference reading for specific qualifications includes the
[Vatican death announcement](https://press.vatican.va/content/salastampa/it/bollettino/pubblico/2005/04/03/0188/00403.html),
the [presidential inauguration record](https://www.prezydent.pl/archiwum-lecha-kaczynskiego/prezydent/biografia/),
the [UN history of International Women's Day](https://www.un.org/en/observances/womens-day/background),
and the [Polish Biographical Dictionary entry for Marcin Bielski](https://www.ipsb.nina.gov.pl/a/biografia/marcin-bielski-wolski-h-prawdzic-1495-1575-kronikarz-poeta-etc).
