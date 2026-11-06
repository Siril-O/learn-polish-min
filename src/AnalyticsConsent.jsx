import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from './interface-language.js';
import {
  analyticsAllowed,
  readConsent,
  saveConsent,
  trackPage,
  withdrawConsent,
} from './analytics.js';

export default function AnalyticsConsent({ view }) {
  const language = useLanguage();
  const pl = language === 'pl';
  const [consent, setConsent] = useState(readConsent);
  const enabled = analyticsAllowed(import.meta.env.PROD, window.location);
  const dialogRef = useRef(null);
  const rejectRef = useRef(null);
  useEffect(() => {
    if (!enabled || consent) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog.showModal();
    rejectRef.current?.focus();
    return () => {
      dialog.close();
      previousFocus?.focus();
    };
  }, [enabled, consent]);
  useEffect(() => {
    if (enabled && consent === 'accepted') trackPage(view);
  }, [consent, enabled, view]);
  useEffect(() => {
    const sync = (event) => {
      if (event.key === null || event.key === 'polski-praktyka-analytics-consent') {
        if (consent === 'accepted' && readConsent() !== 'accepted') window.location.reload();
        else setConsent(readConsent());
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [consent]);
  if (!enabled || (consent && view !== 'settings')) return null;
  const choose = (value) => {
    saveConsent(value);
    setConsent(value);
  };
  const content = (
    <section
      className="border-bottom bg-light p-3"
      aria-label={pl ? 'Prywatność i analityka' : 'Приватність та аналітика'}
    >
      <h2 id="analytics-title" className="h6">Google Analytics</h2>
      <p id="analytics-description" className="small mb-3">
        {pl
          ? 'Za Twoją zgodą Google Analytics używa plików cookie do pomiaru odwiedzin i przeglądanych sekcji. Dane trafiają do Google. Nie wysyłamy odpowiedzi ani postępu nauki. Możesz odmówić lub wycofać zgodę w Ustawieniach.'
          : 'За твоєю згодою Google Analytics використовує cookie для вимірювання відвідувань і переглядів розділів. Дані передаються Google. Ми не надсилаємо відповіді чи навчальний прогрес. Можна відмовитися або відкликати згоду в налаштуваннях.'}{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
          {pl ? 'Polityka prywatności Google' : 'Політика приватності Google'}
        </a>
      </p>
      <div className="d-flex flex-wrap gap-2">
        {consent !== 'accepted' && (
          <button className="btn btn-sm btn-outline-secondary" onClick={() => choose('accepted')}>
            {pl ? 'Zezwól na analitykę' : 'Дозволити аналітику'}
          </button>
        )}
        {!consent && (
          <button ref={rejectRef} className="btn btn-sm btn-outline-secondary" onClick={() => choose('rejected')}>
            {pl ? 'Odrzuć' : 'Відмовитися'}
          </button>
        )}
        {consent === 'accepted' && (
          <button className="btn btn-sm btn-outline-secondary" onClick={withdrawConsent}>
            {pl ? 'Wycofaj zgodę' : 'Відкликати згоду'}
          </button>
        )}
        {consent === 'rejected' && (
          <span className="small">{pl ? 'Analityka wyłączona' : 'Аналітику вимкнено'}</span>
        )}
      </div>
    </section>
  );
  if (consent) return content;
  return (
    <dialog
      ref={dialogRef}
      className="analytics-dialog"
      aria-labelledby="analytics-title"
      aria-describedby="analytics-description"
      onCancel={(event) => {
        event.preventDefault();
        choose('rejected');
      }}
    >
      {content}
    </dialog>
  );
}
