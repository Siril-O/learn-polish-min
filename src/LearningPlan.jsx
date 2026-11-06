import React, { useState } from 'react';
import { ListChecks } from 'lucide-react';
import { useLanguage } from './interface-language.js';
import { learningPlan } from './learning-plan.js';
import { grammarExercises } from './content/index.js';

export default function LearningPlan({ openTopic, practice }) {
  const language = useLanguage();
  const [level, setLevel] = useState('A1');
  const pl = language === 'pl';
  const labels = pl
    ? { available: 'Dostępne', partial: 'Częściowo', missing: 'Brak materiału' }
    : { available: 'Є матеріал', partial: 'Частково', missing: 'Немає матеріалу' };
  return (
    <>
      <h1>{pl ? 'Plan nauki' : 'План навчання'}</h1>
      <p className="text-secondary">
        {pl
          ? 'Orientacyjna kolejność nauki gramatyki, nie certyfikat poziomu. Materiał w temacie może obejmować kilka poziomów.'
          : 'Орієнтовна послідовність вивчення граматики, не сертифікат рівня. Матеріал теми може охоплювати кілька рівнів.'}
      </p>
      <div className="btn-group mb-4" role="group" aria-label={pl ? 'Poziom CEFR' : 'Рівень CEFR'}>
        {Object.keys(learningPlan).map((value) => (
          <button
            key={value}
            className={`btn btn-outline-secondary ${level === value ? 'active' : ''}`}
            aria-pressed={level === value}
            onClick={() => setLevel(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <h2 className="h5">{level}</h2>
      <p className="small text-secondary">
        {pl
          ? 'Status dotyczy materiałów, nie Twojego postępu. Liczba zadań obejmuje cały temat.'
          : 'Статус стосується матеріалів, не твого прогресу. Кількість вправ охоплює всю тему.'}
      </p>
      <div className="list-group list-group-flush">
        {learningPlan[level].map((item) => (
          <div
            key={item.id}
            className={`list-group-item position-relative px-0 py-3 d-flex flex-wrap align-items-center gap-3 ${item.topic ? 'learning-plan-topic' : ''}`}
          >
            <div className="flex-grow-1" style={{ flexBasis: 240 }}>
              {item.topic ? (
                <button
                  className="stretched-link border-0 bg-transparent p-0 text-start fw-semibold text-body"
                  onClick={() => openTopic(item.topic)}
                >
                  {item.title[language]}
                </button>
              ) : (
                <div className="fw-semibold">{item.title[language]}</div>
              )}
              <small className="d-block text-secondary">
                {labels[item.status]}
                {item.topic
                  ? ` · ${grammarExercises.filter((exercise) => exercise.topic === item.topic).length} ${pl ? 'zadań w temacie' : 'вправ у темі'}`
                  : ''}
              </small>
            </div>
            {item.topic && (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-success position-relative z-1"
                  onClick={() => practice(item.topic)}
                >
                  <ListChecks size={16} aria-hidden="true" /> {pl ? 'Ćwicz' : 'Практика'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
