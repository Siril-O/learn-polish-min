import { basicFoundations } from './basic-foundations.js';
import { basicTenses } from './basic-tenses.js';
import { basicConstructions } from './basic-constructions.js';

export const basicContexts = { ...basicFoundations, ...basicTenses, ...basicConstructions };
export const basicExerciseTranslations = { pl: {} };
export const basicExercises = Object.entries(basicContexts).flatMap(([topic, rows]) =>
  rows.flatMap(
    ([slug, prompt, options, sentence, ukrainian, rulePl, ruleUk, alternatives = []]) => {
      const familyId = `basic-${topic}-${slug}`;
      return ['choice', 'write', 'sentence'].map((level) => {
        const id = `${familyId}-${level}`;
        basicExerciseTranslations.pl[id] = {
          ...(level !== 'sentence' ? { prompt } : {}),
          explanation: `${sentence} ${rulePl}`,
          ...(level === 'sentence' ? { hint: prompt } : {}),
        };
        return {
          id,
          familyId,
          topic,
          level,
          prompt: level === 'sentence' ? ukrainian : prompt,
          answers: level === 'sentence' ? [sentence, ...alternatives] : [options[0]],
          ...(level === 'choice' ? { options: [...options] } : {}),
          ...(level === 'sentence' ? { hint: prompt } : {}),
          explanation: `${sentence} ${ruleUk}`,
        };
      });
    },
  ),
);
