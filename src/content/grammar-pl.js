export const lessonTranslations = {
  pl: {
    byc: {
      subtitle: 'Kim jestem? Kim jesteś? Czasownik być w czasie teraźniejszym.',
      rules: [
        'W polskim zdaniu w czasie teraźniejszym zwykle potrzebujemy czasownika być: Ja jestem, ty jesteś. W języku ukraińskim jego odpowiednik często się pomija.',
        'Zaimek osobowy można pominąć, gdy formę osoby wskazuje czasownik: Jestem z Ukrainy.',
        'Po być nazwa zawodu lub roli występuje w narzędniku: Jestem lekarzem. Po konstrukcji to jest używamy mianownika: To jest lekarz.',
      ],
      columns: ['Osoba', 'być', 'Przykład'],
      table: [
        ['ja', 'jestem', 'Jestem w domu.'],
        ['ty', 'jesteś', 'Jesteś miły.'],
        ['on / ona / ono', 'jest', 'Ona jest tutaj.'],
        ['my', 'jesteśmy', 'Jesteśmy gotowi.'],
        ['wy', 'jesteście', 'Jesteście w szkole.'],
        ['oni / one', 'są', 'One są miłe.'],
      ],
      warning: 'Nie jestem nauczyciel → Nie jestem nauczycielem. Ale: To jest nauczyciel.',
    },
    gender: {
      subtitle: 'Ten, ta, to; jeden przedmiot i wiele przedmiotów.',
      rules: [
        'Rzeczowniki rodzaju męskiego często kończą się spółgłoską: ten dom. Rodzaj żeński często ma końcówkę -a: ta książka. Rodzaj nijaki często ma -o lub -e: to okno, to morze.',
        'Istnieją wyjątki: ten mężczyzna, ten tata. Ustalaj rodzaj na podstawie znaczenia i słownika, a nie tylko końcówki.',
        'W liczbie mnogiej rozróżniamy rodzaj męskoosobowy (ci studenci) i niemęskoosobowy (te kobiety, te koty).',
      ],
      columns: ['Liczba pojedyncza', 'Liczba mnoga', 'Zgodność form'],
      table: [
        ['dom', 'domy', 'ten dom → te domy'],
        ['kobieta', 'kobiety', 'ta kobieta → te kobiety'],
        ['okno', 'okna', 'to okno → te okna'],
        ['student', 'studenci', 'ten student → ci studenci'],
        ['dziecko', 'dzieci', 'to dziecko → te dzieci'],
      ],
      warning: 'Te studenci → ci studenci. Natomiast te studentki to poprawna forma.',
    },
    present: {
      subtitle: 'Osoba, końcówki i regularne wzory odmiany.',
      rules: [
        'Nie odmieniaj wszystkich czasowników według jednego wzoru. Zapamiętuj bezokolicznik razem z formami ja i ty: czytać → czytam, czytasz.',
        'Popularne wzory końcówek: -am/-asz (czytać), -ę/-esz (pisać), -ę/-isz lub -ysz (mówić, uczyć).',
        'Czas teraźniejszy tworzą czasowniki niedokonane. Forma dokonana przeczytam oznacza przyszły rezultat, a nie czytanie w tej chwili.',
      ],
      columns: ['Osoba', 'czytać', 'mówić'],
      table: [
        ['ja', 'czytam', 'mówię'],
        ['ty', 'czytasz', 'mówisz'],
        ['on / ona', 'czyta', 'mówi'],
        ['my', 'czytamy', 'mówimy'],
        ['wy', 'czytacie', 'mówicie'],
        ['oni / one', 'czytają', 'mówią'],
      ],
      warning: 'Ja mówi → ja mówię. Końcówka zależy od osoby.',
    },
    adjectives: {
      subtitle: 'Zgodność przymiotnika z rzeczownikiem w rodzaju, liczbie i przypadku.',
      rules: [
        'Przymiotnik dostosowuje formę do rzeczownika: nowy dom, nowa książka, nowe okno.',
        'W liczbie mnogiej: nowi studenci, ale nowe studentki, nowe domy.',
        'Podczas odmiany zmieniają się oba słowa: nowa książka → nowej książki → nową książką.',
      ],
      columns: ['Forma', 'Przykład', 'Znaczenie po polsku'],
      table: [
        ['męski', 'dobry nauczyciel', 'dobry nauczyciel'],
        ['żeński', 'dobra nauczycielka', 'dobra nauczycielka'],
        ['nijaki', 'dobre dziecko', 'dobre dziecko'],
        ['męskoosobowy w liczbie mnogiej', 'dobrzy nauczyciele', 'dobrzy nauczyciele'],
        ['niemęskoosobowy w liczbie mnogiej', 'dobre książki', 'dobre książki'],
      ],
      warning: 'Nowy książka → nowa książka. Odmieniaj także przymiotnik.',
    },
    'case-overview': {
      subtitle: 'Tabela porównawcza i rozpoznawanie przypadków w zdaniu.',
      rules: [
        'Najpierw znajdź słowo, od którego zależy wyróżniony wyraz: czasownik lub przyimek. Następnie określ jego rolę w zdaniu.',
        'Zadaj pytanie w kontekście całego zdania. Sama końcówka nie wystarczy: brata może być formą dopełniacza lub biernika.',
        'Porównaj: Szukam brata to dopełniacz, ponieważ szukać wymaga dopełniacza. Widzę brata to biernik, ponieważ brata jest dopełnieniem bliższym po widzieć.',
      ],
      columns: ['Przypadek', 'Pytania', 'Rodzaj męski', 'Rodzaj żeński', 'Rodzaj nijaki'],
      table: [
        ['Mianownik', 'kto? co?', 'dobry brat', 'nowa książka', 'małe miasto'],
        ['Dopełniacz', 'kogo? czego?', 'dobrego brata', 'nowej książki', 'małego miasta'],
        ['Celownik', 'komu? czemu?', 'dobremu bratu', 'nowej książce', 'małemu miastu'],
        ['Biernik', 'kogo? co?', 'dobrego brata', 'nową książkę', 'małe miasto'],
        ['Narzędnik', 'kim? czym?', 'dobrym bratem', 'nową książką', 'małym miastem'],
        ['Miejscownik', 'o kim? o czym?', 'o dobrym bracie', 'o nowej książce', 'o małym mieście'],
        ['Wołacz', 'zwrot do adresata', 'dobry bracie!', 'nowa książko!', 'małe miasto!'],
      ],
      warning:
        'Nie każde słowo po nie występuje w dopełniaczu: Nie jestem lekarzem to narzędnik. Nazwy przedmiotów w wołaczu w tabeli pokazują formę, ale takie zwroty są rzadkie.',
    },
    mianownik: {
      subtitle: 'Kto? Co? — podstawowa forma rzeczownika.',
      rules: [
        'Mianownik to podstawowa forma rzeczownika. Używamy go między innymi dla podmiotu zdania: Student czyta. Kto czyta? Student.',
        'Po konstrukcji to jest używamy mianownika: To jest lekarz. Porównaj: On jest lekarzem — tutaj nazwa zawodu występuje w narzędniku.',
        'W liczbie mnogiej może zmieniać się końcówka lub temat: książka → książki, okno → okna, student → studenci. Nie stosujemy jednego wzoru do wszystkich rzeczowników.',
      ],
      columns: ['Rodzaj', 'Liczba pojedyncza', 'Liczba mnoga'],
      table: [
        ['męski nieżywotny', 'nowy dom', 'nowe domy'],
        ['męskoosobowy', 'dobry student', 'dobrzy studenci'],
        ['żeński', 'nowa książka', 'nowe książki'],
        ['nijaki', 'małe okno', 'małe okna'],
      ],
      warning:
        'To jest lekarzem → To jest lekarz. Po to jest używamy tutaj mianownika, ale po on jest: On jest lekarzem.',
      ruleImages: [
        {
          path: 'images/grammar/mianownik-original.jpg',
          caption:
            'Liczba mnoga. Schemat form niemęskoosobowych. Formy męskoosobowe mają osobne wzory, np. dobrzy studenci.',
          alt: 'Mianownik liczby mnogiej: końcówki przymiotników i rzeczowników niemęskoosobowych z przykładami pomidory, ryby, jabłka. Schemat nie obejmuje form męskoosobowych.',
        },
      ],
    },
    dopelniacz: {
      subtitle: 'Kogo? Czego? — brak, zaprzeczenie i ilość.',
      rules: [
        'Brak i zaprzeczone dopełnienie bliższe: Mam książkę → Nie mam książki. Nie każde słowo po nie występuje w dopełniaczu: Nie jestem lekarzem.',
        'Przyimki: bez, do, od, dla, u, z/ze w znaczeniu skąd. Czasowniki: szukać, potrzebować, słuchać, uczyć się.',
        'Ilość: dużo czasu, pięć książek. Rzeczowniki męskie w dopełniaczu liczby pojedynczej mają końcówkę -a lub -u; ucz się formy razem ze słowem.',
      ],
      columns: ['Typ', 'Liczba pojedyncza', 'Liczba mnoga'],
      table: [
        ['męski', 'brat → brata; dom → domu', 'braci; domów'],
        ['żeński', 'książka → książki; szkoła → szkoły', 'książek; szkół'],
        ['nijaki', 'okno → okna', 'okien'],
        ['przymiotnik', 'nowego / nowej', 'nowych'],
      ],
      warning: 'Szukam brat → Szukam brata. Czasownik szukać wymaga dopełniacza.',
      ruleImages: [
        {
          path: 'images/grammar/dopelniacz-singular.jpg',
          caption: 'Liczba pojedyncza',
          alt: 'Dopełniacz liczby pojedynczej: przymiotniki z końcówkami -ego i -ej; rzeczowniki męskie z -a lub -u, żeńskie z -y lub -i i nijakie z -a, z przykładami.',
        },
        {
          path: 'images/grammar/dopelniacz-plural.jpg',
          caption:
            'Liczba mnoga. Podstawowe wzory dopełniacza; niektóre słowa mają formy wyjątkowe.',
          alt: 'Dopełniacz liczby mnogiej: przymiotniki z końcówkami -ych lub -ich; typowe końcówki rzeczowników męskich -ów, -y, -i oraz końcówka zerowa rzeczowników żeńskich i nijakich, z przykładami.',
        },
      ],
    },
    celownik: {
      subtitle: 'Komu? Czemu? — odbiorca lub adresat czynności.',
      rules: [
        'Odbiorca lub adresat: Daję mamie książkę. Pomoc: Pomagam bratu.',
        'Typowe czasowniki: pomagać, dziękować, dawać, wierzyć. Przyimki: dzięki, przeciw, wbrew.',
        'Rzeczowniki męskie często mają końcówkę -owi, ale istnieją częste wyjątki: bratu, ojcu, panu, psu. W liczbie mnogiej wszystkich rodzajów występuje -om.',
      ],
      columns: ['Typ', 'Liczba pojedyncza', 'Liczba mnoga'],
      table: [
        ['męski', 'studentowi; bratu; ojcu', 'studentom; braciom'],
        ['żeński', 'mamie; siostrze; koleżance', 'mamom; siostrom'],
        ['nijaki', 'dziecku; oknu', 'dzieciom; oknom'],
        ['przymiotnik', 'nowemu / nowej', 'nowym'],
      ],
      warning: 'Pomagam brata → Pomagam bratu. Celownik i dopełniacz to różne przypadki.',
      ruleImages: [
        {
          path: 'images/grammar/celownik.jpg',
          caption:
            'Liczba pojedyncza i mnoga. Końcówki -u w rodzaju męskim należy uczyć się razem ze słowem: bratu, ojcu, panu, psu. Nie wszystkie słowa jednosylabowe mają -u, np. synowi.',
          alt: 'Celownik: tabele liczby pojedynczej i mnogiej rzeczowników i przymiotników wszystkich rodzajów, z pytaniami komu, czemu i przykładami.',
        },
      ],
    },
    biernik: {
      subtitle: 'Kogo? Co? — dopełnienie bliższe i kierunek ruchu.',
      rules: [
        'Dopełnienie bliższe po wielu czasownikach: mam, widzę, lubię, czytam. Przy zaprzeczeniu zwykle zmienia się w dopełniacz.',
        'Rzeczowniki męskie żywotne w liczbie pojedynczej mają formę dopełniacza: widzę brata, kota. Nieżywotne zwykle mają formę mianownika: mam telefon. Istnieją wyjątki leksykalne: jem banana.',
        'Kierunek po na i w oraz ruch pod, za lub przed przedmiot wyrażamy biernikiem: idę na koncert. Miejsce po na i w wyrażamy miejscownikiem.',
      ],
      columns: ['Typ', 'Liczba pojedyncza', 'Liczba mnoga'],
      table: [
        ['męski żywotny', 'dobrego brata / kota', 'dobrych braci; dobre koty'],
        ['męski nieżywotny', 'nowy telefon', 'nowe telefony'],
        ['żeński', 'nową książkę; panią', 'nowe książki'],
        ['nijaki', 'małe okno', 'małe okna'],
      ],
      warning:
        'Mam nową książką → Mam nową książkę. Przymiotnik żeński ma końcówkę -ą, a rzeczownik żeński zwykle -ę.',
      ruleImages: [
        {
          path: 'images/grammar/biernik.jpg',
          caption: 'Liczba pojedyncza',
          alt: 'Biernik liczby pojedynczej: końcówki przymiotników i rzeczowników rodzaju męskiego, żeńskiego i nijakiego z przykładami.',
        },
        {
          path: 'images/grammar/biernik-plural.jpg',
          caption:
            'Liczba mnoga. W formach niemęskoosobowych biernik jest taki sam jak mianownik. Formy męskoosobowe mają inny wzór: widzę dobrych studentów.',
          alt: 'Mianownik i biernik liczby mnogiej rzeczowników i przymiotników niemęskoosobowych: końcówki i przykłady. Schemat nie przedstawia form męskoosobowych.',
        },
      ],
    },
    narzednik: {
      ruleImages: [
        {
          path: 'images/grammar/narzednik-singular.jpg',
          caption:
            'Liczba pojedyncza. Schemat podstawowych końcówek; rzeczowniki męskie na -a mają końcówkę -ą, np. mężczyzną.',
          alt: 'Narzędnik liczby pojedynczej: przymiotniki na -ym, -im i -ą; rzeczowniki na -em i -ą, z przykładami studentem, mężczyzną, studentką, dzieckiem.',
        },
        {
          path: 'images/grammar/narzednik-plural.jpg',
          caption:
            'Liczba mnoga. Typowa końcówka rzeczowników to -ami; istnieją wyjątki, np. ludźmi, dziećmi, przyjaciółmi.',
          alt: 'Narzędnik liczby mnogiej: przymiotniki na -ymi lub -imi, rzeczowniki na -ami; przykłady: suszonymi pomidorami, zielonymi oliwkami, słodkimi jabłkami.',
        },
      ],
      subtitle: 'Kim? Czym? — narzędzie, środek transportu i rola.',
      rules: [
        'Narzędzie lub środek transportu bez przyimka: piszę długopisem, jadę autobusem.',
        'Po być i zostać rzeczownik oznaczający zawód lub rolę występuje w narzędniku: jestem nauczycielem. Sam przymiotnik po być pozostaje w mianowniku: jestem zmęczony.',
        'Przyimki: z/ze w znaczeniu razem z oraz przed, nad, pod, za, między przy określaniu miejsca.',
      ],
      columns: ['Typ', 'Liczba pojedyncza', 'Liczba mnoga'],
      table: [
        ['męski', 'dobrym nauczycielem; bratem', 'dobrymi nauczycielami'],
        ['żeński', 'dobrą koleżanką', 'dobrymi koleżankami'],
        ['nijaki', 'małym dzieckiem', 'małymi dziećmi'],
        ['wyjątki w liczbie mnogiej', '—', 'ludźmi; przyjaciółmi'],
      ],
      warning:
        'Jestem nauczyciel → Jestem nauczycielem. Z brata → z bratem, gdy chodzi o bycie razem z kimś.',
    },
    miejscownik: {
      ruleImages: [
        {
          path: 'images/grammar/miejscownik-singular.jpg',
          caption:
            'Liczba pojedyncza. Podstawowe końcówki; zwróć uwagę na zmiany tematu, np. miasto → mieście.',
          alt: 'Miejscownik liczby pojedynczej: pytania o kim? o czym?, przyimki w, na, przy, po; końcówki przymiotników -ym, -im, -ej i rzeczowników -e, -u, -y, -i z przykładami.',
        },
      ],
      subtitle: 'O kim? O czym? — miejsce i temat wypowiedzi.',
      rules: [
        'Występuje tylko z przyimkiem: w, na, o, przy, po. Miejsce: w domu, na stole. Temat: o rodzinie.',
        'Rozróżniaj miejsce i kierunek: jestem w szkole, idę do szkoły; jestem na koncercie, idę na koncert.',
        'Często zmienia się temat wyrazu: miasto → mieście, książka → książce, brat → bracie. Takie formy trzeba ćwiczyć osobno.',
      ],
      columns: ['Typ', 'Liczba pojedyncza', 'Liczba mnoga'],
      table: [
        ['męski', 'w nowym domu; o bracie', 'w nowych domach'],
        ['żeński', 'w nowej szkole; o książce', 'w nowych szkołach'],
        ['nijaki', 'w małym mieście', 'w małych miastach'],
        ['zmiany spółgłosek', 'Polska → w Polsce', 'książka → o książkach'],
      ],
      warning: 'Mieszkam w Polska → Mieszkam w Polsce. Miejscownik wymaga przyimka.',
    },
    wolacz: {
      subtitle: 'Bezpośredni zwrot do osoby.',
      rules: [
        'Używamy go, gdy zwracamy się do kogoś: Mamo! Anno! Panie profesorze!',
        'W mowie potocznej imiona czasem pozostają w mianowniku, ale w ćwiczeniach trenujemy formy wołacza.',
        'Imiona żeńskie zakończone na -a często mają w wołaczu -o; zdrobnienia na -sia/-cia często mają -u. Przymiotnik zwykle ma taką samą formę jak w mianowniku.',
      ],
      columns: ['Mianownik', 'Wołacz', 'Zwrot do adresata'],
      table: [
        ['mama', 'mamo', 'Kochana mamo!'],
        ['Anna', 'Anno', 'Anno!'],
        ['Kasia', 'Kasiu', 'Droga Kasiu!'],
        ['pan', 'panie', 'Szanowny panie!'],
        ['profesor', 'profesorze', 'Panie profesorze!'],
        ['przyjaciel', 'przyjacielu', 'Drogi przyjacielu!'],
      ],
      warning:
        'Panie profesor → Panie profesorze! Odmieniamy zarówno tytuł pan, jak i nazwę zawodu.',
    },
    past: {
      subtitle: 'Co robił lub robiła: osoba, rodzaj i liczba.',
      rules: [
        'W czasie przeszłym końcówka wskazuje osobę i rodzaj: czytałem (mężczyzna), czytałam (kobieta).',
        'Dla oni używamy form męskoosobowych z -li, a dla one form niemęskoosobowych z -ły. Grupę mieszaną, w której jest mężczyzna, także określamy jako oni.',
        'Aspekt niedokonany i dokonany zmieniają znaczenie: czytałem opisuje czynność, a przeczytałem wskazuje jej zakończenie.',
      ],
      columns: ['Osoba', 'Męski / męskoosobowy', 'Żeński / niemęskoosobowy'],
      table: [
        ['ja', 'czytałem', 'czytałam'],
        ['ty', 'czytałeś', 'czytałaś'],
        ['on / ona', 'czytał', 'czytała'],
        ['my', 'czytaliśmy', 'czytałyśmy'],
        ['wy', 'czytaliście', 'czytałyście'],
        ['oni / one', 'czytali', 'czytały'],
      ],
      warning: 'Kobieta mówi o sobie czytałam, a nie czytałem. Forma zależy od osoby mówiącej.',
    },
    future: {
      subtitle: 'Będę robić i zrobię.',
      rules: [
        'Aspekt niedokonany: forma przyszła być + bezokolicznik (będę czytać) albo forma przyszła być + forma na -ł bez końcówki osobowej (będę czytał/czytała).',
        'Aspekt dokonany: prosta forma osobowa przeczytam, napiszę. Nie dodajemy będę do bezokolicznika dokonanego.',
        'Formy przyszłe być: będę, będziesz, będzie, będziemy, będziecie, będą.',
      ],
      columns: ['Osoba', 'Proces', 'Rezultat'],
      table: [
        ['ja', 'będę czytać', 'przeczytam'],
        ['ty', 'będziesz pisać', 'napiszesz'],
        ['on / ona', 'będzie robić', 'zrobi'],
        ['my', 'będziemy czytać', 'przeczytamy'],
        ['wy', 'będziecie pisać', 'napiszecie'],
        ['oni / one', 'będą robić', 'zrobią'],
      ],
      warning:
        'Będę przeczytać → przeczytam. Można też powiedzieć będę czytać, jeśli chodzi o proces.',
    },
    aspect: {
      subtitle: 'Robić czy zrobić: proces i rezultat.',
      rules: [
        'Aspekt niedokonany: proces, powtarzanie lub zwyczaj, np. czytać, pisać, robić.',
        'Aspekt dokonany: zakończona czynność lub konkretny rezultat, np. przeczytać, napisać, zrobić.',
        'Pary nie zawsze powstają przez dodanie takiego samego przedrostka: brać → wziąć, kupować → kupić. Ucz się czasowników parami.',
      ],
      columns: ['Niedokonany', 'Dokonany', 'Przykład rezultatu'],
      table: [
        ['czytać', 'przeczytać', 'Przeczytam całą książkę.'],
        ['pisać', 'napisać', 'Napisałem list.'],
        ['robić', 'zrobić', 'Zrobię zadanie.'],
        ['kupować', 'kupić', 'Kupiłam chleb.'],
        ['brać', 'wziąć', 'Wezmę książkę.'],
      ],
      warning: 'Przeczytam nie oznacza czytam teraz: wskazuje przyszły rezultat.',
    },
    questions: {
      subtitle: 'Czy, nie i pytania dotyczące zdania.',
      rules: [
        'Pytanie o odpowiedź tak lub nie można zacząć od czy: Czy mówisz po polsku? Nie trzeba zmieniać kolejności słów.',
        'Partykułę nie stawiamy przed czasownikiem: nie mam, nie wiem. W polszczyźnie stosujemy podwójne przeczenie: Nic nie wiem.',
        'Przy zaprzeczeniu dopełnienie bliższe zmienia się w dopełniacz: mam czas → nie mam czasu. Narzędnik pozostaje bez zmiany: nie jestem lekarzem.',
      ],
      columns: ['Funkcja', 'Słowo', 'Przykład'],
      table: [
        ['tak / nie', 'czy', 'Czy masz czas?'],
        ['miejsce', 'gdzie', 'Gdzie mieszkasz?'],
        ['kierunek', 'dokąd', 'Dokąd idziesz?'],
        ['przyczyna', 'dlaczego', 'Dlaczego się uczysz?'],
        ['przeczenie', 'nic nie', 'Nic nie wiem.'],
      ],
      warning: 'Nic wiem → Nic nie wiem. W języku polskim potrzebne są oba słowa przeczące.',
    },
    prepositions: {
      subtitle: 'Miejsce, kierunek i zrozumiałe zdanie.',
      rules: [
        'Do + dopełniacz oznacza kierunek: do szkoły. W/na + miejscownik oznacza miejsce: w szkole, na uniwersytecie.',
        'Z ma dwa znaczenia z różnymi przypadkami: z Polski (skąd? dopełniacz), z kolegą (z kim? narzędnik).',
        'Neutralny szyk: podmiot → orzeczenie → dopełnienie. Polski szyk jest elastyczny; kontekst określa akcent zdaniowy. Krótkich form mi, ci, się zwykle nie stawiamy na początku zdania.',
      ],
      columns: ['Przyimek', 'Przypadek', 'Przykład'],
      table: [
        ['do, bez, dla, od', 'dopełniacz', 'do domu, bez cukru'],
        ['dzięki, przeciw', 'celownik', 'dzięki mamie'],
        ['na (dokąd?)', 'biernik', 'na koncert'],
        ['z (razem z)', 'narzędnik', 'z bratem'],
        ['w, na, o (miejsce / temat)', 'miejscownik', 'w domu, o Polsce'],
      ],
      warning:
        'Z Polski i z Polską mają różne znaczenia. Nie wybieraj przypadku wyłącznie na podstawie przyimka bez kontekstu.',
    },
  },
};
