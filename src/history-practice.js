// Keep separate dates separate; a lifespan or explicit range covers intervening years.
export function historyYearRanges(label = '') {
  const ranges = [];
  const remainder = label.replace(/\b(\d{3,4})\s*[-–—]\s*(\d{3,4})\b/gu, (_, a, b) => {
    ranges.push([Number(a), Number(b)]);
    return '';
  });
  for (const match of remainder.matchAll(/\b\d{3,4}\b/gu)) {
    ranges.push([Number(match[0]), Number(match[0])]);
  }
  const centuries = {
    X: 10,
    XI: 11,
    XII: 12,
    XIII: 13,
    XIV: 14,
    XV: 15,
    XVI: 16,
    XVII: 17,
    XVIII: 18,
    XIX: 19,
    XX: 20,
    XXI: 21,
  };
  for (const match of remainder.matchAll(/\b([XVI]+)\s*(?:wiek|w\.)/gu)) {
    const century = centuries[match[1]];
    if (century) ranges.push([(century - 1) * 100 + 1, century * 100]);
  }
  return ranges;
}

export function validHistoryRange(from, to) {
  return (
    [from, to].every((value) => value === '' || (/^\d{1,4}$/u.test(value) && Number(value) > 0)) &&
    (from === '' || to === '' || Number(from) <= Number(to))
  );
}

export function historyPracticeYears(records, exercises = []) {
  const dates = [
    ...records.map((record) => record.year),
    ...exercises.map((exercise) => exercise.historyDate).filter(Boolean),
  ];
  return [...new Set(dates.flatMap((label) => historyYearRanges(label).flat()))].sort(
    (a, b) => a - b,
  );
}

export function matchesHistoryPractice(exercise, records, type, from = '', to = '') {
  if ((exercise.historyTestType || 'dates') !== type || !validHistoryRange(from, to)) return false;
  if (from === '' && to === '') return true;
  const source = records.find((item) => item.id === (exercise.sourceEntryId || exercise.familyId));
  const label =
    exercise.historyDate ??
    (exercise.historyTestType === 'context' || !exercise.sourceEntryId
      ? source?.year
      : exercise.level === 'event'
        ? ''
        : exercise.answers[0]);
  return historyYearRanges(label).some(
    ([start, end]) =>
      end >= (from === '' ? 0 : Number(from)) && start <= (to === '' ? Infinity : Number(to)),
  );
}
