export function localizeLesson(topic, language, bundle) {
  const translation = bundle.lessonTranslations?.[language]?.[topic.id];
  return { ...topic, ...translation };
}

export function localizeExercise(exercise, language, bundle) {
  return { ...exercise, ...bundle.exerciseTranslations?.[language]?.[exercise.id] };
}

export function localizeInterview(entry, language, bundle) {
  return { ...entry, ...bundle.interviewTranslations?.[language]?.[entry.id] };
}

export function localizeHistory(entry, language, bundle) {
  return { ...entry, ...bundle.historyTranslations?.[language]?.[entry.id] };
}

export function localizeSource(label, language, bundle) {
  return bundle.sourceTranslations?.[language]?.[label] ?? label;
}
