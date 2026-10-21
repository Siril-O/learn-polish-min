import { casesExpansionEarly } from './cases-expansion-early.js';
import { casesExpansionMiddle } from './cases-expansion-middle.js';
import { casesExpansionVocative } from './cases-expansion-vocative.js';
import { casesExpansionGenitive } from './cases-expansion-genitive.js';

export const expandedCaseContexts = {
  ...casesExpansionEarly,
  ...casesExpansionMiddle,
  ...casesExpansionVocative,
  ...casesExpansionGenitive,
};
export const expandedCaseTranslations = { pl: {} };
export const expandedCaseExercises = Object.entries(expandedCaseContexts).flatMap(([topic, rows]) =>
  rows.flatMap(
    ([slug, prompt, options, sentence, ukrainian, rulePl, ruleUk, alternatives = []]) => {
      const familyId = `cases-expanded-${topic}-${slug}`;
      return ['choice', 'write', 'sentence'].map((level) => {
        const id = `${familyId}-${level}`;
        expandedCaseTranslations.pl[id] = {
          ...(level === 'sentence' ? { hint: prompt } : { prompt }),
          explanation: `${sentence} ${rulePl}`,
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
