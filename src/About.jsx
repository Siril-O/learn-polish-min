import React, { useState } from 'react';
import { ArrowRight, BookOpen, GraduationCap } from 'lucide-react';
import { useLanguage } from './interface-language.js';

export default function About({ navigate }) {
  const pl = useLanguage() === 'pl';
  const [answer, setAnswer] = useState(null);
  const go = (e, route) => { e.preventDefault(); navigate(route); };
  const paths = pl ? [
    ['Chcę poprawić polski', 'Reguły, przykłady i ćwiczenia. Od końcówek do samodzielnych zdań.', 'Przypadki · Czasowniki · Pisanie i tłumaczenie', 'Gramatyka', 'grammar'],
    ['Przygotowuję się do Karty Polaka', 'Poznaj wydarzenia, nie tylko daty. Zrozum tradycje i sprawdź, co pamiętasz.', 'Historia · Tradycje · Kontekst i źródła', 'Karta Polaka', 'karta'],
  ] : [
    ['Хочу покращити польську', 'Правила, приклади й вправи. Від закінчень до самостійних речень.', 'Відмінки · Дієслова · Письмо й переклад', 'Граматика', 'grammar'],
    ['Готуюся до Карти поляка', 'Вивчай події, а не лише дати. Зрозумій традиції та перевір, що пам’ятаєш.', 'Історія · Традиції · Контекст і джерела', 'Карта поляка', 'karta'],
  ];
  const faq = pl ? [
    ['Czy to jest bezpłatne?', 'Tak. Materiały i ćwiczenia są dostępne bez opłat i rejestracji.'],
    ['Gdzie zapisuje się postęp?', 'W tej przeglądarce, bez synchronizacji między urządzeniami. W Ustawieniach możesz wyeksportować kopię i ją przywrócić. Usunięcie danych przeglądarki może usunąć postęp.'],
    ['Czy to zastępuje rozmowę po polsku?', 'Nie. Warto też odpowiadać na głos. To narzędzie do nauki, nie oficjalny egzamin ani gwarancja otrzymania Karty Polaka.'],
  ] : [
    ['Чи це безкоштовно?', 'Так. Матеріали й вправи доступні без оплати та реєстрації.'],
    ['Де зберігається прогрес?', 'У цьому браузері, без синхронізації між пристроями. У налаштуваннях можна експортувати копію й відновити її. Очищення даних браузера може видалити прогрес.'],
    ['Чи замінює це розмовну практику?', 'Ні. Варто також відповідати вголос. Це навчальний інструмент, не офіційний іспит чи гарантія отримання Карти поляка.'],
  ];
  return <article className="about-page landing-page">
    <header className="landing-intro"><h1>Polski Praktyka</h1><p className="lead">{pl ? 'Zrozum gramatykę. Ćwicz odpowiedzi. Przygotuj się do rozmowy o Kartę Polaka.' : 'Зрозумій граматику. Тренуй відповіді. Готуйся до співбесіди на Карту поляка.'}</p><a className="btn btn-success" href="#plan" onClick={(e) => go(e, 'plan')}>{pl ? 'Zacznij naukę' : 'Почати навчання'} <ArrowRight size={17} /></a></header>
    <section className="about-demo" aria-labelledby="demo-title"><div className="about-demo-label">{pl ? 'Jedno zdanie. Pierwszy krok.' : 'Одне речення. Перший крок.'}</div><h2 id="demo-title" lang="pl">Nie mam <span>{answer === 'czasu' ? 'czasu' : '___'}</span>.</h2>
      <div className="d-flex flex-wrap gap-2" role="group" aria-label={pl ? 'Uzupełnij zdanie' : 'Доповни речення'}>{['czas', 'czasu', 'czasem', 'czasowi', 'czasie'].map((option) => <button key={option} className={`btn ${answer === option ? (option === 'czasu' ? 'btn-success' : 'btn-dark') : 'btn-outline-dark'}`} aria-pressed={answer === option} onClick={() => setAnswer(option)} lang="pl">{option}</button>)}</div>
      <div className="about-demo-feedback" aria-live="polite">{answer ? <><strong>{answer === 'czasu' ? (pl ? 'Tak, czasu!' : 'Так, czasu!') : (pl ? 'Poprawna forma: czasu.' : 'Правильна форма: czasu.')}</strong>{' '}{pl ? 'Po „nie mam” używamy dopełniacza: kogo? czego? — czasu.' : 'Після «nie mam» вживаємо родовий відмінок: кого? чого? — часу.'}</> : (pl ? 'Mam czas. Ale: nie mam…' : 'Маю час. Але: не маю…')}</div>
    </section>
    <div className="landing-benefits">{(pl ? ['Bez opłat', 'Bez rejestracji', 'Wyjaśnienia PL / UK'] : ['Безкоштовно', 'Без реєстрації', 'Пояснення PL / UK']).map((s) => <span key={s}>{s}</span>)}</div>
    <div className="landing-paths">{paths.map(([title, desc, topics, label, route]) => <section key={route}>{route === 'grammar' ? <BookOpen size={28} /> : <GraduationCap size={28} />}<h2 className="h4 mt-3">{title}</h2><p>{desc}</p><p className="small text-secondary">{topics}</p><a href={`#${route}`} onClick={(e) => go(e, route)}>{label} <ArrowRight size={17} /></a></section>)}</div>
    <section className="about-faq border-top py-4"><h2 className="h4">{pl ? 'Dobrze wiedzieć' : 'Варто знати'}</h2>{faq.map(([q, a]) => <details className="py-3 border-bottom" key={q}><summary className="fw-semibold">{q}</summary><p className="mt-2 mb-0">{a}</p></details>)}</section>
    <section className="landing-finish"><h2 className="h4">{pl ? 'Zacznij od jednego tematu.' : 'Почни з однієї теми.'}</h2><a className="btn btn-success" href="#plan" onClick={(e) => go(e, 'plan')}>{pl ? 'Wybierz pierwszy temat' : 'Обрати першу тему'} <ArrowRight size={17} /></a></section>
    <div className="d-flex flex-wrap gap-4 py-3 border-top"><a href="https://github.com/Siril-O" target="_blank" rel="noreferrer">Siril-O</a><a href="https://github.com/Siril-O/learn-polish-min" target="_blank" rel="noreferrer">GitHub</a><a href="#settings" onClick={(e) => go(e, 'settings')}>{pl ? 'Ustawienia i prywatność' : 'Налаштування та приватність'}</a></div>
  </article>;
}
