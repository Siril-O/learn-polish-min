const questions = [
  [
    'flag-upper-band',
    'Jaki kolor ma górny pas polskiej flagi?',
    ['biały', 'czerwony', 'niebieski', 'zielony', 'żółty'],
    'Na polskiej fladze biały pas jest na górze, a czerwony na dole.',
    'На польському прапорі біла смуга розташована вгорі, а червона внизу.',
  ],
  [
    'anthem-lyrics',
    'Kto jest autorem słów Mazurka Dąbrowskiego?',
    [
      'Józef Wybicki',
      'Adam Mickiewicz',
      'Henryk Sienkiewicz',
      'Władysław Reymont',
      'Fryderyk Chopin',
    ],
    'Autorem słów polskiego hymnu, Mazurka Dąbrowskiego, jest Józef Wybicki.',
    'Автором слів польського гімну «Мазурка Домбровського» є Юзеф Вибіцький.',
  ],
  [
    'christmas-wafer',
    'Czym tradycyjnie dzielimy się podczas Wigilii, składając sobie życzenia?',
    ['opłatkiem', 'pisanką', 'palmą wielkanocną', 'bukietem ziół', 'święconką'],
    'Podczas Wigilii w wielu rodzinach dzielimy się opłatkiem i składamy sobie życzenia.',
    'На Святвечір у багатьох родинах діляться оплатком і бажають одне одному добра.',
  ],
  [
    'easter-food-blessing',
    'W jaki dzień tradycyjnie święci się pokarmy przed Wielkanocą?',
    [
      'w Wielką Sobotę',
      'w Wielki Czwartek',
      'w Wielki Piątek',
      'w Poniedziałek Wielkanocny',
      'w Wigilię Bożego Narodzenia',
    ],
    'Święcenie pokarmów w Wielką Sobotę jest jedną z tradycji wielkanocnych.',
    'Освячення їжі у Велику суботу — одна з великодніх традицій.',
  ],
  [
    'dyngus-day',
    'Kiedy przypada śmigus-dyngus?',
    [
      'w Poniedziałek Wielkanocny',
      'w Wielką Sobotę',
      'w Wielki Piątek',
      'w Wigilię',
      'w pierwszy dzień Bożego Narodzenia',
    ],
    'Śmigus-dyngus to zwyczaj oblewania się wodą w Poniedziałek Wielkanocny.',
    'Сьміґус-динґус — звичай обливатися водою у Великодній понеділок.',
  ],
  [
    'warsaw-emblem',
    'Jaka postać znajduje się w herbie Warszawy?',
    ['Syrenka', 'Neptun', 'smok wawelski', 'Lajkonik', 'król Krak'],
    'W herbie Warszawy znajduje się Syrenka.',
    'На гербі Варшави зображена Сиренка.',
    'document-warszawa',
  ],
  [
    'warsaw-river',
    'Nad jaką rzeką leży Warszawa?',
    ['nad Wisłą', 'nad Odrą', 'nad Wartą', 'nad Brdą', 'nad Bugiem'],
    'Warszawa leży nad Wisłą.',
    'Варшава розташована над Віслою.',
    'document-warszawa',
  ],
  [
    'wroclaw-river',
    'Nad jaką rzeką leży Wrocław?',
    ['nad Odrą', 'nad Wisłą', 'nad Wartą', 'nad Brdą', 'nad Bugiem'],
    'Wrocław leży nad Odrą. Przez miasto biegną też jej dopływy i kanały.',
    'Вроцлав розташований над Одрою. Через місто проходять також її притоки й канали.',
    'document-wroclaw',
  ],
  [
    'oliwa-cathedral',
    'W którym mieście znajduje się Katedra Oliwska ze słynnymi organami?',
    ['w Gdańsku', 'w Gdyni', 'w Sopocie', 'w Krakowie', 'we Wrocławiu'],
    'Katedra Oliwska znajduje się w Gdańsku. Można w niej posłuchać organów.',
    'Олівський собор розташований у Гданську. У ньому можна послухати орган.',
    'document-gdansk',
  ],
  [
    'wawel-city',
    'W którym mieście znajduje się Wawel z zamkiem królewskim i katedrą?',
    ['w Krakowie', 'w Gdańsku', 'w Warszawie', 'w Gdyni', 'we Wrocławiu'],
    'Wawel znajduje się w Krakowie. Na wzgórzu stoją zamek królewski i katedra.',
    'Вавель розташований у Кракові. На пагорбі стоять королівський замок і собор.',
    'document-krakow',
  ],
  [
    'memling-triptych',
    'Kto namalował tryptyk „Sąd Ostateczny”, który można obejrzeć w Muzeum Narodowym w Gdańsku?',
    ['Hans Memling', 'Jan Matejko', 'Wit Stwosz', 'Henryk Tomaszewski', 'Karol Szymanowski'],
    '„Sąd Ostateczny” w Muzeum Narodowym w Gdańsku jest tryptykiem Hansa Memlinga.',
    '«Страшний суд» у Національному музеї в Гданську — триптих Ганса Мемлінга.',
    'document-gdansk',
  ],
  [
    'chopin-profession',
    'Kim był Fryderyk Chopin?',
    [
      'pianistą i kompozytorem',
      'pisarzem i publicystą',
      'malarzem',
      'astronomem',
      'aktorem filmowym',
    ],
    'Fryderyk Chopin był polskim pianistą i kompozytorem.',
    'Фридерик Шопен був польським піаністом і композитором.',
    'document-chopin-biography',
  ],
];

export const extraCultureQuestions = questions.map(
  ([slug, prompt, options, polishExplanation, explanation, sourceEntryId]) => {
    const id = `culture-extra-${slug}`;
    return {
      id,
      familyId: id,
      topic: 'culture',
      level: 'choice',
      prompt,
      answers: [options[0]],
      options,
      explanation,
      ...(sourceEntryId ? { sourceEntryId } : {}),
    };
  },
);

export const extraCultureTranslations = {
  pl: Object.fromEntries(
    questions.map(([slug, , , explanation]) => [`culture-extra-${slug}`, { explanation }]),
  ),
};
