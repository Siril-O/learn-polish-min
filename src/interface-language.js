import { useSyncExternalStore } from 'react';

export const LANGUAGE_KEY = 'polski-praktyka:language';
let language = 'pl';
try {
  if (localStorage.getItem(LANGUAGE_KEY) === 'uk') language = 'uk';
} catch {
  /* Storage is optional. */
}
const listeners = new Set();
export function setLanguage(value) {
  if (!['pl', 'uk'].includes(value)) return;
  language = value;
  try {
    localStorage.setItem(LANGUAGE_KEY, value);
  } catch {
    /* Storage is optional. */
  }
  listeners.forEach((listener) => listener());
}
export function useLanguage() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => language,
  );
}

const polish = {
  'Таблиці дієслів': 'Tabele czasowników',
  'Літери та схожі звуки': 'Litery i podobne głoski',
  'Усі дієслова': 'Wszystkie czasowniki',
  'Питання та вживання': 'Pytania i użycie',
  Питання: 'Pytania',
  'Як поставити питання': 'Jak zadać pytanie?',
  'Типові конструкції': 'Typowe konstrukcje',
  Конструкція: 'Konstrukcja',
  Приклад: 'Przykład',
  'Розбір речень': 'Analiza zdań',
  'Речення-приклад': 'Zdanie',
  'Питання в реченні': 'Pytanie w zdaniu',
  Відповідь: 'Odpowiedź',
  Пояснення: 'Wyjaśnienie',
  'Джерела цієї теми': 'Źródła tego tematu',
  'Займенники та być': 'Zaimki i być',
  'Рід і число': 'Rodzaj i liczba',
  'Теперішній час': 'Czas teraźniejszy',
  Прикметники: 'Przymiotniki',
  'Mianownik · Називний': 'Mianownik',
  'Dopełniacz · Родовий': 'Dopełniacz',
  'Celownik · Давальний': 'Celownik',
  'Biernik · Знахідний': 'Biernik',
  'Narzędnik · Орудний': 'Narzędnik',
  'Miejscownik · Місцевий': 'Miejscownik',
  'Wołacz · Кличний': 'Wołacz',
  'Минулий час': 'Czas przeszły',
  'Майбутній час': 'Czas przyszły',
  'Вид дієслова': 'Aspekt czasownika',
  'Заперечення та запитання': 'Przeczenia i pytania',
  'Прийменники та порядок слів': 'Przyimki i szyk zdania',
  'Сім відмінків разом': 'Siedem przypadków razem',
  Граматика: 'Gramatyka',
  Практика: 'Ćwiczenia',
  'Карта поляка': 'Karta Polaka',
  Словник: 'Słownik',
  Налаштування: 'Ustawienia',
  'Вибір відповіді': 'Wybór odpowiedzi',
  'Вписати форму': 'Uzupełnij formę',
  'Написати речення': 'Napisz zdanie',
  'Рік → подія': 'Rok → wydarzenie',
  'Визначити відмінок': 'Rozpoznaj przypadek',
  'Відкрити таблицю в повному розмірі': 'Otwórz tabelę w pełnym rozmiarze',
  'Зверни увагу': 'Zwróć uwagę',
  Приклади: 'Przykłady',
  'Закрити правило': 'Zamknij regułę',
  'Правило, приклади та практика — тема за темою.':
    'Reguły, przykłady i ćwiczenia — temat po temacie.',
  'Таблиця відмінків': 'Tabela przypadków',
  'Теми граматики': 'Tematy gramatyczne',
  'Знайти тему': 'Znajdź temat',
  'Знайти тему…': 'Znajdź temat…',
  'Тем не знайдено.': 'Nie znaleziono tematów.',
  'Практикувати тему': 'Ćwicz ten temat',
  'завдань ·': 'zadań ·',
  рівні: 'poziomy',
  Тема: 'Temat',
  'Уся граматика': 'Cała gramatyka',
  'Змішані відмінки': 'Przypadki — ćwiczenia mieszane',
  'Мої помилки (': 'Moje błędy (',
  'Обери тему та складність. Після відповіді — пояснення.':
    'Wybierz temat i poziom. Po odpowiedzi zobaczysz wyjaśnienie.',
  'Дати й події': 'Daty i wydarzenia',
  'Культура та традиції': 'Kultura i tradycje',
  'Слова з текстів': 'Słowa z tekstów',
  'Збережені слова': 'Zapisane słowa',
  Складність: 'Poziom',
  'Завдань у сесії': 'Zadań w sesji',
  'Доступно:': 'Dostępne:',
  завдань: 'zadań',
  'Почати сесію': 'Rozpocznij sesję',
  'Немає помилок для повторення': 'Brak błędów do powtórzenia',
  'Поки немає завдань': 'Brak zadań',
  'Познач слова зірочкою у словнику.': 'Oznacz słowa gwiazdką w słowniku.',
  'Обери іншу тему або пройди нову вправу.': 'Wybierz inny temat lub wykonaj nowe ćwiczenie.',
  'Від впізнавання до власного речення': 'Od rozpoznawania do własnego zdania',
  'Знайди правильну форму серед трьох варіантів.':
    'Wybierz poprawną formę spośród trzech odpowiedzi.',
  'Пригадай закінчення без готових відповідей.':
    'Przypomnij sobie końcówkę bez gotowych odpowiedzi.',
  'Переклади українське речення польською.': 'Przetłumacz ukraińskie zdanie na polski.',
  'Сесію завершено': 'Sesja zakończona',
  'Усі відповіді правильні.': 'Wszystkie odpowiedzi są poprawne.',
  'Повторити помилки': 'Powtórz błędy',
  'До налаштувань сесії': 'Ustawienia sesji',
  Завдання: 'Zadanie',
  з: 'z',
  'Завершити сесію': 'Zakończ sesję',
  'Поточна сесія': 'Bieżąca sesja',
  Культура: 'Kultura',
  'У якому відмінку виділене слово?': 'W jakim przypadku jest wyróżnione słowo?',
  'Переклади польською, використовуючи форми з цієї теми.':
    'Przetłumacz na polski, używając form z tego tematu.',
  'Вибери відповідь': 'Wybierz odpowiedź',
  Рік: 'Rok',
  'Твоя відповідь польською': 'Twoja odpowiedź po polsku',
  'Польські літери': 'Polskie litery',
  Перевірити: 'Sprawdź',
  Правильно: 'Poprawnie',
  'Спробуй запам’ятати': 'Zapamiętaj poprawną odpowiedź',
  'Правильна відповідь:': 'Poprawna odpowiedź:',
  'Показано навчальний зразок; інший природний переклад теж може бути правильним. Автоперевірка приймає лише передбачені варіанти.':
    'To przykładowe tłumaczenie; inne naturalne tłumaczenie również może być poprawne. Automatyczna ocena akceptuje tylko zapisane warianty.',
  'Відкрити правило': 'Otwórz regułę',
  Результат: 'Wynik',
  Далі: 'Dalej',
  'Історія, традиції та підготовка до розмови польською.':
    'Historia, tradycje i przygotowanie do rozmowy po polsku.',
  'Матеріали Карти поляка': 'Materiały do Karty Polaka',
  Історія: 'Historia',
  Співбесіда: 'Rozmowa',
  'Культура і традиції': 'Kultura i tradycje',
  'Дата або подія…': 'Data lub wydarzenie…',
  'Знайти історичну подію': 'Znajdź wydarzenie',
  'Тест на дати й події': 'Test dat i wydarzeń',
  'Український переклад': 'Tłumaczenie ukraińskie',
  'Оригінал наданого тексту': 'Oryginalny tekst',
  'Уточнення:': 'Uściślenie:',
  Джерело: 'Źródło',
  'Подій не знайдено.': 'Nie znaleziono wydarzeń.',
  'Потренуй відповідь уголос, а потім відкрий приклад. Особисті відповіді заповнюй власними відомостями.':
    'Odpowiedz na głos, a potem otwórz przykład. W odpowiedziach osobistych używaj własnych informacji.',
  'Приклад відповіді': 'Przykładowa odpowiedź',
  'Про співбесіду · Gov.pl': 'O rozmowie · Gov.pl',
  'Символи, свята та звичаї.': 'Symbole, święta i zwyczaje.',
  'Перевірити знання': 'Sprawdź wiedzę',
  'Тест на слова': 'Test słówek',
  'Знайти слово': 'Znajdź słowo',
  'Польське слово або переклад…': 'Polskie słowo lub tłumaczenie…',
  'Частина мови': 'Część mowy',
  'Усі частини мови': 'Wszystkie części mowy',
  'Відбір слів': 'Filtr słów',
  'Усі слова': 'Wszystkie słowa',
  Збережені: 'Zapisane',
  'Ще вчу': 'Jeszcze się uczę',
  Картки: 'Fiszki',
  'Знайдено:': 'Znaleziono:',
  Збереження: 'Zapis',
  'Початкова форма': 'Forma podstawowa',
  'У тексті': 'W tekście',
  Українською: 'Po ukraińsku',
  'Прибрати зі збережених': 'Usuń z zapisanych',
  Зберегти: 'Zapisz',
  'Зберегти слово': 'Zapisz słowo',
  ' · вивчено': ' · opanowane',
  'Слів не знайдено': 'Nie znaleziono słów',
  'Зміни пошук або фільтри.': 'Zmień wyszukiwanie lub filtry.',
  'До словника': 'Wróć do słownika',
  'Напрямок карток': 'Kierunek fiszek',
  'Польська → українська': 'Polski → ukraiński',
  'Українська → польська': 'Ukraiński → polski',
  Картка: 'Fiszka',
  'У тексті:': 'W tekście:',
  Знаю: 'Znam',
  'Показати переклад': 'Pokaż tłumaczenie',
  'Картки завершено': 'Fiszki zakończone',
  'Переглянуто:': 'Przejrzano:',
  'Резервну копію відновлено.': 'Przywrócono kopię zapasową.',
  'Не вдалося імпортувати копію. Перевір формат JSON, версію та розмір файлу (до 2 МБ).':
    'Nie udało się zaimportować kopii. Sprawdź format JSON, wersję i rozmiar pliku (do 2 MB).',
  'Твої навчальні дані та резервні копії.': 'Twoje dane nauki i kopie zapasowe.',
  'Збереження у браузері': 'Zapis w przeglądarce',
  'Зберігаються остання тема, збережені й вивчені слова та помилки. Дані залишаються в цьому браузері й не надсилаються на сервер. Видалення даних сайту також видалить збереження.':
    'Zapisywane są ostatni temat, zapisane i opanowane słowa oraz błędy. Dane pozostają w tej przeglądarce i nie są wysyłane na serwer. Usunięcie danych witryny usunie również zapis.',
  'Вивчені слова': 'Opanowane słowa',
  Помилки: 'Błędy',
  'Експорт копії': 'Eksport kopii',
  'Імпорт копії': 'Import kopii',
  'Імпорт замінить поточні навчальні дані даними з файлу.':
    'Import zastąpi bieżące dane nauki danymi z pliku.',
  'Повторення помилок': 'Powtarzanie błędów',
  'Правильна відповідь у повторній вправі прибирає її зі списку помилок.':
    'Poprawna odpowiedź w powtórce usuwa zadanie z listy błędów.',
  'Очистити список помилок?': 'Wyczyścić listę błędów?',
  Очистити: 'Wyczyść',
  Скасувати: 'Anuluj',
  'Очистити помилки': 'Wyczyść błędy',
  'Джерела навчальних матеріалів': 'Źródła materiałów',
  'Історичні події мають окремі посилання на джерела. Приклади та вправи створені для цього застосунку. Приклади співбесіди є тренувальними, а не офіційним переліком питань.':
    'Wydarzenia historyczne mają osobne odnośniki do źródeł. Przykłady i ćwiczenia opracowano dla tej aplikacji. Pytania do rozmowy służą do ćwiczeń i nie są oficjalną listą.',
  'Браузер не дозволив зберегти дані. Сесія працює; експортуй копію в налаштуваннях.':
    'Przeglądarka nie pozwoliła zapisać danych. Sesja działa; wyeksportuj kopię w ustawieniach.',
  'Не вдалося прочитати збереження. Доступна нова сесія; перевірте резервну копію.':
    'Nie udało się odczytać zapisu. Możesz rozpocząć nową sesję; sprawdź kopię zapasową.',
  'До основного вмісту': 'Przejdź do treści',
  'Польська крок за кроком': 'Polski krok po kroku',
  'Основна навігація': 'Nawigacja główna',
  'Збереження на пристрої': 'Zapis na urządzeniu',
  'Граматика та Карта поляка': 'Gramatyka i Karta Polaka',
  'Не вдалося завантажити уроки': 'Nie udało się wczytać lekcji',
  'Навчальні матеріали потребують перевірки. Твої збережені дані залишилися в браузері.':
    'Materiały wymagają sprawdzenia. Twoje zapisane dane pozostały w przeglądarce.',
  'Спробувати знову': 'Spróbuj ponownie',
  Основи: 'Podstawy',
  Відмінки: 'Przypadki',
  Дієслова: 'Czasowniki',
  Речення: 'Zdania',
  Дієслово: 'Czasownik',
  Іменник: 'Rzeczownik',
  Прикметник: 'Przymiotnik',
  Традиції: 'Tradycje',
  Символи: 'Symbole',
  Свята: 'Święta',
  Країна: 'Kraj',
  'Про себе': 'O sobie',
};

export function translate(value) {
  if (language !== 'pl' || typeof value !== 'string') return value;
  const key = value.replace(/\s+/g, ' ').trim();
  if (polish[key]) return value.replace(key, polish[key]);
  if (/^\d+ слів із текстів · дієслова в інфінітиві$/.test(key))
    return key.replace(
      'слів із текстів · дієслова в інфінітиві',
      'słów z tekstów · czasowniki w bezokoliczniku',
    );
  return value
    .replace(' завдань можна повторити.', ' zadań do powtórzenia.')
    .replace('Вставити ', 'Wstaw ');
}
