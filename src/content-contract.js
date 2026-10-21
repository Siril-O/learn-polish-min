import { normalize } from './logic.js';

export function validateContent(bundle) {
  const fail = (message) => {
    throw new Error(`Invalid content: ${message}`);
  };
  const text = (value) => typeof value === 'string' && value.trim().length > 0;
  const strings = (value) => Array.isArray(value) && value.length > 0 && value.every(text);
  const https = (value) => {
    try {
      return new URL(value).protocol === 'https:';
    } catch {
      return false;
    }
  };
  if (!bundle || bundle.contentVersion !== 1) fail('unsupported version');
  for (const name of [
    'topics',
    'caseMatrix',
    'grammarExercises',
    'history',
    'interview',
    'historyExercises',
    'cultureQuestions',
    'sources',
    'vocabulary',
    'wordExercises',
    'allExercises',
  ]) {
    if (!Array.isArray(bundle[name]) || !bundle[name].length)
      fail(`${name} must be a nonempty array`);
  }
  function unique(items, label) {
    const ids = new Set();
    for (const item of items) {
      if (!item || !text(item.id) || item.id.length > 160 || ids.has(item.id))
        fail(`${label} has invalid or duplicate IDs`);
      ids.add(item.id);
    }
    return ids;
  }
  const topicIds = unique(bundle.topics, 'topics');
  const wordIds = unique(bundle.vocabulary, 'vocabulary');
  unique(bundle.history, 'history');
  unique(bundle.interview, 'interview');
  for (const topic of bundle.topics) {
    if (
      topic.ruleImages !== undefined &&
      (!Array.isArray(topic.ruleImages) ||
        topic.ruleImages.some(
          (image) =>
            !image ||
            !/^images\/grammar\/[a-z0-9-]+\.(jpg|png|webp)$/.test(image.path) ||
            !text(image.alt) ||
            !text(image.caption),
        ))
    )
      fail('invalid rule image');
    if (
      ['history', 'culture', 'vocabulary', 'all', 'cases', 'saved', 'mistakes'].includes(topic.id)
    )
      fail('reserved topic ID');
    if (
      !['title', 'group', 'subtitle', 'warning'].every((k) => text(topic[k])) ||
      !strings(topic.rules) ||
      !strings(topic.columns)
    )
      fail('invalid topic text');
    if (
      !Array.isArray(topic.table) ||
      !topic.table.length ||
      topic.table.some((row) => !strings(row) || row.length !== topic.columns.length)
    )
      fail('invalid topic table');
    if (
      !Array.isArray(topic.examples) ||
      !topic.examples.length ||
      topic.examples.some((row) => !strings(row) || row.length !== 2)
    )
      fail('invalid topic examples');
  }
  if (bundle.caseMatrix.some((row) => !strings(row) || row.length !== 5))
    fail('invalid case matrix');
  for (const word of bundle.vocabulary)
    if (!['form', 'base', 'uk', 'kind'].every((k) => text(word[k])))
      fail('invalid vocabulary word');
  for (const entry of bundle.history) {
    if (
      !['year', 'title', 'pl', 'uk'].every((k) => text(entry[k])) ||
      !https(entry.source) ||
      !['original', 'note', 'date'].every((k) => typeof entry[k] === 'string')
    )
      fail('invalid history entry');
    if (entry.original && !text(entry.originalUk)) fail('missing original history translation');
  }
  for (const entry of bundle.interview)
    if (!['category', 'q', 'uk', 'answer', 'tip'].every((k) => text(entry[k])))
      fail('invalid interview entry');
  if (
    bundle.sources.some(
      (row) => !Array.isArray(row) || row.length !== 2 || !text(row[0]) || !https(row[1]),
    )
  )
    fail('invalid source');
  const exercises = [
    ...bundle.grammarExercises,
    ...bundle.historyExercises,
    ...bundle.cultureQuestions,
    ...bundle.wordExercises,
  ];
  unique(exercises, 'exercises');
  unique(bundle.allExercises, 'allExercises');
  const aggregate = new Map(bundle.allExercises.map((exercise) => [exercise.id, exercise]));
  if (
    exercises.length !== bundle.allExercises.length ||
    exercises.some(
      (exercise) => JSON.stringify(aggregate.get(exercise.id)) !== JSON.stringify(exercise),
    )
  )
    fail('allExercises does not match exercise collections');
  for (const [items, allowed] of [
    [bundle.grammarExercises, topicIds],
    [bundle.historyExercises, new Set(['history'])],
    [bundle.cultureQuestions, new Set(['culture'])],
    [bundle.wordExercises, new Set(['vocabulary'])],
  ]) {
    for (const q of items) {
      if (
        !allowed.has(q.topic) ||
        !['choice', 'write', 'sentence', 'event', 'identify'].includes(q.level) ||
        !text(q.prompt) ||
        !text(q.explanation) ||
        !strings(q.answers) ||
        q.answers.some((a) => !normalize(a)) ||
        new Set(q.answers.map(normalize)).size !== q.answers.length
      )
        fail('invalid exercise');
      if (q.hint !== undefined && !text(q.hint)) fail('invalid hint');
      if (q.attribution !== undefined) {
        const attribution = q.attribution;
        if (
          !attribution ||
          !['title', 'authors', 'license'].every((key) => text(attribution[key])) ||
          !['url', 'authorsUrl', 'licenseUrl'].every((key) => https(attribution[key]))
        )
          fail('invalid exercise attribution');
      }
      if (q.familyId !== undefined && (!text(q.familyId) || q.familyId.length > 160))
        fail('invalid exercise family');
      if (q.topic === 'vocabulary' && !wordIds.has(q.wordId)) fail('invalid word reference');
      if (q.wordId !== undefined && !wordIds.has(q.wordId)) fail('unknown word reference');
      if (
        q.level === 'identify' &&
        (!text(q.targetWord) || q.prompt.split(q.targetWord).length !== 2)
      )
        fail('identification target must occur exactly once');
      if (['choice', 'event', 'identify'].includes(q.level)) {
        if (
          !strings(q.options) ||
          q.options.length < 2 ||
          new Set(q.options.map(normalize)).size !== q.options.length ||
          q.options.filter((o) => q.answers.some((a) => normalize(a) === normalize(o))).length !== 1
        )
          fail('invalid choice options');
      } else if (q.options !== undefined) fail('written exercise has options');
    }
  }
  function coverage(items, key, ids, levels) {
    for (const id of ids)
      for (const level of levels)
        if (!items.some((q) => q[key] === id && q.level === level))
          fail(`missing ${level} coverage for ${id}`);
  }
  for (const topic of bundle.topics) {
    const required = topic.exerciseLevels ?? ['choice', 'write', 'sentence'];
    if (
      !strings(required) ||
      required.some((level) => !['choice', 'write', 'sentence', 'identify'].includes(level))
    )
      fail('invalid topic exercise levels');
    coverage(bundle.grammarExercises, 'topic', [topic.id], required);
  }
  coverage(bundle.wordExercises, 'wordId', wordIds, ['choice', 'write']);
  coverage(bundle.historyExercises, 'topic', ['history'], ['choice', 'write', 'event']);
  if ('lessonTranslations' in bundle) {
    const cyrillic = /[\u0400-\u04ff]/u;
    const polishText = (value) => text(value) && !cyrillic.test(value);
    const allowed = (value, keys) =>
      value && typeof value === 'object' && Object.keys(value).every((key) => keys.includes(key));
    for (const name of [
      'lessonTranslations',
      'exerciseTranslations',
      'interviewTranslations',
      'historyTranslations',
      'sourceTranslations',
    ]) {
      if (!bundle[name]?.pl || typeof bundle[name].pl !== 'object')
        fail(`localization: missing ${name}.pl`);
    }
    for (const topic of bundle.topics) {
      const localized = bundle.lessonTranslations.pl[topic.id];
      if (
        !allowed(localized, ['subtitle', 'rules', 'columns', 'table', 'warning', 'ruleImages']) ||
        !polishText(localized.subtitle) ||
        !polishText(localized.warning) ||
        !strings(localized.rules) ||
        localized.rules.some((rule) => !polishText(rule)) ||
        !strings(localized.columns) ||
        localized.columns.some((column) => !polishText(column)) ||
        !Array.isArray(localized.table) ||
        localized.table.length !== topic.table.length ||
        localized.table.some(
          (row) =>
            !Array.isArray(row) ||
            row.length !== localized.columns.length ||
            row.some((cell) => !polishText(cell)),
        )
      )
        fail(`localization: incomplete Polish lesson ${topic.id}`);
      const images = localized.ruleImages ?? [];
      if (
        !Array.isArray(images) ||
        images.length !== (topic.ruleImages?.length ?? 0) ||
        images.some(
          (image, index) =>
            image.path !== topic.ruleImages[index].path ||
            !polishText(image.alt) ||
            !polishText(image.caption),
        )
      )
        fail(`localization: incomplete Polish rule images ${topic.id}`);
    }
    for (const exercise of bundle.allExercises) {
      const localized = bundle.exerciseTranslations.pl[exercise.id];
      if (
        !allowed(localized, ['explanation', 'prompt', 'hint']) ||
        !polishText(localized.explanation)
      )
        fail(`localization: incomplete Polish exercise ${exercise.id}`);
      if (localized.hint !== undefined && !polishText(localized.hint))
        fail(`localization: invalid Polish hint ${exercise.id}`);
      if (
        localized.prompt !== undefined &&
        (!polishText(localized.prompt) ||
          exercise.level === 'sentence' ||
          exercise.topic === 'vocabulary')
      )
        fail(`localization: invalid Polish prompt ${exercise.id}`);
      if (
        exercise.level !== 'sentence' &&
        exercise.topic !== 'vocabulary' &&
        !polishText(localized.prompt ?? exercise.prompt)
      )
        fail(`localization: untranslated Polish prompt ${exercise.id}`);
    }
    for (const entry of bundle.interview)
      if (
        !allowed(bundle.interviewTranslations.pl[entry.id], ['tip']) ||
        !polishText(bundle.interviewTranslations.pl[entry.id].tip)
      )
        fail(`localization: missing interview tip ${entry.id}`);
    for (const entry of bundle.history)
      if (
        !allowed(bundle.historyTranslations.pl[entry.id], ['note']) ||
        typeof bundle.historyTranslations.pl[entry.id].note !== 'string' ||
        cyrillic.test(bundle.historyTranslations.pl[entry.id].note)
      )
        fail(`localization: missing history note ${entry.id}`);
    for (const [label] of bundle.sources)
      if (!polishText(bundle.sourceTranslations.pl[label]))
        fail('localization: missing source label');
  }
  if (bundle.caseGuides) {
    const caseIds = [
      'mianownik',
      'dopelniacz',
      'celownik',
      'biernik',
      'narzednik',
      'miejscownik',
      'wolacz',
    ];
    const cyrillic = /[\u0400-\u04ff]/u;
    for (const id of caseIds) {
      const record = bundle.caseGuides[id];
      if (
        !record ||
        !Array.isArray(record.sources) ||
        !record.sources.length ||
        record.sources.some((source) => !text(source.title) || !https(source.url))
      )
        fail(`case guide: missing sources for ${id}`);
      for (const language of ['pl', 'uk']) {
        const guide = record[language];
        if (
          !guide ||
          !['nounQuestions', 'adjectiveQuestions', 'howToAsk', 'note'].every((key) =>
            text(guide[key]),
          ) ||
          !Array.isArray(guide.patterns) ||
          guide.patterns.length < 2 ||
          guide.patterns.some((row) => !strings(row) || row.length !== 3) ||
          !Array.isArray(guide.examples) ||
          guide.examples.length < 3
        )
          fail(`case guide: incomplete ${language} content for ${id}`);
        if (
          language === 'pl' &&
          cyrillic.test(
            JSON.stringify([
              guide.nounQuestions,
              guide.adjectiveQuestions,
              guide.howToAsk,
              guide.note,
              guide.patterns,
            ]),
          )
        )
          fail(`case guide: untranslated Polish content for ${id}`);
        for (const example of guide.examples) {
          if (
            !['sentence', 'target', 'question', 'answer', 'explanation', 'translation'].every(
              (key) => text(example[key]),
            ) ||
            example.sentence.split(example.target).length !== 2 ||
            example.answer !== example.target
          )
            fail(`case guide: invalid analyzed example for ${id}`);
          if (
            language === 'pl' &&
            cyrillic.test(
              example.sentence + example.question + example.answer + example.explanation,
            )
          )
            fail(`case guide: untranslated Polish example for ${id}`);
        }
      }
      if (
        record.pl.examples.length !== record.uk.examples.length ||
        record.pl.examples.some((example, index) =>
          ['sentence', 'target', 'answer', 'translation'].some(
            (key) => example[key] !== record.uk.examples[index][key],
          ),
        )
      )
        fail(`case guide: locale example mismatch for ${id}`);
    }
  }
  if (bundle.verbs) {
    if (!Array.isArray(bundle.verbs) || !bundle.verbs.length) fail('verbs: missing records');
    const ids = unique(bundle.verbs, 'verbs');
    const sixForms = (forms) => strings(forms) && forms.length === 6;
    for (const verb of bundle.verbs) {
      if (
        !text(verb.infinitive) ||
        !text(verb.uk) ||
        !sixForms(verb.present) ||
        !sixForms(verb.future) ||
        !sixForms(verb.past?.masculine) ||
        !sixForms(verb.past?.feminine) ||
        !text(verb.past?.neuter)
      )
        fail(`verbs: incomplete forms for ${verb.id}`);
      if (
        !verb.aspect ||
        (verb.aspect.partner !== null && !text(verb.aspect.partner)) ||
        !['pl', 'uk'].every(
          (language) => text(verb.aspect.note?.[language]) && text(verb.notes?.[language]),
        )
      )
        fail(`verbs: missing bilingual notes for ${verb.id}`);
      if (
        !Array.isArray(verb.government) ||
        verb.government.some(
          (entry) =>
            !['construction', 'question', 'example'].every((key) => text(entry[key])) ||
            !['pl', 'uk'].every((language) => text(entry.case?.[language])),
        )
      )
        fail(`verbs: invalid government for ${verb.id}`);
    }
    if (
      !Array.isArray(bundle.verbSources) ||
      !bundle.verbSources.length ||
      bundle.verbSources.some((source) => !text(source.title) || !https(source.url))
    )
      fail('verbs: invalid sources');
    for (const exercise of bundle.grammarExercises.filter((item) => item.topic === 'verb-tables')) {
      if (
        !ids.has(exercise.verbId) ||
        !['present', 'past', 'future'].includes(exercise.tense) ||
        !Number.isInteger(exercise.personIndex) ||
        exercise.personIndex < 0 ||
        exercise.personIndex > 5
      )
        fail(`verbs: invalid exercise reference ${exercise.id}`);
      if (exercise.tense === 'past' && !['masculine', 'feminine'].includes(exercise.gender))
        fail(`verbs: missing past gender ${exercise.id}`);
    }
  }
  return bundle;
}
