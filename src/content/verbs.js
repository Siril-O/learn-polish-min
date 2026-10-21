export const verbSources = [
  { title: 'polski.info: Czasowniki', url: 'https://polski.info/grammar/verbs?hl=pl' },
  {
    title: 'ZPE: Czas, czyli jak w gramatyce opowiadamy o zdarzeniach',
    url: 'https://zpe.gov.pl/a/czas-czyli-jak-w-gramatyce-opowiadamy-o-zdarzeniach/DsyN8dbte',
  },
  {
    title: 'WSJP PAN: jechać (samochodem)',
    url: 'https://wsjp.pl/haslo/podglad/19013/jechac/5048584/samochodem',
  },
];

const auxiliaries = ['będę', 'będziesz', 'będzie', 'będziemy', 'będziecie', 'będą'];

// All five participles are authored explicitly; only regular person endings are added.
function pastForms([masculine, feminine, neuter, masculinePlural, femininePlural], reflexive) {
  const finish = (form) => (reflexive ? `${form} się` : form);
  return {
    masculine: [
      `${masculine}em`,
      `${masculine}eś`,
      masculine,
      `${masculinePlural}śmy`,
      `${masculinePlural}ście`,
      masculinePlural,
    ].map(finish),
    feminine: [
      `${feminine}m`,
      `${feminine}ś`,
      feminine,
      `${femininePlural}śmy`,
      `${femininePlural}ście`,
      femininePlural,
    ].map(finish),
    neuter: finish(neuter),
  };
}

const aspect = (partner, pl, uk) => ({ partner, note: { pl, uk } });
const government = (construction, question, example, pl, uk) => ({
  construction,
  question,
  example,
  case: { pl, uk },
});
const notes = (pl, uk) => ({ pl, uk });

function verb(
  id,
  infinitive,
  uk,
  present,
  participles,
  aspect,
  government,
  notes,
  reflexive = false,
) {
  return {
    id,
    infinitive,
    uk,
    present: present.map((form) => (reflexive ? `${form} się` : form)),
    past: pastForms(participles, reflexive),
    future:
      infinitive === 'być' ? [...auxiliaries] : auxiliaries.map((form) => `${form} ${infinitive}`),
    aspect,
    government,
    notes,
  };
}

export const verbs = [
  verb(
    'verb-byc',
    'być',
    'бути',
    ['jestem', 'jesteś', 'jest', 'jesteśmy', 'jesteście', 'są'],
    ['był', 'była', 'było', 'byli', 'były'],
    aspect(
      null,
      'Niedokonany; brak jednej prostej pary dokonanej. Zostać oznacza zmianę stanu lub roli.',
      'Недоконаний; однієї простої доконаної пари немає. Zostać означає зміну стану або ролі.',
    ),
    [
      government(
        'być + nazwa zawodu',
        'Jestem kim?',
        'Jestem ratownikiem.',
        'narzędnik',
        'орудний',
      ),
      government(
        'być w + miejsce',
        'Jestem w czym?',
        'Jestem w ogrodzie.',
        'miejscownik',
        'місцевий',
      ),
    ],
    notes(
      'Przymiotnik po być: Jestem spokojny. Nazwa po to jest: To jest ratownik. Przyszłość bez bezokolicznika: będę.',
      'Прикметник після być: Jestem spokojny. Назва після to jest: To jest ratownik. Майбутній без інфінітива: będę.',
    ),
  ),
  verb(
    'verb-miec',
    'mieć',
    'мати',
    ['mam', 'masz', 'ma', 'mamy', 'macie', 'mają'],
    ['miał', 'miała', 'miało', 'mieli', 'miały'],
    aspect(
      null,
      'Niedokonany; brak jednej prostej pary dokonanej dla posiadania.',
      'Недоконаний; для значення володіння однієї простої доконаної пари немає.',
    ),
    [
      government('mieć + rzecz', 'Mam co?', 'Mam bilet miesięczny.', 'biernik', 'знахідний'),
      government('nie mieć + rzecz', 'Nie mam czego?', 'Nie mam biletu.', 'dopełniacz', 'родовий'),
    ],
    notes(
      'Zaprzeczenie zmienia przypadek dopełnienia: mam bilet → nie mam biletu.',
      'Заперечення змінює відмінок додатка: mam bilet → nie mam biletu.',
    ),
  ),
  verb(
    'verb-mowic',
    'mówić',
    'говорити',
    ['mówię', 'mówisz', 'mówi', 'mówimy', 'mówicie', 'mówią'],
    ['mówił', 'mówiła', 'mówiło', 'mówili', 'mówiły'],
    aspect(
      'powiedzieć',
      'Niedokonany; powiedzieć jest odpowiednikiem dla konkretnej wypowiedzi, nie dla każdej umiejętności mówienia.',
      'Недоконаний; powiedzieć є відповідником для конкретного висловлювання, а не для кожного значення мовлення.',
    ),
    [
      government(
        'mówić do + osoba',
        'Mówię do kogo?',
        'Mówię do koleżanki.',
        'dopełniacz',
        'родовий',
      ),
      government('mówić o + temat', 'Mówię o czym?', 'Mówię o podróży.', 'miejscownik', 'місцевий'),
    ],
    notes(
      'Język: mówię po polsku. Nie używaj formy mówi dla ja.',
      'Мова: mówię po polsku. Для ja не вживай форми mówi.',
    ),
  ),
  verb(
    'verb-czytac',
    'czytać',
    'читати',
    ['czytam', 'czytasz', 'czyta', 'czytamy', 'czytacie', 'czytają'],
    ['czytał', 'czytała', 'czytało', 'czytali', 'czytały'],
    aspect(
      'przeczytać',
      'Niedokonany; przeczytać podkreśla ukończenie czytania danego tekstu.',
      'Недоконаний; przeczytać підкреслює завершення читання певного тексту.',
    ),
    [
      government('czytać + tekst', 'Czytam co?', 'Czytam instrukcję.', 'biernik', 'знахідний'),
      government(
        'czytać o + temat',
        'Czytam o czym?',
        'Czytam o kosmosie.',
        'miejscownik',
        'місцевий',
      ),
    ],
    notes(
      'Czytam opisuje proces lub zwyczaj; nie potwierdza przeczytania tekstu do końca.',
      'Czytam описує процес або звичку; не підтверджує прочитання тексту до кінця.',
    ),
  ),
  verb(
    'verb-pisac',
    'pisać',
    'писати',
    ['piszę', 'piszesz', 'pisze', 'piszemy', 'piszecie', 'piszą'],
    ['pisał', 'pisała', 'pisało', 'pisali', 'pisały'],
    aspect(
      'napisać',
      'Niedokonany; napisać wskazuje gotowy tekst lub zakończone pisanie.',
      'Недоконаний; napisać позначає готовий текст або завершене написання.',
    ),
    [
      government('pisać + tekst', 'Piszę co?', 'Piszę wiadomość.', 'biernik', 'знахідний'),
      government(
        'pisać do + adresat',
        'Piszę do kogo?',
        'Piszę do siostry.',
        'dopełniacz',
        'родовий',
      ),
    ],
    notes(
      'Zapamiętaj wymianę: pisać → piszę, piszesz. W przeszłości: pisałem, pisaliśmy.',
      'Запам’ятай чергування: pisać → piszę, piszesz. У минулому: pisałem, pisaliśmy.',
    ),
  ),
  verb(
    'verb-robic',
    'robić',
    'робити',
    ['robię', 'robisz', 'robi', 'robimy', 'robicie', 'robią'],
    ['robił', 'robiła', 'robiło', 'robili', 'robiły'],
    aspect(
      'zrobić',
      'Niedokonany; zrobić wskazuje wykonanie zadania lub osiągnięcie rezultatu.',
      'Недоконаний; zrobić позначає виконання завдання або досягнення результату.',
    ),
    [
      government(
        'robić + czynność lub rzecz',
        'Robię co?',
        'Robię śniadanie.',
        'biernik',
        'знахідний',
      ),
    ],
    notes(
      'Robię to forma ja. Zrobię to przyszłość dokonana; będę robić to przyszłość niedokonana.',
      'Robię — форма ja. Zrobię — доконаний майбутній; będę robić — недоконаний майбутній.',
    ),
  ),
  verb(
    'verb-uczyc-sie',
    'uczyć się',
    'вчитися; вивчати',
    ['uczę', 'uczysz', 'uczy', 'uczymy', 'uczycie', 'uczą'],
    ['uczył', 'uczyła', 'uczyło', 'uczyli', 'uczyły'],
    aspect(
      'nauczyć się',
      'Niedokonany; nauczyć się podkreśla opanowanie określonej umiejętności lub materiału.',
      'Недоконаний; nauczyć się підкреслює опанування певної навички або матеріалу.',
    ),
    [
      government(
        'uczyć się + materiał',
        'Uczę się czego?',
        'Uczę się nowych słów.',
        'dopełniacz',
        'родовий',
      ),
    ],
    notes(
      'Zachowaj się w każdej formie. Uczyć kogoś i uczyć się mają różne znaczenia i składnię.',
      'Зберігай się в кожній формі. Uczyć kogoś та uczyć się мають різні значення й керування.',
    ),
    true,
  ),
  verb(
    'verb-mieszkac',
    'mieszkać',
    'мешкати; жити',
    ['mieszkam', 'mieszkasz', 'mieszka', 'mieszkamy', 'mieszkacie', 'mieszkają'],
    ['mieszkał', 'mieszkała', 'mieszkało', 'mieszkali', 'mieszkały'],
    aspect(
      null,
      'Niedokonany; zamieszkać oznacza rozpoczęcie mieszkania, a nie zwykłe zakończenie tej samej czynności.',
      'Недоконаний; zamieszkać означає початок проживання, а не звичайне завершення тієї самої дії.',
    ),
    [
      government(
        'mieszkać w + miejsce',
        'Mieszkam w czym?',
        'Mieszkam w kamienicy.',
        'miejscownik',
        'місцевий',
      ),
      government(
        'mieszkać u + osoba',
        'Mieszkam u kogo?',
        'Mieszkam u cioci.',
        'dopełniacz',
        'родовий',
      ),
    ],
    notes(
      'Miejsce: w kamienicy, na wsi, u cioci. Przypadek zależy także od przyimka.',
      'Місце: w kamienicy, na wsi, u cioci. Відмінок залежить також від прийменника.',
    ),
  ),
  verb(
    'verb-pracowac',
    'pracować',
    'працювати',
    ['pracuję', 'pracujesz', 'pracuje', 'pracujemy', 'pracujecie', 'pracują'],
    ['pracował', 'pracowała', 'pracowało', 'pracowali', 'pracowały'],
    aspect(
      null,
      'Niedokonany; brak jednej prostej pary. Popracować oznacza pracować przez pewien czas.',
      'Недоконаний; однієї простої пари немає. Popracować означає попрацювати певний час.',
    ),
    [
      government(
        'pracować nad + zadanie',
        'Pracuję nad czym?',
        'Pracuję nad projektem.',
        'narzędnik',
        'орудний',
      ),
      government(
        'pracować w + miejsce',
        'Pracuję w czym?',
        'Pracuję w szpitalu.',
        'miejscownik',
        'місцевий',
      ),
    ],
    notes(
      'W teraźniejszości -ować zmienia się w -uj-: pracuję. Przeszłość: pracowałem.',
      'У теперішньому -ować змінюється на -uj-: pracuję. Минулий: pracowałem.',
    ),
  ),
  verb(
    'verb-isc',
    'iść',
    'іти',
    ['idę', 'idziesz', 'idzie', 'idziemy', 'idziecie', 'idą'],
    ['szedł', 'szła', 'szło', 'szli', 'szły'],
    aspect(
      'pójść',
      'Niedokonany ruch pieszy w określonym kierunku. Pójść oznacza podjęcie takiego ruchu; nie gwarantuje dotarcia.',
      'Недоконаний піший рух у певному напрямку. Pójść означає початок такого руху; не гарантує прибуття.',
    ),
    [
      government('iść do + cel', 'Idę do czego?', 'Idę do apteki.', 'dopełniacz', 'родовий'),
      government('iść na + cel', 'Idę na co?', 'Idę na trening.', 'biernik', 'знахідний'),
    ],
    notes(
      'Ruch aktualny lub ukierunkowany. Nieregularna przeszłość: szedłem, szłam, szliśmy, szłyśmy.',
      'Поточний або спрямований рух. Нерегулярний минулий: szedłem, szłam, szliśmy, szłyśmy.',
    ),
  ),
  verb(
    'verb-chodzic',
    'chodzić',
    'ходити',
    ['chodzę', 'chodzisz', 'chodzi', 'chodzimy', 'chodzicie', 'chodzą'],
    ['chodził', 'chodziła', 'chodziło', 'chodzili', 'chodziły'],
    aspect(
      null,
      'Niedokonany; powtarzany lub nieukierunkowany ruch pieszy. Pochodzić ogranicza czas, nie jest uniwersalną parą.',
      'Недоконаний; повторюваний або неспрямований піший рух. Pochodzić обмежує час і не є універсальною парою.',
    ),
    [
      government(
        'chodzić do + cel',
        'Chodzę do czego?',
        'Chodzę do szkoły muzycznej.',
        'dopełniacz',
        'родовий',
      ),
      government(
        'chodzić po + teren',
        'Chodzę po czym?',
        'Chodzę po parku.',
        'miejscownik',
        'місцевий',
      ),
    ],
    notes(
      'Chodzę do pracy opisuje zwyczaj; idę do pracy opisuje konkretny ukierunkowany ruch.',
      'Chodzę do pracy описує звичку; idę do pracy — конкретний спрямований рух.',
    ),
  ),
  verb(
    'verb-jechac',
    'jechać',
    'їхати',
    ['jadę', 'jedziesz', 'jedzie', 'jedziemy', 'jedziecie', 'jadą'],
    ['jechał', 'jechała', 'jechało', 'jechali', 'jechały'],
    aspect(
      'pojechać',
      'Niedokonany ruch pojazdem w określonym kierunku. Pojechać ujmuje podjęcie podróży, nie samo dotarcie.',
      'Недоконаний рух транспортом у певному напрямку. Pojechać позначає вирушання в подорож, а не саме прибуття.',
    ),
    [
      government(
        'jechać + środek transportu',
        'Jadę czym?',
        'Jadę tramwajem.',
        'narzędnik',
        'орудний',
      ),
      government('jechać do + cel', 'Jadę do czego?', 'Jadę do muzeum.', 'dopełniacz', 'родовий'),
    ],
    notes(
      'Zapamiętaj dwa tematy: jadę, jadą, ale jedziesz. Przeszłość: jechałem, jechałam.',
      'Запам’ятай дві основи: jadę, jadą, але jedziesz. Минулий: jechałem, jechałam.',
    ),
  ),
  verb(
    'verb-jezdzic',
    'jeździć',
    'їздити',
    ['jeżdżę', 'jeździsz', 'jeździ', 'jeździmy', 'jeździcie', 'jeżdżą'],
    ['jeździł', 'jeździła', 'jeździło', 'jeździli', 'jeździły'],
    aspect(
      null,
      'Niedokonany; powtarzany lub nieukierunkowany ruch pojazdem. Pojeździć ogranicza czas jazdy.',
      'Недоконаний; повторюваний або неспрямований рух транспортом. Pojeździć обмежує час їзди.',
    ),
    [
      government(
        'jeździć + środek transportu',
        'Jeżdżę czym?',
        'Jeżdżę rowerem.',
        'narzędnik',
        'орудний',
      ),
      government(
        'jeździć po + teren',
        'Jeżdżę po czym?',
        'Jeżdżę po mieście.',
        'miejscownik',
        'місцевий',
      ),
    ],
    notes(
      'Jeżdżę podkreśla zwyczaj lub wiele przejazdów. Jechać i jeździć są oba niedokonane.',
      'Jeżdżę підкреслює звичку або багато поїздок. Jechać та jeździć — обидва недоконані.',
    ),
  ),
  verb(
    'verb-jesc',
    'jeść',
    'їсти',
    ['jem', 'jesz', 'je', 'jemy', 'jecie', 'jedzą'],
    ['jadł', 'jadła', 'jadło', 'jedli', 'jadły'],
    aspect(
      'zjeść',
      'Niedokonany; zjeść oznacza spożycie określonej porcji lub posiłku.',
      'Недоконаний; zjeść означає спожити певну порцію або страву.',
    ),
    [
      government('jeść + potrawa', 'Jem co?', 'Jem zupę pomidorową.', 'biernik', 'знахідний'),
      government('nie jeść + potrawa', 'Nie jem czego?', 'Nie jem mięsa.', 'dopełniacz', 'родовий'),
    ],
    notes(
      'Nieregularne formy: jem, jedzą; jadłem, ale jedliśmy. Zachowuj polskie znaki.',
      'Нерегулярні форми: jem, jedzą; jadłem, але jedliśmy. Зберігай польські діакритичні знаки.',
    ),
  ),
  verb(
    'verb-pic',
    'pić',
    'пити',
    ['piję', 'pijesz', 'pije', 'pijemy', 'pijecie', 'piją'],
    ['pił', 'piła', 'piło', 'pili', 'piły'],
    aspect(
      'wypić',
      'Niedokonany; wypić wskazuje spożycie określonej ilości napoju.',
      'Недоконаний; wypić позначає споживання певної кількості напою.',
    ),
    [
      government('pić + napój', 'Piję co?', 'Piję wodę mineralną.', 'biernik', 'знахідний'),
      government('nie pić + napój', 'Nie piję czego?', 'Nie piję kawy.', 'dopełniacz', 'родовий'),
    ],
    notes(
      'Teraźniejszość ma j: piję. Przeszłość bez j: piłem, piłam.',
      'Теперішній має j: piję. Минулий без j: piłem, piłam.',
    ),
  ),
  verb(
    'verb-kupowac',
    'kupować',
    'купувати',
    ['kupuję', 'kupujesz', 'kupuje', 'kupujemy', 'kupujecie', 'kupują'],
    ['kupował', 'kupowała', 'kupowało', 'kupowali', 'kupowały'],
    aspect(
      'kupić',
      'Niedokonany; kupić przedstawia zakup jako zakończone zdarzenie.',
      'Недоконаний; kupić представляє покупку як завершену подію.',
    ),
    [
      government(
        'kupować + rzecz',
        'Kupuję co?',
        'Kupuję świeże pieczywo.',
        'biernik',
        'знахідний',
      ),
      government(
        'kupować dla + osoba',
        'Kupuję dla kogo?',
        'Kupuję prezent dla brata.',
        'dopełniacz',
        'родовий',
      ),
    ],
    notes(
      'Kupuję może opisywać zwyczaj lub trwający zakup. Kupiłem potwierdza dokonany zakup.',
      'Kupuję може описувати звичку або поточну покупку. Kupiłem підтверджує здійснену покупку.',
    ),
  ),
  verb(
    'verb-szukac',
    'szukać',
    'шукати',
    ['szukam', 'szukasz', 'szuka', 'szukamy', 'szukacie', 'szukają'],
    ['szukał', 'szukała', 'szukało', 'szukali', 'szukały'],
    aspect(
      null,
      'Niedokonany; poszukać oznacza podjąć szukanie lub szukać przez pewien czas. Znaleźć nazywa rezultat, nie sam proces.',
      'Недоконаний; poszukać означає почати пошук або шукати певний час. Znaleźć називає результат, а не сам процес.',
    ),
    [
      government('szukać + osoba', 'Szukam kogo?', 'Szukam lekarza.', 'dopełniacz', 'родовий'),
      government('szukać + rzecz', 'Szukam czego?', 'Szukam okularów.', 'dopełniacz', 'родовий'),
    ],
    notes(
      'Szukać wymaga dopełniacza także bez zaprzeczenia. Nie przenoś tu biernika z widzieć.',
      'Szukać вимагає родового навіть без заперечення. Не перенось сюди знахідний від widzieć.',
    ),
  ),
  verb(
    'verb-pomagac',
    'pomagać',
    'допомагати',
    ['pomagam', 'pomagasz', 'pomaga', 'pomagamy', 'pomagacie', 'pomagają'],
    ['pomagał', 'pomagała', 'pomagało', 'pomagali', 'pomagały'],
    aspect(
      'pomóc',
      'Niedokonany; pomóc przedstawia udzieloną pomoc jako konkretne zdarzenie.',
      'Недоконаний; pomóc представляє надану допомогу як конкретну подію.',
    ),
    [
      government('pomagać + osoba', 'Pomagam komu?', 'Pomagam sąsiadowi.', 'celownik', 'давальний'),
      government(
        'pomagać w + zadanie',
        'Pomagam w czym?',
        'Pomagam w nauce.',
        'miejscownik',
        'місцевий',
      ),
    ],
    notes(
      'Osoba otrzymująca pomoc: komu? Nie używaj biernika zamiast celownika.',
      'Особа, якій допомагають: komu? Не вживай знахідного замість давального.',
    ),
  ),
  verb(
    'verb-znac',
    'znać',
    'знати; бути знайомим',
    ['znam', 'znasz', 'zna', 'znamy', 'znacie', 'znają'],
    ['znał', 'znała', 'znało', 'znali', 'znały'],
    aspect(
      null,
      'Niedokonany; poznać oznacza poznanie lub nawiązanie znajomości, a nie prostą dokonaną wersję stanu znać.',
      'Недоконаний; poznać означає пізнання або знайомство, а не просту доконану версію стану znać.',
    ),
    [
      government('znać + osoba', 'Znam kogo?', 'Znam tę aktorkę.', 'biernik', 'знахідний'),
      government('znać + rzecz', 'Znam co?', 'Znam tę dzielnicę.', 'biernik', 'знахідний'),
    ],
    notes(
      'Znać łączy się z osobą lub rzeczą. Dla informacji, że coś jest prawdą, używamy wiedzieć, że.',
      'Znać поєднується з особою або предметом. Для знання про факт уживаємо wiedzieć, że.',
    ),
  ),
  verb(
    'verb-rozumiec',
    'rozumieć',
    'розуміти',
    ['rozumiem', 'rozumiesz', 'rozumie', 'rozumiemy', 'rozumiecie', 'rozumieją'],
    ['rozumiał', 'rozumiała', 'rozumiało', 'rozumieli', 'rozumiały'],
    aspect(
      'zrozumieć',
      'Niedokonany; zrozumieć podkreśla osiągnięcie zrozumienia.',
      'Недоконаний; zrozumieć підкреслює досягнення розуміння.',
    ),
    [
      government(
        'rozumieć + treść',
        'Rozumiem co?',
        'Rozumiem to pytanie.',
        'biernik',
        'знахідний',
      ),
      government(
        'nie rozumieć + treść',
        'Nie rozumiem czego?',
        'Nie rozumiem tego pytania.',
        'dopełniacz',
        'родовий',
      ),
    ],
    notes(
      'Trzecia osoba liczby mnogiej: rozumieją. W przeszłości: rozumiałem, rozumieliśmy.',
      'Третя особа множини: rozumieją. У минулому: rozumiałem, rozumieliśmy.',
    ),
  ),
];

export const verbTopic = {
  id: 'verb-tables',
  title: 'Таблиці дієслів',
  group: 'Дієслова',
  subtitle: '20 поширених дієслів: часи, вид і відмінкове керування.',
  rules: [
    'Порядок осіб: ja, ty, on/ona/ono, my, wy, oni/one. У минулому однина розрізняє чоловічий, жіночий і середній рід; множина — чоловічо-особову та нечоловічо-особову форми.',
    'Усі 20 дієслів недоконані. Майбутній у таблицях: форма być + інфінітив; для самого być: będę, będziesz тощо. У письмових вправах також приймаємо відповідні форми на -ł: będę czytał/czytała.',
    'Видові відповідники залежать від значення. У керуванні став питання від дієслова й зберігай прийменник: szukam czego? pomagam komu? mówię o czym?',
  ],
  columns: [
    'Інфінітив',
    'Українською',
    'ja · теперішній',
    'ja · минулий, чол. / жін.',
    'ja · майбутній',
  ],
  table: verbs.map((item) => [
    item.infinitive,
    item.uk,
    item.present[0],
    `${item.past.masculine[0]} / ${item.past.feminine[0]}`,
    item.future[0],
  ]),
  warning:
    'Не утворюй форми лише з інфінітива: iść → szedłem / szłam; jeść → jadłem, але jedliśmy. У множині чоловіча колонка означає чоловічо-особову групу, жіноча — нечоловічо-особову.',
  examples: [
    [
      'Codziennie jeżdżę tramwajem, ale teraz idę pieszo.',
      'Щодня їжджу трамваєм, але зараз іду пішки.',
    ],
    [
      'Wczoraj uczyłam się słów, jutro będę uczyć się gramatyki.',
      'Учора я вчила слова, завтра вивчатиму граматику.',
    ],
  ],
  drills: [],
  exerciseLevels: ['choice', 'write'],
};

export const verbLessonTranslations = {
  pl: {
    'verb-tables': {
      subtitle: '20 częstych czasowników: czasy, aspekt i wymagane przypadki.',
      rules: [
        'Kolejność osób: ja, ty, on/ona/ono, my, wy, oni/one. W przeszłości liczba pojedyncza rozróżnia rodzaj męski, żeński i nijaki; liczba mnoga formy męskoosobowe i niemęskoosobowe.',
        'Wszystkie 20 czasowników jest niedokonanych. Przyszłość w tabelach: forma być + bezokolicznik; dla samego być: będę, będziesz itd. W ćwiczeniach pisemnych akceptujemy też odpowiednie formy na -ł: będę czytał/czytała.',
        'Odpowiedniki aspektowe zależą od znaczenia. Pytaj od czasownika i zachowuj przyimek: szukam czego? pomagam komu? mówię o czym?',
      ],
      columns: [
        'Bezokolicznik',
        'Znaczenie po polsku',
        'ja · teraźniejszy',
        'ja · przeszły, męski / żeński',
        'ja · przyszły',
      ],
      table: verbs.map((item) => [
        item.infinitive,
        item.infinitive,
        item.present[0],
        `${item.past.masculine[0]} / ${item.past.feminine[0]}`,
        item.future[0],
      ]),
      warning:
        'Nie twórz form wyłącznie z bezokolicznika: iść → szedłem / szłam; jeść → jadłem, ale jedliśmy. W liczbie mnogiej kolumna męska oznacza grupę męskoosobową, a żeńska niemęskoosobową.',
    },
  },
};

const persons = ['ja', 'ty', 'on/ona/ono', 'my', 'wy', 'oni/one'];
const tenseLabels = {
  present: { pl: 'czas teraźniejszy', uk: 'теперішній час' },
  past: { pl: 'czas przeszły', uk: 'минулий час' },
  future: { pl: 'czas przyszły', uk: 'майбутній час' },
};

function pastPerson(personIndex, gender) {
  if (personIndex === 2)
    return {
      pl: gender === 'masculine' ? 'on (rodzaj męski)' : 'ona (rodzaj żeński)',
      uk: gender === 'masculine' ? 'on (чоловічий рід)' : 'ona (жіночий рід)',
    };
  if (personIndex === 5)
    return {
      pl: gender === 'masculine' ? 'oni (grupa męskoosobowa)' : 'one (grupa niemęskoosobowa)',
      uk:
        gender === 'masculine' ? 'oni (чоловічо-особова група)' : 'one (нечоловічо-особова група)',
    };
  const singular = personIndex < 3;
  return {
    pl: `${persons[personIndex]} (${singular ? (gender === 'masculine' ? 'mężczyzna' : 'kobieta') : gender === 'masculine' ? 'grupa męskoosobowa' : 'grupa niemęskoosobowa'})`,
    uk: `${persons[personIndex]} (${singular ? (gender === 'masculine' ? 'чоловік' : 'жінка') : gender === 'masculine' ? 'чоловічо-особова група' : 'нечоловічо-особова група'})`,
  };
}

const practiceRows = verbs.flatMap((item, verbIndex) =>
  ['present', 'past', 'future'].flatMap((tense) =>
    persons.map((person, personIndex) => {
      const gender =
        tense === 'past' ? ((verbIndex + personIndex) % 2 === 0 ? 'masculine' : 'feminine') : null;
      const label = tense === 'past' ? pastPerson(personIndex, gender) : { pl: person, uk: person };
      const forms = tense === 'past' ? item.past[gender] : item[tense];
      const answer = forms[personIndex];
      const compoundFuture = tense === 'future' && item.infinitive !== 'być';
      const participleIndex = personIndex < 3 ? 2 : 5;
      const futureAlternatives = compoundFuture
        ? [
            `${auxiliaries[personIndex]} ${item.past.masculine[participleIndex]}`,
            `${auxiliaries[personIndex]} ${item.past.feminine[participleIndex]}`,
            ...(personIndex === 2 ? [`${auxiliaries[personIndex]} ${item.past.neuter}`] : []),
          ]
        : [];
      const futureAnswers = [answer, ...futureAlternatives];
      // Both common positions of the reflexive particle are accepted in written futures.
      if (compoundFuture && item.infinitive.endsWith(' się')) {
        futureAnswers.push(
          ...[...futureAnswers].map(
            (form) =>
              `${auxiliaries[personIndex]} się ${form.slice(auxiliaries[personIndex].length + 1, -4)}`,
          ),
        );
      }
      const suffix = {
        pl: compoundFuture ? ' Użyj formy być z bezokolicznikiem lub odpowiednią formą na -ł.' : '',
        uk: compoundFuture ? ' Ужий форму być з інфінітивом або відповідною формою на -ł.' : '',
      };
      return {
        id: `${item.id}-${tense}-${personIndex}${gender ? `-${gender}` : ''}`,
        verbId: item.id,
        tense,
        personIndex,
        ...(gender ? { gender } : {}),
        answer,
        writtenAnswers: futureAnswers,
        options: [...new Set([answer, ...forms, ...item.present, ...item.future])].slice(0, 5),
        prompt: {
          pl: `Podaj formę: ${item.infinitive}; ${tenseLabels[tense].pl}; ${label.pl}.${suffix.pl}`,
          uk: `Подай форму: ${item.infinitive}; ${tenseLabels[tense].uk}; ${label.uk}.${suffix.uk}`,
        },
        explanation: {
          pl: `${item.infinitive} → ${answer}. ${tenseLabels[tense].pl}; ${label.pl}.${suffix.pl}`,
          uk: `${item.infinitive} → ${answer}. ${tenseLabels[tense].uk}; ${label.uk}.${suffix.uk}`,
        },
      };
    }),
  ),
);

export const verbExercises = practiceRows.flatMap((row) =>
  ['choice', 'write'].map((level) => ({
    id: `${row.id}-${level}`,
    familyId: row.id,
    topic: 'verb-tables',
    verbId: row.verbId,
    tense: row.tense,
    personIndex: row.personIndex,
    ...(row.gender ? { gender: row.gender } : {}),
    level,
    prompt: row.prompt.uk,
    answers: level === 'write' ? row.writtenAnswers : [row.answer],
    ...(level === 'choice' ? { options: row.options } : {}),
    explanation: row.explanation.uk,
  })),
);

export const verbExerciseTranslations = {
  pl: Object.fromEntries(
    practiceRows.flatMap((row) =>
      ['choice', 'write'].map((level) => [
        `${row.id}-${level}`,
        { prompt: row.prompt.pl, explanation: row.explanation.pl },
      ]),
    ),
  ),
};
