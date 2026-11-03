import { useEffect, useId, useRef, useState } from 'react';
import { Info } from 'lucide-react';

export default function HistoryEventTooltip({ label, paragraphs, language }) {
  const id = useId();
  const root = useRef();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const visible = hovered || focused || pinned;
  function close() {
    setHovered(false);
    setFocused(false);
    setPinned(false);
  }
  useEffect(() => {
    if (!visible) return;
    const outside = (event) => {
      if (!root.current?.contains(event.target)) close();
    };
    const escape = (event) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [visible]);
  return (
    <div
      ref={root}
      className="history-event-help"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
    >
      <button
        type="button"
        className="btn btn-outline-secondary icon-btn"
        aria-label={label}
        aria-expanded={visible}
        aria-controls={id}
        aria-describedby={visible ? id : undefined}
        onFocus={() => setFocused(true)}
        onClick={() => {
          if (pinned) close();
          else setPinned(true);
        }}
      >
        <Info size={18} aria-hidden="true" />
      </button>
      {visible && (
        <div id={id} role="tooltip" tabIndex={0} className="history-event-tooltip" lang={language}>
          <strong>{label}</strong>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
}
