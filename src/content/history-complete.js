import originals from '../original-history.json' with { type: 'json' };
import { historyEarly } from './history-early.js';
import { historyModern } from './history-modern.js';
import { historyExtraEarly } from './history-extra-early.js';
import { historyExtraModern } from './history-extra-modern.js';
import { historyHolidays } from './history-holidays.js';
import { historyLegends } from './history-legends.js';

const popeOriginal =
  '2 kwietnia, po długiej chorobie, umiera Jan Paweł II. Pomimo licznych sugestii i spekulacji do końca nie ustępuje z funkcji. Za pontyfikatu Jana Pawła II następują ogromne zmiany w Watykanie, a także w postrzeganiu osoby papieża zarówno przez społeczność katolicką, jak i pozostałych chrześcijan oraz wyznawców innych religii. W pogrzebie Ojca Świętego na Placu Św. Piotra uczestniczy ok. 300 tysięcy wiernych oraz 200 prezydentów i premierów, a także przedstawiciele wszystkich religii świata, w tym duchowni islamscy i żydowscy. Następca Jana Pawła II, Benedykt XVI, zezwala na natychmiastowe rozpoczęcie procesu beatyfikacyjnego Karola Wojtyły.';

const pope = {
  key: '2005-pope',
  title: 'Śmierć Jana Pawła II',
  pl: '2 kwietnia 2005 roku Jan Paweł II umiera po długiej chorobie. Wiele osób mówiło o jego możliwej rezygnacji. Papież jednak nie rezygnuje i pełni swoją funkcję do śmierci. W czasie jego pontyfikatu w Watykanie zachodzą duże zmiany. Zmienia się też to, jak papieża widzą katolicy, inni chrześcijanie i wyznawcy innych religii. W pogrzebie na Placu św. Piotra bierze udział około 300 tysięcy wiernych i 200 prezydentów oraz premierów. Są też przedstawiciele religii z całego świata, w tym duchowni muzułmańscy i żydowscy. Nowy papież, Benedykt XVI, pozwala od razu rozpocząć proces beatyfikacyjny Karola Wojtyły. Jest to proces, w którym Kościół bada, czy można ogłosić zmarłego błogosławionym.',
  uk: '2 квітня 2005 року Іван Павло II помирає після тривалої хвороби. Багато людей говорили про його можливу відставку. Однак папа не йде у відставку та виконує свої обов’язки до смерті. За його понтифікату у Ватикані відбуваються великі зміни. Змінюється й те, як папу сприймають католики, інші християни та послідовники інших релігій. У похороні на площі Святого Петра беруть участь близько 300 тисяч вірян і 200 президентів та прем’єр-міністрів. Також присутні представники релігій з усього світу, зокрема мусульманські та юдейські духовні особи. Новий папа Бенедикт XVI дозволяє одразу розпочати беатифікаційний процес Кароля Войтили. Під час цього процесу Церква вивчає, чи можна проголосити померлого блаженним.',
  originalUk:
    '2 квітня після тривалої хвороби помирає Іван Павло II. Попри численні пропозиції та припущення, він до кінця не залишає своєї посади. За понтифікату Івана Павла II відбуваються величезні зміни у Ватикані, а також у сприйнятті особи папи як католицькою спільнотою, так і іншими християнами та послідовниками інших релігій. У похороні Святішого Отця на площі Святого Петра беруть участь близько 300 тисяч вірян, 200 президентів і прем’єр-міністрів, а також представники всіх релігій світу, зокрема мусульманські та юдейські духовні особи. Наступник Івана Павла II Бенедикт XVI дозволяє негайно розпочати беатифікаційний процес Кароля Войтили.',
  notePl:
    'Liczby uczestników pogrzebu przytoczono za dokumentem; nie traktujemy ich jako dokładnego spisu. Data śmierci jest potwierdzona w dokumentach Watykanu.',
  noteUk:
    'Кількість учасників похорону наведена за документом; це не точний перепис. Дату смерті підтверджують документи Ватикану.',
  source:
    'https://press.vatican.va/content/salastampa/it/bollettino/pubblico/2005/04/03/0188/00403.html',
  date: '2 kwietnia 2005',
};

export const historyOriginals = { ...originals, '2005-pope': popeOriginal };

const repeatedChronologyPages = {
  966: [1],
  1025: [12],
  1655: [9],
  1830: [10],
  1863: [10],
  1226: [13],
  1791: [13],
  1944: [13],
  1981: [13],
};

export function completeHistory(previous) {
  const legacy = new Map(previous.map((entry) => [entry.year, entry]));
  const entries = [...historyEarly, ...historyModern, pope].map((entry) => {
    const year = entry.key === '1998' ? '1999' : entry.key === '2005-pope' ? '2005' : entry.key;
    const old = entry.key === '2005-pope' ? undefined : legacy.get(year);
    return {
      ...old,
      id: old?.id ?? `history-${entry.key.replaceAll(' ', '').replace('Ok.', 'approx-')}`,
      year,
      originalYear: entry.key === '2005-pope' ? '2005' : entry.key,
      originalKey: entry.key,
      category: 'chronology',
      sourcePages: [2, 3, 4, 5, ...(repeatedChronologyPages[entry.key] || [])],
      sourceDocument: !old && entry.source === 'source-document',
      title: old?.title ?? entry.title,
      pl: entry.pl,
      uk: entry.uk,
      original: historyOriginals[entry.key],
      originalUk: entry.originalUk,
      note: entry.noteUk || '',
      notePl: entry.notePl || '',
      date: old?.date || entry.date || '',
      source:
        old?.source ||
        (entry.source === 'source-document'
          ? 'https://www.staypoland.com/historia-polski.htm'
          : entry.source),
    };
  });
  // Keep the existing separate Gniezno lesson and its saved progress identifier.
  const additional = previous
    .filter((entry) => !entries.some((item) => item.id === entry.id))
    .map((entry) => ({ ...entry, category: 'chronology' }));
  const extra = [...historyExtraEarly, ...historyExtraModern, ...historyHolidays, ...historyLegends]
    .filter((entry) => {
      if (!entry.year) return false;
      const original = entry.original.replace(/^\d{3,4}\s+/u, '');
      const duplicate = entries.find((item) => item.original === original);
      if (!duplicate) return true;
      duplicate.sourcePages = [...new Set([...duplicate.sourcePages, ...entry.sourcePages])];
      return false;
    })
    .map((entry) => ({ ...entry, originalYear: entry.year, sourceDocument: true }));
  const chronology = [...entries, ...additional].sort(
    (a, b) =>
      Number(a.year.match(/\d+/)?.[0]) - Number(b.year.match(/\d+/)?.[0]) ||
      Number(b.originalKey === '2005-pope') - Number(a.originalKey === '2005-pope'),
  );
  return [...chronology, ...extra];
}
