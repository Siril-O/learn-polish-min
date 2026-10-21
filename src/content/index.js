import {
  topics as baseTopics,
  caseMatrix,
  grammarExercises as baseGrammarExercises,
} from '../grammar.js';
import {
  history,
  interview,
  historyExercises as baseHistoryExercises,
  cultureQuestions as baseCultureQuestions,
  sources,
} from '../karta.js';
import vocabulary from '../vocabulary.json' with { type: 'json' };
import { lessonTranslations as baseLessonTranslations } from './grammar-pl.js';
import { basicExercises, basicExerciseTranslations } from './basic-practice.js';
import { wikibooksExercises, wikibooksExerciseTranslations } from './wikibooks-practice.js';
import { caseCompletionExercises, caseCompletionTranslations } from './case-completion.js';
import { expandedCaseExercises, expandedCaseTranslations } from './cases-expansion.js';
import { extraCultureQuestions, extraCultureTranslations } from './culture-extra.js';
import { extraHistoryExercises, extraHistoryTranslations } from './history-practice-extra.js';
import {
  declensionExtraEarly,
  declensionExtraEarlyTranslations,
} from './declension-extra-early.js';
import { declensionExtraLate, declensionExtraLateTranslations } from './declension-extra-late.js';
import {
  declensionSentencesEarly,
  declensionSentencesEarlyTranslations,
} from './declension-sentences-early.js';
import {
  declensionSentencesLate,
  declensionSentencesLateTranslations,
} from './declension-sentences-late.js';
import {
  spellingTopic,
  spellingExercises,
  spellingLessonTranslations,
  spellingExerciseTranslations,
} from './spelling.js';
import {
  verbs,
  verbSources,
  verbTopic,
  verbLessonTranslations,
  verbExercises,
  verbExerciseTranslations,
} from './verbs.js';
export { caseGuides } from './case-guides.js';
import {
  exerciseTranslations as baseExerciseTranslations,
  interviewTranslations,
  historyTranslations,
  sourceTranslations,
} from './practice-pl.js';

export const contentVersion = 1;
export const cultureQuestions = [...baseCultureQuestions, ...extraCultureQuestions];
export const historyExercises = [...baseHistoryExercises, ...extraHistoryExercises];
export const topics = [...baseTopics, verbTopic, spellingTopic];
export const declensionExercises = [
  ...declensionExtraEarly,
  ...declensionExtraLate,
  ...declensionSentencesEarly,
  ...declensionSentencesLate,
];
export const grammarExercises = [
  ...baseGrammarExercises,
  ...verbExercises,
  ...spellingExercises,
  ...declensionExercises,
  ...basicExercises,
  ...wikibooksExercises,
  ...caseCompletionExercises,
  ...expandedCaseExercises,
];
export const lessonTranslations = {
  pl: {
    ...baseLessonTranslations.pl,
    ...verbLessonTranslations.pl,
    ...spellingLessonTranslations.pl,
  },
};
export const exerciseTranslations = {
  pl: {
    ...baseExerciseTranslations.pl,
    ...verbExerciseTranslations.pl,
    ...spellingExerciseTranslations.pl,
    ...declensionExtraEarlyTranslations.pl,
    ...declensionExtraLateTranslations.pl,
    ...declensionSentencesEarlyTranslations.pl,
    ...declensionSentencesLateTranslations.pl,
    ...basicExerciseTranslations.pl,
    ...wikibooksExerciseTranslations.pl,
    ...caseCompletionTranslations.pl,
    ...expandedCaseTranslations.pl,
    ...extraCultureTranslations.pl,
    ...extraHistoryTranslations.pl,
  },
};
export {
  caseMatrix,
  verbs,
  verbSources,
  interviewTranslations,
  historyTranslations,
  sourceTranslations,
};
export { history, interview, sources };
export { vocabulary };

export const wordExercises = vocabulary.flatMap((word, index) => {
  // Different parts of speech keep synonyms and alternate senses out of choices.
  const distractors = [];
  for (let offset = 17; offset < vocabulary.length + 17 && distractors.length < 4; offset += 1) {
    const candidate = vocabulary[(index + offset) % vocabulary.length];
    if (
      candidate.kind !== word.kind &&
      candidate.base !== word.base &&
      !distractors.includes(candidate.base)
    ) {
      distractors.push(candidate.base);
    }
  }
  return ['choice', 'write'].map((level) => ({
    id: `${word.id}-${level}`,
    familyId: word.id,
    wordId: word.id,
    topic: 'vocabulary',
    level,
    prompt: word.uk,
    hint: 'Напиши початкову форму польською.',
    answers: [word.base],
    ...(level === 'choice' ? { options: [word.base, ...distractors] } : {}),
    explanation: `${word.form} → ${word.base} — ${word.uk}. ${word.kind}.`,
  }));
});

export const allExercises = [
  ...grammarExercises,
  ...historyExercises,
  ...cultureQuestions,
  ...wordExercises,
];
