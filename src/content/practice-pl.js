import { topics, grammarExercises } from '../grammar.js';
import { history, interview, historyExercises, cultureQuestions, sources } from '../karta.js';
import vocabulary from '../vocabulary.json' with { type: 'json' };

const drillExplanations = {
  byc: [
    'Dla osoby ja używamy formy jestem: jestem z Ukrainy.',
    'Dla osoby ty używamy formy jesteś: jesteś w domu.',
    'Dla osoby my używamy formy jesteśmy: jesteśmy w Polsce.',
    'Zaimek one łączy się z formą są. O grupie kobiet mówimy: one są gotowe.',
  ],
  gender: [
    'Dom jest rzeczownikiem rodzaju męskiego, dlatego używamy ten: ten dom.',
    'Okno jest rzeczownikiem rodzaju nijakiego, dlatego używamy to: to okno.',
    'Mianownik liczby mnogiej rzeczownika książka to książki: te książki.',
    'Mianownik liczby mnogiej rzeczownika student to studenci. Jest to forma męskoosobowa: ci studenci.',
  ],
  present: [
    'Czytać w pierwszej osobie liczby pojedynczej ma formę czytam: ja czytam książkę.',
    'Mówić w drugiej osobie liczby pojedynczej ma formę mówisz: ty mówisz po polsku.',
    'Mieszkać w pierwszej osobie liczby mnogiej ma formę mieszkamy: my mieszkamy w domu.',
    'Pisać odmienia się: ja piszę, ty piszesz, oni piszą. Dla oni wybieramy piszą.',
  ],
  adjectives: [
    'Książka ma rodzaj żeński. Przymiotnik musi mieć tę samą formę rodzaju: nowa książka.',
    'Okno ma rodzaj nijaki, dlatego używamy formy duże: duże okno.',
    'Domy to liczba mnoga niemęskoosobowa, dlatego używamy formy nowe: nowe domy.',
    'Studenci to liczba mnoga męskoosobowa. Przymiotnik miły przyjmuje formę mili: mili studenci.',
  ],
  mianownik: [
    'Po konstrukcji to jest nazwa osoby występuje tutaj w mianowniku: to jest nauczyciel.',
    'Student jest podmiotem zdania i odpowiada na pytanie kto czyta? Używamy mianownika.',
    'Po to są używamy tutaj mianownika liczby mnogiej: nowe okna.',
    'Po to jest używamy tutaj mianownika. Zaimek i rzeczownik mają formy moja siostra.',
  ],
  dopelniacz: [
    'Dopełnienie bliższe po zaprzeczonym mam przyjmuje dopełniacz: mam nowy telefon, ale nie mam nowego telefonu.',
    'Szukać wymaga dopełniacza: szukam kogo? Brata.',
    'Przyimek do wymaga dopełniacza: szkoła → szkoły, idę do szkoły.',
    'Potrzebować łączy się z dopełniaczem. Po dużo także używamy dopełniacza: dużo czasu.',
    'Po nie mam używamy dopełniacza. W liczbie mnogiej nowe książki zmienia się w nowych książek.',
  ],
  celownik: [
    'Pomagać wymaga celownika: pomagam komu? Bratu. Rzeczownik brat ma tutaj końcówkę -u.',
    'Dziękować wymaga celownika: dziękuję komu? Nauczycielowi.',
    'Odbiorcę wyrażamy celownikiem: daję komu? Dziecku. Książkę jest dopełnieniem w bierniku.',
    'Po pomagać używamy celownika. W liczbie mnogiej: nowym studentom, z końcówkami -ym i -om.',
  ],
  biernik: [
    'Mam co? Nową książkę. W bierniku liczby pojedynczej przymiotnik żeński ma końcówkę -ą, a książka zmienia się w książkę.',
    'Widzę kogo? Brata. Biernik rzeczownika męskiego żywotnego w liczbie pojedynczej ma formę dopełniacza.',
    'Mam co? Nowy telefon. W tym rzeczowniku męskim nieżywotnym biernik ma formę mianownika.',
    'Widzę kogo? Nowych studentów. Biernik liczby mnogiej męskoosobowej ma formę dopełniacza.',
    'Koty to liczba mnoga niemęskoosobowa. Biernik ma tu formę mianownika: lubię te koty.',
  ],
  narzednik: [
    'Nazwę zawodu po jestem wyrażamy narzędnikiem: jestem kim? Nauczycielem.',
    'Z kim? Z nowym nauczycielem. Przyimek z oznaczający towarzyszenie wymaga narzędnika; odmieniamy oba słowa.',
    'Środek transportu bez przyimka wyrażamy narzędnikiem: jadę czym? Autobusem.',
    'Z kim? Z dobrymi koleżankami. Narzędnik liczby mnogiej ma tutaj końcówki -ymi i -ami.',
  ],
  miejscownik: [
    'Przyimek w określający miejsce wymaga miejscownika: Polska → Polsce, mieszkam w Polsce.',
    'Czytam o czym? O historii. Przyimek o wymaga tu miejscownika: historia → historii.',
    'W określające miejsce wymaga miejscownika. Odmieniamy przymiotnik i rzeczownik: w małym mieście.',
    'Rozmawiamy o czym? O nowych książkach. Miejscownik liczby mnogiej ma tu końcówki -ych i -ach.',
  ],
  wolacz: [
    'W bezpośrednim zwrocie do mamy używamy wołacza: mama → mamo.',
    'W zwrocie pan profesor odmieniamy oba wyrazy w wołaczu: panie profesorze.',
    'Wołacz imienia Kasia to Kasiu. Używamy go, zwracając się bezpośrednio do tej osoby.',
    'Wołacz rzeczownika przyjaciel to przyjacielu: drogi przyjacielu.',
  ],
  past: [
    'Mężczyzna mówiący o sobie używa w czasie przeszłym formy czytałem: wczoraj czytałem książkę.',
    'Kobieta mówiąca o sobie używa w czasie przeszłym formy byłam: wczoraj byłam w domu.',
    'Zaimek oni wymaga formy męskoosobowej czasu przeszłego z -li: oni mieszkali.',
    'Zaimek one wymaga formy niemęskoosobowej czasu przeszłego z -ły: one pisały.',
  ],
  future: [
    'Czas przyszły czasownika niedokonanego można tworzyć z będę i bezokolicznika: będę czytać.',
    'Napisać jest czasownikiem dokonanym. Jego forma napiszę oznacza przyszły zakończony rezultat.',
    'Dla my używamy formy będziemy. Z bezokolicznikiem pracować tworzy ona czas przyszły: będziemy pracować.',
    'Czas przyszły czasownika być dla oni to będą: oni będą w domu.',
  ],
  aspect: [
    'Codziennie oznacza czynność powtarzaną, dlatego używamy czasownika niedokonanego: czytam.',
    'Zrobić jest czasownikiem dokonanym. Forma zrobię wskazuje na przyszły rezultat: wykonanie całego zadania.',
    'Napisać wskazuje na zakończony rezultat. Mężczyzna mówiący o sobie używa formy napisałem.',
    'Kupić jest czasownikiem dokonanym. Kobieta mówiąca o sobie używa w czasie przeszłym formy kupiłam.',
  ],
  questions: [
    'Partykuła czy rozpoczyna pytanie, na które można odpowiedzieć tak lub nie: czy masz czas?',
    'W polskim zdaniu z nic zachowujemy także nie przed czasownikiem: nic nie wiem.',
    'Dopełnienie bliższe po zaprzeczonym mam przyjmuje dopełniacz: nie mam czasu.',
    'Gdzie pyta o miejsce: gdzie mieszkasz? O kierunek pytamy dokąd.',
  ],
  prepositions: [
    'Pytanie skąd? wskazuje na pochodzenie lub punkt wyjścia. Używamy z i dopełniacza: wracam z Polski.',
    'Idę na koncert wyraża kierunek. Przyimek na łączy się tutaj z biernikiem.',
    'Pytanie gdzie? dotyczy miejsca. Przyimek w łączy się tutaj z miejscownikiem: jestem w domu.',
    'Z kim? oznacza towarzyszenie. Przyimek z wymaga tu narzędnika: rozmawiam z bratem.',
  ],
};

const identificationExplanations = [
  'Student jest podmiotem: kto czyta? Student. Podmiot ma tutaj formę mianownika.',
  'Po to jest nazwa osoby występuje tutaj w mianowniku: kto? Siostra.',
  'Okno jest podmiotem: co jest otwarte? Okno. Używamy mianownika.',
  'Szukać wymaga dopełniacza: szukam kogo? Brata. Taka sama forma po widzę byłaby biernikiem.',
  'Po zaprzeczonym mam dopełnienie bliższe przyjmuje dopełniacz: mam książkę → nie mam książki.',
  'Z odpowiadające na pytanie skąd? wymaga dopełniacza: wracam z pracy.',
  'Pomagać wymaga celownika: pomagam komu? Bratu.',
  'Mamie oznacza odbiorcę: daję komu? Mamie. Jest to celownik.',
  'Dziękować wymaga celownika: dziękuję komu? Nauczycielowi.',
  'Widzę kogo? Brata. Jest to dopełnienie bliższe w bierniku; forma jest taka sama jak w dopełniaczu.',
  'Czytam co? Książkę. Dopełnienie bliższe ma tutaj formę biernika.',
  'Mam co? Telefon. Jest to biernik, który dla tego rzeczownika męskiego nieżywotnego ma formę mianownika.',
  'Nazwę zawodu po jestem wyrażamy narzędnikiem: jestem kim? Lekarzem.',
  'Z kim? Z bratem. Przyimek z oznaczający towarzyszenie wymaga narzędnika.',
  'Jadę czym? Autobusem. Środek transportu bez przyimka wyrażamy narzędnikiem.',
  'W Polsce określa miejsce. Przyimek w wymaga tutaj miejscownika.',
  'Myślę o kim? O rodzinie. Przyimek o wymaga tutaj miejscownika.',
  'Gdzie leży książka? Na stole. Przyimek na określający miejsce wymaga miejscownika.',
  'Mamo to bezpośredni zwrot do mamy, czyli wołacz.',
  'Profesorze jest formą bezpośredniego zwrotu do profesora, czyli wołaczem.',
  'Przyjacielu to bezpośredni zwrot do przyjaciela, czyli wołacz.',
];

const promptHints = {
  'питання так/ні': 'pytanie tak/nie',
  де: 'gdzie',
  звідки: 'skąd',
  куди: 'dokąd',
  'з ким': 'z kim',
};

function translatePrompt(prompt) {
  let translated = prompt;
  for (const [original, polish] of Object.entries(promptHints)) {
    translated = translated.replaceAll(`(${original})`, `(${polish})`);
  }
  if (/\p{Script=Cyrillic}/u.test(translated))
    throw new Error('Missing Polish practice prompt translation');
  return translated;
}

const polishExercises = {};
for (const topic of topics) {
  if (!topic.drills.length) continue;
  if (drillExplanations[topic.id]?.length !== topic.drills.length) {
    throw new Error(`Missing Polish drill explanations for ${topic.id}`);
  }
  topic.drills.forEach((drill, index) => {
    for (const level of ['choice', 'write', 'sentence']) {
      polishExercises[`${topic.id}-${index}-${level}`] = {
        explanation: drillExplanations[topic.id][index],
        ...(level === 'sentence' ? {} : { prompt: translatePrompt(drill.prompt) }),
      };
    }
  });
}
identificationExplanations.forEach((explanation, index) => {
  polishExercises[`case-overview-identify-${index}`] = { explanation };
});
for (const exercise of grammarExercises) {
  if (!polishExercises[exercise.id])
    throw new Error(`Missing Polish exercise translation for ${exercise.id}`);
}

for (const entry of history) {
  for (const suffix of ['year', 'write', 'event']) {
    polishExercises[`${entry.id}-${suffix}`] = {
      explanation: entry.pl,
      ...(suffix === 'write' ? { prompt: `Wpisz rok: ${entry.title}` } : {}),
    };
  }
}
for (const exercise of historyExercises) {
  if (!polishExercises[exercise.id])
    throw new Error(`Missing Polish history translation for ${exercise.id}`);
}

const cultureExplanations = {
  'culture-flaga':
    'Polska flaga jest biało-czerwona: biały pas znajduje się na górze, a czerwony na dole.',
  'culture-godlo': 'Godło Polski przedstawia białego orła w złotej koronie na czerwonym tle.',
  'culture-hymn': 'Hymnem Polski jest Mazurek Dąbrowskiego. Autorem słów jest Józef Wybicki.',
  'culture-wigilia': 'Wigilia przypada 24 grudnia, dzień przed Bożym Narodzeniem.',
  'culture-stolica': 'Obecną stolicą Polski jest Warszawa.',
  'culture-niepodleglosc':
    'Narodowe Święto Niepodległości obchodzimy 11 listopada. Upamiętnia odzyskanie niepodległości w 1918 roku.',
  'culture-konstytucja':
    'Święto Narodowe Trzeciego Maja obchodzimy 3 maja. Upamiętnia uchwalenie konstytucji w 1791 roku.',
  'culture-pisanki': 'Pisanki to ozdobione jajka związane z tradycją wielkanocną.',
};
for (const exercise of cultureQuestions) {
  const explanation = cultureExplanations[exercise.id];
  if (!explanation) throw new Error(`Missing Polish culture explanation for ${exercise.id}`);
  polishExercises[exercise.id] = { explanation };
}

const partsOfSpeech = {
  Дієслово: 'czasownik',
  Іменник: 'rzeczownik',
  Прикметник: 'przymiotnik',
};
for (const word of vocabulary) {
  const kind = partsOfSpeech[word.kind];
  if (!kind) throw new Error(`Missing Polish part of speech for ${word.id}`);
  for (const level of ['choice', 'write']) {
    polishExercises[`${word.id}-${level}`] = {
      explanation: `Forma w tekście: ${word.form}. Forma podstawowa: ${word.base}. Część mowy: ${kind}.`,
    };
  }
}

export const exerciseTranslations = { pl: polishExercises };

const interviewTips = {
  intro:
    'Uzupełnij odpowiedź prawdziwymi informacjami o sobie. Po pracuję jako nazwa zawodu występuje tutaj w mianowniku: jako nauczyciel.',
  family:
    'Opisz wyłącznie własną historię rodzinną. Jeśli masz inną podstawę ubiegania się o Kartę Polaka, wyjaśnij ją własnymi słowami.',
  language:
    'Uczyć się wymaga dopełniacza: uczę się polskiego. Dostosuj ten wzór do swojej motywacji.',
  traditions: 'Dodaj, które tradycje rzeczywiście pielęgnujesz w swojej rodzinie.',
  wigilia: 'Wigilia przypada 24 grudnia, a pierwszy dzień Bożego Narodzenia 25 grudnia.',
  easter: 'Pisanka to ozdobione jajko wielkanocne. Śmigus-dyngus to zwyczaj oblewania się wodą.',
  flag: 'Zapamiętaj kolejność pasów: biały na górze, czerwony na dole.',
  emblem: 'Przedstawia kogo? Orła. Rzeczownik orzeł przyjmuje tutaj formę biernika: orła.',
  anthem: 'Wypowiedz nazwę hymnu na głos i osobno przećwicz imię i nazwisko autora słów.',
  may: 'Rozróżniaj datę corocznego święta, 3 maja, i rok wydarzenia historycznego, 1791.',
  november: 'W dacie nazwa miesiąca występuje w dopełniaczu: 11 listopada.',
  capital: 'Stolicą jest formą narzędnika: Warszawa jest stolicą Polski.',
};
export const interviewTranslations = {
  pl: Object.fromEntries(
    interview.map((entry) => {
      if (!interviewTips[entry.id]) throw new Error(`Missing Polish interview tip for ${entry.id}`);
      return [entry.id, { tip: interviewTips[entry.id] }];
    }),
  ),
};

const historyNotes = {
  'history-966':
    'Małżeństwo Mieszka I z Dobrawą zwykle datuje się na 965 rok. Nie łączymy go z chrztem w jedną datę.',
  'history-1025':
    'Otton III zmarł w 1002 roku, dlatego nie mógł być bezpośrednim uczestnikiem koronacji w 1025 roku.',
  'history-1410':
    'Zwycięstwo pod Grunwaldem nie oznaczało natychmiastowego końca istnienia zakonu krzyżackiego.',
  'history-1569':
    'Pomijamy pochodzące z dostarczonego tekstu twierdzenie, że było to największe państwo Europy.',
  'history-1791':
    'Konstytucję uchwalił Sejm Wielki. Stwierdzenie, że została nadana przez króla, jest nieprecyzyjne.',
  'history-1944': 'Nie myl powstania warszawskiego z powstaniem w getcie warszawskim w 1943 roku.',
  'history-1978':
    'W dostarczonym tekście błędnie podano 6 października. Prawidłowa data to 16 października 1978 roku.',
  'history-1999':
    'W dostarczonym tekście podano 1998 rok. Polska przystąpiła do NATO 12 marca 1999 roku.',
};
export const historyTranslations = {
  pl: Object.fromEntries(
    history.map((entry) => {
      if (entry.note && !historyNotes[entry.id])
        throw new Error(`Missing Polish history note for ${entry.id}`);
      return [entry.id, { note: historyNotes[entry.id] || '' }];
    }),
  ),
};

const sourceLabels = [
  'Odmiana rzeczowników i przymiotników · ZPE',
  'Przypadki i formy rzeczowników · ZPE',
  'Karta Polaka: rozmowa · Gov.pl',
  'Symbole narodowe · Gov.pl',
];
if (sources.length !== sourceLabels.length) throw new Error('Missing Polish source label');
export const sourceTranslations = {
  pl: Object.fromEntries(sources.map(([label], index) => [label, sourceLabels[index]])),
};
