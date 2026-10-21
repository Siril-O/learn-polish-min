import originals from './original-history.json' with { type: 'json' };
import { completeHistory } from './content/history-complete.js';

const event = (year, title, pl, uk, source, note = '', date = '') => ({
  id: `history-${year}`,
  year,
  title,
  pl,
  uk,
  source,
  note,
  date,
  original: originals[year] || (year === '1999' ? originals['1998'] : ''),
});
const previousHistory = [
  event(
    '966',
    'Chrzest Polski',
    'Mieszko I przyjął chrzest w 966 roku. To ważny moment w początkach państwa polskiego.',
    'Мешко I прийняв хрещення 966 року. Це важлива подія на початку історії польської держави.',
    'https://zpe.gov.pl/a/w-panstwie-mieszka-i-i-boleslawa-chrobrego/D14jSIBi9',
    'Шлюб із Добравою зазвичай датують 965 роком, тому не об’єднуємо його з хрещенням в одну дату.',
  ),
  event(
    '1000',
    'Zjazd gnieźnieński',
    'W 1000 roku cesarz Otton III spotkał się z Bolesławem Chrobrym w Gnieźnie.',
    'У 1000 році імператор Оттон III зустрівся з Болеславом Хоробрим у Гнєзно.',
    'https://zpe.gov.pl/a/w-panstwie-mieszka-i-i-boleslawa-chrobrego/D14jSIBi9',
  ),
  event(
    '1025',
    'Pierwszy król Polski',
    'Bolesław Chrobry został pierwszym królem Polski w 1025 roku.',
    'Болеслав Хоробрий став першим королем Польщі 1025 року.',
    'https://zpe.gov.pl/a/boleslaw-chrobry---pierwszy-krol-polski/Dx1Usn8MO',
    'Оттон III помер 1002 року. Його не можна подавати як безпосереднього учасника коронації 1025 року.',
  ),
  event(
    '1410',
    'Bitwa pod Grunwaldem',
    '15 lipca 1410 roku wojska polsko-litewskie pokonały zakon krzyżacki pod Grunwaldem.',
    '15 липня 1410 року польсько-литовські війська перемогли Тевтонський орден під Грюнвальдом.',
    'https://zpe.gov.pl/a/jakie-znaczenie-miala-bitwa-grunwaldzka/Du6Jq8PmW',
    'Перемога не означала негайного припинення існування ордену.',
    '15 lipca 1410',
  ),
  event(
    '1569',
    'Unia lubelska',
    'W 1569 roku unia lubelska połączyła Polskę i Litwę w Rzeczpospolitą Obojga Narodów.',
    '1569 року Люблінська унія об’єднала Польщу й Литву в Річ Посполиту Обох Народів.',
    'https://zpe.gov.pl/a/rzeczpospolita-obojga-narodow/D1Fn6YhVv',
    'Не використовуємо твердження «найбільша держава Європи» з вихідного тексту.',
  ),
  event(
    '1683',
    'Odsiecz wiedeńska',
    'W 1683 roku Jan III Sobieski dowodził sprzymierzonymi wojskami w zwycięskiej bitwie pod Wiedniem.',
    '1683 року Ян III Собеський командував союзними військами у переможній битві під Віднем.',
    'https://orka.sejm.gov.pl/proc7.nsf/uchwaly/1132_u.htm',
  ),
  event(
    '1791',
    'Konstytucja 3 maja',
    '3 maja 1791 roku Sejm Wielki uchwalił konstytucję. Zniosła ona liberum veto.',
    '3 травня 1791 року Великий сейм ухвалив конституцію. Вона скасувала liberum veto.',
    'https://pamiecpolski.archiwa.gov.pl/konstytucja-3-maja-1791/',
    'Конституцію ухвалив сейм; формулювання «надана королем» неточне.',
    '3 maja 1791',
  ),
  event(
    '1918',
    'Odzyskanie niepodległości',
    'W 1918 roku Polska odzyskała niepodległość po zaborach. Narodowe Święto Niepodległości obchodzimy 11 listopada.',
    '1918 року Польща відновила незалежність після поділів. Національне свято незалежності відзначають 11 листопада.',
    'https://niepodlegla.dzieje.pl/wydarzenie/walka-o-niepodleglosc-polski-1914-1918-kalendarium',
  ),
  event(
    '1939',
    'Początek II wojny światowej',
    '1 września 1939 roku Niemcy zaatakowały Polskę. 17 września od wschodu zaatakował Związek Sowiecki.',
    '1 вересня 1939 року Німеччина напала на Польщу. 17 вересня зі сходу напав Радянський Союз.',
    'https://www.gov.pl/web/niemcy/80-rocznica-wybuchu-ii-wojny-swiatowej',
    '',
    '1 września 1939',
  ),
  event(
    '1944',
    'Powstanie warszawskie',
    'Powstanie warszawskie rozpoczęło się 1 sierpnia 1944 roku i zakończyło 2 października. Było walką z niemiecką okupacją.',
    'Варшавське повстання почалося 1 серпня 1944 року й завершилося 2 жовтня. Це була боротьба проти німецької окупації.',
    'https://www.1944.pl/artykul/powstanie-warszawskie,4317.html',
    'Не плутай з повстанням у Варшавському гетто 1943 року.',
    '1 sierpnia 1944',
  ),
  event(
    '1978',
    'Wybór Jana Pawła II',
    '16 października 1978 roku Karol Wojtyła został wybrany papieżem. Przyjął imię Jan Paweł II.',
    '16 жовтня 1978 року Кароля Войтилу обрали папою. Він узяв ім’я Ян Павло II.',
    'https://www.gov.pl/web/uw-mazowiecki/dzien-papieza-jana-pawla-ii',
    'У наданому тексті помилково вказано 6 жовтня. Правильно: 16 жовтня.',
    '16 października 1978',
  ),
  event(
    '1999',
    'Polska w NATO',
    '12 marca 1999 roku Polska przystąpiła do NATO.',
    '12 березня 1999 року Польща вступила до НАТО.',
    'https://www.gov.pl/web/nato/polska-w-nato-rp',
    'У наданому тексті стоїть 1998 рік. Правильна дата вступу — 12 березня 1999 року.',
    '12 marca 1999',
  ),
  event(
    '2004',
    'Polska w Unii Europejskiej',
    '1 maja 2004 roku Polska została członkiem Unii Europejskiej.',
    '1 травня 2004 року Польща стала членом Європейського Союзу.',
    'https://dziennikurzedowy.msz.gov.pl/resource/piec_lat_polski_w_unii_europejskiej.pdf',
    '',
    '1 maja 2004',
  ),
];

export const history = completeHistory(previousHistory);

export const interview = [
  {
    id: 'intro',
    category: 'Про себе',
    q: 'Proszę opowiedzieć o sobie.',
    uk: 'Розкажіть про себе.',
    answer: 'Nazywam się … Mieszkam w … Pracuję jako … Uczę się języka polskiego, ponieważ …',
    tip: 'Підстав власні правдиві відомості. Професія після pracuję jako тут у називному: jako nauczyciel.',
  },
  {
    id: 'family',
    category: 'Про себе',
    q: 'Jakie ma Pan / Pani polskie korzenie?',
    uk: 'Яке у вас польське коріння?',
    answer: 'Moja babcia / mój dziadek pochodzi z … W mojej rodzinie …',
    tip: 'Опиши лише власну сімейну історію. Якщо маєш іншу підставу звернення, поясни її своїми словами.',
  },
  {
    id: 'language',
    category: 'Про себе',
    q: 'Dlaczego uczy się Pan / Pani polskiego?',
    uk: 'Чому ви вивчаєте польську?',
    answer: 'Uczę się polskiego, żeby lepiej poznawać polską kulturę i rozmawiać z …',
    tip: 'Після uczyć się — родовий: polskiego. Це шаблон для особистої відповіді.',
  },
  {
    id: 'traditions',
    category: 'Традиції',
    q: 'Jakie polskie tradycje zna Pan / Pani?',
    uk: 'Які польські традиції ви знаєте?',
    answer:
      'Znam tradycję dzielenia się opłatkiem podczas Wigilii oraz święcenia pokarmów przed Wielkanocą.',
    tip: 'Додай, які традиції справді підтримуєш у своїй родині.',
  },
  {
    id: 'wigilia',
    category: 'Традиції',
    q: 'Kiedy jest Wigilia i co wtedy robimy?',
    uk: 'Коли Святвечір і що тоді роблять?',
    answer:
      'Wigilia jest 24 grudnia. W wielu rodzinach dzielimy się opłatkiem, składamy życzenia i jemy wspólną kolację.',
    tip: 'Wigilia — 24 грудня; Boże Narodzenie — 25 грудня.',
  },
  {
    id: 'easter',
    category: 'Традиції',
    q: 'Jakie są tradycje wielkanocne?',
    uk: 'Які є великодні традиції?',
    answer:
      'Do tradycji należą święcenie pokarmów w Wielką Sobotę, pisanki i śmigus-dyngus w Poniedziałek Wielkanocny.',
    tip: 'Pisanka — розписане яйце. Śmigus-dyngus — звичай обливання водою.',
  },
  {
    id: 'flag',
    category: 'Символи',
    q: 'Jakie kolory ma polska flaga?',
    uk: 'Які кольори має польський прапор?',
    answer: 'Polska flaga jest biało-czerwona. Biały pas jest na górze, a czerwony na dole.',
    tip: 'Не змінюй порядок: білий угорі, червоний унизу.',
  },
  {
    id: 'emblem',
    category: 'Символи',
    q: 'Co przedstawia godło Polski?',
    uk: 'Що зображено на гербі Польщі?',
    answer: 'Godło Polski przedstawia białego orła w złotej koronie na czerwonym tle.',
    tip: 'Orzeł → orła: тут знахідний відмінок.',
  },
  {
    id: 'anthem',
    category: 'Символи',
    q: 'Jak nazywa się polski hymn?',
    uk: 'Як називається польський гімн?',
    answer: 'Polski hymn nazywa się Mazurek Dąbrowskiego. Autorem słów jest Józef Wybicki.',
    tip: 'Вимов назву вголос і окремо потренуй ім’я автора.',
  },
  {
    id: 'may',
    category: 'Свята',
    q: 'Co świętujemy 3 maja?',
    uk: 'Що святкують 3 травня?',
    answer:
      '3 maja obchodzimy Święto Narodowe Trzeciego Maja, związane z uchwaleniem konstytucji w 1791 roku.',
    tip: 'Дата свята і рік історичної події — різні частини відповіді.',
  },
  {
    id: 'november',
    category: 'Свята',
    q: 'Kiedy obchodzimy Narodowe Święto Niepodległości?',
    uk: 'Коли відзначають Національне свято незалежності?',
    answer:
      'Narodowe Święto Niepodległości obchodzimy 11 listopada. Upamiętnia odzyskanie niepodległości w 1918 roku.',
    tip: 'У даті назва місяця має родовий відмінок: listopada.',
  },
  {
    id: 'capital',
    category: 'Країна',
    q: 'Jaka jest stolica Polski?',
    uk: 'Яка столиця Польщі?',
    answer: 'Stolicą Polski jest Warszawa. Dawniej ważnymi ośrodkami władzy były Gniezno i Kraków.',
    tip: 'Stolicą є орудним: «столицею є…».',
  },
];

export const cultureQuestions = [
  [
    'flaga',
    'Jakie kolory ma flaga Polski?',
    'biały i czerwony',
    [
      'biały i czerwony',
      'niebieski i żółty',
      'biały i zielony',
      'czerwony i czarny',
      'niebieski i biały',
    ],
    'Польський прапор біло-червоний.',
  ],
  [
    'godlo',
    'Co przedstawia godło Polski?',
    'białego orła',
    ['białego orła', 'złotego lwa', 'białego bociana', 'czarnego orła', 'srebrnego sokoła'],
    'Герб зображує білого орла в золотій короні на червоному тлі.',
  ],
  [
    'hymn',
    'Jak nazywa się hymn Polski?',
    'Mazurek Dąbrowskiego',
    ['Mazurek Dąbrowskiego', 'Rota', 'Bogurodzica', 'Boże, coś Polskę', 'Warszawianka'],
    'Державний гімн — Mazurek Dąbrowskiego.',
  ],
  [
    'wigilia',
    'Kiedy jest Wigilia?',
    '24 grudnia',
    ['24 grudnia', '25 grudnia', '6 stycznia', '26 grudnia', '31 grudnia'],
    'Wigilia передує Різдву й припадає на 24 грудня.',
  ],
  [
    'stolica',
    'Jaka jest stolica Polski?',
    'Warszawa',
    ['Warszawa', 'Kraków', 'Gdańsk', 'Poznań', 'Gniezno'],
    'Сучасна столиця Польщі — Варшава.',
  ],
  [
    'niepodleglosc',
    'Kiedy jest Narodowe Święto Niepodległości?',
    '11 listopada',
    ['11 listopada', '3 maja', '1 sierpnia', '15 sierpnia', '1 września'],
    'Свято незалежності відзначають 11 листопада.',
  ],
  [
    'konstytucja',
    'Kiedy obchodzimy święto Konstytucji 3 maja?',
    '3 maja',
    ['3 maja', '2 maja', '1 maja', '11 listopada', '15 sierpnia'],
    'Назва свята прямо вказує на 3 травня.',
  ],
  [
    'pisanki',
    'Co to są pisanki?',
    'ozdobione jajka',
    [
      'ozdobione jajka',
      'potrawy wigilijne',
      'pieśni świąteczne',
      'palmy wielkanocne',
      'świąteczne wypieki',
    ],
    'Pisanki — розписані великодні яйця.',
  ],
].map(([id, prompt, answer, options, explanation]) => ({
  id: `culture-${id}`,
  familyId: `culture-${id}`,
  topic: 'culture',
  level: 'choice',
  prompt,
  answers: [answer],
  options,
  explanation,
}));

function historyChoices(item, index, field) {
  const choices = [item[field]];
  for (let offset = 1; offset < history.length && choices.length < 5; offset++) {
    const candidate = history[(index + offset) % history.length];
    if (candidate.year !== item.year && !choices.includes(candidate[field]))
      choices.push(candidate[field]);
  }
  return choices;
}

function historyWrittenAnswers(year) {
  const variants = [year, year.replace(/[–—]/gu, '-'), year.replace(/\s*[-–—]\s*/gu, '-')];
  if (year === 'Ok. 1550') variants.push('1550', 'około 1550', 'ok.1550', 'ok 1550');
  return [...new Set(variants)];
}

export const historyExercises = history.flatMap((item, index) => [
  {
    id: `${item.id}-year`,
    familyId: item.id,
    topic: 'history',
    historyCategory: item.category,
    level: 'choice',
    prompt: `Jaka data pasuje do tematu: ${item.title}?`,
    answers: [item.year],
    options: historyChoices(item, index, 'year'),
    explanation: `${item.pl} ${item.uk}`,
  },
  {
    id: `${item.id}-write`,
    familyId: item.id,
    topic: 'history',
    historyCategory: item.category,
    level: 'write',
    prompt: `Впиши дату: ${item.title}`,
    answers: historyWrittenAnswers(item.year),
    explanation: `${item.pl} ${item.uk}`,
  },
  {
    id: `${item.id}-event`,
    familyId: item.id,
    topic: 'history',
    historyCategory: item.category,
    level: 'event',
    prompt: `Który temat dokument opisuje przy dacie „${item.year}”?`,
    answers: [item.title],
    options: historyChoices(item, index, 'title'),
    explanation: item.uk,
  },
]);

export const sources = [
  [
    'Відмінювання іменників і прикметників · ZPE',
    'https://zpe.gov.pl/a/odmiana-rzeczownika-i-przymiotnika/DYAl4NsEf',
  ],
  ['Відмінки та форми іменників · ZPE', 'https://zpe.gov.pl/a/rzeczownik---odmiana/D47DhHUhR'],
  [
    'Карта поляка: співбесіда · Gov.pl',
    'https://www.gov.pl/web/lotwa/karta-polaka-informacje-ogolne',
  ],
  ['Національні символи · Gov.pl', 'https://www.gov.pl/web/mswia/szanujmy-symbole-narodowe'],
];
