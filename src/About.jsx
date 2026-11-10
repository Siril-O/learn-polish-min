import React from 'react';
import { ArrowRight, BookOpen, ListChecks, GraduationCap, Github } from 'lucide-react';
import { useLanguage } from './interface-language.js';

export default function About({ navigate }) {
  const pl = useLanguage() === 'pl';
  const sections = pl ? [
    ['Gramatyka', 'Reguły i tabele: przypadki, odmiana czasowników i budowanie zdań.', 'grammar', BookOpen],
    ['Ćwiczenia', 'Wybór odpowiedzi, wpisywanie form i tłumaczenia. Powtarzaj tematy, które sprawiają Ci trudność.', 'practice', ListChecks],
    ['Karta Polaka', 'Historia, daty i polskie tradycje. Oryginalne teksty, prostsze wersje i dodatkowy kontekst wydarzeń.', 'karta', GraduationCap],
  ] : [
    ['Граматика', 'Правила й таблиці: відмінки, форми дієслів і побудова речень.', 'grammar', BookOpen],
    ['Практика', 'Вибір відповіді, написання форм і переклади. Повторюй теми, які даються важче.', 'practice', ListChecks],
    ['Карта поляка', 'Історія, дати та польські традиції. Оригінальні тексти, простіші версії й додатковий контекст подій.', 'karta', GraduationCap],
  ];
  const link = (event, route) => { event.preventDefault(); navigate(route); };
  return (
    <article className="about-page">
      <h1>Polski Praktyka</h1>
      <p className="text-success fw-semibold">{pl ? 'Bezpłatnie. Bez rejestracji. W Twoim tempie.' : 'Безкоштовно. Без реєстрації. У твоєму темпі.'}</p>
      <p className="lead">{pl ? 'Gramatyka polska i przygotowanie do rozmowy o Kartę Polaka.' : 'Польська граматика й підготовка до співбесіди на Карту поляка.'}</p>
      <p>{pl ? 'Ucz się po polsku, a gdy potrzebujesz wyjaśnienia, przełącz na ukraiński. Od reguły do przykładu, od przykładu do samodzielnej odpowiedzi.' : 'Навчайся польською, а коли потрібне пояснення — перемикайся на українську. Від правила до прикладу, від прикладу до самостійної відповіді.'}</p>
      <div className="d-flex flex-wrap gap-2 my-4">
        <a className="btn btn-success" href="#plan" onClick={(e) => link(e, 'plan')}>{pl ? 'Zacznij naukę' : 'Почати навчання'} <ArrowRight size={17} /></a>
        <a className="btn btn-outline-secondary" href="#practice" onClick={(e) => link(e, 'practice')}>{pl ? 'Ćwicz' : 'Практикуватися'} <ListChecks size={17} /></a>
      </div>
      <figure className="about-preview">
        <img src={`${import.meta.env.BASE_URL}learning-preview.png`} alt={pl ? 'Przykład lekcji: reguły gramatyczne i tabela odmiany w Polski Praktyka' : 'Приклад уроку: граматичні правила й таблиця відмінювання у Polski Praktyka'} />
      </figure>
      <div className="about-sections">
        {sections.map(([title, description, route, Icon]) => (
          <section key={route}>
            <Icon size={23} aria-hidden="true" />
            <h2 className="h5 mt-3"><a href={`#${route}`} onClick={(e) => link(e, route)}>{title}</a></h2>
            <p>{description}</p>
          </section>
        ))}
      </div>
      <section className="border-top py-4">
        <h2 className="h4">{pl ? 'Od „rozumiem” do „potrafię odpowiedzieć”' : 'Від «розумію» до «можу відповісти»'}</h2>
        <p>{pl ? 'Rozpoznajesz poprawną odpowiedź, ale trudno Ci samodzielnie zbudować zdanie? Zacznij od wyboru odpowiedzi, potem ćwicz wpisywanie form i tłumaczenie. Wracaj do reguł wtedy, gdy ich potrzebujesz.' : 'Впізнаєш правильну відповідь, але важко самостійно побудувати речення? Почни з вибору відповіді, а потім тренуй написання форм і переклад. Повертайся до правил, коли вони потрібні.'}</p>
        <h3 className="h5">{pl ? 'Przypadki bez zgadywania' : 'Відмінки без вгадування'}</h3>
        <p>{pl ? 'Pytania do przypadków, końcówki, przykłady i tabele w jednym miejscu. Ćwicz konkretny przypadek albo sprawdź się w zadaniach mieszanych.' : 'Питання до відмінків, закінчення, приклади й таблиці в одному місці. Практикуй конкретний відмінок або перевіряй себе у змішаних завданнях.'}</p>
        <h3 className="h5">{pl ? 'Historia, która ma kontekst' : 'Історія, яка має контекст'}</h3>
        <p>{pl ? 'Nie tylko daty: poznawaj przyczyny i związki między wydarzeniami. Wybierz okres do powtórki, a następnie sprawdź daty i rozumienie wydarzeń w osobnych testach.' : 'Не лише дати: дізнавайся про причини й зв’язки між подіями. Обери період для повторення, а потім перевіряй дати та розуміння подій в окремих тестах.'}</p>
        <a className="btn btn-success" href="#plan" onClick={(e) => link(e, 'plan')}>{pl ? 'Wybierz pierwszy temat' : 'Обрати першу тему'} <ArrowRight size={17} /></a>
      </section>
      <section className="border-top py-4">
        <h2 className="h5">{pl ? 'Bez konta, we własnym tempie' : 'Без облікового запису, у своєму темпі'}</h2>
        <p>{pl ? 'Nie potrzebujesz rejestracji. Postęp zapisuje się w tej przeglądarce, bez automatycznej synchronizacji między urządzeniami. Kopię danych możesz wyeksportować w Ustawieniach.' : 'Реєстрація не потрібна. Прогрес зберігається в цьому браузері без автоматичної синхронізації між пристроями. Копію даних можна експортувати в налаштуваннях.'}</p>
        <p className="small text-secondary">{pl ? 'To narzędzie do nauki, nie oficjalny egzamin ani gwarancja otrzymania Karty Polaka.' : 'Це навчальний інструмент, а не офіційний іспит чи гарантія отримання Карти поляка.'}</p>
      </section>
      <section className="border-top py-4 about-faq">
        <h2 className="h4">{pl ? 'Częste pytania' : 'Поширені запитання'}</h2>
        {(pl ? [
          ['Czy korzystanie jest bezpłatne?', 'Tak. Materiały i ćwiczenia są dostępne bez opłat i bez zakładania konta.'],
          ['Czy muszę już znać polski?', 'Możesz zacząć od podstawowych tematów w planie nauki. Objaśnienia są dostępne po polsku i po ukraińsku.'],
          ['Czy mogę uczyć się na telefonie?', 'Tak, otwórz stronę w przeglądarce telefonu. Postęp na telefonie i komputerze zapisuje się osobno.'],
          ['Czy aplikacja zastępuje rozmowę po polsku?', 'Nie. Testy pomagają powtarzać wiedzę, ale przed rozmową o Kartę Polaka warto również ćwiczyć własne odpowiedzi na głos.'],
          ['Co się stanie po usunięciu danych przeglądarki?', 'Możesz utracić zapisany postęp. Zrób wcześniej kopię w Ustawieniach; można ją później zaimportować.'],
        ] : [
          ['Чи це безкоштовно?', 'Так. Матеріали й вправи доступні без оплати та створення облікового запису.'],
          ['Чи потрібно вже знати польську?', 'Можна почати з базових тем у плані навчання. Пояснення доступні польською та українською.'],
          ['Чи можна навчатися на телефоні?', 'Так, відкрий сайт у браузері телефона. Прогрес на телефоні й комп’ютері зберігається окремо.'],
          ['Чи замінює застосунок розмовну практику?', 'Ні. Тести допомагають повторювати знання, але перед співбесідою на Карту поляка варто також тренувати власні відповіді вголос.'],
          ['Що буде після очищення даних браузера?', 'Збережений прогрес може зникнути. Заздалегідь зроби копію в налаштуваннях; потім її можна імпортувати.'],
        ]).map(([question, answer]) => <details className="py-3 border-bottom" key={question}><summary className="fw-semibold">{question}</summary><p className="mt-2 mb-0">{answer}</p></details>)}
      </section>
      <section className="border-top pt-4">
        <h2 className="h5">{pl ? 'Autor i projekt' : 'Автор і проєкт'}</h2>
        <div className="d-flex flex-wrap gap-4">
          <a href="https://github.com/Siril-O" target="_blank" rel="noreferrer"><Github size={17} /> Siril-O</a>
          <a href="https://github.com/Siril-O/learn-polish-min" target="_blank" rel="noreferrer">{pl ? 'Kod źródłowy' : 'Вихідний код'} <ArrowRight size={16} /></a>
        </div>
      </section>
    </article>
  );
}
