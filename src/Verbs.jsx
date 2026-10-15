import React, { useId, useState } from 'react';
import { ArrowRight, ExternalLink, Search } from 'lucide-react';
import { useLanguage } from './interface-language.js';
import { verbs, verbSources } from './content/verbs.js';

const labels = {
  pl: {
    search: 'Znajdź czasownik',
    searchPlaceholder: 'Czasownik po polsku lub ukraińsku',
    select: 'Czasownik',
    translation: 'Tłumaczenie ukraińskie',
    matches: 'Znaleziono',
    noMatches: 'Nie znaleziono czasowników.',
    person: 'Osoba',
    present: 'Czas teraźniejszy',
    past: 'Czas przeszły',
    future: 'Czas przyszły',
    gender: 'Rodzaj form czasu przeszłego dla ja, ty, my i wy',
    masculine: 'Męski / męskoosobowy',
    feminine: 'Żeński / niemęskoosobowy',
    conjugation: 'Odmiana przez osoby',
    practice: 'Ćwicz ten czasownik',
    aspect: 'Aspekt i czasowniki powiązane',
    partner: 'Czasownik powiązany',
    noPartner: 'Brak jednego odpowiednika aspektowego',
    government: 'Łączliwość i przypadki',
    construction: 'Konstrukcja',
    question: 'Pytanie',
    case: 'Przypadek',
    example: 'Przykład',
    noGovernment: 'Brak dodatkowych konstrukcji w tym zestawieniu.',
    notes: 'Uwagi',
    sources: 'Źródła',
  },
  uk: {
    search: 'Знайти дієслово',
    searchPlaceholder: 'Дієслово польською або українською',
    select: 'Дієслово',
    translation: 'Український переклад',
    matches: 'Знайдено',
    noMatches: 'Дієслів не знайдено.',
    person: 'Особа',
    present: 'Теперішній час',
    past: 'Минулий час',
    future: 'Майбутній час',
    gender: 'Рід форм минулого часу для ja, ty, my та wy',
    masculine: 'Чоловічий / чоловічо-особовий',
    feminine: 'Жіночий / нечоловічо-особовий',
    conjugation: 'Відмінювання за особами',
    practice: 'Практикувати це дієслово',
    aspect: 'Вид і пов’язані дієслова',
    partner: 'Пов’язане дієслово',
    noPartner: 'Немає єдиного видового відповідника',
    government: 'Керування та відмінки',
    construction: 'Конструкція',
    question: 'Питання',
    case: 'Відмінок',
    example: 'Приклад',
    noGovernment: 'У цій таблиці немає додаткових конструкцій.',
    notes: 'Примітки',
    sources: 'Джерела',
  },
};

const persons = ['ja', 'ty', 'on / ona / ono', 'my', 'wy', 'oni / one'];

function searchKey(value) {
  return value.normalize('NFC').toLocaleLowerCase('pl').trim();
}

function matchingVerbs(query) {
  const key = searchKey(query);
  return verbs.filter((verb) => searchKey(`${verb.infinitive} ${verb.uk}`).includes(key));
}

function PastForm({ verb, index, gender }) {
  if (index === 2) {
    return (
      <>
        <div>on: {verb.past.masculine[2]}</div>
        <div>ona: {verb.past.feminine[2]}</div>
        <div>ono: {verb.past.neuter}</div>
      </>
    );
  }
  if (index === 5) {
    return (
      <>
        <div>oni: {verb.past.masculine[5]}</div>
        <div>one: {verb.past.feminine[5]}</div>
      </>
    );
  }
  return verb.past[gender][index];
}

export default function Verbs({ practice, initialVerbId }) {
  const language = useLanguage() === 'uk' ? 'uk' : 'pl';
  const text = labels[language];
  const id = useId();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(
    () =>
      (
        verbs.find((verb) => verb.id === initialVerbId) ||
        verbs.find((verb) => verb.infinitive === 'czytać') ||
        verbs[0]
      )?.id || '',
  );
  const [gender, setGender] = useState('masculine');
  const matches = matchingVerbs(query);
  const selected = matches.find((verb) => verb.id === selectedId) || matches[0];

  function changeSearch(value) {
    setQuery(value);
    const nextMatches = matchingVerbs(value);
    setSelectedId((current) =>
      nextMatches.some((verb) => verb.id === current) ? current : nextMatches[0]?.id || '',
    );
  }

  return (
    <section lang={language} aria-label={text.conjugation}>
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor={`${id}-search`}>
            {text.search}
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <Search size={17} aria-hidden="true" />
            </span>
            <input
              id={`${id}-search`}
              type="search"
              className="form-control"
              placeholder={text.searchPlaceholder}
              value={query}
              onChange={(event) => changeSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor={`${id}-select`}>
            {text.select}
          </label>
          <select
            id={`${id}-select`}
            className="form-select"
            value={selected?.id || ''}
            disabled={!matches.length}
            onChange={(event) => setSelectedId(event.target.value)}
            lang="pl"
          >
            {!matches.length && <option value="">{text.noMatches}</option>}
            {matches.map((verb) => (
              <option key={verb.id} value={verb.id}>
                {verb.infinitive}
                {language === 'uk' ? ` — ${verb.uk}` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="small text-secondary" role="status">
        {text.matches}: {matches.length}
      </p>
      {!selected ? (
        <p role="status">{text.noMatches}</p>
      ) : (
        <>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <div>
              <h3 className="mb-1" lang="pl">
                {selected.infinitive}
              </h3>
              {language === 'uk' ? (
                <p className="text-secondary mb-0" lang="uk">
                  {selected.uk}
                </p>
              ) : (
                <details key={selected.id}>
                  <summary>{text.translation}</summary>
                  <p className="text-secondary mb-0" lang="uk">
                    {selected.uk}
                  </p>
                </details>
              )}
            </div>
            {typeof practice === 'function' && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => practice('verb-tables', selected.id)}
              >
                {text.practice} <ArrowRight size={17} aria-hidden="true" />
              </button>
            )}
          </div>
          <fieldset className="mb-3">
            <legend className="form-label fs-6">{text.gender}</legend>
            <div className="d-flex flex-wrap gap-2">
              {['masculine', 'feminine'].map((value) => (
                <React.Fragment key={value}>
                  <input
                    type="radio"
                    className="btn-check"
                    name={`${id}-gender`}
                    id={`${id}-${value}`}
                    value={value}
                    checked={gender === value}
                    onChange={() => setGender(value)}
                  />
                  <label className="btn btn-outline-secondary text-wrap" htmlFor={`${id}-${value}`}>
                    {text[value]}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </fieldset>
          <div
            className="table-responsive mb-4"
            role="region"
            aria-label={`${text.conjugation}: ${selected.infinitive}`}
            tabIndex={0}
          >
            <table className="table table-bordered align-middle mb-0 verb-forms">
              <caption className="visually-hidden">
                {selected.infinitive} — {text.conjugation}
              </caption>
              <thead className="table-light">
                <tr>
                  <th scope="col">{text.person}</th>
                  <th scope="col">{text.present}</th>
                  <th scope="col">{text.past}</th>
                  <th scope="col">{text.future}</th>
                </tr>
              </thead>
              <tbody>
                {persons.map((person, index) => (
                  <tr key={person}>
                    <th scope="row" lang="pl" className="text-nowrap">
                      {person}
                    </th>
                    <td lang="pl">{selected.present[index]}</td>
                    <td lang="pl">
                      <PastForm verb={selected} index={index} gender={gender} />
                    </td>
                    <td lang="pl">{selected.future[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="fs-5">{text.aspect}</h3>
          <p className="mb-2">
            {selected.aspect.partner ? (
              <>
                {text.partner}: <strong lang="pl">{selected.aspect.partner}</strong>
              </>
            ) : (
              text.noPartner
            )}
          </p>
          <p>{selected.aspect.note[language]}</p>
          <h3 className="fs-5 mt-4">{text.government}</h3>
          {selected.government.length ? (
            <div
              className="table-responsive mb-4"
              role="region"
              aria-label={text.government}
              tabIndex={0}
            >
              <table className="table table-bordered align-middle mb-0">
                <caption className="visually-hidden">
                  {selected.infinitive} — {text.government}
                </caption>
                <thead className="table-light">
                  <tr>
                    <th scope="col">{text.construction}</th>
                    <th scope="col">{text.question}</th>
                    <th scope="col">{text.case}</th>
                    <th scope="col">{text.example}</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.government.map((item, index) => (
                    <tr key={`${item.construction}-${index}`}>
                      <th scope="row" lang="pl">
                        {item.construction}
                      </th>
                      <td lang="pl">{item.question}</td>
                      <td>{item.case[language]}</td>
                      <td lang="pl">{item.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>{text.noGovernment}</p>
          )}
          {selected.notes[language] && (
            <>
              <h3 className="fs-5">{text.notes}</h3>
              <p>{selected.notes[language]}</p>
            </>
          )}
        </>
      )}
      {verbSources.length > 0 && (
        <>
          <h3 className="fs-5 mt-4">{text.sources}</h3>
          <ul className="source-list">
            {verbSources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer" lang="pl">
                  {source.title} <ExternalLink size={13} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
