import {
  topics as baseTopics,
  caseMatrix,
  grammarExercises as baseGrammarExercises,
} from '../grammar.js';
import { history, interview, historyExercises, cultureQuestions, sources } from '../karta.js';
import vocabulary from '../vocabulary.json' with { type: 'json' };
import { lessonTranslations as baseLessonTranslations } from './grammar-pl.js';
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
export const topics = [...baseTopics, verbTopic, spellingTopic];
export const grammarExercises = [...baseGrammarExercises, ...verbExercises, ...spellingExercises];
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
export { history, interview, historyExercises, cultureQuestions, sources };
export { vocabulary };

export const wordExercises = vocabulary.flatMap((word, index) => {
  // Different parts of speech keep synonyms and alternate senses out of choices.
  const distractors = [];
  for (let offset = 17; offset < vocabulary.length + 17 && distractors.length < 2; offset += 1) {
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
