import React, { useEffect, useState } from 'react';
import { ExternalLink, RotateCcw } from 'lucide-react';
import { useLanguage } from './interface-language.js';

export default function HistoryBackground({ entryId, expanded = false }) {
  const language = useLanguage();
  const [open, setOpen] = useState(expanded);
  const [entry, setEntry] = useState(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const pl = language === 'pl';
  useEffect(() => {
    if (!open) return;
    let active = true;
    setFailed(false);
    import('./content/history-background.js')
      .then(({ historyBackground }) => {
        if (!historyBackground[entryId]) throw new Error(`Missing history background: ${entryId}`);
        if (active) setEntry(historyBackground[entryId]);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [open, entryId, attempt]);
  const body = open && (
        <div className="history-background-body mt-3" lang={language}>
          {failed ? (
            <div role="alert">
              <p>{pl ? 'Nie udało się wczytać kontekstu.' : 'Не вдалося завантажити контекст.'}</p>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setAttempt((value) => value + 1)}
              >
                <RotateCcw size={15} /> {pl ? 'Spróbuj ponownie' : 'Спробувати знову'}
              </button>
            </div>
          ) : !entry ? (
            <p role="status">{pl ? 'Wczytywanie…' : 'Завантаження…'}</p>
          ) : (
            <>
              {entry[language].map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <h3 className="h6 mt-3">{pl ? 'Źródła kontekstu' : 'Джерела контексту'}</h3>
              <ul className="small ps-3">
                {entry.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer">
                      {source.title} <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      );
  if (expanded) return body;
  return (
    <details
      className="history-background mt-3"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>
        {pl ? 'Kontekst historyczny i powiązania' : 'Історичний контекст і зв’язки'}
      </summary>
      {body}
    </details>
  );
}
