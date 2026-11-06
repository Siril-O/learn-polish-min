export const impersonalSources = [
  { title: 'polski.info: Czasowniki', url: 'https://polski.info/grammar/verbs?hl=pl' },
  {
    title: 'ZPE: Incognito, czyli formy -no i -to',
    url: 'https://zpe.gov.pl/a/incognito-czyli-formy--no-i--to/D19iXyHIF',
  },
];

const table = [
  ['się', 'czyta się', 'czytało się', 'będzie się czytać / będzie się czytało'],
  ['się', 'pracuje się', 'pracowało się', 'będzie się pracować / będzie się pracowało'],
  ['się', 'mówi się', 'mówiło się', 'będzie się mówić / będzie się mówiło'],
  ['-no/-to', '—', 'napisano, otwarto, umyto', '—'],
  ['trzeba', 'trzeba czekać', 'trzeba było czekać', 'trzeba będzie czekać'],
  ['można', 'można wejść', 'można było wejść', 'można będzie wejść'],
  ['warto', 'warto czytać', 'warto było czytać', 'warto będzie czytać'],
  ['wolno', 'wolno parkować', 'wolno było parkować', 'wolno będzie parkować'],
  ['nie wolno', 'nie wolno palić', 'nie wolno było palić', 'nie wolno będzie palić'],
  ['należy', 'należy poczekać', 'należało poczekać', 'będzie należało poczekać'],
];

export const impersonalTopic = {
  id: 'impersonal',
  title: 'Безособові конструкції',
  group: 'Дієслова',
  subtitle: 'się, -no/-to, trzeba та można: дія без названого виконавця.',
  rules: [
    'Безособове речення не називає конкретного виконавця: W bibliotece czyta się książki. Не плутай з особовим Anna uczy się: тут підмет — Anna.',
    'Теперішній: 3-тя особа однини + się. Минулий: форма середнього роду однини + się. Майбутній недоконаного виду: będzie + się + інфінітив або форма на -ło.',
    'Форми на -no/-to повідомляють про минулі дії. Не додавай до них się чи było. Для теперішнього й майбутнього обирай іншу конструкцію.',
    'Trzeba, można, warto, wolno поєднуються з інфінітивом. Час змінюють слова było / będzie; należy має форму należało.',
    'Доконаний вид не має теперішнього часу: zrobi się — майбутня завершена дія; robi się — теперішня. У вправах із się тут використовуємо недоконаний вид.',
  ],
  columns: ['Конструкція', 'Теперішній', 'Минулий', 'Майбутній'],
  table,
  warning:
    'Правильно: pracowało się, не pracowali się; otwarto, не otwarto się. Водночас Drzwi się otworzyły означає «Двері відчинилися» і має підмет drzwi. Безособова форма не те саме, що пасивна: List został napisany має підмет list.',
  examples: [
    ['W tej sali rozmawia się cicho.', 'У цій залі розмовляють тихо.'],
    ['Dawniej płaciło się tutaj gotówką.', 'Раніше тут платили готівкою.'],
    ['Od jutra będzie się tutaj przyjmować wnioski.', 'Від завтра тут прийматимуть заяви.'],
    ['Wczoraj zamknięto bibliotekę.', 'Учора закрили бібліотеку.'],
    ['Jutro trzeba będzie przynieść dokument.', 'Завтра потрібно буде принести документ.'],
    ['Wczoraj można było odebrać paszport.', 'Учора можна було забрати паспорт.'],
  ],
  sources: impersonalSources,
  drills: [],
  exerciseLevels: ['choice', 'write'],
};

export const impersonalLessonTranslations = {
  pl: {
    impersonal: {
      subtitle: 'się, -no/-to, trzeba i można: czynność bez wskazania wykonawcy.',
      rules: [
        'Nie wskazujemy konkretnego wykonawcy: W bibliotece czyta się książki. Anna uczy się to zdanie osobowe: podmiotem jest Anna.',
        'Teraz: 3. osoba liczby pojedynczej + się. W przeszłości: rodzaj nijaki liczby pojedynczej + się. W przyszłości niedokonanej: będzie + się + bezokolicznik lub forma na -ło.',
        'Formy -no/-to odnoszą się do przeszłości. Nie dodawaj do nich się ani było. W innych czasach zmień konstrukcję.',
        'Trzeba, można, warto, wolno łączą się z bezokolicznikiem. Dodaj było lub będzie, aby zmienić czas. Należy ma formę przeszłą należało.',
        'Czasownik dokonany nie ma czasu teraźniejszego: zrobi się oznacza przyszły rezultat, robi się — teraźniejszość. Ćwiczenia z się dotyczą tutaj czasowników niedokonanych.',
      ],
      columns: ['Konstrukcja', 'Teraźniejszość', 'Przeszłość', 'Przyszłość'],
      table,
      warning:
        'Poprawnie: pracowało się, nie pracowali się; otwarto, nie otwarto się. Drzwi się otworzyły ma podmiot drzwi. Konstrukcja bezosobowa to nie to samo co strona bierna: List został napisany ma podmiot list.',
    },
  },
};

// Original practice sentences; explicit forms avoid guessing irregular stems.
const verbs = [
  ['read', 'czytać', 'czyta', 'czytało', 'czytano', 'w czytelni gazety'],
  ['write', 'pisać', 'pisze', 'pisało', 'pisano', 'w biurze raporty'],
  ['speak', 'mówić', 'mówi', 'mówiło', 'mówiono', 'na spotkaniu po polsku'],
  ['work', 'pracować', 'pracuje', 'pracowało', 'pracowano', 'w fabryce na dwie zmiany'],
  ['wait', 'czekać', 'czeka', 'czekało', 'czekano', 'przed gabinetem'],
  ['pay', 'płacić', 'płaci', 'płaciło', 'płacono', 'w sklepie kartą'],
  ['buy', 'kupować', 'kupuje', 'kupowało', 'kupowano', 'na targu warzywa'],
  ['sell', 'sprzedawać', 'sprzedaje', 'sprzedawało', 'sprzedawano', 'w kiosku bilety'],
  ['cook', 'gotować', 'gotuje', 'gotowało', 'gotowano', 'w stołówce zupę'],
  ['drink', 'pić', 'pije', 'piło', 'pito', 'podczas przerwy herbatę'],
  ['eat', 'jeść', 'je', 'jadło', 'jedzono', 'w restauracji ryby'],
  ['wash', 'myć', 'myje', 'myło', 'myto', 'w kuchni naczynia'],
  ['clean', 'sprzątać', 'sprząta', 'sprzątało', 'sprzątano', 'w szkole korytarze'],
  ['open', 'otwierać', 'otwiera', 'otwierało', 'otwierano', 'w sali okna'],
  ['close', 'zamykać', 'zamyka', 'zamykało', 'zamykano', 'w muzeum drzwi o osiemnastej'],
  ['build', 'budować', 'buduje', 'budowało', 'budowano', 'w mieście nowe domy'],
  ['organize', 'organizować', 'organizuje', 'organizowało', 'organizowano', 'w klubie koncerty'],
  ['send', 'wysyłać', 'wysyła', 'wysyłało', 'wysyłano', 'z biura listy'],
  ['accept', 'przyjmować', 'przyjmuje', 'przyjmowało', 'przyjmowano', 'w urzędzie wnioski'],
  ['discuss', 'rozmawiać', 'rozmawia', 'rozmawiało', 'rozmawiano', 'na lekcji o historii'],
];
const tenseLabels = {
  present: ['Obecnie', 'czas teraźniejszy', 'теперішній час'],
  past: ['Dawniej', 'czas przeszły', 'минулий час'],
  future: ['W przyszłym roku', 'czas przyszły', 'майбутній час'],
};
const rows = [];
for (const [id, infinitive, present, past, noTo, context] of verbs) {
  for (const [tense, [time, pl, uk]] of Object.entries(tenseLabels)) {
    const forms = {
      present: `${present} się`,
      past: `${past} się`,
      future: `będzie się ${infinitive}`,
    };
    const answer = forms[tense];
    rows.push({
      id: `${id}-${tense}`,
      tense,
      construction: 'sie',
      prompt: `${time} ___ ${context}. (${infinitive})`,
      instruction: {
        pl: `Użyj konstrukcji bezosobowej z się: ${pl}.`,
        uk: `Ужий безособову конструкцію з się: ${uk}.`,
      },
      answers:
        tense === 'future'
          ? [answer, `będzie ${infinitive} się`, `będzie się ${past}`, `będzie ${past} się`]
          : [answer, `się ${tense === 'present' ? present : past}`],
      options: [
        answer,
        ...Object.values(forms).filter((form) => form !== answer),
        `${noTo} się`,
        `będą się ${infinitive}`,
      ],
      explanation: {
        pl: `${pl}: ${answer}. Nie wskazujemy wykonawcy.`,
        uk: `${uk}: ${answer}. Не називаємо виконавця.`,
      },
    });
  }
  rows.push({
    id: `${id}-no-to`,
    tense: 'past',
    construction: 'no-to',
    prompt: `Dawniej ___ ${context}. (${infinitive})`,
    instruction: { pl: 'Użyj formy na -no/-to, bez się.', uk: 'Ужий форму на -no/-to, без się.' },
    answers: [noTo],
    options: [noTo, `${noTo} się`, `${past} się`, present, `będzie ${noTo}`],
    explanation: {
      pl: `${infinitive} → ${noTo}. Forma odnosi się do przeszłości; nie dodajemy się ani będzie.`,
      uk: `${infinitive} → ${noTo}. Форма описує минуле; не додаємо się або będzie.`,
    },
  });
}

const modals = [
  ['need', 'trzeba', 'trzeba', 'trzeba było', 'trzeba będzie', 'przynieść dokument'],
  ['possible', 'można', 'można', 'można było', 'można będzie', 'odebrać paszport'],
  ['worth', 'warto', 'warto', 'warto było', 'warto będzie', 'zwiedzić to muzeum'],
  ['allowed', 'wolno', 'wolno', 'wolno było', 'wolno będzie', 'parkować przed budynkiem'],
  ['forbidden', 'nie wolno', 'nie wolno', 'nie wolno było', 'nie wolno będzie', 'palić na dworcu'],
  ['ought', 'należy', 'należy', 'należało', 'będzie należało', 'wypełnić formularz'],
];
for (const [id, cue, present, past, future, context] of modals) {
  for (const [tense, [time, pl, uk]] of Object.entries(tenseLabels)) {
    const forms = { present, past, future };
    const answer = forms[tense];
    rows.push({
      id: `${id}-${tense}`,
      tense,
      construction: 'modal',
      prompt: `${time} ___ ${context}. (${cue})`,
      instruction: {
        pl: `Zachowaj podane wyrażenie; użyj odpowiedniego czasu: ${pl}.`,
        uk: `Збережи вказаний вислів; ужий відповідний час: ${uk}.`,
      },
      answers: [
        answer,
        ...(tense === 'past' && cue !== 'należy' ? [`było ${cue}`] : []),
        ...(tense === 'future' ? [cue === 'należy' ? 'należało będzie' : `będzie ${cue}`] : []),
      ],
      options: [
        answer,
        ...Object.values(forms).filter((form) => form !== answer),
        `${cue} byli`,
        `${cue} będą`,
      ],
      explanation: {
        pl: `${cue}: ${present} → ${past} → ${future}. Po tej konstrukcji zostaje bezokolicznik.`,
        uk: `${cue}: ${present} → ${past} → ${future}. Після конструкції залишається інфінітив.`,
      },
    });
  }
}

export const impersonalExercises = rows.flatMap((row) =>
  ['choice', 'write'].map((level) => ({
    id: `impersonal-${row.id}-${level}`,
    familyId: `impersonal-${row.id}`,
    topic: 'impersonal',
    tense: row.tense,
    construction: row.construction,
    level,
    prompt: `${row.instruction.uk} ${row.prompt}`,
    answers: level === 'choice' ? [row.answers[0]] : row.answers,
    ...(level === 'choice' ? { options: row.options } : {}),
    explanation: row.explanation.uk,
  })),
);
export const impersonalExerciseTranslations = {
  pl: Object.fromEntries(
    rows.flatMap((row) =>
      ['choice', 'write'].map((level) => [
        `impersonal-${row.id}-${level}`,
        { prompt: `${row.instruction.pl} ${row.prompt}`, explanation: row.explanation.pl },
      ]),
    ),
  ),
};
