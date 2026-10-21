const contexts = [
  [
    'miejscownik',
    'important-meeting',
    'Mówimy o ___. (ważne spotkanie)',
    [
      'ważnym spotkaniu',
      'ważne spotkanie',
      'ważnego spotkania',
      'ważnemu spotkaniu',
      'ważnym spotkaniem',
    ],
    'Mówimy o ważnym spotkaniu.',
    'Ми говоримо про важливу зустріч.',
    'Mówimy o czym? O ważnym spotkaniu. Przyimek o wymaga tutaj miejscownika.',
    'Говоримо про що? Про важливу зустріч. Прийменник o тут вимагає місцевого відмінка.',
  ],
  [
    'miejscownik',
    'kitchen-drawer',
    'Klucze leżą w ___. (kuchenna szuflada)',
    [
      'kuchennej szufladzie',
      'kuchenna szuflada',
      'kuchennej szuflady',
      'kuchenną szufladę',
      'kuchenną szufladą',
    ],
    'Klucze leżą w kuchennej szufladzie.',
    'Ключі лежать у кухонній шухляді.',
    'Leżą gdzie? W kuchennej szufladzie. W opisujące miejsce wymaga miejscownika.',
    'Лежать де? У кухонній шухляді. W зі значенням місця вимагає місцевого відмінка.',
  ],
  [
    'wolacz',
    'dear-daughter',
    '___, zadzwoń po przyjeździe! (kochana córka, wołacz)',
    ['Kochana córko', 'Kochana córka', 'Kochanej córki', 'Kochaną córkę', 'Kochaną córką'],
    'Kochana córko, zadzwoń po przyjeździe!',
    'Люба донько, зателефонуй після приїзду!',
    'Zwracamy się bezpośrednio do córki. Wołacz rzeczownika córka to córko.',
    'Звертаємося безпосередньо до доньки. Кличний відмінок іменника córka — córko.',
  ],
  [
    'wolacz',
    'mr-director',
    '___, proszę podpisać dokument. (pan dyrektor, wołacz)',
    ['Panie dyrektorze', 'Pan dyrektor', 'Pana dyrektora', 'Panu dyrektorowi', 'Panem dyrektorem'],
    'Panie dyrektorze, proszę podpisać dokument.',
    'Пане директоре, підпишіть, будь ласка, документ.',
    'W bezpośrednim formalnym zwrocie oba rzeczowniki mają wołacz: panie dyrektorze.',
    'У безпосередньому ввічливому звертанні обидва іменники мають кличний відмінок: panie dyrektorze.',
  ],
];

export const caseCompletionTranslations = { pl: {} };
export const caseCompletionExercises = contexts.flatMap(
  ([topic, slug, prompt, options, sentence, ukrainian, rulePl, ruleUk]) => {
    const familyId = `case-completion-${topic}-${slug}`;
    return ['choice', 'write', 'sentence'].map((level) => {
      const id = `${familyId}-${level}`;
      caseCompletionTranslations.pl[id] = {
        ...(level === 'sentence' ? { hint: prompt } : { prompt }),
        explanation: `${sentence} ${rulePl}`,
      };
      return {
        id,
        familyId,
        topic,
        level,
        prompt: level === 'sentence' ? ukrainian : prompt,
        answers: [level === 'sentence' ? sentence : options[0]],
        ...(level === 'choice' ? { options: [...options] } : {}),
        ...(level === 'sentence' ? { hint: prompt } : {}),
        explanation: `${sentence} ${ruleUk}`,
      };
    });
  },
);
