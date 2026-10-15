const nounSource = {
  title: 'ZPE: Wśród rzeczowników',
  url: 'https://zpe.gov.pl/a/wsrod-rzeczownikow/DnlcUoa5M',
};
const agreementSource = {
  title: 'ZPE: Odmiana rzeczownika i przymiotnika',
  url: 'https://zpe.gov.pl/a/odmiana-rzeczownika-i-przymiotnika/DYAl4NsEf',
};
const constructionSource = {
  title: 'polski.info: Rzeczowniki',
  url: 'https://polski.info/grammar/nouns?hl=pl',
};
const adjectiveSource = {
  title: 'polski.info: Przymiotniki',
  url: 'https://polski.info/grammar/adjectives?hl=pl',
};
const searchSource = {
  title: 'Poradnia Językowa UW: wyszukiwać informacje',
  url: 'https://poradniajezykowa.uw.edu.pl/porady/wyszukiwac-informacje/',
};

// Shared example rows keep the sentence, target and answer identical in both languages.
function guide(sources, pl, uk, rows) {
  const examples = (language) =>
    rows.map(([sentence, target, question, explanationPl, explanationUk, translation]) => ({
      sentence,
      target,
      question,
      answer: target,
      explanation: language === 'pl' ? explanationPl : explanationUk,
      translation,
    }));
  return {
    sources,
    pl: { ...pl, examples: examples('pl') },
    uk: { ...uk, examples: examples('uk') },
  };
}

export const caseGuides = {
  mianownik: guide(
    [nounSource, agreementSource, adjectiveSource],
    {
      nounQuestions: 'kto? co?',
      adjectiveQuestions:
        'Liczba pojedyncza: jaki? jaka? jakie? Liczba mnoga: jacy? (męskoosobowy), jakie? (niemęskoosobowy).',
      howToAsk:
        'Znajdź orzeczenie i zapytaj, kto wykonuje czynność lub co jest opisywane. W konstrukcji to jest nazwij osobę albo rzecz. Mianownika nie wybieramy po przyimku.',
      patterns: [
        ['podmiot', 'Kto czeka?', 'Nowa sąsiadka czeka.'],
        ['to jest / to są', 'Co to jest?', 'To jest małe lustro.'],
      ],
      note: 'Podmiot nie musi stać pierwszy. Przymiotnik dopasuj do rzeczownika; końcówka sama nie rozstrzyga przypadku.',
    },
    {
      nounQuestions: 'kto? co? (хто? що?)',
      adjectiveQuestions:
        'Однина: jaki? jaka? jakie? Множина: jacy? (чоловічо-особова), jakie? (нечоловічо-особова).',
      howToAsk:
        'Знайди присудок і запитай, хто виконує дію або що описується. У конструкції to jest назви особу чи предмет. Називний не обираємо після прийменника.',
      patterns: [
        ['підмет', 'Kto czeka?', 'Nowa sąsiadka czeka.'],
        ['to jest / to są', 'Co to jest?', 'To jest małe lustro.'],
      ],
      note: 'Підмет не обов’язково стоїть першим. Прикметник узгоджуй з іменником; самого закінчення недостатньо для визначення відмінка.',
    },
    [
      [
        'Nowa sąsiadka czeka przed windą.',
        'Nowa sąsiadka',
        'Kto czeka przed windą?',
        'Podmiot w liczbie pojedynczej.',
        'Підмет в однині.',
        'Нова сусідка чекає перед ліфтом.',
      ],
      [
        'Na półce stoją niebieskie kubki.',
        'niebieskie kubki',
        'Co stoi na półce?',
        'Podmiot w liczbie mnogiej.',
        'Підмет у множині.',
        'На полиці стоять сині чашки.',
      ],
      [
        'To jest małe lustro do łazienki.',
        'małe lustro',
        'Co to jest?',
        'Nazwa rzeczy po to jest.',
        'Назва предмета після to jest.',
        'Це маленьке дзеркало для ванної кімнати.',
      ],
    ],
  ),
  dopelniacz: guide(
    [nounSource, adjectiveSource, constructionSource, searchSource],
    {
      nounQuestions: 'kogo? czego?',
      adjectiveQuestions:
        'Liczba pojedyncza: jakiego? (męski, nijaki), jakiej? (żeński). Liczba mnoga: jakich? (wszystkie rodzaje).',
      howToAsk:
        'Wybierz czasownik lub przyimek i zachowaj go w pytaniu: szukam czego? bez czego? Po zaprzeczonym mam pytaj nie mam czego?',
      patterns: [
        ['szukać + dopełniacz', 'Szukam czego?', 'Szukam zapasowego klucza.'],
        ['bez + dopełniacz', 'Bez czego?', 'bez ciepłych rękawiczek'],
      ],
      note: 'Kogo? występuje też w bierniku. Szukać wymaga dopełniacza, wyszukiwać biernika. Ucz się wyjątków końcówek ze słowem.',
    },
    {
      nounQuestions: 'kogo? czego? (кого? чого?)',
      adjectiveQuestions:
        'Однина: jakiego? (чоловічий, середній), jakiej? (жіночий). Множина: jakich? (усі роди).',
      howToAsk:
        'Обери дієслово чи прийменник і збережи його в питанні: szukam czego? bez czego? Після запереченого mam запитуй nie mam czego?',
      patterns: [
        ['szukać + родовий', 'Szukam czego?', 'Szukam zapasowego klucza.'],
        ['bez + родовий', 'Bez czego?', 'bez ciepłych rękawiczek'],
      ],
      note: 'Kogo? є також питанням знахідного. Szukać вимагає родового, wyszukiwać — знахідного. Виняткові закінчення вчи разом зі словом.',
    },
    [
      [
        'Szukam zapasowego klucza do piwnicy.',
        'zapasowego klucza',
        'Szukam czego?',
        'Szukać wymaga dopełniacza.',
        'Szukać вимагає родового.',
        'Шукаю запасний ключ від підвалу.',
      ],
      [
        'Nie mam świeżych pomidorów na sałatkę.',
        'świeżych pomidorów',
        'Nie mam czego?',
        'Zaprzeczone mam: dopełniacz liczby mnogiej.',
        'Заперечене mam: родовий множини.',
        'Не маю свіжих помідорів для салату.',
      ],
      [
        'Wychodzę bez ciepłych rękawiczek.',
        'ciepłych rękawiczek',
        'Wychodzę bez czego?',
        'Przyimek bez wymaga dopełniacza.',
        'Прийменник bez вимагає родового.',
        'Виходжу без теплих рукавичок.',
      ],
    ],
  ),
  celownik: guide(
    [
      nounSource,
      adjectiveSource,
      constructionSource,
      {
        title: 'WSJP PAN: pomagać (w nauce)',
        url: 'https://wsjp.pl/haslo/podglad/25622/pomagac/2729386/w-nauce',
      },
    ],
    {
      nounQuestions: 'komu? czemu?',
      adjectiveQuestions:
        'Liczba pojedyncza: jakiemu? (męski, nijaki), jakiej? (żeński). Liczba mnoga: jakim? (wszystkie rodzaje).',
      howToAsk:
        'Od czasownika zapytaj o odbiorcę lub osobę otrzymującą pomoc: daję komu? pomagam komu? Po dzięki zachowaj przyimek: dzięki komu?',
      patterns: [
        ['pomagać + celownik', 'Pomagam komu?', 'Pomagam młodszym uczniom.'],
        ['dawać + celownik', 'Daję komu?', 'Daję starszej sąsiadce gazetę.'],
      ],
      note: 'Nie każdy odbiorca ma tę samą końcówkę: bratu, ale synowi. Przypadek wynika z konstrukcji, nie z samego znaczenia.',
    },
    {
      nounQuestions: 'komu? czemu? (кому? чому?)',
      adjectiveQuestions:
        'Однина: jakiemu? (чоловічий, середній), jakiej? (жіночий). Множина: jakim? (усі роди).',
      howToAsk:
        'Від дієслова запитай про одержувача або того, кому допомагають: daję komu? pomagam komu? Після dzięki збережи прийменник: dzięki komu?',
      patterns: [
        ['pomagać + давальний', 'Pomagam komu?', 'Pomagam młodszym uczniom.'],
        ['dawać + давальний', 'Daję komu?', 'Daję starszej sąsiadce gazetę.'],
      ],
      note: 'Не всі назви одержувача мають однакове закінчення: bratu, але synowi. Відмінок визначає конструкція, а не лише значення.',
    },
    [
      [
        'Pomagam młodszym uczniom w bibliotece.',
        'młodszym uczniom',
        'Pomagam komu?',
        'Pomagać łączy się z celownikiem.',
        'Pomagać поєднується з давальним.',
        'Допомагаю молодшим учням у бібліотеці.',
      ],
      [
        'Daję starszej sąsiadce dzisiejszą gazetę.',
        'starszej sąsiadce',
        'Daję komu gazetę?',
        'Odbiorca w celowniku liczby pojedynczej.',
        'Одержувач у давальному однини.',
        'Даю старшій сусідці сьогоднішню газету.',
      ],
      [
        'Dzięki cierpliwym kolegom rozumiem zadanie.',
        'cierpliwym kolegom',
        'Dzięki komu rozumiem zadanie?',
        'Dzięki wymaga celownika.',
        'Dzięki вимагає давального.',
        'Завдяки терплячим колегам розумію завдання.',
      ],
    ],
  ),
  biernik: guide(
    [nounSource, adjectiveSource, constructionSource, searchSource],
    {
      nounQuestions: 'kogo? co?',
      adjectiveQuestions:
        'Liczba pojedyncza: jakiego? (męski żywotny), jaki? (męski nieżywotny), jaką? (żeński), jakie? (nijaki). Liczba mnoga: jakich? (męskoosobowy), jakie? (niemęskoosobowy).',
      howToAsk:
        'Zachowaj czasownik: zapraszam kogo? kupuję co? Dla celu ruchu zachowaj przyimek: na co? Samo dokąd? nie rozstrzyga przypadku.',
      patterns: [
        ['zapraszać + biernik', 'Zapraszam kogo?', 'Zapraszam nowych sąsiadów.'],
        ['iść na + biernik', 'Idę na co?', 'Idę na wieczorny spacer.'],
      ],
      note: 'Kogo? pokrywa się z dopełniaczem. Rodzaj i żywotność wpływają na formę; istnieją wyjątki leksykalne.',
    },
    {
      nounQuestions: 'kogo? co? (кого? що?)',
      adjectiveQuestions:
        'Однина: jakiego? (чоловічий живий), jaki? (чоловічий неживий), jaką? (жіночий), jakie? (середній). Множина: jakich? (чоловічо-особова), jakie? (нечоловічо-особова).',
      howToAsk:
        'Збережи дієслово: zapraszam kogo? kupuję co? Для мети руху збережи прийменник: na co? Саме dokąd? не визначає відмінка.',
      patterns: [
        ['zapraszać + знахідний', 'Zapraszam kogo?', 'Zapraszam nowych sąsiadów.'],
        ['iść na + знахідний', 'Idę na co?', 'Idę na wieczorny spacer.'],
      ],
      note: 'Kogo? збігається з питанням родового. Рід та істотність впливають на форму; існують лексичні винятки.',
    },
    [
      [
        'Zapraszam nowych sąsiadów na herbatę.',
        'nowych sąsiadów',
        'Zapraszam kogo?',
        'Biernik męskoosobowy liczby mnogiej.',
        'Чоловічо-особовий знахідний множини.',
        'Запрошую нових сусідів на чай.',
      ],
      [
        'Kupuję zieloną torbę na zakupy.',
        'zieloną torbę',
        'Kupuję co?',
        'Dopełnienie bliższe po kupuję.',
        'Прямий додаток після kupuję.',
        'Купую зелену сумку для покупок.',
      ],
      [
        'Idę na wieczorny spacer nad rzekę.',
        'wieczorny spacer',
        'Idę na co?',
        'Na wskazuje cel, więc wymaga biernika.',
        'Na позначає мету, тому вимагає знахідного.',
        'Йду на вечірню прогулянку до річки.',
      ],
    ],
  ),
  narzednik: guide(
    [nounSource, adjectiveSource, constructionSource],
    {
      nounQuestions: 'kim? czym?',
      adjectiveQuestions:
        'Liczba pojedyncza: jakim? (męski, nijaki), jaką? (żeński). Liczba mnoga: jakimi? (wszystkie rodzaje).',
      howToAsk:
        'Zapytaj od czasownika o narzędzie: kroję czym? Przy towarzystwie zachowaj z: rozmawiam z kim? Po jestem pytaj o zawód: jestem kim?',
      patterns: [
        ['czynność + narzędzie', 'Kroję czym?', 'Kroję ostrym nożem.'],
        ['z + narzędnik', 'Rozmawiam z kim?', 'Rozmawiam z nowymi koleżankami.'],
      ],
      note: 'Z kim? oznacza towarzystwo, z czego? pochodzenie. Wyjątki liczby mnogiej, np. ludźmi, wymagają osobnej nauki.',
    },
    {
      nounQuestions: 'kim? czym? (ким? чим?)',
      adjectiveQuestions:
        'Однина: jakim? (чоловічий, середній), jaką? (жіночий). Множина: jakimi? (усі роди).',
      howToAsk:
        'Від дієслова запитай про знаряддя: kroję czym? Для спільної дії збережи z: rozmawiam z kim? Після jestem запитай про професію: jestem kim?',
      patterns: [
        ['дія + знаряддя', 'Kroję czym?', 'Kroję ostrym nożem.'],
        ['z + орудний', 'Rozmawiam z kim?', 'Rozmawiam z nowymi koleżankami.'],
      ],
      note: 'Z kim? означає товариство, z czego? — походження. Винятки множини, наприклад ludźmi, потрібно вчити окремо.',
    },
    [
      [
        'Kroję chleb ostrym nożem.',
        'ostrym nożem',
        'Kroję chleb czym?',
        'Narzędzie czynności w narzędniku.',
        'Знаряддя дії в орудному.',
        'Ріжу хліб гострим ножем.',
      ],
      [
        'Rozmawiam z nowymi koleżankami podczas przerwy.',
        'nowymi koleżankami',
        'Rozmawiam z kim?',
        'Z oznacza towarzystwo: narzędnik liczby mnogiej.',
        'Z означає товариство: орудний множини.',
        'Розмовляю з новими колегами під час перерви.',
      ],
      [
        'Jestem doświadczonym ogrodnikiem od wielu lat.',
        'doświadczonym ogrodnikiem',
        'Jestem kim?',
        'Nazwa zawodu po jestem.',
        'Назва професії після jestem.',
        'Я вже багато років досвідчений садівник.',
      ],
    ],
  ),
  miejscownik: guide(
    [
      nounSource,
      adjectiveSource,
      constructionSource,
      {
        title: 'WSJP PAN: miejscownik',
        url: 'https://wsjp.pl/haslo/podglad/11882/miejscownik',
      },
    ],
    {
      nounQuestions: 'o kim? o czym?',
      adjectiveQuestions:
        'Liczba pojedyncza: jakim? (męski, nijaki), jakiej? (żeński). Liczba mnoga: jakich? (wszystkie rodzaje). Dodaj przyimek: o jakich?',
      howToAsk:
        'Zawsze zachowaj przyimek: myślę o kim? rozmawiam o czym? Dla miejsca doprecyzuj gdzie: w czym? na czym? Samo gdzie? nie wskazuje jednego przypadku.',
      patterns: [
        ['myśleć o + miejscownik', 'Myślę o kim?', 'Myślę o młodszym kuzynie.'],
        ['miejsce: na + miejscownik', 'Na czym leży?', 'na drewnianym biurku'],
      ],
      note: 'Miejscownik zawsze ma przyimek. Na czym? opisuje miejsce, na co? cel ruchu; temat wyrazu może się zmieniać.',
    },
    {
      nounQuestions: 'o kim? o czym? (про кого? про що?)',
      adjectiveQuestions:
        'Однина: jakim? (чоловічий, середній), jakiej? (жіночий). Множина: jakich? (усі роди). Додай прийменник: o jakich?',
      howToAsk:
        'Завжди зберігай прийменник: myślę o kim? rozmawiam o czym? Для місця уточни gdzie: w czym? na czym? Саме gdzie? не вказує на єдиний відмінок.',
      patterns: [
        ['myśleć o + місцевий', 'Myślę o kim?', 'Myślę o młodszym kuzynie.'],
        ['місце: na + місцевий', 'Na czym leży?', 'na drewnianym biurku'],
      ],
      note: 'Місцевий завжди має прийменник. Na czym? описує місце, na co? — мету руху; основа слова може змінюватися.',
    },
    [
      [
        'Myślę o młodszym kuzynie przed jego egzaminem.',
        'młodszym kuzynie',
        'Myślę o kim?',
        'Myśleć o wymaga miejscownika.',
        'Myśleć o вимагає місцевого.',
        'Думаю про молодшого двоюрідного брата перед його іспитом.',
      ],
      [
        'Rozmawiamy o wakacyjnych planach przy kolacji.',
        'wakacyjnych planach',
        'Rozmawiamy o czym?',
        'Temat rozmowy w miejscowniku liczby mnogiej.',
        'Тема розмови в місцевому множини.',
        'Розмовляємо про плани на канікули за вечерею.',
      ],
      [
        'Laptop leży na drewnianym biurku.',
        'drewnianym biurku',
        'Laptop leży na czym?',
        'Na określa miejsce, nie cel ruchu.',
        'Na позначає місце, а не мету руху.',
        'Ноутбук лежить на дерев’яному письмовому столі.',
      ],
    ],
  ),
  wolacz: guide(
    [
      {
        title: 'ZPE: Nie przypadkiem jestem przypadkiem',
        url: 'https://zpe.gov.pl/a/nie-przypadkiem-jestem-przypadkiem/DJRrfGJ3Q',
      },
      agreementSource,
      adjectiveSource,
      {
        title: 'Poradnia Językowa Uniwersytetu Łódzkiego: Wołacz',
        url: 'https://www.poradnia-jezykowa.uni.lodz.pl/szczegoly/wolacz',
      },
    ],
    {
      nounQuestions: 'Brak pytania: bezpośredni zwrot do adresata.',
      adjectiveQuestions:
        'Nie tworzymy pytania do wołacza. Formy przymiotnika jak w mianowniku: drogi, droga, drogie; w liczbie mnogiej drodzy, drogie.',
      howToAsk:
        'Nie pytaj od czasownika ani przyimka. Rozpoznaj, do kogo mówiący zwraca się bezpośrednio; wydziel zwrot przecinkiem. Polecenie w zdaniu nie rządzi wołaczem.',
      patterns: [
        ['bezpośredni zwrot: osoba', 'Bez pytania; zwrot do adresata.', 'Droga babciu, odpocznij.'],
        ['bezpośredni zwrot: grupa', 'Bez pytania; zwrot do grupy.', 'Drodzy goście, zapraszamy!'],
      ],
      note: 'Nazwy i zdrobnienia mają różne wzory odmiany. Potoczny mianownik w zwrocie nie zmienia zasady: wołacz nie odpowiada na pytanie.',
    },
    {
      nounQuestions: 'Відмінкового питання немає: пряме звертання до адресата.',
      adjectiveQuestions:
        'Питання до кличного не утворюємо. Форми прикметника як у називному: drogi, droga, drogie; у множині drodzy, drogie.',
      howToAsk:
        'Не став питання від дієслова чи прийменника. Визнач, до кого мовець звертається безпосередньо; відокрем звертання комою. Наказ у реченні не керує кличним.',
      patterns: [
        ['пряме звертання: особа', 'Bez pytania; zwrot do adresata.', 'Droga babciu, odpocznij.'],
        ['пряме звертання: група', 'Bez pytania; zwrot do grupy.', 'Drodzy goście, zapraszamy!'],
      ],
      note: 'Назви та пестливі форми мають різні моделі відмінювання. Розмовний називний у звертанні не змінює правила: кличний не відповідає на питання.',
    },
    [
      [
        'Droga babciu, usiądź obok mnie.',
        'Droga babciu',
        'Bez pytania; bezpośredni zwrot do babci.',
        'Zwracamy się do jednej osoby.',
        'Звертаємося до однієї особи.',
        'Дорога бабусю, сядь поруч зі мною.',
      ],
      [
        'Drodzy goście, zostawcie płaszcze w szatni.',
        'Drodzy goście',
        'Bez pytania; bezpośredni zwrot do gości.',
        'Zwrot do grupy; forma jak w mianowniku.',
        'Звертання до групи; форма як у називному.',
        'Дорогі гості, залиште пальта в гардеробі.',
      ],
      [
        'Panie kierowco, proszę otworzyć drzwi.',
        'Panie kierowco',
        'Bez pytania; bezpośredni zwrot do kierowcy.',
        'Oba rzeczowniki tworzą zwrot w wołaczu.',
        'Обидва іменники утворюють звертання в кличному.',
        'Пане водію, будь ласка, відчиніть двері.',
      ],
    ],
  ),
};
