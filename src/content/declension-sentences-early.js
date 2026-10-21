import {
  declensionExtraEarly,
  declensionExtraEarlyTranslations,
} from './declension-extra-early.js';

const sentences = {
  mianownik: [
    ['wall-clock', 'На стіні висить старий годинник.', 'Stary zegar wisi na ścianie.'],
    [
      'cousin-arrives',
      'За мить приїде моя двоюрідна сестра.',
      'Moja kuzynka przyjedzie za chwilę.',
    ],
    ['child-sleeps', 'У ліжечку спить маленька дитина.', 'Małe dziecko śpi w łóżeczku.'],
    [
      'drivers-wait',
      'Перед гаражем чекають досвідчені водії.',
      'Doświadczeni kierowcy czekają przed garażem.',
    ],
    ['trees-grow', 'Біля озера ростуть високі дерева.', 'Wysokie drzewa rosną nad jeziorem.'],
    ['cats-rest', 'На дивані відпочивають чорні коти.', 'Czarne koty odpoczywają na kanapie.'],
    ['man-enters', 'До ліфта заходить молодий чоловік.', 'Młody mężczyzna wchodzi do windy.'],
    [
      'people-live',
      'У цьому багатоквартирному будинку живуть добрі люди.',
      'Dobrzy ludzie mieszkają w tym bloku.',
    ],
    [
      'museum-opens',
      'У суботу буде відкрито новий музей.',
      'Nowe muzeum zostanie otwarte w sobotę.',
    ],
    ['children-play', 'На подвір’ї граються маленькі діти.', 'Małe dzieci bawią się na podwórku.'],
    ['tea-cools', 'У чашці холоне зелений чай.', 'Zielona herbata stygnie w filiżance.'],
    [
      'students-practise',
      'У лабораторії вправляються нові студентки.',
      'Nowe studentki ćwiczą w laboratorium.',
    ],
  ],
  dopelniacz: [
    [
      'without-hot-water',
      'Сьогодні ми миємо посуд без гарячої води.',
      'Myjemy dzisiaj naczynia bez gorącej wody.',
      'Dzisiaj my myjemy naczynia bez gorącej wody.',
    ],
    ['forest-path', 'Ця стежка веде до старого лісу.', 'Do starego lasu prowadzi ta ścieżka.'],
    [
      'missing-dog',
      'Від ранку я шукаю маленького пса.',
      'Szukam małego psa od rana.',
      'Od rana ja szukam małego psa.',
    ],
    [
      'advice-needed',
      'Перед розмовою мені потрібна добра порада.',
      'Potrzebuję dobrej rady przed rozmową.',
      'Przed rozmową ja potrzebuję dobrej rady.',
    ],
    [
      'unused-radio',
      'Вечорами я не користуюся новим радіо.',
      'Nie używam nowego radia wieczorami.',
      'Wieczorami ja nie używam nowego radia.',
    ],
    [
      'message-from-man',
      'Я отримала повідомлення від молодого чоловіка.',
      'Ja dostałam wiadomość od młodego mężczyzny.',
      'Od młodego mężczyzny dostałam wiadomość.',
    ],
    [
      'five-eggs',
      'Для тіста нам потрібні п’ять свіжих яєць.',
      'Potrzebujemy pięciu świeżych jajek do ciasta.',
      'Do ciasta my potrzebujemy pięciu świeżych jajek.',
    ],
    [
      'many-free-seats',
      'В останньому ряду є багато вільних місць.',
      'Dużo wolnych miejsc jest w ostatnim rzędzie.',
    ],
    [
      'without-good-shoes',
      'Не вирушай у гори без доброго взуття.',
      'Bez dobrych butów nie wyruszaj w góry.',
      'Nie wyruszaj bez dobrych butów w góry.',
    ],
    [
      'parents-at-station',
      'На вокзалі я шукаю моїх батьків.',
      'Szukam moich rodziców na dworcu.',
      'Na dworcu ja szukam moich rodziców.',
    ],
    ['no-children', 'У цій групі немає маленьких дітей.', 'Nie ma małych dzieci w tej grupie.'],
    ['for-good-people', 'Це нагорода для добрих людей.', 'To jest nagroda dla dobrych ludzi.'],
  ],
  celownik: [
    [
      'elderly-gentleman',
      'Я допомагаю літньому панові зайти до автобуса.',
      'Ja pomagam starszemu panu wejść do autobusu.',
      'Starszemu panu pomagam wejść do autobusu.',
    ],
    [
      'doctor-thanks',
      'Я дякую милій лікарці за турботу.',
      'Ja dziękuję miłej lekarce za opiekę.',
      'Za opiekę dziękuję miłej lekarce.',
    ],
    [
      'building-observed',
      'Я з цікавістю придивляюся до нового будинку.',
      'Przyglądam się nowemu budynkowi z zaciekawieniem.',
      'Z zaciekawieniem ja przyglądam się nowemu budynkowi.',
    ],
    [
      'animal-help',
      'Ветеринар допомагає маленькій тварині.',
      'Małemu zwierzęciu pomaga weterynarz.',
    ],
    [
      'father-parcel',
      'Я передаю моєму батькові посилку.',
      'Ja przekazuję mojemu ojcu paczkę.',
      'Przekazuję paczkę mojemu ojcu.',
    ],
    [
      'hungry-dog',
      'Я даю голодному псові миску корму.',
      'Ja daję głodnemu psu miskę karmy.',
      'Daję miskę karmy głodnemu psu.',
    ],
    [
      'neighbours-wishes',
      'Ми бажаємо новим сусідам спокійних вихідних.',
      'My życzymy nowym sąsiadom spokojnego weekendu.',
      'Nowym sąsiadom życzymy spokojnego weekendu.',
    ],
    [
      'sisters-postcards',
      'Я надсилаю моїм сестрам листівки з морського узбережжя.',
      'Ja przesyłam moim siostrom pocztówki znad morza.',
      'Przesyłam pocztówki znad morza moim siostrom.',
    ],
    [
      'trees-observed',
      'Садівник придивляється до високих дерев.',
      'Wysokim drzewom przygląda się ogrodnik.',
    ],
    [
      'children-story',
      'Бабуся розповідає маленьким дітям казку.',
      'Babcia opowiada bajkę małym dzieciom.',
      'Małym dzieciom babcia opowiada bajkę.',
    ],
    [
      'elderly-people-seats',
      'Ми поступаємося літнім людям місцем у трамваї.',
      'My ustępujemy starszym ludziom miejsca w tramwaju.',
      'W tramwaju ustępujemy starszym ludziom miejsca.',
    ],
    [
      'colleagues-gratitude',
      'Я вдячна добрим колежанкам за підтримку.',
      'Ja jestem wdzięczna dobrym koleżankom za wsparcie.',
      'Za wsparcie jestem wdzięczna dobrym koleżankom.',
    ],
  ],
  biernik: [
    [
      'feeding-cat',
      'Щодня я годую маленького кота.',
      'Karmię małego kota codziennie.',
      'Codziennie ja karmię małego kota.',
    ],
    [
      'visiting-doctor',
      'Сьогодні я відвідую нового лікаря.',
      'Odwiedzam dziś nowego lekarza.',
      'Dziś ja odwiedzam nowego lekarza.',
    ],
    [
      'repairing-bicycle',
      'У гаражі я ремонтую старий велосипед.',
      'Naprawiam stary rower w garażu.',
      'W garażu ja naprawiam stary rower.',
    ],
    [
      'ordering-tea',
      'У кав’ярні я замовляю гарячий чай.',
      'Zamawiam gorącą herbatę w kawiarni.',
      'W kawiarni ja zamawiam gorącą herbatę.',
    ],
    [
      'photographing-city',
      'З вежі я фотографую велике місто.',
      'Fotografuję duże miasto z wieży.',
      'Z wieży ja fotografuję duże miasto.',
    ],
    [
      'inviting-lady',
      'На зустріч я запрошую цю пані.',
      'Zapraszam tę panią na spotkanie.',
      'Na spotkanie ja zapraszam tę panią.',
    ],
    [
      'meeting-men',
      'Біля входу я зустрічаю молодих чоловіків.',
      'Spotykam młodych mężczyzn przy wejściu.',
      'Przy wejściu ja spotykam młodych mężczyzn.',
    ],
    [
      'seeing-people',
      'На зупинці я бачу старих людей.',
      'Widzę starych ludzi na przystanku.',
      'Na przystanku ja widzę starych ludzi.',
    ],
    [
      'buying-eggs',
      'На ринку я купую свіжі яйця.',
      'Kupuję świeże jajka na targu.',
      'Na targu ja kupuję świeże jajka.',
    ],
    [
      'cleaning-rooms',
      'Перед приїздом гостей я прибираю великі кімнати.',
      'Sprzątam duże pokoje przed przyjazdem gości.',
      'Przed przyjazdem gości ja sprzątam duże pokoje.',
    ],
    [
      'watching-children',
      'Через вікно я спостерігаю за маленькими дітьми.',
      'Obserwuję małe dzieci przez okno.',
      'Przez okno ja obserwuję małe dzieci.',
    ],
    [
      'walking-dogs',
      'Уранці я виводжу чорних псів.',
      'Wyprowadzam czarne psy rano.',
      'Rano ja wyprowadzam czarne psy.',
    ],
  ],
};

const choices = new Map(
  declensionExtraEarly
    .filter((item) => item.level === 'choice')
    .map((item) => [item.familyId, item]),
);

// Reuse the exact learning family, gap hint and analysis of each existing context.
export const declensionSentencesEarly = Object.entries(sentences).flatMap(([topic, rows]) =>
  rows.map(([key, prompt, ...alternatives]) => {
    const familyId = `declension-extra-${topic}-${key}`;
    const choice = choices.get(familyId);
    const sentence = choice.prompt.replace(/\s+\([^()]*\)$/u, '').replace('___', choice.answers[0]);
    return {
      id: `${familyId}-sentence`,
      familyId,
      topic,
      level: 'sentence',
      prompt,
      answers: [sentence, ...alternatives],
      hint: choice.prompt,
      explanation: choice.explanation,
    };
  }),
);

export const declensionSentencesEarlyTranslations = {
  pl: Object.fromEntries(
    declensionSentencesEarly.map((item) => [
      item.id,
      { explanation: declensionExtraEarlyTranslations.pl[`${item.familyId}-choice`].explanation },
    ]),
  ),
};
