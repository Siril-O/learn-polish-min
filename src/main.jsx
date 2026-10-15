import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  GraduationCap,
  ListChecks,
  RotateCcw,
  Search,
  Settings,
  Star,
  Upload,
  X,
  ArrowRight,
  Shuffle,
  Eye,
  AlertCircle,
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Verbs from './Verbs.jsx';
import { translate, useLanguage, setLanguage } from './interface-language.js';
import {
  localizeLesson,
  localizeExercise,
  localizeInterview,
  localizeHistory,
  localizeSource,
} from './content-localization.js';
import * as content from './content/index.js';
import { validateContent } from './content-contract.js';
import {
  STORAGE_KEY,
  readState,
  validateBackup,
  checkAnswer,
  toggle,
  shuffle,
  advanceSession,
} from './logic';
const routes = [
  ['grammar', 'Граматика', BookOpen],
  ['practice', 'Практика', ListChecks],
  ['karta', 'Карта поляка', GraduationCap],
  ['vocabulary', 'Словник', Star],
  ['settings', 'Налаштування', Settings],
];
const levels = {
  choice: 'Вибір відповіді',
  write: 'Вписати форму',
  sentence: 'Написати речення',
  event: 'Рік → подія',
  identify: 'Визначити відмінок',
};
let contentError = null;
try {
  validateContent(content);
} catch (error) {
  contentError = error;
}
const {
  topics = [],
  vocabulary = [],
  history = [],
  interview = [],
  sources = [],
  allExercises = [],
} = contentError ? {} : content;
const allIds = new Set(allExercises.map((q) => q.id));
const groups = [...new Set(topics.map((t) => t.group))];
function IconButton({ icon: Icon, label, ...props }) {
  return (
    <button
      type="button"
      className="btn btn-outline-secondary icon-btn"
      aria-label={label}
      title={label}
      {...props}
    >
      <Icon size={18} />
    </button>
  );
}
function Heading({ title, subtitle, children }) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        {subtitle && <p className="text-secondary mb-0">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
function DataTable({ columns, rows, columnLanguages }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered align-middle mb-0">
        <thead className="table-light">
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((v, j) => (
                <td key={j} lang={columnLanguages?.[j] ?? (j ? 'pl' : undefined)}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function RuleContent({ topic: sourceTopic }) {
  const language = useLanguage();
  const topic = localizeLesson(sourceTopic, language, content);
  const guideRecord = content.caseGuides?.[sourceTopic.id];
  const guide = guideRecord?.[language];
  return (
    <>
      <p className="topic-subtitle">{topic.subtitle}</p>
      {guide && (
        <section className="case-guide" aria-label={translate('Питання та вживання')}>
          <h3 className="section-title">{translate('Питання та вживання')}</h3>
          <DataTable
            columns={[translate('Частина мови'), translate('Питання')]}
            rows={[
              [translate('Іменник'), guide.nounQuestions],
              [translate('Прикметник'), guide.adjectiveQuestions],
            ]}
            columnLanguages={[language, language]}
          />
          <h3 className="section-title">{translate('Як поставити питання')}</h3>
          <p lang={language}>{guide.howToAsk}</p>
          <h3 className="section-title">{translate('Типові конструкції')}</h3>
          <DataTable
            columns={[translate('Конструкція'), translate('Питання'), translate('Приклад')]}
            rows={guide.patterns}
            columnLanguages={[language, language, 'pl']}
          />
        </section>
      )}
      {topic.ruleImages?.map((image) => (
        <figure className="rule-image" key={image.path}>
          <a
            href={`${import.meta.env.BASE_URL}${image.path}`}
            target="_blank"
            rel="noreferrer"
            title={translate('Відкрити таблицю в повному розмірі')}
          >
            <img src={`${import.meta.env.BASE_URL}${image.path}`} alt={image.alt} />
          </a>
          <figcaption className="small text-secondary mt-2">{image.caption}</figcaption>
        </figure>
      ))}
      <ol className="rule-list">
        {topic.rules.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ol>
      <DataTable columns={topic.columns} rows={topic.table} />
      <div className="mistake-note">
        <AlertCircle size={18} />
        <div>
          <strong>{translate('Зверни увагу')}</strong>
          <p className="mb-0">{topic.warning}</p>
        </div>
      </div>
      <h3 className="section-title">{translate('Приклади')}</h3>
      <div className="example-list">
        {topic.examples.map(([pl, uk]) => (
          <div key={pl}>
            <p lang="pl">{pl}</p>
            {language === 'pl' ? (
              <details>
                <summary>{translate('Український переклад')}</summary>
                <p className="text-secondary" lang="uk">
                  {uk}
                </p>
              </details>
            ) : (
              <p className="text-secondary" lang="uk">
                {uk}
              </p>
            )}
          </div>
        ))}
      </div>
      {guide && (
        <section className="case-analysis" aria-label={translate('Розбір речень')}>
          <h3 className="section-title">{translate('Розбір речень')}</h3>
          <DataTable
            columns={[
              translate('Речення-приклад'),
              translate('Питання в реченні'),
              translate('Відповідь'),
              translate('Пояснення'),
            ]}
            columnLanguages={['pl', language, 'pl', language]}
            rows={guide.examples.map((example) => {
              const offset = example.sentence.indexOf(example.target);
              return [
                <div key={example.sentence}>
                  <p lang="pl" className="mb-2">
                    {example.sentence.slice(0, offset)}
                    <mark>{example.target}</mark>
                    {example.sentence.slice(offset + example.target.length)}
                  </p>
                  {language === 'pl' ? (
                    <details>
                      <summary>{translate('Український переклад')}</summary>
                      <p className="mt-2 mb-0" lang="uk">
                        {example.translation}
                      </p>
                    </details>
                  ) : (
                    <p className="text-secondary mb-0" lang="uk">
                      {example.translation}
                    </p>
                  )}
                </div>,
                example.question,
                example.answer,
                example.explanation,
              ];
            })}
          />
          <p className="case-guide-note" lang={language}>
            {guide.note}
          </p>
          <h3 className="section-title">{translate('Джерела цієї теми')}</h3>
          <ul className="source-list">
            {guideRecord.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.title} <ExternalLink size={13} />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
function RuleDialog({ topic, close }) {
  const dialog = useRef();
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement;
    element.showModal();
    return () => {
      element.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="rule-dialog"
      onCancel={close}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
      aria-labelledby="rule-title"
    >
      <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
        <h2 id="rule-title">{translate(topic.title)}</h2>
        <IconButton icon={X} label={translate('Закрити правило')} onClick={close} />
      </div>
      {topic.id === 'verb-tables' ? (
        <Verbs initialVerbId={topic.selectedVerbId} />
      ) : (
        <RuleContent topic={topic} />
      )}
    </dialog>
  );
}
function Grammar({ selected, select, practice }) {
  const language = useLanguage();
  const [search, setSearch] = useState('');
  const topic = topics.find((t) => t.id === selected) || topics[0];
  const visible = topics.filter((t) => {
    const localized = localizeLesson(t, language, content);
    return `${t.title} ${translate(t.title)} ${localized.subtitle} ${localized.rules.join(' ')}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });
  return (
    <>
      <Heading
        title={translate('Граматика')}
        subtitle={translate('Правило, приклади та практика — тема за темою.')}
      >
        <button className="btn btn-outline-secondary" onClick={() => select('case-overview')}>
          {translate('Таблиця відмінків')}
        </button>
      </Heading>
      <div className="grammar-layout">
        <aside className="topic-nav" aria-label={translate('Теми граматики')}>
          <label className="search-field">
            <Search size={17} />
            <input
              className="form-control"
              aria-label={translate('Знайти тему')}
              placeholder={translate('Знайти тему…')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          {groups.map((group) => {
            const list = visible.filter((t) => t.group === group);
            return (
              list.length > 0 && (
                <div className="topic-group" key={group}>
                  <h2>{translate(group)}</h2>
                  {list.map((t) => (
                    <button
                      key={t.id}
                      className={`topic-link ${t.id === topic.id ? 'active' : ''}`}
                      aria-current={t.id === topic.id ? 'page' : undefined}
                      onClick={() => select(t.id)}
                    >
                      {translate(t.title)}
                      <ChevronRight size={15} />
                    </button>
                  ))}
                </div>
              )
            );
          })}
          {!visible.length && (
            <p className="text-secondary px-2">{translate('Тем не знайдено.')}</p>
          )}
        </aside>
        <article className="lesson" key={topic.id}>
          <>
            <div className="lesson-header">
              <h2>{translate(topic.title)}</h2>
              <span className="badge text-bg-light">{translate(topic.group)}</span>
            </div>
            {topic.id === 'verb-tables' ? (
              <Verbs practice={practice} />
            ) : (
              <RuleContent topic={topic} />
            )}
            <div className="lesson-footer">
              <button className="btn btn-primary" onClick={() => practice(topic.id)}>
                {translate('Практикувати тему ')}
                <ArrowRight size={17} />
              </button>
              <span className="small text-secondary">
                {allExercises.filter((q) => q.topic === topic.id).length}
                {translate(' завдань ·')}{' '}
                {new Set(allExercises.filter((q) => q.topic === topic.id).map((q) => q.level)).size}{' '}
                {translate('рівні')}
              </span>
            </div>
          </>
        </article>
      </div>
    </>
  );
}
function Practice({ initialTopic, initialVerbId, state, update }) {
  const language = useLanguage();
  const [topic, setTopic] = useState(initialTopic || 'all');
  const [verbId, setVerbId] = useState(initialVerbId || '');
  const [level, setLevel] = useState('choice');
  const [count, setCount] = useState('10');
  const [session, setSession] = useState(null);
  const [rule, setRule] = useState(null);
  const source = allExercises.filter((q) => {
    if (topic === 'mistakes') return state.mistakes.includes(q.id);
    if (topic === 'all') return topics.some((t) => t.id === q.topic);
    if (topic === 'cases') return topics.some((t) => t.id === q.topic && t.group === 'Відмінки');
    if (topic === 'saved') return q.topic === 'vocabulary' && state.saved.includes(q.wordId);
    if (topic === 'verb-tables' && verbId) return q.topic === topic && q.verbId === verbId;
    return q.topic === topic;
  });
  const available = source.filter(
    (q) =>
      topic === 'mistakes' ||
      q.level ===
        (source.some((item) => item.level === level)
          ? level
          : Object.keys(levels).find((value) => source.some((item) => item.level === value))),
  );
  function start(list = available) {
    setRule(null);
    setSession({
      items: shuffle(list)
        .slice(0, Number(count))
        .map((q) => ({
          ...q,
          options: q.options ? shuffle(q.options) : null,
        })),
      index: 0,
      wrong: [],
      correct: 0,
    });
  }
  const supports = Object.keys(levels).filter((value) => source.some((q) => q.level === value));
  const activeLevel = supports.includes(level) ? level : supports[0];
  function changeTopic(value) {
    setVerbId('');
    setTopic(value);
    setLevel('choice');
    setSession(null);
  }
  const finished = session && session.index >= session.items.length;
  return (
    <>
      <Heading
        title={translate('Практика')}
        subtitle={translate('Обери тему та складність. Після відповіді — пояснення.')}
      />
      {!session && (
        <>
          <div className="practice-config">
            <div>
              <label className="form-label" htmlFor="practice-topic">
                {translate('Тема')}
              </label>
              <select
                id="practice-topic"
                className="form-select"
                value={topic}
                onChange={(e) => changeTopic(e.target.value)}
              >
                <option value="all">{translate('Уся граматика')}</option>
                <option value="cases">{translate('Змішані відмінки')}</option>
                <option value="mistakes">
                  {translate('Мої помилки (')}
                  {state.mistakes.filter((id) => allIds.has(id)).length})
                </option>
                <optgroup label={translate('Граматика')}>
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {translate(t.title)}
                    </option>
                  ))}
                </optgroup>
                <optgroup label={translate('Карта поляка')}>
                  <option value="history">{translate('Дати й події')}</option>
                  <option value="culture">{translate('Культура та традиції')}</option>
                  <option value="vocabulary">{translate('Слова з текстів')}</option>
                  <option value="saved">{translate('Збережені слова')}</option>
                </optgroup>
              </select>
            </div>
            {topic === 'verb-tables' && (
              <div>
                <label className="form-label" htmlFor="practice-verb">
                  {translate('Дієслово')}
                </label>
                <select
                  id="practice-verb"
                  className="form-select"
                  value={verbId}
                  onChange={(event) => setVerbId(event.target.value)}
                >
                  <option value="">{translate('Усі дієслова')}</option>
                  {content.verbs.map((verb) => (
                    <option key={verb.id} value={verb.id}>
                      {verb.infinitive}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="form-label" htmlFor="practice-level">
                {translate('Складність')}
              </label>
              <select
                id="practice-level"
                className="form-select"
                disabled={topic === 'mistakes' || !supports.length}
                value={activeLevel || ''}
                onChange={(e) => setLevel(e.target.value)}
              >
                {supports.map((l) => (
                  <option key={l} value={l}>
                    {translate(levels[l])}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label" htmlFor="practice-count">
                {translate('Завдань у сесії')}
              </label>
              <select
                id="practice-count"
                className="form-select"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              >
                {[5, 10, 20, 50].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="session-start">
            <span className="text-secondary">
              {translate('Доступно: ')}
              {available.length}
              {translate(' завдань')}
            </span>
            <button
              className="btn btn-primary"
              disabled={!available.length}
              onClick={() => start()}
            >
              {translate('Почати сесію ')}
              <ArrowRight size={17} />
            </button>
          </div>
          {!available.length && (
            <div className="empty-state">
              <CheckCircle2 size={30} />
              <h2>
                {topic === 'mistakes'
                  ? translate('Немає помилок для повторення')
                  : translate('Поки немає завдань')}
              </h2>
              <p className="text-secondary">
                {topic === 'saved'
                  ? translate('Познач слова зірочкою у словнику.')
                  : translate('Обери іншу тему або пройди нову вправу.')}
              </p>
            </div>
          )}
          <div className="practice-guide">
            <h2>{translate('Від впізнавання до власного речення')}</h2>
            <div className="level-list">
              <div>
                <span>01</span>
                <strong>{translate('Вибір відповіді')}</strong>
                <p>{translate('Знайди правильну форму серед трьох варіантів.')}</p>
              </div>
              <div>
                <span>02</span>
                <strong>{translate('Вписати форму')}</strong>
                <p>{translate('Пригадай закінчення без готових відповідей.')}</p>
              </div>
              <div>
                <span>03</span>
                <strong>{translate('Написати речення')}</strong>
                <p>{translate('Переклади українське речення польською.')}</p>
              </div>
            </div>
          </div>
        </>
      )}
      {session && !finished && (
        <Quiz
          key={`${session.index}-${session.items[session.index]?.id}`}
          item={session.items[session.index]}
          index={session.index}
          total={session.items.length}
          onRule={setRule}
          exit={() => setSession(null)}
          checked={(item, correct) =>
            update((s) => ({
              ...s,
              mistakes: correct
                ? s.mistakes.filter((id) => id !== item.id)
                : [...new Set([...s.mistakes, item.id])],
            }))
          }
          next={(correct) => setSession((s) => advanceSession(s, session.index, correct))}
        />
      )}{' '}
      {finished && (
        <div className="result-panel">
          <CheckCircle2 size={38} className="text-success" />
          <h2>{translate('Сесію завершено')}</h2>
          <p className="result-score">
            {session.correct} <span>/ {session.items.length}</span>
          </p>
          <p className="text-secondary">
            {session.wrong.length
              ? translate(`${session.wrong.length} завдань можна повторити.`)
              : translate('Усі відповіді правильні.')}
          </p>
          {session.wrong.length > 0 && (
            <div className="review-list">
              {session.wrong.map((q) => (
                <div key={q.id}>
                  <span>{localizeExercise(q, language, content).prompt}</span>
                  <strong lang="pl">{q.answers[0]}</strong>
                </div>
              ))}
            </div>
          )}
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {session.wrong.length > 0 && (
              <button className="btn btn-primary" onClick={() => start(session.wrong)}>
                <RotateCcw size={17} />
                {translate(' Повторити помилки')}
              </button>
            )}
            <button className="btn btn-outline-secondary" onClick={() => setSession(null)}>
              {translate('До налаштувань сесії')}
            </button>
          </div>
        </div>
      )}
      {rule && <RuleDialog topic={rule} close={() => setRule(null)} />}
    </>
  );
}
function Quiz({ item, index, total, checked, next, exit, onRule }) {
  const language = useLanguage();
  const displayItem = localizeExercise(item, language, content);
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState(null);
  const input = useRef();
  const nextButton = useRef();
  const submitted = useRef(false);
  const topic = topics.find((t) => t.id === item.topic);
  useEffect(() => {
    if (!item.options) input.current?.focus();
  }, [item]);
  useEffect(() => {
    if (feedback !== null) nextButton.current?.focus();
  }, [feedback]);
  function submit(e) {
    e.preventDefault();
    if (!value.trim() || submitted.current || e.nativeEvent?.isComposing) return;
    submitted.current = true;
    const correct = checkAnswer(value, item.answers);
    setFeedback(correct);
    checked(item, correct);
  }
  function addLetter(letter) {
    const el = input.current;
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;
    setValue(value.slice(0, start) + letter + value.slice(end));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + 1, start + 1);
    });
  }
  return (
    <div className="quiz-panel">
      <div className="quiz-top">
        <span className="text-secondary">
          {translate('Завдання ')}
          {index + 1}
          {translate(' з ')}
          {total}
        </span>
        <IconButton icon={X} label={translate('Завершити сесію')} onClick={exit} />
      </div>
      <div
        className="progress mb-4"
        role="progressbar"
        aria-label={translate('Поточна сесія')}
        aria-valuenow={index}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <div
          className="progress-bar"
          style={{
            width: `${(index / total) * 100}%`,
          }}
        />
      </div>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
        <span className="badge text-bg-light">
          {translate(topic?.title) ||
            (item.topic === 'history'
              ? translate('Дати й події')
              : item.topic === 'culture'
                ? translate('Культура')
                : translate('Словник'))}
        </span>
        <span className="small text-secondary">{translate(levels[item.level])}</span>
      </div>
      <h2
        className="question"
        lang={
          ['sentence', 'vocabulary'].includes(item.level) || item.topic === 'vocabulary'
            ? 'uk'
            : 'pl'
        }
      >
        {item.level === 'identify'
          ? (() => {
              const offset = displayItem.prompt.indexOf(item.targetWord);
              return (
                <>
                  {displayItem.prompt.slice(0, offset)}
                  <mark>{item.targetWord}</mark>
                  {displayItem.prompt.slice(offset + item.targetWord.length)}
                </>
              );
            })()
          : displayItem.prompt}
      </h2>
      {item.level === 'identify' && (
        <p className="text-secondary">{translate('У якому відмінку виділене слово?')}</p>
      )}
      {item.level === 'sentence' && (
        <p className="text-secondary">
          {translate('Переклади польською, використовуючи форми з цієї теми.')}
        </p>
      )}
      <form onSubmit={submit}>
        {item.options ? (
          <fieldset disabled={feedback !== null} className="answer-options">
            <legend className="visually-hidden">{translate('Вибери відповідь')}</legend>
            {item.options.map((option, i) => (
              <label
                key={option}
                className={`answer-option ${value === option ? 'selected' : ''} ${feedback !== null && checkAnswer(option, item.answers) ? 'correct' : ''}`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={value === option}
                  onChange={(e) => setValue(e.target.value)}
                />
                <span className="option-number">{i + 1}</span>
                <span lang="pl">{option}</span>
                {feedback !== null && checkAnswer(option, item.answers) && <Check size={19} />}
              </label>
            ))}
          </fieldset>
        ) : (
          <>
            <label className="form-label small" htmlFor="written-answer">
              {item.topic === 'history' ? translate('Рік') : translate('Твоя відповідь польською')}
            </label>
            <input
              ref={input}
              id="written-answer"
              className="form-control form-control-lg"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={feedback !== null}
              autoComplete="off"
              spellCheck={false}
              lang="pl"
              inputMode={item.topic === 'history' ? 'numeric' : 'text'}
            />
            {item.topic !== 'history' && (
              <div className="diacritics" aria-label={translate('Польські літери')}>
                {'ąćęłńóśźż'.split('').map((l) => (
                  <button
                    type="button"
                    className="btn btn-light"
                    key={l}
                    disabled={feedback !== null}
                    onClick={() => addLetter(l)}
                    aria-label={translate(`Вставити ${l}`)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
        {feedback === null && (
          <button className="btn btn-primary mt-4" disabled={!value.trim()} type="submit">
            {translate('Перевірити ')}
            <Check size={18} />
          </button>
        )}
      </form>
      {feedback !== null && (
        <div className={`answer-feedback ${feedback ? 'is-correct' : 'is-wrong'}`} role="status">
          <div className="d-flex align-items-center gap-2 mb-2">
            {feedback ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <strong>{feedback ? translate('Правильно') : translate('Спробуй запам’ятати')}</strong>
          </div>
          {!feedback && (
            <p className="mb-2">
              {translate('Правильна відповідь: ')}
              <strong lang="pl">{item.answers[0]}</strong>
            </p>
          )}
          <p className="mb-0" lang={language}>
            {displayItem.explanation}
          </p>
          {!feedback && item.level === 'sentence' && (
            <p className="small mt-2 mb-0">
              {translate(
                'Показано навчальний зразок; інший природний переклад теж може бути правильним. Автоперевірка приймає лише передбачені варіанти.',
              )}
            </p>
          )}
        </div>
      )}
      <div className="quiz-bottom">
        {topic && (
          <button
            className="btn btn-link p-0"
            onClick={() => onRule(item.verbId ? { ...topic, selectedVerbId: item.verbId } : topic)}
          >
            <BookOpen size={17} />
            {translate(' Відкрити правило')}
          </button>
        )}
        {feedback !== null && (
          <button
            ref={nextButton}
            className="btn btn-primary ms-auto"
            onClick={() => next(feedback)}
          >
            {index + 1 === total ? translate('Результат') : translate('Далі')}
            <ArrowRight size={17} />
          </button>
        )}
      </div>
    </div>
  );
}
function Karta({ practice }) {
  const language = useLanguage();
  const historyEntries = history.map((entry) => localizeHistory(entry, language, content));
  const interviewEntries = interview.map((entry) => localizeInterview(entry, language, content));
  const [tab, setTab] = useState('history');
  const [search, setSearch] = useState('');
  return (
    <>
      <Heading
        title={translate('Карта поляка')}
        subtitle={translate('Історія, традиції та підготовка до розмови польською.')}
      />
      <div className="section-tabs" role="group" aria-label={translate('Матеріали Карти поляка')}>
        {[
          ['history', translate('Історія')],
          ['interview', translate('Співбесіда')],
          ['culture', translate('Культура і традиції')],
        ].map(([id, title]) => (
          <button
            className={`btn ${tab === id ? 'btn-primary' : 'btn-outline-secondary'}`}
            key={id}
            onClick={() => {
              setTab(id);
              setSearch('');
            }}
          >
            {translate(title)}
          </button>
        ))}
      </div>
      {tab === 'history' && (
        <>
          <div className="toolbar">
            <label className="search-field">
              <Search size={17} />
              <input
                className="form-control"
                placeholder={translate('Дата або подія…')}
                aria-label={translate('Знайти історичну подію')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button className="btn btn-primary" onClick={() => practice('history')}>
              {translate('Тест на дати й події ')}
              <ArrowRight size={17} />
            </button>
          </div>
          <div className="history-list">
            {historyEntries
              .filter((h) =>
                `${h.year} ${h.title} ${h.uk}`.toLowerCase().includes(search.toLowerCase()),
              )
              .map((h) => (
                <article className="history-item" key={h.id}>
                  <div className="history-year">
                    {h.year}
                    {h.date && <span lang="pl">{h.date.replace(` ${h.year}`, '')}</span>}
                  </div>
                  <div>
                    <h2 lang="pl">{h.title}</h2>
                    <p className="history-polish" lang="pl">
                      {h.pl}
                    </p>
                    <details>
                      <summary>{translate('Український переклад')}</summary>
                      <p className="mt-2">{h.uk}</p>
                    </details>
                    {h.original && (
                      <details>
                        <summary>{translate('Оригінал наданого тексту')}</summary>
                        <blockquote lang="pl" className="original-text">
                          {h.original}
                        </blockquote>
                        {h.note && (
                          <p className="correction-note">
                            <strong>{translate('Уточнення:')}</strong> {h.note}
                          </p>
                        )}
                      </details>
                    )}
                    <a className="source-link" href={h.source} target="_blank" rel="noreferrer">
                      {translate('Джерело ')}
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </article>
              ))}
          </div>
          {!history.some((h) =>
            `${h.year} ${h.title} ${h.uk}`.toLowerCase().includes(search.toLowerCase()),
          ) && <p className="empty-state text-secondary">{translate('Подій не знайдено.')}</p>}
        </>
      )}
      {tab === 'interview' && (
        <>
          <div className="info-line">
            <BookOpen size={19} />
            <p>
              {translate(
                'Потренуй відповідь уголос, а потім відкрий приклад. Особисті відповіді заповнюй власними відомостями.',
              )}
            </p>
          </div>
          <div className="interview-list">
            {interviewEntries.map((q, i) => (
              <article key={q.id}>
                <div className="small text-secondary mb-2">
                  {String(i + 1).padStart(2, '0')} · {translate(q.category)}
                </div>
                <h2 lang="pl">{q.q}</h2>
                {language === 'uk' ? (
                  <p className="text-secondary" lang="uk">
                    {q.uk}
                  </p>
                ) : (
                  <details>
                    <summary>{translate('Український переклад')}</summary>
                    <p className="text-secondary" lang="uk">
                      {q.uk}
                    </p>
                  </details>
                )}
                <details>
                  <summary>{translate('Приклад відповіді')}</summary>
                  <p className="model-answer" lang="pl">
                    {q.answer}
                  </p>
                  <p className="small text-secondary mb-0">{q.tip}</p>
                </details>
              </article>
            ))}
          </div>
          <a
            className="source-link mt-3"
            href={
              sources.find(([label]) => /gov|співбес|interview/i.test(label))?.[1] || sources[0][1]
            }
            target="_blank"
            rel="noreferrer"
          >
            {translate('Про співбесіду · Gov.pl ')}
            <ExternalLink size={13} />
          </a>
        </>
      )}
      {tab === 'culture' && (
        <>
          <div className="toolbar">
            <p className="mb-0 text-secondary">{translate('Символи, свята та звичаї.')}</p>
            <button className="btn btn-primary" onClick={() => practice('culture')}>
              {translate('Перевірити знання ')}
              <ArrowRight size={17} />
            </button>
          </div>
          <div className="culture-list">
            {interviewEntries
              .filter((q) => ['Традиції', 'Символи', 'Свята', 'Країна'].includes(q.category))
              .map((q) => (
                <article key={q.id}>
                  <span className="badge text-bg-light mb-2">{translate(q.category)}</span>
                  <h2 lang="pl">{q.q}</h2>
                  <p lang="pl">{q.answer}</p>
                  <p className="small text-secondary mb-0">{q.tip}</p>
                </article>
              ))}
          </div>
        </>
      )}
    </>
  );
}
function Vocabulary({ state, update, practice }) {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState('all');
  const [filter, setFilter] = useState('all');
  const [mode, setMode] = useState('list');
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [direction, setDirection] = useState('pl');
  const words = vocabulary.filter(
    (w) =>
      (kind === 'all' || w.kind === kind) &&
      (filter === 'all' ||
        (filter === 'saved' ? state.saved.includes(w.id) : !state.known.includes(w.id))) &&
      `${w.form} ${w.base} ${w.uk}`.toLowerCase().includes(query.toLowerCase()),
  );
  function begin() {
    setCards(shuffle(words));
    setIndex(0);
    setRevealed(false);
    setMode('cards');
  }
  const word = cards[index];
  function answer(known) {
    if (!word || !revealed) return;
    if (!known) setCards((items) => [...items, word]);
    if (known)
      update((s) => ({
        ...s,
        known: [...new Set([...s.known, word.id])],
      }));
    else
      update((s) => ({
        ...s,
        known: s.known.filter((id) => id !== word.id),
      }));
    setIndex((i) => i + 1);
    setRevealed(false);
  }
  return (
    <>
      <Heading
        title={translate('Словник')}
        subtitle={translate(`${vocabulary.length} слів із текстів · дієслова в інфінітиві`)}
      >
        <button
          className="btn btn-primary"
          onClick={() => practice(filter === 'saved' ? 'saved' : 'vocabulary')}
        >
          {translate('Тест на слова ')}
          <ArrowRight size={17} />
        </button>
      </Heading>
      {mode === 'list' ? (
        <>
          <div className="vocab-toolbar">
            <label className="search-field">
              <Search size={17} />
              <input
                className="form-control"
                aria-label={translate('Знайти слово')}
                placeholder={translate('Польське слово або переклад…')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <select
              className="form-select"
              aria-label={translate('Частина мови')}
              value={kind}
              onChange={(e) => setKind(e.target.value)}
            >
              <option value="all">{translate('Усі частини мови')}</option>
              {[...new Set(vocabulary.map((w) => w.kind))].map((k) => (
                <option key={k} value={k}>
                  {translate(k)}
                </option>
              ))}
            </select>
            <select
              className="form-select"
              aria-label={translate('Відбір слів')}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">{translate('Усі слова')}</option>
              <option value="saved">{translate('Збережені')}</option>
              <option value="unknown">{translate('Ще вчу')}</option>
            </select>
            <button className="btn btn-outline-secondary" disabled={!words.length} onClick={begin}>
              <Shuffle size={17} />
              {translate(' Картки')}
            </button>
          </div>
          <p className="small text-secondary">
            {translate('Знайдено: ')}
            {words.length}
          </p>
          {words.length ? (
            <div className="table-responsive">
              <table className="table vocabulary-table align-middle">
                <thead>
                  <tr>
                    <th scope="col" aria-label={translate('Збереження')}></th>
                    <th scope="col">{translate('Початкова форма')}</th>
                    <th scope="col">{translate('У тексті')}</th>
                    <th scope="col">{translate('Українською')}</th>
                  </tr>
                </thead>
                <tbody>
                  {words.map((w) => (
                    <tr key={w.id}>
                      <td>
                        <button
                          className={`btn icon-btn save-word ${state.saved.includes(w.id) ? 'is-saved' : ''}`}
                          aria-label={`${state.saved.includes(w.id) ? translate('Прибрати зі збережених') : translate('Зберегти')}: ${w.base}`}
                          title={translate('Зберегти слово')}
                          aria-pressed={state.saved.includes(w.id)}
                          onClick={() =>
                            update((s) => ({
                              ...s,
                              saved: toggle(s.saved, w.id),
                            }))
                          }
                        >
                          <Star size={18} />
                        </button>
                      </td>
                      <td>
                        <strong lang="pl">{w.base}</strong>
                        <span className="word-kind">
                          {translate(w.kind)}
                          {state.known.includes(w.id) ? translate(' · вивчено') : ''}
                        </span>
                      </td>
                      <td lang="pl">{w.form}</td>
                      <td>{w.uk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <Search size={28} />
              <h2>{translate('Слів не знайдено')}</h2>
              <p className="text-secondary">{translate('Зміни пошук або фільтри.')}</p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="toolbar">
            <button className="btn btn-outline-secondary" onClick={() => setMode('list')}>
              <ChevronLeft size={17} />
              {translate(' До словника')}
            </button>
            <select
              className="form-select direction-select"
              aria-label={translate('Напрямок карток')}
              value={direction}
              onChange={(e) => {
                setDirection(e.target.value);
                setRevealed(false);
              }}
            >
              <option value="pl">{translate('Польська → українська')}</option>
              <option value="uk">{translate('Українська → польська')}</option>
            </select>
          </div>
          {word ? (
            <div className="flashcard">
              <div className="small text-secondary">
                {translate('Картка ')}
                {index + 1}
                {translate(' з ')}
                {cards.length}
              </div>
              <span className="badge text-bg-light mt-3">{translate(word.kind)}</span>
              <h2 lang={direction === 'pl' ? 'pl' : 'uk'}>
                {direction === 'pl' ? word.base : word.uk}
              </h2>
              {revealed ? (
                <>
                  <p className="flash-answer" lang={direction === 'pl' ? 'uk' : 'pl'}>
                    {direction === 'pl' ? word.uk : word.base}
                  </p>
                  <p className="small text-secondary">
                    {translate('У тексті: ')}
                    <span lang="pl">{word.form}</span>
                  </p>
                  <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
                    <button className="btn btn-outline-secondary" onClick={() => answer(false)}>
                      <RotateCcw size={17} />
                      {translate(' Ще вчу')}
                    </button>
                    <button className="btn btn-primary" onClick={() => answer(true)}>
                      <Check size={17} />
                      {translate(' Знаю')}
                    </button>
                  </div>
                </>
              ) : (
                <button className="btn btn-primary mt-4" onClick={() => setRevealed(true)}>
                  <Eye size={17} />
                  {translate(' Показати переклад')}
                </button>
              )}
            </div>
          ) : (
            <div className="result-panel">
              <CheckCircle2 size={36} className="text-success" />
              <h2>{translate('Картки завершено')}</h2>
              <p className="text-secondary">
                {translate('Переглянуто: ')}
                {cards.length}
              </p>
              <button className="btn btn-primary" onClick={() => setMode('list')}>
                {translate('До словника')}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
function SettingsPage({ state, update, warning }) {
  const language = useLanguage();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState(false);
  function exportBackup() {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `polski-praktyka-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const importSequence = useRef(0);
  useEffect(
    () => () => {
      importSequence.current += 1;
    },
    [],
  );
  async function importBackup(e) {
    const input = e.target;
    const file = input.files[0];
    const sequence = ++importSequence.current;
    if (!file) return;
    try {
      if (file.size > 2 * 1024 * 1024) throw new Error('Backup exceeds size limit');
      const data = validateBackup(JSON.parse(await file.text()), content);
      if (sequence !== importSequence.current) return;
      update((current) => ({
        ...data,
        lastView: current.lastView,
      }));
      setMessage('Резервну копію відновлено.');
      setError(false);
    } catch {
      if (sequence !== importSequence.current) return;
      setMessage(
        'Не вдалося імпортувати копію. Перевір формат JSON, версію та розмір файлу (до 2 МБ).',
      );
      setError(true);
    } finally {
      if (sequence === importSequence.current) input.value = '';
    }
  }
  return (
    <>
      <Heading
        title={translate('Налаштування')}
        subtitle={translate('Твої навчальні дані та резервні копії.')}
      />
      <div className="settings-section">
        <h2>{translate('Збереження у браузері')}</h2>
        <p className="text-secondary">
          {translate(
            'Зберігаються остання тема, збережені й вивчені слова та помилки. Дані залишаються в цьому браузері й не надсилаються на сервер. Видалення даних сайту також видалить збереження.',
          )}
        </p>
        <dl className="storage-stats">
          <div>
            <dt>{translate('Збережені слова')}</dt>
            <dd>{state.saved.length}</dd>
          </div>
          <div>
            <dt>{translate('Вивчені слова')}</dt>
            <dd>{state.known.length}</dd>
          </div>
          <div>
            <dt>{translate('Помилки')}</dt>
            <dd>{state.mistakes.length}</dd>
          </div>
        </dl>
        {warning && <div className="alert alert-warning">{translate(warning)}</div>}
        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-primary" onClick={exportBackup}>
            <Download size={17} />
            {translate(' Експорт копії')}
          </button>
          <label className="btn btn-outline-secondary import-label">
            <Upload size={17} />
            {translate(' Імпорт копії')}
            <input type="file" accept="application/json,.json" onChange={importBackup} />
          </label>
        </div>
        <p className="small text-secondary mt-2">
          {translate('Імпорт замінить поточні навчальні дані даними з файлу.')}
        </p>
        {message && (
          <div className={`alert ${error ? 'alert-danger' : 'alert-success'}`} role="status">
            {translate(message)}
          </div>
        )}
      </div>
      <div className="settings-section">
        <h2>{translate('Повторення помилок')}</h2>
        <p className="text-secondary">
          {translate('Правильна відповідь у повторній вправі прибирає її зі списку помилок.')}
        </p>
        {confirm ? (
          <div className="d-flex gap-2 flex-wrap align-items-center">
            <span>{translate('Очистити список помилок?')}</span>
            <button
              className="btn btn-danger"
              onClick={() => {
                update((s) => ({
                  ...s,
                  mistakes: [],
                }));
                setConfirm(false);
              }}
            >
              {translate('Очистити')}
            </button>
            <button className="btn btn-outline-secondary" onClick={() => setConfirm(false)}>
              {translate('Скасувати')}
            </button>
          </div>
        ) : (
          <button
            className="btn btn-outline-danger"
            disabled={!state.mistakes.length}
            onClick={() => setConfirm(true)}
          >
            <RotateCcw size={17} />
            {translate(' Очистити помилки')}
          </button>
        )}
      </div>
      <div className="settings-section">
        <h2>{translate('Джерела навчальних матеріалів')}</h2>
        <ul className="source-list">
          {sources.map(([label, url]) => (
            <li key={url}>
              <a href={url} target="_blank" rel="noreferrer">
                {localizeSource(label, language, content)} <ExternalLink size={13} />
              </a>
            </li>
          ))}
        </ul>
        <p className="small text-secondary">
          {translate(
            'Історичні події мають окремі посилання на джерела. Приклади та вправи створені для цього застосунку. Приклади співбесіди є тренувальними, а не офіційним переліком питань.',
          )}
        </p>
      </div>
    </>
  );
}
function App() {
  const language = useLanguage();
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  const initial = useMemo(() => {
    try {
      return readState(window.localStorage, content);
    } catch {
      return readState(
        {
          getItem: () => {
            throw new Error();
          },
        },
        content,
      );
    }
  }, []);
  const [state, update] = useState(initial.state);
  const [warning, setWarning] = useState(initial.warning);
  const routeFromHash = () =>
    routes.some(([id]) => id === location.hash.slice(1)) ? location.hash.slice(1) : null;
  const [view, setView] = useState(routeFromHash() || initial.state.lastView);
  const [practiceTopic, setPracticeTopic] = useState('all');
  const [practiceVerbId, setPracticeVerbId] = useState('');
  const [practiceKey, setPracticeKey] = useState(0);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      setWarning(
        'Браузер не дозволив зберегти дані. Сесія працює; експортуй копію в налаштуваннях.',
      );
    }
  }, [state]);
  useEffect(() => {
    const handle = () => {
      const next = routeFromHash();
      if (next) {
        setView(next);
        update((current) => ({
          ...current,
          lastView: next,
        }));
      }
    };
    window.addEventListener('hashchange', handle);
    return () => window.removeEventListener('hashchange', handle);
  }, []);
  function navigate(next) {
    setView(next);
    location.hash = next;
    update((s) => ({
      ...s,
      lastView: next,
    }));
    window.scrollTo({
      top: 0,
    });
  }
  function practice(topic, verbId = '') {
    setPracticeVerbId(verbId);
    setPracticeTopic(topic);
    setPracticeKey((n) => n + 1);
    navigate('practice');
  }
  return (
    <>
      <a className="skip-link" href="#main-content">
        {translate('До основного вмісту')}
      </a>
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            P<span>ą</span>
          </span>
          <div>Polski Praktyka</div>
        </div>
        <select
          className="form-select language-select"
          aria-label="Language / Język"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <option value="pl">Polski</option>
          <option value="uk">Українська</option>
        </select>
      </header>
      <div className="app-layout">
        <nav className="main-nav" aria-label={translate('Основна навігація')}>
          {routes.map(([id, label, Icon]) => (
            <a
              key={id}
              href={`#${id}`}
              className={view === id ? 'active' : ''}
              aria-current={view === id ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                navigate(id);
              }}
            >
              <Icon size={19} />
              <span>{translate(label)}</span>
              {id === 'practice' && state.mistakes.length > 0 && (
                <span className="nav-count">{state.mistakes.length}</span>
              )}
            </a>
          ))}
          <div className="nav-footer">
            <span className="status-dot" />
            {translate(' Збереження на пристрої')}
          </div>
        </nav>
        <main id="main-content" tabIndex={-1}>
          {warning && view !== 'settings' && (
            <div className="alert alert-warning small" role="status">
              {translate(warning)}
            </div>
          )}
          {view === 'grammar' && (
            <Grammar
              selected={state.topic}
              select={(topic) =>
                update((s) => ({
                  ...s,
                  topic,
                }))
              }
              practice={practice}
            />
          )}{' '}
          {view === 'practice' && (
            <Practice
              key={practiceKey}
              initialTopic={practiceTopic}
              initialVerbId={practiceVerbId}
              state={state}
              update={update}
            />
          )}{' '}
          {view === 'karta' && <Karta practice={practice} />}{' '}
          {view === 'vocabulary' && (
            <Vocabulary state={state} update={update} practice={practice} />
          )}{' '}
          {view === 'settings' && <SettingsPage state={state} update={update} warning={warning} />}
          <footer className="content-footer">
            Polski Praktyka <span>·</span>
            {translate(' Граматика та Карта поляка')}
          </footer>
        </main>
      </div>
    </>
  );
}
createRoot(document.getElementById('root')).render(
  contentError ? (
    <main className="container py-5">
      <div role="alert" className="alert alert-warning">
        <h1>{translate('Не вдалося завантажити уроки')}</h1>
        <p>
          {translate(
            'Навчальні матеріали потребують перевірки. Твої збережені дані залишилися в браузері.',
          )}
        </p>
        <button className="btn btn-primary" onClick={() => location.reload()}>
          {translate('Спробувати знову')}
        </button>
      </div>
    </main>
  ) : (
    <App />
  ),
);
