const months =
  /(?<!\p{L})(stycznia|lutego|marca|kwietnia|maja|czerwca|lipca|sierpnia|września|października|listopada|grudnia|styczeń|luty|marzec|kwiecień|maj|czerwiec|lipiec|sierpień|wrzesień|październik|listopad|grudzień)(?!\p{L})/gu;

const approximation = /(?<!\p{L})(?:około|ok\.?)(?!\p{L})\s*/giu;

const alternatives = {
  'data ruchoma': [
    'stała data w marcu',
    'stała data w kwietniu',
    'stała data w maju',
    'stała data w czerwcu',
  ],
  'ostatni czwartek karnawału': [
    'pierwszy czwartek karnawału',
    'ostatni wtorek karnawału',
    'pierwszy piątek karnawału',
    'ostatnia niedziela karnawału',
  ],
  'pierwsza niedziela po pierwszej wiosennej pełni księżyca': [
    'pierwsza niedziela przed pierwszą wiosenną pełnią księżyca',
    'druga niedziela po pierwszej wiosennej pełni księżyca',
    'pierwsza sobota po pierwszej wiosennej pełni księżyca',
    'pierwszy poniedziałek po pierwszej wiosennej pełni księżyca',
  ],
  '25, 26 grudnia': ['24, 25 grudnia', '26, 27 grudnia', '25, 26 listopada', '5, 6 stycznia'],
  '23/24 czerwca': ['22/23 czerwca', '24/25 czerwca', '23/24 maja', '23/24 lipca'],
  'XII / XV wiek': ['XI / XIV wiek', 'XIII / XVI wiek', 'XII / XVI wiek', 'XIII / XV wiek'],
  'XVIII wiek': ['XVI wiek', 'XVII wiek', 'XIX wiek', 'XX wiek'],
  'X wiek': ['VIII wiek', 'IX wiek', 'XI wiek', 'XII wiek'],
  'XIV-XVII wiek': ['XIII-XVI wiek', 'XV-XVIII wiek', 'XII-XV wiek', 'XVI-XIX wiek'],
  'XIV-XVI wiek': ['XIII-XV wiek', 'XV-XVII wiek', 'XII-XIV wiek', 'XVI-XVIII wiek'],
  '1373/4 – 1399; 1997': [
    '1363/4 – 1389; 1987',
    '1383/4 – 1409; 2007',
    '1373/4 – 1409; 1997',
    '1383/4 – 1399; 1987',
  ],
};

export function dateAnswerShape(value) {
  const text = value.toLocaleLowerCase('pl').trim();
  if (!/\d/u.test(text) && !/\b[ivx]+\s*(?:[-/]\s*[ivx]+\s*)?wiek/u.test(text)) return 'relative';
  return text
    .replace(approximation, 'approx ')
    .replace(months, 'month')
    .replace(/\b[ivx]+\b/gu, 'century')
    .replace(/\d{3,4}/gu, 'year')
    .replace(/\d+/gu, 'day')
    .replace(/[–—]/gu, '-')
    .replace(/\s*([,;\-/])\s*/gu, '$1')
    .replace(/\s+/gu, ' ');
}

function rangeLength(value) {
  const match = value.match(/^(\d{3,4})\s*[-–—]\s*(\d{3,4})$/u);
  return match ? Number(match[2]) - Number(match[1]) : null;
}

export function historyDateChoices(answer, pool) {
  if (alternatives[answer]) return [answer, ...alternatives[answer]];
  const shape = dateAnswerShape(answer);
  const year = Number(answer.match(/\d{3,4}/u)?.[0] || 0);
  const duration = rangeLength(answer);
  const comparable = pool
    .filter((candidate) => {
      if (dateAnswerShape(candidate) !== shape) return false;
      const candidateDuration = rangeLength(candidate);
      return (
        duration === null ||
        (candidateDuration >= duration / 2 && candidateDuration <= duration * 2)
      );
    })
    .sort(
      (a, b) =>
        Math.abs(Number(a.match(/\d{3,4}/u)?.[0] || 0) - year) -
        Math.abs(Number(b.match(/\d{3,4}/u)?.[0] || 0) - year),
    );
  const choices = [answer];
  const approximationLabels = [...answer.matchAll(approximation)].map((match) => match[0]);
  const seen = new Set([answer.toLowerCase().replace(/\s/gu, '').replace(/[–—]/gu, '-')]);
  const add = (candidate) => {
    let labelIndex = 0;
    candidate = candidate.replace(approximation, () => approximationLabels[labelIndex++]);
    const key = candidate.toLowerCase().replace(/\s/gu, '').replace(/[–—]/gu, '-');
    if (!seen.has(key) && choices.length < 5) {
      seen.add(key);
      choices.push(candidate);
    }
  };
  comparable.forEach(add);
  // Shift complete years together to retain the structure and ordering of multi-part dates.
  for (const offset of [-1, 1, -5, 5, -10, 10, -20, 20]) {
    if (choices.length === 5) break;
    if (year) {
      const step = approximationLabels.length > 0 && year % 10 === 0 ? 10 : 1;
      add(answer.replace(/\d{3,4}/gu, (value) => String(Number(value) + offset * step)));
    }
  }
  if (choices.length !== 5) throw new Error(`Missing matching date alternatives: ${answer}`);
  return choices;
}
